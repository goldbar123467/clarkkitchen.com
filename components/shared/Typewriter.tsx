"use client";

import { useState, useEffect } from "react";

interface TypewriterProps {
  prefix: string;
  lines: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  className?: string;
}

export function Typewriter({
  prefix,
  lines,
  typingSpeed = 50,
  deletingSpeed = 30,
  pauseDuration = 2000,
  className = "",
}: TypewriterProps) {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    // Blinking cursor effect
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    const currentLine = lines[currentLineIndex];

    if (!isDeleting && currentText === currentLine) {
      // Pause at end of line before deleting
      const pauseTimeout = setTimeout(() => {
        setIsDeleting(true);
      }, pauseDuration);
      return () => clearTimeout(pauseTimeout);
    }

    if (isDeleting && currentText === "") {
      // Move to next line after deleting
      setIsDeleting(false);
      setCurrentLineIndex((prev) => (prev + 1) % lines.length);
      return;
    }

    // Typing or deleting animation
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          // Typing
          setCurrentText(currentLine.substring(0, currentText.length + 1));
        } else {
          // Deleting
          setCurrentText(currentText.substring(0, currentText.length - 1));
        }
      },
      isDeleting ? deletingSpeed : typingSpeed
    );

    return () => clearTimeout(timeout);
  }, [
    currentText,
    currentLineIndex,
    isDeleting,
    lines,
    typingSpeed,
    deletingSpeed,
    pauseDuration,
  ]);

  return (
    <span className={className}>
      {prefix}
      <span className="text-[#ff2d2d]">
        {currentText}
        <span
          className={`inline-block w-[2px] h-[1em] bg-[#ff2d2d] ml-1 translate-y-[2px] ${
            showCursor ? "opacity-100" : "opacity-0"
          } transition-opacity duration-100`}
        />
      </span>
    </span>
  );
}
