"use client";

import { TimelineEntry as TimelineEntryType } from "@/lib/data/timeline";
import { GlassCard } from "./GlassCard";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface TimelineEntryProps {
  entry: TimelineEntryType;
  isExpanded: boolean;
  onToggle: () => void;
  index: number;
}

export function TimelineEntry({
  entry,
  isExpanded,
  onToggle,
  index,
}: TimelineEntryProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Stagger animation on initial render
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 100);

    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div
      className={cn(
        "relative flex gap-6 transition-all duration-500",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      )}
    >
      {/* Timeline Line and Dot */}
      <div className="relative flex flex-col items-center">
        {/* Dot Marker */}
        <div
          className={cn(
            "w-4 h-4 rounded-full border-2 transition-all duration-300 z-10 shrink-0",
            isExpanded
              ? "border-[#ff2d2d] bg-[#ff2d2d] shadow-[0_0_12px_rgba(255,45,45,0.6)]"
              : "border-[#1f1f1f] bg-[#121212]"
          )}
        />

        {/* Vertical Line */}
        <div className="w-px flex-1 bg-gradient-to-b from-[#1f1f1f] to-transparent mt-2" />
      </div>

      {/* Content */}
      <div className="flex-1 pb-12">
        {/* Collapsed State - Clickable Header */}
        <button
          onClick={onToggle}
          className={cn(
            "w-full text-left group transition-all duration-300",
            "hover:translate-x-1"
          )}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3
                className={cn(
                  "text-lg font-semibold transition-colors duration-300",
                  isExpanded ? "text-[#ff2d2d]" : "text-[#E2E8F0]"
                )}
              >
                {entry.title}
              </h3>
              {entry.period && (
                <p className="text-sm text-[#64748B] mt-1">{entry.period}</p>
              )}
            </div>

            {/* Expand Indicator */}
            <ChevronDown
              className={cn(
                "w-5 h-5 text-[#64748B] transition-all duration-300 shrink-0 mt-1",
                "group-hover:text-[#ff2d2d]",
                isExpanded && "rotate-180 text-[#ff2d2d]"
              )}
            />
          </div>
        </button>

        {/* Expanded State - Content Panel */}
        <div
          className={cn(
            "grid transition-all duration-500 ease-in-out",
            isExpanded
              ? "grid-rows-[1fr] opacity-100 mt-4"
              : "grid-rows-[0fr] opacity-0"
          )}
        >
          <div className="overflow-hidden">
            <GlassCard className="p-6 space-y-6">
              {/* What I Learned */}
              <div>
                <h4 className="text-sm font-semibold text-[#ff2d2d] uppercase tracking-wide mb-2">
                  What I Learned
                </h4>
                <p className="text-[#E2E8F0] leading-relaxed">
                  {entry.learned}
                </p>
              </div>

              {/* What I Built Next */}
              <div>
                <h4 className="text-sm font-semibold text-[#ff2d2d] uppercase tracking-wide mb-2">
                  What I Built Next
                </h4>
                <p className="text-[#E2E8F0] leading-relaxed">
                  {entry.builtNext}
                </p>
              </div>

              {/* Artifact Link */}
              {entry.artifactLink && (
                <div className="pt-2">
                  <a
                    href={entry.artifactLink.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "inline-flex items-center gap-2 px-4 py-2 rounded-md",
                      "bg-[#ff2d2d]/10 border border-[#ff2d2d]/30",
                      "text-[#ff2d2d] text-sm font-medium",
                      "transition-all duration-300",
                      "hover:bg-[#ff2d2d]/20 hover:border-[#ff2d2d]/50",
                      "hover:shadow-[0_0_20px_rgba(255,45,45,0.2)]"
                    )}
                  >
                    <span>{entry.artifactLink.label}</span>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                </div>
              )}
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
}
