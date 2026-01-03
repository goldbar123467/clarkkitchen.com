"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CleanerIconProps {
  isHovered?: boolean;
  className?: string;
}

export function CleanerIcon({ isHovered = false, className }: CleanerIconProps) {
  return (
    <svg viewBox="0 0 100 100" className={cn("w-full h-full", className)}>
      <rect x="30" y="25" width="40" height="50" fill="#121212" stroke="#6b7280" strokeWidth="2" rx="4" />
      <rect x="35" y="30" width="30" height="15" fill="#0a0a0a" stroke="#ff2d2d" strokeWidth="1" />
      <motion.line
        x1="40"
        y1="50"
        x2="40"
        y2="70"
        stroke="#ff2d2d"
        strokeWidth="2"
        opacity="0.8"
        animate={isHovered ? { y2: [70, 65, 70] } : {}}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      <motion.line
        x1="50"
        y1="48"
        x2="50"
        y2="72"
        stroke="#ff2d2d"
        strokeWidth="2"
        opacity="0.6"
        animate={isHovered ? { y2: [72, 68, 72] } : {}}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
      />
      <motion.line
        x1="60"
        y1="50"
        x2="60"
        y2="70"
        stroke="#ff2d2d"
        strokeWidth="2"
        opacity="0.8"
        animate={isHovered ? { y2: [70, 65, 70] } : {}}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
      />
      <motion.circle
        cx="35"
        cy="68"
        r="2"
        fill="#ff2d2d"
        animate={{ opacity: [1, 0.3, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      <motion.circle
        cx="65"
        cy="65"
        r="2"
        fill="#ff2d2d"
        animate={{ opacity: [1, 0.3, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
      />
    </svg>
  );
}
