"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

interface TerminalLine {
  type: "command" | "output" | "success";
  text: string;
}

interface DisplayedLine {
  line: TerminalLine;
  displayedText: string;
  complete: boolean;
}

interface TerminalOutputProps {
  className?: string;
  typingSpeed?: number;
  linePause?: number;
}

const teachingOutputs: TerminalLine[] = [
  { type: "command", text: "> classroom.init()" },
  { type: "output", text: "Loading 32 student profiles..." },
  { type: "success", text: "✓ READY: Period 3 - Algebra II" },
  { type: "command", text: '> lesson.execute("quadratic_formula")' },
  { type: "output", text: "Deploying visual aids..." },
  { type: "output", text: "Monitoring engagement: 87%" },
  { type: "command", text: '> student.checkProgress("all")' },
  { type: "output", text: "Scanning comprehension levels..." },
  { type: "success", text: "28/32 on track" },
  { type: "command", text: "> intervention.queue(4)" },
];

export function TerminalOutput({
  className,
  typingSpeed = 30,
  linePause = 800,
}: TerminalOutputProps) {
  const [displayedLines, setDisplayedLines] = useState<DisplayedLine[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isNewLineRef = useRef(true);

  // Handle adding a new line
  const addNewLine = useCallback((line: TerminalLine) => {
    setDisplayedLines((prev) => [
      ...prev,
      { line, displayedText: "", complete: false },
    ]);
  }, []);

  // Handle updating current line text
  const updateLineText = useCallback((text: string) => {
    setDisplayedLines((prev) => {
      const updated = [...prev];
      const lastIndex = updated.length - 1;
      if (lastIndex >= 0) {
        updated[lastIndex] = {
          ...updated[lastIndex],
          displayedText: text,
        };
      }
      return updated;
    });
  }, []);

  // Handle marking line as complete
  const markLineComplete = useCallback(() => {
    setDisplayedLines((prev) => {
      const updated = [...prev];
      const lastIndex = updated.length - 1;
      if (lastIndex >= 0) {
        updated[lastIndex] = { ...updated[lastIndex], complete: true };
      }
      return updated;
    });
  }, []);

  // Typing effect
  useEffect(() => {
    if (currentLineIndex >= teachingOutputs.length) {
      // Reset and cycle
      const resetTimeout = setTimeout(() => {
        setDisplayedLines([]);
        setCurrentLineIndex(0);
        setCurrentCharIndex(0);
        isNewLineRef.current = true;
      }, 2000);
      return () => clearTimeout(resetTimeout);
    }

    const currentLine = teachingOutputs[currentLineIndex];
    const fullText = currentLine.text;

    // Start new line on first character
    if (isNewLineRef.current) {
      isNewLineRef.current = false;
      const initTimeout = setTimeout(() => {
        addNewLine(currentLine);
      }, 0);
      return () => clearTimeout(initTimeout);
    }

    if (currentCharIndex < fullText.length) {
      // Type next character
      const charTimeout = setTimeout(() => {
        updateLineText(fullText.substring(0, currentCharIndex + 1));
        setCurrentCharIndex((prev) => prev + 1);
      }, typingSpeed);
      return () => clearTimeout(charTimeout);
    } else {
      // Line complete, pause then move to next
      const completeTimeout = setTimeout(() => {
        markLineComplete();
      }, 0);

      const nextLineTimeout = setTimeout(() => {
        setCurrentLineIndex((prev) => prev + 1);
        setCurrentCharIndex(0);
        isNewLineRef.current = true;
      }, linePause);

      return () => {
        clearTimeout(completeTimeout);
        clearTimeout(nextLineTimeout);
      };
    }
  }, [
    currentLineIndex,
    currentCharIndex,
    typingSpeed,
    linePause,
    addNewLine,
    updateLineText,
    markLineComplete,
  ]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [displayedLines]);

  // Keep only last 8 lines visible
  const visibleLines = displayedLines.slice(-8);

  const getLineColor = (type: TerminalLine["type"]) => {
    switch (type) {
      case "command":
        return "#ff2d2d";
      case "output":
        return "#6b7280";
      case "success":
        return "#22c55e";
      default:
        return "#6b7280";
    }
  };

  const getTextShadow = (type: TerminalLine["type"]) => {
    switch (type) {
      case "command":
        return "0 0 10px rgba(255, 45, 45, 0.5)";
      case "success":
        return "0 0 10px rgba(34, 197, 94, 0.5)";
      default:
        return "none";
    }
  };

  return (
    <div
      ref={scrollRef}
      className={cn(
        "font-mono text-sm leading-relaxed overflow-hidden",
        "h-[180px]",
        className
      )}
    >
      <div className="space-y-1.5">
        {visibleLines.map((item, index) => (
          <div
            key={`${currentLineIndex}-${index}`}
            className="flex items-start"
          >
            <span
              style={{
                color: getLineColor(item.line.type),
                textShadow: getTextShadow(item.line.type),
              }}
            >
              {item.displayedText}
              {!item.complete && index === visibleLines.length - 1 && (
                <span
                  className="inline-block w-2 h-4 ml-0.5 bg-[#ff2d2d] animate-pulse"
                  style={{
                    boxShadow: "0 0 8px rgba(255, 45, 45, 0.8)",
                  }}
                />
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
