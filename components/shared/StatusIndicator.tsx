"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface StatusIndicatorProps {
  states: string[];
  interval?: number;
  color?: string;
  isActive?: boolean;
}

export function StatusIndicator({
  states,
  interval = 3000,
  color = "#ff2d2d",
  isActive = true,
}: StatusIndicatorProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (!isActive || states.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % states.length);
    }, interval);

    return () => clearInterval(timer);
  }, [states.length, interval, isActive]);

  const currentState = states[currentIndex] || states[0];

  return (
    <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider">
      {/* Pulsing Dot Indicator */}
      <motion.div
        className="relative w-2 h-2 rounded-full"
        style={{
          backgroundColor: color,
          willChange: isActive && !prefersReducedMotion ? "transform, opacity" : "auto",
        }}
        animate={
          isActive && !prefersReducedMotion
            ? {
                opacity: [1, 0.4, 1],
                scale: [1, 0.8, 1],
              }
            : { opacity: 1, scale: 1 }
        }
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Glow Effect */}
        {isActive && !prefersReducedMotion && (
          <motion.div
            className="absolute inset-0 rounded-full blur-sm"
            style={{ backgroundColor: color }}
            animate={{
              opacity: [0.6, 0.2, 0.6],
              scale: [1.5, 1, 1.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        )}
      </motion.div>

      {/* Status Text */}
      <div className="relative h-4 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.span
            key={currentState}
            className="block text-gray-400"
            initial={
              prefersReducedMotion
                ? { opacity: 1 }
                : { opacity: 0, y: -10 }
            }
            animate={{ opacity: 1, y: 0 }}
            exit={
              prefersReducedMotion
                ? { opacity: 1 }
                : { opacity: 0, y: 10 }
            }
            transition={{ duration: 0.3 }}
          >
            {currentState}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}
