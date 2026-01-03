"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/shared/GlassCard";
import { AsciiHeader } from "@/components/shared/AsciiHeader";
import {
  GitHubIcon,
  LinkedInIcon,
  HuggingFaceIcon,
  EmailIcon,
} from "@/components/shared/Icons";

const platformCards = [
  {
    name: "GitHub",
    icon: GitHubIcon,
    label: "View my code",
    description: "Open source projects and contributions",
    href: "https://github.com/goldbar123467",
  },
  {
    name: "LinkedIn",
    icon: LinkedInIcon,
    label: "Connect with me",
    description: "Professional network and experience",
    href: "https://linkedin.com/in/clarkkitchen",
  },
  {
    name: "HuggingFace",
    icon: HuggingFaceIcon,
    label: "AI Models and Spaces",
    description: "Machine learning projects and experiments",
    href: "https://huggingface.co/clarkkitchen22",
  },
  {
    name: "Email",
    icon: EmailIcon,
    label: "Get in touch",
    description: "Direct communication for collaborations",
    href: "mailto:clarkkitchen22@gmail.com",
  },
];

export function Contact() {
  return (
    <section id="contact" className="relative py-16 sm:py-24 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-12">
          {/* Section Header - centered with max-width container */}
          <div className="flex flex-col items-center text-center max-w-[650px] mx-auto">
            {/* Decorative label - centered with symmetric lines */}
            <AsciiHeader title="Let's Connect" centered className="mb-5" />

            {/* Main heading - baseline aligned */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-5 leading-tight">
              <span className="text-foreground align-baseline">Let's </span>
              <span
                className="inline-block align-baseline px-3 py-1 border-2 border-[#ff2d2d] rounded text-[#ff2d2d]"
                style={{
                  boxShadow: "0 0 20px rgba(255, 45, 45, 0.4), 0 0 40px rgba(255, 45, 45, 0.2)",
                }}
              >
                Connect
              </span>
            </h2>

            {/* Subtitle - constrained width for readability */}
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
              Open to collaborations, interesting projects, and conversations
              about building systems that respect both the technical and human
              layers.
            </p>
          </div>

          {/* Platform Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
            {platformCards.map((platform) => (
              <a
                key={platform.name}
                href={platform.href}
                target={platform.name !== "Email" ? "_blank" : undefined}
                rel={
                  platform.name !== "Email"
                    ? "noopener noreferrer"
                    : undefined
                }
                className="group"
              >
                <GlassCard
                  className={cn(
                    "p-4 sm:p-5 md:p-6 transition-all duration-300",
                    "hover:scale-105 hover:border-[#ff2d2d]/50",
                    "hover:shadow-[0_0_30px_rgba(255,45,45,0.2)]",
                    "hover:-translate-y-1"
                  )}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={cn(
                        "p-3 rounded-lg bg-[#ff2d2d]/10",
                        "border border-[#ff2d2d]/20",
                        "transition-all duration-300",
                        "group-hover:bg-[#ff2d2d]/20",
                        "group-hover:shadow-[0_0_15px_rgba(255,45,45,0.3)]"
                      )}
                    >
                      <platform.icon className="h-6 w-6 text-[#ff2d2d]" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <h3 className="font-semibold text-foreground group-hover:text-[#ff2d2d] transition-colors duration-300">
                        {platform.label}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {platform.description}
                      </p>
                    </div>
                  </div>
                </GlassCard>
              </a>
            ))}
          </div>

          {/* Closing CTA */}
          <div className="text-center space-y-6 pt-8">
            <blockquote className="text-base sm:text-lg md:text-xl font-medium text-foreground/90 italic border-l-4 border-[#ff2d2d] pl-3 sm:pl-4 md:pl-6 py-2 max-w-2xl mx-auto text-left">
              "Every system is a social system."
            </blockquote>
            <Button
              asChild
              size="lg"
              className={cn(
                "px-6 sm:px-8 py-4 sm:py-6 text-sm sm:text-base font-medium",
                "bg-[#ff2d2d] text-white",
                "hover:bg-[#ff2d2d]/90 hover:scale-105",
                "transition-all duration-300",
                "glow-sm hover:glow",
                "uppercase tracking-wider"
              )}
            >
              <a href="mailto:clarkkitchen22@gmail.com">
                <span className="mr-2">[</span>
                <span>Start a Conversation</span>
                <span className="ml-2">]</span>
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
