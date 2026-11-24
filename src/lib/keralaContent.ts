import { getWeekGuideContent, WEEKLY_METADATA } from "./weeklyGuideData";

export { getWeekGuideContent, WEEKLY_METADATA };

export interface SuperfoodItem {
  id: string;
  nameEn: string;
  nameMl: string;
  descEn: string;
  descMl: string;
  badge1En: string;
  badge1Ml: string;
  badge1Color: string;
  badge1Bg: string;
  badge2En: string;
  badge2Ml: string;
  trimester: "All" | "1" | "2" | "3";
  image: string;
}

export interface MythFactItem {
  id: string;
  mythMl: string;
  mythEn: string;
  factEn: string;
  factMl: string;
}

export interface DangerSignItem {
  id: string;
  titleEn: string;
  titleMl: string;
  clinicalNoteEn: string;
  clinicalNoteMl: string;
  severity: "high";
}

export interface HospitalItem {
  id: string;
  districtCode: "tvm" | "ekm" | "clt" | "tcr" | "ktm" | "mlp";
  districtNameEn: string;
  districtNameMl: string;
  nameEn: string;
  nameMl: string;
  typeBadgeEn: string;
  typeBadgeMl: string;
  addressEn: string;
  addressMl: string;
  statusBadgeEn: string;
  statusBadgeMl: string;
  tags: {
    label: string;
    labelMl?: string;
    isAlert?: boolean;
    isInfo?: boolean;
  }[];
  phone: string;
  mapsQuery: string;
}

