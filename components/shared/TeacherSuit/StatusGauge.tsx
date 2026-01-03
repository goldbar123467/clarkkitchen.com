"use client";

import { motion, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

interface StatusGaugeProps {
  label: string;
  value: number;
  maxValue: number;
  color?: string;
}

export function StatusGauge({
  label,
  value,
  maxValue,
  color = "#ff2d2d",
}: StatusGaugeProps) {
  const percentage = Math.min((value / maxValue) * 100, 100);
  const [displayPercentage, setDisplayPercentage] = useState(0);

  // Smooth spring animation for value changes
  const springValue = useSpring(0, {
    stiffness: 50,
    damping: 15,
    mass: 0.5,
  });

  useEffect(() => {
    springValue.set(percentage);
    const unsubscribe = springValue.on("change", (latest) => {
      setDisplayPercentage(Math.round(latest));
    });
    return () => unsubscribe();
  }, [percentage, springValue]);

  // Calculate number of filled blocks (out of 20)
  const totalBlocks = 20;
  const filledBlocks = Math.round((percentage / 100) * totalBlocks);

  return (
    <div className="flex items-center gap-3 font-mono text-sm">
      {/* Gauge bar container */}
      <div className="relative flex items-center gap-0.5 rounded border border-[#ff2d2d]/30 bg-black/50 p-1.5">
        {/* Bar brackets */}
        <span className="text-[#ff2d2d]/50">[</span>

        {/* Bar blocks */}
        <div className="flex gap-0.5">
          {Array.from({ length: totalBlocks }).map((_, i) => {
            const isFilled = i < filledBlocks;
            const isArrow = i === filledBlocks - 1 && filledBlocks < totalBlocks;

            return (
              <motion.div
                key={i}
                className="relative h-3 w-1.5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.02 }}
              >
                {isFilled ? (
                  <motion.div
                    className="absolute inset-0 rounded-sm"
                    style={{
                      backgroundColor: color,
                      boxShadow: `0 0 4px ${color}, inset 0 1px 1px rgba(255,255,255,0.3), inset 0 -1px 1px rgba(0,0,0,0.5)`,
                    }}
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{
                      delay: i * 0.03,
                      duration: 0.2,
                      ease: "easeOut",
                    }}
                  >
                    {isArrow && (
                      <motion.span
                        className="absolute -right-1 top-1/2 -translate-y-1/2 text-xs"
                        style={{ color }}
                        animate={{
                          x: [0, 2, 0],
                          opacity: [1, 0.7, 1],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        &gt;
                      </motion.span>
                    )}
                  </motion.div>
                ) : (
                  <div className="absolute inset-0 rounded-sm bg-gray-800/50" />
                )}
              </motion.div>
            );
          })}
        </div>

        <span className="text-[#ff2d2d]/50">]</span>

        {/* Glow effect overlay */}
        <motion.div
          className="pointer-events-none absolute inset-0 rounded"
          style={{
            background: `linear-gradient(90deg, transparent 0%, ${color}22 ${percentage}%, transparent ${percentage + 5}%)`,
          }}
          animate={{
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Label and percentage */}
      <div className="flex items-center gap-2">
        <span className="text-gray-400 uppercase tracking-wider">{label}:</span>
        <motion.span
          className="font-bold tabular-nums"
          style={{ color }}
          key={displayPercentage}
        >
          {displayPercentage}%
        </motion.span>
      </div>
    </div>
  );
}
