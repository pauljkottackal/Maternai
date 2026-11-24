"use client";

import React, { useState } from "react";
import {
  ArrowRight,
  BarChart3,
  BrainCircuit,
  CheckCircle2,
  CircleDashed,
  Clock,
  FlaskConical,
  HeartHandshake,
  LayoutGrid,
  Play,
  SearchCheck,
  Shield,
  Smartphone,
  X,
  ZoomIn,
} from "lucide-react";
import {
  EVIDENCE_SCREENSHOTS,
  REMAINING_WORK_GROUPS,
  RESEARCH_TEAM,
  ROADMAP_PHASES,
  SLIDE_METADATA,
  STATUS_MATRIX,
  TECHNICAL_TEAM,
} from "@/lib/slides/slidesData";
import { SlideShell } from "./SlideShell";

/* ============================================================================
 * SLIDE 8 — WORK COMPLETED & CURRENT STATUS (3-COLUMN STATUS MATRIX)
 * ========================================================================== */
export function Slide08Status() {
  const [spotlight, setSpotlight] = useState<
    "implemented" | "demo" | "planned" | null
  >(null);

  const toggleCol = (col: "implemented" | "demo" | "planned") => {
    setSpotlight((prev) => (prev === col ? null : col));
  };

  const spotClass = (col: "implemented" | "demo" | "planned") => {
    if (!spotlight) return "opacity-100";
    return spotlight === col
      ? "opacity-100 scale-[1.012] shadow-[0_14px_38px_rgba(0,0,0,0.08)]"
      : "opacity-45";
  };

  return (
    <SlideShell
      slideNumber={8}
      kicker="07 • Current Status"
      headline="The core user experience is implemented"
      variant="cool"
    >
      <div className="flex-1 grid grid-cols-12 gap-7 items-stretch min-h-0">
        {/* Column 1: IMPLEMENTED (5 cols) */}
        <div
          onClick={() => toggleCol("implemented")}
          style={{ "--stagger": 0 } as React.CSSProperties}
          className={`reveal-item col-span-5 bg-white rounded-[28px] border-2 border-[#3D7A5A]/45 p-8 flex flex-col justify-between shadow-sm cursor-pointer transition-all duration-200 ${spotClass(
            "implemented"
          )}`}
        >
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-black/[0.07]">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-6 h-6 text-[#3D7A5A]" />
                <span className="text-[19px] font-extrabold tracking-[0.12em] uppercase text-[#28543D]">
                  Implemented
                </span>
              </div>
              <span className="px-3.5 py-1 rounded-full bg-[#E6F2EC] text-[#28543D] text-[13px] font-bold">
                Active in MVP
              </span>
            </div>

            <ul className="mt-5 space-y-3.5">
              {STATUS_MATRIX.implemented.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3.5 text-[17.5px] leading-[1.4] text-[#1C1C1E] font-medium"
                >
                  <span className="w-5 h-5 rounded-full bg-[#3D7A5A]/15 text-[#28543D] flex items-center justify-center text-[12px] font-bold shrink-0 mt-0.5">
                    ✓
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-4 border-t border-black/[0.06] text-[14px] font-semibold text-[#28543D]">
            Interactive client functionality verified
          </div>
        </div>

        {/* Column 2: DEMO / CLIENT-SIDE (3 cols) */}
        <div
          onClick={() => toggleCol("demo")}
          style={{ "--stagger": 1 } as React.CSSProperties}
          className={`reveal-item col-span-3 bg-white rounded-[28px] border-2 border-[#B46928]/35 p-8 flex flex-col justify-between shadow-sm cursor-pointer transition-all duration-200 ${spotClass(
            "demo"
          )}`}
        >
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-black/[0.07]">
              <div className="flex items-center gap-2">
                <FlaskConical className="w-5 h-5 text-[#9A5820]" />
                <span className="text-[17px] font-extrabold tracking-[0.1em] uppercase text-[#9A5820]">
                  Demo / Client-Side
                </span>
              </div>
            </div>

            <ul className="mt-5 space-y-4">
              {STATUS_MATRIX.demo.map((item) => (
                <li
                  key={item}
                  className="p-4 rounded-2xl bg-[#FDF8F3] border border-[#B46928]/20 text-[17px] leading-[1.42] text-[#2C2C2E] font-medium"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-4 border-t border-black/[0.06] text-[14px] font-semibold text-[#9A5820]">
            Single-browser local state scope
          </div>
        </div>

        {/* Column 3: PLANNED (4 cols) */}
        <div
          onClick={() => toggleCol("planned")}
          style={{ "--stagger": 2 } as React.CSSProperties}
          className={`reveal-item col-span-4 bg-[#FCF9FA] rounded-[28px] border-2 border-dashed border-[#7A2848]/55 p-8 flex flex-col justify-between cursor-pointer transition-all duration-200 ${spotClass(
            "planned"
          )}`}
        >
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-[#7A2848]/15">
              <div className="flex items-center gap-2.5">
                <CircleDashed className="w-6 h-6 text-[#7A2848]" />
                <span className="text-[19px] font-extrabold tracking-[0.12em] uppercase text-[#7A2848]">
                  Planned
                </span>
              </div>
              <span className="px-3.5 py-1 rounded-full bg-[#F6EBF0] text-[#7A2848] text-[13px] font-bold">
                Next Phase
              </span>
            </div>

            <ul className="mt-5 space-y-4">
              {STATUS_MATRIX.planned.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 p-3.5 rounded-xl bg-white/90 border border-dashed border-[#7A2848]/30 text-[17px] leading-[1.4] text-[#3A3A3C] font-medium"
                >
                  <Clock className="w-4 h-4 text-[#7A2848] shrink-0 mt-1" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-4 border-t border-[#7A2848]/15 text-[14px] font-semibold text-[#7A2848]">
            Scheduled for full-stack integration phase
          </div>
        </div>
      </div>
    </SlideShell>
  );
}

/* ============================================================================
 * SLIDE 9 — IMPLEMENTATION EVIDENCE (5 GENUINE CAPTURES + LIVE SIMULATOR)
 * ========================================================================== */
export function Slide09Evidence() {
  const [mode, setMode] = useState<"gallery" | "simulator">("gallery");
  const [zoomedShot, setZoomedShot] = useState<
    (typeof EVIDENCE_SCREENSHOTS)[number] | null
  >(null);

  return (
    <SlideShell
      slideNumber={9}
      kicker="08 • Implementation Evidence"
      headline="The progress is visible in the application"
      subheadline="Actual screens captured directly from the running Materna Next.js 15 frontend MVP."
    >
      <div className="flex-1 flex flex-col justify-between min-h-0 relative">
        {/* Interactive Mode Switcher aligned with headline (Hidden in Print) */}
        <div className="no-print absolute -top-[84px] right-0 flex items-center bg-white p-1.5 rounded-2xl border border-black/[0.08] shadow-sm gap-1">
          <button
            type="button"
            onClick={() => setMode("gallery")}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-[13.5px] font-bold transition-all ${
              mode === "gallery"
                ? "bg-[#1C1C1E] text-white shadow-sm"
                : "text-[#525258] hover:text-[#1C1C1E]"
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
            <span>5-Screen Gallery</span>
          </button>
          <button
            type="button"
            onClick={() => setMode("simulator")}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-[13.5px] font-bold transition-all ${
              mode === "simulator"
                ? "bg-[#8C1D40] text-white shadow-sm"
                : "text-[#525258] hover:text-[#1C1C1E]"
            }`}
          >
            <Play className="w-4 h-4" />
            <span>Live Interactive Phone</span>
          </button>
        </div>

        {mode === "simulator" ? (
          /* LIVE EMBEDDED IPHONE SIMULATOR VIEW (Screen Only) */
          <div className="no-print flex-1 grid grid-cols-12 gap-10 items-center min-h-0">
            <div className="col-span-5 flex justify-center h-full items-center">
              <div className="w-[386px] h-[770px] bg-[#1C1C1E] rounded-[46px] p-[11px] shadow-[0_24px_60px_rgba(0,0,0,0.22)] border-[3px] border-[#3A3A3C] flex flex-col relative">
                {/* Dynamic Island Notch */}
                <div className="w-24 h-5 bg-black rounded-full mx-auto mb-1.5 shrink-0 flex items-center justify-end px-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#1C3B2B]" />
                </div>
                <div className="flex-1 rounded-[34px] overflow-hidden bg-[#F2F2F7]">
                  <iframe
                    src="/app"
                    title="Live Materna Interactive MVP"
                    className="w-full h-full border-0"
                  />
                </div>
              </div>
            </div>

            <div className="col-span-7 bg-white rounded-[30px] border border-black/[0.08] p-10 shadow-sm space-y-6">
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#E6F2EC] text-[#28543D] text-[13px] font-bold uppercase tracking-wider">
                <Smartphone className="w-4 h-4" />
                <span>Live React 19 Client Instance</span>
              </div>

              <h3 className="font-editorial text-[38px] leading-tight text-[#1C1C1E]">
                Interact with the live Materna MVP directly inside the presentation
              </h3>

              <p className="text-[18.5px] leading-relaxed text-[#525258]">
                This embedded frame runs the actual Next.js 15 application (<code className="text-[#8C1D40] font-semibold">/</code>) in real time without leaving fullscreen review mode.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                {[
                  {
                    step: "01",
                    title: "Bilingual Switcher",
                    desc: "Toggle EN ↔ മലയാളം in the top bar to see instant UI and content localization.",
                  },
                  {
                    step: "02",
                    title: "Interactive Kick & Water Logs",
                    desc: "Tap Kick Counter (+1) or hydration buttons; state persists in localStorage.",
                  },
                  {
                    step: "03",
                    title: "Vitals & Recharts",
                    desc: "Open Tracker tab to inspect gestational weight and blood pressure trend charts.",
                  },
                  {
                    step: "04",
                    title: "Safety Triage & Ask ASHA",
                    desc: "Test symptom red-flag checks on Safety or open Ask ASHA Q&A demo.",
                  },
                ].map((tip) => (
                  <div
                    key={tip.step}
                    className="p-4 rounded-2xl bg-[#FAF8F5] border border-black/[0.06]"
                  >
                    <div className="text-[12px] font-extrabold text-[#8C1D40] uppercase tracking-wider">
                      Demo Action {tip.step}
                    </div>
                    <div className="text-[17px] font-bold text-[#1C1C1E] mt-1">
                      {tip.title}
                    </div>
                    <p className="text-[14.5px] text-[#5C5C62] mt-1 leading-snug">
                      {tip.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* 5-SCREEN PRODUCTION SCREENSHOT GALLERY */
          <div className="flex-1 grid grid-cols-5 gap-6 items-stretch min-h-0">
            {EVIDENCE_SCREENSHOTS.map((shot, idx) => (
              <div
                key={shot.id}
                onClick={() => setZoomedShot(shot)}
                style={{ "--stagger": idx } as React.CSSProperties}
                className="reveal-item group bg-white rounded-[26px] border border-black/[0.08] p-4 flex flex-col justify-between shadow-[0_8px_28px_rgba(0,0,0,0.04)] hover:border-[#8C1D40]/40 hover:-translate-y-1 transition-all cursor-pointer"
              >
                {/* Top Label */}
                <div className="flex items-center justify-between mb-2.5 px-1">
                  <span className="text-[12px] font-bold uppercase tracking-wider text-[#8C1D40]">
                    0{idx + 1} • {shot.badge.split("•")[1]?.trim() || "MVP"}
                  </span>
                  <span className="no-print opacity-0 group-hover:opacity-100 transition-opacity text-[#6E6E73]">
                    <ZoomIn className="w-4 h-4" />
                  </span>
                </div>

                {/* iPhone Bezel Frame with Dynamic Island */}
                <div className="flex-1 bg-[#1C1C1E] rounded-[26px] p-[7px] shadow-inner flex flex-col overflow-hidden min-h-0">
                  <div className="bg-[#F2F2F7] rounded-[20px] flex-1 overflow-hidden relative flex flex-col">
                    <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-14 h-3 bg-[#1C1C1E] rounded-full z-10 pointer-events-none opacity-90" />
                    <img
                      src={shot.src}
                      alt={`Materna ${shot.title} screen`}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                </div>

                {/* Caption */}
                <div className="mt-3 px-1">
                  <div className="text-[18px] font-bold text-[#1C1C1E] leading-tight">
                    {shot.title}
                  </div>
                  <p className="text-[13.5px] leading-[1.35] text-[#5C5C62] mt-1">
                    {shot.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Interactive Lightbox Modal (Hidden in Print) */}
      {zoomedShot && (
        <div
          className="no-print fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-10"
          onClick={() => setZoomedShot(null)}
        >
          <div
            className="bg-white rounded-[32px] p-7 max-w-[540px] w-full max-h-[980px] flex flex-col shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-black/10">
              <div>
                <div className="text-[12px] font-bold uppercase tracking-wider text-[#8C1D40]">
                  {zoomedShot.badge}
                </div>
                <div className="text-[22px] font-bold text-[#1C1C1E]">
                  {zoomedShot.title}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setZoomedShot(null)}
                className="w-10 h-10 rounded-full bg-[#F2F2F7] hover:bg-[#E5E5EA] flex items-center justify-center text-[#1C1C1E]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="my-4 rounded-[22px] overflow-hidden border border-black/10 bg-[#F2F2F7] max-h-[760px] flex justify-center">
              <img
                src={zoomedShot.src}
                alt={zoomedShot.title}
                className="max-h-[750px] w-auto object-contain"
              />
            </div>
            <p className="text-[15px] text-[#525258]">{zoomedShot.caption}</p>
          </div>
        </div>
      )}
    </SlideShell>
  );
}

/* ============================================================================
 * SLIDE 10 — WORK YET TO BE COMPLETED (7-GROUP LAYERED BACKLOG + SPOTLIGHT)
 * ========================================================================== */
export function Slide10RemainingWork() {
  const [activeCode, setActiveCode] = useState<string | null>(null);
  const topRow = REMAINING_WORK_GROUPS.slice(0, 4);
  const bottomRow = REMAINING_WORK_GROUPS.slice(4, 7);

  const cardClass = (code: string) => {
    if (!activeCode) return "opacity-100";
    return activeCode === code
      ? "opacity-100 ring-2 ring-[#8C1D40] scale-[1.015] shadow-md"
      : "opacity-45";
  };

  return (
    <SlideShell
      slideNumber={10}
      kicker="09 • Engineering Backlog"
      headline="Moving from frontend MVP to a complete platform"
      variant="editorial"
    >
      <div className="flex-1 flex flex-col justify-between gap-6 min-h-0">
        {/* Top Row: 01 - 04 */}
        <div className="flex-1 grid grid-cols-4 gap-6 min-h-0">
          {topRow.map((group, idx) => (
            <div
              key={group.code}
              onClick={() =>
                setActiveCode((prev) => (prev === group.code ? null : group.code))
              }
              style={{ "--stagger": idx } as React.CSSProperties}
              className={`reveal-item bg-white rounded-[24px] border border-dashed border-[#7A2848]/40 p-6 flex flex-col justify-between shadow-sm cursor-pointer transition-all duration-200 ${cardClass(
                group.code
              )}`}
            >
              <div>
                <div className="flex items-center justify-between mb-3.5">
                  <span className="px-3 py-1 rounded-lg bg-[#7A2848]/10 text-[#7A2848] text-[13px] font-extrabold tracking-wider">
                    WORKSTREAM {group.code}
                  </span>
                </div>
                <h3 className="text-[22px] font-bold text-[#1C1C1E] leading-snug mb-4">
                  {group.title}
                </h3>
                <ul className="space-y-3">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-[17px] text-[#3A3A3C] leading-snug"
                    >
                      <span className="w-4 h-4 rounded border-2 border-[#7A2848]/45 shrink-0 mt-1" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Row: 05 - 07 */}
        <div className="flex-1 grid grid-cols-3 gap-6 min-h-0">
          {bottomRow.map((group, idx) => (
            <div
              key={group.code}
              onClick={() =>
                setActiveCode((prev) => (prev === group.code ? null : group.code))
              }
              style={{ "--stagger": idx + 4 } as React.CSSProperties}
              className={`reveal-item bg-white rounded-[24px] border border-dashed border-[#7A2848]/40 p-7 flex flex-col justify-between shadow-sm cursor-pointer transition-all duration-200 ${cardClass(
                group.code
              )}`}
            >
              <div>
                <div className="flex items-center justify-between mb-3.5">
                  <span className="px-3 py-1 rounded-lg bg-[#8C1D40]/10 text-[#8C1D40] text-[13px] font-extrabold tracking-wider">
                    WORKSTREAM {group.code}
                  </span>
                </div>
                <h3 className="text-[23px] font-bold text-[#1C1C1E] leading-snug mb-4">
                  {group.title}
                </h3>
                <div className="grid grid-cols-2 gap-x-5 gap-y-3">
                  {group.items.map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-2.5 text-[17px] text-[#3A3A3C] leading-snug"
                    >
                      <span className="w-4 h-4 rounded border-2 border-[#8C1D40]/45 shrink-0 mt-1" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SlideShell>
  );
}

/* ============================================================================
 * SLIDE 11 — DEVELOPMENT ROADMAP (TWO-TIER SERPENTINE TRACK)
 * ========================================================================== */
export function Slide11Roadmap() {
  const [focusedPhase, setFocusedPhase] = useState<string | null>(null);
  const topRow = ROADMAP_PHASES.slice(0, 4);
  const bottomRow = ROADMAP_PHASES.slice(4, 7);

  const phaseClass = (phase: string) => {
    if (!focusedPhase) return "opacity-100";
    return focusedPhase === phase
      ? "opacity-100 ring-2 ring-[#8C1D40] scale-[1.015] shadow-md"
      : "opacity-45";
  };

  return (
    <SlideShell
      slideNumber={11}
      kicker="10 • Development Roadmap"
      headline="The next phase of Materna's development"
      subheadline="Sequential engineering phases transitioning from the completed interactive frontend MVP into full-stack production readiness."
    >
      <div className="flex-1 flex flex-col justify-between min-h-0">
        {/* Current Handoff Banner */}
        <div className="bg-[#F2F7F4] rounded-[20px] border border-[#3D7A5A]/40 px-7 py-3.5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <span className="px-3.5 py-1 rounded-xl bg-[#3D7A5A] text-white text-[12.5px] font-bold uppercase tracking-wider">
              Current Baseline
            </span>
            <span className="text-[18px] font-bold text-[#1C1C1E]">
              Interactive Frontend MVP Complete
            </span>
            <ArrowRight className="w-5 h-5 text-[#3D7A5A]" />
            <span className="text-[17px] text-[#3A3A3C] font-medium">
              Phases 1–7 Full-Stack & AI Implementation Sequence
            </span>
          </div>
          <span className="text-[13.5px] font-semibold text-[#28543D]">
            Relative Effort Estimates (No Fixed Dates)
          </span>
        </div>

        {/* Two-Tier Serpentine Roadmap Container */}
        <div className="flex-1 flex flex-col justify-center my-3 min-h-0">
          {/* Top Row: Phases 1 - 4 */}
          <div className="grid grid-cols-4 gap-8 relative">
            {topRow.map((p, idx) => (
              <div
                key={p.phase}
                onClick={() =>
                  setFocusedPhase((prev) => (prev === p.phase ? null : p.phase))
                }
                style={{ "--stagger": idx } as React.CSSProperties}
                className={`reveal-item relative bg-white rounded-[24px] border border-black/[0.08] p-6 flex flex-col justify-between shadow-sm cursor-pointer transition-all duration-200 ${phaseClass(
                  p.phase
                )}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3.5 py-1 rounded-full bg-[#8C1D40] text-white text-[12.5px] font-bold uppercase tracking-wider">
                      {p.phase}
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-[#FAF4F6] text-[#7A2848] text-[12px] font-bold">
                      {p.effort}
                    </span>
                  </div>
                  <h3 className="text-[22px] font-bold text-[#1C1C1E] leading-snug mb-2">
                    {p.title}
                  </h3>
                  <p className="text-[16.5px] leading-[1.45] text-[#525258]">
                    {p.scope}
                  </p>
                </div>

                {idx < 3 && (
                  <div className="absolute -right-6 top-1/2 -translate-y-1/2 z-10">
                    <ArrowRight className="w-5 h-5 text-[#8C1D40]" strokeWidth={2.4} />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Serpentine Connector Bridge from Phase 4 down to Phase 5 */}
          <div className="h-[46px] relative flex items-center justify-center">
            <svg
              className="w-full h-full overflow-visible"
              viewBox="0 0 1728 46"
              fill="none"
            >
              <path
                d="M 1512 2 L 1512 22 Q 1512 30 1500 30 L 288 30 Q 276 30 276 38 L 276 42"
                stroke="#7A2848"
                strokeOpacity="0.35"
                strokeWidth="2.2"
                strokeDasharray="6 5"
              />
              <polygon points="276,45 270,35 282,35" fill="#7A2848" />
            </svg>
          </div>

          {/* Bottom Row: Phases 5 - 7 (3 Wide Spacious Cards) */}
          <div className="grid grid-cols-3 gap-9 relative">
            {bottomRow.map((p, idx) => {
              const isFinal = idx === 2;
              return (
                <div
                  key={p.phase}
                  onClick={() =>
                    setFocusedPhase((prev) => (prev === p.phase ? null : p.phase))
                  }
                  style={{ "--stagger": idx + 4 } as React.CSSProperties}
                  className={`reveal-item relative rounded-[24px] p-6 flex flex-col justify-between shadow-sm cursor-pointer transition-all duration-200 border ${
                    isFinal
                      ? "bg-[#F4F9F6] border-[#3D7A5A]/35"
                      : "bg-white border-black/[0.08]"
                  } ${phaseClass(p.phase)}`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className={`px-3.5 py-1 rounded-full text-white text-[12.5px] font-bold uppercase tracking-wider ${
                          isFinal ? "bg-[#3D7A5A]" : "bg-[#7A2848]"
                        }`}
                      >
                        {p.phase}
                      </span>
                      <span
                        className={`px-2.5 py-1 rounded-lg text-[12px] font-bold ${
                          isFinal
                            ? "bg-[#E4F1EA] text-[#28543D]"
                            : "bg-[#FAF4F6] text-[#7A2848]"
                        }`}
                      >
                        {p.effort}
                      </span>
                    </div>
                    <h3 className="text-[23px] font-bold text-[#1C1C1E] leading-snug mb-2">
                      {p.title}
                    </h3>
                    <p className="text-[17px] leading-[1.45] text-[#525258]">
                      {p.scope}
                    </p>
                  </div>

                  {idx < 2 && (
                    <div className="absolute -right-7 top-1/2 -translate-y-1/2 z-10">
                      <ArrowRight
                        className="w-5 h-5 text-[#7A2848]"
                        strokeWidth={2.4}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </SlideShell>
  );
}

/* ============================================================================
 * SLIDE 12 — TEAM CONTRIBUTIONS: TECHNICAL DEVELOPMENT (UNIFORM + SPOTLIGHT)
 * ========================================================================== */
export function Slide12TeamTech() {
  const [spotlightName, setSpotlightName] = useState<string | null>(null);

  const renderIcon = (type: "brain" | "shield" | "analytics") => {
    if (type === "brain") return <BrainCircuit className="w-7 h-7" />;
    if (type === "shield") return <Shield className="w-7 h-7" />;
    return <BarChart3 className="w-7 h-7" />;
  };

  return (
    <SlideShell
      slideNumber={12}
      kicker="11 • Team Contributions"
      headline="Technical Development"
      subheadline="Three technical contributors applying complementary specialization areas across architecture, security, and data analytics."
    >
      <div className="flex-1 grid grid-cols-3 gap-8 items-stretch min-h-0">
        {TECHNICAL_TEAM.map((member, idx) => {
          const isDimmed = spotlightName && spotlightName !== member.name;
          const isSpot = spotlightName === member.name;
          return (
            <div
              key={member.name}
              onClick={() =>
                setSpotlightName((prev) =>
                  prev === member.name ? null : member.name
                )
              }
              style={{ "--stagger": idx } as React.CSSProperties}
              className={`reveal-item bg-white rounded-[30px] border border-black/[0.08] p-9 flex flex-col justify-between shadow-[0_8px_28px_rgba(0,0,0,0.03)] cursor-pointer transition-all duration-200 ${
                isSpot
                  ? "scale-[1.015] ring-2 ring-[#8C1D40]/45 shadow-[0_16px_42px_rgba(0,0,0,0.08)]"
                  : isDimmed
                  ? "opacity-45"
                  : "opacity-100"
              }`}
            >
              <div>
                {/* Header Icon + Domain Pill */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-[#F5F3F0] text-[#8C1D40] flex items-center justify-center">
                    {renderIcon(member.iconType)}
                  </div>
                  <span className="px-3.5 py-1.5 rounded-full bg-[#F4F4F6] text-[#525258] text-[12.5px] font-bold uppercase tracking-wider">
                    {member.badgeLabel}
                  </span>
                </div>

                {/* Name & Specialization */}
                <h3 className="text-[28px] font-extrabold text-[#1C1C1E] tracking-tight">
                  {member.name}
                </h3>
                <div className="text-[17px] font-semibold text-[#8C1D40] mt-1">
                  {member.degree}
                </div>

                {/* Role Box */}
                <div className="mt-5 p-4 rounded-2xl bg-[#FAF8F5] border border-black/[0.05]">
                  <div className="text-[11.5px] font-bold uppercase tracking-wider text-[#8E8E93]">
                    Role Assignment
                  </div>
                  <div className="text-[16.5px] font-semibold text-[#2C2C2E] mt-1 leading-snug">
                    {member.role}
                  </div>
                </div>

                {/* Contribution Areas */}
                <div className="mt-6">
                  <div className="text-[12.5px] font-bold uppercase tracking-[0.14em] text-[#6E6E73] mb-3">
                    Contribution Areas
                  </div>
                  <ul className="space-y-2.5">
                    {member.contributions.map((area) => (
                      <li
                        key={area}
                        className="flex items-start gap-3 text-[17px] leading-[1.4] text-[#3A3A3C]"
                      >
                        <span className="w-2 h-2 rounded-full bg-[#8C1D40] mt-2 shrink-0" />
                        <span>{area}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-black/[0.06] text-[13.5px] font-medium text-[#6E6E73]">
                Technical Contributor • Materna Project Team
              </div>
            </div>
          );
        })}
      </div>
    </SlideShell>
  );
}

/* ============================================================================
 * SLIDE 13 — TEAM CONTRIBUTIONS: RESEARCH & DOMAIN EXPERTISE (2 CARDS)
 * ========================================================================== */
export function Slide13TeamResearch() {
  const [spotlightName, setSpotlightName] = useState<string | null>(null);

  return (
    <SlideShell
      slideNumber={13}
      kicker="12 • Team Contributions"
      headline="Research & Domain Expertise"
      subheadline="Two research contributors grounding Materna in maternal psychological wellbeing, behavioral insight, and evidence evaluation."
    >
      <div className="flex-1 flex flex-col justify-between gap-7 min-h-0">
        {/* Two Balanced Domain Cards */}
        <div className="flex-1 grid grid-cols-2 gap-10 items-stretch min-h-0">
          {RESEARCH_TEAM.map((member, idx) => {
            const isPsych = member.iconType === "psychology";
            const isSpot = spotlightName === member.name;
            const isDimmed = spotlightName && spotlightName !== member.name;
            return (
              <div
                key={member.name}
                onClick={() =>
                  setSpotlightName((prev) =>
                    prev === member.name ? null : member.name
                  )
                }
                style={{ "--stagger": idx } as React.CSSProperties}
                className={`reveal-item bg-white rounded-[30px] border border-black/[0.08] p-10 flex flex-col justify-between shadow-[0_8px_28px_rgba(0,0,0,0.03)] cursor-pointer transition-all duration-200 ${
                  isSpot
                    ? "scale-[1.012] ring-2 ring-[#3D7A5A]/50 shadow-[0_16px_42px_rgba(0,0,0,0.08)]"
                    : isDimmed
                    ? "opacity-45"
                    : "opacity-100"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className={`w-15 h-15 p-3.5 rounded-2xl flex items-center justify-center ${
                        isPsych
                          ? "bg-[#F2F8F5] text-[#3D7A5A]"
                          : "bg-[#FAF3F5] text-[#7A2848]"
                      }`}
                    >
                      {isPsych ? (
                        <HeartHandshake className="w-8 h-8" />
                      ) : (
                        <SearchCheck className="w-8 h-8" />
                      )}
                    </div>
                    <span
                      className={`px-4 py-1.5 rounded-full text-[13px] font-bold uppercase tracking-wider ${
                        isPsych
                          ? "bg-[#E8F3ED] text-[#28543D]"
                          : "bg-[#F7ECF0] text-[#7A2848]"
                      }`}
                    >
                      {member.badgeLabel}
                    </span>
                  </div>

                  <h3 className="text-[31px] font-extrabold text-[#1C1C1E] tracking-tight">
                    {member.name}
                  </h3>
                  <div className="text-[18.5px] font-semibold text-[#3D7A5A] mt-1">
                    {member.degree}
                  </div>

                  <div className="mt-6 p-5 rounded-2xl bg-[#FAF8F5] border border-black/[0.05]">
                    <div className="text-[12px] font-bold uppercase tracking-wider text-[#8E8E93]">
                      Research Role
                    </div>
                    <div className="text-[18px] font-semibold text-[#2C2C2E] mt-1">
                      {member.role}
                    </div>
                  </div>

                  <div className="mt-6">
                    <div className="text-[13px] font-bold uppercase tracking-[0.14em] text-[#6E6E73] mb-3.5">
                      Domain Contribution Areas
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      {member.contributions.map((c) => (
                        <div
                          key={c}
                          className="p-3.5 rounded-xl bg-[#F9F8F6] border border-black/[0.05] text-[17px] font-medium text-[#2C2C2E] leading-snug"
                        >
                          {c}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Refined Light Editorial Footer */}
        <div className="bg-white rounded-[22px] border border-black/[0.08] px-8 py-4 flex items-center justify-between shadow-[0_4px_16px_rgba(0,0,0,0.02)] shrink-0">
          <div className="flex items-center gap-4">
            <span className="px-3.5 py-1 rounded-full bg-[#8C1D40]/10 text-[#8C1D40] text-[12.5px] font-bold uppercase tracking-[0.14em]">
              Interdisciplinary Structure
            </span>
            <div className="flex items-center gap-2.5 text-[18px] font-bold text-[#1C1C1E]">
              <span>3 Technical Contributors</span>
              <span className="text-[#8E8E93] font-medium">+</span>
              <span>2 Research Contributors</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {[
              "AI & ML",
              "Cybersecurity",
              "Data Science",
              "Psychology",
              "Forensic Science",
            ].map((domain) => (
              <span
                key={domain}
                className="px-3 py-1 rounded-lg bg-[#FAF8F5] border border-black/[0.06] text-[13.5px] font-semibold text-[#525258]"
              >
                {domain}
              </span>
            ))}
          </div>
        </div>
      </div>
    </SlideShell>
  );
}

/* ============================================================================
 * SLIDE 14 — MINIMAL EDITORIAL CONCLUSION
 * ========================================================================== */
export function Slide14Conclusion() {
  const achieved = [
    "Developed an interactive frontend MVP",
    "Implemented pregnancy-stage calculations",
    "Built a bilingual interface (English & മലയാളം)",
    "Created localized pregnancy guidance",
    "Implemented tracking and visualization interfaces",
    "Established the foundation for future backend and AI integration",
  ];

  return (
    <div className="w-[1920px] h-[1080px] bg-[#FAF8F5] text-[#1C1C1E] relative overflow-hidden flex flex-col justify-between select-none">
      <div className="h-[6px] w-full bg-gradient-to-r from-[#8C1D40] via-[#BA0034] to-[#3D7A5A]" />

      {/* Subtle botanical watermark */}
      <svg
        className="absolute left-1/2 -translate-x-1/2 bottom-[-180px] w-[760px] h-[760px] opacity-[0.05] pointer-events-none"
        viewBox="0 0 500 500"
        fill="none"
      >
        <circle cx="250" cy="250" r="220" stroke="#8C1D40" strokeWidth="1.5" />
        <path
          d="M250 60 C330 160, 350 280, 250 440 C150 280, 170 160, 250 60 Z"
          stroke="#3D7A5A"
          strokeWidth="1.5"
        />
      </svg>

      {/* Header */}
      <div className="px-[104px] pt-[46px] flex items-center justify-between relative z-10">
        <span className="text-[14px] font-semibold uppercase tracking-[0.18em] text-[#8C1D40]">
          13 • Conclusion
        </span>
        <span className="px-3.5 py-1 rounded-full bg-white border border-black/[0.08] text-[13px] font-semibold">
          14 / {SLIDE_METADATA.length}
        </span>
      </div>

      {/* Main Content */}
      <div className="px-[104px] relative z-10 my-auto">
        <h1 className="reveal-item font-editorial text-[60px] leading-[1.1] text-[#1C1C1E] max-w-[1300px]">
          Building a more connected pregnancy experience
        </h1>
        <p
          style={{ "--stagger": 1 } as React.CSSProperties}
          className="reveal-item mt-4 text-[24px] leading-[1.45] text-[#4A4A50] max-w-[1320px]"
        >
          Materna brings pregnancy tracking, localized guidance, wellness insights, and maternal safety awareness together in one accessible platform.
        </p>

        {/* Two-column editorial synthesis */}
        <div
          style={{ "--stagger": 2 } as React.CSSProperties}
          className="reveal-item mt-10 grid grid-cols-12 gap-10 items-stretch"
        >
          <div className="col-span-7 bg-white rounded-[28px] border border-black/[0.07] p-8 shadow-sm">
            <div className="text-[13px] font-bold uppercase tracking-[0.16em] text-[#3D7A5A] mb-4">
              What We Have Achieved
            </div>
            <div className="grid grid-cols-2 gap-x-8 gap-y-4">
              {achieved.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 text-[18px] text-[#1C1C1E] font-medium leading-snug"
                >
                  <CheckCircle2 className="w-5 h-5 text-[#3D7A5A] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="col-span-5 bg-[#FCF9FA] rounded-[28px] border border-dashed border-[#7A2848]/45 p-8 flex flex-col justify-between">
            <div>
              <div className="text-[13px] font-bold uppercase tracking-[0.16em] text-[#7A2848] mb-3">
                What Comes Next
              </div>
              <p className="text-[20px] leading-[1.55] text-[#2C2C2E] font-medium">
                Secure data persistence, backend APIs, authentication, intelligent assistance, testing, and deployment.
              </p>
            </div>
            <div className="pt-4 border-t border-[#7A2848]/15 text-[14.5px] text-[#6E6E73]">
              Transitioning from verified frontend MVP to full-stack platform
            </div>
          </div>
        </div>
      </div>

      {/* Closing Lockup */}
      <div className="px-[104px] pb-[58px] relative z-10">
        <div className="border-t border-black/[0.1] pt-7 flex items-end justify-between">
          <div>
            <div className="font-editorial text-[44px] leading-none text-[#1C1C1E]">
              MATERNA<span className="text-[#BA0034]">.</span>
            </div>
            <p className="text-[19px] text-[#525258] mt-2 font-medium">
              Supporting informed, connected, and context-aware maternal wellness.
            </p>
          </div>

          <div className="text-right">
            <div className="font-editorial text-[46px] leading-none text-[#8C1D40]">
              Thank You
            </div>
            <div className="text-[14px] text-[#6E6E73] mt-2 font-medium">
              JAIN (Deemed-to-be University)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
