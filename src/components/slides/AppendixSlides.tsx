"use client";

import React, { useRef, useState } from "react";
import {
  ArrowRight,
  Edit3,
  ExternalLink,
  FileCheck2,
  FilePlus2,
  RotateCcw,
  Trash2,
  X,
  ZoomIn,
} from "lucide-react";
import { SUPPORTING_DOCS } from "@/lib/slides/slidesData";
import {
  AppendixImageItem,
  AssignmentKey,
  useAppendixStore,
} from "@/lib/slides/useAppendixStore";
import { SlideShell } from "./SlideShell";

interface Slide15Props {
  onNavigateToSlide?: (slideIndexZeroBased: number) => void;
  isPrintMode?: boolean;
}

/* ============================================================================
 * SLIDE 15 — APPENDIX DIVIDER & SUPPORTING ASSIGNMENTS SUMMARY (2x2 GRID)
 * ========================================================================== */
export function Slide15AppendixOverview({
  onNavigateToSlide,
  isPrintMode = false,
}: Slide15Props) {
  const { appendix, updateAssignmentMeta } = useAppendixStore();
  const [editingKey, setEditingKey] = useState<AssignmentKey | null>(null);

  return (
    <SlideShell
      slideNumber={15}
      kicker="Appendix • Supporting Documents"
      headline="Project Development & Supporting Assignments"
      subheadline="Earlier TD-PCL root-cause analysis, ideation, and concept prototyping submissions leading to Materna (Group PG-08)."
      variant="chapter"
    >
      <div className="flex-1 flex flex-col justify-between gap-5 min-h-0">
        {/* 2x2 Supporting Document Summary Grid */}
        <div className="flex-1 grid grid-cols-2 gap-6 items-stretch min-h-0">
          {SUPPORTING_DOCS.map((doc, idx) => {
            const entry = appendix[doc.key];
            const isEditing = !isPrintMode && editingKey === doc.key;

            return (
              <div
                key={doc.key}
                style={{ "--stagger": idx } as React.CSSProperties}
                className="reveal-item bg-white text-[#1C1C1E] rounded-[26px] border border-white/15 p-7 flex flex-col justify-between shadow-[0_12px_32px_rgba(0,0,0,0.22)]"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <span className="px-3.5 py-1 rounded-full bg-[#8C1D40]/10 text-[#8C1D40] text-[12.5px] font-extrabold tracking-wider uppercase">
                        {doc.appendixCode} • Slide {doc.slideNumber}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-[#F4F4F6] text-[#525258] text-[12px] font-semibold">
                        {doc.sessionTag}
                      </span>
                    </div>

                    {!isPrintMode && (
                      <button
                        type="button"
                        onClick={() =>
                          setEditingKey(isEditing ? null : doc.key)
                        }
                        className="no-print inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#F5F3F0] hover:bg-[#EAE6E0] text-[12.5px] font-semibold text-[#3A3A3C] transition-colors"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>{isEditing ? "Done" : "Edit"}</span>
                      </button>
                    )}
                  </div>

                  <div className="text-[12.5px] font-bold uppercase tracking-[0.14em] text-[#3D7A5A]">
                    {doc.label}
                  </div>

                  {isEditing ? (
                    <div className="no-print mt-3 space-y-2.5">
                      <input
                        type="text"
                        value={entry.title}
                        onChange={(e) =>
                          updateAssignmentMeta(doc.key, { title: e.target.value })
                        }
                        className="w-full px-3.5 py-2 rounded-xl border border-black/15 text-[16px] font-bold text-[#1C1C1E] focus:outline-none focus:border-[#8C1D40]"
                      />
                      <textarea
                        rows={2}
                        value={entry.description}
                        onChange={(e) =>
                          updateAssignmentMeta(doc.key, {
                            description: e.target.value,
                          })
                        }
                        className="w-full px-3.5 py-2 rounded-xl border border-black/15 text-[14.5px] text-[#1C1C1E] focus:outline-none focus:border-[#8C1D40] resize-none"
                      />
                    </div>
                  ) : (
                    <div className="mt-1.5">
                      <h3 className="text-[23px] font-bold text-[#1C1C1E] tracking-tight leading-snug">
                        {entry.title}
                      </h3>
                      <p className="mt-2 text-[16px] leading-[1.45] text-[#525258]">
                        {entry.description}
                      </p>
                    </div>
                  )}
                </div>

                {/* Footer Status + Actions */}
                <div className="pt-3.5 mt-3 border-t border-black/[0.07] flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[13.5px] font-semibold text-[#28543D]">
                    <FileCheck2 className="w-4 h-4 text-[#3D7A5A]" />
                    <span>
                      {entry.images.length} document page
                      {entry.images.length !== 1 ? "s" : ""} embedded
                    </span>
                  </div>

                  {!isPrintMode && (
                    <div className="no-print flex items-center gap-4">
                      <a
                        href={doc.pdfHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[13.5px] font-semibold text-[#636366] hover:text-[#1C1C1E]"
                      >
                        <span>Original PDF</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>

                      {onNavigateToSlide && (
                        <button
                          type="button"
                          onClick={() => onNavigateToSlide(doc.slideIndex)}
                          className="inline-flex items-center gap-1.5 text-[14px] font-bold text-[#8C1D40] hover:underline"
                        >
                          <span>View Slide {doc.slideNumber}</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Strip */}
        <div className="bg-white/10 border border-white/15 text-white/90 rounded-[20px] px-8 py-3.5 flex items-center justify-between text-[15px] shrink-0">
          <span>
            Progression trace: <strong className="text-white">5 Whys &amp; Fishbone Root-Cause Inquiry</strong> →{" "}
            <strong className="text-white">SCAMPER &amp; Brainwriting Ideation</strong> →{" "}
            <strong className="text-white">Early Care Contract</strong> → <strong className="text-[#98D4B2]">Materna Platform</strong>.
          </span>
        </div>
      </div>
    </SlideShell>
  );
}

/* ============================================================================
 * SLIDES 16–19 — SUPPORTING DOCUMENT SHOWCASE SLIDE
 * ========================================================================== */
interface SupportingDocSlideProps {
  assignmentKey: AssignmentKey;
  isPrintMode?: boolean;
}

export function SupportingDocumentSlide({
  assignmentKey,
  isPrintMode = false,
}: SupportingDocSlideProps) {
  const docMeta = SUPPORTING_DOCS.find((d) => d.key === assignmentKey)!;
  const {
    appendix,
    addAssignmentImages,
    removeAssignmentImage,
    restoreAssignmentDefaults,
  } = useAppendixStore();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [zoomedImg, setZoomedImg] = useState<AppendixImageItem | null>(null);

  const entry = appendix[assignmentKey];
  const gridClass =
    entry.images.length <= 1
      ? "grid-cols-1"
      : entry.images.length === 2
      ? "grid-cols-2"
      : "grid-cols-3";

  return (
    <SlideShell
      slideNumber={docMeta.slideNumber}
      kicker={`${docMeta.appendixCode} • ${docMeta.label}`}
      headline={entry.title || docMeta.defaultTitle}
      subheadline={entry.description || docMeta.defaultDescription}
      variant="cool"
    >
      <div className="flex-1 flex flex-col justify-between min-h-0">
        {!isPrintMode && (
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={async (e) => {
              if (e.target.files && e.target.files.length > 0) {
                await addAssignmentImages(assignmentKey, e.target.files);
                e.target.value = "";
              }
            }}
          />
        )}

        <div className="flex-1 bg-white rounded-[28px] border border-black/[0.08] p-5 shadow-sm flex flex-col min-h-0 overflow-hidden">
          {/* Interactive Action Bar (Hidden in Print) */}
          {!isPrintMode && (
            <div className="no-print flex items-center justify-between pb-3 mb-3 border-b border-black/[0.06] shrink-0">
              <div className="flex items-center gap-3">
                <span className="text-[13.5px] font-semibold text-[#525258]">
                  Original Submission Showcase • {docMeta.sessionTag}
                </span>
                <span className="text-[12.5px] text-[#8C1D40] font-medium">
                  (Click any page to inspect full-size)
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <a
                  href={docMeta.pdfHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#F4F4F6] hover:bg-[#E8E8ED] text-[#1C1C1E] text-[12.5px] font-bold transition-colors"
                >
                  <span>Open Original PDF</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#F2F7F4] text-[#28543D] text-[12.5px] font-bold hover:bg-[#E3EFE8]"
                >
                  <FilePlus2 className="w-3.5 h-3.5" />
                  <span>Add Page</span>
                </button>
                <button
                  type="button"
                  onClick={() => restoreAssignmentDefaults(assignmentKey)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FAF4F6] text-[#8C1D40] text-[12.5px] font-bold hover:bg-[#F3E5EA]"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
              </div>
            </div>
          )}

          {/* Document Pages Grid */}
          <div
            className={`flex-1 grid ${gridClass} gap-5 items-center justify-items-center min-h-0 overflow-hidden`}
          >
            {entry.images.map((img) => (
              <div
                key={img.id}
                onClick={() => !isPrintMode && setZoomedImg(img)}
                className={`relative group w-full h-full flex items-center justify-center bg-[#FAF8F5] rounded-2xl border border-black/[0.08] p-2.5 overflow-hidden ${
                  !isPrintMode ? "cursor-pointer hover:border-[#8C1D40]/40" : ""
                }`}
              >
                <img
                  src={img.dataUrl}
                  alt={img.name}
                  className="max-w-full max-h-full w-auto h-auto object-contain rounded-lg shadow-[0_4px_16px_rgba(0,0,0,0.06)] bg-white"
                />

                {!isPrintMode && (
                  <div className="no-print opacity-0 group-hover:opacity-100 transition-opacity absolute top-3 right-3 flex items-center gap-1.5">
                    <span className="w-8 h-8 rounded-full bg-black/75 text-white flex items-center justify-center">
                      <ZoomIn className="w-4 h-4" />
                    </span>
                    {entry.images.length > 1 && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeAssignmentImage(assignmentKey, img.id);
                        }}
                        title="Remove page"
                        className="w-8 h-8 rounded-full bg-black/75 text-white flex items-center justify-center hover:bg-[#BA0034]"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Full-Resolution Document Zoom Modal (Hidden in Print) */}
      {zoomedImg && !isPrintMode && (
        <div
          className="no-print fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-8"
          onClick={() => setZoomedImg(null)}
        >
          <div
            className="bg-white rounded-[28px] p-6 max-w-[1520px] w-full max-h-[1000px] flex flex-col shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3.5 border-b border-black/10 shrink-0">
              <div>
                <div className="text-[12px] font-bold uppercase tracking-wider text-[#8C1D40]">
                  {docMeta.appendixCode} • {docMeta.sessionTag}
                </div>
                <div className="text-[20px] font-bold text-[#1C1C1E]">
                  {zoomedImg.name}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setZoomedImg(null)}
                className="w-10 h-10 rounded-full bg-[#F2F2F7] hover:bg-[#E5E5EA] flex items-center justify-center text-[#1C1C1E]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="mt-4 flex-1 overflow-auto rounded-2xl bg-[#F2F2F7] p-4 flex items-center justify-center">
              <img
                src={zoomedImg.dataUrl}
                alt={zoomedImg.name}
                className="max-h-[860px] w-auto object-contain rounded-lg shadow"
              />
            </div>
          </div>
        </div>
      )}
    </SlideShell>
  );
}
