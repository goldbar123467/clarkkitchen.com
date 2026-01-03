"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TacticalTypewriterProps {
  prefix?: string;
  lines: Array<{ text: string; category?: string }>;
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  showStatus?: boolean;
  statusLabel?: string;
}

export function TacticalTypewriter({
  prefix = "BUILDING",
  lines,
  typingSpeed = 60,
  deletingSpeed = 40,
  pauseDuration = 2500,
  className = "",
  size = "md",
  showStatus = true,
  statusLabel = "ACTIVE",
}: TacticalTypewriterProps) {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  // Blinking cursor effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(cursorInterval);
  }, []);

  // Typing animation
  useEffect(() => {
    const currentLine = lines[currentLineIndex].text;

    if (!isDeleting && currentText === currentLine) {
      const pauseTimeout = setTimeout(() => {
        setIsDeleting(true);
      }, pauseDuration);
      return () => clearTimeout(pauseTimeout);
    }

    if (isDeleting && currentText === "") {
      setIsDeleting(false);
      setCurrentLineIndex((prev) => (prev + 1) % lines.length);
      return;
    }

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setCurrentText(currentLine.substring(0, currentText.length + 1));
        } else {
          setCurrentText(currentText.substring(0, currentText.length - 1));
        }
      },
      isDeleting ? deletingSpeed : typingSpeed
    );

    return () => clearTimeout(timeout);
  }, [currentText, currentLineIndex, isDeleting, lines, typingSpeed, deletingSpeed, pauseDuration]);

  const currentCategory = lines[currentLineIndex].category;

  // Size variants
  const sizeStyles = {
    sm: {
      container: "px-4 py-3",
      prefix: "text-xs",
      text: "text-sm",
      category: "text-[9px]",
      status: "text-[8px] px-2 py-0.5",
    },
    md: {
      container: "px-5 py-4",
      prefix: "text-sm",
      text: "text-base md:text-lg",
      category: "text-[10px]",
      status: "text-[9px] px-2.5 py-1",
    },
    lg: {
      container: "px-6 py-5",
      prefix: "text-base",
      text: "text-lg md:text-xl",
      category: "text-xs",
      status: "text-[10px] px-3 py-1",
    },
    xl: {
      container: "px-4 sm:px-6 md:px-8 py-4 sm:py-6",
      prefix: "text-base sm:text-lg",
      text: "text-lg sm:text-xl md:text-2xl lg:text-3xl",
      category: "text-xs sm:text-sm",
      status: "text-[10px] sm:text-xs px-3 sm:px-4 py-1 sm:py-1.5",
    },
  };

  const styles = sizeStyles[size];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "relative inline-block w-full max-w-[320px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[550px]",
        className
      )}
    >
      {/* Outer frame with red underglow */}
      <div
        className={cn(
          "relative rounded-lg overflow-hidden",
          // Carbon fiber / dark metal frame
          "bg-gradient-to-b from-[#1a1a1a] via-[#0f0f0f] to-[#1a1a1a]",
          "border border-[#2a2a2a]",
          // Red underglow - enhanced Batman Beyond effect
          "shadow-[0_0_20px_rgba(255,45,45,0.25),0_0_40px_rgba(255,45,45,0.15),0_0_60px_rgba(255,45,45,0.08),inset_0_0_30px_rgba(255,45,45,0.05)]"
        )}
      >
        {/* Frame bevels */}
        <div className="absolute inset-0 rounded-lg border border-[#3a3a3a]/20 pointer-events-none" />
        <div className="absolute inset-[1px] rounded-lg border border-[#0a0a0a]/60 pointer-events-none" />

        {/* Screen area */}
        <div className={cn("relative", styles.container)}>
          {/* Inner screen with depth */}
          <div
            className={cn(
              "relative bg-[#0a0a0a] rounded-md overflow-hidden",
              "shadow-[inset_0_0_20px_rgba(0,0,0,0.6)]",
              "border border-[#1f1f1f]"
            )}
          >
            {/* Scan lines overlay - enhanced visibility */}
            <div
              className="absolute inset-0 pointer-events-none z-10 opacity-[0.08]"
              style={{
                backgroundImage: `repeating-linear-gradient(
                  0deg,
                  transparent,
                  transparent 2px,
                  rgba(255, 45, 45, 0.1) 2px,
                  rgba(255, 45, 45, 0.1) 4px
                )`,
                backgroundSize: "100% 4px",
                animation: "scanlines 8s linear infinite",
              }}
            />

            {/* Flicker effect */}
            <div
              className="absolute inset-0 pointer-events-none z-10"
              style={{
                animation: "flicker 4s ease-in-out infinite",
              }}
            />

            {/* Chromatic aberration edges */}
            <div className="absolute inset-0 opacity-20 pointer-events-none z-10">
              <div className="absolute inset-0 border-l border-cyan-500/30" style={{ transform: "translateX(-0.5px)" }} />
              <div className="absolute inset-0 border-r border-red-500/30" style={{ transform: "translateX(0.5px)" }} />
            </div>

            {/* Content container */}
            <div className="relative z-0 p-4">
              {/* Top bar with status and classification - proper justify-between */}
              <div className="flex items-center justify-between mb-4">
                {/* Classification indicator */}
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#ff2d2d] animate-pulse flex-shrink-0" />
                  <span className={cn("font-mono text-[#6b7280] tracking-[0.2em] uppercase", styles.category)}>
                    SYSTEM ACTIVE
                  </span>
                </div>

                {/* Status badge - aligned right */}
                {showStatus && (
                  <div
                    className={cn(
                      "font-mono tracking-wider uppercase flex-shrink-0",
                      "bg-[#ff2d2d]/10 text-[#ff2d2d] border border-[#ff2d2d]/30 rounded",
                      styles.status
                    )}
                  >
                    {statusLabel}
                  </div>
                )}
              </div>

              {/* Main typewriter content - center aligned */}
              <div className="flex flex-col items-center text-center gap-1">
                {/* Prefix line - centered */}
                <div className={cn("font-mono text-[#6b7280] tracking-wider", styles.prefix)}>
                  {prefix}:
                </div>

                {/* Typewriter text - centered */}
                <div className="flex items-center justify-center gap-2 min-h-[1.75em]">
                  <span
                    className={cn(
                      "font-mono font-semibold tracking-wide",
                      styles.text
                    )}
                    style={{
                      color: "#ff2d2d",
                      textShadow: "0 0 15px rgba(255, 45, 45, 0.7), 0 0 30px rgba(255, 45, 45, 0.4), 0 0 45px rgba(255, 45, 45, 0.2)",
                    }}
                  >
                    {currentText}
                  </span>
                  {/* Cursor */}
                  <span
                    className={cn(
                      "inline-block w-[4px] h-[1.2em] bg-[#ff2d2d] rounded-sm flex-shrink-0",
                      showCursor ? "opacity-100" : "opacity-0",
                      "transition-opacity duration-75"
                    )}
                    style={{
                      boxShadow: "0 0 12px rgba(255, 45, 45, 0.9), 0 0 20px rgba(255, 45, 45, 0.5)",
                    }}
                  />
                </div>

                {/* Category badge - centered with symmetric dashes */}
                {currentCategory && (
                  <motion.div
                    key={currentCategory}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-center gap-3 mt-2 w-full"
                  >
                    <div className="h-px w-8 bg-gradient-to-r from-transparent to-[#ff2d2d]/40" />
                    <span className={cn("font-mono text-[#6b7280] tracking-[0.15em] uppercase flex-shrink-0", styles.category)}>
                      {currentCategory}
                    </span>
                    <div className="h-px w-8 bg-gradient-to-l from-transparent to-[#ff2d2d]/40" />
                  </motion.div>
                )}
              </div>

              {/* Bottom decoration - proper justify-between */}
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#1f1f1f]">
                {/* Progress dots - left */}
                <div className="flex items-center gap-1">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className={cn(
                        "w-1.5 h-1.5 rounded-full transition-colors duration-200",
                        i === currentLineIndex % 3 ? "bg-[#ff2d2d]" : "bg-[#ff2d2d]/20"
                      )}
                    />
                  ))}
                </div>

                {/* Counter - right */}
                <span className="font-mono text-[10px] text-[#6b7280]/60 tracking-widest">
                  {String(currentLineIndex + 1).padStart(2, "0")}/{String(lines.length).padStart(2, "0")}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom accent bar */}
        <div className="h-1 bg-gradient-to-r from-transparent via-[#ff2d2d]/30 to-transparent" />
      </div>

      {/* Subtle reflection/shadow beneath */}
      <div className="h-2 mx-4 bg-gradient-to-b from-[#ff2d2d]/5 to-transparent rounded-b-full" />

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes scanlines {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 0 100%;
          }
        }

        @keyframes flicker {
          0%, 100% {
            opacity: 0;
          }
          50% {
            opacity: 0.02;
            background: rgba(255, 45, 45, 0.02);
          }
        }
      `}</style>
    </motion.div>
  );
}
