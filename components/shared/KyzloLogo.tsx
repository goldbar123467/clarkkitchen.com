"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface KyzloLogoProps {
  size?: "sm" | "md" | "lg";
  animated?: boolean;
  className?: string;
}

const sizeMap = {
  sm: { width: 120, height: 40, fontSize: 24 },
  md: { width: 180, height: 60, fontSize: 36 },
  lg: { width: 240, height: 80, fontSize: 48 },
};

export function KyzloLogo({
  size = "md",
  animated = true,
  className,
}: KyzloLogoProps) {
  const [showCursor, setShowCursor] = useState(true);
  const dimensions = sizeMap[size];

  useEffect(() => {
    if (!animated) return;

    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);

    return () => clearInterval(interval);
  }, [animated]);

  return (
    <div className={cn("relative inline-flex items-center", className)}>
      <svg
        width={dimensions.width}
        height={dimensions.height}
        viewBox="0 0 180 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
      >
        {/* Definitions for effects */}
        <defs>
          {/* Glow filter */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Circuit pulse gradient */}
          <linearGradient id="circuit-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ff2d2d" stopOpacity="0">
              {animated && (
                <animate
                  attributeName="offset"
                  values="0;1;0"
                  dur="3s"
                  repeatCount="indefinite"
                />
              )}
            </stop>
            <stop offset="50%" stopColor="#6b7280" stopOpacity="1">
              {animated && (
                <animate
                  attributeName="offset"
                  values="0.5;1;0.5"
                  dur="3s"
                  repeatCount="indefinite"
                />
              )}
            </stop>
            <stop offset="100%" stopColor="#ff2d2d" stopOpacity="0">
              {animated && (
                <animate
                  attributeName="offset"
                  values="1;1;1"
                  dur="3s"
                  repeatCount="indefinite"
                />
              )}
            </stop>
          </linearGradient>

          {/* Hexagon clip path */}
          <clipPath id="hex-clip">
            <path d="M 15 5 L 28 5 L 35 18 L 28 31 L 15 31 L 8 18 Z" />
          </clipPath>
        </defs>

        {/* Background hexagon */}
        <path
          d="M 15 5 L 28 5 L 35 18 L 28 31 L 15 31 L 8 18 Z"
          stroke="#6b7280"
          strokeWidth="1.5"
          fill="none"
          opacity="0.3"
        />

        {/* Inner hexagon with glow */}
        <path
          d="M 17 9 L 26 9 L 31 18 L 26 27 L 17 27 L 12 18 Z"
          stroke="#ff2d2d"
          strokeWidth="1"
          fill="none"
          filter={animated ? "url(#glow)" : undefined}
          opacity={animated ? "0.6" : "0.4"}
        >
          {animated && (
            <animate
              attributeName="opacity"
              values="0.4;0.8;0.4"
              dur="2s"
              repeatCount="indefinite"
            />
          )}
        </path>

        {/* Circuit traces - left */}
        <g opacity="0.5">
          <line x1="8" y1="18" x2="2" y2="18" stroke="url(#circuit-gradient)" strokeWidth="1" />
          <line x1="2" y1="18" x2="2" y2="12" stroke="url(#circuit-gradient)" strokeWidth="1" />
          <circle cx="2" cy="12" r="1.5" fill="#6b7280" opacity="0.6">
            {animated && (
              <animate
                attributeName="opacity"
                values="0.3;1;0.3"
                dur="2s"
                repeatCount="indefinite"
              />
            )}
          </circle>
        </g>

        {/* Circuit traces - top */}
        <g opacity="0.5">
          <line x1="21.5" y1="5" x2="21.5" y2="0" stroke="url(#circuit-gradient)" strokeWidth="1" />
          <circle cx="21.5" cy="0" r="1.5" fill="#ff2d2d" opacity="0.6">
            {animated && (
              <animate
                attributeName="opacity"
                values="0.3;1;0.3"
                dur="2s"
                begin="0.5s"
                repeatCount="indefinite"
              />
            )}
          </circle>
        </g>

        {/* Circuit traces - bottom */}
        <g opacity="0.5">
          <line x1="21.5" y1="31" x2="21.5" y2="36" stroke="url(#circuit-gradient)" strokeWidth="1" />
          <circle cx="21.5" cy="36" r="1.5" fill="#6b7280" opacity="0.6">
            {animated && (
              <animate
                attributeName="opacity"
                values="0.3;1;0.3"
                dur="2s"
                begin="1s"
                repeatCount="indefinite"
              />
            )}
          </circle>
        </g>

        {/* Stylized K letter */}
        <g transform="translate(18, 18)">
          <path
            d="M -4 -8 L -4 8 M -4 -1 L 4 -8 M -4 1 L 4 8"
            stroke="#ff2d2d"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter={animated ? "url(#glow)" : undefined}
          />
        </g>

        {/* KYZLO text */}
        <text
          x="44"
          y="24"
          fontFamily="'Courier New', monospace"
          fontSize="20"
          fontWeight="700"
          fill="#ff2d2d"
          letterSpacing="2"
        >
          KYZLO
        </text>

        {/* Underline/scan effect */}
        <line
          x1="44"
          y1="26"
          x2="140"
          y2="26"
          stroke="#6b7280"
          strokeWidth="0.5"
          opacity="0.4"
        />

        {/* Terminal cursor */}
        {animated && showCursor && (
          <rect x="143" y="13" width="8" height="14" fill="#ff2d2d" opacity="0.8" />
        )}

        {/* Scan line effect */}
        {animated && (
          <line
            x1="0"
            y1="18"
            x2="180"
            y2="18"
            stroke="#6b7280"
            strokeWidth="0.5"
            opacity="0.2"
          >
            <animate
              attributeName="y1"
              values="0;60;0"
              dur="4s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="y2"
              values="0;60;0"
              dur="4s"
              repeatCount="indefinite"
            />
          </line>
        )}

        {/* Corner brackets - tech aesthetic */}
        <g stroke="#6b7280" strokeWidth="1" opacity="0.3">
          {/* Top left */}
          <path d="M 0 8 L 0 0 L 8 0" fill="none" />
          {/* Top right */}
          <path d="M 172 0 L 180 0 L 180 8" fill="none" />
          {/* Bottom left */}
          <path d="M 0 52 L 0 60 L 8 60" fill="none" />
          {/* Bottom right */}
          <path d="M 180 52 L 180 60 L 172 60" fill="none" />
        </g>

        {/* Grid dots background */}
        <g opacity="0.1" fill="#ff2d2d">
          {[...Array(6)].map((_, i) =>
            [...Array(20)].map((_, j) => (
              <circle key={`dot-${i}-${j}`} cx={10 + j * 8.5} cy={10 + i * 10} r="0.5" />
            ))
          )}
        </g>
      </svg>
    </div>
  );
}
