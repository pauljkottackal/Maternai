"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { SUPPORTING_DOCS } from "./slidesData";

export type AssignmentKey = "a1" | "a2" | "a3" | "a4";

export interface AppendixImageItem {
  id: string;
  name: string;
  dataUrl: string;
}

export interface AssignmentAppendixEntry {
  title: string;
  description: string;
  images: AppendixImageItem[];
}

export type AppendixState = Record<AssignmentKey, AssignmentAppendixEntry>;

function buildDefaultState(): AppendixState {
  const byKey = Object.fromEntries(
    SUPPORTING_DOCS.map((doc) => [
      doc.key,
      {
        title: doc.defaultTitle,
        description: doc.defaultDescription,
        images: doc.pages.map((p) => ({
          id: p.id,
          name: p.label,
          dataUrl: p.src,
        })),
      },
    ])
  ) as AppendixState;
  return byKey;
}

const DEFAULT_APPENDIX_STATE: AppendixState = buildDefaultState();

const DB_NAME = "materna_slides_appendix_db_v3";
const STORE_NAME = "appendix_state";
const RECORD_KEY = "assignments_v3";
const FALLBACK_LS_KEY = "materna_slides_appendix_meta_v3";

function openAppendixDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined" || !("indexedDB" in window)) {
      reject(new Error("IndexedDB unavailable"));
      return;
    }
    const req = window.indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error || new Error("IndexedDB open failed"));
  });
}

async function loadAppendixFromDb(): Promise<Partial<AppendixState> | null> {
  try {
    const db = await openAppendixDb();
    return await new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readonly");
      const store = tx.objectStore(STORE_NAME);
      const getReq = store.get(RECORD_KEY);
      getReq.onsuccess = () => {
        resolve((getReq.result as Partial<AppendixState>) || null);
      };
      getReq.onerror = () => reject(getReq.error);
    });
  } catch {
    try {
      const raw = localStorage.getItem(FALLBACK_LS_KEY);
      return raw ? (JSON.parse(raw) as Partial<AppendixState>) : null;
    } catch {
      return null;
    }
  }
}

async function saveAppendixToDb(state: AppendixState): Promise<void> {
  try {
    const db = await openAppendixDb();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readwrite");
      const store = tx.objectStore(STORE_NAME);
      const putReq = store.put(state, RECORD_KEY);
      putReq.onsuccess = () => resolve();
      putReq.onerror = () => reject(putReq.error);
    });
  } catch {
    try {
      localStorage.setItem(FALLBACK_LS_KEY, JSON.stringify(state));
    } catch (err) {
      console.error("Failed saving appendix data to localStorage fallback", err);
    }
  }
}

async function optimizeImageFileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Failed reading file"));
    reader.onload = () => {
      const rawDataUrl = reader.result as string;
      const img = new Image();
      img.onload = () => {
        const maxDim = 2000;
        let { width, height } = img;
        if (width > maxDim || height > maxDim) {
          const ratio = Math.min(maxDim / width, maxDim / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(rawDataUrl);
          return;
        }
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", 0.9));
      };
      img.onerror = () => resolve(rawDataUrl);
      img.src = rawDataUrl;
    };
    reader.readAsDataURL(file);
  });
}

interface AppendixContextValue {
  appendix: AppendixState;
  hydrated: boolean;
  updateAssignmentMeta: (
    key: AssignmentKey,
    updates: Partial<Pick<AssignmentAppendixEntry, "title" | "description">>
  ) => void;
  addAssignmentImages: (key: AssignmentKey, files: FileList | File[]) => Promise<void>;
  removeAssignmentImage: (key: AssignmentKey, imageId: string) => void;
  restoreAssignmentDefaults: (key: AssignmentKey) => void;
  resetAllAppendix: () => void;
}

const AppendixContext = createContext<AppendixContextValue | undefined>(undefined);

export function AppendixProvider({ children }: { children: React.ReactNode }) {
  const [appendix, setAppendix] = useState<AppendixState>(DEFAULT_APPENDIX_STATE);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let active = true;
    loadAppendixFromDb().then((saved) => {
      if (!active) return;
      if (saved) {
        setAppendix({
          a1: saved.a1 ? { ...DEFAULT_APPENDIX_STATE.a1, ...saved.a1 } : DEFAULT_APPENDIX_STATE.a1,
          a2: saved.a2 ? { ...DEFAULT_APPENDIX_STATE.a2, ...saved.a2 } : DEFAULT_APPENDIX_STATE.a2,
          a3: saved.a3 ? { ...DEFAULT_APPENDIX_STATE.a3, ...saved.a3 } : DEFAULT_APPENDIX_STATE.a3,
          a4: saved.a4 ? { ...DEFAULT_APPENDIX_STATE.a4, ...saved.a4 } : DEFAULT_APPENDIX_STATE.a4,
        });
      }
      setHydrated(true);
    });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    saveAppendixToDb(appendix);
  }, [appendix, hydrated]);

  const updateAssignmentMeta = (
    key: AssignmentKey,
    updates: Partial<Pick<AssignmentAppendixEntry, "title" | "description">>
  ) => {
    setAppendix((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        ...updates,
      },
    }));
  };

  const addAssignmentImages = async (
    key: AssignmentKey,
    files: FileList | File[]
  ) => {
    const fileArr = Array.from(files).filter((f) => f.type.startsWith("image/"));
    if (fileArr.length === 0) return;

    const converted: AppendixImageItem[] = [];
    for (const file of fileArr) {
      const dataUrl = await optimizeImageFileToDataUrl(file);
      converted.push({
        id: `${key}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        name: file.name,
        dataUrl,
      });
    }

    setAppendix((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        images: [...prev[key].images, ...converted],
      },
    }));
  };

  const removeAssignmentImage = (key: AssignmentKey, imageId: string) => {
    setAppendix((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        images: prev[key].images.filter((item) => item.id !== imageId),
      },
    }));
  };

  const restoreAssignmentDefaults = (key: AssignmentKey) => {
    setAppendix((prev) => ({
      ...prev,
      [key]: DEFAULT_APPENDIX_STATE[key],
    }));
  };

  const resetAllAppendix = () => {
    setAppendix(DEFAULT_APPENDIX_STATE);
  };

  return (
    <AppendixContext.Provider
      value={{
        appendix,
        hydrated,
        updateAssignmentMeta,
        addAssignmentImages,
        removeAssignmentImage,
        restoreAssignmentDefaults,
        resetAllAppendix,
      }}
    >
      {children}
    </AppendixContext.Provider>
  );
}

export function useAppendixStore() {
  const ctx = useContext(AppendixContext);
  if (!ctx) {
    throw new Error("useAppendixStore must be used within AppendixProvider");
  }
  return ctx;
}
