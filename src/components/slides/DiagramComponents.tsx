"use client";

import React, { useState } from "react";
import {
  Activity,
  ArrowRight,
  Calculator,
  CheckCircle2,
  Cpu,
  Database,
  Info,
  LayoutDashboard,
  Layers,
  Lock,
  RefreshCw,
  Server,
  ShieldAlert,
  Sparkles,
  UserCheck,
} from "lucide-react";
import { WORKFLOW_STEPS } from "@/lib/slides/slidesData";
import {
  calculatePregnancyStats,
  getDefaultLmpForWeek,
} from "@/lib/pregnancyCalculations";
import { DEFAULT_PROFILE } from "@/lib/store";

const WORKFLOW_ICONS = [
  UserCheck,
  Calculator,
  LayoutDashboard,
  Layers,
  Activity,
  RefreshCw,
];

export function WorkflowDiagram() {
  const [sandboxLmp, setSandboxLmp] = useState<string>(() =>
    getDefaultLmpForWeek(24, 4)
  );

  const liveStats = calculatePregnancyStats({
    ...DEFAULT_PROFILE,
    datingMethod: "lmp",
    lmpDate: sandboxLmp,
  });

  const topRow = WORKFLOW_STEPS.slice(0, 3);
  const bottomRow = WORKFLOW_STEPS.slice(3, 6);

  return (
    <div className="flex-1 flex flex-col justify-between min-h-0">
      {/* Main 6-node connected pipeline */}
      <div className="relative bg-white/85 rounded-[28px] border border-black/[0.07] shadow-[0_8px_30px_rgba(0,0,0,0.03)] px-11 py-8 flex-1 flex flex-col justify-center">
        {/* Top Row: 01 -> 02 -> 03 */}
        <div className="grid grid-cols-3 gap-11 relative z-10">
          {topRow.map((item, idx) => {
            const Icon = WORKFLOW_ICONS[idx];
            return (
              <div
                key={item.step}
                style={{ "--stagger": idx } as React.CSSProperties}
                className="reveal-item relative flex items-stretch"
              >
                <div className="flex-1 bg-[#FAF8F5] rounded-[22px] border border-[#8C1D40]/18 p-6 flex flex-col justify-between shadow-sm">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-3.5 py-1 rounded-full bg-[#8C1D40] text-white text-[13.5px] font-bold tracking-wider">
                        STEP {item.step}
                      </span>
                      <div className="w-10 h-10 rounded-xl bg-[#8C1D40]/10 text-[#8C1D40] flex items-center justify-center">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>
                    <h3 className="text-[23px] font-bold text-[#1C1C1E] tracking-tight mb-1.5">
                      {item.title}
                    </h3>
                    <p className="text-[16.5px] leading-[1.42] text-[#525258]">
                      {item.description}
                    </p>
                  </div>

                  {/* Step 01 Interactive LMP Date Input */}
                  {idx === 0 && (
                    <div className="no-print mt-3.5 pt-3 border-t border-[#8C1D40]/12 flex items-center justify-between gap-2">
                      <span className="text-[12px] font-bold uppercase tracking-wider text-[#8C1D40]">
                        Live LMP Input:
                      </span>
                      <input
                        type="date"
                        value={sandboxLmp}
                        onChange={(e) => {
                          if (e.target.value) setSandboxLmp(e.target.value);
                        }}
                        className="px-2.5 py-1 rounded-lg bg-white border border-[#8C1D40]/25 text-[13.5px] font-semibold text-[#1C1C1E] focus:outline-none focus:border-[#8C1D40] cursor-pointer"
                      />
                    </div>
                  )}

                  {/* Step 02 Live Engine Output */}
                  {idx === 1 && (
                    <div className="mt-3.5 pt-3 border-t border-[#8C1D40]/12 flex items-center justify-between text-[13px] font-bold">
                      <span className="px-2.5 py-1 rounded-lg bg-[#8C1D40]/10 text-[#8C1D40]">
                        Wk {liveStats.currentWeek}+{liveStats.currentDayOfWeek}d •{" "}
                        {liveStats.trimesterLabelEn}
                      </span>
                      <span className="text-[#28543D]">
                        EDD: {liveStats.formattedDueDate}
                      </span>
                    </div>
                  )}

                  {/* Step 03 Live Progress Output */}
                  {idx === 2 && (
                    <div className="mt-3.5 pt-3 border-t border-[#8C1D40]/12 flex items-center justify-between gap-3">
                      <div className="flex-1 h-2 rounded-full bg-black/[0.07] overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#8C1D40] to-[#3D7A5A] transition-all duration-300"
                          style={{ width: `${liveStats.percentComplete}%` }}
                        />
                      </div>
                      <span className="text-[12.5px] font-bold text-[#525258] shrink-0">
                        {liveStats.daysRemaining}d left
                      </span>
                    </div>
                  )}
                </div>

                {idx < 2 && (
                  <div className="absolute -right-8 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-6 h-6">
                    <ArrowRight className="w-6 h-6 text-[#8C1D40]" strokeWidth={2.4} />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Connector bridge from Step 03 down to Step 04 with subtle live flow */}
        <div className="h-[60px] relative flex items-center justify-center my-1">
          <svg
            className="w-full h-full overflow-visible"
            viewBox="0 0 1560 60"
            fill="none"
          >
            <path
              d="M 1300 4 L 1300 30 Q 1300 42 1288 42 L 272 42 Q 260 42 260 52 L 260 56"
              stroke="#8C1D40"
              strokeOpacity="0.25"
              strokeWidth="2.5"
              fill="none"
            />
            <path
              d="M 1300 4 L 1300 30 Q 1300 42 1288 42 L 272 42 Q 260 42 260 52 L 260 56"
              stroke="#8C1D40"
              strokeWidth="2.5"
              fill="none"
              className="svg-flow-active"
            />
            <polygon points="260,60 253,48 267,48" fill="#8C1D40" />
            <rect
              x="655"
              y="28"
              width="250"
              height="26"
              rx="13"
              fill="#FAF8F5"
              stroke="#D8C8CE"
              strokeWidth="1.2"
            />
            <text
              x="780"
              y="45"
              textAnchor="middle"
              fill="#7A2848"
              fontSize="12.5"
              fontWeight="600"
              letterSpacing="0.06em"
            >
              STAGE-AWARE CONTEXT
            </text>
          </svg>
        </div>

        {/* Bottom Row: 04 -> 05 -> 06 */}
        <div className="grid grid-cols-3 gap-11 relative z-10">
          {bottomRow.map((item, idx) => {
            const Icon = WORKFLOW_ICONS[idx + 3];
            const isFinal = idx === 2;
            return (
              <div
                key={item.step}
                style={{ "--stagger": idx + 3 } as React.CSSProperties}
                className="reveal-item relative flex items-stretch"
              >
                <div
                  className={`flex-1 rounded-[22px] p-6 flex flex-col justify-between shadow-sm border ${
                    isFinal
                      ? "bg-[#F2F8F5] border-[#3D7A5A]/35"
                      : "bg-[#FAF8F5] border-[#3D7A5A]/22"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`px-3.5 py-1 rounded-full text-white text-[13.5px] font-bold tracking-wider ${
                        isFinal ? "bg-[#3D7A5A]" : "bg-[#526B5C]"
                      }`}
                    >
                      STEP {item.step}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-[#3D7A5A]/12 text-[#3D7A5A] flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-[23px] font-bold text-[#1C1C1E] tracking-tight mb-1.5">
                      {item.title}
                    </h3>
                    <p className="text-[16.5px] leading-[1.42] text-[#525258]">
                      {item.description}
                    </p>
                  </div>
                </div>

                {idx < 2 && (
                  <div className="absolute -right-8 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-6 h-6">
                    <ArrowRight className="w-6 h-6 text-[#3D7A5A]" strokeWidth={2.4} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Current vs Planned Distinction Strip */}
      <div className="mt-5 grid grid-cols-2 gap-7 shrink-0">
        <div className="bg-white rounded-[20px] border-2 border-[#3D7A5A]/40 px-7 py-3.5 flex items-center gap-4 shadow-sm">
          <span className="px-3.5 py-1.5 rounded-lg bg-[#3D7A5A] text-white text-[12.5px] font-bold tracking-wider uppercase shrink-0">
            Current Implementation
          </span>
          <p className="text-[17.5px] font-medium text-[#1C1C1E]">
            Frontend MVP with browser-based local data persistence (
            <code className="text-[15.5px] bg-[#F2F8F5] px-2 py-0.5 rounded text-[#2E5E45]">
              localStorage
            </code>
            ).
          </p>
        </div>

        <div className="bg-[#FAF8F5] rounded-[20px] border-2 border-dashed border-[#7A2848]/45 px-7 py-3.5 flex items-center gap-4">
          <span className="px-3.5 py-1.5 rounded-lg bg-[#7A2848]/12 text-[#7A2848] border border-dashed border-[#7A2848]/40 text-[12.5px] font-bold tracking-wider uppercase shrink-0">
            Planned
          </span>
          <p className="text-[17.5px] font-medium text-[#3A3A3C]">
            Secure backend, database persistence, and AI service integration.
          </p>
        </div>
      </div>
    </div>
  );
}

type ArchLayerId =
  | "frontend"
  | "logic"
  | "storage"
  | "api"
  | "security"
  | "db"
  | "ai";

const LAYER_XRAY_SPECS: Record<
  ArchLayerId,
  { badge: string; status: "Implemented" | "Planned"; detail: string }
> = {
  frontend: {
    badge: "Client UI Shell",
    status: "Implemented",
    detail:
      "src/app/page.tsx, TopNav.tsx & BottomNav.tsx — Next.js 15 App Router, React 19, strict TypeScript & Tailwind CSS.",
  },
  logic: {
    badge: "Domain & State Engine",
    status: "Implemented",
    detail:
      "src/lib/pregnancyCalculations.ts, store.tsx & keralaContent.ts — LMP/EDD engine, Weeks 4–40 bilingual data & Recharts.",
  },
  storage: {
    badge: "Browser Persistence",
    status: "Implemented",
    detail:
      "src/lib/store.tsx (materna_kerala_mvp_state_v1) — Hydrates and persists profile, vitals, supplements & danger-sign checks locally.",
  },
  api: {
    badge: "FastAPI REST Service",
    status: "Planned",
    detail:
      "Planned backend API layer — RESTful domain endpoints (/profile, /vitals, /appointments) with Pydantic v2 schema validation.",
  },
  security: {
    badge: "Authentication & Privacy",
    status: "Planned",
    detail:
      "Planned security module — JWT access/refresh authentication, route protection, and encrypted maternal record handling.",
  },
  db: {
    badge: "Relational Data Store",
    status: "Planned",
    detail:
      "Planned persistence tier — PostgreSQL relational schema managed via SQLAlchemy ORM and versioned Alembic migrations.",
  },
  ai: {
    badge: "Guarded AI Assistant",
    status: "Planned",
    detail:
      "Planned Ask ASHA backend — Injects gestational-week context with non-diagnostic safety guardrails before external LLM calls.",
  },
};

export function ArchitectureDiagram() {
  const [focused, setFocused] = useState<ArchLayerId | null>(null);

  const toggleLayer = (id: ArchLayerId) => {
    setFocused((prev) => (prev === id ? null : id));
  };

  const layerDimClass = (id: ArchLayerId) => {
    if (!focused) return "opacity-100";
    return focused === id
      ? "opacity-100 ring-2 ring-[#8C1D40] scale-[1.01]"
      : "opacity-45";
  };

  const activeSpec = focused ? LAYER_XRAY_SPECS[focused] : null;

  return (
    <div className="flex-1 flex flex-col justify-between min-h-0">
      <div className="flex-1 grid grid-cols-12 gap-7 items-stretch min-h-0">
        {/* LEFT ZONE: CURRENTLY IMPLEMENTED (Cols 1-5) */}
        <div className="reveal-item col-span-5 bg-[#F2F7F4] rounded-[28px] border-2 border-[#3D7A5A] p-7 flex flex-col justify-between relative shadow-sm">
          <div>
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-6 h-6 text-[#3D7A5A]" />
                <span className="text-[16px] font-extrabold tracking-[0.12em] uppercase text-[#28543D]">
                  Currently Implemented — Client
                </span>
              </div>
              <span className="px-3 py-1 rounded-full bg-[#3D7A5A] text-white text-[12px] font-bold uppercase tracking-wider">
                Operational MVP
              </span>
            </div>

            {/* Frontend Stack Box */}
            <div
              onClick={() => toggleLayer("frontend")}
              className={`bg-white rounded-[18px] border border-[#3D7A5A]/30 p-5 shadow-sm cursor-pointer transition-all duration-200 ${layerDimClass(
                "frontend"
              )}`}
            >
              <div className="text-[13px] font-bold uppercase tracking-wider text-[#3D7A5A] mb-2.5">
                Frontend Framework & UI
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                {[
                  "Next.js 15 (App Router)",
                  "React 19",
                  "TypeScript (Strict)",
                  "Tailwind CSS",
                ].map((tech) => (
                  <div
                    key={tech}
                    className="px-3.5 py-2 rounded-xl bg-[#F4F9F6] border border-[#3D7A5A]/20 text-[15.5px] font-semibold text-[#1C1C1E]"
                  >
                    {tech}
                  </div>
                ))}
              </div>
            </div>

            {/* Solid Animated Down Connector */}
            <div className="flex justify-center my-2.5">
              <svg width="24" height="28" viewBox="0 0 24 28" fill="none">
                <line
                  x1="12"
                  y1="2"
                  x2="12"
                  y2="20"
                  stroke="#3D7A5A"
                  strokeOpacity="0.3"
                  strokeWidth="2.5"
                />
                <line
                  x1="12"
                  y1="2"
                  x2="12"
                  y2="20"
                  stroke="#3D7A5A"
                  strokeWidth="2.5"
                  className="svg-flow-active"
                />
                <polygon points="12,27 6,18 18,18" fill="#3D7A5A" />
              </svg>
            </div>

            {/* Application Logic Box */}
            <div
              onClick={() => toggleLayer("logic")}
              className={`bg-white rounded-[18px] border border-[#3D7A5A]/30 p-5 shadow-sm cursor-pointer transition-all duration-200 ${layerDimClass(
                "logic"
              )}`}
            >
              <div className="text-[13px] font-bold uppercase tracking-wider text-[#3D7A5A] mb-2.5">
                Client Application Logic
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                {[
                  "Pregnancy Calculation Engine",
                  "React Context State Store",
                  "Four-Screen Bilingual UI",
                  "Recharts Visualizations",
                ].map((item) => (
                  <div
                    key={item}
                    className="px-3.5 py-2 rounded-xl bg-[#F4F9F6] border border-[#3D7A5A]/20 text-[15px] font-medium text-[#1C1C1E]"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Solid Animated Down Connector */}
            <div className="flex justify-center my-2.5">
              <svg width="24" height="28" viewBox="0 0 24 28" fill="none">
                <line
                  x1="12"
                  y1="2"
                  x2="12"
                  y2="20"
                  stroke="#3D7A5A"
                  strokeOpacity="0.3"
                  strokeWidth="2.5"
                />
                <line
                  x1="12"
                  y1="2"
                  x2="12"
                  y2="20"
                  stroke="#3D7A5A"
                  strokeWidth="2.5"
                  className="svg-flow-active"
                />
                <polygon points="12,27 6,18 18,18" fill="#3D7A5A" />
              </svg>
            </div>

            {/* Persistence Box */}
            <div
              onClick={() => toggleLayer("storage")}
              className={`bg-white rounded-[18px] border border-[#3D7A5A]/35 p-4 flex items-center justify-between shadow-sm cursor-pointer transition-all duration-200 ${layerDimClass(
                "storage"
              )}`}
            >
              <div>
                <div className="text-[12.5px] font-bold uppercase tracking-wider text-[#3D7A5A]">
                  Current Persistence
                </div>
                <div className="text-[18px] font-bold text-[#1C1C1E] mt-0.5">
                  Browser <code className="text-[#28543D]">localStorage</code>
                </div>
              </div>
              <span className="px-3 py-1 rounded-lg bg-[#E6F2EC] text-[#28543D] text-[13px] font-semibold">
                Client-Only State
              </span>
            </div>
          </div>
        </div>

        {/* CENTER BRIDGE: STATIC DASHED INTEGRATION CONNECTOR (Col 6) */}
        <div className="col-span-1 flex flex-col items-center justify-center gap-10 px-1">
          <div className="flex flex-col items-center text-center">
            <span className="text-[11.5px] font-bold uppercase tracking-wider text-[#7A2848] mb-2 bg-[#F9F2F5] px-2.5 py-1 rounded-md border border-dashed border-[#7A2848]/40">
              Planned API Link
            </span>
            <svg width="96" height="28" viewBox="0 0 96 28" fill="none">
              <line
                x1="4"
                y1="14"
                x2="82"
                y2="14"
                stroke="#7A2848"
                strokeWidth="2.5"
                strokeDasharray="6 5"
              />
              <polygon points="92,14 80,7 80,21" fill="#7A2848" />
            </svg>
          </div>

          <div className="flex flex-col items-center text-center">
            <span className="text-[11.5px] font-bold uppercase tracking-wider text-[#7A2848] mb-2 bg-[#F9F2F5] px-2.5 py-1 rounded-md border border-dashed border-[#7A2848]/40">
              Planned AI Call
            </span>
            <svg width="96" height="28" viewBox="0 0 96 28" fill="none">
              <line
                x1="4"
                y1="14"
                x2="82"
                y2="14"
                stroke="#7A2848"
                strokeWidth="2.5"
                strokeDasharray="6 5"
              />
              <polygon points="92,14 80,7 80,21" fill="#7A2848" />
            </svg>
          </div>
        </div>

        {/* RIGHT ZONE: PLANNED BACKEND & AI (Cols 7-12) */}
        <div
          style={{ "--stagger": 1 } as React.CSSProperties}
          className="reveal-item col-span-6 bg-[#FCF9FA] rounded-[28px] border-2 border-dashed border-[#7A2848]/65 p-7 flex flex-col justify-between relative"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <Server className="w-6 h-6 text-[#7A2848]" />
              <span className="text-[16px] font-extrabold tracking-[0.12em] uppercase text-[#7A2848]">
                Planned — Backend, Security & AI Services
              </span>
            </div>
            <span className="px-3.5 py-1 rounded-full bg-[#7A2848]/12 border border-dashed border-[#7A2848]/50 text-[#7A2848] text-[12px] font-bold uppercase tracking-wider">
              Planned • Not Yet Operational
            </span>
          </div>

          {/* Core Backend Pipeline: API + Security -> Database */}
          <div className="grid grid-cols-2 gap-4">
            {/* API Layer */}
            <div
              onClick={() => toggleLayer("api")}
              className={`bg-white/90 rounded-[18px] border border-dashed border-[#7A2848]/45 p-5 cursor-pointer transition-all duration-200 ${layerDimClass(
                "api"
              )}`}
            >
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-[13px] font-bold uppercase tracking-wider text-[#7A2848] flex items-center gap-1.5">
                  <Server className="w-4 h-4" /> API Layer
                </span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-[#F7EDF1] text-[#7A2848]">
                  PLANNED
                </span>
              </div>
              <ul className="space-y-1.5 text-[15.5px] text-[#3A3A3C] font-medium">
                <li>• FastAPI service architecture</li>
                <li>• RESTful domain endpoints</li>
                <li>• Pydantic request/response validation</li>
              </ul>
            </div>

            {/* Security Layer */}
            <div
              onClick={() => toggleLayer("security")}
              className={`bg-white/90 rounded-[18px] border border-dashed border-[#7A2848]/45 p-5 cursor-pointer transition-all duration-200 ${layerDimClass(
                "security"
              )}`}
            >
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-[13px] font-bold uppercase tracking-wider text-[#7A2848] flex items-center gap-1.5">
                  <Lock className="w-4 h-4" /> Security Layer
                </span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-[#F7EDF1] text-[#7A2848]">
                  PLANNED
                </span>
              </div>
              <ul className="space-y-1.5 text-[15.5px] text-[#3A3A3C] font-medium">
                <li>• JWT authentication & sessions</li>
                <li>• Role & route protection</li>
                <li>• Sensitive maternal data safeguards</li>
              </ul>
            </div>
          </div>

          {/* Static Dashed Arrow Down to Database */}
          <div className="flex justify-center my-2">
            <svg width="220" height="26" viewBox="0 0 220 26" fill="none">
              <line
                x1="110"
                y1="2"
                x2="110"
                y2="18"
                stroke="#7A2848"
                strokeWidth="2"
                strokeDasharray="4 4"
              />
              <polygon points="110,25 104,16 116,16" fill="#7A2848" />
            </svg>
          </div>

          {/* Database Layer */}
          <div
            onClick={() => toggleLayer("db")}
            className={`bg-white/90 rounded-[18px] border border-dashed border-[#7A2848]/45 p-5 cursor-pointer transition-all duration-200 ${layerDimClass(
              "db"
            )}`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[13px] font-bold uppercase tracking-wider text-[#7A2848] flex items-center gap-1.5">
                <Database className="w-4 h-4" /> Relational Persistence Layer
              </span>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-[#F7EDF1] text-[#7A2848]">
                PLANNED
              </span>
            </div>
            <div className="grid grid-cols-3 gap-3 mt-2">
              {["PostgreSQL Database", "SQLAlchemy ORM", "Alembic Migrations"].map(
                (dbItem) => (
                  <div
                    key={dbItem}
                    className="px-3.5 py-2 rounded-xl bg-[#FAF4F6] border border-dashed border-[#7A2848]/35 text-[15px] font-semibold text-[#3A3A3C] text-center"
                  >
                    {dbItem}
                  </div>
                )
              )}
            </div>
          </div>

          {/* Planned AI Guardrail Pipeline */}
          <div
            onClick={() => toggleLayer("ai")}
            className={`mt-3.5 bg-[#F8EFF3] rounded-[18px] border border-dashed border-[#7A2848]/50 p-5 cursor-pointer transition-all duration-200 ${layerDimClass(
              "ai"
            )}`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[13px] font-bold uppercase tracking-wider text-[#7A2848] flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" /> Planned AI Assistant Pipeline
              </span>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-white text-[#7A2848] border border-dashed border-[#7A2848]/35">
                PLANNED
              </span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <div className="flex-1 bg-white rounded-xl border border-dashed border-[#7A2848]/35 px-3.5 py-2.5 text-center">
                <div className="text-[14.5px] font-bold text-[#1C1C1E] flex items-center justify-center gap-1.5">
                  <Cpu className="w-4 h-4 text-[#7A2848]" /> Guarded Orchestration
                </div>
                <div className="text-[12.5px] text-[#636366]">
                  Pregnancy-stage context
                </div>
              </div>
              <span className="text-[#7A2848] font-bold text-[18px]">⇢</span>
              <div className="flex-1 bg-white rounded-xl border border-dashed border-[#7A2848]/35 px-3.5 py-2.5 text-center">
                <div className="text-[14.5px] font-bold text-[#1C1C1E] flex items-center justify-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-[#BA0034]" /> Safety Guardrails
                </div>
                <div className="text-[12.5px] text-[#636366]">
                  Non-diagnostic red-flag checks
                </div>
              </div>
              <span className="text-[#7A2848] font-bold text-[18px]">⇢</span>
              <div className="flex-1 bg-white rounded-xl border border-dashed border-[#7A2848]/35 px-3.5 py-2.5 text-center">
                <div className="text-[14.5px] font-bold text-[#1C1C1E]">
                  External LLM API
                </div>
                <div className="text-[12.5px] text-[#636366]">
                  Informational response
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Architecture Legend OR Interactive X-Ray Spec Footer */}
      <div className="mt-5 bg-white rounded-[18px] border border-black/[0.07] px-7 py-3.5 flex items-center justify-between text-[15.5px] shrink-0">
        {activeSpec ? (
          <div className="flex items-center justify-between w-full gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <span
                className={`px-3 py-1 rounded-lg text-[12px] font-bold uppercase tracking-wider shrink-0 ${
                  activeSpec.status === "Implemented"
                    ? "bg-[#3D7A5A] text-white"
                    : "bg-[#7A2848] text-white"
                }`}
              >
                {activeSpec.status} • {activeSpec.badge}
              </span>
              <span className="text-[#1C1C1E] font-medium truncate">
                {activeSpec.detail}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setFocused(null)}
              className="no-print text-[13px] font-bold text-[#8C1D40] hover:underline shrink-0"
            >
              Clear Focus
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-[3px] bg-[#3D7A5A] inline-block rounded-full" />
                <span className="font-semibold text-[#1C1C1E]">
                  Solid Sage Zone: Implemented Frontend MVP
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-0 border-t-[3px] border-dashed border-[#7A2848] inline-block" />
                <span className="font-semibold text-[#3A3A3C]">
                  Dashed Plum Zone: Planned Full-Stack & AI Architecture
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-[#6E6E73] font-medium">
              <Info className="no-print w-4 h-4 text-[#8C1D40]" />
              <span className="no-print text-[14px]">
                Click any module to inspect architecture spec
              </span>
              <span className="hidden print:inline">
                Target Data Flow: Frontend ⇢ FastAPI REST ⇢ Services ⇢ PostgreSQL
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
