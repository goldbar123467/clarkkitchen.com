"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TranslatorIconProps {
  isHovered?: boolean;
  className?: string;
}

export function TranslatorIcon({ isHovered = false, className }: TranslatorIconProps) {
  return (
    <svg viewBox="0 0 100 100" className={cn("w-full h-full", className)}>
      <rect x="20" y="30" width="60" height="40" fill="#121212" stroke="#6b7280" strokeWidth="2" rx="6" />
      <rect x="25" y="40" width="20" height="20" fill="#0a0a0a" stroke="#6b7280" strokeWidth="1" rx="2" />
      <text x="35" y="54" fill="#6b7280" fontSize="8" textAnchor="middle">Aa</text>
      <motion.g
        animate={isHovered ? { x: [0, 3, 0] } : {}}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <path d="M50 50 L60 50 M57 47 L60 50 L57 53" fill="none" stroke="#ff2d2d" strokeWidth="2" />
      </motion.g>
      <motion.rect
        x="65"
        y="40"
        width="10"
        height="20"
        fill="#ff2d2d"
        opacity="0.3"
        rx="2"
        animate={isHovered ? { opacity: [0.3, 0.6, 0.3] } : {}}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      <line x1="67" y1="45" x2="73" y2="45" stroke="#ff2d2d" strokeWidth="1" />
      <line x1="67" y1="50" x2="73" y2="50" stroke="#ff2d2d" strokeWidth="1" />
      <line x1="67" y1="55" x2="73" y2="55" stroke="#ff2d2d" strokeWidth="1" />
      <circle cx="30" cy="35" r="2" fill="#ff2d2d" />
      <motion.circle
        cx="70"
        cy="35"
        r="2"
        fill="#ff2d2d"
        animate={{ opacity: [1, 0.3, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
    </svg>
  );
}
