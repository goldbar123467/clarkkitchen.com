"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useMemo } from "react";
import { cn } from "@/lib/utils";

interface OrbIconProps {
  isHovered?: boolean;
  className?: string;
}

// Generate stable orbital particles
const generateParticles = (count: number) =>
  Array.from({ length: count }, (_, i) => ({
    id: i,
    radius: 22 + (i % 3) * 6, // 22, 28, 34 distances
    speed: 4 + (i % 4), // 4-7 seconds per orbit
    size: 1.5 + (i % 2), // 1.5 or 2.5 radius
    startAngle: (i / count) * 360, // Evenly distributed
  }));

// Generate ripple ring configurations
const rippleRings = [
  { id: 0, delay: 0 },
  { id: 1, delay: 1 },
  { id: 2, delay: 2 },
];

// Generate energy burst lines
const burstLines = Array.from({ length: 8 }, (_, i) => ({
  id: i,
  angle: (i / 8) * 360,
}));

export function OrbIcon({ isHovered = false, className }: OrbIconProps) {
  const particles = useMemo(() => generateParticles(8), []);

  return (
    <svg viewBox="0 0 100 100" className={cn("w-full h-full", className)}>
      <defs>
        {/* Outer glow gradient */}
        <radialGradient id="orbGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ff2d2d" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#ff2d2d" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#ff2d2d" stopOpacity="0" />
        </radialGradient>

        {/* Core inner glow */}
        <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ff6b6b" stopOpacity="1" />
          <stop offset="60%" stopColor="#ff2d2d" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#dc2626" stopOpacity="0.7" />
        </radialGradient>

        {/* Particle glow */}
        <radialGradient id="particleGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ff2d2d" stopOpacity="1" />
          <stop offset="100%" stopColor="#ff2d2d" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Layer 1: Outer glow background - pulsing */}
      <motion.circle
        cx="50"
        cy="50"
        r="40"
        fill="url(#orbGlow)"
        animate={{
          opacity: [0.5, 0.7, 0.5],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ transformOrigin: "50px 50px" }}
      />

      {/* Layer 2: Ripple rings - continuously expanding from center */}
      {rippleRings.map((ring) => (
        <motion.circle
          key={`ripple-${ring.id}`}
          cx="50"
          cy="50"
          fill="none"
          stroke="#ff2d2d"
          strokeWidth="1"
          initial={{ r: 14, opacity: 0.6 }}
          animate={{
            r: [14, 35],
            opacity: [0.6, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: ring.delay,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Layer 3: Orbital particles */}
      {particles.map((particle) => (
        <motion.g
          key={`particle-${particle.id}`}
          initial={{ rotate: particle.startAngle }}
          animate={
            isHovered
              ? {
                  // Memory absorption - particles move inward and fade
                  rotate: particle.startAngle + 360,
                }
              : {
                  rotate: [particle.startAngle, particle.startAngle + 360],
                }
          }
          transition={
            isHovered
              ? {
                  duration: 0.5,
                  ease: "easeIn",
                }
              : {
                  duration: particle.speed,
                  repeat: Infinity,
                  ease: "linear",
                }
          }
          style={{ transformOrigin: "50px 50px" }}
        >
          <motion.circle
            cx={50 + particle.radius}
            cy="50"
            r={particle.size}
            fill="#ff2d2d"
            animate={
              isHovered
                ? {
                    // Absorption effect
                    cx: 50,
                    opacity: [1, 0],
                    r: [particle.size, 0],
                  }
                : {
                    opacity: [0.7, 1, 0.7],
                  }
            }
            transition={
              isHovered
                ? {
                    duration: 0.4,
                    delay: particle.id * 0.05,
                    ease: "easeIn",
                  }
                : {
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }
            }
          />
          {/* Particle glow trail */}
          <motion.circle
            cx={50 + particle.radius}
            cy="50"
            r={particle.size * 2}
            fill="url(#particleGlow)"
            animate={
              isHovered
                ? { cx: 50, opacity: 0 }
                : { opacity: [0.3, 0.5, 0.3] }
            }
            transition={
              isHovered
                ? { duration: 0.4, delay: particle.id * 0.05 }
                : { duration: 1.5, repeat: Infinity }
            }
          />
        </motion.g>
      ))}

      {/* Layer 4: Main orb body */}
      <circle
        cx="50"
        cy="50"
        r="20"
        fill="#0a0a0a"
        stroke="#ff2d2d"
        strokeWidth="2"
      />

      {/* Layer 5: Inner core - heartbeat breathing animation */}
      <motion.circle
        cx="50"
        cy="50"
        r="8"
        fill="url(#coreGlow)"
        animate={{
          scale: [1, 1.15, 1, 1.1, 1],
          opacity: [0.8, 1, 0.85, 0.95, 0.8],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
          times: [0, 0.2, 0.4, 0.6, 1],
        }}
        style={{ transformOrigin: "50px 50px" }}
      />

      {/* Inner core highlight */}
      <motion.circle
        cx="48"
        cy="48"
        r="3"
        fill="#ffffff"
        opacity="0.3"
        animate={{
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Layer 6: Energy burst - 8 radial lines (hover only) */}
      <AnimatePresence>
        {isHovered && (
          <>
            {burstLines.map((line) => {
              const angleRad = (line.angle * Math.PI) / 180;
              const x1 = 50 + Math.cos(angleRad) * 12;
              const y1 = 50 + Math.sin(angleRad) * 12;
              const x2 = 50 + Math.cos(angleRad) * 38;
              const y2 = 50 + Math.sin(angleRad) * 38;

              return (
                <motion.line
                  key={`burst-${line.id}`}
                  x1={x1}
                  y1={y1}
                  x2={x1}
                  y2={y1}
                  stroke="#ff2d2d"
                  strokeWidth="2"
                  strokeLinecap="round"
                  initial={{ x2: x1, y2: y1, opacity: 0 }}
                  animate={{
                    x2: [x1, x2, x2],
                    y2: [y1, y2, y2],
                    opacity: [0, 1, 0],
                  }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 0.5,
                    times: [0, 0.4, 1],
                    ease: "easeOut",
                    delay: line.id * 0.02,
                  }}
                />
              );
            })}

            {/* Central flash on hover */}
            <motion.circle
              cx="50"
              cy="50"
              r="6"
              fill="#ffffff"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{
                opacity: [0, 0.8, 0],
                scale: [0.5, 1.5, 2],
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              style={{ transformOrigin: "50px 50px" }}
            />
          </>
        )}
      </AnimatePresence>
    </svg>
  );
}
