import { useEffect, useState, useMemo } from 'react';
import type { Season } from '@/data/solarTerms';

interface ParticleLayerProps {
  season: Season;
}

interface Particle {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  drift: number;
}

const PARTICLE_CONFIG = {
  spring: { count: 20, minSize: 8, maxSize: 16, emoji: '🌸', baseDuration: 8 },
  summer: { count: 25, minSize: 4, maxSize: 8, emoji: '✨', baseDuration: 6 },
  autumn: { count: 18, minSize: 10, maxSize: 20, emoji: '🍂', baseDuration: 10 },
  winter: { count: 30, minSize: 6, maxSize: 14, emoji: '❄️', baseDuration: 12 },
};

export default function ParticleLayer({ season }: ParticleLayerProps) {
  const [particles, setParticles] = useState<Particle[]>([]);

  const config = useMemo(() => PARTICLE_CONFIG[season], [season]);

  useEffect(() => {
    try {
      const newParticles: Particle[] = [];
      for (let i = 0; i < config.count; i++) {
        newParticles.push({
          id: i,
          left: Math.random() * 100,
          delay: Math.random() * config.baseDuration,
          duration: config.baseDuration + Math.random() * 6,
          size: config.minSize + Math.random() * (config.maxSize - config.minSize),
          drift: (Math.random() - 0.5) * 100,
        });
      }
      setParticles(newParticles);
    } catch (e) {
      console.error('Particle init failed:', String(e));
    }
  }, [config]);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[5] overflow-hidden"
      aria-hidden="true"
    >
      {particles.map((p) => (
        <span
          key={`${season}-${p.id}`}
          className="absolute top-[-10%] animate-fall opacity-70"
          style={{
            left: `${p.left}%`,
            fontSize: `${p.size}px`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            ['--drift' as string]: `${p.drift}px`,
          }}
        >
          {config.emoji}
        </span>
      ))}
    </div>
  );
}
