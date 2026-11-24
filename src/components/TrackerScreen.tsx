"use client";

import React, { useState, useRef } from "react";
import { useMaterna } from "@/lib/store";
import { VitalRecord } from "@/lib/types";
import {
  formatDisplayDate,
  parseLocalDate,
  toLocalIsoDateString,
} from "@/lib/pregnancyCalculations";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
} from "recharts";

const COMMON_SYMPTOMS: { en: string; ml: string }[] = [
  { en: "No concerning symptoms", ml: "പ്രത്യേക ബുദ്ധിമുട്ടുകൾ ഇല്ല" },
  { en: "Mild ankle puffiness", ml: "കണങ്കാലിൽ നേരിയ നീര്" },
  { en: "Active baby flutters", ml: "കുഞ്ഞിന്റെ സജീവമായ ചലനം" },
  { en: "Mild backache", ml: "നേരിയ നടുവേദന" },
  { en: "Heartburn / Acidity", ml: "നെഞ്ചെരിച്ചിൽ / അസിഡിറ്റി" },
  { en: "Morning fatigue", ml: "രാവിലെയുള്ള ക്ഷീണം" },
];

const MOOD_OPTIONS: { value: VitalRecord["mood"]; labelEn: string; labelMl: string }[] = [
  { value: "Great", labelEn: "Great", labelMl: "വളരെ നല്ലത്" },
  { value: "Calm", labelEn: "Calm", labelMl: "ശാന്തം" },
  { value: "Tired", labelEn: "Tired", labelMl: "ക്ഷീണം" },
  { value: "Anxious", labelEn: "Anxious", labelMl: "ഉത്കണ്ഠ" },
  { value: "Unwell", labelEn: "Unwell", labelMl: "അസ്വസ്ഥത" },
];

type DateFilterType = "all" | "7d" | "30d" | "user_only";

