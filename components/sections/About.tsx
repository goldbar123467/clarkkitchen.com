"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { AsciiHeader } from "@/components/shared/AsciiHeader";
import { GlassCard } from "@/components/shared/GlassCard";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Custom hook for count-up animation that triggers on view
function useCountUpOnView(
  end: number,
  duration: number = 2000,
  inView: boolean
) {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!inView || hasAnimated.current) return;
    hasAnimated.current = true;

    const startTime = Date.now();
    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic for smooth deceleration
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(end * eased));

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    };

    requestAnimationFrame(tick);
  }, [inView, end, duration]);

  return count;
}

// Stats data
const stats = [
  { value: 10, suffix: "+", label: "Projects Shipped" },
  { value: 1000, suffix: "+", label: "HuggingFace Downloads" },
  { value: 5, suffix: "", label: "Production Deployments" },
  { value: null, special: "CIS @ Ball State", label: "Education" },
];

// Trait cards data
const traits = [
  {
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
        />
      </svg>
    ),
    title: "Systems Thinking",
    description:
      "Computer Information Systems degree from Ball State with a consulting capstone. Classroom management is systems management. Load balancing attention, routing information, handling exceptions, maintaining state. The patterns transfer directly to distributed systems, multi-agent orchestration, and infrastructure.",
  },
  {
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
        />
      </svg>
    ),
    title: "Social Layer Awareness",
    description:
      "Every system is a social system. The technical solution that ignores the human layer fails. RAG Brain learns what memories are useful to humans. Rome.Life makes you manage senator relationships. The sports model accounts for public betting psychology.",
  },
  {
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
        />
      </svg>
    ),
    title: "Learning Velocity",
    description:
      "Zero Python to LoRA fine-tuning pipeline over a few months of consistent after-work long nights teaching myself. The classroom taught that understanding beats shortcuts. Learn the underlying systems, not just the APIs.",
  },
  {
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
        />
      </svg>
    ),
    title: "Ship Everything",
    description:
      "Every project is deployed and running. Rome.Life for students. PSJanitor for school data. Trading bots on mainnet. If it's not shipped, it's not real.",
  },
];

// Tech stack data
const techStack = [
  {
    category: "Languages",
    skills: ["Python", "TypeScript", "Solidity", "Rust"],
  },
  {
    category: "AI/ML",
    skills: ["PyTorch", "Transformers", "LangChain", "Ollama"],
  },
  {
    category: "Web",
    skills: ["Next.js", "React", "Tailwind", "Prisma"],
  },
  {
    category: "Infrastructure",
    skills: ["Docker", "Terraform", "PostgreSQL"],
  },
];

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const slideFromLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};

const slideFromRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

function StatCard({
  stat,
  index,
  inView,
}: {
  stat: (typeof stats)[0];
  index: number;
  inView: boolean;
}) {
  const count = useCountUpOnView(stat.value ?? 0, 2000, inView);

  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#ff2d2d] mb-2">
        {stat.special ? (
          <span className="text-xl md:text-2xl lg:text-3xl font-mono">
            {stat.special}
          </span>
        ) : (
          <>
            {count}
            {stat.suffix}
          </>
        )}
      </div>
      <div className="text-sm text-[#6b7280] font-mono uppercase tracking-wider">
        {stat.label}
      </div>
    </motion.div>
  );
}

function TraitCard({ trait, index }: { trait: (typeof traits)[0]; index: number }) {
  return (
    <motion.div variants={fadeUp}>
      <GlassCard className="p-6 h-full">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-[#ff2d2d]/10 border border-[#ff2d2d]/30 flex items-center justify-center text-[#ff2d2d]">
            {trait.icon}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-[#E2E8F0] mb-2">
              {trait.title}
            </h3>
            <p className="text-sm text-[#6b7280] leading-relaxed">
              {trait.description}
            </p>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}

function TechCategory({
  category,
}: {
  category: (typeof techStack)[0];
}) {
  return (
    <motion.div variants={fadeUp}>
      <GlassCard className="p-5">
        <h4 className="font-mono text-sm text-[#ff2d2d] mb-3 uppercase tracking-wider">
          {category.category}
        </h4>
        <div className="flex flex-wrap gap-2">
          {category.skills.map((skill) => (
            <Badge
              key={skill}
              variant="outline"
              className="border-[#1f1f1f] bg-[#0a0a0a]/50 text-[#E2E8F0] hover:border-[#ff2d2d]/50 hover:text-[#ff2d2d] transition-colors"
            >
              {skill}
            </Badge>
          ))}
        </div>
      </GlassCard>
    </motion.div>
  );
}

export function About() {
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
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
      <div className="absolute top-1/4 left-10 w-64 h-64 rounded-full bg-[#ff2d2d]/5 blur-3xl animate-pulse pointer-events-none" />
      <div
        className="absolute top-1/2 right-20 w-48 h-48 rounded-full bg-[#ff2d2d]/5 blur-3xl animate-pulse pointer-events-none"
        style={{ animationDelay: "1s" }}
      />
      <div
        className="absolute bottom-1/4 left-1/3 w-56 h-56 rounded-full bg-[#ff2d2d]/5 blur-3xl animate-pulse pointer-events-none"
        style={{ animationDelay: "2s" }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <AsciiHeader title="ABOUT: THE PROFILE" className="mb-12" />
        </motion.div>

        {/* Stats Row */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-16"
        >
          {stats.map((stat, index) => (
            <StatCard
              key={stat.label}
              stat={stat}
              index={index}
              inView={statsInView}
            />
          ))}
        </div>

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

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
          {/* Left Column - What Sets Me Apart */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.15 } },
            }}
          >
            <motion.div variants={slideFromLeft}>
              <div className="flex items-center gap-4 mb-8">
                <div className="h-px flex-1 bg-gradient-to-r from-[#ff2d2d]/50 to-transparent" />
                <h2 className="font-mono text-[#ff2d2d] flex items-center gap-2">
                  <span className="animate-pulse">{">"}</span>
                  <span>WHAT_SETS_ME_APART</span>
                </h2>
              </div>
            </motion.div>

            <div className="space-y-4">
              {traits.map((trait, index) => (
                <TraitCard key={trait.title} trait={trait} index={index} />
              ))}
            </div>
          </motion.div>

          {/* Right Column - Tech Stack */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.15 } },
            }}
          >
            <motion.div variants={slideFromRight}>
              <div className="flex items-center gap-4 mb-8">
                <h2 className="font-mono text-[#ff2d2d] flex items-center gap-2">
                  <span>TECH_STACK</span>
                  <span className="animate-pulse">{"<"}</span>
                </h2>
                <div className="h-px flex-1 bg-gradient-to-l from-[#ff2d2d]/50 to-transparent" />
              </div>
            </motion.div>

            <div className="space-y-4">
              {techStack.map((category) => (
                <TechCategory key={category.category} category={category} />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Kyzlo Labs Badge */}
        <motion.div
          className="flex justify-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-[#ff2d2d]/30 bg-[#121212]/60 backdrop-blur-sm">
            <div className="w-2 h-2 rounded-full bg-[#ff2d2d] animate-pulse" />
            <span className="font-mono text-sm text-[#6b7280]">
              Building under the{" "}
              <span className="text-[#ff2d2d] font-semibold">Kyzlo Labs</span>{" "}
              brand
            </span>
            <div className="w-2 h-2 rounded-full bg-[#ff2d2d] animate-pulse" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