export const KERALA_SUPERFOODS: SuperfoodItem[] = [
  {
    id: "chukku",
    nameEn: "Chukku & Malli Vellam (Dry Ginger-Coriander Infusion)",
    nameMl: "ചുക്ക്-മല്ലി വെള്ളം",
    descEn:
      "Warm infusion of dry ginger and roasted coriander seeds; naturally calms first-trimester morning nausea and aids digestion.",
    descMl:
      "ഒന്നാം ത്രൈമാസത്തിലെ രാവിലെയുള്ള മനംപിരട്ടലും ദഹനക്കുറവും ശമിപ്പിക്കാൻ സഹായിക്കുന്ന ഇളം ചൂടുള്ള ചുക്ക്-മല്ലി വെള്ളം.",
    badge1En: "Anti-Nausea",
    badge1Ml: "മനംപിരട്ടൽ ശമനം",
    badge1Color: "#D97706",
    badge1Bg: "#FFF9E6",
    badge2En: "Gentle Digestion",
    badge2Ml: "സുഗമമായ ദഹനം",
    trimester: "1",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBGUZ_g0EGCWj2U6LYR7E9S0gvBitAQCkOxLpW5cLt_7dICttWNqwv5RWTgUohjsdc5sBz47ouw5VCO9wHNhqZezzQLQc86X3iCK_HVQksc8cXdh475ibDSv73lKQjEmgQ9hCFCvBrnS6e-oivIF61nMsQuQwzC9Uk1NESl6ez0HQXamKSLcfVso2eJy4H2ErxuiVyZNlwt9Hg4XRwYRKZqSZx1_zjVaiSNtkkEHs8",
  },
  {
    id: "cherupayar",
    nameEn: "Cherupayar Sundal (Steamed Green Gram)",
    nameMl: "ചെറുപയർ പുഴുങ്ങിയത്",
    descEn:
      "Lightly steamed sprouted green gram tossed with grated coconut; rich in dietary folate and plant protein for neural tube formation.",
    descMl:
      "തേങ്ങ ചിരകിയത് ചേർത്ത് വേവിച്ച ചെറുപയർ; കുഞ്ഞിന്റെ നാഡീവ്യൂഹ വളർച്ചയ്ക്ക് ആവശ്യമായ ഫോളിക് ആസിഡും പ്രോട്ടീനും നൽകുന്നു.",
    badge1En: "Natural Folate",
    badge1Ml: "സ്വാഭാവിക ഫോളിക് ആസിഡ്",
    badge1Color: "#00A86B",
    badge1Bg: "#E8F8F5",
    badge2En: "Plant Protein",
    badge2Ml: "സസ്യ പ്രോട്ടീൻ",
    trimester: "1",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAyF0QLYmLJKQKFaa4JleD4bH2qP7lkZfmeKxoc1lHDYnEnDTKDfqoW1TrEBCyuaJKiaed7iO2A7kZASQEkUqc4kps0vXOI2ojXm0SdMvfK_Qzto9786f5O6jIO5bAAsMLU951DjBGcRb9K-8MU2lWdklRB60mp_d-xbMYedp4tq3FIShobAw47PQPJSIM6-YvlL2CBqF-Bg4oC5mwL5DJMDwyQc_PTT0Jj6YV4bUA",
  },
  {
    id: "ragi",
    nameEn: "Ragi Kurukku (Finger Millet Porridge)",
    nameMl: "റാഗി കുറുക്ക്",
    descEn:
      "Finger millet slow-cooked with fresh milk and organic palm jaggery to support rapid second-trimester fetal bone ossification.",
    descMl:
      "പാലും കരിപ്പെട്ടിയും ചേർത്ത് തയ്യാറാക്കിയ പോഷകസമൃദ്ധമായ റാഗി കുറുക്ക്; കുഞ്ഞിന്റെ എല്ലുകളുടെ ബലത്തിന് അത്യുത്തമം.",
    badge1En: "High Calcium",
    badge1Ml: "ഉയർന്ന കാൽസ്യം",
    badge1Color: "#FF2D55",
    badge1Bg: "#FFF0F4",
    badge2En: "Bioavailable Iron",
    badge2Ml: "ഇരുമ്പിന്റെ അംശം",
    trimester: "2",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCmkS1gZQ9EdpS-coeLYVAttfBnFIQ9mydcqtxHOIebUvE2AmVjOevsyuD64u6kFVfdUziHcbPXI0_T4nAla4whR68kD0GxEz2xbXgkkd2Sh0F10vnD3F5TT7_W7lXw4nrzP9LroXdkpbsH1H-5z74-XorV22ge7RdCtlu44VtOospL_sjBgcM4xXdDlBRyuk8tRlsVxElYYHJBxVmALU69z9MIX6Z-8zqdnxjnkk0",
  },
  {
    id: "muringayila",
    nameEn: "Muringayila Thoran (Drumstick Leaves Stir-Fry)",
    nameMl: "മുരിങ്ങയില തോരൻ",
    descEn:
      "Fresh tender drumstick leaves lightly tossed with grated coconut and garlic to prevent maternal iron-deficiency anemia.",
    descMl:
      "തേങ്ങ ചിരകിയത് ചേർത്ത് തയ്യാറാക്കിയ ഇളം മുരിങ്ങയില തോരൻ; ഗർഭകാല വിളർച്ച തടയാൻ സഹായിക്കുന്നു.",
    badge1En: "Folate Powerhouse",
    badge1Ml: "ഫോളിക് ആസിഡ് സമൃദ്ധം",
    badge1Color: "#00A86B",
    badge1Bg: "#E8F8F5",
    badge2En: "Micronutrients",
    badge2Ml: "മൈക്രോന്യൂട്രിയന്റുകൾ",
    trimester: "2",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAyF0QLYmLJKQKFaa4JleD4bH2qP7lkZfmeKxoc1lHDYnEnDTKDfqoW1TrEBCyuaJKiaed7iO2A7kZASQEkUqc4kps0vXOI2ojXm0SdMvfK_Qzto9786f5O6jIO5bAAsMLU951DjBGcRb9K-8MU2lWdklRB60mp_d-xbMYedp4tq3FIShobAw47PQPJSIM6-YvlL2CBqF-Bg4oC5mwL5DJMDwyQc_PTT0Jj6YV4bUA",
  },
  {
    id: "mathi",
    nameEn: "Chala / Mathi Curry (Kerala Coastal Sardines)",
    nameMl: "ചാള / മത്തി കറി",
    descEn:
      "Low-mercury small pelagic fish cooked thoroughly with Kodampuli in a traditional clay chatti for fetal brain and retinal development.",
    descMl:
      "മൺചട്ടിയിൽ കുടംപുളി ചേർത്ത് നന്നായി വേവിച്ച മത്തിക്കറി; കുഞ്ഞിന്റെ ബുദ്ധിവികാസത്തിനും കാഴ്ചശക്തിക്കും അത്യുത്തമം.",
    badge1En: "Omega-3 DHA",
    badge1Ml: "ഒമേഗ-3 DHA",
    badge1Color: "#007AFF",
    badge1Bg: "#EBF5FF",
    badge2En: "Fetal Brain Health",
    badge2Ml: "മസ്തിഷ്ക വളർച്ച",
    trimester: "2",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAiFcjFST-cSWEfYnepS6TXSLXnM6mdhwdao1tbjOqJJg5_GOySsf-U28SWuvrVkD4W4uLG1LMqDBpLuuGoxK7F6M-3CxO1PE_Dzvc9VZT8mK-hkJasAA3A4YH3qMdNBVyVwTZ4U5cHeFPJq144Vx_yFp-RbAnF0p_asXYUjcff8Ae7ZgbIfAn00bqQpEj3cYvGqbN8eCXhvJGnPqdJ6ImKOVjhCfUf32FyEeavnug",
  },
  {
    id: "ulunthu",
    nameEn: "Ulunthu Kanji (Black Gram & Matta Rice Porridge)",
    nameMl: "ഉഴുന്ന് കഞ്ഞി",
    descEn:
      "Traditional third-trimester black gram porridge simmered with coconut milk and palm jaggery to build pelvic stamina for delivery.",
    descMl:
      "മൂന്നാം ത്രൈമാസത്തിൽ ഇടുപ്പ് പേശികളുടെ ബലത്തിനും പ്രസവക്കരുത്തിനും സഹായിക്കുന്ന പരമ്പരാഗത ഉഴുന്ന് കഞ്ഞി.",
    badge1En: "Pelvic Strength",
    badge1Ml: "ഇടുപ്പ് പേശീബലം",
    badge1Color: "#5856D6",
    badge1Bg: "#F2F0FF",
    badge2En: "Labour Stamina",
    badge2Ml: "പ്രസവക്കരുത്ത്",
    trimester: "3",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCmkS1gZQ9EdpS-coeLYVAttfBnFIQ9mydcqtxHOIebUvE2AmVjOevsyuD64u6kFVfdUziHcbPXI0_T4nAla4whR68kD0GxEz2xbXgkkd2Sh0F10vnD3F5TT7_W7lXw4nrzP9LroXdkpbsH1H-5z74-XorV22ge7RdCtlu44VtOospL_sjBgcM4xXdDlBRyuk8tRlsVxElYYHJBxVmALU69z9MIX6Z-8zqdnxjnkk0",
  },
  {
    id: "nendran",
    nameEn: "Puzhungiya Nendran (Steamed Ripe Kerala Banana)",
    nameMl: "പുഴുങ്ങിയ നേന്ത്രപ്പഴം",
    descEn:
      "Steamed ripe Kerala Nendran banana; gentle on digestion, promotes healthy fetal weight gain, and prevents nocturnal calf cramps.",
    descMl:
      "ദഹനത്തിന് ഉത്തമവും കാലിലെ പേശിവലിവ് തടയാനും കുഞ്ഞിന്റെ തൂക്കം കൂടാനും സഹായിക്കുന്നതുമായ പുഴുങ്ങിയ നേന്ത്രപ്പഴം.",
    badge1En: "Potassium",
    badge1Ml: "പൊട്ടാസ്യം",
    badge1Color: "#D97706",
    badge1Bg: "#FFF9E6",
    badge2En: "Easy Fiber",
    badge2Ml: "നാരുകൾ അടങ്ങിയത്",
    trimester: "All",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDGw3-c-_8XWuBSV_8jwql-hb7z5FNUkcdMEm5oEU0rniJykh9yWUeMPNWuE0M94oTbuivQAbneLGKequGtWLWvnh7-q_2VRtLIUJARk3NGBV1jjxOoqF6zp2jZJwRf2HZE5YPuP2A5xx_UwQPfFp5GBrujS9jogVlQNMPo3o7f-6QnHYKGS09gYimPLdKfA9I7UeYLBV6eXrr1FXFOQzBSG5HDQ9XcqUp3wtaauts",
  },
  {
    id: "nellikka",
    nameEn: "Nellikka (Fresh Indian Gooseberry / Amla)",
    nameMl: "നാടൻ നെല്ലിക്ക",
    descEn:
      "Fresh gooseberry rich in natural Vitamin C to maximize intestinal iron absorption from your daily IFA tablet and leafy meals.",
    descMl:
      "ഇരുമ്പിന്റെ ആഗിരണം കൂട്ടാനും പ്രതിരോധശേഷി വർദ്ധിപ്പിക്കാനും സഹായിക്കുന്ന വൈറ്റമിൻ സി നിറഞ്ഞ പച്ച നെല്ലിക്ക.",
    badge1En: "High Vitamin C",
    badge1Ml: "വൈറ്റമിൻ സി",
    badge1Color: "#00A86B",
    badge1Bg: "#E8F8F5",
    badge2En: "Iron Absorption",
    badge2Ml: "ഇരുമ്പ് ആഗിരണം",
    trimester: "All",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBGUZ_g0EGCWj2U6LYR7E9S0gvBitAQCkOxLpW5cLt_7dICttWNqwv5RWTgUohjsdc5sBz47ouw5VCO9wHNhqZezzQLQc86X3iCK_HVQksc8cXdh475ibDSv73lKQjEmgQ9hCFCvBrnS6e-oivIF61nMsQuQwzC9Uk1NESl6ez0HQXamKSLcfVso2eJy4H2ErxuiVyZNlwt9Hg4XRwYRKZqSZx1_zjVaiSNtkkEHs8",
  },
];

