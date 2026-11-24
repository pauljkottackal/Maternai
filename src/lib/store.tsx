"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  AppointmentItem,
  Language,
  PregnancyStats,
  SupplementItem,
  TabType,
  UserProfile,
  VitalRecord,
} from "./types";
import {
  addDaysToDateString,
  calculatePregnancyStats,
  getDefaultLmpForWeek,
  toLocalIsoDateString,
} from "./pregnancyCalculations";

const STORAGE_KEY = "materna_kerala_mvp_state_v1";

const defaultLmp = getDefaultLmpForWeek(24, 4);
const defaultEdd = addDaysToDateString(defaultLmp, 280);
const todayIso = toLocalIsoDateString(new Date());

export const DEFAULT_PROFILE: UserProfile = {
  name: "Ananya",
  nameMl: "അനന്യ",
  datingMethod: "lmp",
  lmpDate: defaultLmp,
  dueDate: defaultEdd,
  baselineWeightKg: 58.4,
  language: "en",
  district: "tvm",
  doctorName: "Dr. Lekshmi Nair, MD (OB-GYN)",
  doctorTitle: "Senior Obstetrician & Gynaecologist",
  doctorHospital: "SUT Hospital, Pattom, Thiruvananthapuram",
  doctorPhone: "+919447000000",
  ashaName: "Sujatha P.",
  ashaLocation: "PHC Kudappanakunnu • Ward 4",
  ashaPhone: "0471230000",
  familyEmergencyPhone: "+919847000000",
  onboarded: true,
};

export const SAMPLE_VITALS: VitalRecord[] = [
  {
    id: "sample-w12",
    date: addDaysToDateString(defaultLmp, 12 * 7),
    timestamp: "09:15 AM",
    week: 12,
    systolic: 112,
    diastolic: 72,
    weightKg: 58.4,
    fastingSugar: 84,
    symptoms: ["Mild morning nausea"],
    mood: "Calm",
    sleepHours: 7.5,
    notes: "NT Scan completed at Medical College. Baseline vitals normal.",
    isSample: true,
  },
  {
    id: "sample-w16",
    date: addDaysToDateString(defaultLmp, 16 * 7),
    timestamp: "10:00 AM",
    week: 16,
    systolic: 115,
    diastolic: 74,
    weightKg: 60.1,
    fastingSugar: 86,
    symptoms: ["Appetite improved"],
    mood: "Great",
    sleepHours: 8,
    notes: "Started Iron & Folic Acid and Calcium Carbonate tablets.",
    isSample: true,
  },
  {
    id: "sample-w20",
    date: addDaysToDateString(defaultLmp, 20 * 7),
    timestamp: "10:30 AM",
    week: 20,
    systolic: 116,
    diastolic: 75,
    weightKg: 62.0,
    fastingSugar: 87,
    symptoms: ["Active baby flutters"],
    mood: "Great",
    sleepHours: 7.5,
    notes: "Anomaly scan normal. Placenta posterior, AFI adequate.",
    isSample: true,
  },
  {
    id: "sample-w24",
    date: todayIso,
    timestamp: "09:45 AM",
    week: 24,
    systolic: 118,
    diastolic: 76,
    weightKg: 64.2,
    fastingSugar: 88,
    symptoms: ["Mild ankle puffiness"],
    mood: "Great",
    sleepHours: 7.5,
    notes: "Feeling energetic, baby responds actively to evening music.",
    isSample: true,
  },
];

export const DEFAULT_SUPPLEMENTS: SupplementItem[] = [
  {
    id: "supp-ifa",
    nameEn: "Iron & Folic Acid (IFA)",
    nameMl: "അയൺ & ഫോളിക് ആസിഡ് (IFA)",
    scheduleEn: "Taken post-lunch (100mg elemental iron)",
    scheduleMl: "ഉച്ചഭക്ഷണത്തിന് ശേഷം • 1 ഗുളിക",
    dosageNoteEn: "Evening after dinner • 1 tablet",
    icon: "pill",
    color: "#007AFF",
    taken: true,
  },
  {
    id: "supp-calcium",
    nameEn: "Calcium Carbonate (500mg)",
    nameMl: "കാൽസ്യം കാർബണേറ്റ് (500mg)",
    scheduleEn: "Morning tablet taken after breakfast",
    scheduleMl: "പ്രഭാതഭക്ഷണത്തിന് ശേഷം • 1 ഗുളിക",
    dosageNoteEn: "Morning with breakfast • 1 tablet",
    icon: "pill",
    color: "#5856D6",
    taken: true,
  },
  {
    id: "supp-vitd",
    nameEn: "Vitamin D3 Drops",
    nameMl: "വൈറ്റമിൻ ഡി3 തുള്ളികൾ",
    scheduleEn: "Sunday afternoon • 4 drops",
    scheduleMl: "ഞായറാഴ്ച ഉച്ചയ്ക്ക് • 4 തുള്ളി",
    dosageNoteEn: "Sunday afternoon • 4 drops",
    icon: "water_drop",
    color: "#FF9500",
    taken: false,
  },
];

