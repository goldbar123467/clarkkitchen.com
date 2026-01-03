"use client";

import { StatusDot } from "./StatusDot";
import { UsageBar } from "./UsageBar";

const aiTools = [
  { name: "LangChain", usage: 80, max: 100, status: "live" as const },
  { name: "TensorFlow", usage: 65, max: 100, status: "live" as const },
  { name: "PyTorch", usage: 60, max: 100, status: "active" as const },
  { name: "OpenAI API", usage: 90, max: 100, status: "live" as const },
  { name: "Hugging Face", usage: 55, max: 100, status: "active" as const },
];

export function AIMLSection() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 border-b border-[#1f1f1f] pb-3">
        <span className="font-mono text-sm text-[#ff2d2d]">&gt;</span>
        <h3 className="font-mono text-sm font-semibold tracking-wide">
          AI/ML FRAMEWORKS
        </h3>
      </div>
      <div className="grid gap-3">
        {aiTools.map((tool) => (
          <div
            key={tool.name}
            className="flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-2 min-w-[140px]">
              <StatusDot status={tool.status} size="sm" />
              <span className="font-mono text-xs text-muted-foreground">
                {tool.name}
              </span>
            </div>
            <UsageBar value={tool.usage} max={tool.max} />
            <span className="font-mono text-xs text-muted-foreground min-w-[45px] text-right">
              {tool.usage}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
