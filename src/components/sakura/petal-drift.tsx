"use client";

import { useReducedMotion } from "framer-motion";

const PETALS = Array.from({ length: 9 }, (_, i) => i);

type PetalConfig = {
  left: number;
  delay: number;
  duration: number;
  drift: number;
  rotate: number;
  scale: number;
};

const CONFIGS: PetalConfig[] = [
  { left: 4, delay: 0, duration: 22, drift: 40, rotate: 220, scale: 0.9 },
  { left: 8, delay: 3, duration: 28, drift: -30, rotate: 320, scale: 0.7 },
  { left: 12, delay: 7, duration: 18, drift: 25, rotate: 180, scale: 1.1 },
  { left: 6, delay: 11, duration: 32, drift: -40, rotate: 360, scale: 0.8 },
  { left: 14, delay: 5, duration: 24, drift: 35, rotate: 270, scale: 0.95 },
  { left: 10, delay: 9, duration: 30, drift: -20, rotate: 200, scale: 0.75 },
  { left: 3, delay: 14, duration: 26, drift: 30, rotate: 290, scale: 1.05 },
  { left: 16, delay: 2, duration: 20, drift: -35, rotate: 240, scale: 0.85 },
  { left: 8, delay: 17, duration: 34, drift: 45, rotate: 310, scale: 0.65 }
];

export function PetalDrift() {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-y-0 left-0 z-[5] w-24 overflow-hidden"
      style={{ maxWidth: "6rem" }}
    >
      {PETALS.map((i) => {
        const c = CONFIGS[i % CONFIGS.length];
        return (
          <Petal key={i} {...c} />
        );
      })}
    </div>
  );
}

function Petal({ left, delay, duration, drift, rotate, scale }: PetalConfig) {
  return (
    <svg
      viewBox="0 0 20 20"
      style={{
        position: "absolute",
        left: `${left}%`,
        top: "-30px",
        width: `${14 * scale}px`,
        height: `${14 * scale}px`,
        opacity: 0,
        animation: `petal-fall-${duration} ${duration}s linear ${delay}s infinite`,
        filter: "drop-shadow(0 1px 2px rgba(201, 121, 74, 0.18))"
      }}
    >
      <defs>
        <radialGradient id={`pg-${left}-${duration}-${delay}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fce4d6" />
          <stop offset="70%" stopColor="#f2c5ad" />
          <stop offset="100%" stopColor="#e89b6b" />
        </radialGradient>
      </defs>
      <path
        d="M10 1 C7 4 3 6 3 11 C3 15 6 18 10 19 C14 18 17 15 17 11 C17 6 13 4 10 1 Z"
        fill={`url(#pg-${left}-${duration}-${delay})`}
        transform={`rotate(${rotate} 10 10)`}
      />
      <style>{`
        @keyframes petal-fall-${duration} {
          0% { transform: translateY(-30px) translateX(0) rotate(${rotate}deg); opacity: 0; }
          8% { opacity: 0.55; }
          50% { transform: translateY(50vh) translateX(${drift}px) rotate(${rotate + 180}deg); opacity: 0.5; }
          92% { opacity: 0.4; }
          100% { transform: translateY(105vh) translateX(${drift * 0.5}px) rotate(${rotate + 360}deg); opacity: 0; }
        }
      `}</style>
    </svg>
  );
}