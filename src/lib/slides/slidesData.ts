export interface SlideMeta {
  number: number;
  id: string;
  section: "Main Presentation" | "Appendix";
  kicker: string;
  title: string;
  shortTitle: string;
}

export const SLIDE_METADATA: SlideMeta[] = [
  {
    number: 1,
    id: "cover",
    section: "Main Presentation",
    kicker: "TDPCL • Assignment 4",
    title: "MATERNA — A Pregnancy Companion for Maternal Wellness",
    shortTitle: "Cover",
  },
  {
    number: 2,
    id: "problem",
    section: "Main Presentation",
    kicker: "01 • Problem Statement",
    title: "Pregnancy care information is fragmented and difficult to manage.",
    shortTitle: "Problem Statement",
  },
  {
    number: 3,
    id: "solution",
    section: "Main Presentation",
    kicker: "02 • Proposed Solution",
    title: "Introducing Materna",
    shortTitle: "Proposed Solution",
  },
  {
    number: 4,
    id: "features",
    section: "Main Presentation",
    kicker: "03 • Core Features",
    title: "Four connected experiences for maternal wellness",
    shortTitle: "Core Features",
  },
  {
    number: 5,
    id: "workflow",
    section: "Main Presentation",
    kicker: "04 • System Workflow",
    title: "From pregnancy profile to personalized guidance",
    shortTitle: "System Workflow",
  },
  {
    number: 6,
    id: "architecture",
    section: "Main Presentation",
    kicker: "05 • System Architecture",
    title: "A frontend MVP with a planned full-stack architecture",
    shortTitle: "System Architecture",
  },
  {
    number: 7,
    id: "milestones",
    section: "Main Presentation",
    kicker: "06 • Development Progress",
    title: "From concept to interactive frontend MVP",
    shortTitle: "Milestones Completed",
  },
  {
    number: 8,
    id: "status",
    section: "Main Presentation",
    kicker: "07 • Current Status",
    title: "The core user experience is implemented",
    shortTitle: "Work Completed & Status",
  },
  {
    number: 9,
    id: "evidence",
    section: "Main Presentation",
    kicker: "08 • Implementation Evidence",
    title: "The progress is visible in the application",
    shortTitle: "Implementation Evidence",
  },
  {
    number: 10,
    id: "remaining",
    section: "Main Presentation",
    kicker: "09 • Remaining Work",
    title: "Moving from frontend MVP to a complete platform",
    shortTitle: "Work Yet To Be Completed",
  },
  {
    number: 11,
    id: "roadmap",
    section: "Main Presentation",
    kicker: "10 • Development Roadmap",
    title: "The next phase of Materna's development",
    shortTitle: "Development Roadmap",
  },
  {
    number: 12,
    id: "team-tech",
    section: "Main Presentation",
    kicker: "11 • Team Contributions",
    title: "Technical Development",
    shortTitle: "Team: Technical",
  },
  {
    number: 13,
    id: "team-research",
    section: "Main Presentation",
    kicker: "12 • Team Contributions",
    title: "Research & Domain Expertise",
    shortTitle: "Team: Research",
  },
  {
    number: 14,
    id: "conclusion",
    section: "Main Presentation",
    kicker: "13 • Conclusion",
    title: "Building a more connected pregnancy experience",
    shortTitle: "Conclusion",
  },
  {
    number: 15,
    id: "appendix-overview",
    section: "Appendix",
    kicker: "Appendix • Supporting Documents",
    title: "Project Development & Supporting Assignments",
    shortTitle: "Appendix Overview",
  },
  {
    number: 16,
    id: "appendix-a1",
    section: "Appendix",
    kicker: "Appendix A",
    title: "5 Whys Root-Cause Analysis — Supporting Document",
    shortTitle: "Appendix A: 5 Whys Analysis",
  },
  {
    number: 17,
    id: "appendix-a2",
    section: "Appendix",
    kicker: "Appendix B",
    title: "Fishbone (Ishikawa) Analysis — Supporting Document",
    shortTitle: "Appendix B: Fishbone Analysis",
  },
  {
    number: 18,
    id: "appendix-a3",
    section: "Appendix",
    kicker: "Appendix C",
    title: "SCAMPER & Brainwriting (Week 1) — Supporting Document",
    shortTitle: "Appendix C: SCAMPER & Brainwriting",
  },
  {
    number: 19,
    id: "appendix-a4",
    section: "Appendix",
    kicker: "Appendix D",
    title: "Early Care Contract (Week 2) — Supporting Document",
    shortTitle: "Appendix D: Early Care Contract",
  },
];