export function TrackerScreen() {
  const {
    profile,
    stats,
    language,
    vitals,
    addVital,
    updateVital,
    deleteVital,
    supplements,
    toggleSupplement,
    appointments,
    addAppointment,
    toggleAppointmentReminder,
    showSampleData,
    setShowSampleData,
    setActiveTab,
  } = useMaterna();

  const isMl = language === "ml";
  const drawerRef = useRef<HTMLFormElement>(null);
  const sysInputRef = useRef<HTMLInputElement>(null);

  // Form states
  const [editingId, setEditingId] = useState<string | null>(null);
  const [date, setDate] = useState<string>(
    toLocalIsoDateString(new Date())
  );
  const [systolic, setSystolic] = useState<string>("118");
  const [diastolic, setDiastolic] = useState<string>("76");
  const [weightKg, setWeightKg] = useState<string>("64.2");
  const [fastingSugar, setFastingSugar] = useState<string>("88");
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([
    "Mild ankle puffiness",
  ]);
  const [mood, setMood] = useState<VitalRecord["mood"]>("Great");
  const [sleepHours, setSleepHours] = useState<string>("7.5");
  const [notes, setNotes] = useState<string>(
    "Feeling energetic, mild ankle puffiness..."
  );
  const [formError, setFormError] = useState<string>("");
  const [saveToast, setSaveToast] = useState<boolean>(false);

  // History filter state
  const [dateFilter, setDateFilter] = useState<DateFilterType>("all");
  const [showLabModal, setShowLabModal] = useState<boolean>(false);
  const [showNewVisitForm, setShowNewVisitForm] = useState<boolean>(false);
  const [visitDate, setVisitDate] = useState<string>(
    toLocalIsoDateString(new Date())
  );
  const [visitPurpose, setVisitPurpose] = useState<string>(
    "OGTT Glucose Screening & Growth Check"
  );

  const numSys = parseFloat(systolic) || 0;
  const numDia = parseFloat(diastolic) || 0;
  const numWt = parseFloat(weightKg) || 0;
  const numSugar = parseFloat(fastingSugar) || 0;

  // Deterministic clinical threshold check
  const isBpElevated = numSys >= 130 || numDia >= 85;
  const isBpCritical = numSys >= 140 || numDia >= 90;
  const isSugarElevated = numSugar > 95 || (numSugar > 0 && numSugar < 65);
  const isAllWithinRange = !isBpElevated && !isSugarElevated;

  const weightGainDiff = (numWt - profile.baselineWeightKg).toFixed(1);
  const weightGainSign =
    parseFloat(weightGainDiff) >= 0 ? `+${weightGainDiff}` : weightGainDiff;

  const toggleSymptomSelection = (sym: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(sym) ? prev.filter((s) => s !== sym) : [...prev, sym]
    );
  };

  const handleFocusDrawer = () => {
    drawerRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    setTimeout(() => sysInputRef.current?.focus(), 300);
  };

  const handleSaveRecord = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (numSys < 70 || numSys > 240 || numDia < 40 || numDia > 150) {
      setFormError(
        isMl
          ? "സാധുവായ രക്തസമ്മർദ്ദ അളവുകൾ നൽകുക (സിസ്റ്റോളിക് 70–240 mmHg, ഡയസ്റ്റോളിക് 40–150 mmHg)."
          : "Please enter valid Blood Pressure values (Systolic 70–240 mmHg, Diastolic 40–150 mmHg)."
      );
      return;
    }
    if (numWt < 30 || numWt > 180) {
      setFormError(
        isMl
          ? "30 കിലോയ്ക്കും 180 കിലോയ്ക്കും ഇടയിലുള്ള ശരിയായ ശരീരഭാരം നൽകുക."
          : "Please enter a valid maternal weight between 30 and 180 kg."
      );
      return;
    }
    if (numSugar < 40 || numSugar > 400) {
      setFormError(
        isMl
          ? "സാധുവായ ഫാസ്റ്റിംഗ് ബ്ലഡ് ഷുഗർ അളവ് നൽകുക (40–400 mg/dL)."
          : "Please enter a valid fasting blood glucose level (40–400 mg/dL)."
      );
      return;
    }

    const payload = {
      date,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      week: stats.currentWeek,
      systolic: numSys,
      diastolic: numDia,
      weightKg: numWt,
      fastingSugar: numSugar,
      symptoms: selectedSymptoms,
      mood,
      sleepHours: parseFloat(sleepHours) || 7.5,
      notes: notes.trim() || "Routine home check logged.",
    };

    if (editingId) {
      updateVital(editingId, payload);
      setEditingId(null);
    } else {
      addVital(payload);
    }

    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 3200);
  };

  const handleEditRecord = (rec: VitalRecord) => {
    setEditingId(rec.id);
    setDate(rec.date);
    setSystolic(String(rec.systolic));
    setDiastolic(String(rec.diastolic));
    setWeightKg(String(rec.weightKg));
    setFastingSugar(String(rec.fastingSugar));
    setSelectedSymptoms(rec.symptoms || []);
    setMood(rec.mood || "Calm");
    setSleepHours(String(rec.sleepHours || 7.5));
    setNotes(rec.notes || "");
    handleFocusDrawer();
  };

  const handleAddVisit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!visitPurpose.trim()) return;
    addAppointment({
      doctorName: profile.doctorName,
      specialty: profile.doctorTitle,
      facility: profile.doctorHospital,
      date: visitDate,
      time: "10:30 AM",
      purposeEn: visitPurpose.trim(),
      purposeMl: visitPurpose.trim(),
      status: "upcoming",
      reminderSet: true,
    });
    setShowNewVisitForm(false);
  };

  // Sort vitals chronologically for charts
  const sortedForCharts = [...vitals].sort((a, b) =>
    a.date.localeCompare(b.date)
  );
  const chartData = sortedForCharts.map((v) => ({
    label: `W${v.week}`,
    date: formatDisplayDate(v.date),
    weightKg: v.weightKg,
    systolic: v.systolic,
    diastolic: v.diastolic,
    fastingSugar: v.fastingSugar,
  }));

  // Filtered vitals for History list (newest first)
  const nowMs = Date.now();
  const filteredHistory = [...vitals]
    .filter((v) => {
      if (dateFilter === "user_only") return !v.isSample;
      if (dateFilter === "7d") {
        const diff =
          (nowMs - parseLocalDate(v.date).getTime()) /
          (1000 * 3600 * 24);
        return diff <= 7;
      }
      if (dateFilter === "30d") {
        const diff =
          (nowMs - parseLocalDate(v.date).getTime()) /
          (1000 * 3600 * 24);
        return diff <= 30;
      }
      return true;
    })
    .sort((a, b) => b.date.localeCompare(a.date));

  const takenCount = supplements.filter((s) => s.taken).length;
  const medsPct = Math.round((takenCount / supplements.length) * 100);

  const upcomingVisits = appointments.filter((a) => a.status === "upcoming");
  const completedVisits = appointments.filter((a) => a.status === "completed");

  const translateSymptom = (symEn: string) => {
    if (!isMl) return symEn;
    const match = COMMON_SYMPTOMS.find((s) => s.en === symEn);
    return match ? match.ml : symEn;
  };

  const translateMood = (mVal: VitalRecord["mood"]) => {
    if (!isMl) return mVal;
    const match = MOOD_OPTIONS.find((m) => m.value === mVal);
    return match ? match.labelMl : mVal;
  };

  return (
    <main className="flex flex-col relative w-full pt-16 pb-28 min-h-screen max-w-lg mx-auto">
      <div className="px-4 flex flex-col gap-4 pt-3 pb-6">
        {/* Apple Health Section Title */}
        <div className="flex items-baseline justify-between pt-1 px-1">
          <div>
            <span className="text-[12px] font-semibold text-[#8E8E93] uppercase tracking-wider">
              {isMl ? "മാതൃ ആരോഗ്യ ട്രാക്കർ" : "Maternal Health"}
            </span>
            <h1 className="text-[28px] font-bold tracking-tight text-[#1C1C1E] leading-tight">
              {isMl ? "വൈറ്റൽസ് & സംഗ്രഹം" : "Vitals & Summary"}
            </h1>
          </div>
          <span className="text-[13px] font-medium text-[#007AFF] bg-[#007AFF]/10 px-2.5 py-0.5 rounded-full">
            {isMl ? `ആഴ്ച ${stats.currentWeek}` : `Week ${stats.currentWeek}`}
          </span>
        </div>

        {/* Clinical Disclaimer Notice (iOS Callout Banner) */}
        <div className="bg-white/80 border border-black/5 rounded-2xl p-3.5 flex items-start gap-3 shadow-[0_1px_2px_rgba(0,0,0,0.03)] backdrop-blur-sm">
          <div className="w-7 h-7 rounded-full bg-[#007AFF]/10 flex items-center justify-center shrink-0 mt-0.5 text-[#007AFF]">
            <span
              className="material-symbols-outlined text-[17px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              verified_user
            </span>
          </div>
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center gap-1.5">
              <span className="text-[13px] font-semibold text-[#1C1C1E]">
                {isMl ? "മെഡിക്കൽ മാർഗ്ഗനിർദ്ദേശം" : "Clinical Advisory"}
              </span>
            </div>
            <p className="text-[12px] text-[#636366] leading-relaxed">
              {isMl
                ? "ഇതിലെ കണക്കുകൂട്ടലുകളും വിവരങ്ങളും അറിവിലേക്ക് മാത്രമുള്ളതാണ്. ഇത് ഡോക്ടറുടെ നേരിട്ടുള്ള പരിശോധനയ്ക്ക് പകരമല്ല."
                : "Estimates and guidance are for informational purposes only and do not replace formal clinical consultation with your obstetrician."}
            </p>
          </div>
        </div>

        {/* Action Button: Log New Vitals */}
        <button
          onClick={handleFocusDrawer}
          className="w-full bg-[#007AFF] hover:bg-[#0064D2] text-white py-3 px-4 rounded-2xl flex items-center justify-between shadow-sm active:scale-[0.99] transition-all group"
          type="button"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">add</span>
            </div>
            <div className="flex flex-col text-left">
              <span className="text-[15px] font-semibold leading-tight">
                {editingId
                  ? isMl
                    ? "വൈറ്റൽസ് രേഖ പുതുക്കുക"
                    : "Update Vital Record"
                  : isMl
                  ? "പുതിയ വൈറ്റൽസ് രേഖപ്പെടുത്തുക"
                  : "Log New Vitals"}
              </span>
              <span className="text-[11px] text-white/80 leading-none mt-0.5">
                {isMl
                  ? "ബി.പി, ഭാരം, ഫാസ്റ്റിംഗ് ഷുഗർ"
                  : "Blood Pressure, Weight & Fasting Glucose"}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-white/80 text-[13px] font-medium">
            <span>{isMl ? "ചേർക്കുക" : "Record"}</span>
            <span className="material-symbols-outlined text-[18px]">
              chevron_right
            </span>
          </div>
        </button>

        {/* Vitals Entry & Live Metrics (Apple Health Summary Style) */}
        <form
          ref={drawerRef}
          onSubmit={handleSaveRecord}
          className="ios-card p-4 flex flex-col gap-4"
        >
          <div className="flex items-center justify-between border-b border-black/5 pb-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#FF2D55]/10 text-[#FF2D55] flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">
                  monitor_heart
                </span>
              </div>
              <div>
                <h2 className="text-[16px] font-bold text-[#1C1C1E]">
                  {editingId
                    ? isMl
                      ? "വൈറ്റൽസ് തിരുത്തുക"
                      : "Edit Maternal Record"
                    : isMl
                    ? "മാതൃ ആരോഗ്യ അളവുകൾ"
                    : "Record Maternal Metrics"}
                </h2>
                <p className="text-[11px] text-[#8E8E93]">
                  {isMl
                    ? `ആഴ്ച ${stats.currentWeek} • തത്സമയ രേഖ`
                    : `Week ${stats.currentWeek} • Live Clinical Entry`}
                </p>
              </div>
            </div>

            {/* Apple Health Dynamic Range Pill */}
            {isAllWithinRange ? (
              <span className="px-2.5 py-1 rounded-full bg-[#34C759]/15 text-[#248A3D] text-[11px] font-semibold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#34C759] animate-pulse" />
                {isMl ? "സാധാരണ നില" : "Normal Range"}
              </span>
            ) : (
              <span className="px-2.5 py-1 rounded-full bg-[#FF3B30]/15 text-[#FF3B30] text-[11px] font-bold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF3B30] animate-ping" />
                {isMl ? "ഉയർന്ന അളവ്" : "Elevated Reading"}
              </span>
            )}
          </div>

          {/* Apple Health Vitals 2x2 Metric Cards Grid */}
          <div className="grid grid-cols-2 gap-3">
            {/* BP Systolic */}
            <div className="bg-[#F2F2F7] p-3 rounded-xl flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-[#8E8E93] uppercase tracking-wide">
                  {isMl ? "സിസ്റ്റോളിക് ബി.പി" : "Systolic BP"}
                </span>
                <span
                  className={`text-[10px] font-semibold ${
                    numSys >= 130 ? "text-[#FF3B30]" : "text-[#34C759]"
                  }`}
                >
                  &lt; 130
                </span>
              </div>
              <div className="flex items-baseline gap-1 mt-1">
                <input
                  ref={sysInputRef}
                  className="w-full bg-white rounded-lg px-2 py-1 text-[24px] font-bold text-[#1C1C1E] border border-black/5 shadow-inner focus:outline-none focus:ring-2 focus:ring-[#007AFF]"
                  type="number"
                  value={systolic}
                  onChange={(e) => setSystolic(e.target.value)}
                />
                <span className="text-[12px] font-semibold text-[#8E8E93]">
                  mmHg
                </span>
              </div>
              <span className="text-[10px] text-[#636366] mt-1 font-medium">
                {numSys >= 140
                  ? isMl
                    ? "ഉയർന്ന ബി.പി — ഡോക്ടറെ കാണുക"
                    : "High — Consult OB-GYN"
                  : numSys >= 130
                  ? isMl
                    ? "അല്പം കൂടുതലാണ്"
                    : "Borderline systolic"
                  : isMl
                  ? "സാധാരണ നില"
                  : "Optimal systolic"}
              </span>
            </div>

            {/* BP Diastolic */}
            <div className="bg-[#F2F2F7] p-3 rounded-xl flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-[#8E8E93] uppercase tracking-wide">
                  {isMl ? "ഡയസ്റ്റോളിക് ബി.പി" : "Diastolic BP"}
                </span>
                <span
                  className={`text-[10px] font-semibold ${
                    numDia >= 85 ? "text-[#FF3B30]" : "text-[#34C759]"
                  }`}
                >
                  &lt; 85
                </span>
              </div>
              <div className="flex items-baseline gap-1 mt-1">
                <input
                  className="w-full bg-white rounded-lg px-2 py-1 text-[24px] font-bold text-[#1C1C1E] border border-black/5 shadow-inner focus:outline-none focus:ring-2 focus:ring-[#007AFF]"
                  type="number"
                  value={diastolic}
                  onChange={(e) => setDiastolic(e.target.value)}
                />
                <span className="text-[12px] font-semibold text-[#8E8E93]">
                  mmHg
                </span>
              </div>
              <span className="text-[10px] text-[#636366] mt-1 font-medium">
                {numDia >= 90
                  ? isMl
                    ? "ഉയർന്ന ബി.പി — ഡോക്ടറെ കാണുക"
                    : "High — Consult OB-GYN"
                  : numDia >= 85
                  ? isMl
                    ? "അല്പം കൂടുതലാണ്"
                    : "Borderline diastolic"
                  : isMl
                  ? "സാധാരണ നില"
                  : "Target in range"}
              </span>
            </div>

            {/* Weight */}
            <div className="bg-[#F2F2F7] p-3 rounded-xl flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-[#8E8E93] uppercase tracking-wide">
                  {isMl ? "ശരീരഭാരം" : "Weight"}
                </span>
                <span className="text-[10px] text-[#007AFF] font-semibold">
                  {weightGainSign} kg
                </span>
              </div>
              <div className="flex items-baseline gap-1 mt-1">
                <input
                  className="w-full bg-white rounded-lg px-2 py-1 text-[24px] font-bold text-[#1C1C1E] border border-black/5 shadow-inner focus:outline-none focus:ring-2 focus:ring-[#007AFF]"
                  step="0.1"
                  type="number"
                  value={weightKg}
                  onChange={(e) => setWeightKg(e.target.value)}
                />
                <span className="text-[12px] font-semibold text-[#8E8E93]">
                  kg
                </span>
              </div>
              <span className="text-[10px] text-[#636366] mt-1 font-medium">
                {isMl
                  ? `ആദ്യ ഭാരം: ${profile.baselineWeightKg} kg`
                  : `From ${profile.baselineWeightKg} kg baseline`}
              </span>
            </div>

            {/* Blood Glucose */}
            <div className="bg-[#F2F2F7] p-3 rounded-xl flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-[#8E8E93] uppercase tracking-wide">
                  {isMl ? "ഫാസ്റ്റിംഗ് ഷുഗർ" : "Fasting Sugar"}
                </span>
                <span
                  className={`text-[10px] font-semibold ${
                    isSugarElevated ? "text-[#FF9500]" : "text-[#34C759]"
                  }`}
                >
                  70–95
                </span>
              </div>
              <div className="flex items-baseline gap-1 mt-1">
                <input
                  className="w-full bg-white rounded-lg px-2 py-1 text-[24px] font-bold text-[#1C1C1E] border border-black/5 shadow-inner focus:outline-none focus:ring-2 focus:ring-[#007AFF]"
                  type="number"
                  value={fastingSugar}
                  onChange={(e) => setFastingSugar(e.target.value)}
                />
                <span className="text-[12px] font-semibold text-[#8E8E93]">
                  mg/dL
                </span>
              </div>
              <span className="text-[10px] text-[#636366] mt-1 font-medium">
                {numSugar > 95
                  ? isMl
                    ? "സാധാരണ അളവിലും കൂടുതൽ (>95)"
                    : "Above GDM target (95)"
                  : isMl
                  ? "സാധാരണ നില"
                  : "Optimal fasting"}
              </span>
            </div>
          </div>

          {/* Date, Mood & Sleep Hours Row */}
          <div className="grid grid-cols-3 gap-2.5">
            <div className="bg-[#F2F2F7] p-2.5 rounded-xl flex flex-col gap-1">
              <label className="text-[10.5px] font-semibold text-[#8E8E93] uppercase">
                {isMl ? "തീയതി" : "Log Date"}
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="bg-white rounded-lg px-2 py-1.5 text-[12px] font-semibold text-[#1C1C1E] border border-black/5 focus:outline-none"
              />
            </div>
            <div className="bg-[#F2F2F7] p-2.5 rounded-xl flex flex-col gap-1">
              <label className="text-[10.5px] font-semibold text-[#8E8E93] uppercase">
                {isMl ? "മാനസികാവസ്ഥ" : "Mood"}
              </label>
              <select
                value={mood}
                onChange={(e) =>
                  setMood(e.target.value as VitalRecord["mood"])
                }
                className="bg-white rounded-lg px-2 py-1.5 text-[12px] font-semibold text-[#1C1C1E] border border-black/5 focus:outline-none"
              >
                {MOOD_OPTIONS.map((m) => (
                  <option key={m.value} value={m.value}>
                    {isMl ? m.labelMl : m.labelEn}
                  </option>
                ))}
              </select>
            </div>
            <div className="bg-[#F2F2F7] p-2.5 rounded-xl flex flex-col gap-1">
              <label className="text-[10.5px] font-semibold text-[#8E8E93] uppercase">
                {isMl ? "ഉറക്കം (മണിക്കൂർ)" : "Sleep (hrs)"}
              </label>
              <input
                type="number"
                step="0.5"
                min="1"
                max="16"
                value={sleepHours}
                onChange={(e) => setSleepHours(e.target.value)}
                className="bg-white rounded-lg px-2 py-1.5 text-[12.5px] font-bold text-[#1C1C1E] border border-black/5 focus:outline-none"
              />
            </div>
          </div>

          {/* Symptoms Quick Pills */}
          <div className="bg-[#F2F2F7] p-3 rounded-xl flex flex-col gap-2">
            <span className="text-[11px] font-semibold text-[#8E8E93] uppercase tracking-wide">
              {isMl ? "ശാരീരിക ലക്ഷണങ്ങൾ" : "Symptoms Observed"}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {COMMON_SYMPTOMS.map((sym) => {
                const active = selectedSymptoms.includes(sym.en);
                return (
                  <button
                    key={sym.en}
                    type="button"
                    onClick={() => toggleSymptomSelection(sym.en)}
                    className={`px-2.5 py-1 rounded-full text-[11.5px] font-semibold transition-all ${
                      active
                        ? "bg-[#007AFF] text-white shadow-2xs"
                        : "bg-white text-[#636366] border border-black/5 hover:text-black"
                    }`}
                  >
                    {isMl ? sym.ml : sym.en}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Clinical Notes */}
          <div className="bg-[#F2F2F7] p-3 rounded-xl flex flex-col gap-1.5">
            <label className="text-[11px] font-semibold text-[#8E8E93] uppercase tracking-wide">
              {isMl
                ? "ആരോഗ്യ കുറിപ്പുകൾ & ലക്ഷണങ്ങൾ"
                : "Clinical Notes, Symptoms & Mood"}
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full bg-white border border-black/5 rounded-lg p-2.5 text-[13px] text-[#1C1C1E] focus:outline-none focus:ring-2 focus:ring-[#007AFF] resize-none"
              placeholder={
                isMl
                  ? "ശാരീരിക അവസ്ഥയോ കുറിപ്പുകളോ ഇവിടെ രേഖപ്പെടുത്താം..."
                  : "Feeling energetic, mild ankle puffiness..."
              }
              rows={2}
            />
          </div>

          {/* Deterministic Pre-eclampsia / Hypertension Alert if BP >= 140/90 */}
          {isBpCritical && (
            <div className="bg-[#FFECEB] border border-[#FF3B30] rounded-xl p-3 flex items-center justify-between gap-2">
              <div className="text-[12px] text-[#93000A]">
                <strong className="font-bold block">
                  {isMl
                    ? "ബി.പി ≥ 140/90 mmHg കണ്ടെത്തി"
                    : "BP ≥ 140/90 mmHg Detected"}
                </strong>
                <span>
                  {isMl
                    ? "ഗർഭകാലത്തെ ഉയർന്ന രക്തസമ്മർദ്ദത്തിന് ഉടൻ ഡോക്ടറുടെ പരിശോധന ആവശ്യമാണ്. അപകട ലക്ഷണങ്ങൾ പരിശോധിക്കുക."
                    : "High blood pressure in pregnancy requires prompt clinical review. Check for danger signs immediately."}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setActiveTab("safety")}
                className="shrink-0 px-3 py-1.5 rounded-xl bg-[#FF3B30] text-white text-[11.5px] font-bold"
              >
                {isMl ? "സുരക്ഷാ പരിശോധന" : "Safety Triage"}
              </button>
            </div>
          )}

          {formError && (
            <div className="bg-[#FFECEB] text-[#FF3B30] text-[12px] font-semibold p-2.5 rounded-xl">
              {formError}
            </div>
          )}

          {/* Action / Confirmation Row */}
          <div className="flex items-center justify-between pt-1">
            <div
              className={`flex items-center gap-1.5 ${
                isAllWithinRange ? "text-[#34C759]" : "text-[#FF9500]"
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">
                {isAllWithinRange ? "check_circle" : "info"}
              </span>
              <span className="text-[12px] font-semibold">
                {isAllWithinRange
                  ? isMl
                    ? "സുരക്ഷിതമായ അളവുകൾ"
                    : "Safe threshold confirmed"
                  : isMl
                  ? "ഉയർന്ന അളവ് ശ്രദ്ധിക്കുക"
                  : "Review elevated value"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              {editingId && (
                <button
                  type="button"
                  onClick={() => setEditingId(null)}
                  className="bg-[#E5E5EA] text-[#1C1C1E] text-[13px] font-semibold px-3.5 py-2 rounded-xl"
                >
                  {isMl ? "റദ്ദാക്കുക" : "Cancel"}
                </button>
              )}
              <button
                className="bg-[#007AFF] hover:bg-[#0064D2] text-white text-[14px] font-semibold px-5 py-2 rounded-xl shadow-sm transition-transform active:scale-95"
                type="submit"
              >
                {editingId
                  ? isMl
                    ? "പുതുക്കുക"
                    : "Update Record"
                  : isMl
                  ? "സേവ് ചെയ്യുക"
                  : "Save Record"}
              </button>
            </div>
          </div>

          {saveToast && (
            <div className="text-[12px] text-[#1C1C1E] bg-[#34C759]/15 border border-[#34C759]/30 p-2.5 rounded-xl text-center font-medium">
              {isMl
                ? "✓ വൈറ്റൽസ് വിവരങ്ങൾ മാതൃ-ശിശു ട്രാക്കിംഗ് സിസ്റ്റത്തിൽ (MCTS) രേഖപ്പെടുത്തി!"
                : "✓ Vitals recorded to Mother & Child Tracking System (MCTS)!"}
            </div>
          )}
        </form>

        {/* Health Trends Section: Gestational Trajectory & Apple Health Charts */}
        <div className="ios-card p-4 flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-black/5 pb-2.5">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#5856D6]/10 text-[#5856D6] flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">
                  show_chart
                </span>
              </div>
              <div>
                <span className="text-[16px] font-bold text-[#1C1C1E]">
                  {isMl
                    ? "ഗർഭകാല ആരോഗ്യ പുരോഗതി"
                    : "Gestational Trajectory"}
                </span>
                <p className="text-[11px] text-[#8E8E93]">
                  {isMl
                    ? "ശരീരഭാരവും രക്തസമ്മർദ്ദ ഗ്രാഫും"
                    : "Weight Gain & Blood Pressure Safe Zones"}
                </p>
              </div>
            </div>
            <span className="text-[12px] font-semibold text-[#8E8E93] bg-[#F2F2F7] px-2 py-0.5 rounded-md">
              {chartData.length > 0
                ? `${chartData[0].label} – ${
                    chartData[chartData.length - 1].label
                  }`
                : isMl
                ? "ഡാറ്റ ഇല്ല"
                : "No Data"}
            </span>
          </div>

          {/* Weight Gain Curve Apple Health Chart (Recharts) */}
          <div className="flex flex-col gap-2">
            <div className="flex items-baseline justify-between">
              <div className="flex items-center gap-1.5">
                <span className="text-[13px] font-semibold text-[#1C1C1E]">
                  {isMl ? "ശരീരഭാര ഗ്രാഫ്" : "Weight Trajectory"}
                </span>
                <span className="text-[12px] font-bold text-[#007AFF]">
                  {weightGainSign} kg
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1 text-[11px] text-[#8E8E93] font-medium">
                  <span className="w-2.5 h-1.5 rounded-full bg-[#007AFF]" />{" "}
                  {isMl
                    ? `രേഖകൾ (${chartData.length})`
                    : `Patient (${chartData.length} logs)`}
                </span>
              </div>
            </div>
            <div className="w-full h-36 bg-[#F2F2F7] rounded-xl p-2 relative">
              {chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={chartData}
                    margin={{ top: 8, right: 10, left: -24, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient
                        id="weightBlueFill"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#007AFF"
                          stopOpacity={0.28}
                        />
                        <stop
                          offset="95%"
                          stopColor="#007AFF"
                          stopOpacity={0.02}
                        />
                      </linearGradient>
                    </defs>
                    <XAxis
                      dataKey="label"
                      tick={{ fontSize: 10, fill: "#8E8E93" }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      domain={["dataMin - 2", "dataMax + 2"]}
                      tick={{ fontSize: 10, fill: "#8E8E93" }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip
                      contentStyle={{
                        borderRadius: "12px",
                        border: "none",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                        fontSize: "12px",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="weightKg"
                      name="Weight (kg)"
                      stroke="#007AFF"
                      strokeWidth={2.5}
                      fill="url(#weightBlueFill)"
                      dot={{ r: 3.5, fill: "#007AFF" }}
                      activeDot={{ r: 5 }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-[12px] text-[#8E8E93]">
                  {isMl
                    ? "ഗ്രാഫ് കാണുന്നതിനായി മുകളിൽ വൈറ്റൽസ് രേഖപ്പെടുത്തുക."
                    : "Log a vital record above to render weight trajectory."}
                </div>
              )}
            </div>
          </div>

          {/* Blood Pressure Trend Chart (Recharts) */}
          <div className="flex flex-col gap-2 pt-2 border-t border-black/5">
            <div className="flex items-center justify-between">
              <span className="text-[13px] font-semibold text-[#1C1C1E]">
                {isMl
                  ? "രക്തസമ്മർദ്ദ പരിധി (<130/85)"
                  : "Blood Pressure Range (<130/85)"}
              </span>
              <span
                className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                  isBpElevated
                    ? "bg-[#FF3B30]/15 text-[#FF3B30]"
                    : "bg-[#34C759]/10 text-[#34C759]"
                }`}
              >
                {isBpElevated
                  ? isMl
                    ? "ബി.പി ശ്രദ്ധിക്കുക"
                    : "Monitor BP"
                  : isMl
                  ? "സാധാരണ ബി.പി"
                  : "Normotensive"}
              </span>
            </div>
            <div className="w-full h-36 bg-[#F2F2F7] rounded-xl p-2 relative">
              {chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={chartData}
                    margin={{ top: 10, right: 10, left: -24, bottom: 0 }}
                  >
                    <XAxis
                      dataKey="label"
                      tick={{ fontSize: 10, fill: "#8E8E93" }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      domain={[60, 145]}
                      tick={{ fontSize: 10, fill: "#8E8E93" }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip
                      contentStyle={{
                        borderRadius: "12px",
                        border: "none",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                        fontSize: "12px",
                      }}
                    />
                    <ReferenceLine
                      y={130}
                      stroke="#FF3B30"
                      strokeDasharray="3 3"
                      label={{
                        value: isMl ? "ഉയർന്ന പരിധി (130)" : "Pre-Eclampsia Limit (130)",
                        position: "insideTopLeft",
                        fill: "#FF3B30",
                        fontSize: 9,
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="systolic"
                      name="Systolic (mmHg)"
                      stroke="#FF2D55"
                      strokeWidth={2.5}
                      dot={{ r: 3.5, fill: "#FF2D55" }}
                    />
                    <Line
                      type="monotone"
                      dataKey="diastolic"
                      name="Diastolic (mmHg)"
                      stroke="#5856D6"
                      strokeWidth={2.5}
                      dot={{ r: 3.5, fill: "#5856D6" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-[12px] text-[#8E8E93]">
                  {isMl
                    ? "ബി.പി ഗ്രാഫ് കാണാൻ വൈറ്റൽസ് രേഖപ്പെടുത്തുക."
                    : "Log a vital record above to render BP curves."}
                </div>
              )}
            </div>
            <div className="flex justify-between items-center text-[11px] font-medium text-[#8E8E93] px-1">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#FF2D55]" />{" "}
                {isMl ? `സിസ്റ്റോളിക് (${systolic})` : `Systolic (${systolic})`}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#5856D6]" />{" "}
                {isMl
                  ? `ഡയസ്റ്റോളിക് (${diastolic})`
                  : `Diastolic (${diastolic})`}
              </span>
              <span className="text-[#34C759] font-semibold">
                {isMl ? "സുരക്ഷിത പരിധി" : "Safe Margin"}
              </span>
            </div>
          </div>
        </div>

        {/* Recorded Vitals History List with Date Filters & Sample Data Toggle */}
        <div className="ios-card p-4 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-[16px] font-bold text-[#1C1C1E]">
                {isMl ? "രേഖപ്പെടുത്തിയ വൈറ്റൽസ് ലോഗ്" : "Recorded Vitals Log"}
              </h3>
              <p className="text-[11px] text-[#8E8E93]">
                {isMl
                  ? "രേഖകൾ തിരുത്താം അല്ലെങ്കിൽ ഒഴിവാക്കാം"
                  : "Edit or remove entries • Sample vs User data clearly badged"}
              </p>
            </div>
            <label className="flex items-center gap-1.5 text-[11px] font-semibold text-[#636366] cursor-pointer">
              <input
                type="checkbox"
                checked={showSampleData}
                onChange={(e) => setShowSampleData(e.target.checked)}
                className="accent-[#007AFF] rounded"
              />
              <span>{isMl ? "ഡെമോ രേഖകൾ" : "Show Demo Logs"}</span>
            </label>
          </div>

          {/* Date Filters */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {(
              [
                { id: "all", labelEn: "All Records", labelMl: "എല്ലാം" },
                { id: "7d", labelEn: "Last 7 Days", labelMl: "കഴിഞ്ഞ 7 ദിവസം" },
                { id: "30d", labelEn: "Last 30 Days", labelMl: "കഴിഞ്ഞ 30 ദിവസം" },
                { id: "user_only", labelEn: "My Entries Only", labelMl: "എന്റെ രേഖകൾ മാത്രം" },
              ] as { id: DateFilterType; labelEn: string; labelMl: string }[]
            ).map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setDateFilter(f.id)}
                className={`px-3 py-1 rounded-full text-[11.5px] font-semibold whitespace-nowrap transition-all ${
                  dateFilter === f.id
                    ? "bg-[#007AFF] text-white"
                    : "bg-[#F2F2F7] text-[#636366] hover:text-black"
                }`}
              >
                {isMl ? f.labelMl : f.labelEn}
              </button>
            ))}
          </div>

          {/* List of entries */}
          <div className="flex flex-col gap-2.5 max-h-96 overflow-y-auto pr-0.5">
            {filteredHistory.length === 0 ? (
              <div className="p-6 text-center bg-[#F2F2F7] rounded-2xl text-[12.5px] text-[#8E8E93]">
                {isMl
                  ? "ഈ ഫിൽട്ടറിൽ രേഖകളൊന്നുമില്ല. പുതിയ വൈറ്റൽസ് മുകളിൽ ചേർക്കുക."
                  : "No records match this filter. Log a new entry above or enable Demo Logs."}
              </div>
            ) : (
              filteredHistory.map((item) => (
                <div
                  key={item.id}
                  className="p-3 rounded-2xl bg-[#F2F2F7]/80 border border-black/[0.04] flex flex-col gap-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-md bg-[#007AFF]/10 text-[#007AFF] text-[11px] font-bold">
                        {isMl ? `ആഴ്ച ${item.week}` : `Week ${item.week}`}
                      </span>
                      <span className="text-[12.5px] font-bold text-[#1C1C1E]">
                        {formatDisplayDate(item.date)}
                      </span>
                      {item.isSample ? (
                        <span className="px-2 py-0.5 rounded-full bg-[#E5E5EA] text-[#636366] text-[10px] font-semibold">
                          {isMl ? "ഡെമോ" : "Sample Demo"}
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full bg-[#34C759]/15 text-[#248A3D] text-[10px] font-bold">
                          {isMl ? "നിങ്ങൾ ചേർത്തത്" : "User Logged"}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleEditRecord(item)}
                        className="text-[#007AFF] hover:bg-[#007AFF]/10 p-1 rounded-lg text-[11px] font-semibold flex items-center gap-0.5"
                      >
                        <span className="material-symbols-outlined text-[15px]">
                          edit
                        </span>
                        <span>{isMl ? "മാറ്റുക" : "Edit"}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteVital(item.id)}
                        className="text-[#FF3B30] hover:bg-[#FF3B30]/10 p-1 rounded-lg text-[11px] font-semibold flex items-center gap-0.5"
                      >
                        <span className="material-symbols-outlined text-[15px]">
                          delete
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Metrics Row */}
                  <div className="grid grid-cols-4 gap-1.5 bg-white p-2 rounded-xl border border-black/[0.03] text-center">
                    <div>
                      <span className="text-[10px] text-[#8E8E93] block">
                        {isMl ? "ബി.പി (mmHg)" : "BP (mmHg)"}
                      </span>
                      <span
                        className={`text-[12.5px] font-bold ${
                          item.systolic >= 130 || item.diastolic >= 85
                            ? "text-[#FF3B30]"
                            : "text-[#1C1C1E]"
                        }`}
                      >
                        {item.systolic}/{item.diastolic}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#8E8E93] block">
                        {isMl ? "ഭാരം" : "Weight"}
                      </span>
                      <span className="text-[12.5px] font-bold text-[#1C1C1E]">
                        {item.weightKg} kg
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#8E8E93] block">
                        {isMl ? "ഷുഗർ" : "Sugar"}
                      </span>
                      <span className="text-[12.5px] font-bold text-[#1C1C1E]">
                        {item.fastingSugar} mg/dL
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#8E8E93] block">
                        {isMl ? "മൂഡ്/ഉറക്കം" : "Mood/Sleep"}
                      </span>
                      <span className="text-[11.5px] font-semibold text-[#1C1C1E]">
                        {translateMood(item.mood)} • {item.sleepHours}h
                      </span>
                    </div>
                  </div>

                  {item.symptoms && item.symptoms.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {item.symptoms.map((s, i) => (
                        <span
                          key={i}
                          className="text-[10.5px] bg-white px-2 py-0.5 rounded-md text-[#636366] border border-black/5"
                        >
                          {translateSymptom(s)}
                        </span>
                      ))}
                    </div>
                  )}

                  {item.notes && (
                    <p className="text-[12px] text-[#636366] leading-snug">
                      {item.notes}
                    </p>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Antenatal Care Visits: iOS Inset Grouped Section */}
        <div className="ios-card overflow-hidden">
          <div className="p-4 border-b border-black/5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#34C759]/10 text-[#34C759] flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">
                  calendar_today
                </span>
              </div>
              <div>
                <h3 className="text-[16px] font-bold text-[#1C1C1E]">
                  {isMl ? "ഡോക്ടർ സന്ദർശനങ്ങൾ (ANC)" : "Antenatal Care Visits"}
                </h3>
                <p className="text-[11px] text-[#8E8E93]">
                  {isMl
                    ? "തായ് കാർഡ് (MCP Card) രേഖകൾ"
                    : "Mother & Child Protection (MCP) Card Sync"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setShowNewVisitForm((prev) => !prev)}
                className="bg-[#007AFF]/10 text-[#007AFF] px-2.5 py-0.5 rounded-full text-[11px] font-bold"
              >
                {isMl ? "+ സന്ദർശനം" : "+ Add Visit"}
              </button>
              <span className="bg-[#34C759]/15 text-[#248A3D] px-2.5 py-0.5 rounded-full text-[11px] font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-[13px]">
                  sync
                </span>{" "}
                {isMl ? "സിങ്ക് ചെയ്തു" : "Synced"}
              </span>
            </div>
          </div>

          {showNewVisitForm && (
            <form
              onSubmit={handleAddVisit}
              className="p-3.5 bg-[#F2F2F7] border-b border-black/5 flex flex-col gap-2.5"
            >
              <span className="text-[11.5px] font-bold text-[#1C1C1E]">
                {isMl
                  ? "പുതിയ ഡോക്ടർ സന്ദർശനം ചേർക്കുക"
                  : "Schedule Antenatal Visit"}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input
                  type="date"
                  value={visitDate}
                  onChange={(e) => setVisitDate(e.target.value)}
                  className="bg-white rounded-xl px-3 py-1.5 text-[12.5px] font-semibold"
                />
                <input
                  type="text"
                  value={visitPurpose}
                  onChange={(e) => setVisitPurpose(e.target.value)}
                  placeholder={
                    isMl
                      ? "സന്ദർശന ആവശ്യം (ഉദാ: OGTT പരിശോധന)"
                      : "Purpose (e.g., OGTT Screen)"
                  }
                  className="bg-white rounded-xl px-3 py-1.5 text-[12.5px] font-semibold"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowNewVisitForm(false)}
                  className="text-[12px] font-semibold text-[#636366] px-3 py-1"
                >
                  {isMl ? "റദ്ദാക്കുക" : "Cancel"}
                </button>
                <button
                  type="submit"
                  className="bg-[#007AFF] text-white text-[12px] font-bold px-3.5 py-1 rounded-xl"
                >
                  {isMl ? "ചേർക്കുക" : "Add Visit"}
                </button>
              </div>
            </form>
          )}

          {/* Upcoming Consultation Highlight Items */}
          {upcomingVisits.map((apt) => (
            <div
              key={apt.id}
              className="p-4 bg-white flex flex-col gap-3 border-b border-black/5"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-[#007AFF]/10 flex items-center justify-center shrink-0 text-[#007AFF]">
                  <span className="material-symbols-outlined text-[22px]">
                    stethoscope
                  </span>
                </div>
                <div className="flex flex-col flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[15px] font-bold text-[#1C1C1E]">
                      {apt.doctorName}
                    </span>
                    <span className="bg-[#34C759]/15 text-[#248A3D] text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {isMl ? "സ്ഥിരീകരിച്ചു" : "Confirmed"}
                    </span>
                  </div>
                  <span className="text-[12px] text-[#636366] leading-tight">
                    {apt.specialty}
                  </span>
                  <span className="text-[11px] text-[#007AFF] font-medium mt-0.5">
                    {apt.facility}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between bg-[#F2F2F7] px-3 py-2 rounded-xl">
                <div className="flex items-center gap-1.5 text-[12px] font-semibold text-[#1C1C1E]">
                  <span className="material-symbols-outlined text-[#007AFF] text-[16px]">
                    event
                  </span>
                  <span>{formatDisplayDate(apt.date)}</span>
                  <span className="text-[#8E8E93]">•</span>
                  <span>{apt.time}</span>
                </div>
                <button
                  onClick={() => toggleAppointmentReminder(apt.id)}
                  className={`text-[12px] font-semibold flex items-center gap-1 transition-opacity ${
                    apt.reminderSet ? "text-[#34C759]" : "text-[#007AFF]"
                  }`}
                  type="button"
                >
                  <span className="material-symbols-outlined text-[15px]">
                    {apt.reminderSet
                      ? "notifications_active"
                      : "notifications"}
                  </span>
                  {apt.reminderSet
                    ? isMl
                      ? "റിമൈൻഡർ സജ്ജം ✓"
                      : "Reminder Set ✓"
                    : isMl
                    ? "ഓർമ്മിപ്പിക്കുക"
                    : "Remind"}
                </button>
              </div>
            </div>
          ))}

          {/* Previous Antenatal Reviews Inset Item */}
          {completedVisits.map((past) => (
            <div
              key={past.id}
              className="p-4 bg-[#F2F2F7]/50 flex flex-col gap-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#34C759] text-[18px]">
                    check_circle
                  </span>
                  <span className="text-[13px] font-bold text-[#1C1C1E]">
                    {isMl ? past.purposeMl : past.purposeEn}
                  </span>
                </div>
                <span className="text-[11px] font-medium text-[#8E8E93]">
                  {formatDisplayDate(past.date)}
                </span>
              </div>
              {past.notes && (
                <p className="text-[12px] text-[#636366] leading-relaxed pl-6">
                  {past.notes}
                </p>
              )}
              <div className="flex items-center justify-between bg-white border border-black/5 p-2 rounded-xl ml-6">
                <div className="flex items-center gap-2 text-[11px] text-[#1C1C1E]">
                  <span>
                    Hb: <strong>{past.hb || "11.8 g/dL"}</strong>
                  </span>
                  <span className="text-[#8E8E93]">•</span>
                  <span>
                    {isMl ? "മൂത്രപരിശോധന:" : "Urine:"}{" "}
                    <strong>{past.urine || "Nil"}</strong>
                  </span>
                </div>
                <button
                  onClick={() => setShowLabModal((prev) => !prev)}
                  className="flex items-center gap-1 text-[#007AFF] text-[11px] font-bold hover:underline"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[15px]">
                    description
                  </span>
                  <span>
                    {showLabModal
                      ? isMl
                        ? "റിപ്പോർട്ട് മറയ്ക്കുക"
                        : "Hide Report"
                      : isMl
                      ? "തായ് കാർഡ് ലാബ് റിപ്പോർട്ട്"
                      : "MCP Lab Report"}
                  </span>
                </button>
              </div>

              {showLabModal && (
                <div className="ml-6 mt-1 p-3 rounded-xl bg-white border border-[#007AFF]/20 text-[12px] flex flex-col gap-1">
                  <span className="font-bold text-[#007AFF]">
                    {isMl
                      ? "NHM കേരള തായ് കാർഡ് — സന്ദർശനം 3 ക്ലിനിക്കൽ റിപ്പോർട്ട്"
                      : "NHM Kerala MCP Card — Visit 3 Clinical Extract"}
                  </span>
                  <span>
                    •{" "}
                    <strong>
                      {isMl ? "ഹീമോഗ്ലോബിൻ:" : "Hemoglobin:"}
                    </strong>{" "}
                    11.8 g/dL (Normal ≥ 11.0 g/dL)
                  </span>
                  <span>
                    •{" "}
                    <strong>
                      {isMl
                        ? "മൂത്രത്തിലെ ആൽബുമിൻ / ഷുഗർ:"
                        : "Urine Albumin / Sugar:"}
                    </strong>{" "}
                    Nil / Nil
                  </span>
                  <span>
                    •{" "}
                    <strong>
                      {isMl
                        ? "അൾട്രാസൗണ്ട് അനോമലി സ്കാൻ:"
                        : "Ultrasound Anomaly Scan:"}
                    </strong>{" "}
                    {isMl
                      ? "കുഞ്ഞിന്റെ വളർച്ചയും ഹൃദയമിടിപ്പും (146 bpm) അമ്നിയോട്ടിക് ദ്രാവക അളവും (AFI 13.2 cm) സാധാരണ നിലയിലാണ്."
                      : "Single live intrauterine fetus, cephalic presentation, FHR 146 bpm, Placenta Posterior, AFI 13.2 cm."}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Prescribed Supplements: Apple iOS Inset Grouped List with Toggles */}
        <div className="ios-card overflow-hidden">
          <div className="p-4 border-b border-black/5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#FF9500]/10 text-[#FF9500] flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">
                  medication
                </span>
              </div>
              <div>
                <h3 className="text-[16px] font-bold text-[#1C1C1E]">
                  {isMl
                    ? "ദൈനംദിന ഗുളികകൾ (Supplements)"
                    : "Daily Prescribed Supplements"}
                </h3>
                <p className="text-[11px] text-[#8E8E93]">
                  {isMl
                    ? `പ്രതിദിന മരുന്നുകൾ • ${takenCount} / ${supplements.length} പൂർത്തിയായി`
                    : `${takenCount} of ${supplements.length} Daily Supplements Completed`}
                </p>
              </div>
            </div>
            <span className="text-[11px] font-bold bg-[#34C759]/15 text-[#248A3D] px-2.5 py-0.5 rounded-full">
              {medsPct}% {isMl ? "പൂർണ്ണം" : "Done"} {medsPct === 100 ? "✓" : ""}
            </span>
          </div>
          <div className="flex flex-col">
            {supplements.map((supp) => (
              <div
                key={supp.id}
                className="relative ios-inset-item px-4 py-3 flex items-center justify-between bg-white hover:bg-[#F2F2F7]/40 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                    style={{
                      backgroundColor: `${supp.color}18`,
                      color: supp.color,
                    }}
                  >
                    <span className="material-symbols-outlined text-[19px]">
                      {supp.icon}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[14px] font-semibold text-[#1C1C1E]">
                      {isMl ? supp.nameMl : supp.nameEn}
                    </span>
                    <span className="text-[11px] text-[#8E8E93]">
                      {isMl ? supp.scheduleMl : supp.dosageNoteEn}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => toggleSupplement(supp.id)}
                  type="button"
                  className={`px-3 py-1 rounded-full text-[12px] font-semibold flex items-center gap-1 transition-all ${
                    supp.taken
                      ? "bg-[#34C759] text-white shadow-sm"
                      : "bg-[#E5E5EA] text-[#1C1C1E] hover:bg-[#007AFF] hover:text-white"
                  }`}
                >
                  <span className="material-symbols-outlined text-[15px]">
                    {supp.taken ? "check" : "radio_button_unchecked"}
                  </span>
                  <span>
                    {supp.taken
                      ? isMl
                        ? "കഴിച്ചു"
                        : "Taken"
                      : isMl
                      ? "രേഖപ്പെടുത്തുക"
                      : "Mark Taken"}
                  </span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Community Health Worker / ASHA Connect Card (iOS Style Inset Tile) */}
        <div className="ios-card p-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#007AFF]/10 text-[#007AFF] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[22px]">
                support_agent
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-[14px] font-bold text-[#1C1C1E]">
                {isMl
                  ? `ആശാ വർക്കർ: ${profile.ashaName}`
                  : `ASHA Worker: ${profile.ashaName}`}
              </span>
              <span className="text-[12px] text-[#8E8E93]">
                {isMl
                  ? `${profile.ashaLocation} • എപ്പോഴും ബന്ധപ്പെടാം`
                  : `${profile.ashaLocation} • Always on-call`}
              </span>
            </div>
          </div>
          <a
            className="w-9 h-9 rounded-full bg-[#34C759] text-white flex items-center justify-center shadow-sm active:opacity-75 transition-opacity"
            href={`tel:${profile.ashaPhone}`}
          >
            <span className="material-symbols-outlined text-[19px]">call</span>
          </a>
        </div>
      </div>
    </main>
  );
}
