export type SimpleProject = {
  name: string;
  imageKey: string;
  description: string;
  gradient: [string, string];
  url: string;
  tech: string[];
};

export const PROJECTS: SimpleProject[] = [
  {
    name: "SmartFarm AI: KNN Scheduler",
    imageKey: "smartfarm",
    description: "Climate-matching crop planning system using KNN, Pandas, NumPy & deployed on Render 🌱⚡",
    gradient: ["#0b2b1a", "#10b981"],
    url: "https://project-coagri.onrender.com",
    tech: ["python", "git"],
  },
  {
    name: "Voice-Controlled Agent (JARVIS)",
    imageKey: "jarvis",
    description: "Hands-free voice AI PC operator with low-latency execution logic & NLP 🎙️🤖",
    gradient: ["#091b29", "#00a3ff"],
    url: "https://github.com/dharanikumarj16-code/project-jarvis",
    tech: ["python", "git"],
  },
  {
    name: "Automated Silent Mode System",
    imageKey: "autosilentpro",
    description: "Location-aware automated classroom scheduling application dynamically transitioning device profiles 📱🔔",
    gradient: ["#0d1b2a", "#0077b6"],
    url: "https://github.com/dharanikumarj16-code/auto-Silent-application",
    tech: ["kotlin", "git"],
  },
];