export interface BuiltInSupportingDoc {
  key: "a1" | "a2" | "a3" | "a4";
  appendixCode: string;
  label: string;
  sessionTag: string;
  slideNumber: number;
  slideIndex: number;
  defaultTitle: string;
  defaultDescription: string;
  pdfHref: string;
  pages: {
    id: string;
    label: string;
    src: string;
  }[];
}

export const SUPPORTING_DOCS: BuiltInSupportingDoc[] = [
  {
    key: "a1",
    appendixCode: "Appendix A",
    label: "WEEK 1 • 5 WHYS ANALYSIS",
    sessionTag: "Group PG-08 • 2 Pages",
    slideNumber: 16,
    slideIndex: 15,
    defaultTitle: "5 Whys Root-Cause Analysis (UN SDG Goal 3)",
    defaultDescription:
      "Root-cause inquiry into rural maternal mortality, tracing delayed care across clinical access, healthcare infrastructure, policy execution, and governance accountability.",
    pdfHref: "/supporting-docs/pdfs/5whys-analysis.pdf",
    pages: [
      {
        id: "5whys-p1",
        label: "5 Whys Analysis — Page 1",
        src: "/supporting-docs/5whys-p1.png?v=2",
      },
      {
        id: "5whys-p2",
        label: "5 Whys Analysis — Page 2 (Synthesis & Team)",
        src: "/supporting-docs/5whys-p2.png?v=2",
      },
    ],
  },
  {
    key: "a2",
    appendixCode: "Appendix B",
    label: "ROOT-CAUSE • FISHBONE DIAGRAM",
    sessionTag: "Group PG-08 • 1 Diagram",
    slideNumber: 17,
    slideIndex: 16,
    defaultTitle: "Fishbone (Ishikawa) Analysis — High Maternal Mortality",
    defaultDescription:
      "Six-branch causal mapping across Governance & Policy, Accessibility, Healthcare Infrastructure, Economic Factors, Socio-Cultural Factors, and Healthcare Workforce.",
    pdfHref: "/supporting-docs/pdfs/fishbone-analysis.pdf",
    pages: [
      {
        id: "fishbone-p1",
        label: "Fishbone Analysis Diagram",
        src: "/supporting-docs/fishbone-p1.png?v=2",
      },
    ],
  },
  {
    key: "a3",
    appendixCode: "Appendix C",
    label: "MODULE 3 • WEEK 1 IDEATION",
    sessionTag: "Group 8 • 2 Pages",
    slideNumber: 18,
    slideIndex: 17,
    defaultTitle: "The Creative Mindset — SCAMPER, Brainwriting & Lateral Thinking",
    defaultDescription:
      "Generated 29 raw ideas (14 across all 7 SCAMPER lenses + 15 via 5-3-5 brainwriting) narrowed to 20 concepts including proactive pregnancy registries, digital ANC tracking, and tele-consults.",
    pdfHref: "/supporting-docs/pdfs/scamper-brainwriting-week1.pdf",
    pages: [
      {
        id: "scamper-p1",
        label: "SCAMPER Canvas — Page 1",
        src: "/supporting-docs/scamper-p1.png?v=2",
      },
      {
        id: "scamper-p2",
        label: "Brainwriting (5-3-5) & Reflection — Page 2",
        src: "/supporting-docs/scamper-p2.png?v=2",
      },
    ],
  },
  {
    key: "a4",
    appendixCode: "Appendix D",
    label: "MODULE 3 • WEEK 2 CONCEPT MATRIX",
    sessionTag: "Group PG-08 • 1 Page",
    slideNumber: 19,
    slideIndex: 18,
    defaultTitle: "Early Care Contract — Maternal Support Concept Matrix",
    defaultDescription:
      "Eight-element intervention synthesis featuring proactive ASHA pregnancy registration, due-date ANC reminders, symptom reporting channels, health card tracking, and self-check vitals.",
    pdfHref: "/supporting-docs/pdfs/early-care-contract-week2.pdf",
    pages: [
      {
        id: "week2-p1",
        label: "Early Care Contract Matrix",
        src: "/supporting-docs/week2-contract-p1.png?v=2",
      },
    ],
  },
];

