"use client";

import React, { useState } from "react";
import { useMaterna } from "@/lib/store";

interface Message {
  id: string;
  sender: "asha" | "user";
  textEn: string;
  textMl?: string;
  isUrgentWarning?: boolean;
}

const QUICK_QUESTIONS = [
  {
    qEn: "Can I drink tender coconut water (Ilaneer) daily?",
    qMl: "ഗർഭകാലത്ത് ദിവസവും ഇളനീർ കുടിക്കാമോ?",
    aEn: "Yes! One fresh tender coconut (Ilaneer) in the mid-morning (around 11 AM) provides natural potassium and electrolytes that prevent leg cramps and dehydration in Kerala's humidity. If you have gestational diabetes, consult your obstetrician regarding portion frequency.",
    aMl: "തീർച്ചയായും! രാവിലെ 11 മണിയോടെ ഒരു ഇളനീർ കുടിക്കുന്നത് ശരീരത്തിലെ ജലാംശം നിലനിർത്താനും കാലിലെ പേശിവലിവ് (Leg cramps) കുറയ്ക്കാനും സഹായിക്കും. ഗർഭകാല പ്രമേഹം (GDM) ഉണ്ടെങ്കിൽ ഡോക്ടറുടെ നിർദ്ദേശപ്രകാരം അളവ് ക്രമീകരിക്കുക.",
  },
  {
    qEn: "When should I take Iron (IFA) & Calcium tablets?",
    qMl: "അയൺ (IFA), കാൽസ്യം ഗുളികകൾ എപ്പോഴാണ് കഴിക്കേണ്ടത്?",
    aEn: "Never take Iron (IFA) and Calcium together at the same meal, as calcium blocks iron absorption! Take Calcium after breakfast, and take your IFA tablet after lunch or dinner with Nellikka (gooseberry) or lemon water for better absorption.",
    aMl: "അയൺ ഗുളികയും കാൽസ്യം ഗുളികയും ഒരേ സമയം ഒരുമിച്ച് കഴിക്കരുത് (കാൽസ്യം ഇരുമ്പിന്റെ ആഗിരണം കുറയ്ക്കും). കാൽസ്യം രാവിലെ ഭക്ഷണത്തിന് ശേഷവും, അയൺ ഗുളിക ഉച്ചഭക്ഷണത്തിനോ അത്താഴത്തിനോ ശേഷം നാരങ്ങാവെള്ളത്തിനോ നെല്ലിക്കയ്ക്കോ ഒപ്പം കഴിക്കുന്നതാണ് ഉത്തമം.",
  },
  {
    qEn: "What is the OGTT glucose test at Week 24–28?",
    qMl: "24-28 ആഴ്ചകളിൽ നടത്തുന്ന OGTT ഷുഗർ പരിശോധന എന്താണ്?",
    aEn: "The Oral Glucose Tolerance Test (OGTT) screens for Gestational Diabetes Mellitus (GDM). Under Kerala NHM protocols, a 75g glucose drink is given and blood sugar is tested after 2 hours to ensure safe maternal and fetal metabolism.",
    aMl: "ഗർഭകാല പ്രമേഹം (Gestational Diabetes) കണ്ടെത്താനുള്ള പ്രധാന പരിശോധനയാണ് OGTT. പ്രാഥമിക ആരോഗ്യ കേന്ദ്രങ്ങളിൽ (PHC/CHC) 75 ഗ്രാം ഗ്ലൂക്കോസ് ലായനി കുടിച്ച് 2 മണിക്കൂറിന് ശേഷം രക്തത്തിലെ പഞ്ചസാരയുടെ അളവ് പരിശോധിക്കുന്നു.",
  },
  {
    qEn: "What documents belong in my NHM MCP Card folder?",
    qMl: "തായ് കാർഡിനൊപ്പം (MCP Card) എന്തൊക്കെ രേഖകൾ കരുതണം?",
    aEn: "Keep your NHM Mother & Child Protection (MCP Card) book, Dating, NT & Anomaly ultrasound reports, blood group & hemoglobin lab slips, OGTT report, and your hospital OP registration number ready whenever travelling.",
    aMl: "തായ് കാർഡ് (MCP Card), എൻ.ടി / അനോമലി സ്കാൻ റിപ്പോർട്ടുകൾ, രക്തഗ്രൂപ്പ്-ഹീമോഗ്ലോബിൻ പരിശോധനാ ഫലങ്ങൾ, ഷുഗർ പരിശോധനാ റിപ്പോർട്ട് എന്നിവ എപ്പോഴും ഒരു ഫോൾഡറിൽ സൂക്ഷിക്കുക.",
  },
];

const RED_FLAG_KEYWORDS = [
  "bleed",
  "blood",
  "pain",
  "headache",
  "blur",
  "vision",
  "fever",
  "kick",
  "movement",
  "swell",
  "fluid",
  "leak",
  "dizzy",
  "faint",
  "രക്ത",
  "വേദന",
  "തലവേദന",
  "പനി",
  "അനക്കം",
];

