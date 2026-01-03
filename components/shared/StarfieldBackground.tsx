"use client";

import { useEffect, useRef } from "react";

interface DustParticle {
  x: number;
  y: number;
  radius: number;
  speedY: number;
  speedX: number;
  opacity: number;
  drift: number;
  driftSpeed: number;
}

interface Drip {
  x: number;
  y: number;
  speed: number;
  length: number;
  opacity: number;
}

interface ScanLine {
  y: number;
  speed: number;
  opacity: number;
  lastScan: number;
}

export function StarfieldBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const dustRef = useRef<DustParticle[]>([]);
  const dripsRef = useRef<Drip[]>([]);
  const scanLineRef = useRef<ScanLine>({
    y: -50,
    speed: 0.4,
    opacity: 0.12,
    lastScan: 0,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Initialize dust particles (cave debris floating in air)
    const initDust = () => {
      const dustCount = Math.floor(Math.random() * 30) + 40; // 40-70 particles
      dustRef.current = Array.from({ length: dustCount }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5 + 0.5, // 0.5-2px (larger than stars)
        speedY: (Math.random() - 0.5) * 0.15, // -0.075 to +0.075 (drifts up OR down)
        speedX: (Math.random() - 0.5) * 0.08, // slight horizontal drift
        opacity: Math.random() * 0.25 + 0.1, // 0.1-0.35
        drift: Math.random() * Math.PI * 2, // phase for sine wave drift
        driftSpeed: Math.random() * 0.005 + 0.002, // slow oscillation
      }));
    };

    // Initialize occasional drips (water from stalactites)
    const initDrips = () => {
      dripsRef.current = Array.from({ length: 5 }, () => ({
        x: Math.random() * canvas.width,
        y: -20 - Math.random() * 200, // start above viewport, staggered
        speed: Math.random() * 2 + 1.5, // 1.5-3.5px/frame
        length: Math.random() * 15 + 8, // 8-23px length
        opacity: Math.random() * 0.15 + 0.05, // very subtle
      }));
    };

    initDust();
    initDrips();

    // Animation loop
    const animate = (timestamp: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Layer 1: Draw dust particles with erratic float
      dustRef.current.forEach((dust) => {
        // Update drift phase
        dust.drift += dust.driftSpeed;

        // Calculate position with sine wave drift
        const driftX = Math.sin(dust.drift) * 0.3;
        const driftY = Math.cos(dust.drift * 0.7) * 0.2;

        ctx.fillStyle = `rgba(180, 180, 175, ${dust.opacity})`;
        ctx.beginPath();
        ctx.arc(dust.x + driftX, dust.y + driftY, dust.radius, 0, Math.PI * 2);
        ctx.fill();

        // Move particle
        dust.y += dust.speedY;
        dust.x += dust.speedX;

        // Wrap around (both directions for Y since particles can go up or down)
        if (dust.y > canvas.height + 20) {
          dust.y = -20;
          dust.x = Math.random() * canvas.width;
        } else if (dust.y < -20) {
          dust.y = canvas.height + 20;
          dust.x = Math.random() * canvas.width;
        }

        // Wrap X
        if (dust.x > canvas.width + 20) {
          dust.x = -20;
        } else if (dust.x < -20) {
          dust.x = canvas.width + 20;
        }
      });

      // Layer 2: Draw water drips
      dripsRef.current.forEach((drip) => {
        // Gradient for drip (brighter at top, fades down)
        const gradient = ctx.createLinearGradient(
          drip.x,
          drip.y,
          drip.x,
          drip.y + drip.length
        );
        gradient.addColorStop(0, `rgba(150, 160, 170, ${drip.opacity})`);
        gradient.addColorStop(0.5, `rgba(130, 140, 150, ${drip.opacity * 0.6})`);
        gradient.addColorStop(1, `rgba(100, 110, 120, 0)`);

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(drip.x, drip.y);
        ctx.lineTo(drip.x, drip.y + drip.length);
        ctx.stroke();

        // Move drip down
        drip.y += drip.speed;

        // Reset when off screen
        if (drip.y > canvas.height + 30) {
          drip.y = -30 - Math.random() * 500; // Random delay before next drip
          drip.x = Math.random() * canvas.width;
          drip.speed = Math.random() * 2 + 1.5;
          drip.length = Math.random() * 15 + 8;
          drip.opacity = Math.random() * 0.15 + 0.05;
        }
      });

      // Layer 3: Tech scan line (Batman Beyond signature)
      const scanLine = scanLineRef.current;
      const timeSinceLastScan = timestamp - scanLine.lastScan;
      const scanInterval = 25000; // 25 seconds between scans

      if (timeSinceLastScan > scanInterval || scanLine.lastScan === 0) {
        if (scanLine.y > canvas.height + 50) {
          scanLine.y = -50;
          scanLine.lastScan = timestamp;
        }
      }

      // Draw scan line if active
      if (scanLine.y >= -50 && scanLine.y <= canvas.height + 50) {
        const gradient = ctx.createLinearGradient(
          0,
          scanLine.y - 25,
          0,
          scanLine.y + 25
        );
        gradient.addColorStop(0, "rgba(255, 45, 45, 0)");
        gradient.addColorStop(0.4, `rgba(255, 45, 45, ${scanLine.opacity * 0.3})`);
        gradient.addColorStop(0.5, `rgba(255, 45, 45, ${scanLine.opacity})`);
        gradient.addColorStop(0.6, `rgba(255, 45, 45, ${scanLine.opacity * 0.3})`);
        gradient.addColorStop(1, "rgba(255, 45, 45, 0)");

        ctx.fillStyle = gradient;
        ctx.fillRect(0, scanLine.y - 25, canvas.width, 50);

        scanLine.y += scanLine.speed;
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10"
      style={{ background: "transparent" }}
      aria-hidden="true"
    />
  );
}
