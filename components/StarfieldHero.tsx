"use client";
import React, { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  z: number;
  size: number;
  speed: number;
  brightness: number;
}

export const StarfieldHero: React.FC<{ height?: string }> = ({ height = '600px' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = parseInt(height);
    };

    const initStars = () => {
      const stars: Star[] = [];
      for (let i = 0; i < 200; i++) {
        stars.push({
          x: Math.random() * canvas.width - canvas.width / 2,
          y: Math.random() * canvas.height - canvas.height / 2,
          z: Math.random() * 1000,
          size: Math.random() * 2,
          speed: 1 + Math.random() * 2,
          brightness: 0.2 + Math.random() * 0.8
        });
      }
      starsRef.current = stars;
    };

    const drawStar = (star: Star) => {
      const x = (star.x / star.z) * 100 + canvas.width / 2;
      const y = (star.y / star.z) * 100 + canvas.height / 2;
      const size = (1 - star.z / 1000) * star.size;
      const brightness = star.brightness * (1 - star.z / 1000);

      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${brightness})`;
      ctx.fill();

      // Add glow effect
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, size * 2);
      gradient.addColorStop(0, `rgba(255, 255, 255, ${brightness})`);
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = gradient;
      ctx.fill();
    };

    const animate = () => {
      ctx.fillStyle = 'rgb(10, 10, 30)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      starsRef.current.forEach(star => {
        star.z -= star.speed;
        if (star.z <= 1) {
          star.z = 1000;
          star.x = Math.random() * canvas.width - canvas.width / 2;
          star.y = Math.random() * canvas.height - canvas.height / 2;
        }
        drawStar(star);
      });

      frameRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    initStars();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(frameRef.current);
    };
  }, [height]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full"
      style={{ height }}
    />
  );
};
