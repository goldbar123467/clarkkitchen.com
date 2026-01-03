"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

type RenderPropChildren =
  | React.ReactNode
  | ((props: { isHovered: boolean; bootPhase: number }) => React.ReactNode);

interface GadgetCardProps {
  children: RenderPropChildren;
  title: string;
  tagline: string;
  className?: string;
  index?: number;
}

export function GadgetCard({
  children,
  title,
  tagline,
  className,
  index = 0
}: GadgetCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [bootPhase, setBootPhase] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

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
    if (!isInView || prefersReducedMotion) {
      setBootPhase(5);
      return;
    }

    const staggerDelay = index * 150;
    const phases = [
      { phase: 1, delay: staggerDelay + 0 },
      { phase: 2, delay: staggerDelay + 200 },
      { phase: 3, delay: staggerDelay + 400 },
      { phase: 4, delay: staggerDelay + 600 },
      { phase: 5, delay: staggerDelay + 800 },
    ];

    const timers = phases.map(({ phase, delay }) =>
      setTimeout(() => setBootPhase(phase), delay)
    );

    return () => timers.forEach(clearTimeout);
  }, [isInView, index, prefersReducedMotion]);

  const titleChars = title.split("");

  return (
    <motion.div
      ref={ref}
      className={cn(
        "relative rounded-lg border bg-black/40 backdrop-blur-sm transition-all duration-300",
        isHovered
          ? "border-[#ff2d2d]/60 shadow-[0_0_40px_rgba(255,45,45,0.3)]"
          : "border-[#1f1f1f] shadow-[0_0_10px_rgba(0,0,0,0.5)]",
        className
      )}
      style={{ willChange: bootPhase < 5 ? "transform, opacity" : "auto" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={
        bootPhase >= 1
          ? { opacity: 1, scale: 1, y: 0 }
          : { opacity: 0, scale: 0.95, y: 20 }
      }
      transition={{ duration: 0.5 }}
    >
      {/* Border Flicker Effect - Phase 1 */}
      <AnimatePresence>
        {bootPhase === 1 && !prefersReducedMotion && (
          <motion.div
            className="absolute inset-0 rounded-lg border-2 border-[#ff2d2d]/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0, 1, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, times: [0, 0.25, 0.5, 0.75, 1] }}
          />
        )}
      </AnimatePresence>

      {/* Content Container */}
      <div className="relative p-6 flex flex-col h-full">
        {/* Header Section */}
        <div className="mb-4">
          {/* Title - Phase 4 */}
          <motion.h3
            className="text-base sm:text-lg md:text-xl font-bold text-white mb-2 font-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: bootPhase >= 4 ? 1 : 0 }}
          >
            {prefersReducedMotion ? (
              title
            ) : (
              <motion.span
                initial="hidden"
                animate={bootPhase >= 4 ? "visible" : "hidden"}
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.03 },
                  },
                }}
              >
                {titleChars.map((char, i) => (
                  <motion.span
                    key={i}
                    variants={{
                      hidden: { opacity: 0 },
                      visible: { opacity: 1 },
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.span>
            )}
          </motion.h3>

          {/* Tagline - Phase 5 */}
          <motion.p
            className="text-sm text-gray-400 font-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: bootPhase >= 5 ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {tagline}
          </motion.p>
        </div>

        {/* Icon Container - Phase 2 */}
        <motion.div
          className="flex-1 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: bootPhase >= 2 ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* SVG Content - Phase 3 with pathLength animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: bootPhase >= 3 ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {typeof children === "function"
              ? children({ isHovered, bootPhase })
              : children}
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
