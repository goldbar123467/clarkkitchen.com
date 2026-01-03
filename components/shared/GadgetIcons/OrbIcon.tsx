"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface OrbIconProps {
  isHovered?: boolean;
  className?: string;
}

// Generate data particles that drift toward core
const generateDataParticles = (count: number) =>
  Array.from({ length: count }, (_, i) => ({
    id: i,
    startRadius: 38 + Math.random() * 8, // Start from outer edge
    angle: Math.random() * 360,
    size: 0.8 + Math.random() * 1.2,
    duration: 3 + Math.random() * 4, // 3-7 seconds to reach core
    delay: Math.random() * 5, // Staggered starts
  }));

// Generate orbital particles
const generateParticles = (count: number) =>
  Array.from({ length: count }, (_, i) => ({
    id: i,
    radius: 26 + (i % 3) * 5,
    speed: 5 + (i % 4),
    size: 1 + (i % 2) * 0.5,
    startAngle: (i / count) * 360,
  }));

// Ripple configurations
const rippleRings = [
  { id: 0, delay: 0 },
  { id: 1, delay: 1.2 },
  { id: 2, delay: 2.4 },
];

// Energy burst lines for hover
const burstLines = Array.from({ length: 8 }, (_, i) => ({
  id: i,
  angle: (i / 8) * 360,
}));

