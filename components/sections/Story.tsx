"use client";

import { motion } from "framer-motion";
import { AsciiHeader } from "@/components/shared/AsciiHeader";
import { GlassCard } from "@/components/shared/GlassCard";
import { Timeline } from "@/components/ui/timeline";
import { cn } from "@/lib/utils";

// Story chapters data
const storyChapters = [
  {
    title: "Teaching is Systems Management",
    subtitle: "The Classroom",
    content: (
      <GlassCard className="p-6 md:p-8">
        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px flex-1 bg-gradient-to-r from-[#ff2d2d]/50 to-transparent" />
            <span className="font-mono text-xs text-[#ff2d2d] uppercase tracking-wider">
              Chapter 01
            </span>
            <div className="h-px flex-1 bg-gradient-to-l from-[#ff2d2d]/50 to-transparent" />
          </div>
          <p className="text-[#E2E8F0] leading-relaxed text-base md:text-lg">
            Load balancing thirty kids' attention. Routing information through
            different channels for different learners. Handling the
            exceptions—the kid who needs something different—without crashing
            the whole system.
          </p>
          <p className="text-[#6b7280] leading-relaxed text-sm md:text-base">
            The patterns transfer directly to distributed systems, multi-agent
            orchestration, and infrastructure.
          </p>
          <div className="flex items-center gap-2 pt-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#ff2d2d] animate-pulse" />
            <span className="font-mono text-xs text-[#6b7280]">
              Pattern Recognition: Systems
            </span>
          </div>
        </div>
      </GlassCard>
    ),
  },
  {
    title: "11:47 PM, Tuesday",
    subtitle: "The Late Night Call",
    content: (
      <GlassCard className="p-6 md:p-8">
        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px flex-1 bg-gradient-to-r from-[#ff2d2d]/50 to-transparent" />
            <span className="font-mono text-xs text-[#ff2d2d] uppercase tracking-wider">
              Chapter 02
            </span>
            <div className="h-px flex-1 bg-gradient-to-l from-[#ff2d2d]/50 to-transparent" />
          </div>
          <p className="text-[#E2E8F0] leading-relaxed text-base md:text-lg">
            Two friends in a Discord call, screens glowing in dark rooms miles
            apart. "Why does nothing work the way we need it to?"
          </p>
          <p className="text-[#6b7280] leading-relaxed text-sm md:text-base">
            Every tool we tried was built for someone else. Too bloated. Too
            generic. We'd duct-tape solutions together and waste hours fighting
            software instead of building what we actually wanted.
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-[#1f1f1f] bg-[#0a0a0a]/50">
              <div className="w-1.5 h-1.5 rounded-full bg-[#ff2d2d]" />
              <span className="font-mono text-xs text-[#6b7280]">Discord</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-[#1f1f1f] bg-[#0a0a0a]/50">
              <div className="w-1.5 h-1.5 rounded-full bg-[#ff2d2d]" />
              <span className="font-mono text-xs text-[#6b7280]">
                Late Nights
              </span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-[#1f1f1f] bg-[#0a0a0a]/50">
              <div className="w-1.5 h-1.5 rounded-full bg-[#ff2d2d]" />
              <span className="font-mono text-xs text-[#6b7280]">
                Frustration
              </span>
            </div>
          </div>
        </div>
      </GlassCard>
    ),
  },
  {
    title: "What if we just... made it ourselves?",
    subtitle: "The Decision",
    content: (
      <GlassCard className="p-6 md:p-8">
        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px flex-1 bg-gradient-to-r from-[#ff2d2d]/50 to-transparent" />
            <span className="font-mono text-xs text-[#ff2d2d] uppercase tracking-wider">
              Chapter 03
            </span>
            <div className="h-px flex-1 bg-gradient-to-l from-[#ff2d2d]/50 to-transparent" />
          </div>
          <p className="text-[#E2E8F0] leading-relaxed text-base md:text-lg font-semibold">
            No pitch decks. No investor meetings. No five-year roadmap.
          </p>
          <p className="text-[#6b7280] leading-relaxed text-sm md:text-base">
            Just a shared screen, a fresh repo, and two people tired of waiting
            for someone else to solve problems we understood better than anyone.
          </p>
          <div className="mt-4 p-4 rounded-lg border border-[#ff2d2d]/20 bg-[#ff2d2d]/5">
            <div className="flex items-start gap-3">
              <svg
                className="w-5 h-5 text-[#ff2d2d] flex-shrink-0 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              <p className="font-mono text-xs text-[#ff2d2d] leading-relaxed">
                $ git init kyzlo-labs<br />
                $ git commit -m "First commit: Build for builders"
              </p>
            </div>
          </div>
        </div>
      </GlassCard>
    ),
  },
  {
    title: "Built for Builders",
    subtitle: "The Philosophy",
    content: (
      <GlassCard className="p-6 md:p-8">
        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px flex-1 bg-gradient-to-r from-[#ff2d2d]/50 to-transparent" />
            <span className="font-mono text-xs text-[#ff2d2d] uppercase tracking-wider">
              Chapter 04
            </span>
            <div className="h-px flex-1 bg-gradient-to-l from-[#ff2d2d]/50 to-transparent" />
          </div>
          <p className="text-[#E2E8F0] leading-relaxed text-base md:text-lg">
            We build for people who think in systems. The ones who want control,
            not hand-holding. The ones who'd rather have something powerful and
            a little rough around the edges than something polished and
            limiting.
          </p>
          <p className="text-[#6b7280] leading-relaxed text-sm md:text-base">
            If you've ever wished a tool existed that just got how you
            think—welcome. We're still building. Still in that Discord channel
            at hours we probably shouldn't be.
          </p>
          <div className="mt-6 flex items-center gap-4">
            <div className="flex-1 h-px bg-gradient-to-r from-[#ff2d2d]/30 to-transparent" />
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#ff2d2d] animate-pulse" />
              <span className="font-mono text-xs text-[#ff2d2d] uppercase">
                Still Building
              </span>
              <div className="w-2 h-2 rounded-full bg-[#ff2d2d] animate-pulse" />
            </div>
            <div className="flex-1 h-px bg-gradient-to-l from-[#ff2d2d]/30 to-transparent" />
          </div>
        </div>
      </GlassCard>
    ),
  },
];

// Custom Timeline wrapper with Batman Beyond styling
function StoryTimeline() {
  return (
    <div className="relative">
      {/* Custom styled timeline - we'll override Aceternity defaults */}
      <style jsx global>{`
        /* Override Timeline component styles for Batman Beyond theme */
        .timeline-container {
          background: transparent !important;
        }

        .timeline-container .dark\\:bg-neutral-950 {
          background: transparent !important;
        }

        .timeline-container .dark\\:text-white {
          color: #ff2d2d !important;
        }

        .timeline-container .dark\\:text-neutral-500 {
          color: #6b7280 !important;
        }

        .timeline-container .dark\\:bg-black {
          background: #0a0a0a !important;
          border: 1px solid #ff2d2d33 !important;
        }

        .timeline-container .dark\\:bg-neutral-800 {
          background: #ff2d2d !important;
          border-color: #ff2d2d !important;
        }

        .timeline-container .dark\\:via-neutral-700 {
          --tw-gradient-stops: transparent, #ff2d2d33, transparent !important;
        }

        /* Change the scroll beam to red */
        .timeline-container .from-purple-500 {
          --tw-gradient-from: #ff2d2d !important;
        }

        .timeline-container .via-blue-500 {
          --tw-gradient-via: #dc2626 !important;
        }
      `}</style>

      <div className="timeline-container">
        <Timeline data={storyChapters} />
      </div>
    </div>
  );
}

export function Story() {
  return (
    <section
      id="story"
      className={cn(
        "relative w-full py-20 sm:py-32",
        "bg-gradient-to-b from-[#0a0a0a] via-[#121212] to-[#0a0a0a]"
      )}
    >
      {/* Background Grid Pattern */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 45, 45, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 45, 45, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Floating red orbs */}
      <div className="absolute top-1/4 right-10 w-64 h-64 rounded-full bg-[#ff2d2d]/5 blur-3xl animate-pulse pointer-events-none" />
      <div
        className="absolute top-2/3 left-20 w-48 h-48 rounded-full bg-[#ff2d2d]/5 blur-3xl animate-pulse pointer-events-none"
        style={{ animationDelay: "1.5s" }}
      />
      <div
        className="absolute bottom-1/4 right-1/3 w-56 h-56 rounded-full bg-[#ff2d2d]/5 blur-3xl animate-pulse pointer-events-none"
        style={{ animationDelay: "3s" }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <AsciiHeader title="STORY: THE ORIGIN" className="mb-6" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl"
          >
            <p className="text-[#6b7280] text-sm md:text-base leading-relaxed">
              From classroom management to distributed systems. From late-night
              frustration to{" "}
              <span className="text-[#ff2d2d] font-semibold">Kyzlo Labs</span>.
              This is how systems thinking and stubbornness built something real.
            </p>
          </motion.div>
        </motion.div>

        {/* Animated Separator */}
        <div className="relative my-12 h-px overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#ff2d2d]/30 to-transparent" />
          <motion.div
            className="absolute h-full w-20 bg-gradient-to-r from-transparent via-[#ff2d2d] to-transparent opacity-60"
            animate={{ x: ["-100px", "calc(100vw + 100px)"] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear",
              repeatDelay: 2,
            }}
          />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rotate-45 bg-[#ff2d2d] shadow-[0_0_10px_rgba(255,45,45,0.5)]" />
        </div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <StoryTimeline />
        </motion.div>
      </div>
    </section>
  );
}
