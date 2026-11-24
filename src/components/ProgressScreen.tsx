"use client";

import React, { useState } from "react";
import { useMaterna } from "@/lib/store";
import { getWeekGuideContent } from "@/lib/keralaContent";
import {
  formatDisplayDate,
  parseLocalDate,
} from "@/lib/pregnancyCalculations";

const ALL_WEEKS = Array.from({ length: 37 }, (_, i) => i + 4);

export function ProgressScreen() {
  const {
    profile,
    stats,
    language,
    setActiveTab,
    selectedGuideWeek,
    setSelectedGuideWeek,
    kickCount,
    incrementKicks,
    resetKicks,
    supplements,
    toggleSupplement,
    waterGlasses,
    setWaterGlasses,
    appointments,
    setIsOnboardingOpen,
    setIsAshaOpen,
  } = useMaterna();

  const [showLmpTooltip, setShowLmpTooltip] = useState(false);
  const [showScanPrepModal, setShowScanPrepModal] = useState(false);
  const [kickBounce, setKickBounce] = useState(false);

  const isMl = language === "ml";
  const previewWeek = selectedGuideWeek || stats.currentWeek;
  const weekContent = getWeekGuideContent(previewWeek);

  const sortedUpcoming = appointments
    .filter((a) => a.status === "upcoming")
    .sort((a, b) => a.date.localeCompare(b.date));
  const upcomingApt = sortedUpcoming[0] || null;

  const getUpcomingBadgeText = () => {
    if (!upcomingApt) return isMl ? "സന്ദർശനം ബുക്ക് ചെയ്യുക" : "Schedule Visit";
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const aptDate = parseLocalDate(upcomingApt.date);
    const diffDays = Math.round(
      (aptDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );
    if (diffDays < 0)
      return isMl
        ? `${Math.abs(diffDays)} ദിവസം മുമ്പ്`
        : `${Math.abs(diffDays)}d Ago`;
    if (diffDays === 0) return isMl ? "ഇന്ന്" : "Today";
    if (diffDays === 1) return isMl ? "നാളെ" : "Tomorrow";
    return isMl ? `${diffDays} ദിവസത്തിനുള്ളിൽ` : `In ${diffDays} Days`;
  };

  const takenSupplementsCount = supplements.filter((s) => s.taken).length;

  const handleKickClick = () => {
    incrementKicks();
    setKickBounce(true);
    setTimeout(() => setKickBounce(false), 180);
  };

  return (
    <main className="flex flex-col relative w-full pt-[4.5rem] pb-28 max-w-lg mx-auto">
      <div className="flex flex-col w-full px-4 gap-3.5">
        {/* Apple iOS System Banner / Clinical Guidance Note */}
        <div className="bg-white/80 border border-black/[0.04] backdrop-blur-md rounded-2xl p-3 flex items-start gap-2.5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] mt-1">
          <div className="w-7 h-7 rounded-xl bg-[#007AFF]/10 flex items-center justify-center text-[#007AFF] shrink-0 mt-0.5">
            <span
              className="material-symbols-outlined text-[18px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              verified_user
            </span>
          </div>
          <div className="flex flex-col gap-0.5 min-w-0">
            <p className="text-[12px] font-semibold text-[#1C1C1E] leading-tight">
              {isMl ? "ചികിത്സാ മാർഗ്ഗനിർദ്ദേശ അറിയിപ്പ്" : "Clinical Guidance Notice"}
            </p>
            <p className="text-[11.5px] text-[#636366] leading-normal">
              {isMl
                ? "ഇതിലെ കണക്കുകൂട്ടലുകളും വിവരങ്ങളും അറിവിലേക്ക് മാത്രമുള്ളതാണ്. ഇത് ഡോക്ടറുടെ നേരിട്ടുള്ള പരിശോധനയ്ക്ക് പകരമല്ല."
                : "Estimates and guidance are for informational purposes only and do not replace consultation with your obstetrician."}
            </p>
          </div>
        </div>

        {/* iOS Large Title Header */}
        <div className="pt-2 pb-0.5 flex items-end justify-between">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#FF2D55]/10 text-[#FF2D55] text-[11px] font-bold tracking-tight">
                {isMl ? stats.trimesterLabelMl : stats.trimesterLabelEn}
              </span>
              <span className="text-[12px] font-medium text-[#8E8E93]">
                {isMl
                  ? `ആഴ്ച ${stats.currentWeek} • ദിവസം ${stats.currentDayOfWeek}`
                  : `Week ${stats.currentWeek} • Day ${stats.currentDayOfWeek}`}
              </span>
            </div>
            <h1 className="text-[28px] sm:text-[32px] font-extrabold tracking-tight text-[#1C1C1E] leading-tight mt-0.5">
              {isMl
                ? `നമസ്കാരം, ${profile.nameMl || profile.name}!`
                : `Namaskaram, ${profile.name}!`}
            </h1>
            <p className="text-[13.5px] text-[#007AFF] font-medium">
              {isMl
                ? `${stats.currentWeek}-ാം ആഴ്ചയിലെ ആരോഗ്യകരമായ ഗർഭകാലം`
                : `Healthy maternal journey at ${stats.currentWeek} weeks`}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsOnboardingOpen(true)}
            title={
              isMl
                ? "പ്രൊഫൈലും തീയതിയും മാറ്റുക"
                : "Edit Pregnancy Dating & Profile"
            }
            className="w-10 h-10 rounded-2xl bg-white shadow-sm border border-black/[0.05] flex items-center justify-center text-[#FF2D55] shrink-0 active:scale-95 transition-transform"
          >
            <span className="material-symbols-outlined text-[24px]">spa</span>
          </button>
        </div>

        {/* Apple Health / Fitness Hero Card: Gestational Progress */}
        <div className="bg-white rounded-3xl p-5 shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-black/[0.05] flex flex-col gap-4">
          {/* Top Week & Due Date Meta */}
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <div className="flex items-baseline gap-1.5">
                <span className="text-[28px] font-bold tracking-tight text-[#1C1C1E]">
                  {isMl ? `ആഴ്ച ${stats.currentWeek}` : `Week ${stats.currentWeek}`}
                </span>
                <span className="text-[14px] font-medium text-[#8E8E93]">
                  / 40
                </span>
              </div>
              <span className="text-[12px] text-[#8E8E93] font-medium">
                {isMl
                  ? `${stats.trimesterLabelMl} • ${stats.totalDaysCompleted}/280 ദിവസങ്ങൾ`
                  : `${stats.trimesterLabelEn} • Day ${stats.totalDaysCompleted} of 280`}
              </span>
            </div>
            <div className="flex flex-col items-end">
              <div className="flex items-center gap-1">
                <span className="text-[11px] font-semibold text-[#8E8E93] uppercase tracking-wider">
                  {isMl ? "പ്രസവ തീയതി (EDD)" : "Due Date"}
                </span>
                <button
                  aria-label="LMP information tooltip"
                  onClick={() => setShowLmpTooltip((prev) => !prev)}
                  className="text-[#007AFF] p-0.5 rounded-full hover:bg-slate-100 transition-colors"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[15px]">
                    info
                  </span>
                </button>
              </div>
              <span className="text-[16px] font-bold text-[#1C1C1E] tracking-tight">
                {stats.formattedDueDate}
              </span>
              <button
                type="button"
                onClick={() => setIsOnboardingOpen(true)}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#F2F2F7] hover:bg-[#E5E5EA] text-[#636366] text-[10px] font-semibold mt-0.5 transition-colors"
              >
                <span>
                  {profile.datingMethod === "lmp"
                    ? isMl
                      ? "LMP അടിസ്ഥാനമാക്കി"
                      : "LMP Provisional"
                    : isMl
                    ? "അൾട്രാസൗണ്ട് EDD"
                    : "EDD Ultrasound"}
                </span>
                <span className="material-symbols-outlined text-[11px]">
                  edit
                </span>
              </button>
            </div>
          </div>

          {/* Interactive Tooltip (iOS Banner Style) */}
          {showLmpTooltip && (
            <div className="bg-[#F2F2F7] rounded-2xl p-3.5 border border-black/[0.04] transition-all text-[#1C1C1E]">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-[#007AFF] text-[18px] shrink-0 mt-0.5">
                    calendar_month
                  </span>
                  <p className="text-[12px] leading-relaxed text-[#3C3C43]">
                    {isMl
                      ? `അവസാന ആർത്തവ തീയതിയിൽ (LMP: ${stats.formattedLmpDate}) നിന്ന് 280 ദിവസത്തെ ഗർഭകാലം കണക്കാക്കിയാണ് പ്രതീക്ഷിക്കുന്ന പ്രസവ തീയതി (EDD: ${stats.formattedDueDate}) നിശ്ചയിച്ചിരിക്കുന്നത്. തീയതി മാറ്റാൻ പ്രൊഫൈൽ ബട്ടൺ അമർത്തുക.`
                      : `Estimated Delivery Date (EDD: ${stats.formattedDueDate}) calculated from Last Menstrual Period (LMP: ${stats.formattedLmpDate}) across a 280-day gestational cycle. Tap the profile avatar or badge anytime to adjust your dates.`}
                  </p>
                </div>
                <button
                  onClick={() => setShowLmpTooltip(false)}
                  className="text-[#8E8E93] hover:text-[#1C1C1E] p-1"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[16px]">
                    close
                  </span>
                </button>
              </div>
            </div>
          )}

          {/* Interactive Week Selector Strip & Stepper */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#8E8E93]">
                  {isMl
                    ? "ആഴ്ചതോറുമുള്ള വളർച്ച കാണുക"
                    : "Explore Week-by-Week Growth"}
                </span>
                <div className="inline-flex items-center gap-1 ml-1">
                  <button
                    type="button"
                    disabled={previewWeek <= 4}
                    onClick={() =>
                      setSelectedGuideWeek(Math.max(4, previewWeek - 1))
                    }
                    className="w-6 h-6 rounded-full bg-[#F2F2F7] hover:bg-[#E5E5EA] disabled:opacity-40 text-[12px] font-bold flex items-center justify-center"
                    aria-label="Previous week"
                  >
                    ←
                  </button>
                  <span className="text-[11.5px] font-bold text-[#1C1C1E] px-1">
                    {isMl ? `ആഴ്ച ${previewWeek}` : `W${previewWeek}`}
                  </span>
                  <button
                    type="button"
                    disabled={previewWeek >= 40}
                    onClick={() =>
                      setSelectedGuideWeek(Math.min(40, previewWeek + 1))
                    }
                    className="w-6 h-6 rounded-full bg-[#F2F2F7] hover:bg-[#E5E5EA] disabled:opacity-40 text-[12px] font-bold flex items-center justify-center"
                    aria-label="Next week"
                  >
                    →
                  </button>
                </div>
              </div>
              {previewWeek !== stats.currentWeek && (
                <button
                  type="button"
                  onClick={() => setSelectedGuideWeek(stats.currentWeek)}
                  className="text-[11px] font-bold text-[#007AFF] hover:underline shrink-0"
                >
                  {isMl
                    ? `നിലവിലെ ആഴ്ചയിലേക്ക് (W${stats.currentWeek})`
                    : `Reset to Current (W${stats.currentWeek})`}
                </button>
              )}
            </div>
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
              {ALL_WEEKS.map((wk) => {
                const isSelected = wk === previewWeek;
                const isCurrent = wk === stats.currentWeek;
                return (
                  <button
                    key={wk}
                    type="button"
                    onClick={() => setSelectedGuideWeek(wk)}
                    className={`px-2.5 py-1 rounded-xl text-[12px] font-bold transition-all shrink-0 ${
                      isSelected
                        ? "bg-[#FF2D55] text-white shadow-xs"
                        : isCurrent
                        ? "bg-[#FF2D55]/10 text-[#FF2D55] border border-[#FF2D55]/30"
                        : "bg-[#F2F2F7] text-[#636366] hover:bg-[#E5E5EA]"
                    }`}
                  >
                    W{wk}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Baby Size Comparison Component (iOS Inset Group) */}
          <div
            onClick={() => {
              setSelectedGuideWeek(previewWeek);
              setActiveTab("guide");
            }}
            className="bg-[#F2F2F7]/80 hover:bg-[#F2F2F7] cursor-pointer rounded-2xl p-4 flex items-center justify-between gap-3 border border-black/[0.03] transition-colors"
          >
            <div className="flex flex-col gap-1 min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[10.5px] font-bold uppercase tracking-wider text-[#FF2D55]">
                  {isMl
                    ? `ആഴ്ച ${previewWeek} • കുഞ്ഞിന്റെ വലിപ്പ താരതമ്യം`
                    : `Week ${previewWeek} • Baby Size Comparison`}
                </span>
                <span className="text-[10.5px] font-semibold px-2 py-0.2 rounded-full bg-white text-[#1C1C1E] border border-black/5">
                  {weekContent.lengthCm} • {weekContent.weightGrams}
                </span>
              </div>
              <h2 className="text-[17px] font-bold text-[#1C1C1E] tracking-tight truncate">
                {isMl ? weekContent.keralaCropMl : weekContent.keralaCropEn}
              </h2>
              <p className="text-[12.5px] text-[#636366] leading-snug">
                {isMl ? weekContent.cropSubtextMl : weekContent.cropSubtextEn}
              </p>
            </div>
            {/* Botanical Illustration Apple Squircle Badge */}
            <div className="shrink-0 w-20 h-20 rounded-2xl bg-white flex items-center justify-center p-2 text-[#007AFF] shadow-sm border border-black/[0.04] relative overflow-hidden">
              <svg
                className="w-16 h-16"
                fill="none"
                viewBox="0 0 80 80"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M40 8C33 8 28 13 28 20C28 24 30 27 30 32C30 45 22 51 22 61C22 71.5 30 76 40 76C50 76 58 71.5 58 61C58 51 50 45 50 32C50 27 52 24 52 20C52 13 47 8 40 8Z"
                  fill="#34C759"
                  fillOpacity="0.25"
                />
                <path
                  d="M40 16C36 16 33 19 33 23C33 26 34.5 28 34.5 31C34.5 40 28 44 28 52C28 60 33.5 64 40 64C46.5 64 52 60 52 52C52 44 45.5 40 45.5 31C45.5 28 47 26 47 23C47 19 44 16 40 16Z"
                  fill="#007AFF"
                  fillOpacity="0.2"
                />
                <circle cx="40" cy="33" fill="#007AFF" r="5" />
                <path
                  d="M40 38C36 38 34 42 34 46C34 50 37 53 40 53C43 53 46 50 46 46C46 42 44 38 40 38Z"
                  fill="#FF2D55"
                  fillOpacity="0.8"
                />
                <path
                  d="M40 8C40 4 43 2 45 2"
                  stroke="#34C759"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                />
                <path
                  d="M40 7C43 7 46 5 48 5"
                  stroke="#30B0C7"
                  strokeLinecap="round"
                  strokeWidth="1.5"
                />
              </svg>
              <span className="absolute bottom-1 right-1.5 text-[9px] font-bold text-[#FF2D55] bg-white/90 px-1 py-0.2 rounded-md shadow-xs">
                {previewWeek}w
              </span>
            </div>
          </div>

          {/* Apple Fitness Style Timeline & Progress Ring Style Bar */}
          <div className="flex flex-col gap-2 pt-1">
            <div className="flex items-center justify-between text-[#1C1C1E]">
              <div className="flex items-center gap-1.5">
                <span className="text-[14px] font-bold text-[#FF2D55]">
                  {isMl
                    ? `${stats.percentComplete}% പൂർത്തിയായി`
                    : `${stats.percentComplete}% Complete`}
                </span>
                <span className="text-[#8E8E93] text-[12px]">
                  {isMl
                    ? `• ${stats.daysRemaining} ദിവസങ്ങൾ ബാക്കി (${stats.weeksRemaining} ആഴ്ച)`
                    : `• ${stats.daysRemaining} days to go (${stats.weeksRemaining} wks)`}
                </span>
              </div>
              <span className="text-[12px] font-semibold text-[#8E8E93]">
                {isMl ? "40 ആഴ്ചകൾ" : "40 Weeks"}
              </span>
            </div>
            {/* Apple Smooth Capsule Bar with Gradient */}
            <div className="w-full bg-[#E5E5EA] rounded-full h-3 relative overflow-hidden">
              <div
                className="bg-gradient-to-r from-[#FF2D55] via-[#FF375F] to-[#FF6482] h-full rounded-full transition-all duration-700 ease-out shadow-[0_0_10px_rgba(255,45,85,0.4)]"
                style={{ width: `${stats.percentComplete}%` }}
              />
            </div>
            {/* Trimester Milestone Tick Labels */}
            <div className="flex items-center justify-between text-[#8E8E93] text-[11px] font-medium pt-0.5">
              <span
                className={
                  stats.trimester === 1 ? "font-bold text-[#FF2D55]" : ""
                }
              >
                {isMl ? "ത്രൈമാസം 1 (W1–12)" : "Tri 1 (W1–12)"}
              </span>
              <span
                className={
                  stats.trimester === 2 ? "font-bold text-[#FF2D55]" : ""
                }
              >
                {isMl ? "ത്രൈമാസം 2 (W13–27)" : "Tri 2 (W13–27)"}
              </span>
              <span
                className={
                  stats.trimester === 3 ? "font-bold text-[#FF2D55]" : ""
                }
              >
                {isMl ? "ത്രൈമാസം 3 (W28–40)" : "Tri 3 (W28–40)"}
              </span>
            </div>
          </div>
        </div>

        {/* Quick Action Tiles (Apple iOS Squircles) */}
        <div className="grid grid-cols-3 gap-2.5">
          {/* Vitals Tile */}
          <button
            onClick={() => setActiveTab("tracker")}
            className="bg-white p-3.5 rounded-2xl flex flex-col items-center justify-center gap-1.5 shadow-[0_1px_4px_rgba(0,0,0,0.04)] border border-black/[0.04] active:scale-95 transition-transform text-center group"
            type="button"
          >
            <div className="w-11 h-11 rounded-2xl bg-[#007AFF]/10 flex items-center justify-center text-[#007AFF] group-hover:bg-[#007AFF]/15 transition-colors">
              <span className="material-symbols-outlined text-[24px]">
                vital_signs
              </span>
            </div>
            <span className="text-[13px] font-bold text-[#1C1C1E] leading-tight">
              {isMl ? "വൈറ്റൽസ്" : "Log Vitals"}
            </span>
            <span className="text-[10.5px] text-[#8E8E93] font-medium">
              {isMl ? "ബി.പി & ഭാരം" : "BP & Weight"}
            </span>
          </button>

          {/* Kick Counter Tile */}
          <div className="relative bg-white p-3.5 rounded-2xl flex flex-col items-center justify-center gap-1.5 shadow-[0_1px_4px_rgba(0,0,0,0.04)] border border-black/[0.04] text-center group">
            <button
              onClick={handleKickClick}
              className={`flex flex-col items-center justify-center gap-1.5 w-full focus:outline-none transition-transform ${
                kickBounce ? "scale-90" : "active:scale-95"
              }`}
              type="button"
            >
              <div className="w-11 h-11 rounded-2xl bg-[#FF2D55]/10 flex items-center justify-center text-[#FF2D55] group-hover:bg-[#FF2D55]/15 transition-colors">
                <span
                  className="material-symbols-outlined text-[24px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  favorite
                </span>
              </div>
              <span className="text-[13px] font-bold text-[#1C1C1E] leading-tight">
                {isMl ? "കിക്ക് കൗണ്ടർ" : "Kick Counter"}
              </span>
              <span className="text-[10.5px] text-[#FF2D55] font-semibold">
                {isMl
                  ? `ഇന്ന് ${kickCount} അനക്കം (+1)`
                  : `${kickCount} kicks today (+1)`}
              </span>
            </button>
            {kickCount > 0 && (
              <button
                type="button"
                onClick={resetKicks}
                title={
                  isMl
                    ? "ഇന്നത്തെ കിക്ക് കൗണ്ട് പുനഃക്രമീകരിക്കുക"
                    : "Reset today's kick count"
                }
                className="absolute top-1.5 right-2 text-[9.5px] text-[#8E8E93] hover:text-[#FF3B30] font-semibold"
              >
                {isMl ? "റീസെറ്റ്" : "Reset"}
              </button>
            )}
          </div>

          {/* Ask ASHA Tile */}
          <button
            onClick={() => setIsAshaOpen(true)}
            className="bg-white p-3.5 rounded-2xl flex flex-col items-center justify-center gap-1.5 shadow-[0_1px_4px_rgba(0,0,0,0.04)] border border-black/[0.04] active:scale-95 transition-transform text-center group"
            type="button"
          >
            <div className="w-11 h-11 rounded-2xl bg-[#34C759]/10 flex items-center justify-center text-[#34C759] group-hover:bg-[#34C759]/15 transition-colors">
              <span className="material-symbols-outlined text-[24px]">
                support_agent
              </span>
            </div>
            <span className="text-[13px] font-bold text-[#1C1C1E] leading-tight">
              {isMl ? "ആശാ സഹായം" : "Ask ASHA"}
            </span>
            <span className="text-[10.5px] text-[#8E8E93] font-medium">
              {isMl ? "ആരോഗ്യ സംശയങ്ങൾ" : "JPHN Support"}
            </span>
          </button>
        </div>

        {/* Upcoming Obstetric Visit Card (iOS Grouped Style) */}
        <div className="bg-white rounded-3xl p-4 shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-black/[0.05] flex flex-col gap-3.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#007AFF]/10 flex items-center justify-center text-[#007AFF]">
                <span className="material-symbols-outlined text-[19px]">
                  calendar_month
                </span>
              </div>
              <h2 className="text-[16px] font-bold text-[#1C1C1E] tracking-tight">
                {isMl
                  ? "അടുത്ത ഡോക്ടർ സന്ദർശനം"
                  : "Upcoming Obstetric Visit"}
              </h2>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-[#007AFF]/10 text-[#007AFF] text-[11px] font-bold">
              {getUpcomingBadgeText()}
            </span>
          </div>

          <div className="bg-[#F2F2F7]/80 rounded-2xl p-3.5 flex flex-col gap-2.5 border border-black/[0.03]">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="text-[14px] font-bold text-[#1C1C1E]">
                  {upcomingApt ? upcomingApt.doctorName : profile.doctorName}
                </h3>
                <p className="text-[12px] text-[#636366]">
                  {upcomingApt ? upcomingApt.facility : profile.doctorHospital}
                </p>
              </div>
              <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center text-[#007AFF] shadow-xs">
                <span className="material-symbols-outlined text-[17px]">
                  medical_services
                </span>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3 pt-1 text-[#636366] text-[12px]">
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[15px] text-[#007AFF]">
                  schedule
                </span>
                <span>
                  {upcomingApt
                    ? `${formatDisplayDate(upcomingApt.date)}, ${
                        upcomingApt.time
                      }`
                    : isMl
                    ? "ചൊവ്വാഴ്ച, 10:30 AM"
                    : "Tuesday, 10:30 AM"}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[15px] text-[#007AFF]">
                  assignment
                </span>
                <span>
                  {upcomingApt
                    ? isMl
                      ? upcomingApt.purposeMl
                      : upcomingApt.purposeEn
                    : isMl
                    ? "പതിവ് പരിശോധന"
                    : "Routine Anomaly Review"}
                </span>
              </div>
            </div>
          </div>

          {/* iOS Button */}
          <button
            onClick={() => setShowScanPrepModal((prev) => !prev)}
            className="w-full bg-[#007AFF] active:bg-[#0062CC] text-white py-3 px-4 rounded-2xl text-[14px] font-semibold flex items-center justify-center gap-2 shadow-sm transition-all"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">
              checklist
            </span>
            <span>
              {showScanPrepModal
                ? isMl
                  ? "പരിശോധനാ നിർദ്ദേശങ്ങൾ മറയ്ക്കുക"
                  : "Hide Scan Prep Instructions"
                : isMl
                ? "പരിശോധനാ തയ്യാറെടുപ്പുകൾ കാണുക"
                : "View Scan Prep Instructions"}
            </span>
          </button>

          {showScanPrepModal && (
            <div className="bg-[#F2F2F7] rounded-2xl p-3.5 border border-[#007AFF]/20 flex flex-col gap-2 text-[12.5px] text-[#1C1C1E]">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#007AFF] uppercase text-[11px] tracking-wider">
                  {isMl
                    ? "കേരള NHM തായ് കാർഡ് (MCP) ചെക്ക്‌ലിസ്റ്റ്"
                    : "Kerala NHM Antenatal Visit Checklist (MCP Card)"}
                </span>
                <button
                  type="button"
                  onClick={() => setActiveTab("tracker")}
                  className="text-[11px] font-bold text-[#007AFF] underline"
                >
                  {isMl ? "സന്ദർശനങ്ങൾ →" : "Manage Visits →"}
                </button>
              </div>
              {isMl ? (
                <ul className="list-disc pl-4 flex flex-col gap-1 text-[#3C3C43]">
                  <li>
                    നിങ്ങളുടെ <strong>തായ് കാർഡും (MCP Card)</strong> മുൻകാല സ്കാൻ റിപ്പോർട്ടുകളും ആശുപത്രിയിൽ പോകുമ്പോൾ നിർബന്ധമായും കരുതുക.
                  </li>
                  <li>
                    <strong>75g OGTT ഷുഗർ പരിശോധനയ്ക്ക് (24–28 ആഴ്ചകൾ)</strong> പോകുമ്പോൾ കുടിവെള്ളവും ലാബിൽ 2 മണിക്കൂർ വിശ്രമിക്കാനുള്ള സമയവും കരുതുക.
                  </li>
                  <li>
                    വയറ്റിലെ പരിശോധനയ്ക്കും ഡോപ്ലർ സ്കാനിംഗിനും സൗകര്യപ്രദമായ അയഞ്ഞ കോട്ടൺ വസ്ത്രങ്ങൾ ധരിക്കുക.
                  </li>
                </ul>
              ) : (
                <ul className="list-disc pl-4 flex flex-col gap-1 text-[#3C3C43]">
                  <li>
                    Carry your physical{" "}
                    <strong>Mother &amp; Child Protection (MCP Card)</strong>{" "}
                    booklet and previous ultrasound scan reports.
                  </li>
                  <li>
                    For the{" "}
                    <strong>75g OGTT Glucose Screen (Weeks 24–28)</strong>,
                    bring a water bottle and plan for a 2-hour stay at the
                    laboratory.
                  </li>
                  <li>
                    Wear comfortable two-piece clothing for easy abdominal
                    fundal height and fetal Doppler examination.
                  </li>
                </ul>
              )}
            </div>
          )}
        </div>

        {/* Daily Wellness Regimen Card (Apple Health Grouped Checklist) */}
        <div className="bg-white rounded-3xl p-4 shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-black/[0.05] flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#34C759]/10 flex items-center justify-center text-[#34C759]">
                <span className="material-symbols-outlined text-[19px]">
                  medication
                </span>
              </div>
              <h2 className="text-[16px] font-bold text-[#1C1C1E] tracking-tight">
                {isMl
                  ? "ദൈനംദിന ആരോഗ്യ നിഷ്ഠകൾ"
                  : "Daily Wellness Regimen"}
              </h2>
            </div>
            <span className="text-[12px] font-semibold text-[#8E8E93]">
              {isMl
                ? `${takenSupplementsCount} / ${supplements.length} പൂർത്തിയായി`
                : `${takenSupplementsCount} of ${supplements.length} Done`}
            </span>
          </div>

          {/* Grouped List */}
          <div className="flex flex-col gap-2">
            {supplements.map((supp) => (
              <label
                key={supp.id}
                className="flex items-center justify-between p-3 rounded-2xl bg-[#F2F2F7]/80 hover:bg-[#F2F2F7] cursor-pointer transition-colors border border-black/[0.02]"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <input
                    checked={supp.taken}
                    onChange={() => toggleSupplement(supp.id)}
                    className="w-5 h-5 rounded-full accent-[#34C759] cursor-pointer"
                    type="checkbox"
                  />
                  <div className="flex flex-col min-w-0">
                    <span className="text-[13.5px] font-semibold text-[#1C1C1E] truncate">
                      {isMl ? supp.nameMl : supp.nameEn}
                    </span>
                    <span className="text-[11.5px] text-[#8E8E93]">
                      {isMl ? supp.scheduleMl : supp.scheduleEn}
                    </span>
                  </div>
                </div>
                <span
                  className={`material-symbols-outlined text-[20px] ${
                    supp.taken ? "text-[#34C759]" : "text-[#C7C7CC]"
                  }`}
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  check_circle
                </span>
              </label>
            ))}

            {/* Item 3: Hydration Tracker */}
            <div className="p-3 rounded-2xl bg-[#F2F2F7]/80 flex items-center justify-between border border-black/[0.02]">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-xl bg-[#007AFF]/10 flex items-center justify-center text-[#007AFF]">
                  <span className="material-symbols-outlined text-[18px]">
                    water_drop
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[13.5px] font-semibold text-[#1C1C1E]">
                    {isMl
                      ? "കുടിവെള്ള ട്രാക്കർ (2.5 ലിറ്റർ ലക്ഷ്യം)"
                      : "Hydration Tracker (2.5L Goal)"}
                  </span>
                  <span className="text-[11.5px] text-[#8E8E93]">
                    {isMl
                      ? `ഇന്ന് 8-ൽ ${waterGlasses} ഗ്ലാസ് കുടിച്ചു (${(
                          waterGlasses * 0.35
                        ).toFixed(1)}L)`
                      : `${waterGlasses} of 8 glasses logged today (${(
                          waterGlasses * 0.35
                        ).toFixed(1)}L)`}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setWaterGlasses(waterGlasses - 1)}
                  className="w-7 h-7 rounded-full bg-white shadow-xs border border-black/5 flex items-center justify-center text-[#007AFF] font-bold active:scale-95"
                  type="button"
                >
                  −
                </button>
                <span className="text-[14px] font-bold text-[#1C1C1E] px-1">
                  {waterGlasses}
                </span>
                <button
                  onClick={() => setWaterGlasses(waterGlasses + 1)}
                  className="w-7 h-7 rounded-full bg-[#007AFF] text-white flex items-center justify-center font-bold active:scale-95 shadow-sm"
                  type="button"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Highlights Carousel / Inset Grouped Section */}
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <span className="text-[17px] font-bold text-[#1C1C1E] tracking-tight">
                {isMl
                  ? `ആഴ്ച ${previewWeek} പ്രധാന വിവരങ്ങൾ`
                  : `Week ${previewWeek} Highlights`}
              </span>
              {previewWeek !== stats.currentWeek && (
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#FF2D55]/10 text-[#FF2D55]">
                  {isMl ? "പ്രിവ്യൂ" : "Previewing"}
                </span>
              )}
            </div>
            <button
              type="button"
              onClick={() => {
                setSelectedGuideWeek(previewWeek);
                setActiveTab("guide");
              }}
              className="text-[12px] font-semibold text-[#007AFF] hover:underline"
            >
              {isMl ? "പൂർണ്ണ ഗൈഡ് കാണുക →" : "Open Full Guide →"}
            </button>
          </div>
          <div className="flex flex-col gap-3">
            {/* 1. Baby Development Card */}
            <div className="bg-white rounded-3xl p-4 shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-black/[0.05] flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#007AFF]/10 text-[#007AFF] text-[11px] font-semibold">
                  <span className="material-symbols-outlined text-[13px]">
                    child_care
                  </span>
                  {isMl ? "കുഞ്ഞിന്റെ വളർച്ച" : "Baby Development"}
                </span>
                <span className="text-[11px] text-[#8E8E93]">
                  {isMl
                    ? `ആഴ്ച ${previewWeek} നാഴികക്കല്ല്`
                    : `Week ${previewWeek} Milestone`}
                </span>
              </div>
              <h3 className="text-[15px] font-bold text-[#1C1C1E]">
                {isMl
                  ? weekContent.highlights.babyTitleMl
                  : weekContent.highlights.babyTitleEn}
              </h3>
              <p className="text-[13px] text-[#636366] leading-relaxed">
                {isMl
                  ? weekContent.highlights.babyDescMl
                  : weekContent.highlights.babyDescEn}
              </p>
            </div>

            {/* 2. Mother's Body Card */}
            <div className="bg-white rounded-3xl p-4 shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-black/[0.05] flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FF2D55]/10 text-[#FF2D55] text-[11px] font-semibold">
                  <span className="material-symbols-outlined text-[13px]">
                    favorite
                  </span>
                  {isMl ? "അമ്മയുടെ ശരീരമാറ്റങ്ങൾ" : "Mother's Body"}
                </span>
                <span className="text-[11px] text-[#FF9500] font-medium">
                  {isMl ? "ശാരീരിക മാറ്റം" : "Physiological"}
                </span>
              </div>
              <h3 className="text-[15px] font-bold text-[#1C1C1E]">
                {isMl
                  ? weekContent.highlights.motherTitleMl
                  : weekContent.highlights.motherTitleEn}
              </h3>
              <p className="text-[13px] text-[#636366] leading-relaxed">
                {isMl
                  ? weekContent.highlights.motherDescMl
                  : weekContent.highlights.motherDescEn}
              </p>
            </div>

            {/* 3. Traditional Kerala Nutrition Insight */}
            <div className="bg-white rounded-3xl p-4 shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-black/[0.05] flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#34C759]/10 text-[#34C759] text-[11px] font-semibold">
                  <span className="material-symbols-outlined text-[13px]">
                    restaurant
                  </span>
                  {isMl ? "കേരള പോഷകാഹാരം" : "Kerala Nutrition"}
                </span>
                <span className="text-[11px] text-[#34C759] font-semibold">
                  {isMl
                    ? `ത്രൈമാസം ${weekContent.trimester} വിഭവം`
                    : `Trimester ${weekContent.trimester} Staple`}
                </span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-16 h-16 rounded-2xl bg-[#F2F2F7] shrink-0 overflow-hidden border border-black/[0.04]">
                  <img
                    alt="Kerala Maternal Nutrition"
                    className="w-full h-full object-cover rounded-2xl"
                    src={weekContent.highlights.nutritionImage}
                  />
                </div>
                <div className="flex flex-col min-w-0">
                  <h4 className="text-[14px] font-bold text-[#1C1C1E] truncate">
                    {isMl
                      ? weekContent.highlights.nutritionTitleMl
                      : weekContent.highlights.nutritionTitleEn}
                  </h4>
                  <p className="text-[12px] text-[#636366] leading-snug pt-0.5">
                    {isMl
                      ? weekContent.highlights.nutritionDescMl
                      : weekContent.highlights.nutritionDescEn}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between bg-[#F2F2F7]/80 p-2.5 rounded-2xl border border-black/[0.02] gap-2">
                <span className="text-[11.5px] text-[#8E8E93] shrink-0">
                  {isMl ? "ശുപാർശ ചെയ്യുന്ന അളവ്" : "Recommended Intake"}
                </span>
                <span className="text-[12px] font-bold text-[#1C1C1E] text-right">
                  {isMl
                    ? weekContent.highlights.nutritionIntakeMl
                    : weekContent.highlights.nutritionIntakeEn}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ASHA Worker Community Contact Card */}
        <div className="bg-white rounded-3xl p-4 flex items-center justify-between gap-3 shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-black/[0.05] mb-2">
          <div className="flex items-center gap-3">
            <div className="relative shrink-0">
              <img
                alt={profile.ashaName}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-xs"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBsJO80IYN5CpEzyGkimidt2RRay4gBJSm1DZgufr_cSvFvBJ1cNSPEgNKRS9lwHcFJBRQxuQ2glUU65rld7UZn5lURrczUxiOXID-5lL-OfBG2GaijOGdgJnAhVSTJTIZmt7MaftEKHcLpXwFkCxKhbttpr1T-1JXEjaoC1Q9OzsxfSHufIUYuff8Z1Qb84QWsH-C7DyYmrAFr0f88pzg2TyklcGIyWDjRIJypH60"
              />
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-[#34C759] border-2 border-white" />
            </div>
            <div className="flex flex-col min-w-0">
              <h4 className="text-[14px] font-bold text-[#1C1C1E] truncate">
                {isMl
                  ? `${profile.ashaName} (ആശാ വർക്കർ)`
                  : `${profile.ashaName} (ASHA Worker)`}
              </h4>
              <span className="text-[11.5px] text-[#8E8E93]">
                {isMl
                  ? `${profile.ashaLocation} • നിങ്ങളുടെ വാർഡ്`
                  : `${profile.ashaLocation} • Assigned to you`}
              </span>
            </div>
          </div>
          <a
            aria-label="Call ASHA Worker"
            className="shrink-0 w-11 h-11 rounded-full bg-[#34C759]/15 text-[#34C759] flex items-center justify-center hover:bg-[#34C759]/25 transition-all active:scale-95"
            href={`tel:${profile.ashaPhone}`}
          >
            <span
              className="material-symbols-outlined text-[20px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              call
            </span>
          </a>
        </div>
      </div>
    </main>
  );
}
