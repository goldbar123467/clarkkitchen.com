"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useInView, AnimatePresence, PanInfo } from "framer-motion";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { missions, type Mission } from "@/lib/data/projects";
import { ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react";

// Sort missions: featured first, then by category
const sortedMissions = [
  ...missions.filter((m) => m.featured),
  ...missions.filter((m) => !m.featured),
];

// Status badge styling
const statusStyles: Record<string, string> = {
  complete: "bg-[#ff2d2d]/20 text-[#ff2d2d] border-[#ff2d2d]/50",
  active: "bg-[#f97316]/20 text-[#f97316] border-[#f97316]/50",
};

// Category labels
const categoryLabels: Record<string, string> = {
  "ai-ml": "ARTIFICIAL INTELLIGENCE",
  games: "SIMULATION SYSTEMS",
  quantitative: "QUANTITATIVE ANALYSIS",
  edtech: "EDUCATION TECHNOLOGY",
  infrastructure: "INFRASTRUCTURE",
};

interface MissionCardProps {
  mission: Mission;
  isActive: boolean;
}

function MissionCard({ mission, isActive }: MissionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isActive ? 1 : 0.3 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "w-full h-full p-6 md:p-8 flex flex-col",
        "font-mono text-[#E2E8F0]"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#ff2d2d]/30">
        <div className="flex items-center gap-3">
          <span className="text-xs text-[#6b7280]">CODENAME:</span>
          <span className="text-lg md:text-xl font-bold text-[#ff2d2d]">
            {mission.codename}
          </span>
        </div>
        <Badge
          variant="outline"
          className={cn("uppercase text-[10px] tracking-wider", statusStyles[mission.status])}
        >
          {mission.status}
        </Badge>
      </div>

      {/* Classification */}
      <div className="text-[10px] text-[#6b7280] mb-4 tracking-widest">
        CLASSIFICATION: {categoryLabels[mission.category] || mission.category.toUpperCase()}
      </div>

      {/* Primary Intel */}
      <div className="mb-4">
        <div className="text-xs text-[#ff2d2d]/80 mb-2 tracking-wider">PRIMARY INTEL:</div>
        <p className="text-sm leading-relaxed text-[#E2E8F0]/90">{mission.intel}</p>
      </div>

      {/* Assets Deployed */}
      <div className="mb-4">
        <div className="text-xs text-[#ff2d2d]/80 mb-2 tracking-wider">ASSETS DEPLOYED:</div>
        <div className="flex flex-wrap gap-2">
          {mission.assetsDeployed.map((asset) => (
            <span
              key={asset}
              className="px-2 py-0.5 text-xs bg-[#1f1f1f] border border-[#ff2d2d]/20 rounded"
            >
              {asset}
            </span>
          ))}
        </div>
      </div>

      {/* Field Results */}
      <div className="mb-4 flex-1">
        <div className="text-xs text-[#ff2d2d]/80 mb-2 tracking-wider">FIELD RESULTS:</div>
        <ul className="space-y-1.5">
          {mission.fieldResults.slice(0, 4).map((result, i) => (
            <li key={i} className="text-xs text-[#E2E8F0]/80 flex items-start gap-2">
              <span className="text-[#ff2d2d] mt-0.5">&#9656;</span>
              <span>{result}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Mission Context */}
      <div className="mb-6 p-3 bg-[#0a0a0a]/60 rounded border border-[#1f1f1f]">
        <div className="text-xs text-[#ff2d2d]/80 mb-2 tracking-wider">MISSION CONTEXT:</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px]">
          <div>
            <span className="text-[#6b7280]">Technical: </span>
            <span className="text-[#E2E8F0]/80">{mission.missionContext.technicalLayer.split(" ").slice(0, 6).join(" ")}...</span>
          </div>
          <div>
            <span className="text-[#6b7280]">Social: </span>
            <span className="text-[#E2E8F0]/80">{mission.missionContext.socialLayer.split(" ").slice(0, 6).join(" ")}...</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        {mission.links.github && (
          <a
            href={mission.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-wider",
              "border border-[#ff2d2d]/50 bg-[#0a0a0a]/80 rounded",
              "hover:bg-[#ff2d2d]/10 hover:border-[#ff2d2d] transition-all duration-300"
            )}
          >
            <Github className="w-4 h-4" />
            SOURCE
          </a>
        )}
        {mission.links.live && (
          <a
            href={mission.links.live}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-wider",
              "border border-[#f97316]/50 bg-[#0a0a0a]/80 rounded",
              "hover:bg-[#f97316]/10 hover:border-[#f97316] transition-all duration-300"
            )}
          >
            <ExternalLink className="w-4 h-4" />
            LIVE
          </a>
        )}
      </div>
    </motion.div>
  );
}

