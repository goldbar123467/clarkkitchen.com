"use client";

import { useRef } from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";

interface UsageBarProps {
  value: number;
  max: number;
}

export function UsageBar({ value, max }: UsageBarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  const percentage = (value / max) * 100;

  const springValue = useSpring(0, {
    stiffness: 50,
    damping: 15,
    mass: 0.5,
  });

  const width = useTransform(springValue, (v) => `${v}%`);

  if (isInView) {
    springValue.set(percentage);
  }

  return (
    <div
      ref={ref}
      className="h-2 w-full max-w-[120px] bg-[#1f1f1f] rounded-full overflow-hidden"
    >
      <motion.div
        className="h-full bg-gradient-to-r from-[#ff2d2d] to-[#dc2626] rounded-full"
        style={{
          width,
          boxShadow: "0 0 8px rgba(255, 45, 45, 0.5)",
        }}
      />
    </div>
  );
}
