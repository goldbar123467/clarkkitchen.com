"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { TerminalOutput } from "./TerminalOutput";

interface HUDDashboardProps {
  isActive: boolean;
  className?: string;
}

export function HUDDashboard({ isActive, className }: HUDDashboardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : 20 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "bg-[#0a0a0a]/90 backdrop-blur-sm rounded-lg",
        "border border-[#1f1f1f]",
        "overflow-hidden",
        className
      )}
      style={{
        boxShadow: "inset 0 0 30px rgba(0, 0, 0, 0.5)",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#1f1f1f]">
        <div className="flex items-center gap-2">
          {/* Pulsing indicator */}
          <div className="relative">
            <div className="w-2 h-2 rounded-full bg-[#ff2d2d]" />
            <div
              className="absolute inset-0 w-2 h-2 rounded-full bg-[#ff2d2d] animate-ping"
              style={{ animationDuration: "2s" }}
            />
          </div>
          <span
            className="font-mono text-xs tracking-[0.2em] text-[#ff2d2d] uppercase"
            style={{
              textShadow: "0 0 10px rgba(255, 45, 45, 0.5)",
            }}
          >
            System Status
          </span>
        </div>

        {/* Corner decoration */}
        <div className="flex items-center gap-1">
          <div className="w-1 h-1 rounded-full bg-[#6b7280]" />
          <div className="w-1 h-1 rounded-full bg-[#6b7280]" />
          <div className="w-1 h-1 rounded-full bg-[#ff2d2d]" />
        </div>
      </div>

      {/* Terminal Output */}
      <div className="px-4 py-3">
        <TerminalOutput />
      </div>

      {/* System Status Bar */}
      <div className="px-4 py-2 border-t border-[#1f1f1f] bg-[#0a0a0a]/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 font-mono text-[10px] tracking-wider text-[#6b7280]">
            <span className="flex items-center gap-1.5">
              <span className="text-[#ff2d2d]">SYS:</span>
              <span className="text-[#22c55e]">ONLINE</span>
            </span>
            <span className="text-[#1f1f1f]">|</span>
            <span>
              <span className="text-[#ff2d2d]">MEM:</span> 847MB
            </span>
            <span className="text-[#1f1f1f]">|</span>
            <span>
              <span className="text-[#ff2d2d]">UPTIME:</span> 4h 23m
            </span>
          </div>

          {/* Activity indicator */}
          <div className="flex items-center gap-1">
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="w-0.5 bg-[#ff2d2d]/60 rounded-full"
                animate={{
                  height: [4, 8, 12, 6, 4],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.15,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
