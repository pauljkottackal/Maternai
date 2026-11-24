"use client";

import React from "react";
import {
  Slide01Cover,
  Slide02Problem,
  Slide03Solution,
  Slide04Features,
  Slide05Workflow,
  Slide06Architecture,
  Slide07Milestones,
} from "./MainSlidesPart1";
import {
  Slide08Status,
  Slide09Evidence,
  Slide10RemainingWork,
  Slide11Roadmap,
  Slide12TeamTech,
  Slide13TeamResearch,
  Slide14Conclusion,
} from "./MainSlidesPart2";
import {
  Slide15AppendixOverview,
  SupportingDocumentSlide,
} from "./AppendixSlides";

interface SlideRendererProps {
  index: number; // 0 to 18
  onNavigate?: (targetIndex: number) => void;
  isPrintMode?: boolean;
}

export function SlideRenderer({
  index,
  onNavigate,
  isPrintMode = false,
}: SlideRendererProps) {
  switch (index) {
    case 0:
      return <Slide01Cover />;
    case 1:
      return <Slide02Problem />;
    case 2:
      return <Slide03Solution />;
    case 3:
      return <Slide04Features />;
    case 4:
      return <Slide05Workflow />;
    case 5:
      return <Slide06Architecture />;
    case 6:
      return <Slide07Milestones />;
    case 7:
      return <Slide08Status />;
    case 8:
      return <Slide09Evidence />;
    case 9:
      return <Slide10RemainingWork />;
    case 10:
      return <Slide11Roadmap />;
    case 11:
      return <Slide12TeamTech />;
    case 12:
      return <Slide13TeamResearch />;
    case 13:
      return <Slide14Conclusion />;
    case 14:
      return (
        <Slide15AppendixOverview
          onNavigateToSlide={onNavigate}
          isPrintMode={isPrintMode}
        />
      );
    case 15:
      return (
        <SupportingDocumentSlide
          assignmentKey="a1"
          isPrintMode={isPrintMode}
        />
      );
    case 16:
      return (
        <SupportingDocumentSlide
          assignmentKey="a2"
          isPrintMode={isPrintMode}
        />
      );
    case 17:
      return (
        <SupportingDocumentSlide
          assignmentKey="a3"
          isPrintMode={isPrintMode}
        />
      );
    case 18:
      return (
        <SupportingDocumentSlide
          assignmentKey="a4"
          isPrintMode={isPrintMode}
        />
      );
    default:
      return <Slide01Cover />;
  }
}
