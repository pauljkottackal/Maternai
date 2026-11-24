import { WeekGuideContent } from "./types";

interface WeeklyMetaEntry {
  cropEn: string;
  cropMl: string;
  lengthCm: string;
  weightGrams: string;
  isMilestone?: boolean;
  titleEn: string;
  titleMl: string;
  summaryEn: string;
  summaryMl: string;
  subtextEn: string;
  subtextMl: string;
  babyFocusTitleEn: string;
  babyFocusTitleMl: string;
  babyFocusDescEn: string;
  babyFocusDescMl: string;
  maternalFocusTitleEn: string;
  maternalFocusTitleMl: string;
  maternalFocusDescEn: string;
  maternalFocusDescMl: string;
  scanFocusTitleEn: string;
  scanFocusTitleMl: string;
  scanFocusDescEn: string;
  scanFocusDescMl: string;
}

interface StageClinicalBlock {
  babySubtitleEn: string;
  babySubtitleMl: string;
  babyPoints: [
    {
      icon: string;
      color: string;
      titleEn: string;
      titleMl: string;
      descEn: string;
      descMl: string;
    },
    {
      icon: string;
      color: string;
      titleEn: string;
      titleMl: string;
      descEn: string;
      descMl: string;
    }
  ];
  maternalSubtitleEn: string;
  maternalSubtitleMl: string;
  maternalPoints: [
    {
      titleEn: string;
      titleMl: string;
      descEn: string;
      descMl: string;
    },
    {
      titleEn: string;
      titleMl: string;
      descEn: string;
      descMl: string;
    }
  ];
  activitiesSubtitleEn: string;
  activitiesSubtitleMl: string;
  activitiesPoints: [
    {
      titleEn: string;
      titleMl: string;
      descEn: string;
      descMl: string;
    },
    {
      titleEn: string;
      titleMl: string;
      descEn: string;
      descMl: string;
    }
  ];
  scansSubtitleEn: string;
  scansSubtitleMl: string;
  secondaryScanPoint: {
    icon: string;
    titleEn: string;
    titleMl: string;
    descEn: string;
    descMl: string;
  };
  nutritionHighlight: {
    titleEn: string;
    titleMl: string;
    descEn: string;
    descMl: string;
    intakeEn: string;
    intakeMl: string;
    image: string;
  };
}

const NUTRITION_IMAGES = {
  ragi: "https://lh3.googleusercontent.com/aida-public/AB6AXuCmkS1gZQ9EdpS-coeLYVAttfBnFIQ9mydcqtxHOIebUvE2AmVjOevsyuD64u6kFVfdUziHcbPXI0_T4nAla4whR68kD0GxEz2xbXgkkd2Sh0F10vnD3F5TT7_W7lXw4nrzP9LroXdkpbsH1H-5z74-XorV22ge7RdCtlu44VtOospL_sjBgcM4xXdDlBRyuk8tRlsVxElYYHJBxVmALU69z9MIX6Z-8zqdnxjnkk0",
  muringayila:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAyF0QLYmLJKQKFaa4JleD4bH2qP7lkZfmeKxoc1lHDYnEnDTKDfqoW1TrEBCyuaJKiaed7iO2A7kZASQEkUqc4kps0vXOI2ojXm0SdMvfK_Qzto9786f5O6jIO5bAAsMLU951DjBGcRb9K-8MU2lWdklRB60mp_d-xbMYedp4tq3FIShobAw47PQPJSIM6-YvlL2CBqF-Bg4oC5mwL5DJMDwyQc_PTT0Jj6YV4bUA",
  nendran:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDGw3-c-_8XWuBSV_8jwql-hb7z5FNUkcdMEm5oEU0rniJykh9yWUeMPNWuE0M94oTbuivQAbneLGKequGtWLWvnh7-q_2VRtLIUJARk3NGBV1jjxOoqF6zp2jZJwRf2HZE5YPuP2A5xx_UwQPfFp5GBrujS9jogVlQNMPo3o7f-6QnHYKGS09gYimPLdKfA9I7UeYLBV6eXrr1FXFOQzBSG5HDQ9XcqUp3wtaauts",
  mathi:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAiFcjFST-cSWEfYnepS6TXSLXnM6mdhwdao1tbjOqJJg5_GOySsf-U28SWuvrVkD4W4uLG1LMqDBpLuuGoxK7F6M-3CxO1PE_Dzvc9VZT8mK-hkJasAA3A4YH3qMdNBVyVwTZ4U5cHeFPJq144Vx_yFp-RbAnF0p_asXYUjcff8Ae7ZgbIfAn00bqQpEj3cYvGqbN8eCXhvJGnPqdJ6ImKOVjhCfUf32FyEeavnug",
  nellikka:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBGUZ_g0EGCWj2U6LYR7E9S0gvBitAQCkOxLpW5cLt_7dICttWNqwv5RWTgUohjsdc5sBz47ouw5VCO9wHNhqZezzQLQc86X3iCK_HVQksc8cXdh475ibDSv73lKQjEmgQ9hCFCvBrnS6e-oivIF61nMsQuQwzC9Uk1NESl6ez0HQXamKSLcfVso2eJy4H2ErxuiVyZNlwt9Hg4XRwYRKZqSZx1_zjVaiSNtkkEHs8",
};

