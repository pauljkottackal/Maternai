"use client";

import React from "react";
import { SLIDE_METADATA } from "@/lib/slides/slidesData";

interface SlideShellProps {
  slideNumber: number;
  kicker: string;
  headline?: string;
  subheadline?: string;
  variant?: "ivory" | "cool" | "editorial" | "chapter";
  hideChrome?: boolean;
  children: React.ReactNode;
}

export function SlideShell({
  slideNumber,
  kicker,
  headline,
  subheadline,
  variant = "ivory",
  hideChrome = false,
  children,
}: SlideShellProps) {
  const isChapter = variant === "chapter";
  const bgClass =
    variant === "cool"
      ? "bg-[#F4F4F6]"
      : variant === "editorial"
      ? "bg-[#F7F4EF]"
      : isChapter
      ? "bg-[#22171D]"
      : "bg-[#FAF8F5]";

  const formattedNum = String(slideNumber).padStart(2, "0");

  return (
    <div
      className={`w-[1920px] h-[1080px] ${bgClass} ${
        isChapter ? "text-[#FAF8F5]" : "text-[#1C1C1E]"
      } relative overflow-hidden flex flex-col select-none`}
    >
      {/* Subtle top hairline accent */}
      <div className="h-[5px] w-full bg-gradient-to-r from-[#8C1D40] via-[#BA0034] to-[#3D7A5A] shrink-0" />

      {!hideChrome && (
        <header className="px-[96px] pt-[42px] pb-[20px] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3.5">
            <span
              className={`inline-flex items-center justify-center w-8 h-8 rounded-lg font-bold text-[14px] tracking-wider ${
                isChapter
                  ? "bg-white/15 text-[#F4C2D2]"
                  : "bg-[#8C1D40]/10 text-[#8C1D40]"
              }`}
            >
              M
            </span>
            <span
              className={`text-[14px] font-semibold uppercase tracking-[0.18em] ${
                isChapter ? "text-[#F4C2D2]" : "text-[#8C1D40]"
              }`}
            >
              {kicker}
            </span>
          </div>

          <div
            className={`flex items-center gap-5 text-[14px] font-medium ${
              isChapter ? "text-white/70" : "text-[#6E6E73]"
            }`}
          >
            <span>MATERNA • TDPCL Progress Review</span>
            <span className="w-1 h-1 rounded-full bg-[#C7C7CC]" />
            <span
              className={`px-3 py-1 rounded-full font-semibold tabular-nums text-[13px] ${
                isChapter
                  ? "bg-white/12 border border-white/15 text-white"
                  : "bg-white border border-black/[0.08] text-[#1C1C1E]"
              }`}
            >
              {formattedNum} / {SLIDE_METADATA.length}
            </span>
          </div>
        </header>
      )}

      {headline && (
        <div className="px-[96px] pb-[28px] shrink-0">
          <h1
            className={`font-editorial text-[52px] leading-[1.12] tracking-[-0.01em] max-w-[1520px] ${
              isChapter ? "text-[#FAF8F5]" : "text-[#1C1C1E]"
            }`}
          >
            {headline}
          </h1>
          {subheadline && (
            <p
              className={`mt-2.5 text-[21px] leading-[1.45] max-w-[1360px] font-normal ${
                isChapter ? "text-white/75" : "text-[#5C5C62]"
              }`}
            >
              {subheadline}
            </p>
          )}
        </div>
      )}

      <div className="flex-1 px-[96px] pb-[56px] min-h-0 flex flex-col">
        {children}
      </div>
    </div>
  );
}