export function OrbIcon({ isHovered = false, className }: OrbIconProps) {
  const particles = useMemo(() => generateParticles(6), []);
  const dataParticles = useMemo(() => generateDataParticles(12), []);

  // Flare state - occasional bright flashes
  const [showFlare, setShowFlare] = useState(false);

  useEffect(() => {
    // Random flares every 4-8 seconds
    const scheduleFlare = () => {
      const delay = 4000 + Math.random() * 4000;
      return setTimeout(() => {
        setShowFlare(true);
        setTimeout(() => setShowFlare(false), 300);
        scheduleFlare();
      }, delay);
    };

    const timeout = scheduleFlare();
    return () => clearTimeout(timeout);
  }, []);

  return (
    <svg viewBox="0 0 100 100" className={cn("w-full h-full", className)}>
      <defs>
        {/* Outer glow gradient - enhanced */}
        <radialGradient id="orbGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ff2d2d" stopOpacity="0.9" />
          <stop offset="40%" stopColor="#ff2d2d" stopOpacity="0.4" />
          <stop offset="70%" stopColor="#ff2d2d" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#ff2d2d" stopOpacity="0" />
        </radialGradient>

        {/* Core inner glow - brighter center */}
        <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
          <stop offset="20%" stopColor="#ff6b6b" stopOpacity="1" />
          <stop offset="60%" stopColor="#ff2d2d" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#dc2626" stopOpacity="0.8" />
        </radialGradient>

        {/* Scanner notch gradient */}
        <linearGradient id="scannerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ff2d2d" stopOpacity="0" />
          <stop offset="40%" stopColor="#ff2d2d" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
          <stop offset="60%" stopColor="#ff2d2d" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#ff2d2d" stopOpacity="0" />
        </linearGradient>

        {/* Particle glow */}
        <radialGradient id="particleGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ff2d2d" stopOpacity="1" />
          <stop offset="100%" stopColor="#ff2d2d" stopOpacity="0" />
        </radialGradient>

        {/* Data particle glow */}
        <radialGradient id="dataGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ff6b6b" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#ff2d2d" stopOpacity="0" />
        </radialGradient>

        {/* Ring glow filter */}
        <filter id="ringGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Layer 1: Outer glow - breathing animation */}
      <motion.circle
        cx="50"
        cy="50"
        r="42"
        fill="url(#orbGlow)"
        animate={{
          opacity: [0.4, 0.65, 0.5, 0.7, 0.4],
          scale: [1, 1.08, 1.02, 1.06, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          times: [0, 0.25, 0.5, 0.75, 1],
        }}
        style={{ transformOrigin: "50px 50px" }}
      />

      {/* Layer 2: Outer scanning ring - clockwise rotation */}
      <motion.g
        animate={{ rotate: 360 }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{ transformOrigin: "50px 50px" }}
      >
        {/* Ring track */}
        <circle
          cx="50"
          cy="50"
          r="32"
          fill="none"
          stroke="#ff2d2d"
          strokeWidth="1"
          opacity="0.3"
        />
        {/* Scanner notch - bright traveling spot */}
        <motion.circle
          cx="82"
          cy="50"
          r="2.5"
          fill="#ffffff"
          filter="url(#ringGlow)"
          animate={{
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        {/* Scanner trail */}
        <motion.path
          d="M 82 50 A 32 32 0 0 0 74 26"
          fill="none"
          stroke="url(#scannerGradient)"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.6"
        />
      </motion.g>

      {/* Layer 3: Inner scanning ring - counter-clockwise, different speed */}
      <motion.g
        animate={{ rotate: -360 }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{ transformOrigin: "50px 50px" }}
      >
        {/* Inner ring track */}
        <circle
          cx="50"
          cy="50"
          r="24"
          fill="none"
          stroke="#ff2d2d"
          strokeWidth="0.75"
          opacity="0.25"
          strokeDasharray="4 8"
        />
        {/* Inner scanner notch */}
        <motion.circle
          cx="74"
          cy="50"
          r="1.5"
          fill="#ff6b6b"
          animate={{
            opacity: [0.5, 0.9, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.g>

      {/* Layer 4: Ripple rings - expanding from center */}
      {rippleRings.map((ring) => (
        <motion.circle
          key={`ripple-${ring.id}`}
          cx="50"
          cy="50"
          fill="none"
          stroke="#ff2d2d"
          strokeWidth="0.75"
          initial={{ r: 12, opacity: 0.5 }}
          animate={{
            r: [12, 36],
            opacity: [0.5, 0],
          }}
          transition={{
            duration: 3.6,
            repeat: Infinity,
            delay: ring.delay,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Layer 5: Data particles drifting inward */}
      {dataParticles.map((particle) => {
        const angleRad = (particle.angle * Math.PI) / 180;
        const startX = 50 + Math.cos(angleRad) * particle.startRadius;
        const startY = 50 + Math.sin(angleRad) * particle.startRadius;

        return (
          <motion.circle
            key={`data-${particle.id}`}
            cx={startX}
            cy={startY}
            r={particle.size}
            fill="#ff6b6b"
            initial={{ opacity: 0 }}
            animate={{
              cx: [startX, 50],
              cy: [startY, 50],
              opacity: [0, 0.7, 0.9, 0],
              r: [particle.size, particle.size * 0.5],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeIn",
              times: [0, 0.2, 0.8, 1],
            }}
          />
        );
      })}

      {/* Layer 6: Orbital particles */}
      {particles.map((particle) => (
        <motion.g
          key={`particle-${particle.id}`}
          initial={{ rotate: particle.startAngle }}
          animate={
            isHovered
              ? { rotate: particle.startAngle + 360 }
              : { rotate: [particle.startAngle, particle.startAngle + 360] }
          }
          transition={
            isHovered
              ? { duration: 0.5, ease: "easeIn" }
              : { duration: particle.speed, repeat: Infinity, ease: "linear" }
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
                ? { cx: 50, opacity: [1, 0], r: [particle.size, 0] }
                : { opacity: [0.6, 1, 0.6] }
            }
            transition={
              isHovered
                ? { duration: 0.4, delay: particle.id * 0.05, ease: "easeIn" }
                : { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }
          />
          {/* Particle glow */}
          <motion.circle
            cx={50 + particle.radius}
            cy="50"
            r={particle.size * 2.5}
            fill="url(#particleGlow)"
            animate={
              isHovered
                ? { cx: 50, opacity: 0 }
                : { opacity: [0.2, 0.4, 0.2] }
            }
            transition={
              isHovered
                ? { duration: 0.4, delay: particle.id * 0.05 }
                : { duration: 2, repeat: Infinity }
            }
          />
        </motion.g>
      ))}

      {/* Layer 7: Main orb body */}
      <circle
        cx="50"
        cy="50"
        r="16"
        fill="#0a0a0a"
        stroke="#ff2d2d"
        strokeWidth="1.5"
      />

      {/* Layer 8: Inner core - heartbeat pulse */}
      <motion.circle
        cx="50"
        cy="50"
        r="10"
        fill="url(#coreGlow)"
        animate={{
          scale: [1, 1.2, 1, 1.15, 1],
          opacity: [0.85, 1, 0.9, 0.98, 0.85],
        }}
        transition={{
          duration: 2.8,
          repeat: Infinity,
          ease: "easeInOut",
          times: [0, 0.15, 0.35, 0.55, 1],
        }}
        style={{ transformOrigin: "50px 50px" }}
      />

      {/* Layer 9: Core highlight */}
      <motion.circle
        cx="47"
        cy="47"
        r="3"
        fill="#ffffff"
        animate={{
          opacity: [0.25, 0.5, 0.25],
        }}
        transition={{
          duration: 2.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Layer 10: Random flare effect */}
      <AnimatePresence>
        {showFlare && (
          <motion.circle
            cx="50"
            cy="50"
            r="14"
            fill="#ffffff"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: [0, 0.6, 0], scale: [0.8, 1.3, 1.5] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{ transformOrigin: "50px 50px" }}
          />
        )}
      </AnimatePresence>

      {/* Layer 11: Energy burst on hover */}
      <AnimatePresence>
        {isHovered && (
          <>
            {burstLines.map((line) => {
              const angleRad = (line.angle * Math.PI) / 180;
              const x1 = 50 + Math.cos(angleRad) * 10;
              const y1 = 50 + Math.sin(angleRad) * 10;
              const x2 = 50 + Math.cos(angleRad) * 40;
              const y2 = 50 + Math.sin(angleRad) * 40;

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
              r="8"
              fill="#ffffff"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{
                opacity: [0, 0.9, 0],
                scale: [0.5, 1.8, 2.5],
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