export const WEEKLY_METADATA: Record<number, WeeklyMetaEntry> = {
  1: {
    cropEn: "Pre-Implantation Follicle",
    cropMl: "അണ്ഡവിസർജ്ജന തയ്യാറെടുപ്പ്",
    lengthCm: "0.01 cm",
    weightGrams: "< 1 g",
    titleEn: "Week 1: Cycle Start & Folate Foundation",
    titleMl: "ആഴ്ച 1: ഗർഭകാല തുടക്കവും ഫോളിക് ആസിഡും",
    summaryEn:
      "Obstetric dating begins from the first day of your last menstrual period (LMP). Daily 400 mcg folic acid builds neural reserves.",
    summaryMl:
      "അവസാന ആർത്തവത്തിന്റെ ആദ്യ ദിനം മുതലാണ് ഗർഭകാലം കണക്കാക്കുന്നത്. ദിവസവും 400 mcg ഫോളിക് ആസിഡ് കഴിച്ചു തുടങ്ങുക.",
    subtextEn: "Your body is preparing the uterine lining for conception.",
    subtextMl: "ഗർഭധാരണത്തിനായി ഗർഭപാത്രം തയ്യാറെടുക്കുന്ന ഘട്ടം.",
    babyFocusTitleEn: "Follicular Maturation:",
    babyFocusTitleMl: "അണ്ഡ വളർച്ച:",
    babyFocusDescEn:
      "Ovarian follicles mature in preparation for ovulation while cellular folate stores support healthy DNA synthesis.",
    babyFocusDescMl:
      "അണ്ഡവിസർജ്ജനത്തിനായി ശരീരം തയ്യാറെടുക്കുന്നു. ഫോളിക് ആസിഡ് കോശവളർച്ചയ്ക്ക് സഹായിക്കുന്നു.",
    maternalFocusTitleEn: "Uterine Renewal:",
    maternalFocusTitleMl: "ഗർഭപാത്ര തയ്യാറെടുപ്പ്:",
    maternalFocusDescEn:
      "Estrogen and progesterone begin rebuilding a nutrient-rich endometrium.",
    maternalFocusDescMl:
      "ഈസ്ട്രജൻ, പ്രൊജസ്ട്രോൺ ഹോർമോണുകൾ ഗർഭപാത്രത്തിന്റെ ഉൾപ്പാളി പുതുക്കിപ്പണിയുന്നു.",
    scanFocusTitleEn: "Pre-Conception Folic Acid (400 mcg):",
    scanFocusTitleMl: "ഫോളിക് ആസിഡ് ഗുളിക (400 mcg):",
    scanFocusDescEn:
      "Continue daily folic acid supplementation and log your exact LMP date for accurate 280-day EDD tracking.",
    scanFocusDescMl:
      "കൃത്യമായ പ്രസവ തീയതി കണക്കാക്കാൻ അവസാന ആർത്തവ തീയതി കുറിച്ചുവെക്കുക.",
  },
  2: {
    cropEn: "Microscopic Ovum",
    cropMl: "സൂക്ഷ്മ അണ്ഡകോശം",
    lengthCm: "0.02 cm",
    weightGrams: "< 1 g",
    titleEn: "Week 2: Ovulation & Fertilization Window",
    titleMl: "ആഴ്ച 2: അണ്ഡവിസർജ്ജനവും ബീജസങ്കലനവും",
    summaryEn:
      "Ovulation occurs at the end of this week. Fertilization unites 23 maternal and 23 paternal chromosomes.",
    summaryMl:
      "ഈ ആഴ്ചയുടെ അവസാനത്തോടെ അണ്ഡവിസർജ്ജനവും ബീജസങ്കലനവും നടക്കുന്നു.",
    subtextEn: "Microscopic cellular union (~0.02 cm) inside the fallopian tube.",
    subtextMl: "ഫാലോപ്യൻ ട്യൂബിൽ വെച്ച് ബീജസങ്കലനം നടക്കുന്ന ഘട്ടം.",
    babyFocusTitleEn: "Chromosomal Blueprint:",
    babyFocusTitleMl: "ജനിതക ഘടന:",
    babyFocusDescEn:
      "A single fertilized zygote carries the complete 46-chromosome genetic blueprint of your baby.",
    babyFocusDescMl:
      "കുഞ്ഞിന്റെ പൂർണ്ണ ജനിതക ഘടന (46 ക്രോമസോമുകൾ) ഈ ഘട്ടത്തിൽ നിശ്ചയിക്കപ്പെടുന്നു.",
    maternalFocusTitleEn: "Basal Temperature Shift:",
    maternalFocusTitleMl: "ശരീര താപനിലയിലെ മാറ്റം:",
    maternalFocusDescEn:
      "Progesterone rises post-ovulation to warm and vascularize the uterine lining.",
    maternalFocusDescMl:
      "പ്രൊജസ്ട്രോൺ ഹോർമോൺ വർദ്ധിക്കുകയും ഗർഭപാത്രത്തിലേക്കുള്ള രക്തയോട്ടം കൂടുകയും ചെയ്യുന്നു.",
    scanFocusTitleEn: "Avoid Unprescribed Medications:",
    scanFocusTitleMl: "സ്വയം ചികിത്സ ഒഴിവാക്കുക:",
    scanFocusDescEn:
      "Avoid over-the-counter NSAID painkillers and unverified herbal decoctions during early conception.",
    scanFocusDescMl:
      "ഡോക്ടറുടെ നിർദ്ദേശമില്ലാതെ വേദനസംഹാരികളോ മറ്റ് മരുന്നുകളോ കഴിക്കരുത്.",
  },
  3: {
    cropEn: "Vanilla Bean Speck (Vanilla Thari)",
    cropMl: "വാനില തരി",
    lengthCm: "0.1 cm",
    weightGrams: "< 1 g",
    titleEn: "Week 3: Blastocyst Division & Journey",
    titleMl: "ആഴ്ച 3: കോശവിഭജനവും വളർച്ചയും",
    summaryEn:
      "The fertilized cell divides rapidly into a blastocyst of over 100 cells as it travels toward the uterus.",
    summaryMl:
      "ബീജസങ്കലനം നടന്ന കോശം വേഗത്തിൽ വിഭജിച്ച് ഗർഭപാത്രത്തിലേക്ക് സഞ്ചരിക്കുന്നു.",
    subtextEn: "Tiny as a Vanilla Bean Speck (~0.1 cm). Rapid cellular division.",
    subtextMl: "ഒരു ചെറിയ വാനില തരിയുടെ വലിപ്പം (~0.1 സെ.മീ).",
    babyFocusTitleEn: "Morula to Blastocyst:",
    babyFocusTitleMl: "ബ്ലാസ്റ്റോസിസ്റ്റ് രൂപീകരണം:",
    babyFocusDescEn:
      "The inner cell mass prepares to become the embryo while the outer layer forms the early placenta.",
    babyFocusDescMl:
      "ആന്തരിക കോശങ്ങൾ ഭ്രൂണമായും പുറംപാളി മറുപിള്ളയായും (Placenta) മാറാൻ തയ്യാറെടുക്കുന്നു.",
    maternalFocusTitleEn: "Early hCG Signaling:",
    maternalFocusTitleMl: "ഹോർമോൺ വ്യതിയാനം:",
    maternalFocusDescEn:
      "Early immune adaptation protects the developing blastocyst as it reaches the uterine cavity.",
    maternalFocusDescMl:
      "ഭ്രൂണത്തെ സ്വീകരിക്കാൻ ശരീരത്തിലെ പ്രതിരോധ സംവിധാനം അനുകൂലമായി മാറുന്നു.",
    scanFocusTitleEn: "Folate & Iodine Nutrition:",
    scanFocusTitleMl: "ഫോളിക് ആസിഡും അയഡിനും:",
    scanFocusDescEn:
      "Use iodized salt in home cooking and take 400 mcg folic acid daily to support early neurodevelopment.",
    scanFocusDescMl:
      "ഭക്ഷണത്തിൽ അയഡിൻ ചേർന്ന ഉപ്പ് ഉപയോഗിക്കുക, ഫോളിക് ആസിഡ് മുടങ്ങാതെ കഴിക്കുക.",
  },
  4: {
    cropEn: "Mustard Seed (Kaduku)",
    cropMl: "കടുക് മണി",
    lengthCm: "0.2 cm",
    weightGrams: "< 1 g",
    isMilestone: true,
    titleEn: "Week 4: Implantation & Positive Pregnancy Test",
    titleMl: "ആഴ്ച 4: ഗർഭധാരണ സ്ഥിരീകരണവും ഫോളിക് ആസിഡും",
    summaryEn:
      "The blastocyst implants securely into the uterine wall and begins releasing hCG hormone. Three germ layers form.",
    summaryMl:
      "ഭ്രൂണം ഗർഭപാത്ര ഭിത്തിയിൽ ഉറയ്ക്കുന്നു. മൂന്ന് അടിസ്ഥാന കോശപാളികൾ രൂപപ്പെടുകയും hCG ഹോർമോൺ ഉത്പാദനം തുടങ്ങുകയും ചെയ്യുന്നു.",
    subtextEn:
      "About the size of a Kerala Mustard Seed (~0.2 cm). Amniotic sac and yolk sac are forming!",
    subtextMl:
      "ഒരു കടുക് മണിയുടെ വലിപ്പം (~0.2 സെ.മീ). അമ്നിയോട്ടിക് സഞ്ചി രൂപപ്പെടുന്നു!",
    babyFocusTitleEn: "Three Germ Layers (Ectoderm, Mesoderm, Endoderm):",
    babyFocusTitleMl: "മൂന്ന് അടിസ്ഥാന കോശപാളികൾ:",
    babyFocusDescEn:
      "Cells organize into three specialized layers that will form the nervous system, heart, and digestive tract.",
    babyFocusDescMl:
      "നാഡീവ്യൂഹം, ഹൃദയം, ദഹനവ്യവസ്ഥ എന്നിവയായി മാറുന്ന മൂന്ന് കോശപാളികൾ രൂപപ്പെടുന്നു.",
    maternalFocusTitleEn: "Missed Period & Implantation Spotting:",
    maternalFocusTitleMl: "ആർത്തവം നീളലും പ്രാരംഭ ലക്ഷണങ്ങളും:",
    maternalFocusDescEn:
      "Mild cramping or a few drops of light spotting can occur during implantation. Breasts may feel tender.",
    maternalFocusDescMl:
      "ഭ്രൂണം ഗർഭപാത്രത്തിൽ ഉറയ്ക്കുമ്പോൾ ചെറിയ തളർച്ചയോ സ്തനങ്ങളിൽ നേരിയ വേദനയോ അനുഭവപ്പെടാം.",
    scanFocusTitleEn: "Urine Pregnancy Test (UPT) & Folic Acid:",
    scanFocusTitleMl: "ഗർഭപരിശോധനയും (UPT) ഫോളിക് ആസിഡും:",
    scanFocusDescEn:
      "Confirm pregnancy with a morning urine hCG test at home or your nearest Kerala PHC sub-centre and ensure 400 mcg Folic Acid daily.",
    scanFocusDescMl:
      "പ്രാഥമിക ആരോഗ്യ കേന്ദ്രത്തിലോ വീട്ടിലോ മൂത്രപരിശോധന വഴി ഗർഭം സ്ഥിരീകരിക്കുക. ദിവസവും ഫോളിക് ആസിഡ് കഴിക്കുക.",
  },
  5: {
    cropEn: "Sesame Seed (Ellu)",
    cropMl: "എള്ള് മണി",
    lengthCm: "0.4 cm",
    weightGrams: "< 1 g",
    titleEn: "Week 5: Neural Tube Formation Begins",
    titleMl: "ആഴ്ച 5: നാഡീവ്യൂഹത്തിന്റെ പ്രാരംഭ വളർച്ച",
    summaryEn:
      "The neural tube—which becomes your baby's brain and spinal cord—is folding and closing this week.",
    summaryMl:
      "കുഞ്ഞിന്റെ തലച്ചോറും സുഷുമ്നാ നാഡിയും രൂപപ്പെടുന്ന ന്യൂറൽ ട്യൂബ് ഈ ആഴ്ച വളർന്നു തുടങ്ങുന്നു.",
    subtextEn:
      "Sized like a Kerala Sesame Seed (~0.4 cm). Primitive heart tube begins to pulse!",
    subtextMl:
      "ഒരു എള്ള് മണിയുടെ വലിപ്പം (~0.4 സെ.മീ). ഹൃദയത്തിന്റെ പ്രാരംഭ രൂപം തുടിച്ചു തുടങ്ങുന്നു!",
    babyFocusTitleEn: "Neural Plate & Primitive Heart Tube:",
    babyFocusTitleMl: "ന്യൂറൽ ട്യൂബും ഹൃദയത്തുടിപ്പും:",
    babyFocusDescEn:
      "The neural groove zips closed while microscopic blood vessels connect the embryo to the developing chorionic villi.",
    babyFocusDescMl:
      "തലച്ചോറിന്റെയും നട്ടെല്ലിന്റെയും അടിസ്ഥാനമായ ന്യൂറൽ ട്യൂബ് രൂപപ്പെടുന്നു.",
    maternalFocusTitleEn: "Rising hCG & Early Fatigue:",
    maternalFocusTitleMl: "ക്ഷീണവും ഉറക്കവും:",
    maternalFocusDescEn:
      "hCG doubles every 48–72 hours, often causing daytime sleepiness and heightened sense of smell.",
    maternalFocusDescMl:
      "ഹോർമോൺ അളവ് വേഗത്തിൽ ഉയരുന്നതിനാൽ പകൽ സമയത്ത് കൂടുതൽ ക്ഷീണവും മണങ്ങളോട് അസ്വസ്ഥതയും തോന്നാം.",
    scanFocusTitleEn: "First Obstetric Registration & Thyroid Screen:",
    scanFocusTitleMl: "ആദ്യ ഡോക്ടർ സന്ദർശനവും തൈറോയ്ഡ് പരിശോധനയും:",
    scanFocusDescEn:
      "Schedule your initial clinic visit for baseline TSH (thyroid), hemoglobin, and blood group typing.",
    scanFocusDescMl:
      "രക്തഗ്രൂപ്പ്, ഹീമോഗ്ലോബിൻ, തൈറോയ്ഡ് (TSH) എന്നിവ പരിശോധിക്കാൻ ഡോക്ടറെ സന്ദർശിക്കുക.",
  },
  6: {
    cropEn: "Green Gram (Cherupayar)",
    cropMl: "ചെറുപയർ മണി",
    lengthCm: "0.6 cm",
    weightGrams: "< 1 g",
    titleEn: "Week 6: First Cardiac Pulse & Optic Buds",
    titleMl: "ആഴ്ച 6: ആദ്യ ഹൃദയമിടിപ്പും കണ്ണിന്റെ മുകുളങ്ങളും",
    summaryEn:
      "A tiny C-shaped embryo now has a rhythmic cardiac pulse of 105–120 bpm and early buds for eyes, ears, and limbs.",
    summaryMl:
      "കുഞ്ഞിന്റെ ഹൃദയം മിനിറ്റിൽ 105–120 തവണ മിടിച്ചു തുടങ്ങുന്നു. കണ്ണുകളുടെയും കൈകാലുകളുടെയും മുകുളങ്ങൾ രൂപപ്പെടുന്നു.",
    subtextEn:
      "About the size of a Kerala Green Gram / Cherupayar (~0.6 cm). Neural tube closure completes.",
    subtextMl:
      "ഒരു ചെറുപയർ മണിയുടെ വലിപ്പം (~0.6 സെ.മീ). ഹൃദയമിടിപ്പ് വ്യക്തമായി തുടങ്ങുന്നു.",
    babyFocusTitleEn: "Rhythmic Cardiac Contractions:",
    babyFocusTitleMl: "ക്രമമായ ഹൃദയമിടിപ്പ്:",
    babyFocusDescEn:
      "The embryonic heart chambers begin pumping blood through a closed vascular loop, visible on early transvaginal ultrasound.",
    babyFocusDescMl:
      "ഭ്രൂണത്തിന്റെ ചെറിയ ഹൃദയം രക്തം പമ്പ് ചെയ്തു തുടങ്ങുന്നു; സ്കാനിംഗിൽ ഇത് കാണാൻ സാധിക്കും.",
    maternalFocusTitleEn: "Morning Nausea & Salivation:",
    maternalFocusTitleMl: "രാവിലെയുള്ള മനംപിരട്ടൽ:",
    maternalFocusDescEn:
      "Eat 2 dry arrowroot biscuits or toasted rice flakes (Aval) before rising from bed to settle gastric acid.",
    maternalFocusDescMl:
      "രാവിലെ എഴുന്നേൽക്കുമ്പോൾ തന്നെ അല്പം അവലോ കൂവ ബിസ്കറ്റോ കഴിക്കുന്നത് മനംപിരട്ടൽ കുറയ്ക്കും.",
    scanFocusTitleEn: "Early Viability Check (If Indicated):",
    scanFocusTitleMl: "പ്രാരംഭ പരിശോധനകൾ:",
    scanFocusDescEn:
      "Mothers with prior pregnancy complications or pain should get an early ultrasound to confirm intrauterine location.",
    scanFocusDescMl:
      "മുമ്പ് ഗർഭകാല ബുദ്ധിമുട്ടുകൾ ഉണ്ടായിട്ടുള്ളവർ ഡോക്ടറുടെ നിർദ്ദേശപ്രകാരം പ്രാരംഭ സ്കാൻ ചെയ്യുക.",
  },
  7: {
    cropEn: "Green Cardamom (Elakkaya)",
    cropMl: "ഏലയ്ക്ക",
    lengthCm: "1.3 cm",
    weightGrams: "~1 g",
    titleEn: "Week 7: Brain Hemispheres & Dating Scan",
    titleMl: "ആഴ്ച 7: മസ്തിഷ്ക വികാസവും ഡേറ്റിംഗ് സ്കാനും",
    summaryEn:
      "The brain divides into left and right hemispheres, generating 100,000 new neurons every minute! Paddle-shaped hands appear.",
    summaryMl:
      "തലച്ചോറിന്റെ ഇരു അർദ്ധഗോളങ്ങളും വേർതിരിയുന്നു. കൈകാലുകളുടെ പ്രാരംഭ രൂപം വ്യക്തമാകുന്നു.",
    subtextEn:
      "Sized like a fragrant Idukki Cardamom pod (~1.3 cm, ~1 g). Liver and kidneys begin forming.",
    subtextMl:
      "ഒരു ഏലയ്ക്കയുടെ വലിപ്പം (~1.3 സെ.മീ, ~1 ഗ്രാം). കരളും വൃക്കകളും രൂപപ്പെടുന്നു.",
    babyFocusTitleEn: "Rapid Neurogenesis & Limb Paddles:",
    babyFocusTitleMl: "മസ്തിഷ്ക കോശങ്ങളുടെ വളർച്ച:",
    babyFocusDescEn:
      "Cerebral vesicles expand rapidly while arm and leg buds flatten into tiny paddle shapes with early cartilage models.",
    babyFocusDescMl:
      "മസ്തിഷ്ക കോശങ്ങൾ അതിവേഗം വളരുന്നു. കൈപ്പത്തിയും കാൽപ്പാദവും രൂപപ്പെടാൻ തുടങ്ങുന്നു.",
    maternalFocusTitleEn: "Frequent Urination & Food Aversions:",
    maternalFocusTitleMl: "കൂടെക്കൂടെ മൂത്രശങ്കയും രുചിമാറ്റവും:",
    maternalFocusDescEn:
      "Increased renal blood flow and uterine growth press gently on the bladder; sip warm Chukku Vellam through the day.",
    maternalFocusDescMl:
      "വൃക്കകളിലേക്കുള്ള രക്തയോട്ടം കൂടുന്നതിനാൽ കൂടെക്കൂടെ മൂത്രമൊഴിക്കാൻ തോന്നാം. ഇളം ചൂടുള്ള ചുക്കുവെള്ളം കുടിക്കുക.",
    scanFocusTitleEn: "Dating & Viability Ultrasound (Weeks 7–8):",
    scanFocusTitleMl: "ഡേറ്റിംഗ് അൾട്രാസൗണ്ട് സ്കാൻ (7–8 ആഴ്ചകൾ):",
    scanFocusDescEn:
      "Measures Crown-Rump Length (CRL) to establish your definitive Expected Date of Delivery (EDD) and confirm fetal heartbeat.",
    scanFocusDescMl:
      "കുഞ്ഞിന്റെ ഹൃദയമിടിപ്പും കൃത്യമായ പ്രസവ തീയതിയും (EDD) നിർണ്ണയിക്കുന്ന ഡേറ്റിംഗ് സ്കാൻ.",
  },
  8: {
    cropEn: "Malabar Black Pepper (Kurumulaku)",
    cropMl: "കുരുമുളക് മണി",
    lengthCm: "1.6 cm",
    weightGrams: "~1 g",
    isMilestone: true,
    titleEn: "Week 8: Tiny Heartbeat & Webbed Digits",
    titleMl: "ആഴ്ച 8: ഹൃദയമിടിപ്പും കൈകാലുകളിലെ വിരലുകളും",
    summaryEn:
      "Your baby's heart beats steadily at 150–170 bpm! Webbed fingers and toes are emerging and the embryonic tail is disappearing.",
    summaryMl:
      "കുഞ്ഞിന്റെ ഹൃദയം മിനിറ്റിൽ 150–170 തവണ മിടിക്കുന്നു. കൈകാലുകളിലെ വിരലുകൾ രൂപപ്പെട്ടു തുടങ്ങുന്നു.",
    subtextEn:
      "About the size of a fresh Malabar Black Pepperberry (~1.6 cm, ~1 g). Vital organs are forming rapidly.",
    subtextMl:
      "ഒരു കുരുമുളക് മണിയുടെ വലിപ്പം (~1.6 സെ.മീ, ~1 ഗ്രാം). പ്രധാന അവയവങ്ങൾ രൂപപ്പെട്ടുവരുന്നു.",
    babyFocusTitleEn: "Four-Chambered Heart & Webbed Digits:",
    babyFocusTitleMl: "നാല് അറകളുള്ള ഹൃദയവും വിരലുകളും:",
    babyFocusDescEn:
      "Heart valves partition into four chambers beating twice as fast as yours, while notches appear between developing fingers.",
    babyFocusDescMl:
      "ഹൃദയത്തിലെ നാല് അറകൾ വ്യക്തമാകുന്നു. കൈകാലുകളിലെ വിരലുകൾ വേർതിരിഞ്ഞു തുടങ്ങുന്നു.",
    maternalFocusTitleEn: "Expanding Blood Volume (+10%):",
    maternalFocusTitleMl: "രക്തത്തിന്റെ അളവ് വർദ്ധിക്കുന്നു:",
    maternalFocusDescEn:
      "Your heart works harder as plasma volume expands; rise slowly from sitting or lying down to prevent postural dizziness.",
    maternalFocusDescMl:
      "ശരീരത്തിലെ രക്തയോട്ടം കൂടുന്നതിനാൽ കിടന്നിട്ട് പെട്ടെന്ന് എഴുന്നേൽക്കുമ്പോൾ തലകറക്കം വരാതെ ശ്രദ്ധിക്കുക.",
    scanFocusTitleEn: "NHM Kerala MCP Card Registration (Sub-Centre / PHC):",
    scanFocusTitleMl: "തായ് കാർഡ് (MCP Card) രജിസ്ട്രേഷൻ:",
    scanFocusDescEn:
      "Register your pregnancy with your ward ASHA worker or JPHN before Week 12 to receive your official Mother & Child Protection (MCP) card.",
    scanFocusDescMl:
      "ആശാ വർക്കർ വഴിയോ ആരോഗ്യ കേന്ദ്രത്തിലോ ഗർഭം രജിസ്റ്റർ ചെയ്ത് തായ് കാർഡ് (MCP Card) കൈപ്പറ്റുക.",
  },
  9: {
    cropEn: "Whole Clove (Grambu)",
    cropMl: "ഗ്രാമ്പൂ",
    lengthCm: "2.3 cm",
    weightGrams: "~2 g",
    titleEn: "Week 9: Embryo to Fetus Transition",
    titleMl: "ആഴ്ച 9: ഭ്രൂണത്തിൽ നിന്ന് ഗർഭസ്ഥ ശിശുവിലേക്ക്",
    summaryEn:
      "All essential organ systems are now in place! Tiny earlobes, eyelids, and the tip of the nose are clearly sculpted.",
    summaryMl:
      "പ്രധാന അവയവങ്ങളുടെയെല്ലാം പ്രാരംഭ രൂപം പൂർത്തിയായി. കൺപോളകളും മൂക്കിന്റെ അഗ്രവും ചെവിയും വ്യക്തമാകുന്നു.",
    subtextEn:
      "Sized like an aromatic Kerala Clove / Grambu (~2.3 cm, ~2 g). Spontaneous micro-movements begin!",
    subtextMl:
      "ഒരു ഗ്രാമ്പൂവിന്റെ വലിപ്പം (~2.3 സെ.മീ, ~2 ഗ്രാം). കുഞ്ഞ് നേരിയ ചലനങ്ങൾ തുടങ്ങുന്നു!",
    babyFocusTitleEn: "Facial Sculpting & Early Muscle Twitching:",
    babyFocusTitleMl: "മുഖരൂപവും പേശികളുടെ ചലനവും:",
    babyFocusDescEn:
      "Fused eyelids cover the developing eyes, tooth buds form inside the gums, and tiny muscles respond to nerve signals.",
    babyFocusDescMl:
      "കൺപോളകൾ കണ്ണുകളെ പൊതിഞ്ഞു സൂക്ഷിക്കുന്നു. മോണയ്ക്കുള്ളിൽ പല്ലുകളുടെ മുകുളങ്ങൾ രൂപപ്പെടുന്നു.",
    maternalFocusTitleEn: "Peak hCG & Digestive Slowdown:",
    maternalFocusTitleMl: "ദഹനക്കുറവും ഗ്യാസ് ബുദ്ധിമുട്ടുകളും:",
    maternalFocusDescEn:
      "Progesterone relaxes smooth muscle, slowing digestion. Opt for small, frequent meals like warm kanji or steamed idli.",
    maternalFocusDescMl:
      "ദഹനം സാവധാനത്തിലാകുന്നതിനാൽ ഒന്നിച്ച് ഭക്ഷണം കഴിക്കാതെ ചെറിയ ഇടവേളകളിൽ ലഘുഭക്ഷണം കഴിക്കുക.",
    scanFocusTitleEn: "First Trimester Blood & Urine Panel:",
    scanFocusTitleMl: "ഒന്നാം ത്രൈമാസ രക്ത-മൂത്ര പരിശോധനകൾ:",
    scanFocusDescEn:
      "Complete your baseline CBC, VDRL, HIV, HBsAg, blood sugar, and urine routine culture for your MCP card record.",
    scanFocusDescMl:
      "രക്തത്തിലെ ഹീമോഗ്ലോബിൻ, ഷുഗർ, മൂത്രപരിശോധന എന്നിവ പൂർത്തിയാക്കി തായ് കാർഡിൽ രേഖപ്പെടുത്തുക.",
  },
  10: {
    cropEn: "Kerala Cashew Nut (Kasuandi)",
    cropMl: "കശുവണ്ടി പരിപ്പ്",
    lengthCm: "3.1 cm",
    weightGrams: "~4 g",
    titleEn: "Week 10: Vital Organs Formed & Nail Beds",
    titleMl: "ആഴ്ച 10: അവയവ രൂപീകരണവും നഖങ്ങളുടെ വളർച്ചയും",
    summaryEn:
      "Fingers and toes are completely separated with tiny nail beds! Kidneys begin producing small amounts of urine.",
    summaryMl:
      "കൈകാലുകളിലെ വിരലുകൾ പൂർണ്ണമായി വേർതിരിഞ്ഞ് നഖങ്ങൾ വളർന്നു തുടങ്ങുന്നു. വൃക്കകൾ പ്രവർത്തിച്ചു തുടങ്ങുന്നു.",
    subtextEn:
      "Curved like a roasted Kollam Cashew Nut (~3.1 cm, ~4 g). Elbow and knee joints can bend!",
    subtextMl:
      "ഒരു കശുവണ്ടി പരിപ്പിന്റെ വലിപ്പം (~3.1 സെ.മീ, ~4 ഗ്രാം). കൈമുട്ടുകളും കാൽമുട്ടുകളും മടക്കാൻ തുടങ്ങുന്നു!",
    babyFocusTitleEn: "Separated Digits & Cartilage Skeleton:",
    babyFocusTitleMl: "വേർതിരിഞ്ഞ വിരലുകളും അസ്ഥിരൂപവും:",
    babyFocusDescEn:
      "Webbing between fingers and toes has vanished, and soft cartilage begins hardening into early bone tissue.",
    babyFocusDescMl:
      "വിരലുകൾക്കിടയിലെ നേർത്ത ചർമ്മം മാറി വിരലുകൾ സ്വതന്ത്രമാകുന്നു. തരുണാസ്ഥികൾ എല്ലുകളായി മാറുന്നു.",
    maternalFocusTitleEn: "Visible Veins & Round Ligament Stretch:",
    maternalFocusTitleMl: "രക്തക്കുഴലുകളുടെ വികാസം:",
    maternalFocusDescEn:
      "Blue veins across breasts and abdomen become more noticeable as blood supply increases by 20–25%.",
    maternalFocusDescMl:
      "രക്തയോട്ടം വർദ്ധിക്കുന്നതിനാൽ സ്തനങ്ങളിലും വയറ്റിലും നേർത്ത ഞരമ്പുകൾ തെളിഞ്ഞു കാണാം.",
    scanFocusTitleEn: "Schedule NT Scan Appointment (Weeks 11–13):",
    scanFocusTitleMl: "എൻ.ടി സ്കാൻ (NT Scan) ബുക്ക് ചെയ്യുക:",
    scanFocusDescEn:
      "Book your Nuchal Translucency (NT) ultrasound between 11w0d and 13w6d while Crown-Rump Length is 45–84 mm.",
    scanFocusDescMl:
      "11-ാം ആഴ്ചയ്ക്കും 13 ആഴ്ച 6 ദിവസത്തിനും ഇടയിൽ ചെയ്യേണ്ട എൻ.ടി സ്കാനിനായി മുൻകൂട്ടി സമയം ബുക്ക് ചെയ്യുക.",
  },
  11: {
    cropEn: "Malabar Tamarind Segment (Kodampuli)",
    cropMl: "കുടംപുളി അല്ലി",
    lengthCm: "4.1 cm",
    weightGrams: "~7 g",
    titleEn: "Week 11: Diaphragm Formation & NT Window Opens",
    titleMl: "ആഴ്ച 11: ഡയഫ്രം വളർച്ചയും എൻ.ടി സ്കാൻ സമയവും",
    summaryEn:
      "Baby's diaphragm forms, paving the way for tiny intrauterine hiccups! Nasal passages open on the tip of the nose.",
    summaryMl:
      "ശ്വസനത്തെ സഹായിക്കുന്ന ഡയഫ്രം രൂപപ്പെടുന്നു. കുഞ്ഞ് കൈകാലുകൾ നിവർത്താനും ചുരുട്ടാനും തുടങ്ങുന്നു.",
    subtextEn:
      "Sized like a plump Kodampuli segment (~4.1 cm, ~7 g). Head makes up nearly half of body length.",
    subtextMl:
      "ഒരു കുടംപുളി അല്ലിയുടെ വലിപ്പം (~4.1 സെ.മീ, ~7 ഗ്രാം). കുഞ്ഞ് സജീവമായി ചലിക്കുന്നു.",
    babyFocusTitleEn: "Diaphragm & Hair Follicles:",
    babyFocusTitleMl: "ഡയഫ്രവും രോമകൂപങ്ങളും:",
    babyFocusDescEn:
      "The muscular diaphragm separates chest and abdominal cavities while microscopic hair follicles form across the crown.",
    babyFocusDescMl:
      "നെഞ്ചിനെയും വയറിനെയും വേർതിരിക്കുന്ന ഡയഫ്രം പൂർത്തിയാകുന്നു. തലയിൽ രോമകൂപങ്ങൾ രൂപപ്പെടുന്നു.",
    maternalFocusTitleEn: "Nausea Begins Easing & Hair Changes:",
    maternalFocusTitleMl: "മനംപിരട്ടൽ കുറഞ്ഞു തുടങ്ങുന്നു:",
    maternalFocusDescEn:
      "As the placenta takes over hormone production, morning sickness gradually starts subsiding for most mothers.",
    maternalFocusDescMl:
      "മറുപിള്ള ഹോർമോൺ ഉത്പാദനം ഏറ്റെടുക്കുന്നതോടെ രാവിലെയുള്ള മനംപിരട്ടൽ ക്രമേണ കുറഞ്ഞു തുടങ്ങും.",
    scanFocusTitleEn: "NT Scan & First Trimester Dual Marker Window:",
    scanFocusTitleMl: "എൻ.ടി സ്കാനും ഡബിൾ മാർക്കർ ടെസ്റ്റും:",
    scanFocusDescEn:
      "The optimal window for Nuchal Translucency (NT) ultrasound and maternal serum PAPP-A / free beta-hCG screening is now open.",
    scanFocusDescMl:
      "കുഞ്ഞിന്റെ ജനിതക ആരോഗ്യവും കഴുത്തിന് പിന്നിലെ ദ്രാവക അളവും പരിശോധിക്കുന്ന എൻ.ടി സ്കാൻ ചെയ്യേണ്ട സമയം.",
  },
  12: {
    cropEn: "Indian Gooseberry (Nellikka)",
    cropMl: "നാടൻ നെല്ലിക്ക",
    lengthCm: "5.4 cm",
    weightGrams: "~14 g",
    isMilestone: true,
    titleEn: "Week 12: Reflexes & First Trimester Milestone",
    titleMl: "ആഴ്ച 12: ഒന്നാം ത്രൈമാസ പൂർത്തീകരണവും എൻ.ടി സ്കാനും",
    summaryEn:
      "Baby can now curl their tiny toes, clench fingers, and make sucking motions! Bone marrow begins producing white blood cells.",
    summaryMl:
      "കുഞ്ഞ് വിരലുകൾ ചലിപ്പിക്കാനും ചുണ്ടുകൾ അനക്കാനും തുടങ്ങുന്നു. എൻ.ടി (NT Scan) സ്കാൻ ചെയ്യേണ്ട പ്രധാന ആഴ്ചയാണിത്.",
    subtextEn:
      "Sized like a fresh Kerala Nellikka / Gooseberry (~5.4 cm, ~14 g). Reflexes are awakening!",
    subtextMl:
      "ഒരു നാടൻ നെല്ലിക്കയുടെ വലിപ്പം (~5.4 സെ.മീ, ~14 ഗ്രാം). ഒന്നാം ത്രൈമാസം പൂർത്തിയാകുന്നു!",
    babyFocusTitleEn: "Neuromuscular Reflexes & Bone Marrow:",
    babyFocusTitleMl: "പേശീ ചലനങ്ങളും പ്രതിരോധ കോശങ്ങളും:",
    babyFocusDescEn:
      "If you gently prod your abdomen during an ultrasound, baby will squirm in response. Pituitary gland begins hormone secretion.",
    babyFocusDescMl:
      "സ്കാനിംഗ് സമയത്ത് കുഞ്ഞ് കൈകാലുകൾ ചലിപ്പിക്കുന്നത് വ്യക്തമായി കാണാം. അസ്ഥിമജ്ജയിൽ ശ്വേതരക്താണുക്കൾ രൂപപ്പെടുന്നു.",
    maternalFocusTitleEn: "Uterus Rises Above Pelvic Bone:",
    maternalFocusTitleMl: "ഗർഭപാത്രം ഇടുപ്പെല്ലിന് മുകളിലേക്ക്:",
    maternalFocusDescEn:
      "As the uterus grows upward out of the pelvic cavity, bladder pressure eases and energy begins returning.",
    maternalFocusDescMl:
      "ഗർഭപാത്രം ഇടുപ്പെല്ലിന് മുകളിലേക്ക് വളരുന്നതോടെ മൂത്രസഞ്ചിയിലെ സമ്മർദ്ദം കുറയുന്നു.",
    scanFocusTitleEn: "Nuchal Translucency (NT) & Nasal Bone Scan:",
    scanFocusTitleMl: "എൻ.ടി (NT Scan) അൾട്രാസൗണ്ട് പരിശോധന:",
    scanFocusDescEn:
      "Essential 12-week ultrasound assessing nuchal fold thickness, nasal bone ossification, fetal heart rate, and placental position.",
    scanFocusDescMl:
      "കുഞ്ഞിന്റെ മൂക്കിന്റെ എല്ലും കഴുത്തിന് പിന്നിലെ NT അളവും ഹൃദയമിടിപ്പും പരിശോധിക്കുന്ന പ്രധാന സ്കാൻ.",
  },
  13: {
    cropEn: "Bird's Eye Chili (Kanthari Mulaku)",
    cropMl: "കാന്താരി മുളക്",
    lengthCm: "7.4 cm",
    weightGrams: "~23 g",
    isMilestone: true,
    titleEn: "Week 13: Welcome to Trimester 2 & Vocal Cords",
    titleMl: "ആഴ്ച 13: രണ്ടാം ത്രൈമാസത്തിലേക്ക് സ്വാഗതം",
    summaryEn:
      "Welcome to the golden Second Trimester! Baby's vocal cords are forming and tiny intestines move into the abdomen.",
    summaryMl:
      "രണ്ടാം ത്രൈമാസത്തിലേക്ക് സ്വാഗതം! കുഞ്ഞിന്റെ സ്വരതന്തുക്കൾ (Vocal cords) രൂപപ്പെടുകയും വിരലടയാളങ്ങൾ തെളിയുകയും ചെയ്യുന്നു.",
    subtextEn:
      "Length of a long Kerala Kanthari Chili pod (~7.4 cm, ~23 g). Placenta is fully functional!",
    subtextMl:
      "വലിയൊരു കാന്താരി മുളകിന്റെ നീളം (~7.4 സെ.മീ, ~23 ഗ്രാം). മറുപിള്ള പൂർണ്ണ സജ്ജമായി!",
    babyFocusTitleEn: "Vocal Cords & Early Fingerprint Swirls:",
    babyFocusTitleMl: "സ്വരതന്തുക്കളും വിരലടയാളവും:",
    babyFocusDescEn:
      "Delicate vocal folds develop inside the larynx and microscopic dermal ridges start patterning on the fingertips.",
    babyFocusDescMl:
      "ജനനശേഷം കരയാൻ സഹായിക്കുന്ന സ്വരതന്തുക്കൾ രൂപപ്പെടുന്നു. വിരലഗ്രങ്ങളിൽ വിരലടയാളം തെളിഞ്ഞു തുടങ്ങുന്നു.",
    maternalFocusTitleEn: "Second Trimester Energy & Appetite Return:",
    maternalFocusTitleMl: "ഉന്മേഷവും വിശപ്പും തിരികെയെത്തുന്നു:",
    maternalFocusDescEn:
      "Nausea fades and appetite improves. Channel your renewed energy into balanced protein-rich Kerala home meals.",
    maternalFocusDescMl:
      "മനംപിരട്ടൽ മാറി നല്ല വിശപ്പും ഉന്മേഷവും അനുഭവപ്പെടുന്ന സമയമാണിത്. പോഷകസമൃദ്ധമായ ആഹാരം ശീലമാക്കുക.",
    scanFocusTitleEn: "Transition from Folic Acid to Daily IFA & Calcium:",
    scanFocusTitleMl: "അയൺ (IFA), കാൽസ്യം ഗുളികകൾ തുടങ്ങാൻ തയ്യാറെടുപ്പ്:",
    scanFocusDescEn:
      "As organogenesis completes, your obstetrician will transition you from plain folic acid to Iron-Folic Acid (IFA) and Calcium at Week 14.",
    scanFocusDescMl:
      "14-ാം ആഴ്ച മുതൽ കഴിക്കേണ്ട അയൺ (IFA), കാൽസ്യം ഗുളികകളെക്കുറിച്ച് ഡോക്ടറോട് ചോദിച്ചു മനസ്സിലാക്കുക.",
  },
  14: {
    cropEn: "Kerala Curry Lemon (Cherunaranga)",
    cropMl: "ചെറുനാരങ്ങ",
    lengthCm: "8.7 cm",
    weightGrams: "~43 g",
    titleEn: "Week 14: Facial Expressions & Lanugo Peach Fuzz",
    titleMl: "ആഴ്ച 14: കുഞ്ഞിന്റെ മുഖഭാവങ്ങളും അയൺ-കാൽസ്യം തുടക്കവും",
    summaryEn:
      "Baby can squint, frown, and grimace as facial muscles respond to brain impulses! Fine lanugo hair covers the body for warmth.",
    summaryMl:
      "കുഞ്ഞ് പുരികം ചുളിക്കാനും ചെറുതായി പുഞ്ചിരിക്കാനും തുടങ്ങുന്നു. ശരീരത്തിൽ നേർത്ത രോമങ്ങൾ (Lanugo) വളരുന്നു.",
    subtextEn:
      "Sized like a juicy Kerala Cherunaranga / Lemon (~8.7 cm, ~43 g). Start daily Iron & Calcium!",
    subtextMl:
      "ഒരു ചെറുനാരങ്ങയുടെ വലിപ്പം (~8.7 സെ.മീ, ~43 ഗ്രാം). അയൺ, കാൽസ്യം ഗുളികകൾ തുടങ്ങേണ്ട ആഴ്ച!",
    babyFocusTitleEn: "Facial Muscle Practice & Thyroid Hormone:",
    babyFocusTitleMl: "മുഖപേശികളുടെ ചലനവും തൈറോയ്ഡ് ഗ്രന്ഥിയും:",
    babyFocusDescEn:
      "Baby's thyroid gland matures and starts producing hormones, supported by iodized nutrition from your meals.",
    babyFocusDescMl:
      "കുഞ്ഞിന്റെ തൈറോയ്ഡ് ഗ്രന്ഥി ഹോർമോണുകൾ ഉത്പാദിപ്പിച്ചു തുടങ്ങുന്നു. മുഖപേശികൾ സജീവമാകുന്നു.",
    maternalFocusTitleEn: "Round Ligament Twinges:",
    maternalFocusTitleMl: "വയറിന് ഇരുവശത്തുമുള്ള നേരിയ വലിവ്:",
    maternalFocusDescEn:
      "Brief, harmless stretching sensations along the lower groin occur as supporting uterine ligaments thicken and lengthen.",
    maternalFocusDescMl:
      "ഗർഭപാത്രം വളരുന്നതിനനുസരിച്ച് അടിവയറ്റിലെ പേശികൾ വലിയുന്നത് മൂലം നേരിയ വലിവ് അനുഭവപ്പെടാം.",
    scanFocusTitleEn: "Start Daily IFA (Iron) & Calcium Protocol (NHM Kerala):",
    scanFocusTitleMl: "അയൺ (IFA), കാൽസ്യം ഗുളികകൾ ആരംഭിക്കുക:",
    scanFocusDescEn:
      "Begin 1 IFA tablet post-lunch with Nellikka/lemon water and 500mg Calcium after breakfast (never take Iron and Calcium together).",
    scanFocusDescMl:
      "രാവിലെ ഭക്ഷണത്തിന് ശേഷം കാൽസ്യവും ഉച്ചഭക്ഷണത്തിന് ശേഷം അയൺ ഗുളികയും കഴിച്ചു തുടങ്ങുക (രണ്ടും ഒരുമിച്ച് കഴിക്കരുത്).",
  },
  15: {
    cropEn: "Bilimbi Fruit (Irumban Puli)",
    cropMl: "ഇരുമ്പൻ പുളി",
    lengthCm: "10.1 cm",
    weightGrams: "~70 g",
    titleEn: "Week 15: Rapid Bone Ossification & Light Sensing",
    titleMl: "ആഴ്ച 15: എല്ലുകളുടെ ബലവും വെളിച്ചത്തോടുള്ള പ്രതികരണവും",
    summaryEn:
      "Calcium rapidly mineralizes your baby's skeleton! Even though eyelids remain fused, baby can sense bright light outside the womb.",
    summaryMl:
      "കുഞ്ഞിന്റെ എല്ലുകൾക്ക് കാൽസ്യം വഴി ബലം വെക്കുന്നു. കൺപോളകൾ അടഞ്ഞിരിക്കുകയാണെങ്കിലും പുറത്തെ വെളിച്ചം തിരിച്ചറിയാൻ തുടങ്ങുന്നു.",
    subtextEn:
      "About the size of a large Kerala Irumban Puli (~10.1 cm, ~70 g). Legs are now longer than arms!",
    subtextMl:
      "വലിയൊരു ഇരുമ്പൻ പുളിയുടെ വലിപ്പം (~10.1 സെ.മീ, ~70 ഗ്രാം). കാലുകൾ കൈകളേക്കാൾ നീളം വെക്കുന്നു!",
    babyFocusTitleEn: "Skeletal Ossification & Scalp Hair Pattern:",
    babyFocusTitleMl: "അസ്ഥികളുടെ ബലവും തലമുടിയുടെ വളർച്ചയും:",
    babyFocusDescEn:
      "Long bones of the arms and legs harden rapidly while the whorl pattern of baby's scalp hair is permanently set.",
    babyFocusDescMl:
      "കൈകാലുകളിലെ എല്ലുകൾക്ക് കാഠിന്യം കൂടുന്നു. തലമുടിയുടെ വളർച്ചാ രീതി ഈ ആഴ്ച രൂപപ്പെടുന്നു.",
    maternalFocusTitleEn: "Nasal Congestion & Gum Sensitivity:",
    maternalFocusTitleMl: "മോണയിലെ സംവേദനക്ഷമതയും മൂക്കടപ്പും:",
    maternalFocusDescEn:
      "Higher estrogen swells mucous membranes and gums. Brush gently with a soft toothbrush and rinse with warm saline water.",
    maternalFocusDescMl:
      "ഹോർമോൺ മാറ്റങ്ങൾ മൂലം മോണയിൽ നേരിയ വീക്കമോ മൂക്കടപ്പോ തോന്നാം. മൃദുവായ ബ്രഷ് ഉപയോഗിക്കുക.",
    scanFocusTitleEn: "Dental Hygiene & Hemoglobin Maintenance:",
    scanFocusTitleMl: "ദന്ത സംരക്ഷണവും ഹീമോഗ്ലോബിൻ ശ്രദ്ധയും:",
    scanFocusDescEn:
      "Maintain daily Ragi and Muringayila intake alongside your IFA tablet to prevent second-trimester dilutional anemia.",
    scanFocusDescMl:
      "രക്തക്കുറവ് തടയാൻ അയൺ ഗുളികയ്ക്കൊപ്പം മുരിങ്ങയിലയും റാഗിയും ഭക്ഷണത്തിൽ ഉൾപ്പെടുത്തുക.",
  },
  16: {
    cropEn: "Kerala Rose Apple (Chambakka)",
    cropMl: "ചാമ്പയ്ക്ക",
    lengthCm: "11.6 cm",
    weightGrams: "~100 g",
    isMilestone: true,
    titleEn: "Week 16: First Gentle Flutters (Quickening)",
    titleMl: "ആഴ്ച 16: കുഞ്ഞിന്റെ ആദ്യത്തെ നേരിയ ചലനങ്ങൾ",
    summaryEn:
      "Baby reaches 100 grams! You may soon feel the first butterfly-like flutters (quickening) as baby stretches and tumbles.",
    summaryMl:
      "കുഞ്ഞിന്റെ ഭാരം 100 ഗ്രാം എത്തുന്നു! വയറ്റിൽ ചിത്രശലഭം പറക്കുന്നതുപോലെയുള്ള ആദ്യത്തെ നേരിയ ചലനങ്ങൾ (Quickening) അനുഭവപ്പെട്ടു തുടങ്ങാം.",
    subtextEn:
      "Sized like a crisp pink Kerala Chambakka / Rose Apple (~11.6 cm, ~100 g). Tiny eyelashes are growing!",
    subtextMl:
      "ഒരു വലിയ ചാമ്പയ്ക്കയുടെ വലിപ്പം (~11.6 സെ.മീ, ~100 ഗ്രാം). കൺപീളികൾ വളർന്നു തുടങ്ങുന്നു!",
    babyFocusTitleEn: "Aligned Eyes & Ear Ossicles:",
    babyFocusTitleMl: "കണ്ണുകളുടെയും ആന്തരിക കർണ്ണങ്ങളുടെയും വളർച്ച:",
    babyFocusDescEn:
      "Eyes move closer to the front of the face and tiny middle-ear bones begin picking up the rhythm of your heartbeat and voice.",
    babyFocusDescMl:
      "ചെവിക്കുള്ളിലെ നേർത്ത അസ്ഥികൾ രൂപപ്പെടുന്നതിനാൽ അമ്മയുടെ ഹൃദയമിടിപ്പിന്റെ താളം കുഞ്ഞ് കേട്ടു തുടങ്ങുന്നു.",
    maternalFocusTitleEn: "First Fetal Flutters & Pregnancy Glow:",
    maternalFocusTitleMl: "കുഞ്ഞിന്റെ ആദ്യ അനക്കവും മുഖകാന്തിയും:",
    maternalFocusDescEn:
      "Increased dermal circulation gives your skin a warm glow, while early movements feel like gentle bubbles in the lower belly.",
    maternalFocusDescMl:
      "രക്തയോട്ടം വർദ്ധിക്കുന്നതിനാൽ ചർമ്മത്തിന് തിളക്കം കൂടുന്നു. അടിവയറ്റിൽ നേരിയ കുമിളകൾ പോലെ കുഞ്ഞിന്റെ അനക്കം തോന്നാം.",
    scanFocusTitleEn: "Td (Tetanus-Diphtheria) Dose 1 & ANC Visit 2:",
    scanFocusTitleMl: "ടി.ഡി (Td Vaccine) പ്രതിരോധ കുത്തിവെപ്പും ചെക്കപ്പും:",
    scanFocusDescEn:
      "Verify your Tetanus/Td booster immunization status on your NHM Kerala MCP card and check blood pressure & weight gain.",
    scanFocusDescMl:
      "തായ് കാർഡ് പ്രകാരമുള്ള ടി.ഡി (Td) പ്രതിരോധ കുത്തിവെപ്പും രണ്ടാം ഘട്ട ബി.പി/ഭാരം പരിശോധനയും ഉറപ്പാക്കുക.",
  },
  17: {
    cropEn: "Sapota Fruit (Chikku)",
    cropMl: "സപ്പോട്ട",
    lengthCm: "13.0 cm",
    weightGrams: "~140 g",
    titleEn: "Week 17: Brown Fat Layer & Strong Umbilical Cord",
    titleMl: "ആഴ്ച 17: ശരീര താപനില നിയന്ത്രിക്കുന്ന കൊഴുപ്പുപാളി",
    summaryEn:
      "Special heat-producing brown adipose tissue begins forming under baby's skin, and the umbilical cord grows thicker and stronger.",
    summaryMl:
      "കുഞ്ഞിന്റെ ശരീരതാപനില നിലനിർത്താൻ സഹായിക്കുന്ന തവിട്ട് കൊഴുപ്പ് (Brown fat) ചർമ്മത്തിനടിയിൽ രൂപപ്പെടുന്നു.",
    subtextEn:
      "Sized like a sweet Kerala Homestead Sapota / Chikku (~13.0 cm, ~140 g). Sucking and swallowing reflexes mature.",
    subtextMl:
      "ഒരു സപ്പോട്ട പഴത്തിന്റെ വലിപ്പം (~13.0 സെ.മീ, ~140 ഗ്രാം). പൊക്കിൾക്കൊടി കൂടുതൽ ബലമുള്ളതാകുന്നു.",
    babyFocusTitleEn: "Adipose Tissue & Sweat Glands:",
    babyFocusTitleMl: "കൊഴുപ്പുപാളിയും വിയർപ്പുഗ്രന്ഥികളും:",
    babyFocusDescEn:
      "Sweat glands develop across the skin while brown fat deposits around the neck and chest to keep baby warm at birth.",
    babyFocusDescMl:
      "ജനനശേഷം കുഞ്ഞിന് തണുപ്പിൽ നിന്ന് സംരക്ഷണം നൽകുന്ന കൊഴുപ്പുപാളിയും വിയർപ്പുഗ്രന്ഥികളും രൂപപ്പെടുന്നു.",
    maternalFocusTitleEn: "Shifting Center of Gravity & Vivid Dreams:",
    maternalFocusTitleMl: "ശരീരനിലയിലെ മാറ്റവും ഉറക്കവും:",
    maternalFocusDescEn:
      "As your belly rounds outward, wear flat, slip-resistant footwear—especially on wet Kerala courtyard tiles during monsoon.",
    maternalFocusDescMl:
      "വയർ വളരുന്നതിനാൽ നടക്കുമ്പോൾ ബാലൻസ് ശ്രദ്ധിക്കുക. നനഞ്ഞ തറയിൽ തെന്നി വീഴാതിരിക്കാൻ പാകമായ ചെരുപ്പ് ധരിക്കുക.",
    scanFocusTitleEn: "Book Your Level-II TIFFA Anomaly Scan (Weeks 18–20):",
    scanFocusTitleMl: "അനോമലി സ്കാൻ (18–20 ആഴ്ചകൾ) മുൻകൂട്ടി ബുക്ക് ചെയ്യുക:",
    scanFocusDescEn:
      "Confirm your appointment slot for the detailed mid-pregnancy Anomaly Scan between Week 18 and Week 20.",
    scanFocusDescMl:
      "18–20 ആഴ്ചകളിൽ ചെയ്യേണ്ട പ്രധാന അനോമലി സ്കാനിനായി (TIFFA Scan) തീയതി മുൻകൂട്ടി ബുക്ക് ചെയ്യുക.",
  },
  18: {
    cropEn: "Country Guava (Nadan Peyara)",
    cropMl: "നാടൻ പേരയ്ക്ക",
    lengthCm: "14.2 cm",
    weightGrams: "~190 g",
    titleEn: "Week 18: Myelin Nerve Insulation & Yawning",
    titleMl: "ആഴ്ച 18: നാഡികളുടെ വളർച്ചയും കേൾവിശക്തിയും",
    summaryEn:
      "Protective myelin begins wrapping around baby's nerves, speeding up brain-to-muscle coordination! Baby can now yawn and stretch.",
    summaryMl:
      "കുഞ്ഞിന്റെ നാഡികളെ പൊതിഞ്ഞ് മയലിൻ (Myelin) ആവരണം രൂപപ്പെടുന്നു. കുഞ്ഞ് കോട്ടുവായ ഇടാനും കൈകാലുകൾ നിവർത്താനും തുടങ്ങുന്നു.",
    subtextEn:
      "About the size of a fresh Kerala Country Guava (~14.2 cm, ~190 g). Ears reach their final position!",
    subtextMl:
      "ഒരു നാടൻ പേരയ്ക്കയുടെ വലിപ്പം (~14.2 സെ.മീ, ~190 ഗ്രാം). ചെവികൾ യഥാർത്ഥ സ്ഥാനത്തെത്തുന്നു!",
    babyFocusTitleEn: "Myelination & Auditory Ossicles:",
    babyFocusTitleMl: "മയലിൻ ആവരണവും കേൾവിയും:",
    babyFocusDescEn:
      "Nerves form protective myelin sheaths while inner ear bones and auditory brain pathways connect to detect external sounds.",
    babyFocusDescMl:
      "തലച്ചോറിൽ നിന്നുള്ള സന്ദേശങ്ങൾ വേഗത്തിൽ പേശികളിലെത്തിക്കാൻ മയലിൻ ആവരണം സഹായിക്കുന്നു.",
    maternalFocusTitleEn: "Left-Lateral Sleeping Posture:",
    maternalFocusTitleMl: "ഇടതുവശം ചരിഞ്ഞുള്ള ഉറക്കം:",
    maternalFocusDescEn:
      "Start sleeping on your left side with a pillow between your knees to maximize blood and nutrient flow to the placenta.",
    maternalFocusDescMl:
      "മറുപിള്ളയിലേക്കുള്ള രക്തയോട്ടം സുഗമമാക്കാൻ കാൽമുട്ടുകൾക്കിടയിൽ തലയിണ വെച്ച് ഇടതുവശം ചരിഞ്ഞുറങ്ങാൻ ശീലിക്കുക.",
    scanFocusTitleEn: "Early Anomaly Scan Window Opens (18–20 Weeks):",
    scanFocusTitleMl: "അനോമലി സ്കാൻ സമയം ആരംഭിക്കുന്നു:",
    scanFocusDescEn:
      "Your obstetrician will evaluate fetal cardiac four-chamber view, spine alignment, brain ventricles, and amniotic fluid.",
    scanFocusDescMl:
      "കുഞ്ഞിന്റെ ഹൃദയം, നട്ടെല്ല്, തലച്ചോറ്, മറ്റ് അവയവങ്ങൾ എന്നിവ വിശദമായി പരിശോധിക്കുന്ന അനോമലി സ്കാൻ ഘട്ടം.",
  },
  19: {
    cropEn: "Pomegranate (Mathalanaranga)",
    cropMl: "മാതളനാരങ്ങ",
    lengthCm: "15.3 cm",
    weightGrams: "~240 g",
    titleEn: "Week 19: Protective Vernix Caseosa Coating",
    titleMl: "ആഴ്ച 19: ചർമ്മസംരക്ഷണത്തിനായി വെർണിക്സ് ആവരണം",
    summaryEn:
      "A creamy, protective white coating called vernix caseosa forms over baby's skin to shield it from amniotic fluid.",
    summaryMl:
      "അമ്നിയോട്ടിക് ദ്രാവകത്തിൽ നിന്ന് കുഞ്ഞിന്റെ മൃദുവായ ചർമ്മത്തെ സംരക്ഷിക്കാൻ 'വെർണിക്സ്' (Vernix caseosa) എന്ന വെളുത്ത ആവരണം രൂപപ്പെടുന്നു.",
    subtextEn:
      "Sized like a ruby-red Mathalanaranga / Pomegranate (~15.3 cm, ~240 g). Sensory brain centers ignite!",
    subtextMl:
      "ഒരു മാതളനാരങ്ങയുടെ വലിപ്പം (~15.3 സെ.മീ, ~240 ഗ്രാം). പഞ്ചേന്ദ്രിയങ്ങളുടെ മസ്തിഷ്ക കേന്ദ്രങ്ങൾ വളരുന്നു!",
    babyFocusTitleEn: "Vernix Caseosa & Sensory Cortex:",
    babyFocusTitleMl: "വെർണിക്സ് ആവരണവും ഇന്ദ്രിയ വികാസവും:",
    babyFocusDescEn:
      "Dedicated zones in the brain for taste, touch, sight, smell, and hearing map out their neural networks.",
    babyFocusDescMl:
      "കാഴ്ച, കേൾവി, ഗന്ധം, രുചി, സ്പർശനം എന്നിവയ്ക്കുള്ള മസ്തിഷ്ക ഭാഗങ്ങൾ സജീവമായി വികസിക്കുന്നു.",
    maternalFocusTitleEn: "Preventing Nocturnal Calf Cramps:",
    maternalFocusTitleMl: "രാത്രിയിലെ കാലിലെ പേശിവലിവ് തടയാൻ:",
    maternalFocusDescEn:
      "Stretch your calves gently before bed and include potassium-rich steamed Nendran banana and daily Calcium tablets.",
    maternalFocusDescMl:
      "രാത്രിയിൽ കാലിലെ പേശിവലിവ് ഒഴിവാക്കാൻ കാൽസ്യം ഗുളിക മുടങ്ങാതെ കഴിക്കുകയും പുഴുങ്ങിയ നേന്ത്രപ്പഴം ഉൾപ്പെടുത്തുകയും ചെയ്യുക.",
    scanFocusTitleEn: "Mid-Pregnancy Hemoglobin & Urine Albumin Check:",
    scanFocusTitleMl: "ഹീമോഗ്ലോബിൻ, മൂത്രത്തിലെ ആൽബുമിൻ പരിശോധന:",
    scanFocusDescEn:
      "Check that maternal hemoglobin stays ≥ 11.0 g/dL and urine albumin/sugar remain nil on your MCP card.",
    scanFocusDescMl:
      "ഹീമോഗ്ലോബിൻ അളവ് 11.0 g/dL-ൽ കൂടുതലാണെന്നും മൂത്രത്തിൽ ആൽബുമിൻ ഇല്ലെന്നും പരിശോധനയിലൂടെ ഉറപ്പാക്കുക.",
  },
  20: {
    cropEn: "Kerala Nendran Banana (Nendran Pazham)",
    cropMl: "നേന്ത്രപ്പഴം",
    lengthCm: "25.6 cm",
    weightGrams: "~300 g",
    isMilestone: true,
    titleEn: "Week 20: Halfway Milestone & TIFFA Anomaly Scan",
    titleMl: "ആഴ്ച 20: പകുതി ദൂരം പിന്നിട്ടു • അനോമലി സ്കാൻ",
    summaryEn:
      "Congratulations on reaching the halfway mark (20/40 weeks)! Measurements now run crown-to-heel, and kicks are clearly felt.",
    summaryMl:
      "ഗർഭകാലത്തിന്റെ പകുതി ദൂരം (20/40 ആഴ്ചകൾ) വിജയകരമായി പിന്നിട്ടു! കുഞ്ഞിന്റെ അവയവ വളർച്ച പരിശോധിക്കുന്ന അനോമലി സ്കാൻ ഈ ആഴ്ചയാണ്.",
    subtextEn:
      "Length of a ripe Kerala Nendran Banana (~25.6 cm crown-to-heel, ~300 g). Halfway to meeting your baby!",
    subtextMl:
      "ഒരു നേന്ത്രപ്പഴത്തിന്റെ നീളം (~25.6 സെ.മീ തല മുതൽ കാൽ വരെ, ~300 ഗ്രാം). പകുതി ദൂരം പിന്നിട്ടു!",
    babyFocusTitleEn: "Crown-to-Heel Measurement & Distinct Kicks:",
    babyFocusTitleMl: "തല മുതൽ കാൽപ്പാദം വരെയുള്ള വളർച്ച:",
    babyFocusDescEn:
      "From Week 20 onward, baby is measured from head to heel. Swallowing reflexes and digestive secretions are active.",
    babyFocusDescMl:
      "20-ാം ആഴ്ച മുതൽ കുഞ്ഞിന്റെ നീളം തല മുതൽ കാൽപ്പാദം വരെയാണ് അളക്കുന്നത്. കുഞ്ഞിന്റെ ചലനങ്ങൾ കൂടുതൽ വ്യക്തമാകുന്നു.",
    maternalFocusTitleEn: "Fundus at Umbilicus (Belly Button Level):",
    maternalFocusTitleMl: "ഗർഭപാത്രം പൊക്കിളിന്റെ നിരപ്പിൽ:",
    maternalFocusDescEn:
      "The top of your uterus reaches the navel (~20 cm fundal height), and your belly button may flatten or pop out slightly.",
    maternalFocusDescMl:
      "ഗർഭപാത്രത്തിന്റെ മുകൾഭാഗം പൊക്കിളിന്റെ നിരപ്പിൽ എത്തുന്നു. വയർ വ്യക്തമായി പുറത്തേക്ക് കാണാം.",
    scanFocusTitleEn: "Level-II Target Imaging (TIFFA / Anomaly Scan):",
    scanFocusTitleMl: "ലെവൽ-2 അനോമലി സ്കാൻ (TIFFA Scan):",
    scanFocusDescEn:
      "Comprehensive head-to-toe anatomical ultrasound verifying fetal heart, brain, spine, kidneys, limbs, placenta, and amniotic fluid index (AFI).",
    scanFocusDescMl:
      "കുഞ്ഞിന്റെ എല്ലാ ആന്തരിക അവയവങ്ങളുടെയും പൂർണ്ണ വളർച്ചയും മറുപിള്ളയുടെ സ്ഥാനവും അമ്നിയോട്ടിക് ദ്രാവക അളവും ഉറപ്പാക്കുന്ന പ്രധാന സ്കാൻ.",
  },
  21: {
    cropEn: "Golden Cucumber (Kani Vellari)",
    cropMl: "കണിവെള്ളരി",
    lengthCm: "26.7 cm",
    weightGrams: "~360 g",
    titleEn: "Week 21: Swallowing Amniotic Fluid & Taste Buds",
    titleMl: "ആഴ്ച 21: രുചിമുകുളങ്ങളുടെ വികാസം",
    summaryEn:
      "Baby swallows small amounts of amniotic fluid daily, experiencing subtle culinary flavors from your traditional Kerala meals!",
    summaryMl:
      "അമ്മ കഴിക്കുന്ന നാടൻ ആഹാരത്തിന്റെ നേരിയ രുചിഭേദങ്ങൾ അമ്നിയോട്ടിക് ദ്രാവകത്തിലൂടെ കുഞ്ഞിന്റെ രുചിമുകുളങ്ങൾ തിരിച്ചറിയുന്നു.",
    subtextEn:
      "About the size of a golden Kerala Kani Vellari (~26.7 cm, ~360 g). Taste buds are active on the tongue!",
    subtextMl:
      "ഒരു കണിവെള്ളരിയുടെ വലിപ്പം (~26.7 സെ.മീ, ~360 ഗ്രാം). കുഞ്ഞിന്റെ നാവിലെ രുചിമുകുളങ്ങൾ പ്രവർത്തിച്ചു തുടങ്ങുന്നു!",
    babyFocusTitleEn: "Taste Bud Receptors & Digestive Practice:",
    babyFocusTitleMl: "രുചി തിരിച്ചറിയാനുള്ള ശേഷിയും ദഹനപരിശീലനവും:",
    babyFocusDescEn:
      "Functional taste buds detect sweet and savory notes in amniotic fluid while the gut practices absorbing water and nutrients.",
    babyFocusDescMl:
      "കുഞ്ഞ് അമ്നിയോട്ടിക് ദ്രാവകം അല്പാല്പമായി കുടിക്കുകയും കുടലുകൾ ജലാംശം ആഗിരണം ചെയ്യാൻ പരിശീലിക്കുകയും ചെയ്യുന്നു.",
    maternalFocusTitleEn: "Appetite Surge & Gentle Heartburn Relief:",
    maternalFocusTitleMl: "നെഞ്ചെരിച്ചിൽ ഒഴിവാക്കാനുള്ള ഭക്ഷണരീതി:",
    maternalFocusDescEn:
      "Avoid lying flat immediately after lunch or dinner; take a gentle 10-minute veranda stroll and sip buttermilk (Sambharam).",
    maternalFocusDescMl:
      "ഭക്ഷണശേഷം ഉടൻ കിടക്കുന്നത് ഒഴിവാക്കുക. ഇഞ്ചിയും കറിവേപ്പിലയും ചേർത്ത മോര് (സംഭാരം) കുടിക്കുന്നത് ദഹനത്തിന് ഉത്തമമാണ്.",
    scanFocusTitleEn: "Review Anomaly Scan Report in MCP Card:",
    scanFocusTitleMl: "അനോമലി സ്കാൻ റിപ്പോർട്ട് ഡോക്ടറെ കാണിക്കുക:",
    scanFocusDescEn:
      "Have your obstetrician record the Anomaly Scan placental position and cervical length findings inside your MCP card.",
    scanFocusDescMl:
      "അനോമലി സ്കാൻ ഫലങ്ങൾ ഡോക്ടറെ കാണിച്ച് തായ് കാർഡിൽ (MCP Card) കൃത്യമായി രേഖപ്പെടുത്തുക.",
  },
  22: {
    cropEn: "Tender Coconut (Ilaneer Karikku)",
    cropMl: "ഇളനീർ കരിക്ക്",
    lengthCm: "27.8 cm",
    weightGrams: "~430 g",
    titleEn: "Week 22: Tactile Touch, Eyebrows & Firm Grip",
    titleMl: "ആഴ്ച 22: സ്പർശനശേഷിയും പുരികങ്ങളുടെ വളർച്ചയും",
    summaryEn:
      "Baby practices grasping the umbilical cord and rubbing their face! Fine eyebrows, eyelashes, and hair strands are visible.",
    summaryMl:
      "കുഞ്ഞിന്റെ പുരികങ്ങളും കൺപീളികളും വ്യക്തമായി തുടങ്ങുന്നു. കൈകൾ കൊണ്ട് മുഖത്ത് തൊടാനും പൊക്കിൾക്കൊടിയിൽ പിടിക്കാനും പരിശീലിക്കുന്നു.",
    subtextEn:
      "Sized like a refreshing Kerala Ilaneer Karikku (~27.8 cm, ~430 g). Grip strength is developing!",
    subtextMl:
      "ഒരു ഇളനീർ കരിക്കിന്റെ വലിപ്പം (~27.8 സെ.മീ, ~430 ഗ്രാം). കുഞ്ഞിന്റെ കൈപ്പിടിക്ക് ബലം വെക്കുന്നു!",
    babyFocusTitleEn: "Tactile Receptors & Tear Ducts:",
    babyFocusTitleMl: "സ്പർശന സംവേദനവും കണ്ണുനീർ ഗ്രന്ഥികളും:",
    babyFocusDescEn:
      "Nerve endings in the fingertips mature, allowing baby to explore their face, palms, and toes inside the womb.",
    babyFocusDescMl:
      "വിരലഗ്രങ്ങളിലെ നാഡികൾ വളർച്ചയെത്തുന്നതിനാൽ കുഞ്ഞ് സ്വന്തം മുഖവും കൈകാലുകളും തൊട്ടറിഞ്ഞു തുടങ്ങുന്നു.",
    maternalFocusTitleEn: "Belly Skin Hydration & Stretch Marks:",
    maternalFocusTitleMl: "വയറ്റിലെ ചർമ്മ സംരക്ഷണം:",
    maternalFocusDescEn:
      "Massage pure virgin coconut oil (Ventha Velichenna) onto your growing abdomen after bath to soothe dry, stretching skin.",
    maternalFocusDescMl:
      "വയറ്റിലെ ചർമ്മം വലിയുന്നത് മൂലമുള്ള ചൊറിച്ചിൽ കുറയ്ക്കാൻ കുളിക്കുന്നതിന് മുമ്പ് ശുദ്ധമായ വെന്ത വെളിച്ചെണ്ണ പുരട്ടുന്നത് നല്ലതാണ്.",
    scanFocusTitleEn: "Blood Pressure & Steady Weight Trajectory:",
    scanFocusTitleMl: "രക്തസമ്മർദ്ദവും ശരീരഭാരവും നിരീക്ഷിക്കുക:",
    scanFocusDescEn:
      "Aim for steady weight gain (~0.4–0.5 kg per week in Trimester 2) while keeping BP comfortably below 130/85 mmHg.",
    scanFocusDescMl:
      "രണ്ടാം ത്രൈമാസത്തിൽ ആഴ്ചയിൽ 400–500 ഗ്രാം വരെ ശരീരഭാരം ക്രമമായി കൂടുന്നുണ്ടെന്നും ബി.പി സാധാരണ നിലയിലാണെന്നും ഉറപ്പാക്കുക.",
  },
  23: {
    cropEn: "Muvandan Mango (Muvandan Manga)",
    cropMl: "മൂവാണ്ടൻ മാങ്ങ",
    lengthCm: "28.9 cm",
    weightGrams: "~500 g",
    titleEn: "Week 23: Lung Surfactant & Rhythmic Movement",
    titleMl: "ആഴ്ച 23: ശ്വാസകോശ വളർച്ചയും ചലനങ്ങളും",
    summaryEn:
      "Baby reaches half a kilogram (500 g)! Specialized lung cells begin producing surfactant, and baby responds to your gentle touch.",
    summaryMl:
      "കുഞ്ഞിന്റെ ഭാരം അര കിലോഗ്രാം (500 ഗ്രാം) എത്തുന്നു! ശ്വാസകോശത്തിലെ രക്തക്കുഴലുകൾ വികസിക്കുകയും വയറ്റിൽ തലോടുമ്പോൾ കുഞ്ഞ് പ്രതികരിക്കുകയും ചെയ്യുന്നു.",
    subtextEn:
      "Like a large Kerala Muvandan Mango (~28.9 cm, ~500 g). Hearing is sharpening rapidly!",
    subtextMl:
      "വലിയൊരു മൂവാണ്ടൻ മാങ്ങയുടെ വലിപ്പം (~28.9 സെ.മീ, ~500 ഗ്രാം). കേൾവിശക്തി കൂടുതൽ തെളിയുന്നു!",
    babyFocusTitleEn: "Early Alveolar Surfactant & Vascular Lungs:",
    babyFocusTitleMl: "ശ്വാസകോശത്തിലെ സർഫാക്ടന്റ് ഉത്പാദനം:",
    babyFocusDescEn:
      "Type II alveolar cells begin secreting pulmonary surfactant, which will help air sacs inflate smoothly after birth.",
    babyFocusDescMl:
      "ജനനശേഷം ശ്വാസകോശം വികസിക്കാൻ സഹായിക്കുന്ന 'സർഫാക്ടന്റ്' (Surfactant) എന്ന ദ്രാവകം ചെറിയ തോതിൽ ഉത്പാദിപ്പിച്ചു തുടങ്ങുന്നു.",
    maternalFocusTitleEn: "Mild Ankle Puffiness in Humid Weather:",
    maternalFocusTitleMl: "കണങ്കാലിലെ നേരിയ നീർക്കെട്ട്:",
    maternalFocusDescEn:
      "Elevate your feet on a cushion during afternoon rest and stay hydrated with 2.5L water to reduce dependent ankle swelling.",
    maternalFocusDescMl:
      "ഉച്ചയ്ക്ക് വിശ്രമിക്കുമ്പോൾ കാലുകൾ ചെറിയ തലയിണയ്ക്ക് മുകളിൽ ഉയർത്തി വെക്കുന്നത് കണങ്കാലിലെ നീർക്കെട്ട് കുറയ്ക്കാൻ സഹായിക്കും.",
    scanFocusTitleEn: "Prepare for 75g OGTT Glucose Screen Window (W24–28):",
    scanFocusTitleMl: "ഷുഗർ പരിശോധനയ്ക്കുള്ള (OGTT) തയ്യാറെടുപ്പ്:",
    scanFocusDescEn:
      "Next week opens the mandatory 24–28 week Oral Glucose Tolerance Test (OGTT) window to screen for Gestational Diabetes.",
    scanFocusDescMl:
      "അടുത്ത ആഴ്ച മുതൽ (24–28 ആഴ്ചകൾ) ഗർഭകാല പ്രമേഹം പരിശോധിക്കുന്ന OGTT ടെസ്റ്റ് ചെയ്യേണ്ട സമയമാണ്.",
  },
  24: {
    cropEn: "Ash Gourd (Kumbalanga)",
    cropMl: "കുമ്പളങ്ങ",
    lengthCm: "30.0 cm",
    weightGrams: "~600 g",
    isMilestone: true,
    titleEn: "Week 24: Sensory Awakenings & OGTT Window",
    titleMl: "ആഴ്ച 24: കുഞ്ഞിന്റെ ഇന്ദ്രിയ വികാസവും ഷുഗർ പരിശോധനയും",
    summaryEn:
      "Baby can now recognize your voice and react to soothing lullabies! Inner ear structures are completely hardened and functioning.",
    summaryMl:
      "കുഞ്ഞിന് ഇപ്പോൾ നിങ്ങളുടെ ശബ്ദവും താരാട്ടുപാട്ടുകളും തിരിച്ചറിയാൻ കഴിയും. ആന്തരിക കർണ്ണങ്ങളുടെ വളർച്ച പൂർത്തിയായി!",
    subtextEn:
      "Sized like a tender Kerala Ash Gourd / Kumbalanga (~30.0 cm, ~600 g). Baby's tiny face is fully formed!",
    subtextMl:
      "ഒരു ഇടത്തരം കുമ്പളങ്ങയുടെ വലിപ്പം (~30.0 സെ.മീ, ~600 ഗ്രാം). കുഞ്ഞിന്റെ മുഖം പൂർണ്ണമായി രൂപപ്പെട്ടു!",
    babyFocusTitleEn: "Mature Inner Ear Cochlea & Lullaby Recognition:",
    babyFocusTitleMl: "ശബ്ദത്തോടുള്ള പ്രതികരണവും കേൾവിശക്തിയും:",
    babyFocusDescEn:
      "The inner ear cochlea and balance organs are mature; baby's heart rate calms when hearing familiar parental voices or music.",
    babyFocusDescMl:
      "ആന്തരിക കർണ്ണങ്ങൾ പൂർണ്ണ വളർച്ചയെത്തി. അമ്മയുടെ ശബ്ദവും താരാട്ടുപാട്ടുകളും കേൾക്കുമ്പോൾ കുഞ്ഞ് ശാന്തമാകുന്നു.",
    maternalFocusTitleEn: "Linea Nigra & Postural Back Care:",
    maternalFocusTitleMl: "വയറ്റിലെ നേർത്ത വരയും (Linea Nigra) നടുവേദനയും:",
    maternalFocusDescEn:
      "The harmless vertical pigment line on your abdomen darkens; avoid lifting heavy water buckets and support your lower back.",
    maternalFocusDescMl:
      "ഹോർമോൺ മാറ്റം മൂലം വയറ്റിൽ കാണുന്ന നേർത്ത വര സ്വാഭാവികമാണ്. ഭാരമുള്ള ബക്കറ്റുകൾ എടുക്കുന്നത് ഒഴിവാക്കുക.",
    scanFocusTitleEn: "75g Oral Glucose Tolerance Test (OGTT - Weeks 24–28):",
    scanFocusTitleMl: "ഗ്ലൂക്കോസ് ടോളറൻസ് ടെസ്റ്റ് (75g OGTT - 24–28 ആഴ്ചകൾ):",
    scanFocusDescEn:
      "Crucial 75g 2-hour glucose screening across Kerala PHCs and maternity hospitals to detect Gestational Diabetes Mellitus (GDM) early.",
    scanFocusDescMl:
      "ഗർഭകാല പ്രമേഹം (Gestational Diabetes) നേരത്തെ കണ്ടെത്തി നിയന്ത്രിക്കാൻ നടത്തുന്ന പ്രധാന 75 ഗ്രാം ഗ്ലൂക്കോസ് പരിശോധന.",
  },
  25: {
    cropEn: "Taro Root (Chembu)",
    cropMl: "വലിയ ചേമ്പ്",
    lengthCm: "34.6 cm",
    weightGrams: "~660 g",
    titleEn: "Week 25: Capillary Glow & Nostril Opening",
    titleMl: "ആഴ്ച 25: രക്തയോട്ടവും ശ്വസന പരിശീലനവും",
    summaryEn:
      "Tiny capillaries fill with blood, giving baby's wrinkled skin a warm rosy hue! Nostrils unplug and open for practice breathing.",
    summaryMl:
      "സൂക്ഷ്മ രക്തക്കുഴലുകളിലൂടെ രക്തം പ്രവഹിക്കുന്നതോടെ കുഞ്ഞിന്റെ ചർമ്മത്തിന് ഇളം ചുവപ്പ് നിറം കൈവരുന്നു. മൂക്കിന്റെ ദ്വാരങ്ങൾ തുറക്കുന്നു.",
    subtextEn:
      "About the size of a hearty Kerala Taro Root / Chembu (~34.6 cm, ~660 g). Sense of equilibrium is established!",
    subtextMl:
      "വലിയൊരു ചേമ്പിന്റെ വലിപ്പം (~34.6 സെ.മീ, ~660 ഗ്രാം). കുഞ്ഞ് അമ്നിയോട്ടിക് ദ്രാവകത്തിൽ ശ്വസന പരിശീലനം നടത്തുന്നു!",
    babyFocusTitleEn: "Subdermal Capillaries & Open Nostrils:",
    babyFocusTitleMl: "സൂക്ഷ്മ രക്തക്കുഴലുകളും മൂക്കിന്റെ ദ്വാരങ്ങളും:",
    babyFocusDescEn:
      "Nostrils open wide, allowing baby to inhale and exhale small amounts of amniotic fluid to exercise respiratory muscles.",
    babyFocusDescMl:
      "മൂക്കിന്റെ ദ്വാരങ്ങൾ തുറക്കുന്നതോടെ ശ്വാസകോശ പേശികളുടെ ബലത്തിനായി കുഞ്ഞ് അമ്നിയോട്ടിക് ദ്രാവകത്തിൽ ശ്വസന പരിശീലനം നടത്തുന്നു.",
    maternalFocusTitleEn: "Thickening Hair & Sciatic Nerve Relief:",
    maternalFocusTitleMl: "നടുവിലെയും ഇടുപ്പിലെയും സമ്മർദ്ദം കുറയ്ക്കാൻ:",
    maternalFocusDescEn:
      "Estrogen prolongs your hair's growth phase for extra volume, while pelvic tilts relieve lower back and sciatic tension.",
    maternalFocusDescMl:
      "ഇടുപ്പിലും നടുവിലും അനുഭവപ്പെടുന്ന വേദന കുറയ്ക്കാൻ ഇരിക്കുമ്പോൾ നട്ടെല്ലിന് പിന്നിൽ ചെറിയ തലയിണ വെക്കുക.",
    scanFocusTitleEn: "Fasting & Post-Meal Blood Sugar Monitoring:",
    scanFocusTitleMl: "രക്തത്തിലെ പഞ്ചസാരയുടെ അളവ് ക്രമീകരിക്കൽ:",
    scanFocusDescEn:
      "Keep fasting blood sugar between 70–95 mg/dL by pairing complex Kerala red rice (Matta) with plenty of leafy thoran and protein.",
    scanFocusDescMl:
      "രക്തത്തിലെ ഫാസ്റ്റിംഗ് ഷുഗർ 95 mg/dL-ൽ താഴെ നിലനിർത്താൻ മട്ട അരിച്ചോറിനൊപ്പം ധാരാളം ഇലക്കറികളും പയറുവർഗ്ഗങ്ങളും ഉൾപ്പെടുത്തുക.",
  },
  26: {
    cropEn: "Country Brinjal (Nadan Vazhuthana)",
    cropMl: "നാടൻ വഴുതനങ്ങ",
    lengthCm: "35.6 cm",
    weightGrams: "~760 g",
    titleEn: "Week 26: Eyelids Open & Light Perception",
    titleMl: "ആഴ്ച 26: കുഞ്ഞ് ആദ്യമായി കണ്ണുകൾ തുറക്കുന്നു",
    summaryEn:
      "After months of being fused shut, your baby's eyelids open for the first time and blink in response to warm light!",
    summaryMl:
      "മാസങ്ങളായി അടഞ്ഞിരുന്ന കൺപോളകൾ കുഞ്ഞ് ആദ്യമായി തുറക്കുകയും വയറ്റിലേക്ക് അടിക്കുന്ന വെളിച്ചത്തോട് പ്രതികരിക്കുകയും ചെയ്യുന്നു!",
    subtextEn:
      "Sized like a long Kerala Country Brinjal (~35.6 cm, ~760 g). Visual brain wave activity spikes!",
    subtextMl:
      "നീളമുള്ള നാടൻ വഴുതനങ്ങയുടെ വലിപ്പം (~35.6 സെ.മീ, ~760 ഗ്രാം). കാഴ്ചയുമായി ബന്ധപ്പെട്ട മസ്തിഷ്ക തരംഗങ്ങൾ സജീവമാകുന്നു!",
    babyFocusTitleEn: "Blinking Reflex & Retinal Maturation:",
    babyFocusTitleMl: "കൺപോളകൾ തുറക്കലും കാഴ്ചശക്തിയും:",
    babyFocusDescEn:
      "The retina at the back of the eye develops light-sensitive rods and cones, and baby practices blinking inside the womb.",
    babyFocusDescMl:
      "കണ്ണിനുള്ളിലെ റെറ്റിന വികസിക്കുകയും കുഞ്ഞ് കൺപോളകൾ ചിമ്മാൻ പരിശീലിക്കുകയും ചെയ്യുന്നു.",
    maternalFocusTitleEn: "Early Braxton Hicks Practice Contractions:",
    maternalFocusTitleMl: "ഗർഭപാത്രത്തിന്റെ നേരിയ മുറുക്കം (Braxton Hicks):",
    maternalFocusDescEn:
      "Occasional painless, 30-second tightening of the uterus is normal conditioning; drink water and rest on your left side.",
    maternalFocusDescMl:
      "ഇടയ്ക്കിടെ വേദനയില്ലാതെ വയർ 30 സെക്കൻഡ് നേരം മുറുകി അയയുന്നത് സ്വാഭാവികമാണ്. ധാരാളം വെള്ളം കുടിച്ച് വിശ്രമിക്കുക.",
    scanFocusTitleEn: "Blood Pressure Check (<130/85 mmHg Target):",
    scanFocusTitleMl: "രക്തസമ്മർദ്ദ പരിശോധന (<130/85 mmHg):",
    scanFocusDescEn:
      "Log your weekly home or clinic BP in the Tracker tab; report any reading ≥ 140/90 mmHg or sudden facial swelling immediately.",
    scanFocusDescMl:
      "ട്രാക്കർ ടാബിൽ ആഴ്ചതോറും ബി.പി രേഖപ്പെടുത്തുക. ബി.പി 140/90-ൽ കൂടിയാലോ മുഖത്ത് നീര് കണ്ടാലോ ഉടൻ ഡോക്ടറെ അറിയിക്കുക.",
  },
  27: {
    cropEn: "Banana Blossom (Vazhakoombu)",
    cropMl: "വാഴക്കൂമ്പ്",
    lengthCm: "36.6 cm",
    weightGrams: "~875 g",
    titleEn: "Week 27: Cerebral Cortex Folding & Fetal Hiccups",
    titleMl: "ആഴ്ച 27: മസ്തിഷ്ക മടക്കുകളും രണ്ടാം ത്രൈമാസ പൂർത്തീകരണവും",
    summaryEn:
      "Closing the Second Trimester! Regular fetal hiccups feel like gentle rhythmic taps as baby's cerebral cortex forms complex folds.",
    summaryMl:
      "രണ്ടാം ത്രൈമാസത്തിന്റെ അവസാന ആഴ്ച! കുഞ്ഞിന് ഇടയ്ക്കിടെ എക്കിൾ വരുന്നത് താളത്തിലുള്ള ചെറിയ തുടിപ്പുകളായി അമ്മയ്ക്ക് അനുഭവപ്പെടാം.",
    subtextEn:
      "Sized like a wholesome Kerala Vazhakoombu / Banana Blossom (~36.6 cm, ~875 g). Ready for Trimester 3!",
    subtextMl:
      "ഒരു വാഴക്കൂമ്പിന്റെ വലിപ്പം (~36.6 സെ.മീ, ~875 ഗ്രാം). മൂന്നാം ത്രൈമാസത്തിലേക്ക് കടക്കാൻ തയ്യാറെടുക്കുന്നു!",
    babyFocusTitleEn: "Cerebral Gyri & Rhythmic Diaphragm Hiccups:",
    babyFocusTitleMl: "മസ്തിഷ്ക വളർച്ചയും കുഞ്ഞിന്റെ എക്കിളും:",
    babyFocusDescEn:
      "The smooth brain surface develops intricate grooves (gyri) that dramatically expand cognitive capacity, while hiccups strengthen the diaphragm.",
    babyFocusDescMl:
      "തലച്ചോറിന്റെ ഉപരിതലത്തിൽ ബുദ്ധിവികാസത്തിന് സഹായിക്കുന്ന മടക്കുകൾ രൂപപ്പെടുന്നു. എക്കിളുകൾ ശ്വസനപേശികൾക്ക് ബലം നൽകുന്നു.",
    maternalFocusTitleEn: "Rib Cage Expansion & Shortness of Breath:",
    maternalFocusTitleMl: "വാരിയെല്ലുകൾക്ക് താഴെയുള്ള സമ്മർദ്ദം:",
    maternalFocusDescEn:
      "As the uterus rises toward the rib cage, sit upright with shoulder rolls to give your lungs maximum room to expand.",
    maternalFocusDescMl:
      "ഗർഭപാത്രം മുകളിലേക്ക് വളരുന്നതിനാൽ ദീർഘമായി ശ്വാസമെടുക്കാനും നിവർന്നിരിക്കാനും ശ്രദ്ധിക്കുക.",
    scanFocusTitleEn: "Second Trimester Lab Review & Rh Typing Check:",
    scanFocusTitleMl: "രണ്ടാം ത്രൈമാസ പരിശോധനാ അവലോകനം:",
    scanFocusDescEn:
      "Ensure OGTT glucose results are normal and check if Rh-negative mothers need Week 28 Anti-D prophylaxis.",
    scanFocusDescMl:
      "ഷുഗർ പരിശോധനാ ഫലം ഡോക്ടറെ കാണിക്കുക. രക്തഗ്രൂപ്പ് നെഗറ്റീവ് ആയ അമ്മമാർ 28-ാം ആഴ്ചയിലെ Anti-D കുത്തിവെപ്പിനെക്കുറിച്ച് ചോദിക്കുക.",
  },
  28: {
    cropEn: "Mature Coconut (Thenga / Nalikeram)",
    cropMl: "നാളികേരം",
    lengthCm: "37.6 cm",
    weightGrams: "~1000 g",
    isMilestone: true,
    titleEn: "Week 28: Welcome to Trimester 3 & Daily Kick Counts",
    titleMl: "ആഴ്ച 28: മൂന്നാം ത്രൈമാസത്തിലേക്ക് സ്വാഗതം • കിക്ക് കൗണ്ട്",
    summaryEn:
      "Your baby hits the 1 kilogram milestone! Begin daily fetal kick counting (at least 10 distinct movements in 12 hours).",
    summaryMl:
      "കുഞ്ഞിന്റെ ഭാരം 1 കിലോഗ്രാം എത്തുന്നു! മൂന്നാം ത്രൈമാസം മുതൽ ദിവസവും കുഞ്ഞിന്റെ അനക്കം (12 മണിക്കൂറിൽ കുറഞ്ഞത് 10 അനക്കം) ശ്രദ്ധിച്ചു തുടങ്ങണം.",
    subtextEn:
      "Sized like a whole Kerala Coconut / Nalikeram (~37.6 cm, ~1000 g / 1.0 kg). REM dream sleep begins!",
    subtextMl:
      "ഒരു വലിയ നാളികേരത്തിന്റെ വലിപ്പം (~37.6 സെ.മീ, ~1 കിലോഗ്രാം). ദിവസേനയുള്ള കിക്ക് കൗണ്ടിംഗ് ആരംഭിക്കാം!",
    babyFocusTitleEn: "1 Kilogram Milestone & REM Dream Cycles:",
    babyFocusTitleMl: "1 കിലോഗ്രാം ഭാരവും ഉറക്ക-ഉണർവ് ക്രമങ്ങളും:",
    babyFocusDescEn:
      "Rapid Eye Movement (REM) sleep waves show baby is dreaming, and eyelashes are now fully formed around blinking eyes.",
    babyFocusDescMl:
      "കുഞ്ഞിന് കൃത്യമായ ഉറക്ക-ഉണർവ് ക്രമങ്ങൾ രൂപപ്പെടുന്നു. കൺപീളികൾ പൂർണ്ണമായി വളർന്നു കഴിഞ്ഞു.",
    maternalFocusTitleEn: "Daily Kick Count Routine After Meals:",
    maternalFocusTitleMl: "ദിവസേനയുള്ള കിക്ക് കൗണ്ട് നിരീക്ഷണം:",
    maternalFocusDescEn:
      "Rest on your left side after breakfast, lunch, and dinner and use the Materna Kick Counter to log at least 10 movements daily.",
    maternalFocusDescMl:
      "ഭക്ഷണത്തിന് ശേഷം ഇടതുവശം ചരിഞ്ഞുകിടന്ന് കുഞ്ഞിന്റെ അനക്കം ശ്രദ്ധിക്കുകയും ആപ്പിലെ കിക്ക് കൗണ്ടറിൽ രേഖപ്പെടുത്തുകയും ചെയ്യുക.",
    scanFocusTitleEn: "Anti-D Immunoglobulin (If Rh-Negative) & Repeat Hb:",
    scanFocusTitleMl: "ആന്റി-ഡി (Anti-D) കുത്തിവെപ്പും ഹീമോഗ്ലോബിൻ പരിശോധനയും:",
    scanFocusDescEn:
      "Rh-negative mothers receive their prophylactic 300 mcg Anti-D injection at Week 28, alongside a third-trimester Hemoglobin check.",
    scanFocusDescMl:
      "രക്തഗ്രൂപ്പ് Rh-നെഗറ്റീവ് ആയ അമ്മമാർക്ക് ഈ ആഴ്ച Anti-D കുത്തിവെപ്പ് നൽകുന്നു. ഹീമോഗ്ലോബിൻ അളവ് വീണ്ടും പരിശോധിക്കുക.",
  },
  29: {
    cropEn: "Bottle Gourd (Churakka)",
    cropMl: "ചുരയ്ക്ക",
    lengthCm: "38.6 cm",
    weightGrams: "~1150 g",
    titleEn: "Week 29: Rapid Brain DHA & Skeletal Calcium",
    titleMl: "ആഴ്ച 29: മസ്തിഷ്ക വികാസവും അസ്ഥികളുടെ ബലവും",
    summaryEn:
      "Baby's brain is accumulating Omega-3 DHA rapidly and bones absorb nearly 250 mg of maternal calcium every single day!",
    summaryMl:
      "കുഞ്ഞിന്റെ മസ്തിഷ്കം വേഗത്തിൽ വളരുന്നു. എല്ലുകളുടെ ബലത്തിനായി ദിവസവും 250 മി.ഗ്രാം കാൽസ്യം കുഞ്ഞ് അമ്മയിൽ നിന്ന് സ്വീകരിക്കുന്നു!",
    subtextEn:
      "Sized like a tender green Kerala Churakka / Bottle Gourd (~38.6 cm, ~1.15 kg). Vigorous pokes and stretches!",
    subtextMl:
      "ഒരു ഇടത്തരം ചുരയ്ക്കയുടെ വലിപ്പം (~38.6 സെ.മീ, ~1.15 കിലോഗ്രാം). കുഞ്ഞിന്റെ ചലനങ്ങൾക്ക് കരുത്ത് കൂടുന്നു!",
    babyFocusTitleEn: "Thermoregulation & Bone Density Surge:",
    babyFocusTitleMl: "ശരീര താപനില നിയന്ത്രണവും അസ്ഥിബലവും:",
    babyFocusDescEn:
      "The brain can now regulate body temperature and rhythmic breathing movements, while white fat fills out the cheeks and limbs.",
    babyFocusDescMl:
      "ശരീര താപനിലയും ശ്വസന താളവും നിയന്ത്രിക്കാൻ കുഞ്ഞിന്റെ തലച്ചോറ് പ്രാപ്തമാകുന്നു. കവിളുകളിൽ കൊഴുപ്പ് അടിഞ്ഞു തുടങ്ങുന്നു.",
    maternalFocusTitleEn: "Preventing Constipation & Varicose Veins:",
    maternalFocusTitleMl: "മലബന്ധവും കാലിലെ ഞരമ്പ് വീക്കവും തടയാൻ:",
    maternalFocusDescEn:
      "Include fiber-rich steamed Nendran banana, Vazhakoombu thoran, and 8–10 glasses of water daily; avoid sitting with legs crossed.",
    maternalFocusDescMl:
      "മലബന്ധം ഒഴിവാക്കാൻ നാരുകൾ അടങ്ങിയ വാഴക്കൂമ്പ് തോരൻ, നേന്ത്രപ്പഴം, 8–10 ഗ്ലാസ് വെള്ളം എന്നിവ ശീലമാക്കുക.",
    scanFocusTitleEn: "Never Skip Morning Calcium (500mg) & Afternoon IFA:",
    scanFocusTitleMl: "കാൽസ്യം, അയൺ ഗുളികകൾ കൃത്യമായി തുടരുക:",
    scanFocusDescEn:
      "Because fetal skeletal demand peaks in Trimester 3, consistent calcium and iron supplementation protects maternal bone stores.",
    scanFocusDescMl:
      "മൂന്നാം ത്രൈമാസത്തിൽ കുഞ്ഞിന് കാൽസ്യവും ഇരുമ്പും ഏറ്റവും കൂടുതൽ ആവശ്യമുള്ളതിനാൽ ഗുളികകൾ ഒരു ദിവസവും മുടക്കരുത്.",
  },
  30: {
    cropEn: "Breadfruit (Kadachakka)",
    cropMl: "കടച്ചക്ക",
    lengthCm: "39.9 cm",
    weightGrams: "~1320 g",
    titleEn: "Week 30: Bone Marrow Red Blood Cells & Vision",
    titleMl: "ആഴ്ച 30: അസ്ഥിമജ്ജയിലെ രക്തനിർമ്മാണവും കാഴ്ചയും",
    summaryEn:
      "Baby's bone marrow has completely taken over red blood cell production! Lanugo body hair slowly starts shedding into amniotic fluid.",
    summaryMl:
      "കുഞ്ഞിന്റെ അസ്ഥിമജ്ജ (Bone marrow) ചുവന്ന രക്താണുക്കളുടെ നിർമ്മാണം പൂർണ്ണമായി ഏറ്റെടുക്കുന്നു! കാഴ്ചശക്തി കൂടുതൽ മെച്ചപ്പെടുന്നു.",
    subtextEn:
      "Sized like a round Kerala Kadachakka / Breadfruit (~39.9 cm, ~1.32 kg). Surrounded by ~750 mL amniotic fluid!",
    subtextMl:
      "ഒരു കടച്ചക്കയുടെ വലിപ്പം (~39.9 സെ.മീ, ~1.32 കിലോഗ്രാം). 10 ആഴ്ചകൾ മാത്രം ബാക്കി!",
    babyFocusTitleEn: "Bone Marrow Erythropoiesis & Hand Grasp:",
    babyFocusTitleMl: "ചുവന്ന രക്താണുക്കളുടെ ഉത്പാദനം:",
    babyFocusDescEn:
      "Previously handled by the liver and spleen, baby's bone marrow now manufactures all red blood cells for oxygen transport.",
    babyFocusDescMl:
      "ശരീരത്തിലുടനീളം ഓക്സിജൻ എത്തിക്കുന്ന ചുവന്ന രക്താണുക്കളെ കുഞ്ഞിന്റെ അസ്ഥിമജ്ജ സ്വയം ഉത്പാദിപ്പിച്ചു തുടങ്ങുന്നു.",
    maternalFocusTitleEn: "Evening Heartburn & Pillow Support:",
    maternalFocusTitleMl: "രാത്രിയിലെ നെഞ്ചെരിച്ചിലും ഉറക്ക സഹായവും:",
    maternalFocusDescEn:
      "Eat an early, light dinner at least 2 hours before bedtime and prop your upper back slightly with an extra pillow.",
    maternalFocusDescMl:
      "ഉറങ്ങുന്നതിന് രണ്ട് മണിക്കൂർ മുമ്പെങ്കിലും ലഘുവായ അത്താഴം കഴിക്കുന്നത് നെഞ്ചെരിച്ചിൽ ഒഴിവാക്കാൻ സഹായിക്കും.",
    scanFocusTitleEn: "Fortnightly (Every 2 Weeks) ANC Checkups Begin:",
    scanFocusTitleMl: "രണ്ടാഴ്ചയിലൊരിക്കലുള്ള ഡോക്ടർ പരിശോധന:",
    scanFocusDescEn:
      "From Week 30 to Week 36, antenatal visits move to every 2 weeks to monitor blood pressure, fetal heart rate, and fundal height.",
    scanFocusDescMl:
      "30-ാം ആഴ്ച മുതൽ 36-ാം ആഴ്ച വരെ രണ്ടാഴ്ചയിലൊരിക്കൽ ബി.പിയും കുഞ്ഞിന്റെ ഹൃദയമിടിപ്പും വളർച്ചയും പരിശോധിക്കണം.",
  },
  31: {
    cropEn: "Snake Gourd (Padavalanga)",
    cropMl: "പടവലങ്ങ",
    lengthCm: "41.1 cm",
    weightGrams: "~1500 g",
    titleEn: "Week 31: Pupillary Light Reflex & Neural Connections",
    titleMl: "ആഴ്ച 31: കൃഷ്ണമണികളുടെ ചലനവും നാഡീബന്ധങ്ങളും",
    summaryEn:
      "Baby weighs 1.5 kg! Pupils can now constrict and dilate in response to light, and all five senses are actively processing signals.",
    summaryMl:
      "കുഞ്ഞിന്റെ ഭാരം 1.5 കിലോഗ്രാം എത്തുന്നു! വെളിച്ചത്തിനനുസരിച്ച് കണ്ണിന്റെ കൃഷ്ണമണികൾ ചുരുങ്ങാനും വികസിക്കാനും തുടങ്ങുന്നു.",
    subtextEn:
      "Length of a farm-fresh Kerala Padavalanga / Snake Gourd (~41.1 cm, ~1.5 kg). Longer sleep-wake periods!",
    subtextMl:
      "ഒരു പടവലങ്ങയുടെ നീളം (~41.1 സെ.മീ, ~1.5 കിലോഗ്രാം). പഞ്ചേന്ദ്രിയങ്ങളും പൂർണ്ണ സജ്ജമാകുന്നു!",
    babyFocusTitleEn: "Pupillary Reflex & Trillions of Synapses:",
    babyFocusTitleMl: "കൃഷ്ണമണികളുടെ പ്രതികരണവും മസ്തിഷ്ക സിനാപ്സുകളും:",
    babyFocusDescEn:
      "Iris muscles adjust pupil size to light, and baby turns their head side-to-side while tracking voices outside the womb.",
    babyFocusDescMl:
      "പുറത്തുനിന്നുള്ള ശബ്ദങ്ങൾ കേൾക്കുമ്പോൾ കുഞ്ഞ് തല ചെരിച്ച് പ്രതികരിക്കുന്നു. മസ്തിഷ്ക കോശങ്ങൾ തമ്മിലുള്ള ബന്ധം ദൃഢമാകുന്നു.",
    maternalFocusTitleEn: "Colostrum Pre-Milk & Breast Care:",
    maternalFocusTitleMl: "കൊളസ്ട്രം (ആദ്യ മുലപ്പാൽ) തയ്യാറെടുപ്പ്:",
    maternalFocusDescEn:
      "Breasts may occasionally leak drops of golden colostrum (rich in maternal antibodies); wash gently with plain warm water.",
    maternalFocusDescMl:
      "സ്തനങ്ങളിൽ നിന്ന് പ്രതിരോധശേഷി നൽകുന്ന മഞ്ഞനിറത്തിലുള്ള കൊളസ്ട്രം (ആദ്യ മുലപ്പാൽ) കനിഞ്ഞു തുടങ്ങുന്നത് സ്വാഭാവികമാണ്.",
    scanFocusTitleEn: "Schedule Third Trimester Growth & Doppler Scan (W32):",
    scanFocusTitleMl: "32-ാം ആഴ്ചയിലെ ഗ്രോത്ത് & ഡോപ്ലർ സ്കാൻ:",
    scanFocusDescEn:
      "Book your Week 32 Growth & Fetal Doppler ultrasound to evaluate estimated fetal weight, umbilical blood flow, and amniotic fluid.",
    scanFocusDescMl:
      "കുഞ്ഞിന്റെ ഭാരവും പൊക്കിൾക്കൊടിയിലൂടെയുള്ള രക്തയോട്ടവും പരിശോധിക്കുന്ന 32-ാം ആഴ്ചയിലെ ഗ്രോത്ത് സ്കാൻ ബുക്ക് ചെയ്യുക.",
  },
  32: {
    cropEn: "Vazhakulam Pineapple (Kaithachakka)",
    cropMl: "വാഴക്കുളം കൈതച്ചക്ക",
    lengthCm: "42.4 cm",
    weightGrams: "~1700 g",
    isMilestone: true,
    titleEn: "Week 32: Practice Breathing & Growth Doppler Scan",
    titleMl: "ആഴ്ച 32: ശ്വസന പരിശീലനവും ഗ്രോത്ത് സ്കാനും",
    summaryEn:
      "Toenails and fingernails are complete! Baby practices breathing movements up to 40% of the time and stores vital iron and calcium.",
    summaryMl:
      "കുഞ്ഞിന്റെ കൈകാലുകളിലെ നഖങ്ങൾ പൂർണ്ണമായി വളർന്നു! ശരീരത്തിൽ കൊഴുപ്പും ഇരുമ്പും കാൽസ്യവും വേഗത്തിൽ സംഭരിക്കപ്പെടുന്നു.",
    subtextEn:
      "Sized like a sweet GI-tagged Vazhakulam Pineapple (~42.4 cm, ~1.7 kg). Lungs are maturing steadily!",
    subtextMl:
      "ഒരു വാഴക്കുളം കൈതച്ചക്കയുടെ വലിപ്പം (~42.4 സെ.മീ, ~1.7 കിലോഗ്രാം). ശ്വാസകോശം കൂടുതൽ പക്വത നേടുന്നു!",
    babyFocusTitleEn: "Complete Nails & Iron/Calcium Reserves:",
    babyFocusTitleMl: "പൂർണ്ണ വളർച്ചയെത്തിയ നഖങ്ങളും ധാതുശേഖരവും:",
    babyFocusDescEn:
      "Baby builds a 6-month hepatic iron reserve from your circulation and begins rotating toward a head-down (cephalic) position.",
    babyFocusDescMl:
      "ജനനശേഷം ആദ്യ ആറുമാസത്തേക്ക് ആവശ്യമായ ഇരുമ്പിന്റെ ശേഖരം കുഞ്ഞിന്റെ കരളിൽ സംഭരിക്കപ്പെടുന്നു.",
    maternalFocusTitleEn: "Diaphragmatic Breathing & Rib Comfort:",
    maternalFocusTitleMl: "ശ്വസന വ്യായാമവും വിശ്രമവും:",
    maternalFocusDescEn:
      "Baby's feet may press gently under your ribs; practice slow pranayama breathing and sit with supported lumbar cushions.",
    maternalFocusDescMl:
      "കുഞ്ഞിന്റെ കാലുകൾ വാരിയെല്ലിന് താഴെ തട്ടുമ്പോൾ നിവർന്നിരുന്ന് സാവധാനം ദീർഘശ്വാസം എടുക്കുന്നത് ആശ്വാസം നൽകും.",
    scanFocusTitleEn: "Third Trimester Growth & Umbilical Doppler Scan:",
    scanFocusTitleMl: "മൂന്നാം ത്രൈമാസ ഗ്രോത്ത് & ഡോപ്ലർ സ്കാൻ:",
    scanFocusDescEn:
      "Assesses fetal growth curve percentile, umbilical artery blood flow resistance, placental maturity, and Amniotic Fluid Index (AFI).",
    scanFocusDescMl:
      "കുഞ്ഞിന്റെ തൂക്കം, മറുപിള്ളയിലൂടെയുള്ള രക്തയോട്ടം (Doppler), അമ്നിയോട്ടിക് ദ്രാവക അളവ് (AFI) എന്നിവ വിലയിരുത്തുന്ന പ്രധാന സ്കാൻ.",
  },
  33: {
    cropEn: "Elephant Foot Yam (Chena)",
    cropMl: "ചേന",
    lengthCm: "43.7 cm",
    weightGrams: "~1920 g",
    titleEn: "Week 33: Maternal Antibody Transfer & Pliable Skull",
    titleMl: "ആഴ്ച 33: പ്രതിരോധ ആന്റിബോഡികളുടെ കൈമാറ്റം",
    summaryEn:
      "Your immune system transfers protective IgG antibodies across the placenta! Baby's skull bones remain soft and flexible for birth.",
    summaryMl:
      "അമ്മയുടെ ശരീരത്തിൽ നിന്നുള്ള പ്രതിരോധ ആന്റിബോഡികൾ (IgG) മറുപിള്ള വഴി കുഞ്ഞിലേക്ക് കൈമാറ്റം ചെയ്യപ്പെടുന്നു!",
    subtextEn:
      "About the size of a medium Kerala Chena / Yam (~43.7 cm, ~1.92 kg). Smooth, pink skin!",
    subtextMl:
      "ഒരു ഇടത്തരം ചേനയുടെ വലിപ്പം (~43.7 സെ.മീ, ~1.92 കിലോഗ്രാം). കുഞ്ഞിന്റെ പ്രതിരോധ സംവിധാനം ശക്തിപ്പെടുന്നു!",
    babyFocusTitleEn: "Transplacental IgG Immunity & Fontanelles:",
    babyFocusTitleMl: "പ്രതിരോധശേഷിയും മൃദുവായ തലയോട്ടി എല്ലുകളും:",
    babyFocusDescEn:
      "While body bones harden, cranial plates stay separated by soft fontanelles so the head can safely mold through the birth canal.",
    babyFocusDescMl:
      "ശരീരത്തിലെ മറ്റ് എല്ലുകൾ ബലപ്പെടുമ്പോഴും സുഖപ്രസവത്തിന് സഹായിക്കുന്നതിനായി തലയോട്ടിയിലെ എല്ലുകൾ മൃദുവായി തുടരുന്നു.",
    maternalFocusTitleEn: "Wrist Tingling (Carpal Tunnel) & Hydration:",
    maternalFocusTitleMl: "കൈത്തണ്ടയിലെ തരിപ്പും ജലാംശവും:",
    maternalFocusDescEn:
      "Fluid retention can mildly compress wrist nerves; rotate wrists gently and keep hands elevated on a pillow at night.",
    maternalFocusDescMl:
      "രാത്രിയിൽ കൈവിരലുകളിൽ തരിപ്പ് തോന്നുന്നുവെങ്കിൽ കൈകൾ ചെറിയ തലയിണയിൽ വെച്ച് ഉയർത്തിപ്പിടിച്ച് ഉറങ്ങുക.",
    scanFocusTitleEn: "Pre-Eclampsia Vigilance (BP & Urine Dipstick):",
    scanFocusTitleMl: "പ്രീ-എക്ലാംപ്സിയ (Pre-eclampsia) മുൻകരുതൽ:",
    scanFocusDescEn:
      "Watch closely for any sudden headache, blurred vision, or epigastric pain; keep your Safety Triage checklist handy.",
    scanFocusDescMl:
      "കഠിനമായ തലവേദന, കാഴ്ച മങ്ങൽ, പെട്ടെന്നുള്ള നീര് എന്നിവ കണ്ടാൽ ഉടൻ Safety ടാബ് പരിശോധിച്ച് ഡോക്ടറെ കാണുക.",
  },
  34: {
    cropEn: "Palakkadan Matta Paddy Bundle (Nelkathir)",
    cropMl: "പാലക്കാടൻ മട്ട നെൽക്കതിർ",
    lengthCm: "45.0 cm",
    weightGrams: "~2150 g",
    titleEn: "Week 34: Lung Surfactant Maturity & Vernix Thickening",
    titleMl: "ആഴ്ച 34: ശ്വാസകോശ പക്വതയും വെർണിക്സ് ആവരണവും",
    summaryEn:
      "Baby surpasses 2 kilograms! Lung surfactant production reaches high maturity and protective vernix coating thickens.",
    summaryMl:
      "കുഞ്ഞിന്റെ ഭാരം 2 കിലോഗ്രാം പിന്നിട്ടു! ശ്വാസകോശ വളർച്ചയും ചർമ്മത്തിലെ വെർണിക്സ് ആവരണവും പൂർണ്ണ പക്വതയിലേക്ക് എത്തുന്നു.",
    subtextEn:
      "Length of a golden Palakkadan Matta Paddy Bundle (~45.0 cm, ~2.15 kg). Central nervous system maturing!",
    subtextMl:
      "ഒരു പാലക്കാടൻ മട്ട നെൽക്കതിർ കറ്റയുടെ നീളം (~45.0 സെ.മീ, ~2.15 കിലോഗ്രാം). നാഡീവ്യൂഹം പക്വത നേടുന്നു!",
    babyFocusTitleEn: "Mature Pulmonary Alveoli & Smooth Skin:",
    babyFocusTitleMl: "പക്വതയാർന്ന ശ്വാസകോശ അറകൾ:",
    babyFocusDescEn:
      "Lungs are now well-equipped to breathe air, and subcutaneous fat rounds out the arms and legs for thermal stability.",
    babyFocusDescMl:
      "ശ്വാസകോശത്തിലെ വായു അറകൾ സ്വതന്ത്രമായി ശ്വസിക്കാൻ തക്കവണ്ണം വികസിച്ചു കഴിഞ്ഞു. കവിളുകളും കൈകാലുകളും ഉരുണ്ടു വരുന്നു.",
    maternalFocusTitleEn: "Pelvic Floor & Perineal Readiness:",
    maternalFocusTitleMl: "പെൽവിക് പേശികളുടെ വ്യായാമം:",
    maternalFocusDescEn:
      "Practice gentle Kegel pelvic floor contractions and Bhadrasana (Butterfly Pose) to support pelvic elasticity for delivery.",
    maternalFocusDescMl:
      "പ്രസവം സുഗമമാക്കാൻ ഇടുപ്പ് പേശികൾക്ക് അയവ് നൽകുന്ന ബദ്ധകോണാസനവും കെഗൽ (Kegel) വ്യായാമങ്ങളും പരിശീലിക്കുക.",
    scanFocusTitleEn: "Finalize Birth Plan & Identify 24/7 CEmONC Hospital:",
    scanFocusTitleMl: "പ്രസവ ആശുപത്രിയും യാത്രാ ക്രമീകരണവും:",
    scanFocusDescEn:
      "Confirm your primary delivery hospital, 24/7 emergency transport route, and blood donor contacts in your MCP card folder.",
    scanFocusDescMl:
      "പ്രസവത്തിനായി തിരഞ്ഞെടുത്ത ആശുപത്രിയിലേക്കുള്ള വാഹന സൗകര്യവും രക്തദാതാക്കളുടെ വിവരങ്ങളും തയ്യാറാക്കി വെക്കുക.",
  },
  35: {
    cropEn: "Kerala Musk Melon (Thaikumbalam)",
    cropMl: "തൈക്കുമ്പളം",
    lengthCm: "46.2 cm",
    weightGrams: "~2380 g",
    titleEn: "Week 35: Fully Developed Kidneys & Active Liver",
    titleMl: "ആഴ്ച 35: വൃക്കകളുടെയും കരളിന്റെയും പൂർണ്ണ വളർച്ച",
    summaryEn:
      "Baby's kidneys are completely developed and the liver can process waste products! Most basic physical development is now complete.",
    summaryMl:
      "കുഞ്ഞിന്റെ വൃക്കകൾ പൂർണ്ണ വളർച്ചയെത്തി, കരൾ പ്രവർത്തനസജ്ജമായി! ഇനിയുള്ള ആഴ്ചകളിൽ കുഞ്ഞിന്റെ ശരീരഭാരം വേഗത്തിൽ വർദ്ധിക്കുന്നു.",
    subtextEn:
      "Sized like a plump Kerala Thaikumbalam / Musk Melon (~46.2 cm, ~2.38 kg). Snug inside the uterus!",
    subtextMl:
      "ഒരു തൈക്കുമ്പളത്തിന്റെ വലിപ്പം (~46.2 സെ.മീ, ~2.38 കിലോഗ്രാം). ഗർഭപാത്രത്തിനുള്ളിൽ കുഞ്ഞ് നിറഞ്ഞു നിൽക്കുന്നു!",
    babyFocusTitleEn: "Mature Renal Filtration & Rapid Weight Gain:",
    babyFocusTitleMl: "വൃക്കകളുടെ പ്രവർത്തനവും തൂക്കവർദ്ധനവും:",
    babyFocusDescEn:
      "Baby gains roughly 200–250 grams per week now, depositing essential fat around the shoulders and limbs.",
    babyFocusDescMl:
      "ഈ ഘട്ടത്തിൽ ആഴ്ചയിൽ 200–250 ഗ്രാം വരെ കുഞ്ഞിന് ഭാരം കൂടുന്നു. തോളുകളിലും കൈകാലുകളിലും കൊഴുപ്പ് സംഭരിക്കപ്പെടുന്നു.",
    maternalFocusTitleEn: "Frequent Bladder Pressure & Rolling Movements:",
    maternalFocusTitleMl: "ഉരുളുന്ന പോലെയുള്ള കുഞ്ഞിന്റെ ചലനങ്ങൾ:",
    maternalFocusDescEn:
      "Because space inside the womb is snug, kicks feel more like firm rolls, squirms, and stretches; count 10 movements daily.",
    maternalFocusDescMl:
      "ഗർഭപാത്രത്തിൽ സ്ഥലം കുറവായതിനാൽ കുഞ്ഞ് ഉരുളുന്നതും കൈകാലുകൾ നിവർത്തുന്നതും വ്യക്തമായി അറിയാം. ദിവസവും 10 അനക്കം ഉറപ്പാക്കുക.",
    scanFocusTitleEn: "Group B Strep / Vaginal Infection Screen & Hb Check:",
    scanFocusTitleMl: "അണുബാധാ പരിശോധനയും ഹീമോഗ്ലോബിൻ ഉറപ്പാക്കലും:",
    scanFocusDescEn:
      "Your obstetrician checks for any late-pregnancy vaginal infection and ensures hemoglobin is optimal ahead of labour.",
    scanFocusDescMl:
      "പ്രസവത്തിന് മുന്നോടിയായി ഹീമോഗ്ലോബിൻ അളവ് തൃപ്തികരമാണെന്നും മറ്റ് അണുബാധകൾ ഇല്ലെന്നും ഡോക്ടർ പരിശോധിക്കുന്നു.",
  },
  36: {
    cropEn: "Large Ripe Papaya (Kappalanga)",
    cropMl: "വലിയ കപ്പളങ്ങ",
    lengthCm: "47.4 cm",
    weightGrams: "~2620 g",
    isMilestone: true,
    titleEn: "Week 36: Head-Down Engagement & Hospital Bag",
    titleMl: "ആഴ്ച 36: കുഞ്ഞ് തല താഴെയുള്ള നിലയിലേക്ക് • ആശുപത്രി ബാഗ്",
    summaryEn:
      "Baby likely settles into a head-down (cephalic) position in your pelvis ('lightening'). Keep your MCP card and hospital bag ready!",
    summaryMl:
      "കുഞ്ഞ് പ്രസവത്തിനായി തല താഴെയുള്ള നിലയിലേക്ക് (Cephalic presentation) ഇറങ്ങുന്നു. തായ് കാർഡും ആശുപത്രി ബാഗും തയ്യാറാക്കി വെക്കുക!",
    subtextEn:
      "Sized like a large Kerala Kappalanga / Papaya (~47.4 cm, ~2.62 kg). Weekly obstetric visits start now!",
    subtextMl:
      "വലിയൊരു കപ്പളങ്ങയുടെ വലിപ്പം (~47.4 സെ.മീ, ~2.62 കിലോഗ്രാം). ഇനി ആഴ്ചയിലൊരിക്കൽ ഡോക്ടറെ കാണണം!",
    babyFocusTitleEn: "Cephalic Engagement & Digestive Meconium:",
    babyFocusTitleMl: "തല താഴെയുള്ള നിലയും (Cephalic) ദഹനവ്യവസ്ഥയും:",
    babyFocusDescEn:
      "Baby's head engages into the pelvic inlet while the intestines accumulate meconium for baby's first bowel movement after birth.",
    babyFocusDescMl:
      "കുഞ്ഞിന്റെ തല ഇടുപ്പെല്ലിലേക്ക് ഇറങ്ങി നിൽക്കുന്നു. ശ്വസനം കൂടുതൽ എളുപ്പമാകുന്നതായി അമ്മയ്ക്ക് തോന്നാം.",
    maternalFocusTitleEn: "Lightening (Easier Breathing, Pelvic Pressure):",
    maternalFocusTitleMl: "ശ്വസനത്തിന് ആശ്വാസവും ഇടുപ്പിലെ സമ്മർദ്ദവും:",
    maternalFocusDescEn:
      "As baby drops lower into the pelvis, upper rib pressure eases while lower pelvic and bladder pressure increases.",
    maternalFocusDescMl:
      "കുഞ്ഞ് താഴേക്ക് ഇറങ്ങുന്നതോടെ നെഞ്ചിലെ ഭാരം കുറഞ്ഞ് ശ്വസിക്കാൻ എളുപ്പമാകും; എന്നാൽ കൂടെക്കൂടെ മൂത്രശങ്ക തോന്നാം.",
    scanFocusTitleEn: "Presentation Check & Pack Hospital Bag (MCP Folder):",
    scanFocusTitleMl: "കുഞ്ഞിന്റെ പൊസിഷൻ പരിശോധനയും ആശുപത്രി ബാഗും:",
    scanFocusDescEn:
      "Obstetric palpation/scan confirms cephalic presentation. Pack cotton baby clothes, maternity pads, and your complete MCP card folder.",
    scanFocusDescMl:
      "കുഞ്ഞിന്റെ തല താഴെയാണെന്ന് ഡോക്ടർ പരിശോധിച്ച് ഉറപ്പാക്കുന്നു. തായ് കാർഡ്, സ്കാൻ റിപ്പോർട്ടുകൾ, കോട്ടൺ വസ്ത്രങ്ങൾ എന്നിവ ബാഗിൽ കരുതുക.",
  },
  37: {
    cropEn: "Tender Jackfruit (Idichakka)",
    cropMl: "ഇടിച്ചക്ക",
    lengthCm: "48.6 cm",
    weightGrams: "~2860 g",
    isMilestone: true,
    titleEn: "Week 37: Early Term Achieved & Weekly FHR Checks",
    titleMl: "ആഴ്ച 37: ഏർലി ടേം (Early Term) ഘട്ടവും പ്രതിവാര പരിശോധനയും",
    summaryEn:
      "You have officially reached Early Term (37 weeks)! Baby's lungs, brain, and sucking coordination are ready for life outside.",
    summaryMl:
      "37-ാം ആഴ്ചയോടെ കുഞ്ഞ് സുരക്ഷിതമായ 'ഏർലി ടേം' (Early Term) ഘട്ടത്തിലെത്തി! കുഞ്ഞിന് മുലപ്പാൽ കുടിക്കാനും ശ്വസിക്കാനുമുള്ള ശേഷി കൈവന്നു.",
    subtextEn:
      "Sized like a wholesome Kerala Idichakka / Tender Jackfruit (~48.6 cm, ~2.86 kg). Early term milestone!",
    subtextMl:
      "ഒരു ഇടിച്ചക്കയുടെ വലിപ്പം (~48.6 സെ.മീ, ~2.86 കിലോഗ്രാം). ഏത് സമയത്തും പ്രസവലക്ഷണങ്ങൾ പ്രതീക്ഷിക്കാം!",
    babyFocusTitleEn: "Suck-Swallow-Breathe Coordination:",
    babyFocusTitleMl: "മുലപ്പാൽ കുടിക്കാനും ശ്വസിക്കാനുമുള്ള ഏകോപനം:",
    babyFocusDescEn:
      "Oral muscles, tongue, and lungs coordinate seamlessly so baby can latch and breastfeed immediately during the Golden Hour after birth.",
    babyFocusDescMl:
      "ജനിച്ചയുടൻ ആദ്യ മണിക്കൂറിൽ തന്നെ മുലപ്പാൽ കുടിക്കാൻ ആവശ്യമായ പേശീ-ശ്വസന ഏകോപനം കുഞ്ഞ് കൈവരിക്കുന്നു.",
    maternalFocusTitleEn: "Cervical Softening & Mucus Plug Awareness:",
    maternalFocusTitleMl: "ഗർഭാശയഗളത്തിലെ മാറ്റങ്ങൾ:",
    maternalFocusDescEn:
      "The cervix begins softening and effacing in preparation for labour. Distinguish irregular Braxton Hicks from rhythmic contractions.",
    maternalFocusDescMl:
      "പ്രസവത്തിനായി ഗർഭാശയഗളം (Cervix) മൃദുവായി തുടങ്ങുന്നു. ക്രമമായി വരുന്ന വേദനകൾ ശ്രദ്ധിക്കുക.",
    scanFocusTitleEn: "Weekly Pelvic & Fetal Heart Rate (FHR / NST) Check:",
    scanFocusTitleMl: "ആഴ്ചതോറുമുള്ള ഹൃദയമിടിപ്പ് (FHR / NST) പരിശോധന:",
    scanFocusDescEn:
      "Weekly clinic visits evaluate Fetal Heart Rate (110–160 bpm), pelvic adequacy, blood pressure, and fetal movement count.",
    scanFocusDescMl:
      "കുഞ്ഞിന്റെ ഹൃദയമിടിപ്പ് (110–160 bpm), ഇടുപ്പെല്ലിന്റെ വികാസം, ബി.പി എന്നിവ ആഴ്ചതോറും ഡോക്ടർ പരിശോധിക്കുന്നു.",
  },
  38: {
    cropEn: "Kerala Sweet Pumpkin (Mathanga)",
    cropMl: "മത്തങ്ങ",
    lengthCm: "49.8 cm",
    weightGrams: "~3080 g",
    titleEn: "Week 38: Firm Grasp Reflex & Vocal Surfactant",
    titleMl: "ആഴ്ച 38: കുഞ്ഞിന്റെ ഉറച്ച കൈപ്പിടിയും പൂർണ്ണ വളർച്ചയും",
    summaryEn:
      "Baby crosses 3 kilograms! Most lanugo hair has shed, fingernails reach the fingertips, and baby has a strong palmar grasp.",
    summaryMl:
      "കുഞ്ഞിന്റെ ഭാരം 3 കിലോഗ്രാം എത്തുന്നു! ശരീരത്തിലെ നേർത്ത രോമങ്ങൾ കൊഴിഞ്ഞു മാറുകയും കൈപ്പിടിക്ക് നല്ല ബലം കൈവരുകയും ചെയ്യുന്നു.",
    subtextEn:
      "Sized like a round golden Kerala Mathanga / Pumpkin (~49.8 cm, ~3.08 kg). Organ systems 100% ready!",
    subtextMl:
      "ഒരു നാടൻ മത്തങ്ങയുടെ വലിപ്പം (~49.8 സെ.മീ, ~3.08 കിലോഗ്രാം). അവയവങ്ങളെല്ലാം പൂർണ്ണ സജ്ജം!",
    babyFocusTitleEn: "Palmar Grasp Reflex & Tear Production:",
    babyFocusTitleMl: "ഗാഢമായ കൈപ്പിടിയും കണ്ണുനീർ ഗ്രന്ഥികളും:",
    babyFocusDescEn:
      "Baby's hands can firmly grasp your finger the moment they are born, and vocal cords are primed for their first healthy cry.",
    babyFocusDescMl:
      "ജനിച്ചയുടൻ നിങ്ങളുടെ വിരലിൽ മുറുകെ പിടിക്കാനുള്ള ശേഷി കുഞ്ഞിന്റെ കൈകൾക്കുണ്ട്. ആദ്യ കരച്ചിലിനായി സ്വരതന്തുക്കൾ തയ്യാറാണ്.",
    maternalFocusTitleEn: "Nesting Instinct & Energy Conservation:",
    maternalFocusTitleMl: "പ്രസവത്തിനായുള്ള ഊർജ്ജ സംരക്ഷണം:",
    maternalFocusDescEn:
      "Save your physical stamina for labour—take afternoon naps, eat easily digestible Ulunthu Kanji, and practice slow breathing.",
    maternalFocusDescMl:
      "പ്രസവസമയത്തേക്ക് ശരീരത്തിന് കരുത്ത് കരുതാൻ നന്നായി വിശ്രമിക്കുകയും എളുപ്പം ദഹിക്കുന്ന ഉഴുന്ന് കഞ്ഞി പോലുള്ള ആഹാരം കഴിക്കുകയും ചെയ്യുക.",
    scanFocusTitleEn: "Non-Stress Test (NST) & Amniotic Fluid Check:",
    scanFocusTitleMl: "എൻ.എസ്.ടി (NST) ഹൃദയമിടിപ്പ് പരിശോധന:",
    scanFocusDescEn:
      "Your obstetrician monitors fetal heart rate accelerations during movement and confirms adequate amniotic fluid cushion.",
    scanFocusDescMl:
      "കുഞ്ഞ് അനങ്ങുമ്പോൾ ഹൃദയമിടിപ്പിലുണ്ടാകുന്ന വ്യതിയാനം (NST) പരിശോധിച്ച് കുഞ്ഞിന്റെ ആരോഗ്യം ഉറപ്പാക്കുന്നു.",
  },
  39: {
    cropEn: "Large Watermelon (Thannimathan)",
    cropMl: "തണ്ണിമത്തൻ",
    lengthCm: "50.7 cm",
    weightGrams: "~3280 g",
    titleEn: "Week 39: Full Term Brain & Golden Hour Readiness",
    titleMl: "ആഴ്ച 39: പൂർണ്ണ വളർച്ച (Full Term) • മുലയൂട്ടൽ തയ്യാറെടുപ്പ്",
    summaryEn:
      "Full Term achieved! Baby's chest is prominent, adipose fat keeps them warm, and brain neural networks continue expanding rapidly.",
    summaryMl:
      "കുഞ്ഞ് പൂർണ്ണ വളർച്ചയിലെത്തി (Full Term)! ജനിച്ചയുടനുള്ള ആദ്യ മണിക്കൂറിലെ (Golden Hour) മുലയൂട്ടലിനായി അമ്മയും കുഞ്ഞും സജ്ജമാണ്.",
    subtextEn:
      "Sized like a sweet Kerala Thannimathan / Watermelon (~50.7 cm, ~3.28 kg). Watch for true labour signs!",
    subtextMl:
      "വലിയൊരു തണ്ണിമത്തന്റെ വലിപ്പം (~50.7 സെ.മീ, ~3.28 കിലോഗ്രാം). പ്രസവലക്ഷണങ്ങൾ ശ്രദ്ധിക്കുക!",
    babyFocusTitleEn: "Full-Term Pulmonary & Neural Readiness:",
    babyFocusTitleMl: "പൂർണ്ണ വളർച്ചയെത്തിയ തലച്ചോറും ശ്വാസകോശവും:",
    babyFocusDescEn:
      "New skin cells replace outer layers, fat makes up ~15% of body weight, and lungs are ready to take their first breath of air.",
    babyFocusDescMl:
      "ശരീരഭാരത്തിന്റെ 15 ശതമാനത്തോളം ഇപ്പോൾ ആരോഗ്യകരമായ കൊഴുപ്പാണ്. ജനിച്ചയുടൻ സ്വയം ശ്വസിക്കാൻ ശ്വാസകോശം പൂർണ്ണ സജ്ജമാണ്.",
    maternalFocusTitleEn: "Recognizing True Labour Contractions:",
    maternalFocusTitleMl: "യഥാർത്ഥ പ്രസവവേദന തിരിച്ചറിയാം:",
    maternalFocusDescEn:
      "True labour contractions radiate from the back to the lower abdomen, grow stronger at regular 5–10 minute intervals, and do not stop with rest.",
    maternalFocusDescMl:
      "യഥാർത്ഥ പ്രസവവേദന നടുവിൽ നിന്ന് ആരംഭിച്ച് അടിവയറ്റിലേക്ക് പടരുകയും കൃത്യമായ ഇടവേളകളിൽ (5–10 മിനിറ്റ്) ശക്തി കൂടുകയും ചെയ്യും.",
    scanFocusTitleEn: "Golden Hour Breastfeeding & JSSK Labour Ward Readiness:",
    scanFocusTitleMl: "ആദ്യ മണിക്കൂറിലെ മുലയൂട്ടലും (Golden Hour) ആശുപത്രി യാത്രയും:",
    scanFocusDescEn:
      "Prepare for skin-to-skin contact and colostrum breastfeeding within 1 hour of birth. Proceed to hospital if water breaks or contractions become regular.",
    scanFocusDescMl:
      "ജനിച്ചയുടൻ ഒരു മണിക്കൂറിനുള്ളിൽ കുഞ്ഞിന് കൊളസ്ട്രം (ആദ്യ മുലപ്പാൽ) നൽകാൻ തയ്യാറാകുക. വെള്ളം പൊട്ടിയാലോ വേദന തുടങ്ങിയാലോ ഉടൻ ആശുപത്രിയിലെത്തുക.",
  },
  40: {
    cropEn: "Honey Jackfruit (Thenvarikka Chakka)",
    cropMl: "തേൻവരിക്ക ചക്ക",
    lengthCm: "51.2 cm",
    weightGrams: "~3400 g",
    isMilestone: true,
    titleEn: "Week 40: Full Term — Ready to Meet Your Baby!",
    titleMl: "ആഴ്ച 40: പൂർണ്ണ വളർച്ച — കുഞ്ഞിനെ വരവേൽക്കാം!",
    summaryEn:
      "Your baby is full term and ready for birth! Watch for rhythmic contractions or water breaking and stay closely connected with your obstetrician.",
    summaryMl:
      "കുഞ്ഞ് പൂർണ്ണ വളർച്ചയെത്തി! പ്രസവവേദനയുടെ ലക്ഷണങ്ങളോ ദ്രാവക ചോർച്ചയോ കണ്ടാലുടൻ തായ് കാർഡുമായി ആശുപത്രിയിലേക്ക് പുറപ്പെടുക.",
    subtextEn:
      "Sized like a golden Kerala Thenvarikka Chakka / Jackfruit (~51.2 cm, ~3.4 kg). Happy motherhood!",
    subtextMl:
      "ഒരു നാടൻ തേൻവരിക്ക ചക്കയുടെ വലിപ്പം (~51.2 സെ.മീ, ~3.4 കിലോഗ്രാം). മാതൃത്വത്തിലേക്ക് ഹൃദ്യമായ സ്വാഗതം!",
    babyFocusTitleEn: "Ready for First Cry & Skin-to-Skin Bonding:",
    babyFocusTitleMl: "ആദ്യ കരച്ചിലിനും അമ്മയുടെ സ്പർശനത്തിനുമായി സജ്ജം:",
    babyFocusDescEn:
      "With 300 bones at birth and acute hearing tuned to your voice, your baby is ready to be calmed on your chest immediately after delivery.",
    babyFocusDescMl:
      "ജനിക്കുമ്പോൾ കുഞ്ഞിന് 300 എല്ലുകളുണ്ടാകും. അമ്മയുടെ ശബ്ദവും ഹൃദയമിടിപ്പും തിരിച്ചറിയുന്ന കുഞ്ഞ് ജനനശേഷം അമ്മയുടെ നെഞ്ചോട് ചേരുമ്പോൾ ശാന്തമാകുന്നു.",
    maternalFocusTitleEn: "Active Labour Signs & Water Breaking (PROM):",
    maternalFocusTitleMl: "പ്രസവലക്ഷണങ്ങളും അടിയന്തര ശ്രദ്ധയും:",
    maternalFocusDescEn:
      "If your water breaks (clear or greenish fluid leakage), contractions come every 5 minutes, or fetal movements slow down, head to the labour room immediately.",
    maternalFocusDescMl:
      "അമ്നിയോട്ടിക് ദ്രാവകം പുറത്തുവരികയോ (Water breaking), 5 മിനിറ്റ് ഇടവിട്ട് വേദന വരികയോ, കുഞ്ഞിന്റെ അനക്കം കുറയുകയോ ചെയ്താൽ ഉടൻ ലേബർ റൂമിൽ എത്തുക.",
    scanFocusTitleEn: "Due Date Biophysical Profile (BPP) & Labour Admission:",
    scanFocusTitleMl: "പ്രസവ തീയതിയിലെ പരിശോധനയും (BPP/NST) അഡ്മിഷനും:",
    scanFocusDescEn:
      "If labour hasn't started by your EDD, your obstetrician will perform an NST and Biophysical Profile scan to plan safe delivery.",
    scanFocusDescMl:
      "നിശ്ചയിച്ച തീയതിയിലും പ്രസവവേദന തുടങ്ങിയില്ലെങ്കിൽ ഡോക്ടറെ കണ്ട് NST, സ്കാനിംഗ് എന്നിവ വഴി സുരക്ഷിതമായ പ്രസവരീതി തീരുമാനിക്കുക.",
  },
};