export const TEAM_ROSTER = [
  { name: "Paul J Kottackal", degree: "MCA AI & ML" },
  { name: "Naveen Neeraj", degree: "MCA Cybersecurity" },
  { name: "Aarsha Rose", degree: "MSc Data Science" },
  { name: "Esha Sabeesh", degree: "MSc Psychology" },
  { name: "Aneeta George", degree: "MSc Forensic Science" },
] as const;

export const PROBLEM_ITEMS = [
  {
    title: "Fragmented Health Information",
    description:
      "Medical reports, prescriptions, symptoms, and appointments are often maintained across different sources.",
    tag: "Scattered Records",
  },
  {
    title: "Lack of Personalized Guidance",
    description:
      "Generic pregnancy information may not reflect the individual's current pregnancy stage.",
    tag: "Generic Advice",
  },
  {
    title: "Inconsistent Health Tracking",
    description:
      "Maintaining symptom, vital-sign, and wellness records consistently can be difficult.",
    tag: "Irregular Logs",
  },
  {
    title: "Information Overload",
    description:
      "Expectant mothers may struggle to identify relevant information and understand warning signs.",
    tag: "Unclear Signals",
  },
  {
    title: "Limited Regional Context",
    description:
      "Generic platforms may overlook Kerala-specific nutrition, cultural practices, and Malayalam accessibility.",
    tag: "Missing Local Context",
  },
] as const;

export const SOLUTION_PILLARS = [
  "Centralized pregnancy progress and health tracking",
  "Personalized week-by-week pregnancy information",
  "English and Malayalam language support",
  "Kerala-contextualized nutrition and wellness guidance",
  "Symptom and vital-sign tracking with visual insights",
  "Maternal safety awareness and emergency resources",
  "Ask ASHA — an AI-assisted informational support concept",
] as const;

export const CORE_FEATURES = [
  {
    code: "01",
    name: "PROGRESS",
    nameMl: "പുരോഗതി",
    description:
      "Pregnancy timeline, gestational age, trimester, due date, and personalized progress overview.",
    accent: "#BA0034",
    bgTint: "#FDF2F5",
    highlights: ["LMP / EDD Engine", "Trimester Progress", "Daily Wellness"],
  },
  {
    code: "02",
    name: "GUIDE",
    nameMl: "ഗൈഡ്",
    description:
      "Week-by-week pregnancy journey, maternal changes, nutrition, activities, and localized information.",
    accent: "#3D7A5A",
    bgTint: "#F2F8F5",
    highlights: ["Weeks 4–40 Content", "Kerala Nutrition", "Scan Preparation"],
  },
  {
    code: "03",
    name: "TRACKER",
    nameMl: "വൈറ്റൽസ്",
    description:
      "Symptom logging, blood pressure, weight, wellness records, and visual health trends.",
    accent: "#7A2848",
    bgTint: "#F9F3F6",
    highlights: ["BP & Weight Charts", "Fasting Glucose", "Symptom Logs"],
  },
  {
    code: "04",
    name: "SAFETY",
    nameMl: "സുരക്ഷ",
    description:
      "Warning-sign awareness, safety guidance, emergency contacts, and healthcare resources.",
    accent: "#B43E28",
    bgTint: "#FDF5F3",
    highlights: ["Warning-Sign Triage", "108 Emergency Access", "Care Contacts"],
  },
] as const;

export const WORKFLOW_STEPS = [
  {
    step: "01",
    title: "Profile Setup",
    description:
      "User enters pregnancy information, including the last menstrual period (LMP).",
  },
  {
    step: "02",
    title: "Pregnancy Calculation",
    description:
      "Materna calculates gestational age, estimated due date, and trimester.",
  },
  {
    step: "03",
    title: "Personalized Dashboard",
    description:
      "User views pregnancy progress and stage-specific information.",
  },
  {
    step: "04",
    title: "Feature Selection",
    description:
      "User accesses Progress, Guide, Tracker, Safety, or Ask ASHA.",
  },
  {
    step: "05",
    title: "Tracking & Safety",
    description:
      "Symptoms and vital signs are recorded, health trends visualized, and safety-oriented checks applied.",
  },
  {
    step: "06",
    title: "Updated Guidance",
    description:
      "The dashboard and relevant information update based on pregnancy stage and recorded information.",
  },
] as const;