export const KERALA_MYTHS_FACTS: MythFactItem[] = [
  {
    id: "myth-saffron",
    mythMl: '"കുങ്കുമപ്പൂവ് കഴിച്ചാൽ കുഞ്ഞിന് വെളുത്ത നിറം കിട്ടും"',
    mythEn: '"Drinking saffron milk daily guarantees a fair-complexioned baby."',
    factEn:
      "Infant skin pigmentation is determined 100% by parental genetics (melanin synthesis). Saffron is simply a pleasant culinary mood-lifter with mild antioxidants; excess quantity should be avoided.",
    factMl:
      "കുഞ്ഞിന്റെ ചർമ്മത്തിന്റെ നിറം പൂർണ്ണമായും മാതാപിതാക്കളുടെ ജനിതക ഘടനയെ (Melanin) ആശ്രയിച്ചിരിക്കുന്നു. കുങ്കുമപ്പൂവ് മിതമായ അളവിൽ പാലിൽ ചേർത്ത് കുടിക്കുന്നത് ഉന്മേഷം നൽകുമെങ്കിലും അമിതമായി ഉപയോഗിക്കരുത്.",
  },
  {
    id: "myth-papaya",
    mythMl: '"ഗർഭകാലത്ത് പപ്പായ തൊടാൻ പോലും പാടില്ല"',
    mythEn: '"Strictly avoid all papaya during every stage of pregnancy."',
    factEn:
      "Fully ripened yellow/orange papaya has zero latex and is rich in folate, fiber, and Vitamin A. Only green/unripe or semi-ripe raw papaya contains papain/latex that can trigger uterine contractions and must be avoided.",
    factMl:
      "നല്ലതുപോലെ പഴുത്ത പപ്പായയിൽ ലാറ്റക്സ് (Latex) ഇല്ല, അതിൽ ഫോളിക് ആസിഡും വൈറ്റമിൻ എ-യും ധാരാളമുണ്ട്. എന്നാൽ പച്ചയോ പകുതി പഴുത്തതോ ആയ പപ്പായ ഗർഭപാത്രം ചുരുങ്ങാൻ കാരണമാകുമെന്നതിനാൽ ഒഴിവാക്കണം.",
  },
  {
    id: "myth-eclipse",
    mythMl: '"ഗ്രഹണ സമയത്ത് പുറത്തിറങ്ങിയാൽ കുഞ്ഞിന് വൈകല്യമുണ്ടാകും"',
    mythEn: '"Stepping out or eating during a solar or lunar eclipse harms the baby."',
    factEn:
      "Eclipses are astronomical alignments and emit no harmful radiation to the fetus. Pregnant mothers should never fast for long hours during an eclipse, as dehydration or low blood sugar can cause dizziness.",
    factMl:
      "ഗ്രഹണം ഒരു ജ്യോതിശാസ്ത്ര പ്രതിഭാസം മാത്രമാണ്. ഗർഭിണികൾ ദീർഘനേരം ഭക്ഷണവും വെള്ളവും ഒഴിവാക്കി ഇരിക്കുന്നത് രക്തത്തിലെ പഞ്ചസാര കുറയാനും തലകറക്കത്തിനും കാരണമാകും.",
  },
];

