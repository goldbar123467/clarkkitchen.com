"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Application, extend } from "@pixi/react";
import {
  Container,
  Graphics,
  Sprite,
  Texture,
  BlurFilter,
  NoiseFilter,
  ColorMatrixFilter,
} from "pixi.js";

// Extend PIXI components for JSX
extend({ Container, Graphics, Sprite });

interface DustParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  drift: number;
  driftSpeed: number;
}

interface Drip {
  x: number;
  y: number;
  speed: number;
  length: number;
  alpha: number;
  delay: number;
}

// Stalactite layer component
function Stalactites({
  width,
  yOffset = 0,
  scale = 1,
  alpha = 1,
}: {
  width: number;
  yOffset?: number;
  scale?: number;
  alpha?: number;
}) {
  const draw = useCallback(
    (g: Graphics) => {
      g.clear();
      g.setFillStyle({ color: 0x000000, alpha });

      // Generate jagged stalactite pattern
      const points: number[] = [0, 0];
      let x = 0;

      while (x < width) {
        const peakHeight = 30 + Math.random() * 70 * scale;
        const peakWidth = 30 + Math.random() * 50;

        // Left slope
        points.push(x, 15 * scale);
        // Peak
        points.push(x + peakWidth / 2, peakHeight);
        // Right slope
        points.push(x + peakWidth, 15 * scale);

        x += peakWidth;
      }

      points.push(width, 0);
      points.push(0, 0);

      g.poly(points);
      g.fill();
    },
    [width, scale, alpha]
  );

  return <pixiGraphics draw={draw} y={yOffset} />;
}

// Fog layer component
function FogLayer({
  width,
  height,
  y,
  alpha = 0.3,
}: {
  width: number;
  height: number;
  y: number;
  alpha?: number;
}) {
  const draw = useCallback(
    (g: Graphics) => {
      g.clear();

      // Create gradient fog effect with multiple rectangles
      const steps = 20;
      const stepHeight = height / steps;

      for (let i = 0; i < steps; i++) {
        const stepAlpha = alpha * (1 - i / steps);
        g.setFillStyle({ color: 0x0a0a0a, alpha: stepAlpha });
        g.rect(0, i * stepHeight, width, stepHeight + 1);
        g.fill();
      }
    },
    [width, height, alpha]
  );

  return <pixiGraphics draw={draw} y={y} />;
}

// Vignette overlay
function Vignette({ width, height }: { width: number; height: number }) {
  const draw = useCallback(
    (g: Graphics) => {
      g.clear();

      // Draw concentric ellipses for vignette effect
      const cx = width / 2;
      const cy = height / 2;
      const maxRadius = Math.max(width, height);

      for (let i = 10; i >= 0; i--) {
        const ratio = i / 10;
        const alpha = (1 - ratio) * 0.6;
        const rx = (0.3 + ratio * 0.7) * maxRadius;
        const ry = (0.3 + ratio * 0.7) * maxRadius * 0.7;

        g.setFillStyle({ color: 0x000000, alpha });
        g.ellipse(cx, cy, rx, ry);
        g.fill();
      }
    },
    [width, height]
  );

  return <pixiGraphics draw={draw} />;
}

// Tech glow effect
function TechGlow({ width, height }: { width: number; height: number }) {
  const draw = useCallback(
    (g: Graphics) => {
      g.clear();

      const cx = width / 2;
      const cy = height * 0.3;

      // Red tech glow emanating from center-top
      for (let i = 5; i >= 0; i--) {
        const ratio = i / 5;
        const alpha = ratio * 0.08;
        const rx = (1 - ratio) * width * 0.6;
        const ry = (1 - ratio) * height * 0.5;

        g.setFillStyle({ color: 0xff2d2d, alpha });
        g.ellipse(cx, cy, rx, ry);
        g.fill();
      }
    },
    [width, height]
  );

  return <pixiGraphics draw={draw} />;
}