export const MILESTONES_COMPLETED = [
  {
    code: "MILESTONE 01",
    title: "FOUNDATION",
    summary: "Core web architecture and visual design foundation",
    items: [
      "Next.js application scaffolding",
      "TypeScript and Tailwind configuration",
      "Core design system and application structure",
    ],
  },
  {
    code: "MILESTONE 02",
    title: "DOMAIN LOGIC",
    summary: "Deterministic gestational dating and stage modeling",
    items: [
      "Pregnancy data models",
      "Gestational calculation logic",
      "LMP/EDD calculation",
      "Week and trimester determination",
    ],
  },
  {
    code: "MILESTONE 03",
    title: "LOCALIZED CONTENT",
    summary: "Kerala-contextualized bilingual maternal knowledge base",
    items: [
      "Week-by-week pregnancy guide (Weeks 4–40)",
      "Kerala-specific contextual information",
      "Nutrition, wellness, and myth-awareness content",
      "English and Malayalam interface",
    ],
  },
  {
    code: "MILESTONE 04",
    title: "INTERACTIVE EXPERIENCE",
    summary: "Connected multi-tab client MVP with local persistence",
    items: [
      "Progress dashboard & onboarding",
      "Tracker & Recharts visual charts",
      "Safety interface & emergency links",
      "Ask ASHA demo interface",
    ],
  },
] as const;

export const STATUS_MATRIX = {
  implemented: [
    "Four-tab mobile-first interface (Progress, Guide, Tracker, Safety)",
    "English and Malayalam language switching",
    "Pregnancy onboarding and profile interaction",
    "Gestational age, EDD, and trimester calculations",
    "Week-by-week pregnancy guide (Weeks 4–40)",
    "Kerala-localized nutrition and wellness information",
    "Symptom, BP, weight, and fasting glucose tracking UI",
    "Recharts-based weight and blood pressure charts",
    "Browser-based persistence via localStorage",
    "Maternal safety screen and emergency resource links",
  ],
  demo: [
    "Ask ASHA rule-based Q&A responses",
    "Red-flag keyword interception in demo assistant",
    "Client-side sample and tracking data records",
    "Local browser state persistence (single-device)",
  ],
  planned: [
    "FastAPI REST backend & Pydantic validation",
    "PostgreSQL database with SQLAlchemy & Alembic",
    "JWT authentication & user account system",
    "Live LLM integration with safety guardrails",
    "Comprehensive automated unit, UI, and API tests",
    "Cloud persistence, ESLint setup, and deployment",
  ],
} as const;

export const EVIDENCE_SCREENSHOTS = [
  {
    id: "progress",
    title: "Progress Dashboard",
    caption: "Pregnancy overview, progress timeline, gestational week.",
    src: "/screenshots/progress.png?v=2",
    badge: "Tab 01 • Implemented",
  },
  {
    id: "guide",
    title: "Guide",
    caption: "Week-by-week pregnancy content (Weeks 4–40).",
    src: "/screenshots/guide.png?v=2",
    badge: "Tab 02 • Implemented",
  },
  {
    id: "tracker",
    title: "Tracker",
    caption: "Vital recording and Recharts visualizations.",
    src: "/screenshots/tracker.png?v=2",
    badge: "Tab 03 • Implemented",
  },
  {
    id: "safety",
    title: "Safety",
    caption: "Warning-sign guidance and emergency resource information.",
    src: "/screenshots/safety.png?v=2",
    badge: "Tab 04 • Implemented",
  },
  {
    id: "asha",
    title: "Ask ASHA",
    caption: "Demo educational assistant with red-flag interception.",
    src: "/screenshots/asha.png?v=2",
    badge: "Assistant • Demo UI",
  },
] as const;

export const REMAINING_WORK_GROUPS = [
  {
    code: "01",
    title: "Repository & Development Setup",
    items: [
      "Git initialization and version control",
      "ESLint configuration",
      "Development documentation",
    ],
  },
  {
    code: "02",
    title: "Backend Development",
    items: [
      "FastAPI application",
      "REST API development",
      "Pydantic validation",
      "Backend service structure",
    ],
  },
  {
    code: "03",
    title: "Data & Persistence",
    items: [
      "PostgreSQL database",
      "SQLAlchemy ORM",
      "Alembic migrations",
      "Cloud/server-side data persistence",
    ],
  },
  {
    code: "04",
    title: "Authentication & Security",
    items: [
      "User registration and login",
      "JWT authentication",
      "Protected routes",
      "Secure user data handling",
    ],
  },
  {
    code: "05",
    title: "Feature Integration",
    items: [
      "Migrate frontend localStorage data to backend APIs",
      "Profile and pregnancy data APIs",
      "Tracker APIs",
      "Appointment and medication APIs",
    ],
  },
  {
    code: "06",
    title: "AI Integration",
    items: [
      "Live AI assistant",
      "Context-aware responses",
      "Guardrails",
      "Red-flag escalation handling",
    ],
  },
  {
    code: "07",
    title: "Testing & Deployment",
    items: [
      "Unit, component, and API tests",
      "Technical documentation",
      "Dockerization",
      "Deployment and demo preparation",
    ],
  },
] as const;

