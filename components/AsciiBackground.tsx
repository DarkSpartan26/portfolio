'use client';

import { useEffect, useState } from 'react';

const CHARS = ['+', '.', ':', '/', '_', '\\', '|', '~', '*'];
const COUNT = 15;

export default function AsciiBackground() {
  const [mounted, setMounted] = useState(false);
  const [particles, setParticles] = useState<{ char: string; left: number; delay: number; duration: number }[]>([]);

  useEffect(() => {
    setMounted(true);
    const newParticles = Array.from({ length: COUNT }).map(() => ({
      char: CHARS[Math.floor(Math.random() * CHARS.length)],
      left: Math.random() * 100,
      delay: Math.random() * 20,
      duration: 30 + Math.random() * 40, // 30s to 70s to float up
    }));
    setParticles(newParticles);
  }, []);

  if (!mounted) return null;

  return (
    <div className="atmosphere-layer" style={{ zIndex: -1, overflow: 'hidden' }}>
      {particles.map((p, i) => (
        <span
          key={i}
          style={{
            position: 'absolute',
            left: `${p.left}%`,
            bottom: '-5%',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '1rem',
            color: 'var(--text-secondary)',
            opacity: 0.03,
            userSelect: 'none',
            animation: `ascii-drift ${p.duration}s linear ${p.delay}s infinite`,
          }}
        >
          {p.char}
        </span>
      ))}
      <style jsx>{`
        @keyframes ascii-drift {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.04;
          }
          90% {
            opacity: 0.04;
          }
          100% {
            transform: translateY(-110vh) rotate(180deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
