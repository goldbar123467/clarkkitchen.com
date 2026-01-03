"use client";

import { StatusDot } from "./StatusDot";
import { UsageBar } from "./UsageBar";

const webTech = [
  { name: "React/Next.js", usage: 95, max: 100, status: "live" as const },
  { name: "Node.js", usage: 85, max: 100, status: "live" as const },
  { name: "Tailwind CSS", usage: 90, max: 100, status: "live" as const },
  { name: "PostgreSQL", usage: 70, max: 100, status: "live" as const },
  { name: "GraphQL", usage: 60, max: 100, status: "active" as const },
];

export function WebSection() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 border-b border-[#1f1f1f] pb-3">
        <span className="font-mono text-sm text-[#ff2d2d]">&gt;</span>
        <h3 className="font-mono text-sm font-semibold tracking-wide">
          WEB TECHNOLOGIES
        </h3>
      </div>
      <div className="grid gap-3">
        {webTech.map((tech) => (
          <div
            key={tech.name}
            className="flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-2 min-w-[140px]">
              <StatusDot status={tech.status} size="sm" />
              <span className="font-mono text-xs text-muted-foreground">
                {tech.name}
              </span>
            </div>
            <UsageBar value={tech.usage} max={tech.max} />
            <span className="font-mono text-xs text-muted-foreground min-w-[45px] text-right">
              {tech.usage}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
