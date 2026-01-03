import { cn } from "@/lib/utils";

interface AsciiHeaderProps {
  title: string;
  className?: string;
  centered?: boolean;
}

export function AsciiHeader({ title, className, centered = false }: AsciiHeaderProps) {
  // Symmetric dashes on both sides
  const desktopDashCount = 12;
  const mobileDashCount = 6;

  if (centered) {
    // Centered variant with symmetric lines on both sides
    return (
      <div
        className={cn(
          "flex items-center justify-center gap-2 sm:gap-3 font-mono text-[#ff2d2d]/70 select-none",
          "text-xs sm:text-sm tracking-wider sm:tracking-[0.2em] uppercase",
          className
        )}
        aria-label={title}
      >
        {/* Left bracket and line */}
        <span className="flex items-center">
          <span className="opacity-60">┌</span>
          <span className="hidden sm:inline opacity-40">{"─".repeat(desktopDashCount)}</span>
          <span className="inline sm:hidden opacity-40">{"─".repeat(mobileDashCount)}</span>
        </span>

        {/* Title */}
        <span className="flex-shrink-0">{title.toUpperCase()}</span>

        {/* Right bracket and line */}
        <span className="flex items-center">
          <span className="hidden sm:inline opacity-40">{"─".repeat(desktopDashCount)}</span>
          <span className="inline sm:hidden opacity-40">{"─".repeat(mobileDashCount)}</span>
          <span className="opacity-60">┐</span>
        </span>
      </div>
    );
  }

  // Original left-aligned variant
  const desktopDashes = "─".repeat(Math.max(40 - title.length, 10));
  const mobileDashes = "─".repeat(Math.max(20 - title.length, 5));

  return (
    <div
      className={cn(
        "font-mono text-[#ff2d2d] select-none",
        "text-sm sm:text-base",
        className
      )}
      aria-label={title}
    >
      <span className="hidden sm:inline">
        ┌ {title.toUpperCase()} {desktopDashes}┐
      </span>
      <span className="inline sm:hidden">
        ┌ {title.toUpperCase()} {mobileDashes}┐
      </span>
    </div>
  );
}
