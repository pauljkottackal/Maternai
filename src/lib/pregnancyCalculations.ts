import { PregnancyStats, UserProfile } from "./types";

const MS_PER_DAY = 1000 * 60 * 60 * 24;

export function toLocalIsoDateString(d: Date): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function parseLocalDate(dateStr: string): Date {
  const parts = dateStr.split("-").map(Number);
  if (parts.length === 3 && !parts.some(isNaN)) {
    return new Date(parts[0], parts[1] - 1, parts[2], 0, 0, 0, 0);
  }
  return new Date(dateStr + "T00:00:00");
}

export function addDaysToDateString(dateStr: string, days: number): string {
  const d = parseLocalDate(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  d.setDate(d.getDate() + days);
  return toLocalIsoDateString(d);
}

export function formatDisplayDate(dateStr: string): string {
  const d = parseLocalDate(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

/**
 * Generates an LMP date string that puts the user at exactly `targetWeeks` and `targetDays` as of today.
 */
export function getDefaultLmpForWeek(targetWeeks = 24, targetDays = 4): string {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const totalDays = targetWeeks * 7 + targetDays;
  now.setDate(now.getDate() - totalDays);
  return toLocalIsoDateString(now);
}

export function calculatePregnancyStats(profile: UserProfile): PregnancyStats {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let lmp: Date;
  let edd: Date;

  if (profile.datingMethod === "edd" && profile.dueDate) {
    edd = parseLocalDate(profile.dueDate);
    lmp = new Date(edd.getFullYear(), edd.getMonth(), edd.getDate() - 280);
  } else {
    lmp = parseLocalDate(profile.lmpDate || getDefaultLmpForWeek(24, 4));
    edd = new Date(lmp.getFullYear(), lmp.getMonth(), lmp.getDate() + 280);
  }

  if (isNaN(lmp.getTime())) {
    lmp = parseLocalDate(getDefaultLmpForWeek(24, 4));
    edd = new Date(lmp.getFullYear(), lmp.getMonth(), lmp.getDate() + 280);
  }

  const diffDays = Math.round((today.getTime() - lmp.getTime()) / MS_PER_DAY);
  const totalDaysCompleted = Math.max(0, Math.min(280, diffDays));
  const currentWeek = Math.max(1, Math.min(40, Math.floor(totalDaysCompleted / 7)));
  const currentDayOfWeek = totalDaysCompleted % 7;
  const daysRemaining = Math.max(0, 280 - totalDaysCompleted);
  const weeksRemaining = Math.max(0, 40 - currentWeek);
  const percentComplete = Math.min(100, Math.max(2, Math.round((totalDaysCompleted / 280) * 100)));

  let trimester: 1 | 2 | 3 = 2;
  let trimesterLabelEn = "Trimester 2";
  let trimesterLabelMl = "രണ്ടാം ത്രൈമാസം";

  if (currentWeek <= 12) {
    trimester = 1;
    trimesterLabelEn = "Trimester 1";
    trimesterLabelMl = "ഒന്നാം ത്രൈമാസം";
  } else if (currentWeek >= 28) {
    trimester = 3;
    trimesterLabelEn = "Trimester 3";
    trimesterLabelMl = "മൂന്നാം ത്രൈമാസം";
  }

  return {
    currentWeek,
    currentDayOfWeek,
    totalDaysCompleted,
    daysRemaining,
    weeksRemaining,
    trimester,
    trimesterLabelEn,
    trimesterLabelMl,
    percentComplete,
    formattedDueDate: edd.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
    formattedLmpDate: lmp.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
  };
}
