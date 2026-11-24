"use client";

import React from "react";
import { useMaterna } from "@/lib/store";
import { TabType } from "@/lib/types";

export function BottomNav() {
  const { activeTab, setActiveTab, language, checkedDangerSigns } = useMaterna();

  const tabs: {
    id: TabType;
    labelEn: string;
    labelMl: string;
    icon: string;
    activeColor: string;
  }[] = [
    {
      id: "progress",
      labelEn: "Progress",
      labelMl: "പുരോഗതി",
      icon: "calendar_today",
      activeColor: "text-[#007AFF]",
    },
    {
      id: "guide",
      labelEn: "Guide",
      labelMl: "ഗൈഡ്",
      icon: "book_2",
      activeColor: "text-[#FF2D55]",
    },
    {
      id: "tracker",
      labelEn: "Tracker",
      labelMl: "ട്രാക്കർ",
      icon: "monitor_heart",
      activeColor: "text-[#007AFF]",
    },
    {
      id: "safety",
      labelEn: "Safety",
      labelMl: "സുരക്ഷ",
      icon: "health_and_safety",
      activeColor: "text-[#FF3B30]",
    },
  ];

  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 pb-safe bg-white/85 backdrop-blur-xl border-t border-black/[0.08]">
      <div className="max-w-lg mx-auto flex justify-around items-center h-14 px-2">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              aria-current={isActive ? "page" : undefined}
              className={`relative flex flex-col items-center justify-center gap-0.5 w-20 transition-all active:scale-95 ${
                isActive
                  ? `${tab.activeColor} font-semibold`
                  : "text-[#8E8E93] hover:text-[#1C1C1E] font-medium"
              }`}
            >
              <span
                className="material-symbols-outlined text-[23px]"
                style={
                  isActive ? { fontVariationSettings: "'FILL' 1" } : undefined
                }
              >
                {tab.icon}
              </span>
              <span className="text-[10px] tracking-tight leading-none">
                {language === "ml" ? tab.labelMl : tab.labelEn}
              </span>
              {tab.id === "safety" && checkedDangerSigns.length > 0 && (
                <span className="absolute top-0 right-4 w-2 h-2 rounded-full bg-[#FF3B30] animate-ping" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