export function OpsTablet() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingText, setLoadingText] = useState("ACCESSING ARCHIVES");
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });

  // Loading animation
  useEffect(() => {
    if (!isInView) return;

    const texts = [
      "ACCESSING ARCHIVES",
      "ACCESSING ARCHIVES.",
      "ACCESSING ARCHIVES..",
      "ACCESSING ARCHIVES...",
      "DECRYPTING DATA",
      "DECRYPTING DATA.",
      "DECRYPTING DATA..",
      "DECRYPTING DATA...",
      "LOADING MISSION FILES",
      "LOADING MISSION FILES.",
      "LOADING MISSION FILES..",
      "LOADING MISSION FILES...",
    ];

    let i = 0;
    const interval = setInterval(() => {
      setLoadingText(texts[i % texts.length]);
      i++;
    }, 150);

    const timeout = setTimeout(() => {
      clearInterval(interval);
      setIsLoading(false);
    }, 1500);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [isInView]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        setCurrentIndex((prev) => (prev > 0 ? prev - 1 : sortedMissions.length - 1));
      } else if (e.key === "ArrowRight") {
        setCurrentIndex((prev) => (prev < sortedMissions.length - 1 ? prev + 1 : 0));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Drag handler
  const handleDragEnd = useCallback(
    (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      const threshold = 50;
      if (info.offset.x > threshold) {
        setCurrentIndex((prev) => (prev > 0 ? prev - 1 : sortedMissions.length - 1));
      } else if (info.offset.x < -threshold) {
        setCurrentIndex((prev) => (prev < sortedMissions.length - 1 ? prev + 1 : 0));
      }
    },
    []
  );

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : sortedMissions.length - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev < sortedMissions.length - 1 ? prev + 1 : 0));
  };

  return (
    <section
      id="ops-tablet"
      ref={containerRef}
      className="min-h-screen py-20 px-4 md:px-8 lg:px-16 flex items-center justify-center relative overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0 bg-dot opacity-20" />
      <div className="absolute inset-0 tech-glow" />

      <motion.div
        initial={{ opacity: 0, y: 100, rotateX: 15 }}
        animate={isInView ? { opacity: 1, y: 0, rotateX: 5 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{ perspective: 1000 }}
        className="w-full max-w-4xl"
      >
        {/* Tablet Frame */}
        <div
          className={cn(
            "relative rounded-2xl overflow-hidden",
            // Carbon fiber / dark metal frame
            "bg-gradient-to-b from-[#1a1a1a] via-[#0f0f0f] to-[#1a1a1a]",
            "border-2 border-[#2a2a2a]",
            // Red underglow - layered box shadows
            "ops-tablet-glow"
          )}
        >
          {/* Frame bevels */}
          <div className="absolute inset-0 rounded-2xl border border-[#3a3a3a]/30 pointer-events-none" />
          <div className="absolute inset-[3px] rounded-xl border border-[#0a0a0a]/80 pointer-events-none" />

          {/* Screen bezel */}
          <div className="m-3 md:m-4 rounded-xl overflow-hidden relative">
            {/* Screen container with shader effects */}
            <div
              className={cn(
                "relative bg-[#0a0a0a] min-h-[500px] md:min-h-[550px]",
                // Inner shadow for depth
                "shadow-[inset_0_0_30px_rgba(0,0,0,0.8)]"
              )}
            >
              {/* Scan lines overlay */}
              <div className="ops-tablet-scanlines absolute inset-0 pointer-events-none z-10" />

              {/* Flicker overlay */}
              <div className="ops-tablet-flicker absolute inset-0 pointer-events-none z-10" />

              {/* Noise texture overlay */}
              <div className="ops-tablet-noise absolute inset-0 pointer-events-none z-10 opacity-[0.03]" />

              {/* Chromatic aberration border */}
              <div className="absolute inset-0 opacity-30 pointer-events-none z-10">
                <div className="absolute inset-0 border-l border-cyan-500/20" style={{ transform: "translateX(-1px)" }} />
                <div className="absolute inset-0 border-r border-red-500/20" style={{ transform: "translateX(1px)" }} />
              </div>

              {/* Loading State */}
              <AnimatePresence mode="wait">
                {isLoading && isInView ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex items-center justify-center z-20"
                  >
                    <div className="text-center">
                      <div className="w-16 h-16 border-2 border-[#ff2d2d]/30 border-t-[#ff2d2d] rounded-full animate-spin mb-4 mx-auto" />
                      <p className="font-mono text-[#ff2d2d] text-sm tracking-widest animate-pulse">
                        {loadingText}
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="content"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="relative h-full"
                  >
                    {/* Navigation arrows */}
                    <button
                      onClick={goToPrev}
                      className={cn(
                        "absolute left-2 top-1/2 -translate-y-1/2 z-30",
                        "w-10 h-20 flex items-center justify-center",
                        "text-[#ff2d2d]/50 hover:text-[#ff2d2d] transition-colors duration-300",
                        "hover:bg-[#ff2d2d]/10 rounded"
                      )}
                      aria-label="Previous mission"
                    >
                      <ChevronLeft className="w-8 h-8" />
                    </button>

                    <button
                      onClick={goToNext}
                      className={cn(
                        "absolute right-2 top-1/2 -translate-y-1/2 z-30",
                        "w-10 h-20 flex items-center justify-center",
                        "text-[#ff2d2d]/50 hover:text-[#ff2d2d] transition-colors duration-300",
                        "hover:bg-[#ff2d2d]/10 rounded"
                      )}
                      aria-label="Next mission"
                    >
                      <ChevronRight className="w-8 h-8" />
                    </button>

                    {/* Draggable mission cards */}
                    <motion.div
                      drag="x"
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={0.2}
                      onDragEnd={handleDragEnd}
                      className="cursor-grab active:cursor-grabbing h-full"
                    >
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={currentIndex}
                          initial={{ opacity: 0, x: 50 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -50 }}
                          transition={{ duration: 0.3 }}
                          className="h-full"
                        >
                          <MissionCard
                            mission={sortedMissions[currentIndex]}
                            isActive={true}
                          />
                        </motion.div>
                      </AnimatePresence>
                    </motion.div>

                    {/* Progress dots */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-30">
                      {sortedMissions.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setCurrentIndex(i)}
                          className={cn(
                            "w-2 h-2 rounded-full transition-all duration-300",
                            i === currentIndex
                              ? "bg-[#ff2d2d] w-4 animate-pulse"
                              : "bg-[#ff2d2d]/30 hover:bg-[#ff2d2d]/50"
                          )}
                          aria-label={`Go to mission ${i + 1}`}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Bottom bezel with subtle details */}
          <div className="h-6 bg-gradient-to-b from-[#0f0f0f] to-[#1a1a1a] flex items-center justify-center gap-4">
            <div className="w-8 h-1 bg-[#2a2a2a] rounded-full" />
            <div className="w-2 h-2 bg-[#ff2d2d]/30 rounded-full" />
            <div className="w-8 h-1 bg-[#2a2a2a] rounded-full" />
          </div>
        </div>

        {/* Tablet stand/shadow */}
        <div className="h-4 mx-16 bg-gradient-to-b from-[#0a0a0a]/80 to-transparent rounded-b-full" />
      </motion.div>

      {/* Instructions hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView && !isLoading ? { opacity: 1 } : {}}
        transition={{ delay: 2, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs text-[#6b7280] font-mono tracking-wider"
      >
        <span className="hidden md:inline">USE ARROW KEYS OR </span>SWIPE TO NAVIGATE
      </motion.div>
    </section>
  );
}
