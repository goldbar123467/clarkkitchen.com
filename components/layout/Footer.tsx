import { cn } from "@/lib/utils";
import {
  GitHubIcon,
  XIcon,
  LinkedInIcon,
  EmailIcon,
} from "@/components/shared/Icons";

const socialLinks = [
  { name: "GitHub", href: "https://github.com/goldbar123467", icon: GitHubIcon },
  { name: "X/Twitter", href: "#", icon: XIcon },
  { name: "LinkedIn", href: "https://linkedin.com/in/clarkkitchen", icon: LinkedInIcon },
  { name: "Email", href: "mailto:clarkkitchen22@gmail.com", icon: EmailIcon },
];

export function Footer() {
  return (
    <footer className="relative py-8 border-t border-[#1f1f1f]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center space-y-4">
          {/* Social Links */}
          <div className="flex items-center space-x-3 sm:space-x-4 md:space-x-6">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target={link.name !== "Email" ? "_blank" : undefined}
                rel={link.name !== "Email" ? "noopener noreferrer" : undefined}
                className={cn(
                  "text-foreground/70 hover:text-[#ff2d2d]",
                  "transition-all duration-200",
                  "hover:scale-110"
                )}
                aria-label={link.name}
              >
                <link.icon className="h-5 w-5" />
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground text-center">
            © {new Date().getFullYear()} Clark Kitchen. Built with Next.js.
          </p>
        </div>
      </div>
    </footer>
  );
}
