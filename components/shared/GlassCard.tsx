import { cn } from "@/lib/utils";
import { ReactNode, HTMLAttributes } from "react";

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

export function GlassCard({
  children,
  className,
  ...props
}: GlassCardProps) {
  return (
    <div
      className={cn(
        // Base glassmorphism styles with red tint - responsive blur for performance
        "relative rounded-lg backdrop-blur-sm sm:backdrop-blur-md md:backdrop-blur-xl",
        "bg-[#121212]/40",
        // Border with glow on hover
        "border border-[#1f1f1f]",
        "transition-all duration-300",
        "hover:border-[#ff2d2d]/30 hover:shadow-[0_0_20px_rgba(255,45,45,0.1)]",
        // Grain texture overlay via pseudo-element
        "before:absolute before:inset-0 before:rounded-lg",
        "before:bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]",
        "before:opacity-50 before:pointer-events-none",
        props.onClick && "cursor-pointer",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