export const DEFAULT_APPOINTMENTS: AppointmentItem[] = [
  {
    id: "apt-upcoming-1",
    doctorName: "Dr. Lekshmi Nair, MD (OB-GYN)",
    specialty: "Senior Obstetrician & Gynaecologist",
    facility: "SUT Hospital, Pattom, Thiruvananthapuram",
    date: addDaysToDateString(todayIso, 4),
    time: "10:30 AM",
    purposeEn: "Routine Anomaly Review & OGTT Glucose Screen",
    purposeMl: "പതിവ് പരിശോധനയും ഷുഗർ ടെസ്റ്റും (OGTT)",
    status: "upcoming",
    reminderSet: false,
    isSample: true,
  },
  {
    id: "apt-past-1",
    doctorName: "Dr. Lekshmi Nair, MD (OB-GYN)",
    specialty: "Senior Obstetrician & Gynaecologist",
    facility: "Community Health Centre / Medical College",
    date: addDaysToDateString(todayIso, -28),
    time: "10:00 AM",
    purposeEn: "Visit 3 • Week 20 (Anomaly Scan)",
    purposeMl: "സന്ദർശനം 3 • ആഴ്ച 20 (അനോമലി സ്കാൻ)",
    status: "completed",
    notes:
      "Fetal anatomy regular. Amniotic fluid index (AFI) optimal. Fundal height corresponds with dates.",
    hb: "11.8 g/dL",
    urine: "Nil",
    isSample: true,
  },
];

interface MaternaContextType {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  profile: UserProfile;
  updateProfile: (updates: Partial<UserProfile>) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  stats: PregnancyStats;
  selectedGuideWeek: number;
  setSelectedGuideWeek: (wk: number) => void;
  vitals: VitalRecord[];
  addVital: (record: Omit<VitalRecord, "id">) => void;
  updateVital: (id: string, record: Partial<VitalRecord>) => void;
  deleteVital: (id: string) => void;
  supplements: SupplementItem[];
  toggleSupplement: (id: string) => void;
  waterGlasses: number;
  setWaterGlasses: (val: number) => void;
  kickCount: number;
  incrementKicks: () => void;
  resetKicks: () => void;
  appointments: AppointmentItem[];
  addAppointment: (apt: Omit<AppointmentItem, "id">) => void;
  toggleAppointmentReminder: (id: string) => void;
  checkedDangerSigns: string[];
  toggleDangerSign: (id: string) => void;
  clearDangerSigns: () => void;
  showSampleData: boolean;
  setShowSampleData: (show: boolean) => void;
  resetAllToDemoDefaults: () => void;
  isOnboardingOpen: boolean;
  setIsOnboardingOpen: (open: boolean) => void;
  isAshaOpen: boolean;
  setIsAshaOpen: (open: boolean) => void;
}

const MaternaContext = createContext<MaternaContextType | undefined>(undefined);

