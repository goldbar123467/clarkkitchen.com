"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import {
  LanguagesSection,
  AIMLSection,
  WebSection,
  InfraSection,
  ProjectsFeed,
} from "@/components/dashboard";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function TerminalDashboard() {
  return (
    <section
      id="terminal-dashboard"
      className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6"
    >
      <div className="mx-auto max-w-[1400px]">
        {/* Header */}
        <div className="mb-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-2"
          >
            <h2 className="font-mono text-3xl font-bold tracking-tight">
              <span className="text-[#ff2d2d]">$</span> SYSTEM OVERVIEW
            </h2>
            <p className="font-mono text-sm text-muted-foreground">
              Real-time capability monitoring
            </p>
          </motion.div>
        </div>

        {/* Dashboard Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {/* Languages */}
          <motion.div variants={item}>
            <Card className="p-6 bg-[#121212]/80 backdrop-blur-sm border-[#1f1f1f] hover:border-[#ff2d2d]/30 transition-colors duration-300">
              <LanguagesSection />
            </Card>
          </motion.div>

          {/* AI/ML */}
          <motion.div variants={item}>
            <Card className="p-6 bg-[#121212]/80 backdrop-blur-sm border-[#1f1f1f] hover:border-[#ff2d2d]/30 transition-colors duration-300">
              <AIMLSection />
            </Card>
          </motion.div>

          {/* Web Technologies */}
          <motion.div variants={item}>
            <Card className="p-6 bg-[#121212]/80 backdrop-blur-sm border-[#1f1f1f] hover:border-[#ff2d2d]/30 transition-colors duration-300">
              <WebSection />
            </Card>
          </motion.div>

          {/* Infrastructure */}
          <motion.div variants={item}>
            <Card className="p-6 bg-[#121212]/80 backdrop-blur-sm border-[#1f1f1f] hover:border-[#ff2d2d]/30 transition-colors duration-300">
              <InfraSection />
            </Card>
          </motion.div>

          {/* Projects Feed - Full Width */}
          <motion.div variants={item} className="lg:col-span-2">
            <Card className="p-6 bg-[#121212]/80 backdrop-blur-sm border-[#1f1f1f] hover:border-[#ff2d2d]/30 transition-colors duration-300">
              <ProjectsFeed />
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
