"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  GitHubIcon,
  XIcon,
  LinkedInIcon,
  EmailIcon,
  MenuIcon,
} from "@/components/shared/Icons";
import { KyzloLogo } from "@/components/shared/KyzloLogo";

const navLinks = [
  { name: "Projects", href: "#ops-tablet" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
];

const socialLinks = [
  { name: "GitHub", href: "#", icon: GitHubIcon },
  { name: "X/Twitter", href: "#", icon: XIcon },
  { name: "LinkedIn", href: "#", icon: LinkedInIcon },
  { name: "Email", href: "#", icon: EmailIcon },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          // Set scrolled state
          setIsScrolled(currentScrollY > 20);

          // Hide/show on scroll
          if (currentScrollY > lastScrollY && currentScrollY > 100) {
            setIsVisible(false);
          } else {
            setIsVisible(true);
          }

          setLastScrollY(currentScrollY);

          // Update active section
          const sections = navLinks.map((link) =>
            link.href.replace("#", "")
          );

          for (const sectionId of sections) {
            const element = document.getElementById(sectionId);
            if (element) {
              const rect = element.getBoundingClientRect();
              if (rect.top <= 100 && rect.bottom >= 100) {
                setActiveSection(sectionId);
                break;
              }
            }
          }

          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const sectionId = href.replace("#", "");
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "glass-strong shadow-lg border-b border-[#1f1f1f]" : "bg-transparent",
        isVisible ? "translate-y-0" : "-translate-y-full"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo - Left side */}
          <div className="flex items-center">
            <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
              <KyzloLogo size="sm" animated={true} className="hover:scale-110 transition-transform duration-300" />
            </a>
            {isScrolled && (
              <Badge variant="outline" className="ml-4 border-[#ff2d2d]/30 text-[#ff2d2d]/80 gap-1.5 hidden sm:flex">
                <div className="w-1.5 h-1.5 bg-[#ff2d2d] rounded-full animate-pulse" />
                <span className="text-xs">LIVE</span>
              </Badge>
            )}
          </div>

          {/* Desktop Navigation - Center (absolute for true viewport centering) */}
          <div className="hidden lg:flex items-center space-x-1 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium transition-all duration-200 group rounded-md",
                  activeSection === link.href.replace("#", "")
                    ? "text-[#ff2d2d] bg-[#ff2d2d]/10"
                    : "text-foreground/70 hover:text-[#ff2d2d] hover:bg-[#ff2d2d]/5"
                )}
              >
                {link.name}
                {activeSection === link.href.replace("#", "") && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ff2d2d] glow-sm" />
                )}
                <div className="absolute inset-0 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 border border-[#ff2d2d]/20" />
              </a>
            ))}
          </div>

          {/* Desktop Social Links - Right */}
          <div className="hidden lg:flex items-center space-x-3">
            <div className="h-8 w-px bg-border/50 mr-2" />
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="relative p-2 rounded-md text-foreground/70 hover:text-[#ff2d2d] transition-all duration-200 group hover:bg-[#ff2d2d]/5"
                aria-label={link.name}
              >
                <link.icon className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                <div className="absolute inset-0 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 border border-[#ff2d2d]/20" />
              </a>
            ))}
          </div>

          {/* Mobile Menu */}
          <div className="lg:hidden flex items-center">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-foreground hover:text-[#ff2d2d] hover:bg-[#ff2d2d]/5 relative group"
                  aria-label="Menu"
                >
                  <MenuIcon className="h-6 w-6" />
                  <div className="absolute inset-0 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 border border-[#ff2d2d]/20" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="glass-strong w-[300px] sm:w-[400px] border-l border-[#1f1f1f]">
                <div className="flex flex-col space-y-8 mt-8">
                  {/* Mobile Logo */}
                  <div className="flex items-center justify-center mb-4">
                    <KyzloLogo size="md" animated={true} />
                  </div>

                  {/* Mobile Navigation Links */}
                  <div className="flex flex-col space-y-2">
                    {navLinks.map((link) => (
                      <a
                        key={link.name}
                        href={link.href}
                        onClick={(e) => {
                          e.preventDefault();
                          handleNavClick(link.href);
                        }}
                        className={cn(
                          "relative px-4 py-3 text-lg font-medium transition-all duration-200 rounded-md group",
                          activeSection === link.href.replace("#", "")
                            ? "text-[#ff2d2d] bg-[#ff2d2d]/10"
                            : "text-foreground/70 hover:text-[#ff2d2d] hover:bg-[#ff2d2d]/5"
                        )}
                      >
                        {link.name}
                        <div className="absolute inset-0 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 border border-[#ff2d2d]/20" />
                      </a>
                    ))}
                  </div>

                  {/* Mobile Social Links */}
                  <div className="flex items-center justify-center space-x-4 pt-4 border-t border-border/50">
                    {socialLinks.map((link) => (
                      <a
                        key={link.name}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative p-3 rounded-md text-foreground/70 hover:text-[#ff2d2d] transition-all duration-200 group hover:bg-[#ff2d2d]/5"
                        aria-label={link.name}
                      >
                        <link.icon className="h-6 w-6 group-hover:scale-110 transition-transform duration-200" />
                        <div className="absolute inset-0 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 border border-[#ff2d2d]/20" />
                      </a>
                    ))}
                  </div>

                  {/* Mobile Status */}
                  <div className="flex flex-col gap-2 pt-4 border-t border-border/50">
                    <Badge variant="outline" className="border-[#ff2d2d]/50 text-[#ff2d2d] gap-2 justify-center">
                      <div className="w-2 h-2 bg-[#ff2d2d] rounded-full animate-pulse" />
                      SYSTEM ONLINE
                    </Badge>
                    <Badge variant="outline" className="border-[#6b7280]/50 text-[#6b7280] gap-2 justify-center">
                      <div className="w-2 h-2 bg-[#6b7280] rounded-full animate-pulse" />
                      BLOCK: 87,492,103
                    </Badge>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Animated scan line under nav */}
      {isScrolled && (
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#ff2d2d]/50 to-transparent" />
      )}
    </nav>
  );
}
