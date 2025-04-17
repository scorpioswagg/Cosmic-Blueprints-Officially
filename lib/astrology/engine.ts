import { BirthData, AstrologyChart, ReportConfig, PlanetPosition } from '../types/astrology';

// Constants for astronomical calculations
const TROPICAL_OFFSET = 0;
const SIDEREAL_AYANAMSA = 24.0333; // Lahiri ayanamsa for 2025
const PRECESSION_RATE = 50.2388475; // seconds per year

class AstrologyEngine {
  private calculatePrecessionOffset(date: Date): number {
    const j2000 = new Date('2000-01-01T12:00:00Z');
    const yearsSinceJ2000 = (date.getTime() - j2000.getTime()) / (365.25 * 24 * 60 * 60 * 1000);
    return (PRECESSION_RATE * yearsSinceJ2000) / 3600; // Convert to degrees
  }

  private calculateAscendant(date: Date, latitude: number, longitude: number): number {
    // Simplified RAMC calculation
    const utcHours = date.getUTCHours() + date.getUTCMinutes() / 60;
    const ramc = (utcHours * 15 + longitude) % 360;
    
    // Simplified ascendant calculation using obliquity of ecliptic
    const obliquity = 23.4367; // Mean obliquity for 2025
    const tanAsc = Math.tan(latitude * Math.PI / 180) * Math.cos(obliquity * Math.PI / 180);
    const ascendant = (ramc + Math.atan(tanAsc) * 180 / Math.PI) % 360;
    
    return ascendant;
  }

  private calculateHouseCusps(ascendant: number): number[] {
    // Simplified Placidus house calculation
    const cusps = [];
    for (let i = 1; i <= 12; i++) {
      cusps.push((ascendant + (i - 1) * 30) % 360);
    }
    return cusps;
  }

  private calculatePlanetPosition(planet: string, date: Date, isRetrograde = false): PlanetPosition {
    // Simplified planetary position calculation
    // In a real implementation, this would use precise ephemeris data
    const basePosition = (date.getTime() / (24 * 60 * 60 * 1000)) % 360;
    const position = {
      planet,
      sign: this.getZodiacSign(basePosition),
      degree: basePosition % 30,
      retrograde: isRetrograde,
      house: Math.floor(basePosition / 30) + 1
    };
    return position;
  }

  private getZodiacSign(degree: number): string {
    const signs = [
      'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
      'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
    ];
    return signs[Math.floor(degree / 30)];
  }

  public async calculateChart(config: ReportConfig): Promise<AstrologyChart> {
    const birthDate = new Date(config.birthData.date + 'T' + config.birthData.time);
    const precessionOffset = this.calculatePrecessionOffset(birthDate);
    
    // Calculate ascendant
    const ascendant = this.calculateAscendant(
      birthDate,
      config.birthData.latitude,
      config.birthData.longitude
    );

    // Calculate house cusps
    const houseCusps = this.calculateHouseCusps(ascendant);

    // Calculate planet positions
    const planets = ['Sun', 'Moon', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto'];
    const tropicalPlanets = planets.map(planet => 
      this.calculatePlanetPosition(planet, birthDate)
    );

    // Apply sidereal offset
    const siderealPlanets = tropicalPlanets.map(planet => ({
      ...planet,
      degree: (planet.degree - SIDEREAL_AYANAMSA + 360) % 360
    }));

    // Calculate aspects
    const aspects = this.calculateAspects(tropicalPlanets);

    return {
      tropical: {
        planets: tropicalPlanets,
        houses: {
          type: 'placidus',
          cusps: houseCusps
        },
        ascendant,
        midheaven: (ascendant + 90) % 360
      },
      sidereal: {
        planets: siderealPlanets,
        houses: {
          type: 'placidus',
          cusps: houseCusps.map(cusp => (cusp - SIDEREAL_AYANAMSA + 360) % 360)
        },
        ascendant: (ascendant - SIDEREAL_AYANAMSA + 360) % 360,
        midheaven: (ascendant + 90 - SIDEREAL_AYANAMSA + 360) % 360
      },
      aspects
    };
  }

  private calculateAspects(planets: PlanetPosition[]): Array<{planet1: string; planet2: string; aspect: string; orb: number}> {
    const aspects: Array<{planet1: string; planet2: string; aspect: string; orb: number}> = [];
    const aspectAngles = {
      conjunction: 0,
      sextile: 60,
      square: 90,
      trine: 120,
      opposition: 180
    };

    for (let i = 0; i < planets.length; i++) {
      for (let j = i + 1; j < planets.length; j++) {
        const angle = Math.abs(planets[i].degree - planets[j].degree);
        
        for (const [aspect, targetAngle] of Object.entries(aspectAngles)) {
          const orb = Math.abs(angle - targetAngle);
          if (orb <= 8) { // 8-degree orb
            aspects.push({
              planet1: planets[i].planet,
              planet2: planets[j].planet,
              aspect,
              orb
            });
          }
        }
      }
    }

    return aspects;
  }
}

export const astrologyEngine = new AstrologyEngine();
