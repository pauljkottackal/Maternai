"use client";

import React, { useState, useEffect } from "react";
import { useMaterna } from "@/lib/store";
import { KERALA_DISTRICTS } from "@/lib/keralaContent";
import {
  addDaysToDateString,
  calculatePregnancyStats,
} from "@/lib/pregnancyCalculations";

export function OnboardingModal() {
  const {
    profile,
    updateProfile,
    isOnboardingOpen,
    setIsOnboardingOpen,
    showSampleData,
    setShowSampleData,
    resetAllToDemoDefaults,
    language,
  } = useMaterna();

  const [form, setForm] = useState(profile);
  const [savedBanner, setSavedBanner] = useState(false);

  useEffect(() => {
    setForm(profile);
  }, [profile, isOnboardingOpen]);

  if (!isOnboardingOpen) return null;

  const isMl = language === "ml";
  const previewStats = calculatePregnancyStats(form);

  const handleLmpChange = (lmpDate: string) => {
    const dueDate = addDaysToDateString(lmpDate, 280);
    setForm((prev) => ({
      ...prev,
      datingMethod: "lmp",
      lmpDate,
      dueDate,
    }));
  };

  const handleDueDateChange = (dueDate: string) => {
    const lmpDate = addDaysToDateString(dueDate, -280);
    setForm((prev) => ({
      ...prev,
      datingMethod: "edd",
      dueDate,
      lmpDate,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ ...form, onboarded: true });
    setSavedBanner(true);
    setTimeout(() => {
      setSavedBanner(false);
      setIsOnboardingOpen(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-[70] bg-black/40 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-[#F2F2F7] w-full max-w-lg rounded-t-3xl sm:rounded-3xl max-h-[90vh] overflow-y-auto shadow-2xl border border-black/10 flex flex-col">
        {/* Sticky Modal Header */}
        <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-xl px-5 py-4 border-b border-black/[0.06] flex items-center justify-between">
          <div>
            <h2 className="text-[18px] font-bold text-[#1C1C1E] tracking-tight">
              {isMl
                ? "മാതൃ പ്രൊഫൈലും ക്രമീകരണങ്ങളും"
                : "Maternal Profile & Dating Setup"}
            </h2>
            <p className="text-[12px] text-[#8E8E93]">
              {isMl
                ? "ഗർഭകാല ആഴ്ചയും പ്രസവ തീയതിയും കണക്കാക്കാൻ"
                : "Personalize pregnancy dating, language & emergency contacts"}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsOnboardingOpen(false)}
            className="w-8 h-8 rounded-full bg-[#E5E5EA] text-[#3C3C43] flex items-center justify-center hover:bg-black/10 transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 flex flex-col gap-4">
          {/* Dynamic Calculation Preview Banner */}
          <div className="bg-white rounded-2xl p-3.5 border border-[#007AFF]/20 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#007AFF]/10 text-[#007AFF] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[22px]">
                  pregnant_woman
                </span>
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#007AFF] block">
                  {isMl ? "നിലവിലെ ഗർഭകാല ഘട്ടം" : "Live Gestational Status"}
                </span>
                <span className="text-[15px] font-bold text-[#1C1C1E]">
                  {isMl
                    ? `ആഴ്ച ${previewStats.currentWeek}, ദിവസം ${previewStats.currentDayOfWeek} • ${previewStats.trimesterLabelMl}`
                    : `Week ${previewStats.currentWeek}, Day ${previewStats.currentDayOfWeek} • ${previewStats.trimesterLabelEn}`}
                </span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-[#8E8E93] uppercase font-semibold block">
                {isMl ? "പ്രസവ തീയതി" : "Est. Due Date"}
              </span>
              <span className="text-[13px] font-bold text-[#FF2D55]">
                {previewStats.formattedDueDate}
              </span>
            </div>
          </div>

          {/* Section 1: Identity & Language */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-black/[0.05] flex flex-col gap-3">
            <span className="text-[12px] font-bold uppercase tracking-wider text-[#8E8E93]">
              {isMl
                ? "1. അമ്മയുടെ പേരും ഭാഷയും"
                : "1. Mother's Profile & Language"}
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[12px] font-semibold text-[#3C3C43] block mb-1">
                  {isMl ? "അമ്മയുടെ പേര് (English) *" : "Mother's Name (English) *"}
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-xl bg-[#F2F2F7] px-3 py-2 text-[14px] font-semibold text-[#1C1C1E] border border-black/5 focus:outline-none focus:ring-2 focus:ring-[#007AFF]"
                  placeholder="e.g. Ananya"
                />
              </div>
              <div>
                <label className="text-[12px] font-semibold text-[#3C3C43] block mb-1">
                  {isMl ? "മലയാളത്തിലുള്ള പേര്" : "Name in Malayalam"}
                </label>
                <input
                  type="text"
                  value={form.nameMl}
                  onChange={(e) => setForm({ ...form, nameMl: e.target.value })}
                  className="w-full rounded-xl bg-[#F2F2F7] px-3 py-2 text-[14px] font-semibold text-[#1C1C1E] border border-black/5 focus:outline-none focus:ring-2 focus:ring-[#007AFF]"
                  placeholder={isMl ? "അനന്യ" : "Optional Malayalam script"}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[12px] font-semibold text-[#3C3C43] block mb-1">
                  {isMl ? "ആപ്പ് ഭാഷ" : "Preferred Language"}
                </label>
                <select
                  value={form.language}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      language: e.target.value as "en" | "ml",
                    })
                  }
                  className="w-full rounded-xl bg-[#F2F2F7] px-3 py-2 text-[14px] font-semibold text-[#1C1C1E] border border-black/5 focus:outline-none focus:ring-2 focus:ring-[#007AFF]"
                >
                  <option value="en">English</option>
                  <option value="ml">
                    {isMl ? "മലയാളം (Malayalam)" : "Malayalam"}
                  </option>
                </select>
              </div>
              <div>
                <label className="text-[12px] font-semibold text-[#3C3C43] block mb-1">
                  {isMl ? "കേരള ജില്ല" : "Kerala District"}
                </label>
                <select
                  value={form.district}
                  onChange={(e) =>
                    setForm({ ...form, district: e.target.value })
                  }
                  className="w-full rounded-xl bg-[#F2F2F7] px-3 py-2 text-[14px] font-semibold text-[#1C1C1E] border border-black/5 focus:outline-none focus:ring-2 focus:ring-[#007AFF]"
                >
                  {KERALA_DISTRICTS.filter((d) => d.code !== "all").map((d) => (
                    <option key={d.code} value={d.code}>
                      {isMl ? d.nameMl : d.nameEn}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Section 2: Pregnancy Dating & Baseline Weight */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-black/[0.05] flex flex-col gap-3">
            <span className="text-[12px] font-bold uppercase tracking-wider text-[#8E8E93]">
              {isMl
                ? "2. ഗർഭകാല തീയതികൾ (LMP / പ്രസവ തീയതി)"
                : "2. Pregnancy Dating (LMP / Due Date)"}
            </span>
            <p className="text-[12px] text-[#636366] leading-snug">
              {isMl
                ? "നിങ്ങളുടെ അവസാന ആർത്തവ തീയതി (LMP) അല്ലെങ്കിൽ സ്കാനിംഗിലെ പ്രസവ തീയതി (EDD) നൽകുക. 280 ദിവസത്തെ ഗർഭകാലം സ്വയം കണക്കാക്കപ്പെടും."
                : "Enter either your Last Menstrual Period (LMP) or your Ultrasound Estimated Due Date (EDD). The other will auto-calculate (280-day gestational cycle)."}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-[12px] font-semibold text-[#3C3C43] block mb-1">
                  {isMl ? "അവസാന ആർത്തവ തീയതി (LMP)" : "LMP Date"}
                </label>
                <input
                  type="date"
                  value={form.lmpDate}
                  onChange={(e) => handleLmpChange(e.target.value)}
                  className="w-full rounded-xl bg-[#F2F2F7] px-3 py-2 text-[13.5px] font-semibold text-[#1C1C1E] border border-black/5 focus:outline-none focus:ring-2 focus:ring-[#007AFF]"
                />
              </div>
              <div>
                <label className="text-[12px] font-semibold text-[#3C3C43] block mb-1">
                  {isMl ? "പ്രതീക്ഷിക്കുന്ന പ്രസവ തീയതി (EDD)" : "Estimated Due Date (EDD)"}
                </label>
                <input
                  type="date"
                  value={form.dueDate}
                  onChange={(e) => handleDueDateChange(e.target.value)}
                  className="w-full rounded-xl bg-[#F2F2F7] px-3 py-2 text-[13.5px] font-semibold text-[#1C1C1E] border border-black/5 focus:outline-none focus:ring-2 focus:ring-[#007AFF]"
                />
              </div>
              <div>
                <label className="text-[12px] font-semibold text-[#3C3C43] block mb-1">
                  {isMl ? "പ്രാരംഭ ശരീരഭാരം (kg)" : "Baseline Weight (kg)"}
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="30"
                  max="150"
                  value={form.baselineWeightKg}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      baselineWeightKg: parseFloat(e.target.value) || 58.4,
                    })
                  }
                  className="w-full rounded-xl bg-[#F2F2F7] px-3 py-2 text-[14px] font-semibold text-[#1C1C1E] border border-black/5 focus:outline-none focus:ring-2 focus:ring-[#007AFF]"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Configurable Doctor & ASHA Contacts */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-black/[0.05] flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-[12px] font-bold uppercase tracking-wider text-[#8E8E93]">
                {isMl
                  ? "3. ഡോക്ടർ & ആശാ വർക്കർ വിവരങ്ങൾ"
                  : "3. Configurable Clinical & ASHA Contacts"}
              </span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#EAF3FF] text-[#007AFF]">
                {isMl ? "ക്രമീകരിക്കാവുന്നത്" : "User-Configured"}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[12px] font-semibold text-[#3C3C43] block mb-1">
                  {isMl ? "ഡോക്ടറുടെ പേര്" : "Obstetrician Name"}
                </label>
                <input
                  type="text"
                  value={form.doctorName}
                  onChange={(e) =>
                    setForm({ ...form, doctorName: e.target.value })
                  }
                  className="w-full rounded-xl bg-[#F2F2F7] px-3 py-2 text-[13px] font-semibold text-[#1C1C1E] border border-black/5"
                />
              </div>
              <div>
                <label className="text-[12px] font-semibold text-[#3C3C43] block mb-1">
                  {isMl ? "ഡോക്ടർ / ആശുപത്രി ഫോൺ" : "Doctor / Clinic Phone"}
                </label>
                <input
                  type="tel"
                  value={form.doctorPhone}
                  onChange={(e) =>
                    setForm({ ...form, doctorPhone: e.target.value })
                  }
                  className="w-full rounded-xl bg-[#F2F2F7] px-3 py-2 text-[13px] font-semibold text-[#1C1C1E] border border-black/5"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="text-[12px] font-semibold text-[#3C3C43] block mb-1">
                  {isMl ? "ആശുപത്രി / ക്ലിനിക്ക്" : "Hospital / Consulting Centre"}
                </label>
                <input
                  type="text"
                  value={form.doctorHospital}
                  onChange={(e) =>
                    setForm({ ...form, doctorHospital: e.target.value })
                  }
                  className="w-full rounded-xl bg-[#F2F2F7] px-3 py-2 text-[13px] font-semibold text-[#1C1C1E] border border-black/5"
                />
              </div>
              <div>
                <label className="text-[12px] font-semibold text-[#3C3C43] block mb-1">
                  {isMl ? "ആശാ വർക്കറുടെ പേര്" : "Assigned ASHA Worker Name"}
                </label>
                <input
                  type="text"
                  value={form.ashaName}
                  onChange={(e) =>
                    setForm({ ...form, ashaName: e.target.value })
                  }
                  className="w-full rounded-xl bg-[#F2F2F7] px-3 py-2 text-[13px] font-semibold text-[#1C1C1E] border border-black/5"
                />
              </div>
              <div>
                <label className="text-[12px] font-semibold text-[#3C3C43] block mb-1">
                  {isMl ? "ആശാ വർക്കർ ഫോൺ നമ്പർ" : "ASHA Phone Number"}
                </label>
                <input
                  type="tel"
                  value={form.ashaPhone}
                  onChange={(e) =>
                    setForm({ ...form, ashaPhone: e.target.value })
                  }
                  className="w-full rounded-xl bg-[#F2F2F7] px-3 py-2 text-[13px] font-semibold text-[#1C1C1E] border border-black/5"
                />
              </div>
            </div>
          </div>

          {/* Section 4: Sample Demo Data Separation Toggle */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-black/[0.05] flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[13px] font-bold text-[#1C1C1E] block">
                  {isMl
                    ? "മാതൃകാ ഡെമോ രേഖകൾ കാണിക്കുക (MCTS പ്രിവ്യൂ)"
                    : "Include Sample Demo Records (MCTS Preview)"}
                </span>
                <span className="text-[11.5px] text-[#8E8E93]">
                  {isMl
                    ? "നിങ്ങൾ ചേർക്കുന്ന രേഖകളിൽ നിന്ന് വേർതിരിച്ച് കാണിക്കുന്നു"
                    : "Clearly separated from your own logged vitals & appointments"}
                </span>
              </div>
              <input
                type="checkbox"
                checked={showSampleData}
                onChange={(e) => setShowSampleData(e.target.checked)}
                className="w-5 h-5 accent-[#007AFF] rounded cursor-pointer"
              />
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-black/5">
              <span className="text-[11.5px] text-[#8E8E93]">
                {isMl
                  ? "ആഴ്ച 24-ലെ പ്രാരംഭ ഡെമോ ഡാറ്റ പുനഃസ്ഥാപിക്കണോ?"
                  : "Want to restore original Week 24 demo dataset?"}
              </span>
              <button
                type="button"
                onClick={resetAllToDemoDefaults}
                className="text-[12px] font-semibold text-[#FF3B30] hover:underline"
              >
                {isMl ? "ഡെമോ ഡാറ്റ റീസെറ്റ് ചെയ്യുക" : "Reset All Demo Data"}
              </button>
            </div>
          </div>

          {savedBanner && (
            <div className="bg-[#34C759]/15 border border-[#34C759]/30 text-[#248A3D] rounded-xl p-2.5 text-center text-[13px] font-bold">
              {isMl
                ? "✓ പ്രൊഫൈലും ഗർഭകാല തീയതികളും സേവ് ചെയ്തു!"
                : "✓ Profile & Pregnancy Dating Saved!"}
            </div>
          )}

          <div className="flex items-center gap-2.5 pt-1 pb-2">
            <button
              type="button"
              onClick={() => setIsOnboardingOpen(false)}
              className="flex-1 py-3 rounded-2xl bg-[#E5E5EA] text-[#1C1C1E] text-[14px] font-semibold"
            >
              {isMl ? "റദ്ദാക്കുക" : "Cancel"}
            </button>
            <button
              type="submit"
              className="flex-1 py-3 rounded-2xl bg-[#007AFF] text-white text-[14px] font-bold shadow-sm active:scale-98 transition-transform"
            >
              {isMl ? "സേവ് ചെയ്യുക" : "Save Profile"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
