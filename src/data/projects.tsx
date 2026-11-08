export type SimpleProject = {
  name: string;
  imageKey: string;
  description: string;
  gradient: [string, string];
  url: string;
  githubUrl?: string;
  liveUrl?: string;
  tech: string[];
  highlights?: string[];
  featured?: boolean;
};

export const PROJECTS: SimpleProject[] = [
  {
    name: "SmartFarm AI: KNN Scheduler",
    imageKey: "smartfarm",
    description: "Climate-matching crop planning system using KNN, Pandas, NumPy & deployed on Render 🌱⚡",
    gradient: ["#0b2b1a", "#10b981"],
    url: "https://project-coagri.onrender.com",
    liveUrl: "https://project-coagri.onrender.com",
    githubUrl: "https://github.com/dharanikumarj16-code",
    tech: ["python", "numpy", "render", "git"],
    highlights: [
      "KNN weather matching algorithm optimizing 30-day crop planting timelines",
      "End-to-end preprocessing, model validation & visualization pipelines",
      "Production CI/CD deployment on Render cloud infrastructure"
    ],
    featured: true,
  },
  {
    name: "Voice-Controlled Agent (JARVIS)",
    imageKey: "jarvis",
    description: "Hands-free voice AI PC operator with low-latency execution logic & NLP 🎙️🤖",
    gradient: ["#091b29", "#00a3ff"],
    url: "https://github.com/dharanikumarj16-code/project-jarvis",
    liveUrl: "https://github.com/dharanikumarj16-code/project-jarvis",
    githubUrl: "https://github.com/dharanikumarj16-code/project-jarvis",
    tech: ["python", "git"],
    highlights: [
      "Real-time voice intent extraction with low-latency execution triggers",
      "Automated hands-free operating system control & utility workflows",
      "Robust natural language command parsing and error-handling"
    ],
    featured: true,
  },
  {
    name: "Automated Silent Mode System",
    imageKey: "autosilentpro",
    description: "Location-aware automated classroom scheduling application dynamically transitioning device profiles 📱🔔",
    gradient: ["#0d1b2a", "#0077b6"],
    url: "https://github.com/dharanikumarj16-code/auto-Silent-application",
    liveUrl: "https://github.com/dharanikumarj16-code/auto-Silent-application",
    githubUrl: "https://github.com/dharanikumarj16-code/auto-Silent-application",
    tech: ["kotlin", "git"],
    highlights: [
      "Location-aware geofencing for automatic device ringer switching",
      "Time-slot synchronization matching active classroom timetables",
      "Battery-efficient background service architecture on Android"
    ],
    featured: true,
  },
];
