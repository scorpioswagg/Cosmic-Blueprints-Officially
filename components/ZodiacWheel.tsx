import React from 'react';
import { motion } from 'framer-motion';

interface ZodiacWheelProps {
  ascendant?: number;
  planets?: Array<{
    planet: string;
    degree: number;
    sign: string;
  }>;
  onClick?: (degree: number) => void;
}

const ZODIAC_SIGNS = [
  { name: 'Aries', symbol: '♈', color: '#FF4136' },
  { name: 'Taurus', symbol: '♉', color: '#2ECC40' },
  { name: 'Gemini', symbol: '♊', color: '#FFDC00' },
  { name: 'Cancer', symbol: '♋', color: '#B10DC9' },
  { name: 'Leo', symbol: '♌', color: '#FF851B' },
  { name: 'Virgo', symbol: '♍', color: '#7FDBFF' },
  { name: 'Libra', symbol: '♎', color: '#F012BE' },
  { name: 'Scorpio', symbol: '♏', color: '#85144B' },
  { name: 'Sagittarius', symbol: '♐', color: '#39CCCC' },
  { name: 'Capricorn', symbol: '♑', color: '#01FF70' },
  { name: 'Aquarius', symbol: '♒', color: '#001F3F' },
  { name: 'Pisces', symbol: '♓', color: '#FF4136' }
];

export const ZodiacWheel: React.FC<ZodiacWheelProps> = ({
  ascendant = 0,
  planets = [],
  onClick
}) => {
  const wheelSize = 400;
  const centerX = wheelSize / 2;
  const centerY = wheelSize / 2;
  const radius = wheelSize / 2 - 30;

  const getCoordinates = (degree: number, offset = 0) => {
    const radian = (degree - 90) * (Math.PI / 180);
    return {
      x: centerX + (radius - offset) * Math.cos(radian),
      y: centerY + (radius - offset) * Math.sin(radian)
    };
  };

  return (
    <div className="relative w-[400px] h-[400px]">
      <svg
        width={wheelSize}
        height={wheelSize}
        className="transform -rotate-90"
        style={{ transform: `rotate(${-ascendant}deg)` }}
      >
        {/* Zodiac wheel background */}
        <circle
          cx={centerX}
          cy={centerY}
          r={radius}
          fill="none"
          stroke="#1a1a1a"
          strokeWidth="2"
        />

        {/* Zodiac signs */}
        {ZODIAC_SIGNS.map((sign, index) => {
          const startAngle = index * 30;
          const { x, y } = getCoordinates(startAngle + 15);

          return (
            <g key={sign.name}>
              {/* Sign segment */}
              <path
                d={`M ${centerX} ${centerY} L ${getCoordinates(startAngle).x} ${
                  getCoordinates(startAngle).y
                } A ${radius} ${radius} 0 0 1 ${getCoordinates(startAngle + 30).x} ${
                  getCoordinates(startAngle + 30).y
                } Z`}
                fill={sign.color}
                fillOpacity="0.1"
                stroke={sign.color}
                strokeWidth="1"
              />
              
              {/* Sign symbol */}
              <text
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="middle"
                fill={sign.color}
                className="text-lg font-zodiac"
                style={{ transform: `rotate(${startAngle + 15 + ascendant}deg)` }}
              >
                {sign.symbol}
              </text>
            </g>
          );
        })}

        {/* Planet markers */}
        {planets.map((planet, index) => {
          const { x, y } = getCoordinates(planet.degree, 20);
          return (
            <motion.circle
              key={planet.planet}
              cx={x}
              cy={y}
              r={5}
              fill="white"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="cursor-pointer hover:fill-yellow-300"
              onClick={() => onClick?.(planet.degree)}
            />
          );
        })}

        {/* Ascendant marker */}
        <path
          d="M 200 0 L 210 20 L 190 20 Z"
          fill="gold"
          stroke="none"
        />
      </svg>
    </div>
  );
};
