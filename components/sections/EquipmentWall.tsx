"use client";

import { motion } from "framer-motion";
import { AsciiHeader } from "@/components/shared/AsciiHeader";
import { BentoGrid } from "@/components/ui/bento-grid";
import {
  OrbIcon,
  ScannerIcon,
  CleanerIcon,
  AdapterIcon,
  TranslatorIcon,
  MasksIcon,
  GadgetCard,
  StatusIndicator,
} from "@/components/shared";
import { cn } from "@/lib/utils";

// Gadget data for the bento grid
const gadgets = [
  {
    id: "rag-brain",
    name: "PERSISTENT MEMORY CORE",
    tagline: "Agents forget. This remembers.",
    Icon: OrbIcon,
    span: "md:col-span-2 md:row-span-2",
    statusStates: ["STORING...", "INDEXED", "RECALLING..."],
  },
  {
    id: "ot-engine",
    name: "EDGE DETECTION ARRAY",
    tagline: "Finds what markets misprice.",
    Icon: ScannerIcon,
    span: "md:col-span-2",
    statusStates: ["SCANNING...", "ANALYZING", "EDGE DETECTED"],
  },
  {
    id: "ps-janitor",
    name: "DATA SANITIZATION UNIT",
    tagline: "FERPA-compliant. Deterministic.",
    Icon: CleanerIcon,
    span: "",
    statusStates: ["SANITIZING...", "VALIDATING", "CLEAN"],
  },
  {
    id: "lora-pipeline",
    name: "MODEL FUSION KIT",
    tagline: "Zero to fine-tuned in 48 hours.",
    Icon: AdapterIcon,
    span: "",
    statusStates: ["MERGING...", "OPTIMIZING", "FUSED"],
  },
  {
    id: "prompt-gen",
    name: "VOCABULARY MODULE",
    tagline: "Speaks the language of professionals.",
    Icon: TranslatorIcon,
    span: "",
    statusStates: ["PARSING...", "STRUCTURING", "READY"],
  },
  {
    id: "senate-ai",
    name: "POLITICAL SIMULATION ENGINE",
    tagline: "The social layer, made playable.",
    Icon: MasksIcon,
    span: "md:col-span-2",
    statusStates: ["SIMULATING...", "ROUND 3", "VOTING"],
  },
];

export function EquipmentWall() {
  return (
    <section
      id="equipment"
      className={cn(
        "relative w-full py-20 sm:py-32",
        "bg-gradient-to-b from-[#0a0a0a] via-[#080808] to-[#0a0a0a]"
      )}
    >
      {/* Hexagonal pattern background */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='49' viewBox='0 0 28 49'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23ff2d2d' fill-opacity='0.15'%3E%3Cpath d='M13.99 9.25l13 7.5v15l-13 7.5L1 31.75v-15l12.99-7.5zM3 17.9v12.7l10.99 6.34 11-6.35V17.9l-11-6.34L3 17.9zM0 15l12.98-7.5V0h-2v6.35L0 12.69v2.3zm0 18.5L12.98 41v8h-2v-6.85L0 35.81v-2.3zM15 0v7.5L27.99 15H28v-2.31h-.01L17 6.35V0h-2zm0 49v-8l12.99-7.5H28v2.31h-.01L17 42.15V49h-2z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Dramatic top lighting gradient */}
      <div
        className="absolute top-0 left-0 right-0 h-96 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 0%, rgba(255,45,45,0.1) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <AsciiHeader title="EQUIPMENT WALL" className="mb-4" />
          <p className="text-center text-[#6b7280] font-mono text-sm max-w-2xl mx-auto">
            // tools forged for real constraints
          </p>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <BentoGrid>
            {gadgets.map((gadget, i) => (
              <GadgetCard
                key={gadget.id}
                title={gadget.name}
                tagline={gadget.tagline}
                className={gadget.span}
                index={i}
              >
                {({ isHovered }) => (
                  <div className="flex flex-col items-center gap-4 w-full h-full">
                    <div className={cn(
                      "flex items-center justify-center",
                      gadget.span.includes("row-span-2") ? "w-32 h-32 md:w-40 md:h-40" : "w-24 h-24 md:w-28 md:h-28"
                    )}>
                      <gadget.Icon isHovered={isHovered} className="w-full h-full" />
                    </div>
                    <StatusIndicator 
                      states={gadget.statusStates} 
                      isActive={isHovered}
                    />
                  </div>
                )}
              </GadgetCard>
            ))}
          </BentoGrid>
        </motion.div>

        {/* Footer note */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <p className="font-mono text-xs text-[#6b7280]">
            // hover to inspect
          </p>
        </motion.div>
      </div>
    </section>
  );
}
