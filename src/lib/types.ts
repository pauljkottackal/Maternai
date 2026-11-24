export type Language = "en" | "ml";
export type TabType = "progress" | "guide" | "tracker" | "safety";

export interface UserProfile {
  name: string;
  nameMl: string;
  datingMethod: "lmp" | "edd";
  lmpDate: string; // YYYY-MM-DD
  dueDate: string; // YYYY-MM-DD
  baselineWeightKg: number;
  language: Language;
  district: string;
  doctorName: string;
  doctorTitle: string;
  doctorHospital: string;
  doctorPhone: string;
  ashaName: string;
  ashaLocation: string;
  ashaPhone: string;
  familyEmergencyPhone: string;
  onboarded: boolean;
}

export interface PregnancyStats {
  currentWeek: number;
  currentDayOfWeek: number; // 0-6
  totalDaysCompleted: number; // out of 280
  daysRemaining: number;
  weeksRemaining: number;
  trimester: 1 | 2 | 3;
  trimesterLabelEn: string;
  trimesterLabelMl: string;
  percentComplete: number;
  formattedDueDate: string;
  formattedLmpDate: string;
}

export interface VitalRecord {
  id: string;
  date: string; // YYYY-MM-DD
  timestamp: string;
  week: number;
  systolic: number;
  diastolic: number;
  weightKg: number;
  fastingSugar: number;
  symptoms: string[];
  mood: "Great" | "Calm" | "Tired" | "Anxious" | "Unwell";
  sleepHours: number;
  notes: string;
  isSample?: boolean;
}

export interface SupplementItem {
  id: string;
  nameEn: string;
  nameMl: string;
  scheduleEn: string;
  scheduleMl: string;
  dosageNoteEn: string;
  icon: string;
  color: string;
  taken: boolean;
}

export interface AppointmentItem {
  id: string;
  doctorName: string;
  specialty: string;
  facility: string;
  date: string; // YYYY-MM-DD
  time: string;
  purposeEn: string;
  purposeMl: string;
  status: "upcoming" | "completed";
  notes?: string;
  hb?: string;
  urine?: string;
  reminderSet?: boolean;
  isSample?: boolean;
}

export interface WeekGuideContent {
  week: number;
  trimester: 1 | 2 | 3;
  titleEn: string;
  titleMl: string;
  summaryEn: string;
  summaryMl: string;
  keralaCropEn: string;
  keralaCropMl: string;
  cropSubtextEn: string;
  cropSubtextMl: string;
  weightGrams: string;
  lengthCm: string;
  isMilestone?: boolean;
  babyGrowth: {
    subtitleEn: string;
    subtitleMl: string;
    points: {
      icon: string;
      color: string;
      titleEn: string;
      titleMl: string;
      descEn: string;
      descMl: string;
    }[];
  };
  maternalChanges: {
    subtitleEn: string;
    subtitleMl: string;
    points: {
      titleEn: string;
      titleMl: string;
      descEn: string;
      descMl: string;
    }[];
  };
  safeActivities: {
    subtitleEn: string;
    subtitleMl: string;
    points: {
      titleEn: string;
      titleMl: string;
      descEn: string;
      descMl: string;
    }[];
  };
  scansAndTests: {
    subtitleEn: string;
    subtitleMl: string;
    points: {
      icon: string;
      titleEn: string;
      titleMl: string;
      descEn: string;
      descMl: string;
    }[];
  };
  highlights: {
    babyTitleEn: string;
    babyTitleMl: string;
    babyDescEn: string;
    babyDescMl: string;
    motherTitleEn: string;
    motherTitleMl: string;
    motherDescEn: string;
    motherDescMl: string;
    nutritionTitleEn: string;
    nutritionTitleMl: string;
    nutritionDescEn: string;
    nutritionDescMl: string;
    nutritionIntakeEn: string;
    nutritionIntakeMl: string;
    nutritionImage: string;
  };
}
