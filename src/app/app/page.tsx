"use client";

import React from "react";
import { MaternaProvider, useMaterna } from "@/lib/store";
import { TopNav } from "@/components/TopNav";
import { BottomNav } from "@/components/BottomNav";
import { ProgressScreen } from "@/components/ProgressScreen";
import { GuideScreen } from "@/components/GuideScreen";
import { TrackerScreen } from "@/components/TrackerScreen";
import { SafetyScreen } from "@/components/SafetyScreen";
import { OnboardingModal } from "@/components/OnboardingModal";
import { AshaAssistantModal } from "@/components/AshaAssistantModal";

function MaternaShell() {
  const { activeTab } = useMaterna();

  return (
    <div className="min-h-screen bg-[#F2F2F7] text-[#1C1C1E] flex flex-col">
      <TopNav />
      {activeTab === "progress" && <ProgressScreen />}
      {activeTab === "guide" && <GuideScreen />}
      {activeTab === "tracker" && <TrackerScreen />}
      {activeTab === "safety" && <SafetyScreen />}
      <BottomNav />
      <OnboardingModal />
      <AshaAssistantModal />
    </div>
  );
}

export default function HomePage() {
  return (
    <MaternaProvider>
      <MaternaShell />
    </MaternaProvider>
  );
}