// 10 Gestational Clinical Stage Blocks (4-week clinical windows)
const STAGE_CLINICAL_BLOCKS: Record<number, StageClinicalBlock> = {
  // Stage 1: Weeks 1–4 (Conception & Implantation)
  1: {
    babySubtitleEn: "Cellular division, blastocyst implantation & germ layers",
    babySubtitleMl: "കോശവിഭജനം, ഗർഭപാത്രത്തിൽ ഉറയ്ക്കൽ, പ്രാരംഭ വളർച്ച",
    babyPoints: [
      {
        icon: "biotech",
        color: "#5856D6",
        titleEn: "Amniotic Sac & Yolk Sac:",
        titleMl: "അമ്നിയോട്ടിക് സഞ്ചിയുടെ രൂപീകരണം:",
        descEn:
          "The protective fluid-filled amniotic sac cushions the embryo while the yolk sac supplies early blood cells and nutrients.",
        descMl:
          "കുഞ്ഞിന് സംരക്ഷണം നൽകുന്ന അമ്നിയോട്ടിക് സഞ്ചിയും ആദ്യഘട്ട പോഷണം നൽകുന്ന യോക്ക് സാക്കും (Yolk sac) രൂപപ്പെടുന്നു.",
      },
      {
        icon: "spa",
        color: "#FF2D55",
        titleEn: "Early Placental Chorionic Villi:",
        titleMl: "മറുപിള്ളയുടെ പ്രാരംഭ വേരുകൾ:",
        descEn:
          "Microscopic placental projections burrow gently into the nutrient-rich uterine lining to establish maternal-fetal circulation.",
        descMl:
          "അമ്മയിൽ നിന്ന് കുഞ്ഞിലേക്ക് ഓക്സിജനും പോഷകങ്ങളും എത്തിക്കുന്ന മറുപിള്ളയുടെ പ്രാരംഭ കോശങ്ങൾ പ്രവർത്തിച്ചു തുടങ്ങുന്നു.",
      },
    ],
    maternalSubtitleEn: "Early hormonal shifts, missed period & folate absorption",
    maternalSubtitleMl: "ഹോർമോൺ മാറ്റങ്ങൾ, ആർത്തവം നീളൽ, ഫോളിക് ആസിഡ്",
    maternalPoints: [
      {
        titleEn: "Progesterone Surge & Rest:",
        titleMl: "പ്രൊജസ്ട്രോൺ ഹോർമോണും വിശ്രമവും:",
        descEn:
          "Elevated progesterone relaxes uterine muscles to prevent contractions, which can make you feel unusually sleepy in the afternoon.",
        descMl:
          "ഗർഭപാത്രത്തിന്റെ സംരക്ഷണത്തിനായി പ്രൊജസ്ട്രോൺ ഹോർമോൺ ഉയരുന്നതിനാൽ പകൽ സമയത്ത് കൂടുതൽ ക്ഷീണം തോന്നുന്നത് സ്വാഭാവികമാണ്.",
      },
      {
        titleEn: "Clean Hydration & Food Safety:",
        titleMl: "ശുദ്ധമായ കുടിവെള്ളവും ഭക്ഷണ സുരക്ഷയും:",
        descEn:
          "Drink boiled cooled water or warm Jeeraka Vellam (cumin water) and avoid unpasteurized milk or raw papaya.",
        descMl:
          "തിളപ്പിച്ചാറിയ വെള്ളമോ ജീരകവെള്ളമോ കുടിക്കുക. പച്ച പപ്പായയും വൃത്തിയില്ലാത്ത പുറംഭക്ഷണങ്ങളും പൂർണ്ണമായി ഒഴിവാക്കുക.",
      },
    ],
    activitiesSubtitleEn: "Gentle breathing & rest during implantation",
    activitiesSubtitleMl: "ശാന്തമായ ശ്വസന വ്യായാമവും മതിയായ വിശ്രമവും",
    activitiesPoints: [
      {
        titleEn: "Nadi Shodhana (Gentle Alternate Nostril Breathing)",
        titleMl: "ലളിതമായ ശ്വസന വ്യായാമം (പ്രാണായാമം)",
        descEn:
          "Sit comfortably on a cushion for 5 minutes each morning and practice slow, calm nasal breathing to reduce early pregnancy anxiety.",
        descMl:
          "മനസ്സിന് ശാന്തത നൽകാനും ഓക്സിജൻ പ്രവാഹം കൂട്ടാനും രാവിലെ 5 മിനിറ്റ് സാവധാനത്തിലുള്ള ശ്വസന വ്യായാമം ശീലിക്കാം.",
      },
      {
        titleEn: "Avoid Heavy Lifting & Sudden Straining",
        titleMl: "ഭാരം എടുക്കുന്നതും ആയാസവും ഒഴിവാക്കുക",
        descEn:
          "During the implantation window, avoid lifting heavy water pots, climbing steep steps rapidly, or long bumpy two-wheeler rides.",
        descMl:
          "ഭ്രൂണം ഗർഭപാത്രത്തിൽ ഉറയ്ക്കുന്ന ഈ ഘട്ടത്തിൽ ഭാരമുള്ള പാത്രങ്ങൾ എടുക്കുന്നതും കുലുക്കമുള്ള ദീർഘദൂര യാത്രകളും ഒഴിവാക്കുക.",
      },
    ],
    scansSubtitleEn: "Pregnancy confirmation & daily 400 mcg Folic Acid",
    scansSubtitleMl: "ഗർഭസ്ഥിരീകരണവും ഫോളിക് ആസിഡ് ഗുളികയും",
    secondaryScanPoint: {
      icon: "medication",
      titleEn: "Daily Folic Acid (400 mcg) Neural Protection:",
      titleMl: "ഫോളിക് ആസിഡ് (400 mcg) മുടങ്ങാതെ കഴിക്കുക:",
      descEn:
        "Taking 400 mcg of Folic Acid every morning prevents neural tube defects during the critical first 28 days after conception.",
      descMl:
        "കുഞ്ഞിന്റെ തലച്ചോറിന്റെയും നട്ടെല്ലിന്റെയും പൂർണ്ണ വളർച്ചയ്ക്ക് ആദ്യ മൂന്ന് മാസങ്ങളിൽ ഫോളിക് ആസിഡ് ഗുളിക അത്യന്താപേക്ഷിതമാണ്.",
    },
    nutritionHighlight: {
      titleEn: "Cherupayar Sundal (Steamed Green Gram) & Tender Coconut",
      titleMl: "ചെറുപയർ പുഴുങ്ങിയതും ഇളനീരും",
      descEn:
        "Sprouted or steamed green gram (Cherupayar) provides natural dietary folate and gentle plant protein for early cellular division.",
      descMl:
        "മുളപ്പിച്ചതോ വേവിച്ചതോ ആയ ചെറുപയർ ഫോളിക് ആസിഡും പ്രോട്ടീനും നൽകുന്നു; പ്രാരംഭ കോശവളർച്ചയ്ക്ക് അത്യുത്തമം.",
      intakeEn: "1 small bowl steamed Cherupayar + 400 mcg Folic Acid",
      intakeMl: "1 ചെറിയ കപ്പ് ചെറുപയർ + ഫോളിക് ആസിഡ് ഗുളിക",
      image: NUTRITION_IMAGES.muringayila,
    },
  },

  // Stage 2: Weeks 5–8 (Neural Tube, Heartbeat & MCP Registration)
  2: {
    babySubtitleEn: "Cardiac pulse, neural tube closure & limb buds",
    babySubtitleMl: "ഹൃദയമിടിപ്പ്, നാഡീവ്യൂഹ രൂപീകരണം, കൈകാൽ മുകുളങ്ങൾ",
    babyPoints: [
      {
        icon: "favorite",
        color: "#FF2D55",
        titleEn: "Rapid Embryonic Heartbeat (110–160 bpm):",
        titleMl: "കുഞ്ഞിന്റെ ഹൃദയമിടിപ്പ് (110–160 bpm):",
        descEn:
          "The embryonic heart beats steadily and circulates blood through early vessels to nourish the developing brain and liver.",
        descMl:
          "കുഞ്ഞിന്റെ ഹൃദയം ക്രമമായി മിടിക്കുകയും തലച്ചോറിലേക്കും മറ്റ് അവയവങ്ങളിലേക്കും രക്തം പമ്പ് ചെയ്യുകയും ചെയ്യുന്നു.",
      },
      {
        icon: "psychology",
        color: "#5856D6",
        titleEn: "Forebrain, Midbrain & Hindbrain:",
        titleMl: "മസ്തിഷ്ക അറകളുടെ വിഭജനം:",
        descEn:
          "The neural tube closes completely and differentiates into the three primary brain divisions alongside optic and inner ear vesicles.",
        descMl:
          "ന്യൂറൽ ട്യൂബ് പൂർണ്ണമായി അടയുകയും തലച്ചോറിന്റെ മൂന്ന് പ്രധാന ഭാഗങ്ങളും കണ്ണിന്റെയും ചെവിയുടെയും മുകുളങ്ങളും രൂപപ്പെടുകയും ചെയ്യുന്നു.",
      },
    ],
    maternalSubtitleEn: "Managing morning nausea, smell sensitivity & fatigue",
    maternalSubtitleMl: "മനംപിരട്ടൽ, മണങ്ങളോടുള്ള അസ്വസ്ഥത, ക്ഷീണം",
    maternalPoints: [
      {
        titleEn: "Chukku Vellam (Dry Ginger Infusion) for Nausea:",
        titleMl: "മനംപിരട്ടലിന് ഇളം ചൂടുള്ള ചുക്കുവെള്ളം:",
        descEn:
          "Sip mild warm dry-ginger and coriander water (Chukku-Malli Vellam) in small quantities to calm morning gastric nausea naturally.",
        descMl:
          "രാവിലെയുള്ള മനംപിരട്ടലും ഛർദ്ദിയും കുറയ്ക്കാൻ നേർത്ത ചുക്കുവെള്ളമോ മല്ലിയിട്ട വെള്ളമോ അല്പാല്പമായി കുടിക്കുക.",
      },
      {
        titleEn: "Small, Frequent Carbohydrate Snacks:",
        titleMl: "ചെറിയ ഇടവേളകളിൽ ലഘുഭക്ഷണം:",
        descEn:
          "An empty stomach worsens nausea. Eat small portions of steamed idiyappam, rice kanji, or ripe banana every 2.5–3 hours.",
        descMl:
          "വയർ ഒഴിഞ്ഞുകിടക്കുന്നത് മനംപിരട്ടൽ കൂട്ടും. അതിനാൽ 2-3 മണിക്കൂർ ഇടവിട്ട് ഇടിയപ്പം, കഞ്ഞി, പഴം തുടങ്ങിയ ലഘുഭക്ഷണങ്ങൾ കഴിക്കുക.",
      },
    ],
    activitiesSubtitleEn: "Shaded veranda walks & morning fresh air",
    activitiesSubtitleMl: "പ്രഭാതത്തിലെ ശുദ്ധവായുവും ലളിതമായ നടത്തവും",
    activitiesPoints: [
      {
        titleEn: "15-Minute Morning Veranda / Courtyard Walk",
        titleMl: "രാവിലെ 15 മിനിറ്റ് മുറ്റത്തോ വരാന്തയിലോ നടത്തം",
        descEn:
          "Gentle walking in cool morning air between 7:00 AM and 8:00 AM reduces nausea and improves circulation without overheating.",
        descMl:
          "രാവിലെ ഇളംവെയിലത്ത് 15 മിനിറ്റ് സാവധാനം നടക്കുന്നത് മനംപിരട്ടൽ കുറയ്ക്കാനും ഉന്മേഷം നൽകാനും സഹായിക്കും.",
      },
      {
        titleEn: "Afternoon Left-Side Rest (30 Mins)",
        titleMl: "ഉച്ചഭക്ഷണത്തിന് ശേഷം 30 മിനിറ്റ് വിശ്രമം",
        descEn:
          "Allow your body extra sleep during the first-trimester hormone surge to support placental formation.",
        descMl:
          "ഒന്നാം ത്രൈമാസത്തിലെ ക്ഷീണം മാറ്റാനും മറുപിള്ളയുടെ വളർച്ചയ്ക്കും ഉച്ചയ്ക്ക് അരമണിക്കൂർ വിശ്രമിക്കുന്നത് നല്ലതാണ്.",
      },
    ],
    scansSubtitleEn: "Dating Ultrasound & NHM Kerala MCP Card Registration",
    scansSubtitleMl: "ഡേറ്റിംഗ് സ്കാനും തായ് കാർഡ് രജിസ്ട്രേഷനും",
    secondaryScanPoint: {
      icon: "badge",
      titleEn: "Baseline Blood Group, Hb, Thyroid (TSH) & Urine Check:",
      titleMl: "രക്തഗ്രൂപ്പ്, ഹീമോഗ്ലോബിൻ, തൈറോയ്ഡ് പരിശോധനകൾ:",
      descEn:
        "Complete your first-trimester antenatal blood panel at your PHC/hospital and verify your Rh status and thyroid balance.",
      descMl:
        "ആദ്യ മൂന്ന് മാസത്തിനുള്ളിൽ രക്തഗ്രൂപ്പ്, ഹീമോഗ്ലോബിൻ, തൈറോയ്ഡ് (TSH), ഷുഗർ പരിശോധനകൾ പൂർത്തിയാക്കി തായ് കാർഡിൽ ചേർക്കുക.",
    },
    nutritionHighlight: {
      titleEn: "Chukku Vellam & Fresh Nellikka (Gooseberry)",
      titleMl: "ചുക്കുവെള്ളവും നാടൻ നെല്ലിക്കയും",
      descEn:
        "Warm dry-ginger water settles early pregnancy queasiness while fresh Nellikka supplies Vitamin C and antioxidants.",
      descMl:
        "ഇളം ചൂടുള്ള ചുക്കുവെള്ളം മനംപിരട്ടൽ ശമിപ്പിക്കുന്നു; വൈറ്റമിൻ സി നിറഞ്ഞ നെല്ലിക്ക പ്രതിരോധശേഷി നൽകുന്നു.",
      intakeEn: "Warm sips before meals + 1 fresh Nellikka daily",
      intakeMl: "ഇടയ്ക്കിടെ ചുക്കുവെള്ളം + ദിവസവും 1 നെല്ലിക്ക",
      image: NUTRITION_IMAGES.nellikka,
    },
  },

  // Stage 3: Weeks 9–12 (Organ Completion & NT Scan Milestone)
  3: {
    babySubtitleEn: "Separated digits, early reflexes & first-trimester completion",
    babySubtitleMl: "വിരലുകളുടെ വളർച്ച, പേശീ ചലനങ്ങൾ, ഒന്നാം ത്രൈമാസ പൂർത്തീകരണം",
    babyPoints: [
      {
        icon: "back_hand",
        color: "#00A86B",
        titleEn: "Separated Fingers, Toes & Nail Beds:",
        titleMl: "വേർതിരിഞ്ഞ വിരലുകളും നഖങ്ങളും:",
        descEn:
          "All 10 fingers and 10 toes are distinct and baby can bend elbows, wrists, and knees inside the buoyant amniotic sac.",
        descMl:
          "കൈകാലുകളിലെ പത്ത് വിരലുകളും പൂർണ്ണമായി വേർതിരിയുകയും കുഞ്ഞ് കൈമുട്ടുകളും കാൽമുട്ടുകളും മടക്കാൻ തുടങ്ങുകയും ചെയ്യുന്നു.",
      },
      {
        icon: "vital_signs",
        color: "#007AFF",
        titleEn: "Functioning Kidneys & Digestive Peristalsis:",
        titleMl: "വൃക്കകളുടെയും ദഹനവ്യവസ്ഥയുടെയും പ്രവർത്തനം:",
        descEn:
          "Kidneys filter fluid into the amniotic sac while early intestinal muscles begin practicing gentle wave-like contractions.",
        descMl:
          "കുഞ്ഞിന്റെ വൃക്കകൾ പ്രവർത്തിച്ചു തുടങ്ങുന്നു. കുടലുകളിലെ പേശികൾ ദഹനത്തിനായുള്ള പ്രാരംഭ ചലനങ്ങൾ പരിശീലിക്കുന്നു.",
      },
    ],
    maternalSubtitleEn: "Easing morning sickness, expanding blood volume & skin care",
    maternalSubtitleMl: "മനംപിരട്ടൽ കുറയുന്നു, രക്തയോട്ടം വർദ്ധിക്കുന്നു",
    maternalPoints: [
      {
        titleEn: "Placental Hormone Takeover:",
        titleMl: "മറുപിള്ളയുടെ പൂർണ്ണ പ്രവർത്തനം:",
        descEn:
          "By Week 12, the placenta takes over progesterone production from the ovaries, gradually relieving morning nausea.",
        descMl:
          "12-ാം ആഴ്ചയോടെ ഹോർമോൺ ഉത്പാദനം മറുപിള്ള ഏറ്റെടുക്കുന്നതിനാൽ മനംപിരട്ടലും ക്ഷീണവും ക്രമേണ കുറഞ്ഞു തുടങ്ങും.",
      },
      {
        titleEn: "Preventing Postural Dizziness:",
        titleMl: "പെട്ടെന്നുള്ള തലകറക്കം ഒഴിവാക്കാൻ:",
        descEn:
          "As vascular capacity expands, sit on the edge of the bed for 10 seconds before standing up and keep salted buttermilk handy.",
        descMl:
          "കിടന്നിട്ട് എഴുന്നേൽക്കുമ്പോൾ കട്ടിലിൽ 10 സെക്കൻഡ് ഇരുന്ന ശേഷം മാത്രം എഴുന്നേൽക്കുക. ഇളം ഉപ്പിട്ട മോരുംവെള്ളം കുടിക്കുന്നത് നല്ലതാണ്.",
      },
    ],
    activitiesSubtitleEn: "Pelvic posture alignment & ankle mobility",
    activitiesSubtitleMl: "ശരിയായ ഇരിപ്പുരീതിയും കണങ്കാൽ വ്യായാമവും",
    activitiesPoints: [
      {
        titleEn: "Seated Ankle Rotations & Calf Pumps",
        titleMl: "കണങ്കാൽ വട്ടത്തിൽ ചലിപ്പിക്കുന്ന വ്യായാമം",
        descEn:
          "Rotate both ankles 10 times clockwise and counter-clockwise every evening to promote healthy lower-limb venous return.",
        descMl:
          "രക്തയോട്ടം സുഗമമാക്കാൻ വൈകുന്നേരങ്ങളിൽ കസേരയിലിരുന്ന് കണങ്കാലുകൾ പത്ത് തവണ വീതം വട്ടത്തിൽ സാവധാനം ചലിപ്പിക്കുക.",
      },
      {
        titleEn: "20-Minute Shaded Morning Walk",
        titleMl: "രാവിലെ 20 മിനിറ്റ് തണലുള്ള നടത്തം",
        descEn:
          "Walk at a comfortable conversational pace in shaded surroundings and hydrate with tender coconut water (Ilaneer).",
        descMl:
          "രാവിലെ തണലുള്ള മുറ്റത്തോ വരാന്തയിലോ 20 മിനിറ്റ് നടക്കുക. തുടർന്ന് ഒരു ഇളനീർ കുടിക്കുന്നത് ഉന്മേഷം നൽകും.",
      },
    ],
    scansSubtitleEn: "Nuchal Translucency (NT) Scan & First Trimester Screen",
    scansSubtitleMl: "എൻ.ടി (NT Scan) സ്കാനും ഒന്നാം ത്രൈമാസ പരിശോധനയും",
    secondaryScanPoint: {
      icon: "fact_check",
      titleEn: "First Trimester Dual Marker & Cervical Assessment:",
      titleMl: "ഡബിൾ മാർക്കർ ടെസ്റ്റും തായ് കാർഡ് അവലോകനവും:",
      descEn:
        "Combine NT ultrasound measurements with maternal blood screening as advised by your obstetrician and update your MCP card.",
      descMl:
        "എൻ.ടി സ്കാനിനൊപ്പം ഡോക്ടർ നിർദ്ദേശിക്കുന്ന രക്തപരിശോധനയും പൂർത്തിയാക്കി വിവരങ്ങൾ തായ് കാർഡിൽ രേഖപ്പെടുത്തുക.",
    },
    nutritionHighlight: {
      titleEn: "Muringayila (Drumstick Leaves) & Steamed Nendran",
      titleMl: "മുരിങ്ങയില തോരനും പുഴുങ്ങിയ നേന്ത്രപ്പഴവും",
      descEn:
        "Tender drumstick leaves cooked with grated coconut provide folate and iron as you prepare to enter the Second Trimester.",
      descMl:
        "തേങ്ങ ചിരകിയത് ചേർത്ത ഇളം മുരിങ്ങയില തോരൻ ഫോളിക് ആസിഡും ഇരുമ്പും ധാരാളമായി നൽകുന്നു.",
      intakeEn: "1 bowl Muringayila Thoran with lunch, 3x/week",
      intakeMl: "ആഴ്ചയിൽ 3 ദിവസം ഉച്ചഭക്ഷണത്തിനൊപ്പം മുരിങ്ങയില തോരൻ",
      image: NUTRITION_IMAGES.muringayila,
    },
  },

  // Stage 4: Weeks 13–16 (Second Trimester Entry, Bone Ossification & Quickening)
  4: {
    babySubtitleEn: "Skeletal bone mineralization, vocal cords & first flutters",
    babySubtitleMl: "അസ്ഥികളുടെ ബലം, സ്വരതന്തുക്കൾ, ആദ്യ ചലനങ്ങൾ",
    babyPoints: [
      {
        icon: "skeleton",
        color: "#007AFF",
        titleEn: "Calcium Bone Ossification:",
        titleMl: "എല്ലുകളുടെ ദൃഢീകരണം (Ossification):",
        descEn:
          "Soft cartilage across the arms, legs, and spine hardens into strong bone as calcium transfer across the placenta accelerates.",
        descMl:
          "മറുപിള്ളയിലൂടെയുള്ള കാൽസ്യം ആഗിരണം കൂടുന്നതോടെ കുഞ്ഞിന്റെ കൈകാലുകളിലെയും നട്ടെല്ലിലെയും എല്ലുകൾക്ക് ബലം വെക്കുന്നു.",
      },
      {
        icon: "face",
        color: "#FF2D55",
        titleEn: "Active Facial Muscles & Lanugo Down:",
        titleMl: "മുഖഭാവങ്ങളും ലാനുഗോ രോമങ്ങളും:",
        descEn:
          "Baby practices squinting, frowning, and thumb-sucking while silky lanugo hair covers the skin to hold protective vernix.",
        descMl:
          "കുഞ്ഞ് മുഖപേശികൾ ചലിപ്പിക്കാനും വിരൽ കുടിക്കാനും തുടങ്ങുന്നു. ചർമ്മ സംരക്ഷണത്തിനായി നേർത്ത രോമങ്ങൾ വളരുന്നു.",
      },
    ],
    maternalSubtitleEn: "Starting IFA/Calcium tablets, glowing skin & round ligament care",
    maternalSubtitleMl: "അയൺ-കാൽസ്യം ഗുളികകൾ, ചർമ്മകാന്തി, അടിവയറ്റിലെ പരിചരണം",
    maternalPoints: [
      {
        titleEn: "Iron (IFA) & Calcium Timing Rule:",
        titleMl: "അയൺ, കാൽസ്യം ഗുളികകൾ കഴിക്കേണ്ട ശരിയായ സമയം:",
        descEn:
          "Take Calcium (500mg) after breakfast and Iron-Folic Acid (IFA) after lunch or dinner with Vitamin C. Never take them together.",
        descMl:
          "കാൽസ്യം രാവിലെ ഭക്ഷണത്തിന് ശേഷവും അയൺ ഗുളിക ഉച്ചഭക്ഷണത്തിന് ശേഷവും കഴിക്കുക. രണ്ടും ഒരേ സമയം കഴിക്കരുത്.",
      },
      {
        titleEn: "Soothing Round Ligament Stretch:",
        titleMl: "അടിവയറ്റിലെ പേശിവലിവിന് ആശ്വാസം:",
        descEn:
          "Avoid sudden twisting motions in bed; bend your knees toward your chest slightly before rolling onto your side.",
        descMl:
          "കിടക്കയിൽ പെട്ടെന്ന് തിരിയുന്നത് ഒഴിവാക്കുക; കാൽമുട്ടുകൾ ചെറുതായി മടക്കിയ ശേഷം സാവധാനം വശങ്ങളിലേക്ക് തിരിയുക.",
      },
    ],
    activitiesSubtitleEn: "Marjaryasana (Cat-Cow stretch) & morning strolls",
    activitiesSubtitleMl: "ലളിതമായ നട്ടെല്ല് വ്യായാമവും പ്രഭാത നടത്തവും",
    activitiesPoints: [
      {
        titleEn: "Gentle Seated Cat-Cow Spinal Stretch",
        titleMl: "ഇരുന്നുകൊണ്ടുള്ള നട്ടെല്ല് വ്യായാമം",
        descEn:
          "Sit upright on a firm chair, inhale while gently opening your chest, and exhale while relaxing your shoulders for 5 minutes.",
        descMl:
          "കസേരയിൽ നിവർന്നിരുന്ന് ശ്വാസം ഉള്ളിലേക്കെടുക്കുമ്പോൾ തോളുകൾ വികസിപ്പിക്കുകയും പുറത്തേക്ക് വിടുമ്പോൾ അയയ്ക്കുകയും ചെയ്യുക.",
      },
      {
        titleEn: "20-Minute Morning Walk + Tender Coconut Water",
        titleMl: "20 മിനിറ്റ് പ്രഭാത നടത്തവും ഇളനീരും",
        descEn:
          "Enjoy a brisk 20-minute walk before 8:00 AM and replenish potassium and electrolytes with fresh Kerala Ilaneer.",
        descMl:
          "രാവിലെ 8 മണിക്ക് മുമ്പായി 20 മിനിറ്റ് നടക്കുകയും തുടർന്ന് പൊട്ടാസ്യം നിറഞ്ഞ ഒരു ഇളനീർ കുടിക്കുകയും ചെയ്യുക.",
      },
    ],
    scansSubtitleEn: "IFA/Calcium initiation & Tetanus-Diphtheria (Td) Vaccine",
    scansSubtitleMl: "അയൺ-കാൽസ്യം തുടക്കവും ടി.ഡി (Td) കുത്തിവെപ്പും",
    secondaryScanPoint: {
      icon: "vaccines",
      titleEn: "Td (Tetanus & Diphtheria) Immunization Record:",
      titleMl: "ടി.ഡി (Td) പ്രതിരോധ കുത്തിവെപ്പ് രേഖപ്പെടുത്തൽ:",
      descEn:
        "Ensure your first Td vaccine dose is administered and stamped in your NHM Kerala MCP card during your second-trimester visit.",
      descMl:
        "പ്രാഥമിക ആരോഗ്യ കേന്ദ്രത്തിൽ നിന്നോ ആശുപത്രിയിൽ നിന്നോ ടി.ഡി പ്രതിരോധ കുത്തിവെപ്പ് എടുത്ത് തായ് കാർഡിൽ രേഖപ്പെടുത്തുക.",
    },
    nutritionHighlight: {
      titleEn: "Ragi Kurukku (Finger Millet Porridge with Palm Jaggery)",
      titleMl: "കരിപ്പെട്ടി ചേർത്ത റാഗി കുറുക്ക്",
      descEn:
        "Slow-cooked finger millet with milk and palm jaggery delivers bioavailable calcium and iron for Week 13–16 bone ossification.",
      descMl:
        "പാലും കരിപ്പെട്ടിയും ചേർത്ത് തയ്യാറാക്കിയ റാഗി കുറുക്ക് കുഞ്ഞിന്റെ എല്ലുകളുടെ വളർച്ചയ്ക്ക് ആവശ്യമായ കാൽസ്യവും ഇരുമ്പും നൽകുന്നു.",
      intakeEn: "1 warm bowl daily at breakfast or 4 PM snack",
      intakeMl: "ദിവസവും രാവിലെയോ വൈകുന്നേരമോ 1 കപ്പ് റാഗി കുറുക്ക്",
      image: NUTRITION_IMAGES.ragi,
    },
  },

  // Stage 5: Weeks 17–20 (Halfway Mark, Vernix, Brown Fat & TIFFA Anomaly Scan)
  5: {
    babySubtitleEn: "Vernix coating, nerve myelination & distinct kicks",
    babySubtitleMl: "വെർണിക്സ് ആവരണം, നാഡീ വളർച്ച, വ്യക്തമായ ചലനങ്ങൾ",
    babyPoints: [
      {
        icon: "shield_with_heart",
        color: "#00A86B",
        titleEn: "Vernix Caseosa & Brown Adipose Tissue:",
        titleMl: "വെർണിക്സ് ആവരണവും തവിട്ട് കൊഴുപ്പും:",
        descEn:
          "Creamy vernix protects baby's delicate skin from amniotic fluid while brown fat layers prepare for newborn warmth.",
        descMl:
          "ചർമ്മത്തെ സംരക്ഷിക്കുന്ന വെർണിക്സ് ആവരണവും ശരീരതാപം നിലനിർത്തുന്ന കൊഴുപ്പുപാളിയും ഈ ഘട്ടത്തിൽ രൂപപ്പെടുന്നു.",
      },
      {
        icon: "hearing",
        color: "#007AFF",
        titleEn: "Myelinated Motor Nerves & Auditory Pathways:",
        titleMl: "കേൾവിശക്തിയും പേശികളുടെ ഏകോപനവും:",
        descEn:
          "Myelin insulates motor nerves so kicks and punches feel purposeful, while middle-ear ossicles transmit external sounds.",
        descMl:
          "നാഡികളിൽ മയലിൻ ആവരണം വരുന്നതോടെ കുഞ്ഞിന്റെ ചവിട്ടുകളും ചലനങ്ങളും അമ്മയ്ക്ക് വ്യക്തമായി അനുഭവപ്പെടുന്നു.",
      },
    ],
    maternalSubtitleEn: "Left-side sleeping, calf cramp prevention & navel growth",
    maternalSubtitleMl: "ഇടതുവശം ചരിഞ്ഞുള്ള ഉറക്കവും കാലിലെ പേശിവലിവ് പരിഹാരവും",
    maternalPoints: [
      {
        titleEn: "Left-Lateral Sleep Position:",
        titleMl: "ഇടതുവശം ചരിഞ്ഞുള്ള ഉറക്കം:",
        descEn:
          "Sleeping on your left side keeps uterine weight off the inferior vena cava, optimizing placental blood flow and reducing ankle edema.",
        descMl:
          "ഇടതുവശം ചരിഞ്ഞുറങ്ങുന്നത് മറുപിള്ളയിലേക്കുള്ള രക്തപ്രവാഹം കൂട്ടാനും കാലിലെ നീർക്കെട്ട് ഒഴിവാക്കാനും സഹായിക്കും.",
      },
      {
        titleEn: "Relieving Nighttime Leg Cramps:",
        titleMl: "രാത്രിയിലെ കാലിലെ പേശിവലിവ് കുറയ്ക്കാൻ:",
        descEn:
          "If a calf cramp strikes at night, flex your foot upward toward your shin (dorsiflexion) rather than pointing your toes.",
        descMl:
          "രാത്രിയിൽ കാലിന് പേശിവലിവ് ഉണ്ടായാൽ കാൽപ്പാദം മുകളിലേക്ക് (മുട്ടിന് നേരെ) മടക്കി പിടിക്കുന്നത് ഉടൻ ആശ്വാസം നൽകും.",
      },
    ],
    activitiesSubtitleEn: "Bhadrasana (Butterfly Pose) & pelvic support",
    activitiesSubtitleMl: "ബദ്ധകോണാസനവും ഇടുപ്പ് പേശികളുടെ വ്യായാമവും",
    activitiesPoints: [
      {
        titleEn: "Bhadrasana (Supported Butterfly Pose - 5 Mins)",
        titleMl: "ബദ്ധകോണാസനം (Butterfly Pose - 5 മിനിറ്റ്)",
        descEn:
          "Sit with your back supported against a wall or cushion, bring soles of feet together, and breathe deeply to relax pelvic hips.",
        descMl:
          "ഭിത്തിയിലോ തലയിണയിലോ ചാരിയിരുന്ന് ഉള്ളങ്കാലുകൾ ചേർത്തുവെച്ച് 5 മിനിറ്റ് സാവധാനം പരിശീലിക്കുന്നത് ഇടുപ്പിന് അയവ് നൽകും.",
      },
      {
        titleEn: "Gentle Evening Courtyard Stroll",
        titleMl: "വൈകുന്നേരത്തെ ലളിതമായ നടത്തം",
        descEn:
          "A calm 15–20 minute walk after sunset aids digestion and promotes restful sleep.",
        descMl:
          "വൈകുന്നേരങ്ങളിൽ 15-20 മിനിറ്റ് സാവധാനം നടക്കുന്നത് ദഹനം സുഗമമാക്കാനും രാത്രി നല്ല ഉറക്കം ലഭിക്കാനും സഹായിക്കും.",
      },
    ],
    scansSubtitleEn: "Level-II TIFFA Anomaly Scan (Weeks 18–20)",
    scansSubtitleMl: "ലെവൽ-2 അനോമലി സ്കാൻ (18–20 ആഴ്ചകൾ)",
    secondaryScanPoint: {
      icon: "clinical_notes",
      titleEn: "Placental Localization & Cervical Length Check:",
      titleMl: "മറുപിള്ളയുടെ സ്ഥാനവും ഗർഭാശയഗള നീളവും:",
      descEn:
        "During the Anomaly Scan, confirm that the placenta is well clear of the internal os and cervical length is normal (>3.0 cm).",
      descMl:
        "അനോമലി സ്കാനിംഗിൽ മറുപിള്ളയുടെ സ്ഥാനവും ഗർഭാശയഗളത്തിന്റെ (Cervix) നീളവും സുരക്ഷിതമാണെന്ന് ഡോക്ടർ ഉറപ്പാക്കുന്നു.",
    },
    nutritionHighlight: {
      titleEn: "Puzhungiya Nendran (Steamed Ripe Kerala Banana)",
      titleMl: "പുഴുങ്ങിയ നേന്ത്രപ്പഴം",
      descEn:
        "Rich in natural potassium, magnesium, and soluble fiber to prevent mid-pregnancy leg cramps and support healthy fetal weight gain.",
      descMl:
        "പൊട്ടാസ്യവും നാരുകളും നിറഞ്ഞ പുഴുങ്ങിയ നേന്ത്രപ്പഴം കാലിലെ പേശിവലിവ് തടയാനും കുഞ്ഞിന്റെ തൂക്കം കൂടാനും സഹായിക്കുന്നു.",
      intakeEn: "1 steamed Nendran banana daily as morning/evening snack",
      intakeMl: "ദിവസവും രാവിലെയോ വൈകുന്നേരമോ 1 പുഴുങ്ങിയ നേന്ത്രപ്പഴം",
      image: NUTRITION_IMAGES.nendran,
    },
  },

  // Stage 6: Weeks 21–24 (Sensory Awakening, Taste Buds, Surfactant & OGTT Window)
  6: {
    babySubtitleEn: "Hearing, sleep cycles, taste buds & tiny fingerprints",
    babySubtitleMl: "കേൾവിശക്തി, ഉറക്ക ക്രമം, രുചിമുകുളങ്ങൾ, വിരലടയാളങ്ങൾ",
    babyPoints: [
      {
        icon: "bedtime",
        color: "#5856D6",
        titleEn: "Distinct Sleep & Wake Cycles:",
        titleMl: "ഉറക്കവും ഉണർവും:",
        descEn:
          "Your baby now experiences distinct sleep and wake phases. You may feel vigorous flutters when resting quietly after dinner.",
        descMl:
          "കുഞ്ഞിന് കൃത്യമായ ഉറക്ക-ഉണർവ് ക്രമങ്ങൾ രൂപപ്പെടുന്നു. രാത്രി ഭക്ഷണത്തിന് ശേഷം വിശ്രമിക്കുമ്പോൾ ചലനങ്ങൾ കൂടുതൽ വ്യക്തമാകും.",
      },
      {
        icon: "fingerprint",
        color: "#FF2D55",
        titleEn: "Defined Epidermal Fingerprint Ridges:",
        titleMl: "തനതായ വിരലടയാളങ്ങൾ:",
        descEn:
          "Unique epidermal ridges on the palms, fingertips, and soles are permanently sculpted during this stage.",
        descMl:
          "കൈവെള്ളയിലെയും വിരലഗ്രങ്ങളിലെയും കാൽപ്പാദങ്ങളിലെയും തനതായ വിരലടയാളങ്ങൾ ഈ ഘട്ടത്തിൽ പൂർണ്ണമായി രൂപപ്പെടുന്നു.",
      },
    ],
    maternalSubtitleEn: "Linea nigra, postural back care & afternoon ankle elevation",
    maternalSubtitleMl: "വയറ്റിലെ വര, നടുവേദന പരിചരണം, പാദങ്ങളിലെ വിശ്രമം",
    maternalPoints: [
      {
        titleEn: "Postural Strain Prevention:",
        titleMl: "ശരീരനിലയും നടുവേദന പ്രതിരോധവും:",
        descEn:
          "Your center of gravity shifts forward. Avoid lifting heavy water buckets or standing motionless during long kitchen preparations.",
        descMl:
          "ഭാരമുള്ള വെള്ളം നിറച്ച ബക്കറ്റുകൾ എടുക്കുന്നതും അടുക്കളയിൽ ദീർഘനേരം ഒരേ നിൽപ്പ് നിൽക്കുന്നതും ഒഴിവാക്കുക.",
      },
      {
        titleEn: "Afternoon Edema Relief:",
        titleMl: "കാലിലെ നീർക്കെട്ടിന് ആശ്വാസം:",
        descEn:
          "Elevate your feet on a soft cushion for 20 minutes each afternoon to encourage lymphatic and venous return.",
        descMl:
          "ഉച്ചയ്ക്ക് വിശ്രമിക്കുമ്പോൾ കാലുകൾ ചെറിയ തലയിണയ്ക്ക് മുകളിൽ 20 മിനിറ്റ് ഉയർത്തി വെക്കുന്നത് നീർക്കെട്ട് കുറയ്ക്കാൻ സഹായിക്കും.",
      },
    ],
    activitiesSubtitleEn: "Bhadrasana & shaded morning walks",
    activitiesSubtitleMl: "ബദ്ധകോണാസനവും തണലുള്ള പ്രഭാത നടത്തവും",
    activitiesPoints: [
      {
        titleEn: "Bhadrasana (Butterfly Pose - 5 to 8 Mins)",
        titleMl: "ബദ്ധകോണാസനം (Butterfly Pose - 5-8 മിനിറ്റ്)",
        descEn:
          "Gently opens pelvic hips and relieves tension in the inner thigh muscles. Sit erect with supported cushions behind your back.",
        descMl:
          "ഇടുപ്പ് പേശികളുടെ അയവിന് ഉത്തമം. നട്ടെല്ലിന് പിന്നിൽ തലയിണ വെച്ച് 5-8 മിനിറ്റ് സാവധാനം പരിശീലിക്കാം.",
      },
      {
        titleEn: "Morning Shaded Strolls (20 Mins)",
        titleMl: "പ്രഭാത നടത്തവും ഇളനീരും (20 മിനിറ്റ്)",
        descEn:
          "Walk along shaded coconut groves or residential verandas between 7:00 AM and 8:00 AM before humidity peaks. Hydrate with tender coconut water.",
        descMl:
          "രാവിലെ 7 മുതൽ 8 വരെ തണലുള്ള മുറ്റത്തോ വരാന്തയിലോ 20 മിനിറ്റ് നടക്കാം. ശരീരത്തിൽ ജലാംശം നിലനിർത്താൻ ഇളനീർ കുടിക്കുക.",
      },
    ],
    scansSubtitleEn: "Anomaly review & 75g OGTT Glucose Screen",
    scansSubtitleMl: "അനോമലി സ്കാൻ അവലോകനവും ഷുഗർ പരിശോധനയും (OGTT)",
    secondaryScanPoint: {
      icon: "lab_profile",
      titleEn: "MCP Card Vitals & Hemoglobin Verification:",
      titleMl: "തായ് കാർഡ് (MCP Card) പരിശോധന:",
      descEn:
        "Ensure your obstetrician has logged your mid-trimester blood pressure, fundal height, and hemoglobin level (>11 g/dL) in your MCP card.",
      descMl:
        "നിങ്ങളുടെ തായ് കാർഡിൽ (MCP Card) രക്തസമ്മർദ്ദം, ഭാരം, ഹീമോഗ്ലോബിൻ അളവ് എന്നിവ കൃത്യമായി രേഖപ്പെടുത്തിയിട്ടുണ്ടെന്ന് ഉറപ്പാക്കുക.",
    },
    nutritionHighlight: {
      titleEn: "Ragi Kurukku & Muringayila (Drumstick Leaves) Thoran",
      titleMl: "റാഗി കുറുക്കും മുരിങ്ങയില തോരനും",
      descEn:
        "Rich in natural calcium, folate, and iron to prevent maternal anemia and support rapid fetal bone and auditory mineralization.",
      descMl:
        "ഗർഭകാല വിളർച്ച തടയാനും കുഞ്ഞിന്റെ എല്ലുകളുടെയും ആന്തരിക കർണ്ണങ്ങളുടെയും വളർച്ചയ്ക്കും കാൽസ്യവും ഇരുമ്പും നൽകുന്നു.",
      intakeEn: "1 small bowl daily with lunch or breakfast",
      intakeMl: "ദിവസവും 1 ചെറിയ കപ്പ് ഭക്ഷണത്തിനൊപ്പം",
      image: NUTRITION_IMAGES.ragi,
    },
  },

  // Stage 7: Weeks 25–28 (Eyelids Open, Cerebral Folding, 1kg Milestone & Kick Counts)
  7: {
    babySubtitleEn: "Open eyelids, cerebral cortex folding & 1 kg milestone",
    babySubtitleMl: "കൺപോളകൾ തുറക്കൽ, മസ്തിഷ്ക വളർച്ച, 1 കിലോ ഭാരം",
    babyPoints: [
      {
        icon: "visibility",
        color: "#007AFF",
        titleEn: "Open Eyelids & Light Response:",
        titleMl: "കണ്ണുകൾ തുറക്കലും വെളിച്ചത്തോടുള്ള പ്രതികരണവും:",
        descEn:
          "Baby blinks and perceives warm diffused light filtering through your abdomen while optic nerve pathways myelinate.",
        descMl:
          "കുഞ്ഞ് കൺപോളകൾ തുറന്ന് ചിമ്മുകയും പുറത്തുനിന്നുള്ള വെളിച്ചത്തോട് പ്രതികരിക്കുകയും ചെയ്യുന്നു.",
      },
      {
        icon: "neurology",
        color: "#5856D6",
        titleEn: "Omega-3 DHA Brain Cortex Folding:",
        titleMl: "ഒമേഗ-3 DHA-യും മസ്തിഷ്ക വികാസവും:",
        descEn:
          "The cerebral cortex develops deep convolutions (gyri and sulci) as DHA fatty acids build visual and cognitive synapses.",
        descMl:
          "കുഞ്ഞിന്റെ ബുദ്ധിവികാസത്തിനും കാഴ്ചശക്തിക്കും സഹായിക്കുന്ന മസ്തിഷ്ക മടക്കുകൾ ഒമേഗ-3 പോഷകങ്ങളുടെ സഹായത്താൽ വേഗത്തിൽ വളരുന്നു.",
      },
    ],
    maternalSubtitleEn: "Braxton Hicks conditioning, kick counts & rib comfort",
    maternalSubtitleMl: "കുഞ്ഞിന്റെ അനക്കം എണ്ണൽ, ശ്വസന ആശ്വാസം",
    maternalPoints: [
      {
        titleEn: "Cardiff Count-to-10 Kick Tracking:",
        titleMl: "ദിവസവും 10 അനക്കങ്ങൾ ഉറപ്പാക്കൽ:",
        descEn:
          "Monitor fetal movements daily; you should feel at least 10 distinct kicks, flutters, or rolls within a 12-hour daytime period.",
        descMl:
          "പകൽ 12 മണിക്കൂറിനുള്ളിൽ കുറഞ്ഞത് 10 തവണയെങ്കിലും കുഞ്ഞിന്റെ അനക്കം അനുഭവപ്പെടുന്നുണ്ടെന്ന് ദിവസവും ഉറപ്പാക്കുക.",
      },
      {
        titleEn: "Soothing Gastroesophageal Reflux:",
        titleMl: "നെഞ്ചെരിച്ചിലും അസിഡിറ്റിയും കുറയ്ക്കാൻ:",
        descEn:
          "As the uterus pushes upward on the stomach, avoid spicy/fried evening foods and drink cool ginger-coriander buttermilk.",
        descMl:
          "ഗർഭപാത്രം മുകളിലേക്ക് വളരുന്നതിനാൽ രാത്രിയിൽ എരിവും പുളിയും കുറഞ്ഞ ലഘുഭക്ഷണം കഴിക്കുന്നത് നെഞ്ചെരിച്ചിൽ തടയും.",
      },
    ],
    activitiesSubtitleEn: "Side-lying relaxation & pelvic tilts",
    activitiesSubtitleMl: "ഇടതുവശം ചരിഞ്ഞുള്ള വിശ്രമവും നടുവിനുള്ള വ്യായാമവും",
    activitiesPoints: [
      {
        titleEn: "Supported Pelvic Tilts for Lower Back Relief",
        titleMl: "നടുവേദന കുറയ്ക്കാനുള്ള പെൽവിക് വ്യായാമം",
        descEn:
          "Stand with your back against a wall, knees slightly soft, and gently tilt your pelvis to flatten your lower back for 5 seconds.",
        descMl:
          "ഭിത്തിയിൽ ചാരി നിന്ന് കാൽമുട്ടുകൾ ചെറുതായി അയച്ച് നടുഭാഗം ഭിത്തിയിലേക്ക് ചേർത്ത് 5 സെക്കൻഡ് പിടിക്കുന്നത് നടുവേദന കുറയ്ക്കും.",
      },
      {
        titleEn: "Post-Meal 15-Minute Walk (Blood Sugar Balance)",
        titleMl: "ഭക്ഷണശേഷം 15 മിനിറ്റ് സാവധാനത്തിലുള്ള നടത്തം",
        descEn:
          "A gentle 15-minute walk after lunch and dinner helps muscles utilize glucose naturally and keeps post-meal blood sugar steady.",
        descMl:
          "ഉച്ചഭക്ഷണത്തിനും അത്താഴത്തിനും ശേഷം 15 മിനിറ്റ് സാവധാനം നടക്കുന്നത് രക്തത്തിലെ പഞ്ചസാരയുടെ അളവ് നിയന്ത്രിക്കാൻ സഹായിക്കും.",
      },
    ],
    scansSubtitleEn: "Complete 75g OGTT & Rh-Negative Anti-D Prophylaxis",
    scansSubtitleMl: "ഷുഗർ പരിശോധനയും (OGTT) ആന്റി-ഡി കുത്തിവെപ്പും",
    secondaryScanPoint: {
      icon: "bloodtype",
      titleEn: "Rh-Negative Anti-D Check & Third Trimester Hb:",
      titleMl: "ആന്റി-ഡി (Anti-D) പരിശോധനയും ഹീമോഗ്ലോബിനും:",
      descEn:
        "If your blood group is Rh-negative, confirm your Week 28 Anti-D injection with your obstetrician and record your Hb level.",
      descMl:
        "രക്തഗ്രൂപ്പ് നെഗറ്റീവ് ആയ അമ്മമാർ 28-ാം ആഴ്ചയിൽ Anti-D കുത്തിവെപ്പ് എടുക്കുകയും ഹീമോഗ്ലോബിൻ പരിശോധിക്കുകയും ചെയ്യുക.",
    },
    nutritionHighlight: {
      titleEn: "Chala / Mathi (Kerala Sardine Curry in Clay Chatti)",
      titleMl: "മൺചട്ടിയിൽ വേവിച്ച മത്തിക്കറി (ചാള)",
      descEn:
        "Low-mercury small coastal sardines are rich in Omega-3 DHA and Vitamin D to fuel rapid third-trimester fetal brain and retinal growth.",
      descMl:
        "ഒമേഗ-3 DHA ധാരാളമടങ്ങിയ മത്തിക്കറി കുഞ്ഞിന്റെ മസ്തിഷ്കത്തിന്റെയും കണ്ണിന്റെയും വളർച്ചയ്ക്ക് അത്യുത്തമമാണ്.",
      intakeEn: "Well-cooked sardine curry 2–3 times/week (or walnuts/flaxseeds)",
      intakeMl: "ആഴ്ചയിൽ 2–3 തവണ നന്നായി വേവിച്ച മത്തിക്കറി (അല്ലെങ്കിൽ നട്സ്)",
      image: NUTRITION_IMAGES.mathi,
    },
  },

  // Stage 8: Weeks 29–32 (Rapid Brain/Bone Growth & Third Trimester Doppler Scan)
  8: {
    babySubtitleEn: "Bone marrow RBCs, pupillary reflex & practice breathing",
    babySubtitleMl: "രക്താണുക്കളുടെ നിർമ്മാണം, കൃഷ്ണമണി ചലനം, ശ്വസന പരിശീലനം",
    babyPoints: [
      {
        icon: "air",
        color: "#007AFF",
        titleEn: "Rhythmic Practice Breathing Movements:",
        titleMl: "ശ്വാസകോശത്തിന്റെ ശ്വസന പരിശീലനം:",
        descEn:
          "Baby practices rhythmic diaphragm breathing up to 30–40% of the time, stimulating lung surfactant maturation.",
        descMl:
          "ജനനശേഷം സ്വയം ശ്വസിക്കുന്നതിനായി കുഞ്ഞ് ഗർഭപാത്രത്തിനുള്ളിൽ ശ്വസന പേശികളുടെ പരിശീലനം സജീവമാക്കുന്നു.",
      },
      {
        icon: "shield",
        color: "#00A86B",
        titleEn: "Hepatic Iron & Skeletal Calcium Storage:",
        titleMl: "ഇരുമ്പിന്റെയും കാൽസ്യത്തിന്റെയും സംഭരണം:",
        descEn:
          "Baby stores iron in the liver and 250 mg of calcium daily in the skeleton, while toenails and fingernails reach completion.",
        descMl:
          "കുഞ്ഞിന്റെ എല്ലുകളിലേക്ക് ദിവസവും 250 മി.ഗ്രാം കാൽസ്യവും കരളിലേക്ക് ഇരുമ്പും അമ്മയുടെ ശരീരത്തിൽ നിന്ന് സംഭരിക്കപ്പെടുന്നു.",
      },
    ],
    maternalSubtitleEn: "Colostrum preparation, fortnightly visits & rib relief",
    maternalSubtitleMl: "കൊളസ്ട്രം തയ്യാറെടുപ്പും രണ്ടാഴ്ചയിലൊരിക്കലുള്ള പരിശോധനയും",
    maternalPoints: [
      {
        titleEn: "Fortnightly Blood Pressure & Edema Monitoring:",
        titleMl: "രണ്ടാഴ്ചയിലൊരിക്കൽ ബി.പിയും നീരും പരിശോധിക്കുക:",
        descEn:
          "Monitor blood pressure (<130/85 mmHg) every two weeks. Mild ankle puffiness that resolves overnight is normal; sudden face/hand swelling requires medical check.",
        descMl:
          "രണ്ടാഴ്ചയിലൊരിക്കൽ ബി.പി പരിശോധിക്കുക. മുഖത്തോ കൈകളിലോ പെട്ടെന്ന് നീര് കണ്ടാൽ ഉടൻ ഡോക്ടറെ അറിയിക്കണം.",
      },
      {
        titleEn: "Fiber & Hydration for Smooth Digestion:",
        titleMl: "മലബന്ധം തടയാൻ നാരുകളടങ്ങിയ ആഹാരം:",
        descEn:
          "Include Banana Blossom (Vazhakoombu) thoran, steamed Nendran, and 2.5L daily fluid to prevent third-trimester constipation.",
        descMl:
          "മൂന്നാം ത്രൈമാസത്തിലെ മലബന്ധം ഒഴിവാക്കാൻ വാഴക്കൂമ്പ് തോരൻ, പഴവർഗ്ഗങ്ങൾ, 2.5 ലിറ്റർ വെള്ളം എന്നിവ ഉറപ്പാക്കുക.",
      },
    ],
    activitiesSubtitleEn: "Pranayama breathing & elevated leg rest",
    activitiesSubtitleMl: "പ്രാണായാമ ശ്വസനവും കാലുകൾ ഉയർത്തിവെച്ചുള്ള വിശ്രമവും",
    activitiesPoints: [
      {
        titleEn: "Deep Costal & Diaphragmatic Breathing (5 Mins)",
        titleMl: "ദീർഘശ്വസന വ്യായാമം (5 മിനിറ്റ്)",
        descEn:
          "Sit upright with cushions behind your lower back and take slow, deep breaths to expand rib cage capacity and calm fetal heart rate.",
        descMl:
          "നട്ടെല്ലിന് താങ്ങായി തലയിണ വെച്ച് നിവർന്നിരുന്ന് 5 മിനിറ്റ് ദീർഘമായി ശ്വാസമെടുക്കുന്നത് ശ്വാസതടസ്സം കുറയ്ക്കാൻ സഹായിക്കും.",
      },
      {
        titleEn: "20-Minute Shaded Walk + Foot Elevation",
        titleMl: "20 മിനിറ്റ് നടത്തവും പാദങ്ങൾക്ക് വിശ്രമവും",
        descEn:
          "Follow your morning or evening walk with 15 minutes of resting on your left side with ankles elevated on a soft pillow.",
        descMl:
          "നടത്തത്തിന് ശേഷം 15 മിനിറ്റ് ഇടതുവശം ചരിഞ്ഞ് കാലുകൾ ചെറിയ തലയിണയിൽ ഉയർത്തിവെച്ച് വിശ്രമിക്കുക.",
      },
    ],
    scansSubtitleEn: "Third Trimester Growth & Fetal Doppler Scan (Week 32)",
    scansSubtitleMl: "മൂന്നാം ത്രൈമാസ ഗ്രോത്ത് & ഡോപ്ലർ സ്കാൻ (ആഴ്ച 32)",
    secondaryScanPoint: {
      icon: "monitor_heart",
      titleEn: "Umbilical Artery Doppler & Amniotic Fluid Index (AFI):",
      titleMl: "ഡോപ്ലർ രക്തയോട്ടവും അമ്നിയോട്ടിക് ദ്രാവക അളവും (AFI):",
      descEn:
        "Verifies healthy blood flow velocity through the umbilical cord and ensures AFI remains in the optimal 8–18 cm range.",
      descMl:
        "പൊക്കിൾക്കൊടിയിലൂടെ കുഞ്ഞിലേക്കുള്ള രക്തപ്രവാഹവും അമ്നിയോട്ടിക് ദ്രാവകത്തിന്റെ അളവും (AFI) സുരക്ഷിതമാണെന്ന് ഉറപ്പാക്കുന്നു.",
    },
    nutritionHighlight: {
      titleEn: "Nellikka (Gooseberry) & Iron-Rich Muringayila Thoran",
      titleMl: "നെല്ലിക്കയും ഇരുമ്പ് സമൃദ്ധമായ മുരിങ്ങയില തോരനും",
      descEn:
        "Vitamin C in fresh Nellikka multiplies iron absorption from Muringayila and your daily IFA tablet ahead of delivery.",
      descMl:
        "നെല്ലിക്കയിലെ വൈറ്റമിൻ സി മുരിങ്ങയിലയിലെയും അയൺ ഗുളികയിലെയും ഇരുമ്പിന്റെ ആഗിരണം ഇരട്ടിയാക്കാൻ സഹായിക്കുന്നു.",
      intakeEn: "1 fresh Nellikka + daily green leafy thoran with lunch",
      intakeMl: "ദിവസവും 1 നെല്ലിക്ക + ഉച്ചഭക്ഷണത്തിനൊപ്പം ഇലക്കറി തോരൻ",
      image: NUTRITION_IMAGES.nellikka,
    },
  },

  // Stage 9: Weeks 33–36 (Maternal Antibodies, Lung Maturity & Head-Down Engagement)
  9: {
    babySubtitleEn: "IgG antibody transfer, mature lungs & cephalic engagement",
    babySubtitleMl: "പ്രതിരോധ ആന്റിബോഡികൾ, ശ്വാസകോശ പക്വത, തല താഴെയുള്ള നില",
    babyPoints: [
      {
        icon: "health_and_safety",
        color: "#00A86B",
        titleEn: "Passive Maternal Immunity (IgG Transfer):",
        titleMl: "അമ്മയിൽ നിന്നുള്ള പ്രതിരോധശേഷി (IgG):",
        descEn:
          "Your placenta actively pumps protective antibodies into baby's bloodstream to guard against infections during the first months of life.",
        descMl:
          "ജനനശേഷമുള്ള ആദ്യ മാസങ്ങളിൽ കുഞ്ഞിനെ അണുബാധകളിൽ നിന്ന് സംരക്ഷിക്കുന്ന ആന്റിബോഡികൾ മറുപിള്ള വഴി കുഞ്ഞിന് ലഭിക്കുന്നു.",
      },
      {
        icon: "child_care",
        color: "#007AFF",
        titleEn: "Cephalic (Head-Down) Pelvic Engagement:",
        titleMl: "പ്രസവത്തിനായി തല താഴെയുള്ള നില (Cephalic):",
        descEn:
          "Over 95% of babies settle head-down into the maternal pelvis by Week 36, with soft cranial fontanelles ready for delivery.",
        descMl:
          "36-ാം ആഴ്ചയോടെ കുഞ്ഞ് സുഖപ്രസവത്തിനായി തല താഴെയുള്ള നിലയിലേക്ക് (Cephalic position) ഇറങ്ങി നിൽക്കുന്നു.",
      },
    ],
    maternalSubtitleEn: "Lightening, pelvic pressure & packing the hospital bag",
    maternalSubtitleMl: "ശ്വസന ആശ്വാസം, ഇടുപ്പിലെ സമ്മർദ്ദം, ആശുപത്രി ബാഗ്",
    maternalPoints: [
      {
        titleEn: "Hospital Bag & MCP Card Folder Readiness:",
        titleMl: "തായ് കാർഡ് ഫോൾഡറും ആശുപത്രി ബാഗും:",
        descEn:
          "Keep your NHM MCP card, all ultrasound reports (Dating, NT, Anomaly, Growth), lab slips, and clean cotton clothes packed by Week 36.",
        descMl:
          "തായ് കാർഡ്, എല്ലാ സ്കാൻ റിപ്പോർട്ടുകളും, രക്തപരിശോധനാ ഫലങ്ങളും, കുഞ്ഞിനും അമ്മയ്ക്കുമുള്ള കോട്ടൺ വസ്ത്രങ്ങളും ബാഗിൽ തയ്യാറാക്കി വെക്കുക.",
      },
      {
        titleEn: "Pelvic Pressure & Frequent Urination:",
        titleMl: "ഇടുപ്പിലെ സമ്മർദ്ദവും മൂത്രശങ്കയും:",
        descEn:
          "As baby engages lower in the pelvis, breathing feels easier ('lightening'), though bladder capacity decreases. Never hold urine.",
        descMl:
          "കുഞ്ഞ് താഴേക്ക് ഇറങ്ങുമ്പോൾ ശ്വസിക്കാൻ എളുപ്പമാകുമെങ്കിലും മൂത്രസഞ്ചിയിൽ സമ്മർദ്ദം കൂടും. മൂത്രം പിടിച്ചുവെക്കാതിരിക്കാൻ ശ്രദ്ധിക്കുക.",
      },
    ],
    activitiesSubtitleEn: "Kegel pelvic floor exercises & butterfly pose",
    activitiesSubtitleMl: "കെഗൽ (Kegel) പെൽവിക് വ്യായാമവും ബദ്ധകോണാസനവും",
    activitiesPoints: [
      {
        titleEn: "Pelvic Floor Kegel Holds & Release",
        titleMl: "പെൽവിക് പേശികൾക്കുള്ള കെഗൽ വ്യായാമം",
        descEn:
          "Gently contract your pelvic floor muscles for 5 seconds and relax completely for 10 seconds (10 reps, twice daily) to aid delivery and recovery.",
        descMl:
          "ഇടുപ്പിലെ പേശികൾ 5 സെക്കൻഡ് സങ്കോചിപ്പിച്ച് 10 സെക്കൻഡ് പൂർണ്ണമായി അയച്ചിടുന്ന വ്യായാമം പ്രസവം സുഗമമാക്കാൻ സഹായിക്കും.",
      },
      {
        titleEn: "Supported Squatting / Bhadrasana (With Wall Support)",
        titleMl: "ഭിത്തിയിൽ ചാരിയിരുന്നുകൊണ്ടുള്ള ബദ്ധകോണാസനം",
        descEn:
          "Sit on a low cushion with your back against the wall and knees gently apart for 5 minutes to encourage pelvic outlet flexibility.",
        descMl:
          "ഭിത്തിയിൽ ചാരിയിരുന്ന് കാൽമുട്ടുകൾ ഇരുവശത്തേക്കും അകറ്റി വെച്ച് 5 മിനിറ്റ് ശ്വസിക്കുന്നത് ഇടുപ്പെല്ലിന്റെ വികാസത്തിന് ഉത്തമമാണ്.",
      },
    ],
    scansSubtitleEn: "Fetal Presentation Check & Pre-Delivery Lab Panel",
    scansSubtitleMl: "കുഞ്ഞിന്റെ പൊസിഷൻ പരിശോധനയും പ്രസവപൂർവ്വ ലാബ് ടെസ്റ്റുകളും",
    secondaryScanPoint: {
      icon: "emergency_home",
      titleEn: "Verify 24/7 CEmONC Labour Ward & 108 Transport Plan:",
      titleMl: "24/7 ലേബർ റൂമും അടിയന്തര യാത്രാ സൗകര്യവും:",
      descEn:
        "Save your hospital labour room phone number, ASHA worker contact, and 108 ambulance number on your family's speed dial.",
      descMl:
        "ആശുപത്രിയിലെ ലേബർ റൂം നമ്പർ, ആശാ വർക്കറുടെ നമ്പർ, 108 ആംബുലൻസ് എന്നിവ കുടുംബാംഗങ്ങളുടെ ഫോണിൽ സേവ് ചെയ്തു വെക്കുക.",
    },
    nutritionHighlight: {
      titleEn: "Ulunthu Kanji (Traditional Black Gram & Matta Rice Porridge)",
      titleMl: "പരമ്പരാഗത ഉഴുന്ന് കഞ്ഞി",
      descEn:
        "Traditional Kerala black gram porridge cooked with coconut and palm jaggery strengthens pelvic and uterine muscles for upcoming labour.",
      descMl:
        "ഉഴുന്നും തേങ്ങയും കരിപ്പെട്ടിയും ചേർത്ത് തയ്യാറാക്കുന്ന ഉഴുന്ന് കഞ്ഞി ഇടുപ്പ് പേശികൾക്കും ഗർഭപാത്രത്തിനും പ്രസവത്തിനായുള്ള കരുത്ത് നൽകുന്നു.",
      intakeEn: "1 warm bowl 3–4 times a week in late Third Trimester",
      intakeMl: "മൂന്നാം ത്രൈമാസത്തിൽ ആഴ്ചയിൽ 3–4 ദിവസം 1 കപ്പ് ഉഴുന്ന് കഞ്ഞി",
      image: NUTRITION_IMAGES.ragi,
    },
  },

  // Stage 10: Weeks 37–40 (Full Term, Labour Signs, NST & Golden Hour Breastfeeding)
  10: {
    babySubtitleEn: "Full-term lungs, firm grasp reflex & birth readiness",
    babySubtitleMl: "പൂർണ്ണ വളർച്ച, ഉറച്ച കൈപ്പിടി, ജനനത്തിനായുള്ള സജ്ജത",
    babyPoints: [
      {
        icon: "child_friendly",
        color: "#00A86B",
        titleEn: "Full-Term Lung & Sucking Coordination:",
        titleMl: "ശ്വസന-മുലയൂട്ടൽ ശേഷി പൂർണ്ണ സജ്ജം:",
        descEn:
          "Alveolar surfactant is complete and baby's suck-swallow-breathe reflex is primed for immediate breastfeeding after birth.",
        descMl:
          "കുഞ്ഞിന്റെ ശ്വാസകോശം സ്വയം ശ്വസിക്കാനും ജനിച്ചയുടൻ മുലപ്പാൽ കുടിക്കാനും പൂർണ്ണമായി സജ്ജമായിക്കഴിഞ്ഞു.",
      },
      {
        icon: "favorite",
        color: "#FF2D55",
        titleEn: "15% Subcutaneous Fat & Vernix Lubrication:",
        titleMl: "ശരീരതാപ സംരക്ഷണവും മൃദുവായ ചർമ്മവും:",
        descEn:
          "Creamy vernix coats the skin creases to ease passage through the birth canal while fat reserves keep newborn temperature stable.",
        descMl:
          "പ്രസവസമയത്ത് സുഗമമായി പുറത്തുവരാൻ ചർമ്മത്തിലെ വെർണിക്സ് സഹായിക്കുന്നു; കൊഴുപ്പുപാളി കുഞ്ഞിന് ചൂട് നൽകുന്നു.",
      },
    ],
    maternalSubtitleEn: "Distinguishing true labour, water breaking & Golden Hour prep",
    maternalSubtitleMl: "പ്രസവലക്ഷണങ്ങൾ തിരിച്ചറിയലും മുലയൂട്ടൽ തയ്യാറെടുപ്പും",
    maternalPoints: [
      {
        titleEn: "True Labour vs. False (Braxton Hicks) Contractions:",
        titleMl: "യഥാർത്ഥ പ്രസവവേദന എങ്ങനെ തിരിച്ചറിയാം:",
        descEn:
          "True contractions come at regular 5–10 minute intervals, last 45–60 seconds, radiate from lower back to front, and intensify with walking.",
        descMl:
          "യഥാർത്ഥ പ്രസവവേദന നടുവിൽ നിന്ന് അടിവയറ്റിലേക്ക് പടരുകയും 5–10 മിനിറ്റ് ഇടവിട്ട് ക്രമമായി ശക്തി കൂടുകയും ചെയ്യും.",
      },
      {
        titleEn: "Water Breaking (Rupture of Membranes) & Kick Vigilance:",
        titleMl: "വെള്ളം പൊട്ടലും (Water breaking) കുഞ്ഞിന്റെ അനക്കവും:",
        descEn:
          "If you notice any gush or steady trickle of fluid, vaginal bleeding, or fewer than 10 kicks in 12 hours, go to the labour ward immediately.",
        descMl:
          "യോനിയിലൂടെ ദ്രാവക ചോർച്ചയോ രക്തം കലർന്ന സ്രവമോ കണ്ടാലോ കുഞ്ഞിന്റെ അനക്കം കുറഞ്ഞാലോ ഒട്ടും വൈകാതെ ആശുപത്രിയിൽ എത്തുക.",
      },
    ],
    activitiesSubtitleEn: "Labour breathing rhythm & energy-saving rest",
    activitiesSubtitleMl: "പ്രസവസമയത്തെ ശ്വസന പരിശീലനവും വിശ്രമവും",
    activitiesPoints: [
      {
        titleEn: "Slow Labour Breathing Rhythm (Inhale 4s, Exhale 6s)",
        titleMl: "പ്രസവവേദനയെ നേരിടാനുള്ള ശ്വസന താളം",
        descEn:
          "Practice inhaling calmly through your nose for 4 seconds and exhaling softly through parted lips for 6 seconds to relax pelvic muscles during contractions.",
        descMl:
          "മൂക്കിലൂടെ 4 സെക്കൻഡ് ശ്വാസം ഉള്ളിലേക്കെടുത്ത് വായിലൂടെ 6 സെക്കൻഡ് സാവധാനം പുറത്തുവിടുന്നത് പ്രസവസമയത്ത് പേശികൾക്ക് അയവ് നൽകും.",
      },
      {
        titleEn: "Gentle Indoor Walking & Left-Lateral Rest",
        titleMl: "വീട്ടിനുള്ളിലെ ലളിതമായ നടത്തവും വിശ്രമവും",
        descEn:
          "Alternate short, supported walks around the house with left-side rest to help gravity keep baby's head well-aligned in the pelvis.",
        descMl:
          "വീട്ടിനുള്ളിൽ സാവധാനം നടക്കുന്നതും ഇടതുവശം ചരിഞ്ഞ് വിശ്രമിക്കുന്നതും കുഞ്ഞിന്റെ തല ഇടുപ്പെല്ലിൽ ശരിയായി ഉറയ്ക്കാൻ സഹായിക്കും.",
      },
    ],
    scansSubtitleEn: "Weekly NST / FHR Monitoring & Labour Admission",
    scansSubtitleMl: "പ്രതിവാര ഹൃദയമിടിപ്പ് (NST) പരിശോധനയും ആശുപത്രി അഡ്മിഷനും",
    secondaryScanPoint: {
      icon: "breastfeeding",
      titleEn: "Golden Hour Colostrum Initiation & JSSK Entitlements:",
      titleMl: "ആദ്യ മണിക്കൂറിലെ (Golden Hour) മുലയൂട്ടൽ:",
      descEn:
        "Initiate exclusive breastfeeding (colostrum) within 1 hour of normal delivery or as soon as mother recovers after C-section.",
      descMl:
        "ജനിച്ചയുടൻ ഒരു മണിക്കൂറിനുള്ളിൽ തന്നെ കുഞ്ഞിന് പ്രതിരോധശേഷി നൽകുന്ന ആദ്യ മുലപ്പാൽ (Colostrum) നൽകാൻ ശ്രദ്ധിക്കുക.",
    },
    nutritionHighlight: {
      titleEn: "Warm Ulunthu Kanji & Steamed Nendran for Labour Stamina",
      titleMl: "പ്രസവക്കരുത്തിനായി ഉഴുന്ന് കഞ്ഞിയും നേന്ത്രപ്പഴവും",
      descEn:
        "Easily digestible carbohydrates, iron, and natural electrolytes sustain maternal uterine stamina as you approach delivery.",
      descMl:
        "എളുപ്പം ദഹിക്കുന്നതും ശരീരത്തിന് പെട്ടെന്ന് ഊർജ്ജം നൽകുന്നതുമായ ഉഴുന്ന് കഞ്ഞിയും പുഴുങ്ങിയ നേന്ത്രപ്പഴവും പ്രസവത്തോടടുക്കുമ്പോൾ ഉത്തമമാണ്.",
      intakeEn: "Small, warm, easily digestible meals + 2.5L hydration",
      intakeMl: "എളുപ്പം ദഹിക്കുന്ന ഇളം ചൂടുള്ള ആഹാരവും ധാരാളം വെള്ളവും",
      image: NUTRITION_IMAGES.nendran,
    },
  },
};

