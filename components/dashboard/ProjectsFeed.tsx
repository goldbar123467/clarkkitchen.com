"use client";

import { StatusDot } from "./StatusDot";

const projects = [
  {
    name: "AI Agent Platform",
    status: "live" as const,
    timestamp: "2024-01-15",
    description: "Multi-agent orchestration system",
  },
  {
    name: "Web3 Dashboard",
    status: "active" as const,
    timestamp: "2024-01-10",
    description: "Real-time blockchain analytics",
  },
  {
    name: "ML Pipeline",
    status: "active" as const,
    timestamp: "2024-01-08",
    description: "Automated data processing",
  },
  {
    name: "API Gateway",
    status: "maintenance" as const,
    timestamp: "2024-01-05",
    description: "Microservices orchestrator",
  },
];

export function ProjectsFeed() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 border-b border-[#1f1f1f] pb-3">
        <span className="font-mono text-sm text-[#ff2d2d]">&gt;</span>
        <h3 className="font-mono text-sm font-semibold tracking-wide">
          ACTIVE PROJECTS
        </h3>
      </div>
      <div className="grid gap-3">
        {projects.map((project) => (
          <div
            key={project.name}
            className="group p-3 rounded-lg bg-[#0a0a0a]/50 border border-[#1f1f1f] hover:border-[#ff2d2d]/30 transition-all duration-300"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-2 flex-1">
                <StatusDot status={project.status} size="sm" />
                <div className="space-y-1">
                  <h4 className="font-mono text-xs font-medium text-foreground">
                    {project.name}
                  </h4>
                  <p className="font-mono text-[10px] text-muted-foreground">
                    {project.description}
                  </p>
                </div>
              </div>
              <span className="font-mono text-[10px] text-muted-foreground whitespace-nowrap">
                {project.timestamp}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