export const DANGER_SIGNS_LIST: DangerSignItem[] = [
  {
    id: "headache-vision",
    titleEn: "Severe headache with blurred vision or seeing spots",
    titleMl: "തീവ്രമായ തലവേദന അല്ലെങ്കിൽ കാഴ്ച മങ്ങൽ (പ്രീ-എക്ലാംപ്സിയ ലക്ഷണം)",
    clinicalNoteEn: "Potential hypertensive / pre-eclampsia warning sign",
    clinicalNoteMl: "ഉയർന്ന രക്തസമ്മർദ്ദം / പ്രീ-എക്ലാംപ്സിയ മുന്നറിയിപ്പ് ലക്ഷണം",
    severity: "high",
  },
  {
    id: "bleeding-leakage",
    titleEn: "Any vaginal bleeding or watery fluid leakage",
    titleMl: "യോനിയിൽ നിന്നുള്ള രക്തസ്രാവം അല്ലെങ്കിൽ ദ്രാവക ചോർച്ച",
    clinicalNoteEn: "Requires immediate labour room speculum & ultrasound evaluation",
    clinicalNoteMl: "അടിയന്തരമായി ലേബർ റൂമിൽ എത്തി പരിശോധന നടത്തേണ്ട ലക്ഷണം",
    severity: "high",
  },
  {
    id: "decreased-kicks",
    titleEn: "Decreased or absent baby movements / kicks",
    titleMl: "കുഞ്ഞിന്റെ അനക്കം ഗണ്യമായി കുറയുകയോ നിൽക്കുകയോ ചെയ്യുക",
    clinicalNoteEn: "Fewer than 10 movements in 12 hours requires immediate NST/Doppler check",
    clinicalNoteMl: "12 മണിക്കൂറിൽ 10-ൽ കുറവ് അനക്കം മാത്രമാണെങ്കിൽ ഉടൻ NST/ഡോപ്ലർ പരിശോധന വേണം",
    severity: "high",
  },
  {
    id: "epigastric-pain",
    titleEn: "Severe persistent upper abdominal (epigastric) pain",
    titleMl: "നെഞ്ചെരിച്ചിലിനൊപ്പം കഠിനമായ മേൽവയറുവേദന",
    clinicalNoteEn: "Epigastric pain unresponsive to antacids warrants urgent BP/liver panel",
    clinicalNoteMl: "മരുന്നിന് കുറയാത്ത കഠിനമായ വയറുവേദനയ്ക്ക് അടിയന്തര ബി.പി പരിശോധന ആവശ്യമാണ്",
    severity: "high",
  },
  {
    id: "high-fever",
    titleEn: "High fever (>100.4°F / 38°C) with chills or shivering",
    titleMl: "കടുത്ത പനി അല്ലെങ്കിൽ വിറയൽ (>100.4°F / 38°C)",
    clinicalNoteEn: "Maternal pyrexia above 100.4°F (38°C) requires prompt infection screen",
    clinicalNoteMl: "ഗർഭകാലത്തെ കടുത്ത പനിക്ക് ഉടൻ അണുബാധാ പരിശോധനയും ചികിത്സയും തേടണം",
    severity: "high",
  },
  {
    id: "acute-swelling",
    titleEn: "Sudden acute swelling of face, hands, or feet",
    titleMl: "മുഖത്തോ കൈകാലുകളിലോ പെട്ടെന്നുള്ള നീർക്കെട്ട്",
    clinicalNoteEn: "Sudden non-dependent edema is a key clinical indicator for pre-eclampsia",
    clinicalNoteMl: "മുഖത്തും കൈകളിലും പെട്ടെന്നുണ്ടാകുന്ന നീര് പ്രീ-എക്ലാംപ്സിയയുടെ പ്രധാന ലക്ഷണമാണ്",
    severity: "high",
  },
];

