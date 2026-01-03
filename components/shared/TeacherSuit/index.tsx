"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { SuitVisualization } from "./SuitVisualization";

interface TeacherSuitPanelProps {
  className?: string;
  transformProgress?: import("framer-motion").MotionValue<number>;
}

// HUD dashboard data points
const hudMetrics = [
  { label: "NEURAL LINK", value: "ACTIVE", status: "online" },
  { label: "BIOMETRICS", value: "NOMINAL", status: "online" },
  { label: "POWER CORE", value: "98.7%", status: "online" },
  { label: "COMMS ARRAY", value: "LINKED", status: "online" },
];

const systemLogs = [
  "// CLASSROOM PROTOCOLS LOADED",
  "// BEHAVIORAL ANALYSIS: ENABLED",
  "// ENGAGEMENT METRICS: TRACKING",
  "// INTERVENTION TIMER: STANDBY",
  "// DIFFERENTIATION: OPTIMIZED",
];

export function TeacherSuitPanel({ className, transformProgress: externalProgress }: TeacherSuitPanelProps) {
  const [isPoweredOn, setIsPoweredOn] = useState(false);
  const [bootPhase, setBootPhase] = useState(0); // 0=off, 1=traces, 2=circuits, 3=full
  const [internalProgress, setInternalProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [showQuote, setShowQuote] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });

  // Use external progress if provided, otherwise use internal
  const [currentProgress, setCurrentProgress] = useState(0);

  // Sync with external MotionValue if provided
  useEffect(() => {
    if (!externalProgress) return;

    const unsubscribe = externalProgress.on("change", (value) => {
      setCurrentProgress(value);
    });

    return () => unsubscribe();
  }, [externalProgress]);

  // Power-on sequence when in view
  useEffect(() => {
    if (!isInView) return;

    const sequence = [
      { delay: 200, action: () => setBootPhase(1) },
      { delay: 800, action: () => setBootPhase(2) },
      { delay: 1400, action: () => setBootPhase(3) },
      { delay: 2000, action: () => setIsPoweredOn(true) },
    ];

    const timeouts: NodeJS.Timeout[] = [];
    sequence.forEach(({ delay, action }) => {
      timeouts.push(setTimeout(action, delay));
    });

    return () => timeouts.forEach(clearTimeout);
  }, [isInView]);

  // Internal transform progress animation (only if no external progress)
  useEffect(() => {
    if (!isPoweredOn || externalProgress) return;

    const duration = 2000;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setInternalProgress(progress);
      setCurrentProgress(progress);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isPoweredOn, externalProgress]);

  // Show quote on hover after fully powered
  useEffect(() => {
    if (isHovered && isPoweredOn && currentProgress >= 1) {
      const timeout = setTimeout(() => setShowQuote(true), 300);
      return () => clearTimeout(timeout);
    } else {
      setShowQuote(false);
    }
  }, [isHovered, isPoweredOn, currentProgress]);

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full max-w-5xl mx-auto", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main Frame - Carbon Fiber with Red Underglow */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={cn(
          "relative rounded-2xl overflow-hidden",
          // Carbon fiber gradient
          "bg-gradient-to-b from-[#1a1a1a] via-[#0f0f0f] to-[#1a1a1a]",
          "border-2 border-[#2a2a2a]",
          // Red underglow
          "shadow-[0_0_10px_rgba(255,45,45,0.3),0_0_30px_rgba(255,45,45,0.2),0_0_60px_rgba(255,45,45,0.1),0_10px_40px_rgba(0,0,0,0.5)]"
        )}
      >
        {/* Frame bevels */}
        <div className="absolute inset-0 rounded-2xl border border-[#3a3a3a]/30 pointer-events-none" />
        <div className="absolute inset-[3px] rounded-xl border border-[#0a0a0a]/80 pointer-events-none" />

        {/* Screen bezel */}
        <div className="m-3 md:m-4 rounded-xl overflow-hidden relative">
          {/* Main display container */}
          <div
            className={cn(
              "relative bg-[#0a0a0a] min-h-[450px] md:min-h-[500px]",
              "shadow-[inset_0_0_30px_rgba(0,0,0,0.8)]"
            )}
          >
            {/* Scan lines overlay */}
            <div className="ops-tablet-scanlines absolute inset-0 pointer-events-none z-20" />

            {/* Flicker overlay */}
            <div className="ops-tablet-flicker absolute inset-0 pointer-events-none z-20" />

            {/* Noise texture overlay */}
            <div className="ops-tablet-noise absolute inset-0 pointer-events-none z-20 opacity-[0.03]" />

            {/* Boot sequence overlay */}
            <AnimatePresence>
              {!isPoweredOn && (
                <motion.div
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 z-30 bg-[#0a0a0a] flex items-center justify-center"
                >
                  <div className="text-center font-mono">
                    {bootPhase === 0 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-[#6b7280] text-sm"
                      >
                        STANDBY
                      </motion.div>
                    )}
                    {bootPhase >= 1 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-2"
                      >
                        <div className="text-[#ff2d2d] text-xs tracking-widest animate-pulse">
                          INITIALIZING SUIT SYSTEMS
                        </div>
                        {bootPhase >= 2 && (
                          <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            className="h-0.5 w-48 bg-gradient-to-r from-transparent via-[#ff2d2d] to-transparent mx-auto"
                          />
                        )}
                        {bootPhase >= 3 && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-[#ff2d2d]/60 text-[10px] tracking-wider"
                          >
                            CIRCUITS ONLINE
                          </motion.div>
                        )}
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Split Panel Layout */}
            <div className="relative h-full flex flex-col md:flex-row">
              {/* Left Panel - Suit Visualization (40%) */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isPoweredOn ? 1 : 0 }}
                transition={{ duration: 0.5 }}
                className="w-full md:w-[40%] h-[280px] md:h-[500px] relative border-b md:border-b-0 md:border-r border-[#ff2d2d]/20"
              >
                {/* Suit display area */}
                <div className="absolute inset-4 md:inset-6">
                  <SuitVisualization
                    transformProgress={currentProgress}
                    isHovered={isHovered}
                    className="w-full h-full"
                  />
                </div>

                {/* Corner decorations */}
                <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-[#ff2d2d]/40" />
                <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-[#ff2d2d]/40" />
                <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-[#ff2d2d]/40" />
                <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-[#ff2d2d]/40" />

                {/* Status indicator */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
                  <motion.div
                    className="w-2 h-2 rounded-full bg-[#ff2d2d]"
                    animate={{
                      opacity: isPoweredOn ? [0.5, 1, 0.5] : 0.2,
                      scale: isPoweredOn ? [1, 1.2, 1] : 1,
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  <span className="text-[10px] font-mono text-[#ff2d2d]/60 tracking-wider">
                    {isPoweredOn ? "SUIT ACTIVE" : "OFFLINE"}
                  </span>
                </div>
              </motion.div>

              {/* Right Panel - HUD Dashboard (60%) */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isPoweredOn ? 1 : 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="w-full md:w-[60%] p-4 md:p-6 flex flex-col gap-4 font-mono"
              >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-[#ff2d2d]/30 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#ff2d2d] animate-pulse" />
                    <span className="text-xs text-[#ff2d2d] tracking-widest">
                      TEACHER SUIT MK.VII
                    </span>
                  </div>
                  <span className="text-[10px] text-[#6b7280]">
                    v2.4.1
                  </span>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 gap-3">
                  {hudMetrics.map((metric, index) => (
                    <motion.div
                      key={metric.label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index + 0.5 }}
                      className="p-3 bg-[#0f0f0f]/80 border border-[#ff2d2d]/20 rounded"
                    >
                      <div className="text-[10px] text-[#6b7280] mb-1 tracking-wider">
                        {metric.label}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-[#E2E8F0]">
                          {metric.value}
                        </span>
                        <div
                          className={cn(
                            "w-2 h-2 rounded-full",
                            metric.status === "online"
                              ? "bg-[#22c55e]"
                              : "bg-[#f97316]"
                          )}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* System Logs */}
                <div className="flex-1 p-3 bg-[#0a0a0a]/60 border border-[#1f1f1f] rounded overflow-hidden">
                  <div className="text-[10px] text-[#ff2d2d]/60 mb-2 tracking-wider">
                    SYSTEM LOG
                  </div>
                  <div className="space-y-1">
                    {systemLogs.map((log, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.15 * index + 0.8 }}
                        className="text-[11px] text-[#6b7280]"
                      >
                        {log}
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Transform Progress Bar */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-[#6b7280]">TRANSFORMATION</span>
                    <span className="text-[#ff2d2d]">
                      {Math.round(currentProgress * 100)}%
                    </span>
                  </div>
                  <div className="h-2 bg-[#1f1f1f] rounded overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-[#ff2d2d] to-[#f97316]"
                      style={{ width: `${currentProgress * 100}%` }}
                      transition={{ duration: 0.1 }}
                    />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Quote Overlay */}
            <AnimatePresence>
              {showQuote && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/95 to-transparent z-10"
                >
                  <blockquote className="text-center">
                    <p className="text-sm md:text-base text-[#E2E8F0]/90 italic font-mono leading-relaxed">
                      &ldquo;Classroom management is systems management with a social layer on top.&rdquo;
                    </p>
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                      className="mt-3 h-px w-32 bg-gradient-to-r from-transparent via-[#ff2d2d]/60 to-transparent mx-auto"
                    />
                  </blockquote>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom bezel */}
        <div className="h-6 bg-gradient-to-b from-[#0f0f0f] to-[#1a1a1a] flex items-center justify-center gap-4">
          <div className="w-8 h-1 bg-[#2a2a2a] rounded-full" />
          <motion.div
            className="w-2 h-2 bg-[#ff2d2d]/30 rounded-full"
            animate={{
              backgroundColor: isPoweredOn
                ? ["rgba(255,45,45,0.3)", "rgba(255,45,45,0.8)", "rgba(255,45,45,0.3)"]
                : "rgba(255,45,45,0.1)",
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <div className="w-8 h-1 bg-[#2a2a2a] rounded-full" />
        </div>
      </motion.div>

      {/* Tablet stand/shadow */}
      <div className="h-4 mx-16 bg-gradient-to-b from-[#0a0a0a]/80 to-transparent rounded-b-full" />
    </div>
  );
}

// Re-export SuitVisualization component
export { SuitVisualization } from "./SuitVisualization";
