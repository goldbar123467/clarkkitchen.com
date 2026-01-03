"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MasksIconProps {
  isHovered?: boolean;
  className?: string;
}

export function MasksIcon({ isHovered = false, className }: MasksIconProps) {
  return (
    <svg viewBox="0 0 100 100" className={cn("w-full h-full", className)}>
      {/* Static face group */}
      {[0, 1, 2, 3, 4].map((i) => {
        const angle = (i - 2) * 25;
        const x = 50 + Math.sin((angle * Math.PI) / 180) * 25;
        const y = 45 + Math.abs(i - 2) * 5;
        const scale = i === 2 ? 1.2 : 0.9;
        const isCenterMask = i === 2;

        return (
          <motion.g
            key={i}
            transform={`translate(${x}, ${y}) scale(${scale})`}
            animate={
              isCenterMask && isHovered
                ? {
                    y: [0, -3, 0],
                    scale: [scale, scale * 1.1, scale],
                  }
                : {}
            }
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ellipse
              cx="0"
              cy="0"
              rx="10"
              ry="12"
              fill="#121212"
              stroke={isCenterMask ? "#ff2d2d" : "#6b7280"}
              strokeWidth="1.5"
            />
            <ellipse
              cx="-4"
              cy="-2"
              rx="2"
              ry="1.5"
              fill={isCenterMask ? "#ff2d2d" : "#6b7280"}
              opacity="0.8"
            />
            <ellipse
              cx="4"
              cy="-2"
              rx="2"
              ry="1.5"
              fill={isCenterMask ? "#ff2d2d" : "#6b7280"}
              opacity="0.8"
            />
            <path
              d="M-4 4 Q0 6, 4 4"
              fill="none"
              stroke={isCenterMask ? "#ff2d2d" : "#6b7280"}
              strokeWidth="1"
            />
          </motion.g>
        );
      })}

      {/* Red face - bobs up and down in the middle */}
      <motion.g
        animate={{
          y: [0, -4, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ x: 50, y: 45 }}
      >
        <ellipse
          cx="0"
          cy="0"
          rx="8"
          ry="10"
          fill="#121212"
          stroke="#ff2d2d"
          strokeWidth="1.5"
        />
        <ellipse cx="-3" cy="-2" rx="1.5" ry="1" fill="#ff2d2d" opacity="0.9" />
        <ellipse cx="3" cy="-2" rx="1.5" ry="1" fill="#ff2d2d" opacity="0.9" />
        <path d="M-3 3 Q0 5, 3 3" fill="none" stroke="#ff2d2d" strokeWidth="1" />
      </motion.g>

      {/* Stage/platform */}
      <ellipse cx="50" cy="75" rx="35" ry="8" fill="#0a0a0a" stroke="#6b7280" strokeWidth="1" />
    </svg>
  );
}
