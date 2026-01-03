"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GitHubIcon, LinkedInIcon, EmailIcon, HuggingFaceIcon } from "@/components/shared/Icons";
import { TacticalTypewriter } from "@/components/shared/TacticalTypewriter";
import { ClarkKitchenEmblem } from "@/components/shared/ClarkKitchenEmblem";
import { ChevronDown } from "lucide-react";

// Social links configuration
const socialLinks = [
  { icon: GitHubIcon, href: "https://github.com/goldbar123467", label: "GitHub" },
  { icon: LinkedInIcon, href: "https://linkedin.com/in/clarkkitchen", label: "LinkedIn" },
  { icon: HuggingFaceIcon, href: "https://huggingface.co/clarkkitchen22", label: "HuggingFace" },
  { icon: EmailIcon, href: "mailto:clarkkitchen22@gmail.com", label: "Email" },
];

// Project typewriter data - what I've built
const projectLines = [
  { text: "RAG Brain", category: "AI/ML" },
  { text: "Rome.Life", category: "Games" },
  { text: "OT Sports Model", category: "Quantitative" },
  { text: "Mistral LoRA Merge", category: "AI/ML" },
  { text: "Kyzlo Prompting", category: "AI/ML" },
  { text: "Wild Robot Game", category: "Games" },
  { text: "Teachingishard.ai", category: "EdTech" },
  { text: "PSJanitor", category: "EdTech" },
  { text: "Kyzlo Platform", category: "Infrastructure" },
  { text: "Hickup.xyz", category: "Infrastructure" },
];

// Deterministic particle positions to avoid SSR hydration mismatch
const particlePositions = [
  { left: 12, top: 8, delay: 0.2, duration: 7.2 },
  { left: 87, top: 15, delay: 1.5, duration: 8.1 },
  { left: 23, top: 42, delay: 3.2, duration: 6.5 },
  { left: 65, top: 28, delay: 0.8, duration: 7.8 },
  { left: 45, top: 72, delay: 2.1, duration: 9.0 },
  { left: 78, top: 55, delay: 4.5, duration: 6.8 },
  { left: 8, top: 88, delay: 1.2, duration: 8.5 },
  { left: 92, top: 38, delay: 3.8, duration: 7.0 },
  { left: 35, top: 95, delay: 0.5, duration: 8.8 },
  { left: 55, top: 12, delay: 2.8, duration: 6.2 },
  { left: 18, top: 65, delay: 5.1, duration: 7.5 },
  { left: 72, top: 82, delay: 1.8, duration: 9.2 },
  { left: 40, top: 22, delay: 4.2, duration: 6.9 },
  { left: 95, top: 70, delay: 0.9, duration: 8.3 },
  { left: 28, top: 48, delay: 3.5, duration: 7.7 },
  { left: 82, top: 5, delay: 2.4, duration: 6.4 },
  { left: 5, top: 35, delay: 5.5, duration: 8.0 },
  { left: 58, top: 90, delay: 1.1, duration: 7.3 },
  { left: 48, top: 58, delay: 4.8, duration: 6.7 },
  { left: 15, top: 18, delay: 2.6, duration: 9.5 },
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

const socialVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut" as const,
    },
  },
};

export function Hero() {
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollIndicator(window.scrollY < 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      {/* Layered background effects */}
      <div className="absolute inset-0 bg-dot opacity-30" />
      <div className="absolute inset-0 bg-grid opacity-10" />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#ff2d2d]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#dc2626]/8 rounded-full blur-3xl" />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particlePositions.map((particle, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-[#ff2d2d]/30 rounded-full animate-float"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`,
            }}
          />
        ))}
      </div>

      {/* Main content - centered container with max-width */}
      <motion.div
        className="w-full max-w-[850px] mx-auto text-center relative z-10 px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Name Treatment - 24px margin bottom */}
        <motion.div variants={itemVariants} className="mb-6">
          <ClarkKitchenEmblem />
        </motion.div>

        {/* Tagline - 16px margin bottom */}
        <motion.p
          variants={itemVariants}
          className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#E2E8F0] mb-4"
        >
          Teacher by day. Builder by night.
        </motion.p>

        {/* Subtitle - 32px margin bottom */}
        <motion.p
          variants={itemVariants}
          className="text-base sm:text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
        >
          Shipping systems that work when reality shows up.
        </motion.p>

        {/* Tactical Typewriter - Building projects - 40px margin bottom */}
        <motion.div
          variants={itemVariants}
          className="mb-10 flex justify-center"
        >
          <TacticalTypewriter
            prefix="BUILDING"
            lines={projectLines}
            size="xl"
            showStatus={true}
            statusLabel="DEPLOYED"
            typingSpeed={55}
            deletingSpeed={35}
            pauseDuration={2800}
          />
        </motion.div>

        {/* CTA Buttons - flex with consistent gap and aligned heights */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
        >
          <Button
            size="lg"
            variant="default"
            onClick={() => scrollToSection("ops-tablet")}
            className="glow-sm hover:glow hover:scale-105 transition-all duration-300 px-6 sm:px-8 h-12 sm:h-14 text-sm sm:text-base font-semibold min-w-[140px] sm:min-w-[160px]"
          >
            View Projects
          </Button>

          <Button
            size="lg"
            variant="outline"
            onClick={() => scrollToSection("contact")}
            className="border-[#1f1f1f] hover:border-[#ff2d2d]/50 hover:text-[#ff2d2d] hover:scale-105 transition-all duration-300 px-6 sm:px-8 h-12 sm:h-14 text-sm sm:text-base font-semibold min-w-[140px] sm:min-w-[160px]"
          >
            Get in Touch
          </Button>
        </motion.div>

        {/* Social Links Row - centered with consistent gap */}
        <motion.div
          variants={itemVariants}
          className="flex items-center justify-center gap-3 sm:gap-4"
        >
          {socialLinks.map((social, index) => {
            const Icon = social.icon;
            return (
              <motion.a
                key={social.label}
                href={social.href}
                target={social.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={social.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                aria-label={social.label}
                variants={socialVariants}
                custom={index}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center w-11 h-11 rounded-full border border-[#1f1f1f] bg-[#121212]/50 text-muted-foreground transition-all duration-300 hover:text-[#ff2d2d] hover:border-[#ff2d2d]/50 hover:shadow-[0_0_20px_rgba(255,45,45,0.3)]"
              >
                <Icon className="w-5 h-5" />
              </motion.a>
            );
          })}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: showScrollIndicator ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.button
          onClick={() => scrollToSection("story")}
          className="p-2 text-muted-foreground hover:text-[#ff2d2d] transition-colors duration-300"
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          aria-label="Scroll to content"
        >
          <ChevronDown className="w-6 h-6" />
        </motion.button>
      </motion.div>
    </section>
  );
}
