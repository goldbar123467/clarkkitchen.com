"use client";

import dynamic from "next/dynamic";

// Dynamic import for PIXI.js (requires client-side only)
const PixiCaveBackground = dynamic(
  () =>
    import("./PixiCaveBackground").then((mod) => mod.PixiCaveBackground),
  { ssr: false }
);

export function CaveBackgroundWrapper() {
  return <PixiCaveBackground />;
}
