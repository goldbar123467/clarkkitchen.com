"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface CircuitNodeProps {
  x: number;
  y: number;
  label: string | string[];
  delay: number;
  isActive: boolean;
}

export function CircuitNode({
  x,
  y,
  label,
  delay,
  isActive,
}: CircuitNodeProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [currentLabelIndex, setCurrentLabelIndex] = useState(0);

  // Handle rotating labels if array provided
  const displayLabel = Array.isArray(label) ? label[currentLabelIndex] : label;

  // Rotate through labels if array
  const handleAnimationComplete = () => {
    if (Array.isArray(label) && isActive) {
      setCurrentLabelIndex((prev) => (prev + 1) % label.length);
    }
  };

  return (
    <g
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ cursor: "pointer" }}
    >
      {/* Outer expanding ring on pulse */}
      <motion.circle
        cx={x}
        cy={y}
        r={4}
        fill="none"
        stroke="#ff2d2d"
        strokeWidth={1}
        initial={{ r: 4, opacity: 0 }}
        animate={
          isActive
            ? {
                r: [4, 12, 4],
                opacity: [0.8, 0, 0.8],
              }
            : { r: 4, opacity: 0 }
        }
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay,
        }}
      />

      {/* Main pulsing node */}
      <motion.circle
        cx={x}
        cy={y}
        r={4}
        fill={isActive ? "#ff2d2d" : "#666"}
        initial={{ scale: 1, opacity: 0.8 }}
        animate={
          isActive
            ? {
                scale: [1, 1.5, 1],
                opacity: [0.8, 1.0, 0.8],
              }
            : { scale: 1, opacity: 0.5 }
        }
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay,
        }}
        onAnimationComplete={handleAnimationComplete}
        style={{
          filter: isActive
            ? "drop-shadow(0 0 4px #ff2d2d)"
            : "drop-shadow(0 0 2px #666)",
          transformOrigin: `${x}px ${y}px`,
        }}
        whileHover={{
          scale: 2,
          transition: { duration: 0.2 },
        }}
      />

      {/* Inner highlight for depth */}
      <motion.circle
        cx={x}
        cy={y - 1}
        r={1.5}
        fill="rgba(255,255,255,0.6)"
        initial={{ opacity: 0.3 }}
        animate={
          isActive
            ? {
                opacity: [0.3, 0.6, 0.3],
              }
            : { opacity: 0.2 }
        }
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay,
        }}
        style={{
          transformOrigin: `${x}px ${y}px`,
        }}
      />

      {/* Hover state: tooltip with label */}
      <AnimatePresence>
        {isHovered && (
          <motion.g
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.2 }}
          >
            {/* Tooltip background */}
            <motion.rect
              x={x - 40}
              y={y - 35}
              width={80}
              height={20}
              rx={4}
              fill="rgba(0,0,0,0.9)"
              stroke="#ff2d2d"
              strokeWidth={1}
            />

            {/* Tooltip text */}
            <motion.text
              x={x}
              y={y - 22}
              textAnchor="middle"
              fill="#ff2d2d"
              fontSize="10"
              fontFamily="monospace"
              fontWeight="bold"
            >
              {displayLabel}
            </motion.text>

            {/* Tooltip arrow */}
            <motion.path
              d={`M ${x - 4} ${y - 15} L ${x} ${y - 10} L ${x + 4} ${y - 15}`}
              fill="rgba(0,0,0,0.9)"
              stroke="#ff2d2d"
              strokeWidth={1}
            />
          </motion.g>
        )}
      </AnimatePresence>

      {/* Label text that rotates (for multi-label nodes) */}
      {Array.isArray(label) && isActive && (
        <AnimatePresence mode="wait">
          <motion.text
            key={displayLabel}
            x={x}
            y={y + 20}
            textAnchor="middle"
            fill="#ff2d2d"
            fontSize="8"
            fontFamily="monospace"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 0.7, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.3 }}
          >
            {displayLabel}
          </motion.text>
        </AnimatePresence>
      )}
    </g>
  );
}
