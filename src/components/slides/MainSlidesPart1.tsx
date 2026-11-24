"use client";

import React, { useState } from "react";
import {
  Activity,
  BookOpen,
  Calendar,
  Compass,
  FileText,
  Globe2,
  HeartPulse,
  MessageSquareHeart,
  NotebookPen,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Stethoscope,
} from "lucide-react";
import {
  CORE_FEATURES,
  MILESTONES_COMPLETED,
  PROBLEM_ITEMS,
  SLIDE_METADATA,
  SOLUTION_PILLARS,
  TEAM_ROSTER,
} from "@/lib/slides/slidesData";
import { SlideShell } from "./SlideShell";
import { ArchitectureDiagram, WorkflowDiagram } from "./DiagramComponents";

/* ============================================================================
 * SLIDE 1 — EDITORIAL COVER
 * ========================================================================== */
export function Slide01Cover() {
  return (
    <div className="w-[1920px] h-[1080px] bg-[#FAF8F5] text-[#1C1C1E] relative overflow-hidden flex flex-col justify-between select-none">
      {/* Top gradient bar */}
      <div className="h-[6px] w-full bg-gradient-to-r from-[#8C1D40] via-[#BA0034] to-[#3D7A5A]" />

      {/* Subtle background botanical/editorial geometry */}
      <svg
        className="absolute right-[-120px] top-[40px] w-[860px] h-[860px] opacity-[0.07] pointer-events-none"
        viewBox="0 0 600 600"
        fill="none"
      >
        <circle cx="300" cy="300" r="260" stroke="#8C1D40" strokeWidth="1.5" />
        <circle
          cx="300"
          cy="300"
          r="190"
          stroke="#3D7A5A"
          strokeWidth="1.2"
          strokeDasharray="6 6"
        />
        <path
          d="M300 70 C380 160, 420 260, 300 520 C180 260, 220 160, 300 70 Z"
          stroke="#8C1D40"
          strokeWidth="1.5"
        />
        <path
          d="M140 300 C220 230, 380 230, 460 300 C380 370, 220 370, 140 300 Z"
          stroke="#3D7A5A"
          strokeWidth="1.5"
        />
      </svg>

      {/* Top Institution Bar */}
      <div className="px-[104px] pt-[54px] flex items-center justify-between relative z-10">
        <div className="flex items-center gap-4">
          <span className="px-4 py-1.5 rounded-full bg-[#8C1D40]/10 text-[#8C1D40] text-[14px] font-bold tracking-[0.14em] uppercase">
            JAIN (Deemed-to-be University)
          </span>
          <span className="text-[#8E8E93] text-[15px]">•</span>
          <span className="text-[16px] font-medium text-[#525258] tracking-wide">
            TDPCL | Assignment 4 – Project Progress Review
          </span>
        </div>

        <div className="flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white border border-black/[0.08] shadow-sm">
          <span className="w-2.5 h-2.5 rounded-full bg-[#3D7A5A]" />
          <span className="text-[14px] font-semibold text-[#2E5E45]">
            Interactive Frontend MVP
          </span>
        </div>
      </div>

      {/* Center Hero Split */}
      <div className="px-[104px] grid grid-cols-12 gap-12 items-center relative z-10 my-auto">
        {/* Left Dominant Typography */}
        <div className="reveal-item col-span-7">
          <div className="inline-flex items-center gap-3 mb-5 px-4 py-1.5 rounded-full bg-white border border-black/[0.06] shadow-sm">
            <span className="text-[14px] font-semibold text-[#8C1D40] tracking-wider uppercase">
              Maternal Wellness Platform
            </span>
            <span className="text-[#C7C7CC]">|</span>
            <span className="font-malayalam text-[15px] font-semibold text-[#3D7A5A]">
              മാതൃആരോഗ്യം
            </span>
          </div>

          <h1 className="font-editorial text-[132px] leading-[0.96] tracking-[-0.02em] text-[#1C1C1E]">
            MATERNA<span className="text-[#BA0034]">.</span>
          </h1>

          <h2 className="mt-6 font-editorial text-[42px] leading-[1.2] text-[#2C2C2E]">
            A Pregnancy Companion for Maternal Wellness
          </h2>

          <p className="mt-5 text-[24px] leading-[1.5] text-[#5C5C62] max-w-[780px] font-normal">
            An AI-assisted, Kerala-focused maternal wellness platform
          </p>

          <div className="mt-9 flex items-center gap-4">
            {[
              "Stage-Specific Guidance",
              "English & മലയാളം",
              "Vitals & Trend Insights",
              "Safety Awareness",
            ].map((pill) => (
              <span
                key={pill}
                className="px-4 py-2 rounded-xl bg-white/90 border border-black/[0.07] text-[15px] font-medium text-[#3A3A3C] shadow-sm"
              >
                {pill}
              </span>
            ))}
          </div>
        </div>

        {/* Right Editorial Product Preview Card */}
        <div
          style={{ "--stagger": 1 } as React.CSSProperties}
          className="reveal-item col-span-5 flex justify-end"
        >
          <div className="w-[560px] bg-white rounded-[34px] border border-black/[0.08] shadow-[0_24px_60px_rgba(28,28,30,0.08)] p-8 relative">
            <div className="flex items-center justify-between pb-5 border-b border-black/[0.06]">
              <div>
                <div className="text-[13px] font-bold uppercase tracking-[0.14em] text-[#8C1D40]">
                  Stage-Aware Companion
                </div>
                <div className="text-[24px] font-bold text-[#1C1C1E] mt-1">
                  Centralized Pregnancy Care
                </div>
              </div>
              <div className="flex items-center bg-[#F2F2F7] p-1 rounded-xl text-[13px] font-semibold">
                <span className="px-3 py-1 rounded-lg bg-white shadow-sm text-[#1C1C1E]">
                  EN
                </span>
                <span className="px-3 py-1 text-[#636366] font-malayalam">
                  മലയാളം
                </span>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div className="p-4 rounded-2xl bg-[#FAF6F7] border border-[#8C1D40]/15 flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#8C1D40] text-white flex items-center justify-center shrink-0">
                  <Compass className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-[17px] font-bold text-[#1C1C1E]">
                    Gestational Progress & Guide
                  </div>
                  <div className="text-[14.5px] text-[#5C5C62]">
                    Weeks 4–40 timeline, trimester milestones & Kerala nutrition
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#F3F8F5] border border-[#3D7A5A]/20 flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#3D7A5A] text-white flex items-center justify-center shrink-0">
                  <Activity className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-[17px] font-bold text-[#1C1C1E]">
                    Wellness & Vitals Tracking
                  </div>
                  <div className="text-[14.5px] text-[#5C5C62]">
                    Blood pressure, weight, fasting glucose & symptom charts
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#FDF5F3] border border-[#B43E28]/20 flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#B43E28] text-white flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-[17px] font-bold text-[#1C1C1E]">
                    Maternal Safety & Ask ASHA
                  </div>
                  <div className="text-[14.5px] text-[#5C5C62]">
                    Red-flag warning awareness, 108 emergency links & Q&A UI
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-black/[0.06] flex items-center justify-between text-[13.5px] text-[#6E6E73]">
              <span>Informational maternal wellness companion</span>
              <span className="font-semibold text-[#1C1C1E]">
                Slide 01 / {SLIDE_METADATA.length}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Team Roster Strip */}
      <div
        style={{ "--stagger": 2 } as React.CSSProperties}
        className="reveal-item px-[104px] pb-[52px] relative z-10"
      >
        <div className="border-t border-black/[0.1] pt-6">
          <div className="flex items-center justify-between mb-3.5">
            <span className="text-[12.5px] font-bold uppercase tracking-[0.18em] text-[#8C1D40]">
              Interdisciplinary Project Team
            </span>
            <span className="text-[13.5px] font-medium text-[#6E6E73]">
              TDPCL | Assignment 4 – Project Progress Review • JAIN (Deemed-to-be University)
            </span>
          </div>
          <div className="grid grid-cols-5 gap-5">
            {TEAM_ROSTER.map((member) => (
              <div
                key={member.name}
                className="bg-white/85 rounded-2xl border border-black/[0.06] px-4 py-3 shadow-[0_2px_8px_rgba(0,0,0,0.02)]"
              >
                <div className="text-[16.5px] font-bold text-[#1C1C1E] truncate">
                  {member.name}
                </div>
                <div className="text-[13.5px] font-medium text-[#6E6E73] mt-0.5">
                  {member.degree}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
 * SLIDE 2 — PROBLEM STATEMENT (FRAGMENTATION INFOGRAPHIC + EDITORIAL LIST)
 * ========================================================================== */
export function Slide02Problem() {
  const scatteredArtifacts = [
    {
      icon: FileText,
      label: "Lab Reports & Scans",
      sub: "Paper folders & PDFs",
      pos: "top-6 left-6 -rotate-3",
      tint: "bg-white border-[#8C1D40]/20",
    },
    {
      icon: Stethoscope,
      label: "Prescriptions",
      sub: "Separate clinic slips",
      pos: "top-8 right-6 rotate-2",
      tint: "bg-white border-[#7A2848]/20",
    },
    {
      icon: NotebookPen,
      label: "Daily Symptoms",
      sub: "Unrecorded between visits",
      pos: "top-[168px] left-12 rotate-1",
      tint: "bg-white border-[#B43E28]/20",
    },
    {
      icon: Calendar,
      label: "Checkup Dates",
      sub: "Scattered reminders",
      pos: "top-[172px] right-10 -rotate-2",
      tint: "bg-white border-[#3D7A5A]/25",
    },
    {
      icon: Globe2,
      label: "Generic Web Articles",
      sub: "Lacks Kerala & മലയാളം context",
      pos: "top-[322px] left-1/2 -translate-x-1/2 rotate-1",
      tint: "bg-white border-black/15",
    },
  ];

  return (
    <SlideShell
      slideNumber={2}
      kicker="01 • Problem Statement"
      headline="Pregnancy care information is fragmented and difficult to manage."
    >
      <div className="flex-1 grid grid-cols-12 gap-10 items-stretch min-h-0">
        {/* Left: Editorial Fragmentation Infographic */}
        <div className="reveal-item col-span-5 bg-[#F2EEE9] rounded-[30px] border border-black/[0.07] p-8 flex flex-col justify-between relative overflow-hidden">
          <div>
            <div className="text-[13px] font-bold uppercase tracking-[0.16em] text-[#7A2848]">
              Disconnected Everyday Reality
            </div>
            <div className="text-[20px] font-semibold text-[#3A3A3C] mt-1">
              Information spread across unlinked sources
            </div>
          </div>

          {/* Scattered Nodes Canvas */}
          <div className="relative h-[440px] my-2">
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 600 440"
              fill="none"
            >
              <path
                d="M150 75 C 290 130, 320 60, 450 85"
                stroke="#8C1D40"
                strokeOpacity="0.3"
                strokeWidth="2"
                strokeDasharray="6 6"
              />
              <path
                d="M160 220 C 260 260, 350 180, 440 225"
                stroke="#8C1D40"
                strokeOpacity="0.3"
                strokeWidth="2"
                strokeDasharray="6 6"
              />
              <path
                d="M165 95 L 300 355 L 445 95"
                stroke="#6E6E73"
                strokeOpacity="0.28"
                strokeWidth="1.8"
                strokeDasharray="5 5"
              />
              <path
                d="M175 230 L 300 355 L 430 230"
                stroke="#6E6E73"
                strokeOpacity="0.28"
                strokeWidth="1.8"
                strokeDasharray="5 5"
              />
            </svg>

            {scatteredArtifacts.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.label}
                  className={`absolute ${card.pos} ${card.tint} w-[255px] rounded-2xl border p-4 shadow-[0_8px_24px_rgba(0,0,0,0.05)]`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#FAF5F6] text-[#8C1D40] flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[16px] font-bold text-[#1C1C1E] leading-snug">
                        {card.label}
                      </div>
                      <div className="text-[13.5px] text-[#6E6E73]">{card.sub}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Key Takeaway Callout */}
          <div className="bg-[#8C1D40] text-white rounded-[22px] p-6 shadow-md">
            <div className="text-[12.5px] font-bold uppercase tracking-[0.18em] text-white/80 mb-1.5">
              Key Takeaway • The Need
            </div>
            <p className="text-[20px] leading-[1.4] font-semibold">
              A need exists for a centralized, accessible, and context-aware maternal wellness platform.
            </p>
          </div>
        </div>

        {/* Right: Structured 5-Point Editorial Breakdown */}
        <div
          style={{ "--stagger": 1 } as React.CSSProperties}
          className="reveal-item col-span-7 bg-white rounded-[30px] border border-black/[0.07] px-10 py-7 flex flex-col justify-between shadow-[0_6px_24px_rgba(0,0,0,0.03)]"
        >
          {PROBLEM_ITEMS.map((item, idx) => (
            <div
              key={item.title}
              className={`flex items-start gap-6 py-4 ${
                idx < PROBLEM_ITEMS.length - 1 ? "border-b border-black/[0.07]" : ""
              }`}
            >
              <div className="w-12 h-12 rounded-2xl bg-[#FAF4F6] border border-[#8C1D40]/15 text-[#8C1D40] font-editorial text-[24px] flex items-center justify-center shrink-0 mt-0.5">
                0{idx + 1}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-[23px] font-bold text-[#1C1C1E] tracking-tight">
                    {item.title}
                  </h3>
                  <span className="px-3 py-1 rounded-full bg-[#F5F3F0] text-[#636366] text-[13px] font-semibold shrink-0">
                    {item.tag}
                  </span>
                </div>
                <p className="mt-1.5 text-[18px] leading-[1.45] text-[#525258]">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SlideShell>
  );
}

/* ============================================================================
 * SLIDE 3 — PROPOSED SOLUTION (CENTRAL HUB HERO + LIVE EN/ML PREVIEW)
 * ========================================================================== */
const SOLUTION_PILLARS_ML = [
  "ഗർഭകാല പുരോഗതിയും ആരോഗ്യ വിവരങ്ങളും ഒരിടത്ത്",
  "ആഴ്ചതോറുമുള്ള വ്യക്തിഗത ഗർഭകാല മാർഗ്ഗനിർദ്ദേശങ്ങൾ",
  "ഇംഗ്ലീഷ്, മലയാളം ഭാഷാ സൗകര്യം",
  "കേരളീയ പോഷകാഹാര-ആരോഗ്യ ശീലങ്ങൾക്കനുയോജ്യമായ വിവരങ്ങൾ",
  "ബി.പി, ഭാരം, ലക്ഷണങ്ങൾ എന്നിവയുടെ ഗ്രാഫ് അധിഷ്ഠിത ട്രാക്കിംഗ്",
  "അപകടസൂചനാ അവബോധവും അടിയന്തര സഹായ വിവരങ്ങളും",
  "ആശാ സഹായം (Ask ASHA) — സുരക്ഷാധിഷ്ഠിത വിവര സഹായി",
];

export function Slide03Solution() {
  const [lang, setLang] = useState<"en" | "ml">("en");
  const activePillars = lang === "ml" ? SOLUTION_PILLARS_ML : SOLUTION_PILLARS;
  const leftPillars = activePillars.slice(0, 4);
  const rightPillars = activePillars.slice(4, 7);

  return (
    <SlideShell
      slideNumber={3}
      kicker="02 • Proposed Solution"
      headline="Introducing Materna"
      subheadline="Materna is a digital pregnancy companion designed to centralize maternal wellness information, pregnancy tracking, and stage-specific guidance in a single accessible platform."
    >
      <div className="flex-1 flex flex-col justify-between min-h-0">
        {/* Central Hub Diagram */}
        <div className="flex-1 grid grid-cols-12 gap-8 items-center my-2">
          {/* Left 4 Pillars */}
          <div className="reveal-item col-span-4 space-y-4">
            {leftPillars.map((pillar, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-black/[0.07] px-6 py-5 shadow-sm flex items-center justify-between gap-4 transition-all"
              >
                <div className="flex items-center gap-4">
                  <span className="w-8 h-8 rounded-full bg-[#8C1D40]/10 text-[#8C1D40] text-[14px] font-bold flex items-center justify-center shrink-0">
                    0{i + 1}
                  </span>
                  <span
                    className={`text-[18px] font-semibold text-[#1C1C1E] leading-snug ${
                      lang === "ml" ? "font-malayalam" : ""
                    }`}
                  >
                    {pillar}
                  </span>
                </div>
                <span className="w-3 h-[2px] bg-[#8C1D40]/40 shrink-0" />
              </div>
            ))}
          </div>

          {/* Center Product Hub with Breathing Halo & Bilingual Toggle */}
          <div
            style={{ "--stagger": 1 } as React.CSSProperties}
            className="reveal-item col-span-4 flex flex-col items-center justify-center relative"
          >
            <div className="hub-breathe absolute w-[458px] h-[458px] rounded-full border border-[#8C1D40]/20 pointer-events-none" />
            <div className="w-[430px] h-[430px] rounded-full bg-gradient-to-b from-white to-[#F7F1F3] border-2 border-[#8C1D40]/25 shadow-[0_20px_50px_rgba(140,29,64,0.10)] flex flex-col items-center justify-center text-center p-10 relative z-10">
              <div className="absolute inset-4 rounded-full border border-dashed border-[#8C1D40]/20 pointer-events-none" />
              <div className="w-16 h-16 rounded-2xl bg-[#8C1D40] text-white flex items-center justify-center mb-4 shadow-md">
                <HeartPulse className="w-8 h-8" />
              </div>
              <div className="font-editorial text-[52px] leading-none text-[#1C1C1E]">
                Materna
              </div>
              <div className="font-malayalam text-[22px] font-semibold text-[#3D7A5A] mt-2">
                മാതൃആരോഗ്യം • കേരളം
              </div>
              <p
                className={`mt-4 text-[16px] leading-[1.45] text-[#525258] max-w-[305px] ${
                  lang === "ml" ? "font-malayalam" : ""
                }`}
              >
                {lang === "ml"
                  ? "ഗർഭകാല മാർഗ്ഗനിർദ്ദേശങ്ങളും വൈറ്റൽസ് ട്രാക്കിംഗും സുരക്ഷാ വിവരങ്ങളും ഒരൊറ്റ പ്ലാറ്റ്‌ഫോമിൽ."
                  : "One calm, organized companion connecting stage guidance, vitals, and maternal safety."}
              </p>

              {/* Interactive Bilingual Switcher */}
              <div className="mt-5 inline-flex items-center bg-[#EFECE8] p-1 rounded-full border border-black/[0.06]">
                <button
                  type="button"
                  onClick={() => setLang("en")}
                  className={`px-4 py-1 rounded-full text-[13px] font-bold transition-all ${
                    lang === "en"
                      ? "bg-[#8C1D40] text-white shadow-sm"
                      : "text-[#525258] hover:text-[#1C1C1E]"
                  }`}
                >
                  English
                </button>
                <button
                  type="button"
                  onClick={() => setLang("ml")}
                  className={`px-4 py-1 rounded-full text-[13px] font-bold font-malayalam transition-all ${
                    lang === "ml"
                      ? "bg-[#3D7A5A] text-white shadow-sm"
                      : "text-[#525258] hover:text-[#1C1C1E]"
                  }`}
                >
                  മലയാളം
                </button>
              </div>
            </div>
          </div>

          {/* Right 3 Pillars + Cultural Context Card */}
          <div
            style={{ "--stagger": 2 } as React.CSSProperties}
            className="reveal-item col-span-4 space-y-4"
          >
            {rightPillars.map((pillar, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-black/[0.07] px-6 py-5 shadow-sm flex items-center gap-4 transition-all"
              >
                <span className="w-3 h-[2px] bg-[#3D7A5A]/50 shrink-0" />
                <span className="w-8 h-8 rounded-full bg-[#3D7A5A]/12 text-[#28543D] text-[14px] font-bold flex items-center justify-center shrink-0">
                  0{i + 5}
                </span>
                <span
                  className={`text-[18px] font-semibold text-[#1C1C1E] leading-snug ${
                    lang === "ml" ? "font-malayalam" : ""
                  }`}
                >
                  {pillar}
                </span>
              </div>
            ))}

            <div className="bg-[#F2F7F4] rounded-2xl border border-[#3D7A5A]/30 px-6 py-5">
              <div className="text-[12.5px] font-bold uppercase tracking-[0.14em] text-[#28543D]">
                Our Core Goal
              </div>
              <div className="text-[18.5px] font-semibold text-[#1C1C1E] mt-1 leading-snug">
                Making pregnancy-related information more accessible, organized, and understandable.
              </div>
            </div>
          </div>
        </div>

        {/* Medical Safety Footer */}
        <div className="bg-white rounded-[20px] border border-black/[0.08] px-8 py-4 flex items-center justify-between shadow-sm shrink-0">
          <div className="flex items-center gap-3.5">
            <ShieldAlert className="w-6 h-6 text-[#8C1D40] shrink-0" />
            <span className="text-[18px] font-semibold text-[#1C1C1E]">
              Materna is an informational wellness platform and does not replace professional medical care.
            </span>
          </div>
          <span className="text-[14px] font-semibold uppercase tracking-wider text-[#6E6E73]">
            Non-Diagnostic Wellness Scope
          </span>
        </div>
      </div>
    </SlideShell>
  );
}

/* ============================================================================
 * SLIDE 4 — CORE FEATURES (2x2 GRID + ASK ASHA + LIVE BILINGUAL PREVIEW)
 * ========================================================================== */
const FEATURE_ICONS = [Compass, BookOpen, Activity, ShieldAlert];

const CORE_FEATURES_ML_DESC = [
  "ഗർഭകാല ടൈംലൈൻ, ആഴ്ച, ത്രൈമാസം, പ്രസവ തീയതി (EDD), വ്യക്തിഗത പുരോഗതി എന്നിവ.",
  "ആഴ്ച 4 മുതൽ 40 വരെയുള്ള വളർച്ച, ശാരീരിക മാറ്റങ്ങൾ, കേരളീയ പോഷകാഹാരം, സ്കാൻ വിവരങ്ങൾ.",
  "ലക്ഷണങ്ങൾ, രക്തസമ്മർദ്ദം (BP), ഭാരം, ആരോഗ്യ രേഖകൾ, ഗ്രാഫ് ട്രെൻഡുകൾ.",
  "അപകടസൂചനാ അവബോധം, സുരക്ഷാ മാർഗ്ഗനിർദ്ദേശങ്ങൾ, 108 അടിയന്തര സഹായ നമ്പറുകൾ.",
];

export function Slide04Features() {
  const [lang, setLang] = useState<"en" | "ml">("en");

  return (
    <SlideShell
      slideNumber={4}
      kicker="03 • Core Product Experience"
      headline="Four connected experiences for maternal wellness"
      variant="cool"
    >
      <div className="flex-1 flex flex-col justify-between gap-6 min-h-0 relative">
        {/* Interactive Bilingual Pill in top-right aligned with headline */}
        <div className="no-print absolute -top-[76px] right-0 flex items-center gap-2 bg-white px-2.5 py-1.5 rounded-2xl border border-black/[0.08] shadow-sm">
          <span className="text-[12px] font-semibold text-[#6E6E73] px-1">
            Preview UI Language:
          </span>
          <button
            type="button"
            onClick={() => setLang("en")}
            className={`px-3 py-1 rounded-xl text-[12.5px] font-bold transition-all ${
              lang === "en"
                ? "bg-[#1C1C1E] text-white"
                : "text-[#525258] hover:text-[#1C1C1E]"
            }`}
          >
            EN
          </button>
          <button
            type="button"
            onClick={() => setLang("ml")}
            className={`px-3 py-1 rounded-xl text-[12.5px] font-bold font-malayalam transition-all ${
              lang === "ml"
                ? "bg-[#8C1D40] text-white"
                : "text-[#525258] hover:text-[#1C1C1E]"
            }`}
          >
            മലയാളം
          </button>
        </div>

        {/* 2x2 Connected Experience Grid */}
        <div className="flex-1 grid grid-cols-2 gap-6 min-h-0">
          {CORE_FEATURES.map((feat, idx) => {
            const Icon = FEATURE_ICONS[idx];
            return (
              <div
                key={feat.code}
                style={{ "--stagger": idx } as React.CSSProperties}
                className="reveal-item bg-white rounded-[28px] border border-black/[0.07] p-8 shadow-[0_6px_24px_rgba(0,0,0,0.03)] flex flex-col justify-between"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center"
                      style={{ backgroundColor: feat.bgTint, color: feat.accent }}
                    >
                      <Icon className="w-7 h-7" />
                    </div>
                    <div>
                      <div
                        className="text-[13px] font-extrabold tracking-[0.18em] uppercase"
                        style={{ color: feat.accent }}
                      >
                        {feat.code} — {feat.name}
                      </div>
                      <div className="text-[28px] font-bold text-[#1C1C1E] tracking-tight flex items-baseline gap-3 mt-0.5">
                        <span>{lang === "ml" ? feat.nameMl : feat.name}</span>
                        <span className="font-malayalam text-[18px] font-medium text-[#6E6E73]">
                          {lang === "ml" ? feat.name : feat.nameMl}
                        </span>
                      </div>
                    </div>
                  </div>

                  <span className="px-3 py-1 rounded-full bg-[#F2F2F7] text-[#3A3A3C] text-[13px] font-semibold">
                    Implemented Tab
                  </span>
                </div>

                <p
                  className={`text-[20px] leading-[1.45] text-[#3A3A3C] my-3 ${
                    lang === "ml" ? "font-malayalam" : ""
                  }`}
                >
                  {lang === "ml" ? CORE_FEATURES_ML_DESC[idx] : feat.description}
                </p>

                <div className="flex items-center gap-2.5 pt-3 border-t border-black/[0.06]">
                  {feat.highlights.map((tag) => (
                    <span
                      key={tag}
                      className="px-3.5 py-1.5 rounded-xl text-[14px] font-semibold"
                      style={{ backgroundColor: feat.bgTint, color: feat.accent }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Ask ASHA Featured Strip */}
        <div
          style={{ "--stagger": 4 } as React.CSSProperties}
          className="reveal-item bg-gradient-to-r from-[#8C1D40] to-[#6D1936] text-white rounded-[26px] px-9 py-6 flex items-center justify-between shadow-md shrink-0"
        >
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center shrink-0">
              <MessageSquareHeart className="w-7 h-7 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <span className="text-[22px] font-bold tracking-tight">
                  Ask ASHA
                </span>
                <span className="px-3 py-0.5 rounded-full bg-white/20 text-white text-[12.5px] font-bold uppercase tracking-wider">
                  Demo Educational Assistant UI
                </span>
              </div>
              <p
                className={`text-[18.5px] text-white/90 mt-1 ${
                  lang === "ml" ? "font-malayalam" : ""
                }`}
              >
                {lang === "ml"
                  ? "ഗർഭകാല സംശയങ്ങൾക്ക് സുരക്ഷാധിഷ്ഠിതമായി വിവരങ്ങൾ നൽകുന്ന എജ്യുക്കേഷണൽ അസിസ്റ്റന്റ് ഇന്റർഫേസ്."
                  : "An educational assistant interface designed to provide pregnancy-related informational support with safety-focused responses."}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/12 border border-white/20 text-[14px] font-semibold shrink-0">
            <Sparkles className="w-4 h-4" />
            <span>Red-Flag Keyword Interception</span>
          </div>
        </div>
      </div>
    </SlideShell>
  );
}

/* ============================================================================
 * SLIDE 5 — SYSTEM WORKFLOW
 * ========================================================================== */
export function Slide05Workflow() {
  return (
    <SlideShell
      slideNumber={5}
      kicker="04 • System Workflow"
      headline="From pregnancy profile to personalized guidance"
    >
      <WorkflowDiagram />
    </SlideShell>
  );
}

/* ============================================================================
 * SLIDE 6 — SYSTEM ARCHITECTURE
 * ========================================================================== */
export function Slide06Architecture() {
  return (
    <SlideShell
      slideNumber={6}
      kicker="05 • System Architecture"
      headline="A frontend MVP with a planned full-stack architecture"
      variant="editorial"
    >
      <ArchitectureDiagram />
    </SlideShell>
  );
}

/* ============================================================================
 * SLIDE 7 — DEVELOPMENT MILESTONES COMPLETED
 * ========================================================================== */
export function Slide07Milestones() {
  return (
    <SlideShell
      slideNumber={7}
      kicker="06 • Development Progress"
      headline="From concept to interactive frontend MVP"
      subheadline="Progressive engineering stages completed in the current frontend milestone cycle."
    >
      <div className="flex-1 flex flex-col justify-between min-h-0">
        <div className="flex-1 flex flex-col justify-center">
          {/* Timeline Track */}
          <div className="relative mb-8 px-6">
            <div className="h-[4px] bg-gradient-to-r from-[#8C1D40] via-[#6B4E57] to-[#3D7A5A] rounded-full w-full" />
            <div className="grid grid-cols-4 gap-7 -mt-[18px]">
              {MILESTONES_COMPLETED.map((ms, idx) => (
                <div key={ms.code} className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-full border-4 border-[#FAF8F5] text-white text-[14px] font-bold flex items-center justify-center shadow ${
                      idx === 3 ? "bg-[#3D7A5A]" : "bg-[#8C1D40]"
                    }`}
                  >
                    0{idx + 1}
                  </div>
                  <span className="px-3 py-1 rounded-full bg-white border border-black/[0.08] text-[12.5px] font-bold tracking-wider uppercase text-[#3A3A3C] shadow-sm">
                    {ms.code}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 4 Milestone Cards */}
          <div className="grid grid-cols-4 gap-7 items-stretch">
            {MILESTONES_COMPLETED.map((ms, idx) => {
              const isLast = idx === 3;
              return (
                <div
                  key={ms.code}
                  style={{ "--stagger": idx } as React.CSSProperties}
                  className={`reveal-item rounded-[26px] p-8 flex flex-col justify-between shadow-[0_8px_28px_rgba(0,0,0,0.03)] border ${
                    isLast
                      ? "bg-[#F2F8F5] border-[#3D7A5A]/40"
                      : "bg-white border-black/[0.07]"
                  }`}
                >
                  <div>
                    <div
                      className={`text-[13px] font-extrabold uppercase tracking-[0.16em] ${
                        isLast ? "text-[#28543D]" : "text-[#8C1D40]"
                      }`}
                    >
                      Stage 0{idx + 1} • Completed
                    </div>
                    <h3 className="text-[27px] font-bold text-[#1C1C1E] tracking-tight mt-2">
                      {ms.title}
                    </h3>
                    <p className="text-[16.5px] text-[#5C5C62] mt-2 pb-5 border-b border-black/[0.07] leading-snug">
                      {ms.summary}
                    </p>

                    <ul className="mt-5 space-y-3.5">
                      {ms.items.map((point) => (
                        <li
                          key={point}
                          className="flex items-start gap-3 text-[17.5px] leading-[1.4] text-[#2C2C2E] font-medium"
                        >
                          <span
                            className={`w-2 h-2 rounded-full mt-2 shrink-0 ${
                              isLast ? "bg-[#3D7A5A]" : "bg-[#8C1D40]"
                            }`}
                          />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 pt-4 border-t border-black/[0.06] flex items-center justify-between text-[13.5px] font-semibold text-[#525258]">
                    <span>Frontend MVP Scope</span>
                    <span className={isLast ? "text-[#28543D]" : "text-[#8C1D40]"}>
                      Implemented ✓
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-[20px] border border-black/[0.07] px-8 py-4 flex items-center justify-between text-[16.5px] shrink-0">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-[#3D7A5A]" />
            <span className="font-semibold text-[#1C1C1E]">
              Build Verification:
            </span>
            <span className="text-[#525258]">
              Next.js 15 production build and strict TypeScript type-checking verified across all client modules.
            </span>
          </div>
          <span className="text-[14px] text-[#6E6E73] font-medium">
            Functional Milestone Progression
          </span>
        </div>
      </div>
    </SlideShell>
  );
}
