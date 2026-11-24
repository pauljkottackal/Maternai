"use client";

import React, { useState, useEffect } from "react";
import { useMaterna } from "@/lib/store";
import {
  DANGER_SIGNS_LIST,
  KERALA_DISTRICTS,
  KERALA_HOSPITALS,
} from "@/lib/keralaContent";

export function SafetyScreen() {
  const {
    profile,
    updateProfile,
    stats,
    language,
    checkedDangerSigns,
    toggleDangerSign,
    clearDangerSigns,
    setIsOnboardingOpen,
  } = useMaterna();

  const isMl = language === "ml";

  const [selectedDistrict, setSelectedDistrict] = useState<string>(
    profile.district || "tvm"
  );
  const [smsDispatched, setSmsDispatched] = useState<boolean>(false);

  useEffect(() => {
    if (profile.district) {
      setSelectedDistrict(profile.district);
    }
  }, [profile.district]);

  const anyDangerChecked = checkedDangerSigns.length > 0;

  const filteredHospitals = KERALA_HOSPITALS.filter(
    (h) => selectedDistrict === "all" || h.districtCode === selectedDistrict
  );

  const handleDistrictChange = (dist: string) => {
    setSelectedDistrict(dist);
    if (dist !== "all") {
      updateProfile({ district: dist });
    }
  };

  const handleSmsAlert = () => {
    setSmsDispatched(true);
    setTimeout(() => setSmsDispatched(false), 3500);
  };

  return (
    <main className="flex flex-col relative w-full pt-20 pb-32 min-h-screen max-w-lg mx-auto">
      <div className="flex flex-col w-full gap-4 px-4 pt-1">
        {/* Top Calm Safety Anchor & Gestational Progress Card */}
        <section className="ios-card p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 border ${
                  anyDangerChecked
                    ? "bg-[#FFECEB] text-[#FF3B30] border-[#FF3B30]/20"
                    : "bg-[#E8F9ED] text-[#34C759] border-[#34C759]/20"
                }`}
              >
                <span className="material-symbols-outlined text-[24px]">
                  {anyDangerChecked ? "warning" : "verified_user"}
                </span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-[17px] font-bold text-black tracking-tight">
                    {isMl ? "മാതൃ സുരക്ഷാ ട്രയാജ്" : "Triage Sanctuary"}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                      anyDangerChecked
                        ? "bg-[#FFECEB] text-[#FF3B30]"
                        : "bg-[#E8F9ED] text-[#248A3D]"
                    }`}
                  >
                    {anyDangerChecked
                      ? isMl
                        ? `${checkedDangerSigns.length} മുന്നറിയിപ്പ്`
                        : `${checkedDangerSigns.length} Alert Active`
                      : isMl
                      ? "24/7 സജ്ജം"
                      : "Active 24/7"}
                  </span>
                </div>
                <p className="text-[13px] text-[#6C6C70]">
                  {isMl
                    ? "MoHFW & ലോകാരോഗ്യ സംഘടന (WHO) പ്രോട്ടോക്കോൾ"
                    : "Deterministic MoHFW & WHO Protocols"}
                </p>
              </div>
            </div>
            <div className="text-right shrink-0 pl-2">
              <span className="text-[11px] font-medium text-[#8E8E93] uppercase tracking-wider block">
                {isMl ? stats.trimesterLabelMl : stats.trimesterLabelEn}
              </span>
              <span className="text-[14px] font-bold text-[#007AFF]">
                {isMl
                  ? `ആഴ്ച ${stats.currentWeek} • ദിവസം ${stats.currentDayOfWeek}`
                  : `Week ${stats.currentWeek} • Day ${stats.currentDayOfWeek}`}
              </span>
            </div>
          </div>
        </section>

        {/* Immediate Hotlines Card (Apple Emergency Calling) */}
        <section className="ios-card p-4 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF3B30] opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FF3B30]" />
              </span>
              <h2 className="text-[17px] font-bold tracking-tight text-black">
                {isMl ? "അടിയന്തര ഹോട്ട്‌ലൈനുകൾ" : "Immediate Hotlines"}
              </h2>
            </div>
            <span className="text-[12px] font-medium text-[#8E8E93]">
              {isMl ? "സൗജന്യ അടിയന്തര സഹായം" : "24/7 Toll-Free Emergency"}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {/* Free Ambulance 108 */}
            <a
              className="flex items-center gap-2.5 p-3 rounded-2xl bg-[#FF3B30] text-white shadow-[0_4px_12px_rgba(255,59,48,0.28)] active:scale-95 transition-all"
              href="tel:108"
            >
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[20px]">
                  airport_shuttle
                </span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[15px] font-bold leading-tight">
                  {isMl ? "108 വിളിക്കുക" : "Dial 108"}
                </span>
                <span className="text-[11px] font-medium text-white/90 truncate">
                  {isMl ? "സൗജന്യ ആംബുലൻസ്" : "Free Ambulance"}
                </span>
              </div>
            </a>

            {/* National Emergency 112 */}
            <a
              className="flex items-center gap-2.5 p-3 rounded-2xl bg-[#1C1C1E] text-white shadow-sm active:scale-95 transition-all"
              href="tel:112"
            >
              <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[20px]">
                  e911_emergency
                </span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[15px] font-bold leading-tight">
                  {isMl ? "112 വിളിക്കുക" : "Dial 112"}
                </span>
                <span className="text-[11px] font-medium text-white/80 truncate">
                  {isMl ? "ദേശീയ അടിയന്തര നമ്പർ" : "National Control"}
                </span>
              </div>
            </a>
          </div>

          {/* Primary Obstetrician Fast Connect Bar (Configurable) */}
          <div className="flex items-center justify-between p-2.5 rounded-2xl bg-[#F2F2F7] border border-black/[0.04]">
            <div className="flex items-center gap-2.5 min-w-0">
              <img
                alt={profile.doctorName}
                className="w-10 h-10 rounded-full object-cover shrink-0 ring-1 ring-black/10"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuACRUqPpFIPIEQy901Sv2VyjFU6980zGIB7KIONFU4Q69sdhFPWBEBr5yLIgmmYK6Cyuv2fbKg-EvyZQ0vIEeq1S1d31kGDBPWp_wyGX_sdRhLL9t8Y11cdYoUZE3Xqwov3pkn1B93jjShDyzrkuSBCjO9fxA25a6yxmllSZViKLJNLocXMFTO5mjbTBCIqUJvVbB06LN3fZts9uVKNyOjkW1QKNqjw-CA0L9qormc"
              />
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-[14px] font-bold text-black truncate">
                    {profile.doctorName}
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsOnboardingOpen(true)}
                    className="text-[10px] font-semibold text-[#007AFF] hover:underline shrink-0"
                  >
                    {isMl ? "(മാറ്റുക)" : "(Edit)"}
                  </button>
                </div>
                <span className="text-[11px] text-[#6C6C70] truncate">
                  {profile.doctorHospital}
                </span>
              </div>
            </div>
            <a
              className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#007AFF] text-white text-[13px] font-semibold active:scale-95 transition-all shadow-sm shrink-0"
              href={`tel:${profile.doctorPhone}`}
            >
              <span className="material-symbols-outlined text-[16px]">
                call
              </span>
              <span>{isMl ? "ഡോക്ടറെ വിളിക്കുക" : "Call Doctor"}</span>
            </a>
          </div>
        </section>

        {/* Dynamic Apple Red Danger Alert Banner (Toggled when checked) */}
        {anyDangerChecked && (
          <section className="transition-all duration-300">
            <div className="bg-[#FFECEB] border-2 border-[#FF3B30] text-[#93000A] rounded-2xl p-4 shadow-md flex flex-col gap-3">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FF3B30] text-white flex items-center justify-center shrink-0 shadow-sm">
                  <span className="material-symbols-outlined text-[24px]">
                    warning
                  </span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[16px] font-extrabold text-[#FF3B30] tracking-tight">
                    {isMl
                      ? `അപകട ലക്ഷണം കണ്ടെത്തി (${checkedDangerSigns.length})`
                      : `DANGER SIGN DETECTED (${checkedDangerSigns.length})`}
                  </span>
                  <span className="text-[13px] font-bold text-black">
                    {isMl
                      ? "അടിയന്തരമായി ആശുപത്രിയിലെ ലേബർ റൂമിൽ എത്തുക"
                      : "Proceed to Emergency Labour Ward Immediately"}
                  </span>
                  <p className="text-[13px] text-[#4A1010] mt-1 leading-snug">
                    {isMl
                      ? "ഗുരുതരമായ ലക്ഷണങ്ങളിൽ ഒന്നോ അതിലധികമോ തിരഞ്ഞെടുത്തിട്ടുണ്ട്. പരിഭ്രാന്തരാകാതെ സാധാരണ ഒ.പി സമയം കാത്തുനിൽക്കാതെ ഉടൻ അടുത്തുള്ള ആശുപത്രിയിലെ ലേബർ വാർഡിൽ എത്തുക."
                      : "One or more high-priority red flags have been ticked. Please remain calm, do not wait for routine clinic hours, and proceed to the nearest emergency labour ward immediately."}
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-2 pt-1">
                <a
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#FF3B30] text-white font-bold text-[15px] shadow-[0_3px_10px_rgba(255,59,48,0.35)] active:scale-95 transition-all"
                  href="tel:108"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    call
                  </span>
                  <span>
                    {isMl
                      ? "108 അടിയന്തര ആംബുലൻസ് വിളിക്കുക"
                      : "Call 108 Emergency Ambulance"}
                  </span>
                </a>
                <div className="grid grid-cols-2 gap-2">
                  <a
                    className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-white text-black font-semibold text-[13px] shadow-sm border border-black/10 active:scale-95 transition-all"
                    href={`tel:${profile.doctorPhone}`}
                  >
                    <span className="material-symbols-outlined text-[17px] text-[#007AFF]">
                      phone_in_talk
                    </span>
                    <span className="truncate">
                      {isMl ? "ഡോക്ടറെ വിളിക്കുക" : "Call Obstetrician"}
                    </span>
                  </a>
                  <button
                    onClick={handleSmsAlert}
                    className={`flex items-center justify-center gap-1.5 py-2.5 rounded-xl font-semibold text-[13px] shadow-sm border border-black/10 active:scale-95 transition-all ${
                      smsDispatched
                        ? "bg-[#E8F9ED] text-[#248A3D]"
                        : "bg-white text-black"
                    }`}
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[17px] text-[#FF9500]">
                      sms
                    </span>
                    <span className="truncate">
                      {smsDispatched
                        ? isMl
                          ? "SMS അയച്ചു!"
                          : "SMS Dispatched!"
                        : isMl
                        ? "കുടുംബാംഗങ്ങൾക്ക് SMS"
                        : "SMS Alert Family"}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Maternal Danger Signs Checklist (iOS Inset Grouped List) */}
        <section className="ios-card p-4 flex flex-col gap-3">
          <div className="flex items-center justify-between pb-1 border-b border-black/[0.06]">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#007AFF] text-[20px]">
                  checklist_rtl
                </span>
                <h3 className="text-[17px] font-bold text-black tracking-tight">
                  {isMl
                    ? "ഗർഭകാല അപകട ലക്ഷണങ്ങൾ"
                    : "Maternal Danger Signs"}
                </h3>
              </div>
              <span className="text-[12px] font-medium text-[#6C6C70]">
                {isMl
                  ? "അപകട ലക്ഷണങ്ങൾ സ്വയം പരിശോധന"
                  : "Deterministic Obstetric Red-Flag Self-Check"}
              </span>
            </div>
            <button
              onClick={clearDangerSigns}
              className="text-[13px] font-semibold text-[#007AFF] hover:opacity-75 px-2.5 py-1 rounded-full bg-[#EAF3FF] active:scale-95 transition-all"
              type="button"
            >
              {isMl ? "റീസെറ്റ്" : "Reset"}
            </button>
          </div>
          <p className="text-[13px] text-[#6C6C70] leading-snug">
            {isMl
              ? "നിങ്ങൾക്ക് ഇപ്പോൾ അനുഭവപ്പെടുന്ന ഏതെങ്കിലും ലക്ഷണം താഴെ തിരഞ്ഞെടുക്കുക. അടിയന്തര നിർദ്ദേശങ്ങൾ ഉടൻ ലഭ്യമാകും."
              : "Select any symptom you are experiencing right now. The deterministic triage engine will instantly guide your next steps."}
          </p>

          {/* Inset List Group */}
          <div className="flex flex-col divide-y divide-black/[0.06] bg-[#F2F2F7] rounded-2xl overflow-hidden border border-black/[0.06]">
            {DANGER_SIGNS_LIST.map((sign) => {
              const isChecked = checkedDangerSigns.includes(sign.id);
              return (
                <label
                  key={sign.id}
                  className={`flex items-start gap-3 p-3.5 cursor-pointer transition-colors ${
                    isChecked
                      ? "bg-[#FFECEB]"
                      : "bg-white active:bg-neutral-50"
                  }`}
                >
                  <div className="relative flex items-center justify-center shrink-0 mt-0.5">
                    <input
                      checked={isChecked}
                      onChange={() => toggleDangerSign(sign.id)}
                      className="sr-only"
                      type="checkbox"
                    />
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                        isChecked
                          ? "border-[#FF3B30] bg-[#FF3B30]"
                          : "border-[#8E8E93] bg-white"
                      }`}
                    >
                      {isChecked && (
                        <svg
                          className="w-3 h-3 text-white"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M5 13l4 4L19 7"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[14px] font-semibold text-black leading-snug">
                      {isMl ? sign.titleMl : sign.titleEn}
                    </span>
                    <span className="text-[12px] text-[#6C6C70] mt-0.5">
                      {isMl ? sign.clinicalNoteMl : sign.clinicalNoteEn}
                    </span>
                  </div>
                </label>
              );
            })}
          </div>

          {/* Unchecked State Indicator with Required Medical Disclaimer */}
          {!anyDangerChecked && (
            <div className="flex flex-col gap-1.5 p-3 rounded-xl bg-[#E8F9ED] border border-[#34C759]/20">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#34C759] text-[20px] shrink-0">
                  check_circle
                </span>
                <span className="text-[13px] font-semibold text-[#248A3D] leading-tight">
                  {isMl
                    ? "ഈ പട്ടികയിലെ അപകട ലക്ഷണങ്ങളൊന്നും നിലവിൽ തിരഞ്ഞെടുത്തിട്ടില്ല."
                    : "No danger signs currently checked on this list."}
                </span>
              </div>
              <p className="text-[11.5px] text-[#1C1C1E]/80 leading-snug pl-7">
                <strong>
                  {isMl
                    ? "പ്രധാന അറിയിപ്പ്:"
                    : "Important Educational Notice:"}
                </strong>{" "}
                {isMl
                  ? "ഈ പട്ടികയിൽ ലക്ഷണങ്ങൾ ഇല്ലാത്തത് ഡോക്ടറുടെ പരിശോധനയ്ക്ക് പകരമല്ല. നിങ്ങൾക്ക് എന്തെങ്കിലും അസ്വസ്ഥതയോ സംശയമോ തോന്നിയാൽ ഉടൻ ഡോക്ടറെയോ അടുത്തുള്ള ലേബർ റൂമിനെയോ സമീപിക്കുക."
                  : "The absence of checked symptoms on this checklist does not guarantee medical safety or replace clinical evaluation. If you feel unwell or notice anything unusual, contact your doctor or nearest labour room immediately."}
              </p>
            </div>
          )}
        </section>

        {/* Kerala District Emergency Maternity Directory (Apple Maps Styled Place Cards) */}
        <section className="flex flex-col gap-3">
          <div className="flex items-center justify-between px-1">
            <div>
              <h3 className="text-[19px] font-bold tracking-tight text-black">
                {isMl
                  ? "അടിയന്തര പ്രസവ ചികിത്സാ കേന്ദ്രങ്ങൾ"
                  : "Emergency Maternity Units"}
              </h3>
              <span className="text-[12px] font-medium text-[#6C6C70]">
                {isMl
                  ? "24/7 പ്രധാന CEmONC ആശുപത്രികളും ലേബർ റൂമുകളും"
                  : "24/7 Major CEmONC Centres & Labour Rooms (Educational Directory)"}
              </span>
            </div>
            <span className="material-symbols-outlined text-[#007AFF] text-[24px]">
              local_hospital
            </span>
          </div>

          {/* District Selector Styled as Apple Native Picker / Popover */}
          <div className="ios-card p-3 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#EAF3FF] flex items-center justify-center text-[#007AFF] shrink-0">
              <span className="material-symbols-outlined text-[18px]">
                location_on
              </span>
            </div>
            <div className="flex flex-col flex-1 min-w-0">
              <label
                className="text-[11px] font-medium text-[#8E8E93] uppercase tracking-wider"
                htmlFor="district-selector"
              >
                {isMl ? "കേരള ജില്ല തിരഞ്ഞെടുക്കുക" : "Select Kerala District"}
              </label>
              <div className="relative">
                <select
                  id="district-selector"
                  value={selectedDistrict}
                  onChange={(e) => handleDistrictChange(e.target.value)}
                  className="bg-transparent text-[15px] font-semibold text-black focus:outline-none w-full appearance-none pr-6 cursor-pointer"
                >
                  {KERALA_DISTRICTS.map((d) => (
                    <option key={d.code} value={d.code}>
                      {isMl ? d.nameMl : d.nameEn}
                    </option>
                  ))}
                </select>
                <span className="material-symbols-outlined text-[18px] text-[#8E8E93] pointer-events-none absolute right-0 top-1/2 -translate-y-1/2">
                  unfold_more
                </span>
              </div>
            </div>
          </div>

          {/* Hospital Directory Cards List */}
          <div className="flex flex-col gap-3">
            {filteredHospitals.map((hosp) => (
              <div
                key={hosp.id}
                className="ios-card p-4 flex flex-col gap-3 transition-all"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[16px] font-bold text-black tracking-tight">
                        {isMl ? hosp.nameMl : hosp.nameEn}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-[#E5E5EA] text-[#3A3A3C] text-[11px] font-medium">
                        {isMl ? hosp.typeBadgeMl : hosp.typeBadgeEn}
                      </span>
                    </div>
                    <span className="text-[12px] text-[#6C6C70] mt-0.5">
                      {isMl ? hosp.addressMl : hosp.addressEn}
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#E8F9ED] text-[#248A3D] text-[11px] font-bold shrink-0 border border-[#34C759]/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#34C759]" />
                    {isMl ? hosp.statusBadgeMl : hosp.statusBadgeEn}
                  </span>
                </div>

                {/* Apple Maps Category Chips */}
                <div className="flex flex-wrap gap-1.5">
                  {hosp.tags.map((t, idx) => (
                    <span
                      key={idx}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-medium ${
                        t.isAlert
                          ? "bg-[#FFECEB] text-[#FF3B30]"
                          : t.isInfo
                          ? "bg-[#EAF3FF] text-[#007AFF]"
                          : "bg-[#F2F2F7] text-[#3A3A3C]"
                      }`}
                    >
                      {isMl && t.labelMl ? t.labelMl : t.label}
                    </span>
                  ))}
                </div>

                {/* Actions Row */}
                <div className="flex items-center justify-between pt-2 border-t border-black/[0.06]">
                  <div className="flex items-center gap-1 text-[#6C6C70]">
                    <span className="material-symbols-outlined text-[15px]">
                      call
                    </span>
                    <span className="text-[13px] font-medium">
                      {hosp.phone}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <a
                      className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#F2F2F7] text-[#007AFF] text-[13px] font-semibold active:bg-[#E5E5EA] transition-colors"
                      href={`https://maps.google.com/?q=${hosp.mapsQuery}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <span className="material-symbols-outlined text-[16px]">
                        directions
                      </span>
                      <span>{isMl ? "വഴി കാണുക" : "Directions"}</span>
                    </a>
                    <a
                      className="flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-[#007AFF] text-white text-[13px] font-semibold active:scale-95 transition-transform shadow-sm"
                      href={`tel:${hosp.phone.replace(/[^0-9+]/g, "")}`}
                    >
                      <span className="material-symbols-outlined text-[16px]">
                        call
                      </span>
                      <span>{isMl ? "വിളിക്കുക" : "Call Desk"}</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Kerala Government Disha 1056 Card */}
        <section className="ios-card p-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-2xl bg-[#EAF3FF] flex items-center justify-center text-[#007AFF] shrink-0 border border-[#007AFF]/15">
              <span className="material-symbols-outlined text-[22px]">
                support_agent
              </span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[15px] font-bold text-black truncate">
                {isMl ? "ദിശ ഹെൽപ്പ്‌ലൈൻ 1056" : "Disha Helpline 1056"}
              </span>
              <span className="text-[12px] text-[#6C6C70] truncate">
                {isMl
                  ? "കേരള സർക്കാർ 24x7 ആരോഗ്യ കൗൺസിലിംഗ് (ടോൾ ഫ്രീ 1056 / 104)"
                  : "Kerala Govt 24x7 Health & Psychological Counseling (Toll-Free 1056 / 104)"}
              </span>
            </div>
          </div>
          <a
            className="flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-[#007AFF] text-white text-[13px] font-semibold shrink-0 active:scale-95 transition-transform shadow-sm"
            href="tel:1056"
          >
            <span className="material-symbols-outlined text-[16px]">phone</span>
            <span>1056</span>
          </a>
        </section>

        {/* Quick Reassurance Note */}
        <footer className="pt-2 pb-6 text-center">
          <p className="text-[12px] text-[#8E8E93] leading-relaxed max-w-sm mx-auto">
            {isMl ? (
              <>
                മാറ്റേണ (Materna Kerala) സുരക്ഷാ നിർദ്ദേശങ്ങൾ ദേശീയ ആരോഗ്യ ദൗത്യം
                (NHM) മാനദണ്ഡങ്ങൾ പ്രകാരമുള്ളതാണ്. അടിയന്തര സാഹചര്യങ്ങളിൽ
                എപ്പോഴും <strong>108</strong> അല്ലെങ്കിൽ <strong>112</strong>{" "}
                നമ്പറിൽ വിളിക്കുക.
              </>
            ) : (
              <>
                Materna Kerala educational protocols align with NHM (National
                Health Mission) guidelines. Hospital numbers are provided for
                reference; always dial <strong>108</strong> or{" "}
                <strong>112</strong> in an acute medical emergency.
              </>
            )}
          </p>
        </footer>
      </div>
    </main>
  );
}
