"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Crosshair,
  ExternalLink,
  LayoutGrid,
  Maximize2,
  Minimize2,
  Printer,
  X,
} from "lucide-react";
import { SLIDE_METADATA } from "@/lib/slides/slidesData";
import { SlideRenderer } from "./SlideRenderer";

const TOTAL_SLIDES = SLIDE_METADATA.length;

function SlideThumbnail({ index }: { index: number }) {
  const boxRef = useRef<HTMLDivElement | null>(null);
  const [thumbScale, setThumbScale] = useState(0.13);

  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const sync = () => {
      if (el.clientWidth > 0) {
        setThumbScale(el.clientWidth / 1920);
      }
    };
    sync();
    const obs = new ResizeObserver(sync);
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={boxRef}
      className="static-render-mode w-full aspect-video rounded-xl overflow-hidden bg-[#FAF8F5] relative pointer-events-none"
    >
      <div
        style={{
          width: "1920px",
          height: "1080px",
          transform: `scale(${thumbScale})`,
          transformOrigin: "top left",
        }}
        className="absolute top-0 left-0"
      >
        <SlideRenderer index={index} isPrintMode={true} />
      </div>
    </div>
  );
}

export function SlideStage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transitionMode, setTransitionMode] = useState<"next" | "prev" | "jump">(
    "jump"
  );
  const [isGridOpen, setIsGridOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLaserActive, setIsLaserActive] = useState(false);
  const [laserPos, setLaserPos] = useState<{ x: number; y: number } | null>(null);
  const [scale, setScale] = useState(0.5);

  const rootRef = useRef<HTMLDivElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const goNext = useCallback(() => {
    setTransitionMode("next");
    setCurrentIndex((prev) => Math.min(TOTAL_SLIDES - 1, prev + 1));
  }, []);

  const goPrev = useCallback(() => {
    setTransitionMode("prev");
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  }, []);

  const goTo = useCallback(
    (idx: number, mode: "next" | "prev" | "jump" = "jump") => {
      setTransitionMode(mode);
      setCurrentIndex(Math.max(0, Math.min(TOTAL_SLIDES - 1, idx)));
    },
    []
  );

  const toggleFullscreen = useCallback(async () => {
    try {
      if (!document.fullscreenElement) {
        await (rootRef.current || document.documentElement).requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (err) {
      console.error("Fullscreen toggle unavailable", err);
    }
  }, []);

  const handlePrintPdf = useCallback(() => {
    setIsGridOpen(false);
    setTimeout(() => {
      window.print();
    }, 60);
  }, []);

  // Sync fullscreen state
  useEffect(() => {
    const onFsChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);

  // Compute proportional 16:9 scale
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    const updateScale = () => {
      const rect = el.getBoundingClientRect();
      const isSmall = window.innerWidth < 640;
      const padX = isFullscreen ? 16 : isSmall ? 12 : 40;
      const padY = isFullscreen ? 16 : isSmall ? 12 : 32;
      const availW = Math.max(200, rect.width - padX);
      const availH = Math.max(120, rect.height - padY);
      const nextScale = Math.min(availW / 1920, availH / 1080);
      setScale(nextScale);
    };

    updateScale();
    const observer = new ResizeObserver(updateScale);
    observer.observe(el);
    window.addEventListener("resize", updateScale);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateScale);
    };
  }, [isFullscreen]);

  // Keyboard shortcuts
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT" ||
          target.isContentEditable)
      ) {
        if (e.key === "Escape") {
          target.blur();
        }
        return;
      }

      if (e.metaKey || e.ctrlKey || e.altKey) return;

      if (e.key === "Escape") {
        if (isGridOpen) {
          e.preventDefault();
          setIsGridOpen(false);
        } else if (isLaserActive) {
          e.preventDefault();
          setIsLaserActive(false);
        }
        return;
      }

      if (e.key === "g" || e.key === "G") {
        e.preventDefault();
        setIsGridOpen((prev) => !prev);
        return;
      }

      if (e.key === "f" || e.key === "F") {
        e.preventDefault();
        toggleFullscreen();
        return;
      }

      if (e.key === "l" || e.key === "L") {
        e.preventDefault();
        setIsLaserActive((prev) => !prev);
        return;
      }

      if (e.key === "p" || e.key === "P") {
        e.preventDefault();
        handlePrintPdf();
        return;
      }

      if (isGridOpen) return;

      if (e.key === "ArrowRight" || e.key === "PageDown" || e.key === " ") {
        e.preventDefault();
        goNext();
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        goPrev();
      } else if (e.key === "Home") {
        e.preventDefault();
        goTo(0, "jump");
      } else if (e.key === "End") {
        e.preventDefault();
        goTo(TOTAL_SLIDES - 1, "jump");
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [
    goNext,
    goPrev,
    goTo,
    handlePrintPdf,
    isGridOpen,
    isLaserActive,
    toggleFullscreen,
  ]);

  const activeMeta = SLIDE_METADATA[currentIndex];
  const progressPct = ((currentIndex + 1) / TOTAL_SLIDES) * 100;
  const animClass =
    transitionMode === "next"
      ? "slide-enter-next"
      : transitionMode === "prev"
      ? "slide-enter-prev"
      : "slide-enter-jump";

  return (
    <>
      {/* INTERACTIVE SCREEN DECK (Hidden during Print) */}
      <div
        ref={rootRef}
        onMouseMove={(e) => {
          if (isLaserActive) {
            setLaserPos({ x: e.clientX, y: e.clientY });
          }
        }}
        onMouseLeave={() => setLaserPos(null)}
        style={{ height: "100dvh" }}
        className={`no-print fixed inset-x-0 top-0 bg-[#18181B] text-white flex flex-col overflow-hidden ${
          isLaserActive ? "cursor-none" : ""
        }`}
      >
        {/* Top Presenter Toolbar */}
        <header className="h-14 px-2.5 sm:px-5 bg-[#202024] border-b border-white/10 flex items-center justify-between gap-2 sm:gap-4 shrink-0 z-30 cursor-auto">
          {/* Left: Brand & Slide Title */}
          <div className="flex items-center gap-3 min-w-0 flex-1 sm:flex-none">
            <span className="hidden sm:inline-block px-2.5 py-1 rounded-lg bg-[#8C1D40] text-white text-[12px] font-extrabold tracking-wider uppercase shrink-0">
              Materna Deck
            </span>
            <span className="text-[12.5px] font-semibold text-white/60 hidden md:inline shrink-0">
              {activeMeta.section}
            </span>
            <span className="text-white/25 hidden md:inline">•</span>
            <span className="text-[12.5px] sm:text-[13.5px] font-medium text-white/90 truncate">
              {activeMeta.shortTitle}
            </span>
          </div>

          {/* Center: Slide Navigation */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={goPrev}
              disabled={currentIndex === 0}
              aria-label="Previous slide"
              title="Previous Slide (←)"
              className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/18 disabled:opacity-35 disabled:pointer-events-none flex items-center justify-center transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => setIsGridOpen((prev) => !prev)}
              title="Open Slide Overview Grid (G)"
              className="px-3.5 h-9 rounded-xl bg-white/10 hover:bg-white/18 text-[13px] font-bold tabular-nums tracking-wide transition-colors"
            >
              {String(currentIndex + 1).padStart(2, "0")} / {TOTAL_SLIDES}
            </button>

            <button
              type="button"
              onClick={goNext}
              disabled={currentIndex === TOTAL_SLIDES - 1}
              aria-label="Next slide"
              title="Next Slide (→ or Space)"
              className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/18 disabled:opacity-35 disabled:pointer-events-none flex items-center justify-center transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Right: Laser, Overview, Fullscreen, Save PDF, Launch Live App */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setIsLaserActive((prev) => !prev)}
              title="Toggle Presenter Laser Pointer (L)"
              className={`hidden sm:inline-flex items-center gap-1.5 px-3 h-9 rounded-xl text-[12.5px] font-semibold transition-colors ${
                isLaserActive
                  ? "bg-[#BA0034] text-white shadow-[0_0_14px_rgba(186,0,52,0.55)]"
                  : "bg-white/10 hover:bg-white/18 text-white"
              }`}
            >
              <Crosshair className="w-4 h-4" />
              <span className="hidden xl:inline">Laser</span>
            </button>

            <button
              type="button"
              onClick={() => setIsGridOpen((prev) => !prev)}
              title="Slide Overview Grid (G)"
              className={`inline-flex items-center gap-1.5 px-3 h-9 rounded-xl text-[12.5px] font-semibold transition-colors ${
                isGridOpen
                  ? "bg-white text-[#1C1C1E]"
                  : "bg-white/10 hover:bg-white/18 text-white"
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              <span className="hidden lg:inline">Overview</span>
            </button>

            <button
              type="button"
              onClick={toggleFullscreen}
              title="Toggle Fullscreen (F)"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 h-9 rounded-xl bg-white/10 hover:bg-white/18 text-[12.5px] font-semibold transition-colors"
            >
              {isFullscreen ? (
                <Minimize2 className="w-4 h-4" />
              ) : (
                <Maximize2 className="w-4 h-4" />
              )}
              <span className="hidden lg:inline">
                {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
              </span>
            </button>

            <button
              type="button"
              onClick={handlePrintPdf}
              title="Print / Save 16:9 Landscape PDF (P)"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 h-9 rounded-xl bg-white/10 hover:bg-white/18 text-[12.5px] font-semibold transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Save PDF</span>
            </button>

            <a
              href="/app"
              target="_blank"
              rel="noopener noreferrer"
              title="Open the live Materna MVP app (/) in a new tab"
              className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 h-9 rounded-xl bg-[#3D7A5A] hover:bg-[#33684C] text-white text-[12.5px] font-bold shadow-sm transition-colors"
            >
              <span className="hidden sm:inline">Launch Live App</span>
              <span className="sm:hidden">Demo</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </header>

        {/* Subtle Progress Line */}
        <div className="h-[3px] w-full bg-white/10 shrink-0">
          <div
            className="h-full bg-gradient-to-r from-[#BA0034] to-[#3D7A5A] transition-all duration-300 ease-out"
            style={{ width: `${progressPct}%` }}
          />
        </div>

        {/* Centered 16:9 Scaled Stage */}
        <main
          ref={viewportRef}
          onTouchStart={(e) => {
            const t = e.touches[0];
            touchStartRef.current = { x: t.clientX, y: t.clientY };
          }}
          onTouchEnd={(e) => {
            const start = touchStartRef.current;
            touchStartRef.current = null;
            if (!start) return;
            const t = e.changedTouches[0];
            const dx = t.clientX - start.x;
            const dy = t.clientY - start.y;
            if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) {
              if (dx < 0) goNext();
              else goPrev();
            }
          }}
          className="flex-1 flex items-center justify-center overflow-hidden relative"
        >
          <div
            style={{
              width: `${Math.round(1920 * scale)}px`,
              height: `${Math.round(1080 * scale)}px`,
            }}
            className="relative shadow-[0_24px_80px_rgba(0,0,0,0.55)] rounded-[8px] overflow-hidden shrink-0"
          >
            <div
              key={currentIndex}
              className={animClass}
              style={{ width: "100%", height: "100%" }}
            >
              <div
                style={{
                  width: "1920px",
                  height: "1080px",
                  transform: `scale(${scale})`,
                  transformOrigin: "top left",
                }}
              >
                <SlideRenderer
                  index={currentIndex}
                  onNavigate={(idx) => goTo(idx, "jump")}
                  isPrintMode={false}
                />
              </div>
            </div>
          </div>
        </main>

        {/* Mobile portrait helper: rotate hint + large tap targets */}
        <div className="hidden portrait:flex sm:portrait:hidden flex-col items-center gap-2.5 px-4 pt-2 pb-4 bg-[#202024] border-t border-white/10 shrink-0">
          <p className="text-[12.5px] text-white/70 text-center">
            Rotate your phone to landscape for a larger view · swipe to change slides
          </p>
          <div className="flex items-center gap-3 w-full max-w-sm">
            <button
              type="button"
              onClick={goPrev}
              disabled={currentIndex === 0}
              className="flex-1 h-12 rounded-2xl bg-white/10 active:bg-white/20 disabled:opacity-35 font-semibold text-[14px] inline-flex items-center justify-center gap-1.5"
            >
              <ChevronLeft className="w-5 h-5" /> Prev
            </button>
            <button
              type="button"
              onClick={goNext}
              disabled={currentIndex === TOTAL_SLIDES - 1}
              className="flex-1 h-12 rounded-2xl bg-[#3D7A5A] active:bg-[#33684C] disabled:opacity-35 font-semibold text-[14px] inline-flex items-center justify-center gap-1.5"
            >
              Next <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Presenter Laser Pointer Dot Overlay */}
        {isLaserActive && laserPos && (
          <div
            style={{
              left: `${laserPos.x}px`,
              top: `${laserPos.y}px`,
            }}
            className="pointer-events-none fixed z-50 -translate-x-1/2 -translate-y-1/2"
          >
            <div className="w-9 h-9 rounded-full bg-[#FF2D55]/25 flex items-center justify-center">
              <div className="w-3.5 h-3.5 rounded-full bg-[#FF1E42] ring-2 ring-white shadow-[0_0_16px_rgba(255,30,66,0.95)]" />
            </div>
          </div>
        )}

        {/* Slide Overview Grid Modal */}
        {isGridOpen && (
          <div className="fixed inset-0 z-50 bg-[#141417]/95 backdrop-blur-md flex flex-col cursor-auto">
            <div className="h-16 px-4 sm:px-8 border-b border-white/10 flex items-center justify-between gap-3 shrink-0">
              <div>
                <h2 className="text-[15px] sm:text-[18px] font-bold text-white">
                  Presentation Slide Overview ({TOTAL_SLIDES} Slides)
                </h2>
                <p className="hidden sm:block text-[12.5px] text-white/60">
                  Select any slide to jump directly • Main Review (01–14) & Supporting Appendix (15–{TOTAL_SLIDES})
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsGridOpen(false)}
                aria-label="Close slide overview"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-[13px] font-semibold"
              >
                <X className="w-4 h-4" />
                <span>Close (Esc)</span>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-3 sm:p-8">
              <div className="max-w-[1640px] mx-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 sm:gap-5">
                {SLIDE_METADATA.map((meta, idx) => {
                  const isCurrent = idx === currentIndex;
                  return (
                    <button
                      key={meta.id}
                      type="button"
                      onClick={() => {
                        goTo(idx, "jump");
                        setIsGridOpen(false);
                      }}
                      className={`group text-left rounded-2xl p-2.5 transition-all border ${
                        isCurrent
                          ? "bg-white/15 border-[#BA0034] ring-2 ring-[#BA0034]/60"
                          : "bg-white/[0.05] border-white/10 hover:bg-white/10 hover:border-white/25"
                      }`}
                    >
                      <SlideThumbnail index={idx} />

                      <div className="mt-2.5 px-1 flex items-center justify-between gap-2">
                        <span
                          className={`text-[11.5px] font-bold px-2 py-0.5 rounded-md ${
                            meta.section === "Appendix"
                              ? "bg-[#7A2848]/40 text-[#F4C2D2]"
                              : "bg-white/12 text-white/90"
                          }`}
                        >
                          {String(meta.number).padStart(2, "0")}
                        </span>
                        <span className="text-[12.5px] font-semibold text-white/90 truncate flex-1">
                          {meta.shortTitle}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* PRINT-ONLY 16:9 DECK */}
      <div className="print-deck-root" aria-hidden="true">
        {SLIDE_METADATA.map((meta, idx) => (
          <div key={meta.id} className="print-slide-sheet">
            <div className="print-slide-canvas">
              <SlideRenderer index={idx} isPrintMode={true} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
