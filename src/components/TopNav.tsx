"use client";

import React from "react";
import { useMaterna } from "@/lib/store";
import { TabType } from "@/lib/types";

const SUBTITLES_EN: Record<TabType, string> = {
  progress: "• Home",
  guide: "• Guide",
  tracker: "• Vitals",
  safety: "• Safety Triage",
};

const SUBTITLES_ML: Record<TabType, string> = {
  progress: "• പുരോഗതി",
  guide: "• ഗൈഡ്",
  tracker: "• വൈറ്റൽസ്",
  safety: "• സുരക്ഷ",
};

export function TopNav() {
  const {
    activeTab,
    language,
    setLanguage,
    setIsOnboardingOpen,
    profile,
  } = useMaterna();

  const isMl = language === "ml";

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white/80 backdrop-blur-xl border-b border-black/[0.06] pt-safe transition-all">
      <div className="h-14 px-4 flex items-center justify-between gap-2 max-w-lg mx-auto w-full">
        {/* Left: App Brand & Subtitle */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#BA0034] to-[#FF2D55] shadow-sm border border-black/5 flex items-center justify-center overflow-hidden shrink-0">
            <svg
              aria-label="Materna Brand Logo"
              className="w-5 h-5 text-white"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M12 20.5C12 20.5 5 15.8 5 10.2C5 7.6 7 5.5 9.5 5.5C11 5.5 12 6.4 12 6.4C12 6.4 13 5.5 14.5 5.5C17 5.5 19 7.6 19 10.2C19 15.8 12 20.5 12 20.5Z"
                fill="currentColor"
                fillOpacity="0.95"
              />
              <circle cx="12" cy="11.2" r="2.1" fill="#BA0034" />
            </svg>
          </div>
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1.5 leading-none">
              <span className="text-[17px] font-bold tracking-tight text-[#1C1C1E]">
                Materna
              </span>
              <span className="text-[11px] font-medium text-[#8E8E93]">
                {isMl ? SUBTITLES_ML[activeTab] : SUBTITLES_EN[activeTab]}
              </span>
            </div>
            <span className="text-[10.5px] text-[#8E8E93] leading-tight font-medium mt-0.5">
              {isMl ? "മാതൃആരോഗ്യം" : "Maternal Health Companion"}
            </span>
          </div>
        </div>

        {/* Right: iOS Segmented Control, Emergency SOS Badge, Profile Avatar */}
        <div className="flex items-center gap-2">
          {/* Native iOS Segmented Switcher */}
          <div
            className="flex items-center bg-[#767680]/15 p-[2px] rounded-[9px] text-[11.5px] font-medium"
            role="group"
            aria-label="Language Switcher"
          >
            <button
              onClick={() => setLanguage("en")}
              className={`px-2.5 py-0.5 rounded-[7px] transition-all ${
                language === "en"
                  ? "bg-white text-black font-semibold shadow-[0_1px_3px_rgba(0,0,0,0.12)]"
                  : "text-[#636366] hover:text-black"
              }`}
              type="button"
            >
              EN
            </button>
            <button
              onClick={() => setLanguage("ml")}
              className={`px-2 py-0.5 rounded-[7px] transition-all ${
                language === "ml"
                  ? "bg-white text-black font-semibold shadow-[0_1px_3px_rgba(0,0,0,0.12)]"
                  : "text-[#636366] hover:text-black"
              }`}
              type="button"
            >
              മലയാളം
            </button>
          </div>

          {/* Emergency SOS iOS Button */}
          <a
            className="flex items-center gap-1 bg-[#FF3B30] text-white px-2.5 py-1 rounded-full text-[12px] font-bold shadow-[0_2px_8px_rgba(255,59,48,0.35)] active:scale-95 transition-transform"
            href="tel:108"
            title={
              isMl
                ? "108 സൗജന്യ അടിയന്തര ആംബുലൻസ് വിളിക്കുക"
                : "Call 108 Free Kerala Emergency Ambulance"
            }
          >
            <span
              className="material-symbols-outlined text-[14px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              emergency
            </span>
            <span>108</span>
          </a>

          {/* iOS Profile Avatar -> Opens Onboarding / Profile Settings */}
          <button
            onClick={() => setIsOnboardingOpen(true)}
            className="relative shrink-0 group focus:outline-none"
            title={
              isMl
                ? `പ്രൊഫൈൽ മാറ്റുക (${profile.nameMl || profile.name})`
                : `Edit Maternal Profile (${profile.name})`
            }
            type="button"
          >
            <img
              alt={profile.name}
              className="w-8 h-8 rounded-full object-cover border border-black/10 ring-1 ring-white group-hover:ring-[#007AFF] transition-all"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDsEGrU5Hfz4geaSj5hMgQySbvMREKEP1_AieU6DFyZI9Gg_KLxMpJHT19AwYDzBkRDjeXAqRn-rz6NaMzftjueEuCDQLtzOmOFbtRqYGbT26JLLNtQdg-IoW_6KRLhHwo_wFkyT_PV6M0zhGs5lRilXTzrtgZR7DF2R0YFa1eYwYvV9-TxUt1Ic4NaMqX357iTnDiOu5bbW0fIXmhJXtGoRU3W0XXOfHk0dOALEec"
            />
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#007AFF] text-white flex items-center justify-center ring-1 ring-white">
              <span className="material-symbols-outlined text-[8px]">edit</span>
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