export const KERALA_DISTRICTS = [
  { code: "tvm", nameEn: "Thiruvananthapuram", nameMl: "തിരുവനന്തപുരം" },
  { code: "ekm", nameEn: "Ernakulam / Kochi", nameMl: "എറണാകുളം / കൊച്ചി" },
  { code: "clt", nameEn: "Kozhikode", nameMl: "കോഴിക്കോട്" },
  { code: "tcr", nameEn: "Thrissur", nameMl: "തൃശ്ശൂർ" },
  { code: "ktm", nameEn: "Kottayam", nameMl: "കോട്ടയം" },
  { code: "mlp", nameEn: "Malappuram", nameMl: "മലപ്പുറം" },
  { code: "all", nameEn: "All Kerala Districts", nameMl: "എല്ലാ കേരള ജില്ലകളും" },
] as const;

export const KERALA_HOSPITALS: HospitalItem[] = [
  {
    id: "sat-tvm",
    districtCode: "tvm",
    districtNameEn: "Thiruvananthapuram",
    districtNameMl: "തിരുവനന്തപുരം",
    nameEn: "SAT Hospital, Govt Medical College",
    nameMl: "എസ്.എ.ടി ആശുപത്രി, തിരുവനന്തപുരം",
    typeBadgeEn: "Govt Medical College",
    typeBadgeMl: "ഗവ. മെഡിക്കൽ കോളേജ്",
    addressEn: "Medical College P.O., Thiruvananthapuram",
    addressMl: "മെഡിക്കൽ കോളേജ് പി.ഒ, തിരുവനന്തപുരം",
    statusBadgeEn: "24/7 CEmONC",
    statusBadgeMl: "24/7 അടിയന്തര പരിചരണം",
    tags: [
      { label: "NICU Level III", labelMl: "ലെവൽ-3 എൻ.ഐ.സി.യു" },
      { label: "High-Risk Obstetric ICU", labelMl: "ഹൈ-റിസ്ക് ഒബ്സ്റ്റട്രിക് ഐ.സി.യു" },
      { label: "Blood Bank On-Site", labelMl: "24/7 ബ്ലഡ് ബാങ്ക്", isAlert: true },
    ],
    phone: "0471-2528300",
    mapsQuery: "SAT+Hospital+Trivandrum",
  },
  {
    id: "wc-thycaud",
    districtCode: "tvm",
    districtNameEn: "Thiruvananthapuram",
    districtNameMl: "തിരുവനന്തപുരം",
    nameEn: "Women & Children Hospital, Thycaud",
    nameMl: "സ്ത്രീകളുടെയും കുട്ടികളുടെയും ആശുപത്രി, തൈക്കാട്",
    typeBadgeEn: "Govt Apex Hospital",
    typeBadgeMl: "ഗവ. സ്പെഷ്യാലിറ്റി ആശുപത്രി",
    addressEn: "Thycaud, Thiruvananthapuram",
    addressMl: "തൈക്കാട്, തിരുവനന്തപുരം",
    statusBadgeEn: "24/7 Labour Ward",
    statusBadgeMl: "24/7 ലേബർ വാർഡ്",
    tags: [
      { label: "Emergency OT", labelMl: "അടിയന്തര ഓപ്പറേഷൻ തിയേറ്റർ" },
      { label: "Maternity Triage", labelMl: "മെറ്റേണിറ്റി ട്രയാജ്" },
      { label: "JSSK Free Care", labelMl: "ജെ.എസ്.എസ്.കെ സൗജന്യ പരിചരണം", isInfo: true },
    ],
    phone: "0471-2323457",
    mapsQuery: "Women+and+Children+Hospital+Thycaud",
  },
  {
    id: "aster-kochi",
    districtCode: "ekm",
    districtNameEn: "Ernakulam",
    districtNameMl: "എറണാകുളം",
    nameEn: "Aster Medcity Maternity Triage",
    nameMl: "ആസ്റ്റർ മെഡ്സിറ്റി, കൊച്ചി",
    typeBadgeEn: "Quaternary Care",
    typeBadgeMl: "മൾട്ടി-സ്പെഷ്യാലിറ്റി സെന്റർ",
    addressEn: "South Chittoor, Cheranalloor, Kochi",
    addressMl: "സൗത്ത് ചിറ്റൂർ, ചേരാനല്ലൂർ, കൊച്ചി",
    statusBadgeEn: "24/7 Critical Team",
    statusBadgeMl: "24/7 ക്രിട്ടിക്കൽ ടീം",
    tags: [
      { label: "Maternal ICU", labelMl: "മെറ്റേണൽ ഐ.സി.യു" },
      { label: "Fetal Medicine Unit", labelMl: "ഫീറ്റൽ മെഡിസിൻ വിഭാഗം" },
      { label: "Level IV NICU", labelMl: "ലെവൽ-4 എൻ.ഐ.സി.യു" },
    ],
    phone: "0484-6699999",
    mapsQuery: "Aster+Medcity+Kochi",
  },
  {
    id: "gh-ernakulam",
    districtCode: "ekm",
    districtNameEn: "Ernakulam",
    districtNameMl: "എറണാകുളം",
    nameEn: "General Hospital Ernakulam",
    nameMl: "ജനറൽ ആശുപത്രി, എറണാകുളം",
    typeBadgeEn: "Govt Tertiary Care",
    typeBadgeMl: "ഗവ. ജനറൽ ആശുപത്രി",
    addressEn: "Hospital Rd, Marine Drive, Ernakulam",
    addressMl: "ഹോസ്പിറ്റൽ റോഡ്, മറൈൻ ഡ്രൈവ്, എറണാകുളം",
    statusBadgeEn: "24/7 Labour Room",
    statusBadgeMl: "24/7 ലേബർ റൂം",
    tags: [
      { label: "CEmONC Unit", labelMl: "അടിയന്തര പ്രസവ വിഭാഗം" },
      { label: "NICU Support", labelMl: "എൻ.ഐ.സി.യു സൗകര്യം" },
      { label: "JSSK Free Care", labelMl: "ജെ.എസ്.എസ്.കെ സൗജന്യ പരിചരണം", isInfo: true },
    ],
    phone: "0484-2360002",
    mapsQuery: "General+Hospital+Ernakulam",
  },
  {
    id: "imch-calicut",
    districtCode: "clt",
    districtNameEn: "Kozhikode",
    districtNameMl: "കോഴിക്കോട്",
    nameEn: "IMCH Govt Medical College, Kozhikode",
    nameMl: "ഐ.എം.സി.എച്ച് ഗവ. മെഡിക്കൽ കോളേജ്, കോഴിക്കോട്",
    typeBadgeEn: "Apex Mother & Child",
    typeBadgeMl: "മാതൃ-ശിശു സംരക്ഷണ കേന്ദ്രം",
    addressEn: "Medical College Rd, Kozhikode",
    addressMl: "മെഡിക്കൽ കോളേജ് റോഡ്, കോഴിക്കോട്",
    statusBadgeEn: "24/7 CEmONC",
    statusBadgeMl: "24/7 അടിയന്തര പരിചരണം",
    tags: [
      { label: "High-Risk Delivery", labelMl: "ഹൈ-റിസ്ക് പ്രസവ വിഭാഗം" },
      { label: "KMC Ward", labelMl: "കംഗാരു മദർ കെയർ വാർഡ്" },
      { label: "Blood Component Unit", labelMl: "24/7 ബ്ലഡ് ബാങ്ക്", isAlert: true },
    ],
    phone: "0495-2350216",
    mapsQuery: "IMCH+Calicut",
  },
  {
    id: "gmc-thrissur",
    districtCode: "tcr",
    districtNameEn: "Thrissur",
    districtNameMl: "തൃശ്ശൂർ",
    nameEn: "Govt Medical College Thrissur",
    nameMl: "ഗവ. മെഡിക്കൽ കോളേജ്, തൃശ്ശൂർ",
    typeBadgeEn: "Govt Medical College",
    typeBadgeMl: "ഗവ. മെഡിക്കൽ കോളേജ്",
    addressEn: "Mulagunnathukavu, Thrissur",
    addressMl: "മുളങ്കുന്നത്തുകാവ്, തൃശ്ശൂർ",
    statusBadgeEn: "24/7 CEmONC",
    statusBadgeMl: "24/7 അടിയന്തര പരിചരണം",
    tags: [
      { label: "Obstetric ICU", labelMl: "ഒബ്സ്റ്റട്രിക് ഐ.സി.യു" },
      { label: "NICU Level III", labelMl: "ലെവൽ-3 എൻ.ഐ.സി.യു" },
      { label: "Blood Bank On-Site", labelMl: "24/7 ബ്ലഡ് ബാങ്ക്", isAlert: true },
    ],
    phone: "0487-2200310",
    mapsQuery: "Government+Medical+College+Thrissur",
  },
  {
    id: "gmc-kottayam",
    districtCode: "ktm",
    districtNameEn: "Kottayam",
    districtNameMl: "കോട്ടയം",
    nameEn: "Govt Medical College Kottayam",
    nameMl: "ഗവ. മെഡിക്കൽ കോളേജ്, കോട്ടയം",
    typeBadgeEn: "Govt Medical College",
    typeBadgeMl: "ഗവ. മെഡിക്കൽ കോളേജ്",
    addressEn: "Gandhinagar, Kottayam",
    addressMl: "ഗാന്ധിനഗർ, കോട്ടയം",
    statusBadgeEn: "24/7 CEmONC",
    statusBadgeMl: "24/7 അടിയന്തര പരിചരണം",
    tags: [
      { label: "High-Risk Labour Ward", labelMl: "ഹൈ-റിസ്ക് ലേബർ വാർഡ്" },
      { label: "Neonatal ICU", labelMl: "നവജാത ശിശു ഐ.സി.യു" },
      { label: "24/7 Blood Bank", labelMl: "24/7 ബ്ലഡ് ബാങ്ക്", isAlert: true },
    ],
    phone: "0481-2597284",
    mapsQuery: "Government+Medical+College+Kottayam",
  },
  {
    id: "gmc-manjeri",
    districtCode: "mlp",
    districtNameEn: "Malappuram",
    districtNameMl: "മലപ്പുറം",
    nameEn: "Govt Medical College Manjeri",
    nameMl: "ഗവ. മെഡിക്കൽ കോളേജ്, മഞ്ചേരി",
    typeBadgeEn: "Govt Medical College",
    typeBadgeMl: "ഗവ. മെഡിക്കൽ കോളേജ്",
    addressEn: "Manjeri, Malappuram",
    addressMl: "മഞ്ചേരി, മലപ്പുറം",
    statusBadgeEn: "24/7 CEmONC",
    statusBadgeMl: "24/7 അടിയന്തര പരിചരണം",
    tags: [
      { label: "24/7 Maternity OT", labelMl: "24/7 മെറ്റേണിറ്റി ഒ.ടി" },
      { label: "SNCU / NICU", labelMl: "എസ്.എൻ.സി.യു / എൻ.ഐ.സി.യു" },
      { label: "JSSK Free Care", labelMl: "ജെ.എസ്.എസ്.കെ സൗജന്യ പരിചരണം", isInfo: true },
    ],
    phone: "0483-2766425",
    mapsQuery: "Government+Medical+College+Manjeri",
  },
];
