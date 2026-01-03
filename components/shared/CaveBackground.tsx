"use client";

import { cn } from "@/lib/utils";

interface CaveBackgroundProps {
  className?: string;
}

export function CaveBackground({ className }: CaveBackgroundProps) {
  return (
    <div
      className={cn(
        "fixed inset-0 -z-20 pointer-events-none overflow-hidden",
        className
      )}
    >
      {/* Layer 1: Rocky cave texture overlay */}
      <div className="absolute inset-0 cave-texture opacity-[0.035]" />

      {/* Layer 2: Stalactite silhouettes at top */}
      <svg
        className="absolute top-0 left-0 w-full h-24 sm:h-32 stalactite-shadow"
        viewBox="0 0 1920 120"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0,0 L0,25
             Q30,35 45,55 Q60,30 80,28
             Q100,40 120,70 Q140,35 160,30
             Q190,45 210,85 Q230,40 260,32
             Q290,50 310,65 Q330,38 360,25
             Q400,48 430,90 Q460,42 500,30
             Q540,55 570,75 Q600,40 640,28
             Q680,52 710,95 Q740,45 780,32
             Q820,58 850,70 Q880,42 920,25
             Q960,55 1000,85 Q1040,48 1080,30
             Q1120,60 1150,78 Q1180,45 1220,28
             Q1260,52 1300,100 Q1340,50 1380,35
             Q1420,55 1460,72 Q1500,40 1540,25
             Q1580,48 1620,88 Q1660,45 1700,30
             Q1740,52 1780,65 Q1820,38 1860,28
             Q1890,45 1920,25 L1920,0 Z"
          fill="#000000"
        />
      </svg>

      {/* Layer 3: Secondary stalactites (smaller, more varied) */}
      <svg
        className="absolute top-0 left-0 w-full h-16 sm:h-20 opacity-80"
        viewBox="0 0 1920 80"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0,0 L0,15
             Q50,22 70,40 Q90,18 120,15
             Q170,28 200,55 Q230,22 280,18
             Q330,32 360,48 Q390,20 440,15
             Q490,30 530,60 Q570,25 620,18
             Q670,35 700,50 Q730,22 780,15
             Q830,28 870,65 Q910,30 960,20
             Q1010,38 1050,52 Q1090,25 1140,18
             Q1190,32 1230,58 Q1270,28 1320,15
             Q1370,35 1410,45 Q1450,22 1500,18
             Q1550,30 1590,55 Q1630,25 1680,15
             Q1730,32 1770,42 Q1810,20 1860,18
             Q1890,28 1920,15 L1920,0 Z"
          fill="#050505"
        />
      </svg>

      {/* Layer 4: Cave fog at bottom */}
      <div className="absolute inset-0 cave-fog" />

      {/* Layer 5: Vignette overlay - darkened edges */}
      <div className="absolute inset-0 cave-vignette" />

      {/* Layer 6: Red tech glow emanating from center */}
      <div className="absolute inset-0 tech-glow" />

      {/* Layer 7: Occasional drip effect (left side) */}
      <div
        className="absolute top-0 left-[15%] w-[1px] h-4 bg-gradient-to-b from-gray-600/30 to-transparent animate-drip"
        style={{ animationDelay: "0s", animationDuration: "6s" }}
      />
      <div
        className="absolute top-0 left-[35%] w-[1px] h-3 bg-gradient-to-b from-gray-500/20 to-transparent animate-drip"
        style={{ animationDelay: "2.5s", animationDuration: "7s" }}
      />
      <div
        className="absolute top-0 left-[72%] w-[1px] h-5 bg-gradient-to-b from-gray-600/25 to-transparent animate-drip"
        style={{ animationDelay: "4s", animationDuration: "5.5s" }}
      />
      <div
        className="absolute top-0 left-[88%] w-[1px] h-3 bg-gradient-to-b from-gray-500/20 to-transparent animate-drip"
        style={{ animationDelay: "1s", animationDuration: "8s" }}
      />

      {/* Layer 8: Ambient dust particles (CSS-based) */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating dust motes */}
        <div
          className="absolute w-1 h-1 rounded-full bg-gray-400/20 animate-dust"
          style={{ top: "20%", left: "10%", animationDelay: "0s" }}
        />
        <div
          className="absolute w-0.5 h-0.5 rounded-full bg-gray-300/15 animate-dust"
          style={{ top: "40%", left: "25%", animationDelay: "1.5s" }}
        />
        <div
          className="absolute w-1 h-1 rounded-full bg-gray-400/20 animate-dust"
          style={{ top: "60%", left: "15%", animationDelay: "3s" }}
        />
        <div
          className="absolute w-0.5 h-0.5 rounded-full bg-gray-300/15 animate-dust"
          style={{ top: "30%", left: "80%", animationDelay: "0.5s" }}
        />
        <div
          className="absolute w-1 h-1 rounded-full bg-gray-400/20 animate-dust"
          style={{ top: "70%", left: "90%", animationDelay: "2s" }}
        />
        <div
          className="absolute w-0.5 h-0.5 rounded-full bg-gray-300/15 animate-dust"
          style={{ top: "50%", left: "60%", animationDelay: "4s" }}
        />
        <div
          className="absolute w-1 h-1 rounded-full bg-gray-400/20 animate-dust"
          style={{ top: "15%", left: "45%", animationDelay: "2.5s" }}
        />
        <div
          className="absolute w-0.5 h-0.5 rounded-full bg-gray-300/15 animate-dust"
          style={{ top: "80%", left: "70%", animationDelay: "1s" }}
        />
      </div>

      {/* Layer 9: Subtle corner shadows for depth */}
      <div className="absolute top-0 left-0 w-1/4 h-1/4 bg-gradient-to-br from-black/40 to-transparent" />
      <div className="absolute top-0 right-0 w-1/4 h-1/4 bg-gradient-to-bl from-black/40 to-transparent" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-black/30 to-transparent" />
      <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-gradient-to-tl from-black/30 to-transparent" />
    </div>
  );
}