export function AshaAssistantModal() {
  const {
    isAshaOpen,
    setIsAshaOpen,
    profile,
    stats,
    language,
    setActiveTab,
  } = useMaterna();

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  if (!isAshaOpen) return null;

  const isMl = language === "ml";

  const welcomeMsg: Message = {
    id: "welcome-1",
    sender: "asha",
    textEn: `Namaskaram ${profile.name}! I am your Materna Educational Companion (Week ${stats.currentWeek}). Ask me about Kerala maternal nutrition, routine prenatal supplements, or NHM MCP Card checkup preparation.`,
    textMl: `നമസ്കാരം ${profile.nameMl || profile.name}! ഗർഭകാല പോഷകാഹാരം (ആഴ്ച ${stats.currentWeek}), അയൺ-കാൽസ്യം ഗുളികകൾ, തായ് കാർഡ് പരിശോധനകൾ എന്നിവയെക്കുറിച്ചുള്ള വിവരങ്ങൾ ഇവിടെ ചോദിക്കാം.`,
  };

  const allMessages = [welcomeMsg, ...messages];

  const handleQuestionClick = (q: (typeof QUICK_QUESTIONS)[number]) => {
    const userMsg: Message = {
      id: "u-" + Date.now(),
      sender: "user",
      textEn: q.qEn,
      textMl: q.qMl,
    };
    const ashaMsg: Message = {
      id: "a-" + (Date.now() + 1),
      sender: "asha",
      textEn: q.aEn,
      textMl: q.aMl,
    };
    setMessages((prev) => [...prev, userMsg, ashaMsg]);
  };

  const handleSendCustom = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMsg: Message = {
      id: "u-" + Date.now(),
      sender: "user",
      textEn: trimmed,
      textMl: trimmed,
    };

    const lower = trimmed.toLowerCase();
    const hasRedFlag = RED_FLAG_KEYWORDS.some((kw) => lower.includes(kw));

    let replyMsg: Message;
    if (hasRedFlag) {
      replyMsg = {
        id: "a-" + (Date.now() + 1),
        sender: "asha",
        isUrgentWarning: true,
        textEn:
          "IMPORTANT SAFETY NOTICE: This educational assistant never performs medical or emergency triage. Because your message mentions a potential symptom, please switch immediately to the deterministic Safety Triage tab, contact your obstetrician, or dial 108 / Disha 1056.",
        textMl:
          "പ്രധാന സുരക്ഷാ അറിയിപ്പ്: ഈ എജ്യുക്കേഷണൽ അസിസ്റ്റന്റ് അടിയന്തര ചികിത്സാ നിർണ്ണയം നടത്തുന്നില്ല. എന്തെങ്കിലും ശാരീരിക ബുദ്ധിമുട്ടുകൾ തോന്നുന്നുവെങ്കിൽ ഉടൻ തന്നെ 'സുരക്ഷ (Safety)' ടാബ് പരിശോധിക്കുകയോ ഡോക്ടറെ / 108 ആംബുലൻസിനെ വിളിക്കുകയോ ചെയ്യുക.",
      };
    } else {
      replyMsg = {
        id: "a-" + (Date.now() + 1),
        sender: "asha",
        textEn: `At Week ${stats.currentWeek} (${stats.trimesterLabelEn}), focus on balanced Kerala meals rich in iron and folate (like Muringayila thoran, Ragi, and small coastal fish), 2.5L daily hydration, and regular rest on your left side. Please verify specific medical questions with ${profile.doctorName} at your next visit.`,
        textMl: `ആഴ്ച ${stats.currentWeek}-ൽ ഇരുമ്പും കാൽസ്യവും അടങ്ങിയ നാടൻ ആഹാരം (മുരിങ്ങയില, റാഗി, ചെറു മത്സ്യങ്ങൾ), 2.5 ലിറ്റർ വെള്ളം, മതിയായ വിശ്രമം എന്നിവ ഉറപ്പാക്കുക. വ്യക്തിഗത ആരോഗ്യ സംശയങ്ങൾക്ക് അടുത്ത സന്ദർശനത്തിൽ ഡോക്ടറുടെ നിർദ്ദേശം തേടുക.`,
      };
    }

    setMessages((prev) => [...prev, userMsg, replyMsg]);
    setInput("");
  };

  return (
    <div className="fixed inset-0 z-[70] bg-black/40 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-[#F2F2F7] w-full max-w-lg rounded-t-3xl sm:rounded-3xl h-[85vh] sm:h-[640px] shadow-2xl border border-black/10 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-white/90 backdrop-blur-xl px-4 py-3.5 border-b border-black/[0.06] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-[#34C759]/15 text-[#34C759] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[22px]">
                support_agent
              </span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="text-[16px] font-bold text-[#1C1C1E]">
                  {isMl
                    ? "ആശാ സഹായം • ആരോഗ്യ അറിവുകൾ"
                    : "Ask ASHA • Educational Q&A"}
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-[#FF9500]/15 text-[#D97706] text-[10px] font-bold uppercase tracking-wide">
                  {isMl ? "ഡെമോ" : "Demo Mode"}
                </span>
              </div>
              <p className="text-[11px] text-[#8E8E93]">
                {isMl
                  ? "പൊതുവായ അറിവുകൾക്ക് മാത്രം • അടിയന്തര ചികിത്സാ നിർണ്ണയത്തിനല്ല"
                  : "Educational guidance only • Never used for emergency triage"}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsAshaOpen(false)}
            className="w-8 h-8 rounded-full bg-[#E5E5EA] text-[#3C3C43] flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Non-Triage Safety Banner */}
        <div className="bg-[#FFF4E5] border-b border-[#FF9500]/20 px-4 py-2 flex items-center justify-between gap-2">
          <span className="text-[11px] font-medium text-[#92400E] leading-tight">
            {isMl
              ? "ശാരീരിക ബുദ്ധിമുട്ടുകളോ അപകട ലക്ഷണങ്ങളോ ഉണ്ടെങ്കിൽ ചാറ്റ് ഉപയോഗിക്കരുത്."
              : "Experiencing any physical symptom or warning sign? Do not use chat."}
          </span>
          <button
            type="button"
            onClick={() => {
              setIsAshaOpen(false);
              setActiveTab("safety");
            }}
            className="shrink-0 px-2.5 py-1 rounded-full bg-[#FF3B30] text-white text-[11px] font-bold"
          >
            {isMl ? "സുരക്ഷാ പരിശോധന" : "Open Safety Triage"}
          </button>
        </div>

        {/* Direct Call ASHA Bar */}
        <div className="bg-white px-4 py-2.5 border-b border-black/5 flex items-center justify-between">
          <div className="text-[12px]">
            <span className="font-bold text-[#1C1C1E]">{profile.ashaName}</span>
            <span className="text-[#8E8E93]"> • {profile.ashaLocation}</span>
          </div>
          <a
            href={`tel:${profile.ashaPhone}`}
            className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#34C759] text-white text-[11.5px] font-bold shadow-xs"
          >
            <span className="material-symbols-outlined text-[14px]">call</span>
            <span>{isMl ? "ആശയെ വിളിക്കുക" : "Call ASHA"}</span>
          </a>
        </div>

        {/* Chat Stream */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
          {allMessages.map((m) => (
            <div
              key={m.id}
              className={`flex flex-col max-w-[88%] rounded-2xl p-3.5 text-[13px] leading-relaxed ${
                m.sender === "user"
                  ? "self-end bg-[#007AFF] text-white rounded-br-sm"
                  : m.isUrgentWarning
                  ? "self-start bg-[#FFECEB] border border-[#FF3B30] text-[#93000A] rounded-bl-sm"
                  : "self-start bg-white text-[#1C1C1E] shadow-xs border border-black/5 rounded-bl-sm"
              }`}
            >
              <p className="font-medium">
                {isMl && m.textMl ? m.textMl : m.textEn}
              </p>
              {m.isUrgentWarning && (
                <div className="flex items-center gap-2 mt-2.5">
                  <button
                    type="button"
                    onClick={() => {
                      setIsAshaOpen(false);
                      setActiveTab("safety");
                    }}
                    className="px-3 py-1.5 rounded-xl bg-[#FF3B30] text-white text-[12px] font-bold"
                  >
                    {isMl
                      ? "സുരക്ഷാ ചെക്ക്‌ലിസ്റ്റ് തുറക്കുക"
                      : "Go to Deterministic Safety Checklist"}
                  </button>
                  <a
                    href="tel:108"
                    className="px-3 py-1.5 rounded-xl bg-white border border-[#FF3B30] text-[#FF3B30] text-[12px] font-bold"
                  >
                    {isMl ? "108 വിളിക്കുക" : "Dial 108"}
                  </a>
                </div>
              )}
            </div>
          ))}

          {/* Suggested Educational Prompts */}
          <div className="pt-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#8E8E93] block mb-2">
              {isMl
                ? "പതിവായി ചോദിക്കുന്ന ഗർഭകാല സംശയങ്ങൾ"
                : "Suggested Kerala Maternal Questions"}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {QUICK_QUESTIONS.map((q, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleQuestionClick(q)}
                  className="text-left text-[12px] font-medium bg-white hover:bg-[#EAF3FF] text-[#007AFF] border border-[#007AFF]/20 rounded-xl px-3 py-2 transition-colors shadow-2xs"
                >
                  {isMl ? q.qMl : q.qEn}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Input Form */}
        <form
          onSubmit={handleSendCustom}
          className="bg-white p-3 border-t border-black/10 flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              isMl
                ? "പോഷകാഹാരം, പരിചരണം എന്നിവയെക്കുറിച്ച് ചോദിക്കുക..."
                : "Ask an educational nutrition or prenatal care question..."
            }
            className="flex-1 bg-[#F2F2F7] rounded-full px-4 py-2.5 text-[13px] text-[#1C1C1E] focus:outline-none focus:ring-2 focus:ring-[#007AFF]"
          />
          <button
            type="submit"
            className="w-10 h-10 rounded-full bg-[#007AFF] text-white flex items-center justify-center shrink-0 active:scale-95 transition-transform"
          >
            <span className="material-symbols-outlined text-[18px]">send</span>
          </button>
        </form>
      </div>
    </div>
  );
}