function getStageBlockForWeek(week: number): StageClinicalBlock {
  if (week <= 4) return STAGE_CLINICAL_BLOCKS[1];
  if (week <= 8) return STAGE_CLINICAL_BLOCKS[2];
  if (week <= 12) return STAGE_CLINICAL_BLOCKS[3];
  if (week <= 16) return STAGE_CLINICAL_BLOCKS[4];
  if (week <= 20) return STAGE_CLINICAL_BLOCKS[5];
  if (week <= 24) return STAGE_CLINICAL_BLOCKS[6];
  if (week <= 28) return STAGE_CLINICAL_BLOCKS[7];
  if (week <= 32) return STAGE_CLINICAL_BLOCKS[8];
  if (week <= 36) return STAGE_CLINICAL_BLOCKS[9];
  return STAGE_CLINICAL_BLOCKS[10];
}

export function getWeekGuideContent(week: number): WeekGuideContent {
  const clampedWeek = Math.max(1, Math.min(40, Math.round(week || 24)));
  const meta = WEEKLY_METADATA[clampedWeek] || WEEKLY_METADATA[24];
  const stage = getStageBlockForWeek(clampedWeek);

  const trimester: 1 | 2 | 3 =
    clampedWeek <= 12 ? 1 : clampedWeek >= 28 ? 3 : 2;

  return {
    week: clampedWeek,
    trimester,
    titleEn: meta.titleEn,
    titleMl: meta.titleMl,
    summaryEn: meta.summaryEn,
    summaryMl: meta.summaryMl,
    keralaCropEn: meta.cropEn,
    keralaCropMl: meta.cropMl,
    cropSubtextEn: meta.subtextEn,
    cropSubtextMl: meta.subtextMl,
    weightGrams: meta.weightGrams,
    lengthCm: meta.lengthCm,
    isMilestone: Boolean(meta.isMilestone),
    babyGrowth: {
      subtitleEn: `Week ${clampedWeek}: ${stage.babySubtitleEn}`,
      subtitleMl: `ആഴ്ച ${clampedWeek}: ${stage.babySubtitleMl}`,
      points: [
        {
          icon: "auto_awesome",
          color: "#007AFF",
          titleEn: meta.babyFocusTitleEn,
          titleMl: meta.babyFocusTitleMl,
          descEn: meta.babyFocusDescEn,
          descMl: meta.babyFocusDescMl,
        },
        stage.babyPoints[0],
        stage.babyPoints[1],
      ],
    },
    maternalChanges: {
      subtitleEn: `Week ${clampedWeek}: ${stage.maternalSubtitleEn}`,
      subtitleMl: `ആഴ്ച ${clampedWeek}: ${stage.maternalSubtitleMl}`,
      points: [
        {
          titleEn: meta.maternalFocusTitleEn,
          titleMl: meta.maternalFocusTitleMl,
          descEn: meta.maternalFocusDescEn,
          descMl: meta.maternalFocusDescMl,
        },
        stage.maternalPoints[0],
        stage.maternalPoints[1],
      ],
    },
    safeActivities: {
      subtitleEn: stage.activitiesSubtitleEn,
      subtitleMl: stage.activitiesSubtitleMl,
      points: [stage.activitiesPoints[0], stage.activitiesPoints[1]],
    },
    scansAndTests: {
      subtitleEn: stage.scansSubtitleEn,
      subtitleMl: stage.scansSubtitleMl,
      points: [
        {
          icon: "event",
          titleEn: meta.scanFocusTitleEn,
          titleMl: meta.scanFocusTitleMl,
          descEn: meta.scanFocusDescEn,
          descMl: meta.scanFocusDescMl,
        },
        stage.secondaryScanPoint,
      ],
    },
    highlights: {
      babyTitleEn: meta.babyFocusTitleEn.replace(/:$/, ""),
      babyTitleMl: meta.babyFocusTitleMl.replace(/:$/, ""),
      babyDescEn: meta.babyFocusDescEn,
      babyDescMl: meta.babyFocusDescMl,
      motherTitleEn: meta.maternalFocusTitleEn.replace(/:$/, ""),
      motherTitleMl: meta.maternalFocusTitleMl.replace(/:$/, ""),
      motherDescEn: meta.maternalFocusDescEn,
      motherDescMl: meta.maternalFocusDescMl,
      nutritionTitleEn: stage.nutritionHighlight.titleEn,
      nutritionTitleMl: stage.nutritionHighlight.titleMl,
      nutritionDescEn: stage.nutritionHighlight.descEn,
      nutritionDescMl: stage.nutritionHighlight.descMl,
      nutritionIntakeEn: stage.nutritionHighlight.intakeEn,
      nutritionIntakeMl: stage.nutritionHighlight.intakeMl,
      nutritionImage: stage.nutritionHighlight.image,
    },
  };
}