// Dust particles system
function DustParticles({
  width,
  height,
  count = 60,
}: {
  width: number;
  height: number;
  count?: number;
}) {
  const particlesRef = useRef<DustParticle[]>([]);
  const [, forceUpdate] = useState(0);

  // Initialize particles
  useEffect(() => {
    particlesRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.2,
      size: 1 + Math.random() * 2,
      alpha: 0.1 + Math.random() * 0.25,
      drift: Math.random() * Math.PI * 2,
      driftSpeed: 0.002 + Math.random() * 0.005,
    }));
  }, [width, height, count]);

  // Animation loop
  useEffect(() => {
    let animationId: number;

    const animate = () => {
      particlesRef.current.forEach((p) => {
        p.drift += p.driftSpeed;
        p.x += p.vx + Math.sin(p.drift) * 0.2;
        p.y += p.vy + Math.cos(p.drift * 0.7) * 0.15;

        // Wrap around
        if (p.x > width + 20) p.x = -20;
        if (p.x < -20) p.x = width + 20;
        if (p.y > height + 20) p.y = -20;
        if (p.y < -20) p.y = height + 20;
      });

      forceUpdate((n) => n + 1);
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [width, height]);

  const draw = useCallback(
    (g: Graphics) => {
      g.clear();
      particlesRef.current.forEach((p) => {
        g.setFillStyle({ color: 0xb4b4af, alpha: p.alpha });
        g.circle(p.x, p.y, p.size);
        g.fill();
      });
    },
    [particlesRef.current]
  );

  return <pixiGraphics draw={draw} />;
}

// Water drips
function WaterDrips({
  width,
  height,
  count = 6,
}: {
  width: number;
  height: number;
  count?: number;
}) {
  const dripsRef = useRef<Drip[]>([]);
  const [, forceUpdate] = useState(0);

  // Initialize drips
  useEffect(() => {
    dripsRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: -30 - Math.random() * 300,
      speed: 1.5 + Math.random() * 2,
      length: 10 + Math.random() * 20,
      alpha: 0.05 + Math.random() * 0.15,
      delay: Math.random() * 500,
    }));
  }, [width, height, count]);

  // Animation loop
  useEffect(() => {
    let animationId: number;

    const animate = () => {
      dripsRef.current.forEach((d) => {
        d.y += d.speed;

        if (d.y > height + 50) {
          d.y = -50 - Math.random() * 400;
          d.x = Math.random() * width;
          d.speed = 1.5 + Math.random() * 2;
          d.alpha = 0.05 + Math.random() * 0.15;
        }
      });

      forceUpdate((n) => n + 1);
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [width, height]);

  const draw = useCallback(
    (g: Graphics) => {
      g.clear();
      dripsRef.current.forEach((d) => {
        // Draw gradient line for drip
        g.setStrokeStyle({ width: 1, color: 0x9ca3af, alpha: d.alpha });
        g.moveTo(d.x, d.y);
        g.lineTo(d.x, d.y + d.length);
        g.stroke();
      });
    },
    [dripsRef.current]
  );

  return <pixiGraphics draw={draw} />;
}

// Main cave scene
function CaveScene() {
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 });

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const { width, height } = dimensions;

  return (
    <pixiContainer>
      {/* Layer 1: Tech glow from center */}
      <TechGlow width={width} height={height} />

      {/* Layer 2: Primary stalactites */}
      <Stalactites width={width + 100} yOffset={0} scale={1} alpha={1} />

      {/* Layer 3: Secondary stalactites (smaller, offset) */}
      <Stalactites width={width + 100} yOffset={-5} scale={0.6} alpha={0.8} />

      {/* Layer 4: Dust particles */}
      <DustParticles width={width} height={height} count={70} />

      {/* Layer 5: Water drips */}
      <WaterDrips width={width} height={height} count={6} />

      {/* Layer 6: Fog at bottom */}
      <FogLayer
        width={width}
        height={height * 0.5}
        y={height * 0.5}
        alpha={0.8}
      />

      {/* Layer 7: Vignette overlay */}
      <Vignette width={width} height={height} />
    </pixiContainer>
  );
}

// Main component with PIXI Application
export function PixiCaveBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="fixed inset-0 -z-20 pointer-events-none">
      <Application
        background={0x0a0a0a}
        resizeTo={typeof window !== "undefined" ? window : undefined}
        antialias={true}
        resolution={typeof window !== "undefined" ? window.devicePixelRatio : 1}
        autoDensity={true}
      >
        <CaveScene />
      </Application>
    </div>
  );
}