export function MaternaProvider({ children }: { children: React.ReactNode }) {
  const [activeTab, setActiveTab] = useState<TabType>("progress");
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE);
  const [vitals, setVitals] = useState<VitalRecord[]>(SAMPLE_VITALS);
  const [supplements, setSupplements] = useState<SupplementItem[]>(DEFAULT_SUPPLEMENTS);
  const [waterGlasses, setWaterGlassesState] = useState<number>(4);
  const [kickCount, setKickCount] = useState<number>(8);
  const [appointments, setAppointments] = useState<AppointmentItem[]>(DEFAULT_APPOINTMENTS);
  const [checkedDangerSigns, setCheckedDangerSigns] = useState<string[]>([]);
  const [showSampleData, setShowSampleData] = useState<boolean>(true);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState<boolean>(false);
  const [isAshaOpen, setIsAshaOpen] = useState<boolean>(false);
  const [hydrated, setHydrated] = useState<boolean>(false);

  const stats = calculatePregnancyStats(profile);
  const [selectedGuideWeek, setSelectedGuideWeek] = useState<number>(24);

  // Hydrate from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.profile) setProfile(parsed.profile);
        if (parsed.vitals) setVitals(parsed.vitals);
        if (parsed.supplements) setSupplements(parsed.supplements);
        if (typeof parsed.waterGlasses === "number") setWaterGlassesState(parsed.waterGlasses);
        if (typeof parsed.kickCount === "number") setKickCount(parsed.kickCount);
        if (parsed.appointments) setAppointments(parsed.appointments);
        if (parsed.checkedDangerSigns) setCheckedDangerSigns(parsed.checkedDangerSigns);
        if (typeof parsed.showSampleData === "boolean") setShowSampleData(parsed.showSampleData);
      }
    } catch (e) {
      console.error("Failed to load Materna state from localStorage", e);
    } finally {
      setHydrated(true);
    }
  }, []);

  // Sync selectedGuideWeek when profile currentWeek changes on initial load
  useEffect(() => {
    if (hydrated) {
      setSelectedGuideWeek(stats.currentWeek);
    }
  }, [hydrated, stats.currentWeek]);

  // Persist to localStorage
  useEffect(() => {
    if (!hydrated) return;
    try {
      const stateToSave = {
        profile,
        vitals,
        supplements,
        waterGlasses,
        kickCount,
        appointments,
        checkedDangerSigns,
        showSampleData,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
    } catch (e) {
      console.error("Failed to save Materna state to localStorage", e);
    }
  }, [
    hydrated,
    profile,
    vitals,
    supplements,
    waterGlasses,
    kickCount,
    appointments,
    checkedDangerSigns,
    showSampleData,
  ]);

  const updateProfile = (updates: Partial<UserProfile>) => {
    setProfile((prev) => {
      const next = { ...prev, ...updates };
      if (updates.lmpDate && next.datingMethod === "lmp") {
        next.dueDate = addDaysToDateString(updates.lmpDate, 280);
      } else if (updates.dueDate && next.datingMethod === "edd") {
        next.lmpDate = addDaysToDateString(updates.dueDate, -280);
      }
      return next;
    });
  };

  const setLanguage = (lang: Language) => {
    updateProfile({ language: lang });
  };

  const addVital = (record: Omit<VitalRecord, "id">) => {
    const newVital: VitalRecord = {
      ...record,
      id: "vital-" + Date.now(),
      isSample: false,
    };
    setVitals((prev) => [...prev, newVital]);
  };

  const updateVital = (id: string, updates: Partial<VitalRecord>) => {
    setVitals((prev) =>
      prev.map((v) => (v.id === id ? { ...v, ...updates, isSample: false } : v))
    );
  };

  const deleteVital = (id: string) => {
    setVitals((prev) => prev.filter((v) => v.id !== id));
  };

  const toggleSupplement = (id: string) => {
    setSupplements((prev) =>
      prev.map((s) => (s.id === id ? { ...s, taken: !s.taken } : s))
    );
  };

  const setWaterGlasses = (val: number) => {
    setWaterGlassesState(Math.max(0, Math.min(12, val)));
  };

  const incrementKicks = () => {
    setKickCount((prev) => prev + 1);
  };

  const resetKicks = () => {
    setKickCount(0);
  };

  const addAppointment = (apt: Omit<AppointmentItem, "id">) => {
    const newApt: AppointmentItem = {
      ...apt,
      id: "apt-" + Date.now(),
      isSample: false,
    };
    setAppointments((prev) => [newApt, ...prev]);
  };

  const toggleAppointmentReminder = (id: string) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, reminderSet: !a.reminderSet } : a))
    );
  };

  const toggleDangerSign = (id: string) => {
    setCheckedDangerSigns((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const clearDangerSigns = () => {
    setCheckedDangerSigns([]);
  };

  const resetAllToDemoDefaults = () => {
    setProfile(DEFAULT_PROFILE);
    setVitals(SAMPLE_VITALS);
    setSupplements(DEFAULT_SUPPLEMENTS);
    setWaterGlassesState(4);
    setKickCount(8);
    setAppointments(DEFAULT_APPOINTMENTS);
    setCheckedDangerSigns([]);
    setShowSampleData(true);
    localStorage.removeItem(STORAGE_KEY);
  };

  // Filtered vitals based on sample toggle
  const visibleVitals = showSampleData
    ? vitals
    : vitals.filter((v) => !v.isSample);

  const visibleAppointments = showSampleData
    ? appointments
    : appointments.filter((a) => !a.isSample);

  return (
    <MaternaContext.Provider
      value={{
        activeTab,
        setActiveTab,
        profile,
        updateProfile,
        language: profile.language,
        setLanguage,
        stats,
        selectedGuideWeek,
        setSelectedGuideWeek,
        vitals: visibleVitals,
        addVital,
        updateVital,
        deleteVital,
        supplements,
        toggleSupplement,
        waterGlasses,
        setWaterGlasses,
        kickCount,
        incrementKicks,
        resetKicks,
        appointments: visibleAppointments,
        addAppointment,
        toggleAppointmentReminder,
        checkedDangerSigns,
        toggleDangerSign,
        clearDangerSigns,
        showSampleData,
        setShowSampleData,
        resetAllToDemoDefaults,
        isOnboardingOpen,
        setIsOnboardingOpen,
        isAshaOpen,
        setIsAshaOpen,
      }}
    >
      {children}
    </MaternaContext.Provider>
  );
}

export function useMaterna() {
  const ctx = useContext(MaternaContext);
  if (!ctx) {
    throw new Error("useMaterna must be used within a MaternaProvider");
  }
  return ctx;
}
