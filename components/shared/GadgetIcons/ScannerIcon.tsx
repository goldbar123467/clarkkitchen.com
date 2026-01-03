"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ScannerIconProps {
  isHovered?: boolean;
  className?: string;
}

export function ScannerIcon({ isHovered = false, className }: ScannerIconProps) {
  return (
    <svg viewBox="0 0 100 100" className={cn("w-full h-full", className)}>
      <rect x="15" y="20" width="70" height="60" fill="none" stroke="#6b7280" strokeWidth="2" rx="4" />
      <rect x="20" y="25" width="60" height="40" fill="#0a0a0a" stroke="#ff2d2d" strokeWidth="1" rx="2" />
      <motion.path
        d="M25 45 L35 35 L40 50 L50 30 L55 55 L65 40 L75 45"
        fill="none"
        stroke="#ff2d2d"
        strokeWidth="2"
        initial={{ pathLength: 0 }}
        animate={isHovered ? { pathLength: 1 } : { pathLength: 0.8 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />
      <motion.circle
        cx="30"
        cy="72"
        r="4"
        fill="#ff2d2d"
        animate={isHovered ? { opacity: [1, 0.5, 1] } : { opacity: 1 }}
        transition={{ duration: 1, repeat: Infinity }}
      />
      <circle cx="50" cy="72" r="4" fill="#6b7280" />
      <circle cx="70" cy="72" r="4" fill="#6b7280" />
    </svg>
  );
}
