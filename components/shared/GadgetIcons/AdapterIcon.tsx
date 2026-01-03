"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AdapterIconProps {
  isHovered?: boolean;
  className?: string;
}

export function AdapterIcon({ isHovered = false, className }: AdapterIconProps) {
  return (
    <svg viewBox="0 0 100 100" className={cn("w-full h-full", className)}>
      <circle cx="30" cy="30" r="8" fill="#0a0a0a" stroke="#6b7280" strokeWidth="2" />
      <circle cx="70" cy="30" r="8" fill="#0a0a0a" stroke="#6b7280" strokeWidth="2" />
      <circle cx="30" cy="70" r="8" fill="#0a0a0a" stroke="#6b7280" strokeWidth="2" />
      <circle cx="70" cy="70" r="8" fill="#0a0a0a" stroke="#6b7280" strokeWidth="2" />
      <motion.circle
        cx="50"
        cy="50"
        r="15"
        fill="#121212"
        stroke="#ff2d2d"
        strokeWidth="2"
        animate={isHovered ? { scale: [1, 1.1, 1] } : { scale: 1 }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      <circle cx="50" cy="50" r="6" fill="#ff2d2d" />
      <motion.line
        x1="38"
        y1="38"
        x2="42"
        y2="42"
        stroke="#ff2d2d"
        strokeWidth="2"
        animate={isHovered ? { opacity: [0.5, 1, 0.5] } : { opacity: 0.8 }}
        transition={{ duration: 1, repeat: Infinity }}
      />
      <motion.line
        x1="62"
        y1="38"
        x2="58"
        y2="42"
        stroke="#ff2d2d"
        strokeWidth="2"
        animate={isHovered ? { opacity: [0.5, 1, 0.5] } : { opacity: 0.8 }}
        transition={{ duration: 1, repeat: Infinity, delay: 0.25 }}
      />
      <motion.line
        x1="38"
        y1="62"
        x2="42"
        y2="58"
        stroke="#ff2d2d"
        strokeWidth="2"
        animate={isHovered ? { opacity: [0.5, 1, 0.5] } : { opacity: 0.8 }}
        transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
      />
      <motion.line
        x1="62"
        y1="62"
        x2="58"
        y2="58"
        stroke="#ff2d2d"
        strokeWidth="2"
        animate={isHovered ? { opacity: [0.5, 1, 0.5] } : { opacity: 0.8 }}
        transition={{ duration: 1, repeat: Infinity, delay: 0.75 }}
      />
    </svg>
  );
}
