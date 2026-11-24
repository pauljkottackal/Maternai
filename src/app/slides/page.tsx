import type { Metadata } from "next";
import React from "react";
import { AppendixProvider } from "@/lib/slides/useAppendixStore";
import { SlideStage } from "@/components/slides/SlideStage";

export const metadata: Metadata = {
  title: "Materna — TDPCL Assignment 4 Presentation",
  description:
    "18-slide project progress review presentation for Materna (JAIN Deemed-to-be University).",
};

export default function SlidesPage() {
  return (
    <AppendixProvider>
      <SlideStage />
    </AppendixProvider>
  );
}