export const ROADMAP_PHASES = [
  {
    phase: "Phase 1",
    title: "Project Foundation",
    effort: "Low–Moderate Effort",
    scope:
      "Repository hygiene, version control, linting, documentation, and development setup.",
  },
  {
    phase: "Phase 2",
    title: "Backend & Database",
    effort: "High Core Effort",
    scope:
      "FastAPI backend, PostgreSQL, schema design, ORM, and migrations.",
  },
  {
    phase: "Phase 3",
    title: "Auth & Data Integration",
    effort: "Moderate–High Effort",
    scope:
      "JWT authentication, profile APIs, and moving persistence from local browser storage to backend services.",
  },
  {
    phase: "Phase 4",
    title: "Tracking Modules",
    effort: "Moderate–High Effort",
    scope:
      "API integration for symptoms, vitals, wellness, records, medication, and appointments.",
  },
  {
    phase: "Phase 5",
    title: "AI Assistant",
    effort: "High Specialized Effort",
    scope:
      "Live AI service, contextual guidance, safety guardrails, and response handling.",
  },
  {
    phase: "Phase 6",
    title: "Quality & Validation",
    effort: "Moderate Effort",
    scope:
      "Automated testing, validation, security review, and UX refinements.",
  },
  {
    phase: "Phase 7",
    title: "Deployment",
    effort: "Focused Final Stage",
    scope:
      "Documentation, containerization, deployment, and demonstration.",
  },
] as const;

export const TECHNICAL_TEAM = [
  {
    name: "PAUL J KOTTACKAL",
    degree: "MCA — Artificial Intelligence & Machine Learning",
    role: "AI/ML, intelligent systems, system architecture, technical integration.",
    isPrimaryRoleHighlight: true,
    iconType: "brain" as const,
    badgeLabel: "AI/ML & System Architecture",
    contributions: [
      "AI-assisted features and intelligent system design",
      "System architecture and technical planning",
      "Ask ASHA assistant design",
      "Intelligent logic and AI integration planning",
      "Technical integration across project modules",
    ],
  },
  {
    name: "NAVEEN NEERAJ",
    degree: "MCA — Cybersecurity",
    role: "Security, privacy, and secure system design.",
    isPrimaryRoleHighlight: false,
    iconType: "shield" as const,
    badgeLabel: "Security & Data Privacy",
    contributions: [
      "Security and privacy considerations",
      "Secure handling of sensitive maternal data",
      "Application security considerations",
      "Risk mitigation and security review",
    ],
  },
  {
    name: "AARSHA ROSE",
    degree: "MSc — Data Science",
    role: "Data research and analytics.",
    isPrimaryRoleHighlight: false,
    iconType: "analytics" as const,
    badgeLabel: "Data Research & Analytics",
    contributions: [
      "Data research and organization",
      "Data-driven insights",
      "Analytics and visualization",
      "Research support for intelligent features",
    ],
  },
] as const;

export const RESEARCH_TEAM = [
  {
    name: "ESHA SABEESH",
    degree: "MSc — Psychology",
    role: "Maternal psychological wellbeing and behavioral research.",
    iconType: "psychology" as const,
    badgeLabel: "Behavioral & Emotional Wellbeing",
    contributions: [
      "Maternal emotional wellbeing research",
      "Psychological aspects of pregnancy support",
      "Behavioral needs and user considerations",
      "User-centered informational support",
    ],
  },
  {
    name: "ANEETA GEORGE",
    degree: "MSc — Forensic Science",
    role: "Research, evidence evaluation, and risk-oriented analysis.",
    iconType: "forensic" as const,
    badgeLabel: "Evidence Evaluation & Risk Analysis",
    contributions: [
      "Research methodology",
      "Information evaluation",
      "Risk identification",
      "Supporting reliability of project information",
    ],
  },
] as const;
