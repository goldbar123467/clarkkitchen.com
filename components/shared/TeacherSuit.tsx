"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface TeacherSuitPanelProps {
  transformProgress: any; // MotionValue from framer-motion
}

export function TeacherSuitPanel({ transformProgress }: TeacherSuitPanelProps) {
  const [suitHovered, setSuitHovered] = useState(false);
  const [transformValue, setTransformValue] = useState(0);

  useEffect(() => {
    const unsubscribe = transformProgress.on("change", (v: number) => {
      setTransformValue(v);
    });
    return () => unsubscribe();
  }, [transformProgress]);

  return (
    <div
      className={cn(
        "relative p-8 rounded-xl",
        "bg-[#0a0a0a]/60 backdrop-blur-sm",
        "border border-[#1f1f1f]",
        "transition-all duration-500",
        suitHovered && "border-[#ff2d2d]/40 shadow-[0_0_60px_rgba(255,45,45,0.15)]"
      )}
      onMouseEnter={() => setSuitHovered(true)}
      onMouseLeave={() => setSuitHovered(false)}
    >
      {/* Spotlight effect from above */}
      <div
        className="absolute -top-4 left-1/2 -translate-x-1/2 w-3/4 h-8 rounded-full"
        style={{
          background: "radial-gradient(ellipse, rgba(255,45,45,0.3), transparent)",
          filter: "blur(10px)",
        }}
      />

      {/* Suit visualization */}
      <div className="relative h-[400px] md:h-[500px]">
        <TeacherSuit transformProgress={transformValue} />
      </div>

      {/* Label plate */}
      <div className="mt-6 text-center">
        <div className="inline-block px-6 py-3 rounded-lg bg-[#121212] border border-[#1f1f1f]">
          <h3 className="font-mono text-[#ff2d2d] text-sm tracking-wider mb-1">
            THE TEACHER SUIT
          </h3>
          <p className="font-mono text-[10px] text-[#6b7280]">
            CLASSROOM::SYSTEMS::INTERFACE
          </p>
        </div>
      </div>

      {/* Hover quote overlay */}
      <AnimatePresence>
        {suitHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className={cn(
              "absolute bottom-24 left-1/2 -translate-x-1/2",
              "w-full max-w-xs px-4 py-3 rounded-lg",
              "bg-[#0a0a0a]/95 backdrop-blur-xl",
              "border border-[#ff2d2d]/40"
            )}
          >
            <p className="text-[#E2E8F0] text-sm italic text-center leading-relaxed">
              "Classroom management is systems management with a social layer on top."
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Teacher Suit SVG Component with transformation effect
function TeacherSuit({ transformProgress }: { transformProgress: number }) {
  // Transform progress: 0 = normal suit, 1 = fully circuitry
  const circuitOpacity = transformProgress;
  const fabricOpacity = 1 - transformProgress;

  return (
    <svg viewBox="0 0 300 400" className="w-full h-full">
      <defs>
        {/* Fabric gradient for normal half */}
        <linearGradient id="fabricGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1a1a1a" />
          <stop offset="50%" stopColor="#2a2a2a" />
          <stop offset="100%" stopColor="#1a1a1a" />
        </linearGradient>

        {/* Circuitry gradient */}
        <linearGradient id="circuitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0a0a0a" />
          <stop offset="100%" stopColor="#121212" />
        </linearGradient>

        {/* Glow filter for circuit lines */}
        <filter id="circuitGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="glow" />
          <feMerge>
            <feMergeNode in="glow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Energy flow gradient */}
        <linearGradient id="energyFlow" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#ff2d2d" stopOpacity="0" />
          <stop offset="50%" stopColor="#ff2d2d" stopOpacity="1" />
          <stop offset="100%" stopColor="#ff2d2d" stopOpacity="0" />
        </linearGradient>

        {/* Clip paths for left/right halves */}
        <clipPath id="leftHalf">
          <rect x="0" y="0" width="150" height="400" />
        </clipPath>
        <clipPath id="rightHalf">
          <rect x="150" y="0" width="150" height="400" />
        </clipPath>
      </defs>

      {/* Suit outline - shared */}
      <g id="suitBase">
        {/* Left lapel */}
        <path
          d="M100 50 L100 180 L150 200 L150 50 Q140 30, 100 50"
          fill="url(#fabricGradient)"
          stroke="#333"
          strokeWidth="1"
        />
        {/* Right lapel */}
        <path
          d="M200 50 L200 180 L150 200 L150 50 Q160 30, 200 50"
          fill="url(#fabricGradient)"
          stroke="#333"
          strokeWidth="1"
        />
        {/* Left shoulder */}
        <path
          d="M100 50 Q70 60, 50 80 L50 200 L100 180 L100 50"
          fill="url(#fabricGradient)"
          stroke="#333"
          strokeWidth="1"
        />
        {/* Right shoulder */}
        <path
          d="M200 50 Q230 60, 250 80 L250 200 L200 180 L200 50"
          fill="url(#fabricGradient)"
          stroke="#333"
          strokeWidth="1"
        />
        {/* Body left */}
        <path
          d="M50 200 L50 380 L150 380 L150 200"
          fill="url(#fabricGradient)"
          stroke="#333"
          strokeWidth="1"
        />
        {/* Body right */}
        <path
          d="M150 200 L150 380 L250 380 L250 200"
          fill="url(#fabricGradient)"
          stroke="#333"
          strokeWidth="1"
        />
      </g>

      {/* Normal fabric texture - left side (fades out) */}
      <g clipPath="url(#leftHalf)" style={{ opacity: fabricOpacity }}>
        {/* Pinstripes */}
        {[60, 80, 100, 120, 140].map((x) => (
          <line
            key={x}
            x1={x}
            y1="50"
            x2={x}
            y2="380"
            stroke="#222"
            strokeWidth="0.5"
            opacity="0.5"
          />
        ))}
        {/* Pocket */}
        <rect x="70" y="220" width="50" height="5" fill="#1a1a1a" stroke="#333" strokeWidth="0.5" />
        <rect x="70" y="225" width="50" height="40" fill="none" stroke="#333" strokeWidth="0.5" />
        {/* Button */}
        <circle cx="140" cy="250" r="6" fill="#1a1a1a" stroke="#444" strokeWidth="1" />
        <circle cx="140" cy="310" r="6" fill="#1a1a1a" stroke="#444" strokeWidth="1" />
      </g>

      {/* Circuitry overlay - right side and spreading left (fades in) */}
      <g style={{ opacity: circuitOpacity }} filter="url(#circuitGlow)">
        {/* Circuit board background */}
        <rect x="150" y="50" width="100" height="330" fill="url(#circuitGradient)" opacity="0.8" />

        {/* Main circuit traces */}
        <path
          d="M160 80 L160 350"
          stroke="#ff2d2d"
          strokeWidth="2"
          opacity="0.8"
        />
        <path
          d="M180 60 L180 200 L220 200 L220 380"
          stroke="#ff2d2d"
          strokeWidth="1.5"
          opacity="0.6"
        />
        <path
          d="M200 100 L200 150 L240 150 L240 300"
          stroke="#ff2d2d"
          strokeWidth="1.5"
          opacity="0.6"
        />

        {/* Horizontal connections */}
        <path d="M160 120 L240 120" stroke="#ff2d2d" strokeWidth="1" opacity="0.5" />
        <path d="M160 180 L200 180" stroke="#ff2d2d" strokeWidth="1" opacity="0.5" />
        <path d="M180 240 L240 240" stroke="#ff2d2d" strokeWidth="1" opacity="0.5" />
        <path d="M160 300 L220 300" stroke="#ff2d2d" strokeWidth="1" opacity="0.5" />

        {/* Data nodes */}
        {[
          { x: 160, y: 120 },
          { x: 200, y: 120 },
          { x: 240, y: 120 },
          { x: 180, y: 180 },
          { x: 220, y: 200 },
          { x: 180, y: 240 },
          { x: 240, y: 240 },
          { x: 160, y: 300 },
          { x: 220, y: 300 },
        ].map((node, i) => (
          <g key={i}>
            <circle
              cx={node.x}
              cy={node.y}
              r="4"
              fill="#ff2d2d"
              opacity="0.8"
            />
            <circle
              cx={node.x}
              cy={node.y}
              r="6"
              fill="none"
              stroke="#ff2d2d"
              strokeWidth="1"
              opacity="0.4"
              className="animate-pulse"
            />
          </g>
        ))}

        {/* Code snippets / data patterns */}
        <text x="165" y="140" fill="#ff2d2d" fontSize="6" opacity="0.6" fontFamily="monospace">
          01100101
        </text>
        <text x="185" y="220" fill="#ff2d2d" fontSize="6" opacity="0.6" fontFamily="monospace">
          fn teach()
        </text>
        <text x="165" y="280" fill="#ff2d2d" fontSize="6" opacity="0.6" fontFamily="monospace">
          loop &#123; &#125;
        </text>
        <text x="195" y="340" fill="#ff2d2d" fontSize="6" opacity="0.6" fontFamily="monospace">
          async
        </text>
      </g>

      {/* Transformation zone - center energy line */}
      {transformProgress > 0 && transformProgress < 1 && (
        <g>
          {/* Vertical energy wave at transition point */}
          <rect
            x="145"
            y={380 - (transformProgress * 330)}
            width="10"
            height="40"
            fill="url(#energyFlow)"
            opacity="0.8"
          />
          {/* Sparks at transition */}
          {[0, 1, 2].map((i) => (
            <circle
              key={i}
              cx={150 + (Math.random() - 0.5) * 20}
              cy={380 - (transformProgress * 330) + Math.random() * 40}
              r="2"
              fill="#ff2d2d"
              className="animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </g>
      )}

      {/* Collar / neckline */}
      <path
        d="M120 45 L150 60 L180 45"
        fill="none"
        stroke={transformProgress > 0.5 ? "#ff2d2d" : "#333"}
        strokeWidth="2"
      />
    </svg>
  );
}
