"use client";

import { motion } from "framer-motion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { UsageBar } from "./UsageBar";
import { languages } from "@/lib/data/dashboard-data";

export function LanguagesSection() {
  const maxProjects = Math.max(...languages.map((lang) => lang.projects));

  return (
    <section className="w-full">
      {/* Section Header */}
      <div className="mb-4 flex items-center gap-2">
        <h2 className="font-mono text-lg font-bold text-[#ff2d2d]">
          LANGUAGES
        </h2>
        <span
          className="inline-block w-2 h-4 bg-[#ff2d2d] animate-pulse"
          style={{
            boxShadow: "0 0 8px rgba(255, 45, 45, 0.8)",
          }}
        />
      </div>

      {/* Languages Table */}
      <div className="rounded-lg border border-[#1f1f1f] bg-[#0a0a0a]/50 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-[#1f1f1f] hover:bg-transparent">
              <TableHead className="font-mono text-sm text-[#6b7280] font-normal">
                Language
              </TableHead>
              <TableHead className="font-mono text-sm text-[#6b7280] font-normal text-right">
                Projects
              </TableHead>
              <TableHead className="font-mono text-sm text-[#6b7280] font-normal text-right">
                Files
              </TableHead>
              <TableHead className="font-mono text-sm text-[#6b7280] font-normal text-right">
                Lines
              </TableHead>
              <TableHead className="font-mono text-sm text-[#6b7280] font-normal">
                Usage
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {languages.map((lang, index) => (
              <motion.tr
                key={lang.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.3,
                  ease: "easeOut",
                }}
                className="border-b border-[#1f1f1f] last:border-0 hover:bg-[#1f1f1f]/50 transition-colors"
              >
                <TableCell className="font-mono text-sm text-[#e2e8f0]">
                  <div className="flex items-center gap-2">
                    <span>{lang.name}</span>
                    {lang.primary && (
                      <Badge
                        variant="outline"
                        className="text-[10px] px-1.5 py-0 h-4 border-[#ff2d2d] text-[#ff2d2d] font-mono"
                      >
                        PRIMARY
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell className="font-mono text-sm text-[#e2e8f0] text-right">
                  {lang.projects}
                </TableCell>
                <TableCell className="font-mono text-sm text-[#e2e8f0] text-right">
                  {lang.files}
                </TableCell>
                <TableCell className="font-mono text-sm text-[#e2e8f0] text-right">
                  {lang.lines}
                </TableCell>
                <TableCell>
                  <UsageBar value={lang.projects} max={maxProjects} />
                </TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
