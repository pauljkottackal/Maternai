"use client";

import React, { useState, useRef, useEffect } from "react";
import { useMaterna } from "@/lib/store";
import {
  getWeekGuideContent,
  KERALA_MYTHS_FACTS,
  KERALA_SUPERFOODS,
} from "@/lib/keralaContent";

type GuideCategory =
  | "all"
  | "baby"
  | "maternal"
  | "nutrition"
  | "myths"
  | "scans";

// All weeks 4..40 selectable
const SELECTABLE_WEEKS = Array.from({ length: 37 }, (_, i) => i + 4);

export function GuideScreen() {
  const {
    stats,
    language,
    selectedGuideWeek,
    setSelectedGuideWeek,
  } = useMaterna();

  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<GuideCategory>("all");
  const [showAllTrimesterFoods, setShowAllTrimesterFoods] = useState(false);
  const scrollerRef = useRef<HTMLDivElement>(null);

  const isMl = language === "ml";
  const weekData = getWeekGuideContent(selectedGuideWeek);

  // Ensure current week (even if 1..3) is included in selector list
  const weekPills = Array.from(
    new Set([...SELECTABLE_WEEKS, stats.currentWeek, selectedGuideWeek])
  ).sort((a, b) => a - b);

  // Auto-scroll active week pill into view
  useEffect(() => {
    const container = scrollerRef.current;
    if (!container) return;
    const activeEl = container.querySelector(
      `[data-week="${selectedGuideWeek}"]`
    ) as HTMLElement | null;
    if (activeEl) {
      const scrollLeft =
        activeEl.offsetLeft -
        container.clientWidth / 2 +
        activeEl.clientWidth / 2;
      container.scrollTo({ left: Math.max(0, scrollLeft), behavior: "smooth" });
    }
  }, [selectedGuideWeek]);

  const q = searchQuery.trim().toLowerCase();

  const matchesText = (...texts: string[]) => {
    if (!q) return true;
    return texts.some((t) => t.toLowerCase().includes(q));
  };

  const filteredSuperfoods = KERALA_SUPERFOODS.filter((food) => {
    const matchesTrimester =
      showAllTrimesterFoods ||
      Boolean(q) ||
      food.trimester === "All" ||
      food.trimester === String(weekData.trimester);
    return (
      matchesTrimester &&
      matchesText(
        food.nameEn,
        food.nameMl,
        food.descEn,
        food.descMl,
        food.badge1En,
        food.badge1Ml,
        food.badge2En,
        food.badge2Ml
      )
    );
  });

  const filteredMyths = KERALA_MYTHS_FACTS.filter((m) =>
    matchesText(m.mythEn, m.mythMl, m.factEn, m.factMl)
  );

  const showBabyCard =
    (activeCategory === "all" || activeCategory === "baby") &&
    matchesText(
      "Baby Growth",
      weekData.babyGrowth.subtitleEn,
      weekData.babyGrowth.subtitleMl,
      ...weekData.babyGrowth.points.map(
        (p) => `${p.titleEn} ${p.titleMl} ${p.descEn} ${p.descMl}`
      )
    );

  const showMaternalCard =
    (activeCategory === "all" || activeCategory === "maternal") &&
    matchesText(
      "Maternal Changes Safe Activities yoga",
      weekData.maternalChanges.subtitleEn,
      weekData.maternalChanges.subtitleMl,
      ...weekData.maternalChanges.points.map(
        (p) => `${p.titleEn} ${p.titleMl} ${p.descEn} ${p.descMl}`
      ),
      ...weekData.safeActivities.points.map(
        (p) => `${p.titleEn} ${p.titleMl} ${p.descEn} ${p.descMl}`
      )
    );

  const showScansCard =
    (activeCategory === "all" || activeCategory === "scans") &&
    matchesText(
      "Routine Scans & Tests OGTT Anomaly NT",
      weekData.scansAndTests.subtitleEn,
      weekData.scansAndTests.subtitleMl,
      ...weekData.scansAndTests.points.map(
        (p) => `${p.titleEn} ${p.titleMl} ${p.descEn} ${p.descMl}`
      )
    );

  const showNutritionSection =
    (activeCategory === "all" || activeCategory === "nutrition") &&
    filteredSuperfoods.length > 0;

  const showMythsSection =
    (activeCategory === "all" || activeCategory === "myths") &&
    filteredMyths.length > 0;

  const trimesterLabel =
    weekData.trimester === 1
      ? isMl
        ? "ഒന്നാം ത്രൈമാസം (ആഴ്ച 1–12)"
        : "Trimester 1 (Weeks 1–12)"
      : weekData.trimester === 2
      ? isMl
        ? "രണ്ടാം ത്രൈമാസം (ആഴ്ച 13–27)"
        : "Trimester 2 (Weeks 13–27)"
      : isMl
      ? "മൂന്നാം ത്രൈമാസം (ആഴ്ച 28–40)"
      : "Trimester 3 (Weeks 28–40)";

  return (
    <main className="flex flex-col relative w-full pt-14 pb-28 min-h-screen max-w-lg mx-auto">
      <div className="flex flex-col w-full">
        {/* iOS Date / Week Horizontal Fitness Strip */}
        <section className="w-full pt-3 pb-3 bg-white/85 backdrop-blur-md border-b border-black/[0.05] sticky top-14 z-40 px-4">
          {/* Status Row */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#E5F2FF] text-[#007AFF] text-[12px] font-semibold tracking-tight">
                <span className="w-1.5 h-1.5 rounded-full bg-[#007AFF] animate-ping" />
                {trimesterLabel}
              </span>
              <span className="text-[#8E8E93] text-[12px] font-medium">
                {isMl
                  ? `ദിവസം ${selectedGuideWeek * 7} / 280`
                  : `Day ${selectedGuideWeek * 7} of 280`}
              </span>
            </div>
            <span className="text-[13px] text-[#FF2D55] font-semibold tracking-tight">
              {isMl
                ? `${Math.max(0, 40 - selectedGuideWeek)} ആഴ്ച ബാക്കി`
                : `${Math.max(0, 40 - selectedGuideWeek)} Wks Left`}
            </span>
          </div>

          {/* Quick Trimester Jump & Stepper Bar */}
          <div className="flex items-center justify-between gap-1.5 mb-2">
            <div className="flex items-center gap-1">
              {(
                [
                  {
                    tri: 1,
                    targetWk: 8,
                    labelEn: "Tri 1 (W4–12)",
                    labelMl: "ത്രൈമാസം 1 (W4–12)",
                  },
                  {
                    tri: 2,
                    targetWk: 20,
                    labelEn: "Tri 2 (W13–27)",
                    labelMl: "ത്രൈമാസം 2 (W13–27)",
                  },
                  {
                    tri: 3,
                    targetWk: 32,
                    labelEn: "Tri 3 (W28–40)",
                    labelMl: "ത്രൈമാസം 3 (W28–40)",
                  },
                ] as const
              ).map((t) => {
                const isActiveTri = weekData.trimester === t.tri;
                return (
                  <button
                    key={t.tri}
                    type="button"
                    onClick={() =>
                      setSelectedGuideWeek(
                        stats.trimester === t.tri
                          ? stats.currentWeek
                          : t.targetWk
                      )
                    }
                    className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition-all ${
                      isActiveTri
                        ? "bg-[#1C1C1E] text-white"
                        : "bg-[#F2F2F7] text-[#636366] hover:bg-[#E5E5EA]"
                    }`}
                  >
                    {isMl ? t.labelMl : t.labelEn}
                  </button>
                );
              })}
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                disabled={selectedGuideWeek <= 4}
                onClick={() =>
                  setSelectedGuideWeek(Math.max(4, selectedGuideWeek - 1))
                }
                aria-label={isMl ? "മുൻ ആഴ്ച" : "Previous Week"}
                className="w-7 h-7 rounded-full bg-[#F2F2F7] hover:bg-[#E5E5EA] disabled:opacity-40 text-[#1C1C1E] flex items-center justify-center text-[13px] font-bold"
              >
                ←
              </button>
              <button
                type="button"
                disabled={selectedGuideWeek >= 40}
                onClick={() =>
                  setSelectedGuideWeek(Math.min(40, selectedGuideWeek + 1))
                }
                aria-label={isMl ? "അടുത്ത ആഴ്ച" : "Next Week"}
                className="w-7 h-7 rounded-full bg-[#F2F2F7] hover:bg-[#E5E5EA] disabled:opacity-40 text-[#1C1C1E] flex items-center justify-center text-[13px] font-bold"
              >
                →
              </button>
            </div>
          </div>

          {/* Horizontal iOS Week Scroll (All Weeks 4..40) */}
          <div className="relative w-full">
            <div
              ref={scrollerRef}
              className="flex gap-2 overflow-x-auto py-0.5 no-scrollbar scroll-smooth"
            >
              {weekPills.map((wk) => {
                const isSelected = wk === selectedGuideWeek;
                const isUserCurrent = wk === stats.currentWeek;
                return (
                  <button
                    key={wk}
                    data-week={wk}
                    onClick={() => setSelectedGuideWeek(wk)}
                    type="button"
                    className={`flex flex-col items-center justify-center rounded-2xl transition-all active:scale-95 ${
                      isSelected
                        ? "min-w-[56px] h-[60px] bg-[#FF2D55] text-white shadow-[0_4px_14px_rgba(255,45,85,0.35)] ring-2 ring-[#FF2D55]/30"
                        : isUserCurrent
                        ? "min-w-[50px] h-[60px] bg-[#FFF0F4] text-[#FF2D55] border border-[#FF2D55]/30"
                        : "min-w-[48px] h-[60px] bg-[#F2F2F7] text-black border border-black/[0.04] hover:bg-[#E5E5EA]"
                    }`}
                  >
                    <span
                      className={`text-[9.5px] font-bold uppercase tracking-wider ${
                        isSelected
                          ? "text-white/90"
                          : isUserCurrent
                          ? "text-[#FF2D55]"
                          : "text-[#8E8E93]"
                      }`}
                    >
                      {isSelected
                        ? isUserCurrent
                          ? isMl
                            ? "നിലവിൽ"
                            : "Current"
                          : isMl
                          ? "കാണുന്നു"
                          : "Viewing"
                        : isMl
                        ? "ആഴ്ച"
                        : "Wk"}
                    </span>
                    <span
                      className={`font-extrabold leading-tight mt-0.5 ${
                        isSelected
                          ? "text-[19px] text-white"
                          : isUserCurrent
                          ? "text-[17px] text-[#FF2D55]"
                          : "text-[16px] text-black"
                      }`}
                    >
                      {wk}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Main Grouped iOS Content Container */}
        <div className="px-4 py-4 flex flex-col gap-4">
          {/* Search & Category Filter Bar */}
          <div className="flex flex-col gap-2.5">
            <div className="relative flex items-center">
              <span className="material-symbols-outlined text-[#8E8E93] text-[19px] absolute left-3.5 pointer-events-none">
                search
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  isMl
                    ? "പോഷകാഹാരം, വളർച്ച, പരിശോധനകൾ, സംശയങ്ങൾ തിരയുക..."
                    : "Search weekly insights, Ragi, Muringayila, OGTT, myths..."
                }
                className="w-full bg-white rounded-2xl pl-10 pr-9 py-2.5 text-[13.5px] text-[#1C1C1E] placeholder-[#8E8E93] shadow-[0_1px_3px_rgba(0,0,0,0.03)] border border-black/[0.05] focus:outline-none focus:ring-2 focus:ring-[#FF2D55]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 text-[#8E8E93] hover:text-black"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    cancel
                  </span>
                </button>
              )}
            </div>

            {/* Category Filter Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
              {(
                [
                  { id: "all", labelEn: "All Guide", labelMl: "എല്ലാം" },
                  { id: "baby", labelEn: "Baby Growth", labelMl: "കുഞ്ഞിന്റെ വളർച്ച" },
                  {
                    id: "maternal",
                    labelEn: "Maternal & Yoga",
                    labelMl: "അമ്മയുടെ മാറ്റങ്ങൾ",
                  },
                  {
                    id: "nutrition",
                    labelEn: "Kerala Nutrition",
                    labelMl: "കേരള പോഷകാഹാരം",
                  },
                  {
                    id: "scans",
                    labelEn: "Scans & Tests",
                    labelMl: "പരിശോധനകൾ",
                  },
                  {
                    id: "myths",
                    labelEn: "Myths vs Facts",
                    labelMl: "വസ്തുതകൾ",
                  },
                ] as { id: GuideCategory; labelEn: string; labelMl: string }[]
              ).map((cat) => {
                const active = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-3 py-1.5 rounded-full text-[12px] font-semibold whitespace-nowrap transition-all ${
                      active
                        ? "bg-[#FF2D55] text-white shadow-xs"
                        : "bg-white text-[#636366] border border-black/[0.05] hover:text-black"
                    }`}
                  >
                    {isMl ? cat.labelMl : cat.labelEn}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Week Overview Apple Health Style Highlight Banner */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#FF2D55] via-[#E01A4F] to-[#7B0828] text-white p-5 shadow-[0_8px_25px_rgba(224,26,79,0.25)] border border-white/20">
            <div className="absolute -right-8 -bottom-10 w-44 h-44 rounded-full bg-white/10 blur-2xl pointer-events-none" />
            <div className="absolute top-3 right-4 opacity-15">
              <span className="material-symbols-outlined text-[76px]">
                child_care
              </span>
            </div>
            <div className="relative z-10 flex flex-col gap-2">
              <div className="flex items-center justify-between gap-2">
                <div className="inline-flex items-center gap-1.5 self-start bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-white text-[12px] font-semibold">
                  <span className="material-symbols-outlined text-[14px]">
                    auto_awesome
                  </span>
                  <span>
                    {weekData.isMilestone
                      ? isMl
                        ? `ആഴ്ച ${weekData.week} • പ്രധാന നാഴികക്കല്ല്`
                        : `Week ${weekData.week} • Milestone Week`
                      : isMl
                      ? `ആഴ്ച ${weekData.week} ഗൈഡ്`
                      : `Week ${weekData.week} Clinical Guide`}
                  </span>
                </div>
                {selectedGuideWeek !== stats.currentWeek && (
                  <button
                    type="button"
                    onClick={() => setSelectedGuideWeek(stats.currentWeek)}
                    className="text-[11px] font-bold bg-white text-[#FF2D55] px-2.5 py-1 rounded-full shadow-xs shrink-0"
                  >
                    {isMl
                      ? `ആഴ്ച ${stats.currentWeek}-ലേക്ക് മടങ്ങുക`
                      : `Back to Week ${stats.currentWeek}`}
                  </button>
                )}
              </div>

              <div>
                <h2 className="text-[22px] sm:text-[24px] font-bold tracking-tight text-white leading-tight">
                  {isMl ? weekData.titleMl : weekData.titleEn}
                </h2>
                <p className="text-[13.5px] text-white/90 font-semibold mt-1 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px]">
                    eco
                  </span>
                  <span>
                    {isMl
                      ? `വലിപ്പ താരതമ്യം: ${weekData.keralaCropMl}`
                      : `Kerala Crop Size: ${weekData.keralaCropEn}`}
                  </span>
                </p>
              </div>

              <p className="text-[13.5px] leading-relaxed text-white/90 mt-0.5">
                {isMl ? weekData.summaryMl : weekData.summaryEn}
              </p>

              {/* Metric Badges (Size / Weight Comparison) Apple Fitness/Health Card Format */}
              <div className="grid grid-cols-2 gap-2.5 mt-3 pt-3 border-t border-white/20">
                <div className="flex items-center gap-2.5 bg-white/15 backdrop-blur-md rounded-2xl p-2.5 border border-white/10">
                  <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[20px] text-white">
                      scale
                    </span>
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-white/75 block">
                      {isMl ? "കുഞ്ഞിന്റെ ഭാരം" : "Fetal Weight"}
                    </span>
                    <span className="text-[15px] font-bold text-white leading-tight">
                      {weekData.weightGrams}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 bg-white/15 backdrop-blur-md rounded-2xl p-2.5 border border-white/10">
                  <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[20px] text-white">
                      straighten
                    </span>
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-white/75 block">
                      {isMl ? "കുഞ്ഞിന്റെ നീളം" : "Fetal Length"}
                    </span>
                    <span className="text-[15px] font-bold text-white leading-tight truncate block">
                      {weekData.lengthCm}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Weekly Clinical Insights (Apple Health Style Grouped Accordions) */}
          {(showBabyCard || showMaternalCard || showScansCard) && (
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center justify-between px-1">
                <h3 className="text-[19px] font-bold tracking-tight text-black">
                  {isMl
                    ? "പ്രതിവാര ആരോഗ്യ വിവരങ്ങൾ"
                    : "Weekly Clinical Insights"}
                </h3>
                <span className="text-[13px] text-[#007AFF] font-semibold">
                  {isMl
                    ? `ആഴ്ച ${weekData.week} വിവരങ്ങൾ`
                    : `Week ${weekData.week} Focus`}
                </span>
              </div>

              {/* Card 1: Baby Growth */}
              {showBabyCard && (
                <details
                  className="group bg-white rounded-2xl shadow-[0_1px_4px_rgba(0,0,0,0.04)] border border-black/[0.04] overflow-hidden transition-all duration-200"
                  open
                >
                  <summary className="flex items-center justify-between p-3.5 cursor-pointer list-none select-none">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-[#E8F8F5] text-[#00A86B] flex items-center justify-center shrink-0 shadow-sm border border-[#00A86B]/10">
                        <span className="material-symbols-outlined text-[22px]">
                          child_care
                        </span>
                      </div>
                      <div>
                        <h4 className="text-[16px] font-bold text-black tracking-tight">
                          {isMl ? "കുഞ്ഞിന്റെ വളർച്ച" : "Baby Growth"}
                        </h4>
                        <p className="text-[12px] text-[#8E8E93]">
                          {isMl
                            ? weekData.babyGrowth.subtitleMl
                            : weekData.babyGrowth.subtitleEn}
                        </p>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-[#8E8E93] text-[20px] transition-transform duration-200 group-open:rotate-180">
                      expand_more
                    </span>
                  </summary>
                  <div className="px-3.5 pb-3.5 pt-1 flex flex-col gap-2 bg-white">
                    {weekData.babyGrowth.points.map((pt, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2.5 p-3 rounded-xl bg-[#F2F2F7] border border-black/[0.03]"
                      >
                        <span
                          className="material-symbols-outlined text-[20px] mt-0.5 shrink-0"
                          style={{ color: pt.color }}
                        >
                          {pt.icon}
                        </span>
                        <div className="text-[13px] leading-relaxed text-black">
                          <strong className="font-semibold text-black">
                            {isMl ? pt.titleMl : pt.titleEn}
                          </strong>{" "}
                          {isMl ? pt.descMl : pt.descEn}
                        </div>
                      </div>
                    ))}
                  </div>
                </details>
              )}

              {/* Card 2: Maternal Body Changes */}
              {showMaternalCard && (
                <>
                  <details
                    className="group bg-white rounded-2xl shadow-[0_1px_4px_rgba(0,0,0,0.04)] border border-black/[0.04] overflow-hidden transition-all duration-200"
                    open
                  >
                    <summary className="flex items-center justify-between p-3.5 cursor-pointer list-none select-none">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-[#FFF0F4] text-[#FF2D55] flex items-center justify-center shrink-0 shadow-sm border border-[#FF2D55]/10">
                          <span className="material-symbols-outlined text-[22px]">
                            pregnant_woman
                          </span>
                        </div>
                        <div>
                          <h4 className="text-[16px] font-bold text-black tracking-tight">
                            {isMl
                              ? "അമ്മയുടെ ശരീരത്തിലെ മാറ്റങ്ങൾ"
                              : "Maternal Changes"}
                          </h4>
                          <p className="text-[12px] text-[#8E8E93]">
                            {isMl
                              ? weekData.maternalChanges.subtitleMl
                              : weekData.maternalChanges.subtitleEn}
                          </p>
                        </div>
                      </div>
                      <span className="material-symbols-outlined text-[#8E8E93] text-[20px] transition-transform duration-200 group-open:rotate-180">
                        expand_more
                      </span>
                    </summary>
                    <div className="px-3.5 pb-3.5 pt-1 flex flex-col gap-2 bg-white">
                      {weekData.maternalChanges.points.map((pt, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-xl bg-[#F2F2F7] border border-black/[0.03] text-[13px] leading-relaxed text-black"
                        >
                          <strong className="font-semibold text-[#FF2D55]">
                            {isMl ? pt.titleMl : pt.titleEn}
                          </strong>{" "}
                          {isMl ? pt.descMl : pt.descEn}
                        </div>
                      ))}
                    </div>
                  </details>

                  {/* Card 3: Safe Activities & Prenatal Yoga */}
                  <details
                    className="group bg-white rounded-2xl shadow-[0_1px_4px_rgba(0,0,0,0.04)] border border-black/[0.04] overflow-hidden transition-all duration-200"
                    open={activeCategory === "maternal" || Boolean(q)}
                  >
                    <summary className="flex items-center justify-between p-3.5 cursor-pointer list-none select-none">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-[#EAF2FF] text-[#007AFF] flex items-center justify-center shrink-0 shadow-sm border border-[#007AFF]/10">
                          <span className="material-symbols-outlined text-[22px]">
                            self_improvement
                          </span>
                        </div>
                        <div>
                          <h4 className="text-[16px] font-bold text-black tracking-tight">
                            {isMl
                              ? "സുരക്ഷിതമായ വ്യായാമങ്ങളും യോഗയും"
                              : "Safe Activities & Prenatal Yoga"}
                          </h4>
                          <p className="text-[12px] text-[#8E8E93]">
                            {isMl
                              ? weekData.safeActivities.subtitleMl
                              : weekData.safeActivities.subtitleEn}
                          </p>
                        </div>
                      </div>
                      <span className="material-symbols-outlined text-[#8E8E93] text-[20px] transition-transform duration-200 group-open:rotate-180">
                        expand_more
                      </span>
                    </summary>
                    <div className="px-3.5 pb-3.5 pt-1 flex flex-col gap-2 bg-white">
                      {weekData.safeActivities.points.map((pt, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-xl bg-[#F2F2F7] border border-black/[0.03] flex flex-col gap-1 text-[13px]"
                        >
                          <span className="font-semibold text-[#007AFF]">
                            {isMl ? pt.titleMl : pt.titleEn}
                          </span>
                          <p className="text-black/80 leading-relaxed">
                            {isMl ? pt.descMl : pt.descEn}
                          </p>
                        </div>
                      ))}
                    </div>
                  </details>
                </>
              )}

              {/* Card 4: Routine Scans & Clinical Tests */}
              {showScansCard && (
                <details
                  className="group bg-white rounded-2xl shadow-[0_1px_4px_rgba(0,0,0,0.04)] border border-black/[0.04] overflow-hidden transition-all duration-200"
                  open
                >
                  <summary className="flex items-center justify-between p-3.5 cursor-pointer list-none select-none">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-[#FFF4E5] text-[#FF9500] flex items-center justify-center shrink-0 shadow-sm border border-[#FF9500]/10">
                        <span className="material-symbols-outlined text-[22px]">
                          assignment_turned_in
                        </span>
                      </div>
                      <div>
                        <h4 className="text-[16px] font-bold text-black tracking-tight">
                          {isMl
                            ? "സ്കാനിംഗുകളും തായ് കാർഡ് പരിശോധനകളും"
                            : "Routine Scans & MCP Card Tests"}
                        </h4>
                        <p className="text-[12px] text-[#8E8E93]">
                          {isMl
                            ? weekData.scansAndTests.subtitleMl
                            : weekData.scansAndTests.subtitleEn}
                        </p>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-[#8E8E93] text-[20px] transition-transform duration-200 group-open:rotate-180">
                      expand_more
                    </span>
                  </summary>
                  <div className="px-3.5 pb-3.5 pt-1 flex flex-col gap-2 bg-white">
                    {weekData.scansAndTests.points.map((pt, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-[#F2F2F7] border border-black/[0.03] flex items-start gap-2.5"
                      >
                        <span
                          className={`material-symbols-outlined text-[20px] mt-0.5 shrink-0 ${
                            idx === 0 ? "text-[#FF9500]" : "text-[#8E8E93]"
                          }`}
                        >
                          {pt.icon}
                        </span>
                        <div>
                          <span className="font-semibold text-black text-[13px] block">
                            {isMl ? pt.titleMl : pt.titleEn}
                          </span>
                          <p className="text-[13px] text-black/80 leading-relaxed mt-0.5">
                            {isMl ? pt.descMl : pt.descEn}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </details>
              )}
            </div>
          )}

          {/* Kerala Maternal Nutrition Section (Apple News / App Store Editorial Style) */}
          {showNutritionSection && (
            <section className="mt-1 flex flex-col gap-3">
              <div className="flex items-center justify-between px-1 gap-2">
                <div>
                  <h3 className="text-[19px] font-bold tracking-tight text-black flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[#FF2D55] text-[20px]">
                      restaurant
                    </span>
                    {isMl
                      ? "കേരളീയ ഗർഭകാല പോഷകാഹാരം"
                      : "Kerala Maternal Nutrition"}
                  </h3>
                  <p className="text-[12px] text-[#8E8E93] font-medium mt-0.5">
                    {isMl
                      ? "പരമ്പരാഗതവും ശാസ്ത്രീയവുമായ ആഹാരക്രമം"
                      : "Authentic & Clinically Validated Kerala Superfoods"}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAllTrimesterFoods((prev) => !prev)}
                  className="px-2.5 py-1 bg-white border border-black/[0.08] hover:bg-[#F2F2F7] text-[#007AFF] shadow-xs rounded-full text-[11px] font-bold tracking-tight shrink-0 transition-colors"
                >
                  {showAllTrimesterFoods
                    ? isMl
                      ? `ത്രൈമാസം ${weekData.trimester} മാത്രം`
                      : `Trimester ${weekData.trimester} Focus`
                    : isMl
                    ? "എല്ലാ വിഭവങ്ങളും (8)"
                    : "View All (8)"}
                </button>
              </div>

              {/* Editorial Superfood Cards */}
              <div className="flex flex-col gap-2.5">
                {filteredSuperfoods.map((food) => (
                  <div
                    key={food.id}
                    className="bg-white rounded-2xl p-3.5 shadow-[0_1px_4px_rgba(0,0,0,0.04)] border border-black/[0.04] flex gap-3.5 items-center"
                  >
                    <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-[#E5E5EA] border border-black/[0.05]">
                      <img
                        alt={isMl ? food.nameMl : food.nameEn}
                        className="w-full h-full object-cover"
                        src={food.image}
                      />
                    </div>
                    <div className="flex flex-col min-w-0 flex-1">
                      <h4 className="text-[15px] font-bold text-black truncate tracking-tight">
                        {isMl ? food.nameMl : food.nameEn}
                      </h4>
                      <p className="text-[13px] text-[#8E8E93] line-clamp-2 mt-0.5 leading-snug">
                        {isMl ? food.descMl : food.descEn}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        <span
                          className="px-2 py-0.5 rounded-md text-[11px] font-semibold"
                          style={{
                            backgroundColor: food.badge1Bg,
                            color: food.badge1Color,
                          }}
                        >
                          {isMl ? food.badge1Ml : food.badge1En}
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-[#F2F2F7] text-[#8E8E93] text-[11px] font-medium">
                          {isMl ? food.badge2Ml : food.badge2En}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Kerala Myths vs Facts (iOS Grouped Callout & Truth Cards) */}
          {showMythsSection && (
            <section className="mt-1 flex flex-col gap-3">
              <div className="flex items-center justify-between px-1">
                <div>
                  <h3 className="text-[19px] font-bold tracking-tight text-black flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[#34C759] text-[20px]">
                      verified
                    </span>
                    {isMl
                      ? "വിശ്വാസങ്ങളും ശാസ്ത്രീയ വസ്തുതകളും"
                      : "Myths vs. Obstetric Facts"}
                  </h3>
                  <p className="text-[12px] text-[#8E8E93] font-medium mt-0.5">
                    {isMl
                      ? "ഗർഭകാലത്തെ തെറ്റിദ്ധാരണകളും ഡോക്ടർമാരുടെ വിശദീകരണവും"
                      : "Evidence-based guidance on common pregnancy beliefs"}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {filteredMyths.map((myth) => (
                  <div
                    key={myth.id}
                    className="bg-white rounded-2xl p-4 shadow-[0_1px_4px_rgba(0,0,0,0.04)] border border-black/[0.04] flex flex-col gap-2.5"
                  >
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-md bg-[#FFE5E5] text-[#FF3B30] text-[11px] font-bold tracking-wide shrink-0">
                        {isMl ? "തെറ്റിദ്ധാരണ" : "MYTH"}
                      </span>
                      <span className="text-[14px] text-black font-semibold tracking-tight">
                        {isMl ? myth.mythMl : myth.mythEn}
                      </span>
                    </div>
                    <div className="p-3 rounded-xl bg-[#F4FBF7] border border-[#34C759]/20 flex items-start gap-2.5">
                      <span className="material-symbols-outlined text-[#34C759] text-[20px] shrink-0 mt-0.5">
                        check_circle
                      </span>
                      <div className="text-[13px] leading-relaxed text-black">
                        <strong className="font-semibold text-[#28A745]">
                          {isMl ? "ശാസ്ത്രീയ വസ്തുത: " : "Obstetric Fact: "}
                        </strong>
                        {isMl ? myth.factMl : myth.factEn}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Clinical Disclaimer Card (iOS System Info Style) */}
          <div className="rounded-2xl bg-[#E5E5EA]/60 border border-black/[0.04] p-4 flex items-start gap-3 mt-1">
            <span className="material-symbols-outlined text-[#8E8E93] text-[22px] shrink-0 mt-0.5">
              verified_user
            </span>
            <div className="flex flex-col gap-1">
              <span className="text-[13px] font-bold text-black">
                {isMl
                  ? "കേരള ആരോഗ്യ വകുപ്പ് (NHM) മാർഗ്ഗനിർദ്ദേശം"
                  : "Kerala Health Services Clinical Advisory"}
              </span>
              <p className="text-[12px] text-[#8E8E93] leading-relaxed">
                {isMl
                  ? "ഇതിലെ വിവരങ്ങൾ ദേശീയ ആരോഗ്യ ദൗത്യം (NHM Kerala), ആശാ മാതൃസുരക്ഷാ പ്രോട്ടോക്കോളുകൾ എന്നിവയെ അടിസ്ഥാനമാക്കിയുള്ളതാണ്. മരുന്നുകളോ ഭക്ഷണക്രമമോ മാറ്റുന്നതിന് മുമ്പ് എപ്പോഴും നിങ്ങളുടെ ഗൈനക്കോളജിസ്റ്റിന്റെ നിർദ്ദേശം തേടുക."
                  : "The recommendations provided align with National Health Mission (NHM Kerala) guidelines and ASHA maternal monitoring protocols. Always consult your attending gynecologist before modifying prenatal supplementation."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
