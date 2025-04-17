export interface BirthData {
  date: string;
  time: string;
  latitude: number;
  longitude: number;
  timezone: string;
}

export interface PlanetPosition {
  planet: string;
  sign: string;
  degree: number;
  retrograde: boolean;
  house: number;
}

export interface HouseSystem {
  type: 'placidus';
  cusps: number[];
}

export interface AstrologyChart {
  tropical: {
    planets: PlanetPosition[];
    houses: HouseSystem;
    ascendant: number;
    midheaven: number;
  };
  sidereal: {
    planets: PlanetPosition[];
    houses: HouseSystem;
    ascendant: number;
    midheaven: number;
  };
  aspects: Array<{
    planet1: string;
    planet2: string;
    aspect: string;
    orb: number;
  }>;
}

export interface ReportConfig {
  type: 'natal' | 'transit' | 'synastry' | 'composite' | 'progressed' | 'solar-return' | 'lunar-return';
  birthData: BirthData;
  compareData?: BirthData; // For synastry/composite
  options?: {
    houseSystem?: 'placidus' | 'koch' | 'equal';
    zodiacType?: 'tropical' | 'sidereal';
    aspectOrbs?: Record<string, number>;
  };
}
