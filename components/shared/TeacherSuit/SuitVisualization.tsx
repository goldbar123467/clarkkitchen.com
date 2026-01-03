"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface SuitVisualizationProps {
  transformProgress: number; // 0-1
  isHovered: boolean;
  className?: string;
}

// Circuit node positions (x, y as percentages)
const circuitNodes = [
  { id: 1, x: 50, y: 12, label: "NEURAL" },
  { id: 2, x: 35, y: 22, label: "COMM-L" },
  { id: 3, x: 65, y: 22, label: "COMM-R" },
  { id: 4, x: 50, y: 35, label: "CORE" },
  { id: 5, x: 30, y: 45, label: "ARM-L" },
  { id: 6, x: 70, y: 45, label: "ARM-R" },
  { id: 7, x: 50, y: 58, label: "SPINE" },
  { id: 8, x: 40, y: 75, label: "LEG-L" },
  { id: 9, x: 60, y: 75, label: "LEG-R" },
];

// Circuit paths connecting nodes
const circuitPaths = [
  // Head to shoulders
  { from: 1, to: 2, path: "M50,12 L35,22" },
  { from: 1, to: 3, path: "M50,12 L65,22" },
  // Shoulders to core
  { from: 2, to: 4, path: "M35,22 Q42,28 50,35" },
  { from: 3, to: 4, path: "M65,22 Q58,28 50,35" },
  // Core to arms
  { from: 4, to: 5, path: "M50,35 L30,45" },
  { from: 4, to: 6, path: "M50,35 L70,45" },
  // Core to spine
  { from: 4, to: 7, path: "M50,35 L50,58" },
  // Spine to legs
  { from: 7, to: 8, path: "M50,58 Q45,66 40,75" },
  { from: 7, to: 9, path: "M50,58 Q55,66 60,75" },
];

