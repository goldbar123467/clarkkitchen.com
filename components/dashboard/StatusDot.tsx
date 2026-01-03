"use client";

import { cn } from "@/lib/utils";

interface StatusDotProps {
  status: "live" | "active" | "maintenance";
  pulse?: boolean;
  size?: "sm" | "md";
}

const statusColors = {
  live: {
    bg: "bg-[#ff2d2d]",
    shadow: "shadow-[0_0_8px_rgba(255,45,45,0.5)]",
    ping: "bg-[#ff2d2d]",
  },
  active: {
    bg: "bg-[#ff2d2d]",
    shadow: "shadow-[0_0_8px_rgba(255,45,45,0.5)]",
    ping: "bg-[#ff2d2d]",
  },
  maintenance: {
    bg: "bg-[#6b7280]",
    shadow: "shadow-[0_0_8px_rgba(107,114,128,0.3)]",
    ping: "bg-[#6b7280]",
  },
};

const sizeClasses = {
  sm: "w-1.5 h-1.5",
  md: "w-2 h-2",
};

export function StatusDot({ status, pulse = true, size = "md" }: StatusDotProps) {
  const colors = statusColors[status];
  const sizeClass = sizeClasses[size];

  return (
    <span className="relative inline-flex">
      <span
        className={cn(
          "rounded-full",
          sizeClass,
          colors.bg,
          colors.shadow
        )}
      />
      {pulse && status === "live" && (
        <span
          className={cn(
            "absolute inset-0 rounded-full animate-ping opacity-75",
            sizeClass,
            colors.ping
          )}
          style={{ animationDuration: "2s" }}
        />
      )}
    </span>
  );
}