export function SuitVisualization({
  transformProgress,
  isHovered,
  className,
}: SuitVisualizationProps) {
  const [activePulseNode, setActivePulseNode] = useState(0);

  // Sequential node pulsing
  useEffect(() => {
    if (!isHovered) {
      setActivePulseNode(0);
      return;
    }

    const interval = setInterval(() => {
      setActivePulseNode((prev) => (prev + 1) % (circuitNodes.length + 1));
    }, 200); // 0.2s stagger

    return () => clearInterval(interval);
  }, [isHovered]);

  // Calculate clip-path for transformation wipe (from collar down)
  const clipPathValue = `inset(${(1 - transformProgress) * 100}% 0 0 0)`;

  return (
    <div className={cn("relative w-full h-full", className)}>
      {/* SVG Definitions for filters */}
      <svg className="absolute w-0 h-0">
        <defs>
          {/* Glow filter for circuits */}
          <filter id="circuitGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Stronger glow for active nodes */}
          <filter id="nodeGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Spark particle filter */}
          <filter id="sparkGlow" x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      {/* Main SVG Container */}
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Background suit silhouette (dark) */}
        <g className="suit-silhouette-dark" opacity="0.3">
          {/* Head */}
          <ellipse cx="50" cy="10" rx="8" ry="9" fill="#1a1a1a" stroke="#2a2a2a" strokeWidth="0.5" />
          {/* Neck */}
          <rect x="46" y="18" width="8" height="4" fill="#1a1a1a" stroke="#2a2a2a" strokeWidth="0.5" />
          {/* Torso */}
          <path
            d="M35,22 L30,26 L28,50 L35,70 L42,85 L50,88 L58,85 L65,70 L72,50 L70,26 L65,22 L50,20 Z"
            fill="#1a1a1a"
            stroke="#2a2a2a"
            strokeWidth="0.5"
          />
          {/* Left Arm */}
          <path
            d="M30,26 L22,32 L18,50 L20,58 L26,55 L28,50 L30,35"
            fill="#1a1a1a"
            stroke="#2a2a2a"
            strokeWidth="0.5"
          />
          {/* Right Arm */}
          <path
            d="M70,26 L78,32 L82,50 L80,58 L74,55 L72,50 L70,35"
            fill="#1a1a1a"
            stroke="#2a2a2a"
            strokeWidth="0.5"
          />
          {/* Left Leg */}
          <path
            d="M42,85 L38,95 L42,98 L48,95 L50,88"
            fill="#1a1a1a"
            stroke="#2a2a2a"
            strokeWidth="0.5"
          />
          {/* Right Leg */}
          <path
            d="M58,85 L62,95 L58,98 L52,95 L50,88"
            fill="#1a1a1a"
            stroke="#2a2a2a"
            strokeWidth="0.5"
          />
        </g>

        {/* Transformed suit layer with clip-path wipe */}
        <g
          className="suit-silhouette-active"
          style={{ clipPath: clipPathValue }}
        >
          {/* Head */}
          <ellipse cx="50" cy="10" rx="8" ry="9" fill="#0f0f0f" stroke="#ff4444" strokeWidth="0.8" />
          {/* Neck */}
          <rect x="46" y="18" width="8" height="4" fill="#0f0f0f" stroke="#ff4444" strokeWidth="0.8" />
          {/* Torso */}
          <path
            d="M35,22 L30,26 L28,50 L35,70 L42,85 L50,88 L58,85 L65,70 L72,50 L70,26 L65,22 L50,20 Z"
            fill="#0f0f0f"
            stroke="#ff4444"
            strokeWidth="0.8"
          />
          {/* Left Arm */}
          <path
            d="M30,26 L22,32 L18,50 L20,58 L26,55 L28,50 L30,35"
            fill="#0f0f0f"
            stroke="#ff4444"
            strokeWidth="0.8"
          />
          {/* Right Arm */}
          <path
            d="M70,26 L78,32 L82,50 L80,58 L74,55 L72,50 L70,35"
            fill="#0f0f0f"
            stroke="#ff4444"
            strokeWidth="0.8"
          />
          {/* Left Leg */}
          <path
            d="M42,85 L38,95 L42,98 L48,95 L50,88"
            fill="#0f0f0f"
            stroke="#ff4444"
            strokeWidth="0.8"
          />
          {/* Right Leg */}
          <path
            d="M58,85 L62,95 L58,98 L52,95 L50,88"
            fill="#0f0f0f"
            stroke="#ff4444"
            strokeWidth="0.8"
          />
        </g>

        {/* Circuit paths with energy flow animation */}
        <g filter="url(#circuitGlow)">
          {circuitPaths.map((circuit, index) => (
            <motion.path
              key={`circuit-${index}`}
              d={circuit.path}
              fill="none"
              stroke="#ff4444"
              strokeWidth="3"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: transformProgress,
                opacity: transformProgress > 0.1 ? 0.8 : 0,
              }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              style={{
                strokeDasharray: "8 4",
              }}
              className="circuit-flow"
            />
          ))}
        </g>

        {/* Circuit nodes */}
        <g>
          {circuitNodes.map((node, index) => {
            const isActive = activePulseNode === index + 1;
            const isPast = activePulseNode > index + 1;
            const isVisible = transformProgress > (index / circuitNodes.length);

            return (
              <g key={`node-${node.id}`}>
                {/* Node circle */}
                <motion.circle
                  cx={node.x}
                  cy={node.y}
                  r={isActive ? 2.5 : 1.8}
                  fill={isActive || isPast ? "#ff4444" : "#ff4444"}
                  filter={isActive ? "url(#nodeGlow)" : "url(#circuitGlow)"}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: isVisible ? (isActive ? 1 : 0.7) : 0,
                    scale: isVisible ? (isActive ? 1.5 : 1) : 0,
                  }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                />
                {/* Node label */}
                <motion.text
                  x={node.x}
                  y={node.y - 4}
                  textAnchor="middle"
                  fill="#ff4444"
                  fontSize="3"
                  fontFamily="monospace"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isHovered && isVisible ? 0.8 : 0 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    textShadow: "0 0 4px #ff4444, 0 0 8px #ff4444",
                  }}
                  className="pointer-events-none"
                >
                  {node.label}
                </motion.text>
              </g>
            );
          })}
        </g>

        {/* Energy wave at transformation boundary */}
        <AnimatePresence>
          {transformProgress > 0 && transformProgress < 1 && (
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Wave line */}
              <motion.line
                x1="15"
                y1={100 - transformProgress * 100}
                x2="85"
                y2={100 - transformProgress * 100}
                stroke="#ff4444"
                strokeWidth="2"
                filter="url(#nodeGlow)"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              />
              {/* Spark particles */}
              {[...Array(5)].map((_, i) => (
                <motion.circle
                  key={`spark-${i}`}
                  cx={25 + i * 12.5}
                  cy={100 - transformProgress * 100}
                  r="1"
                  fill="#ffffff"
                  filter="url(#sparkGlow)"
                  initial={{ opacity: 0, y: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    y: [-2, 2],
                    x: [0, (Math.random() - 0.5) * 4],
                  }}
                  transition={{
                    duration: 0.4,
                    repeat: Infinity,
                    delay: i * 0.1,
                    ease: "easeOut",
                  }}
                />
              ))}
            </motion.g>
          )}
        </AnimatePresence>
      </svg>

      {/* CSS for circuit flow animation */}
      <style jsx>{`
        .circuit-flow {
          animation: circuit-flow 2s linear infinite;
        }

        @keyframes circuit-flow {
          0% {
            stroke-dashoffset: 24;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </div>
  );
}
