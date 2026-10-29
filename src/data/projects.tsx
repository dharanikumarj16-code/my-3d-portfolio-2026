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
    name: "JARVIS - AI PC Operator",
    imageKey: "jarvis",
    description: "Voice-driven PC operator for accessible computing 🎙️⚡",
    gradient: ["#091b29", "#00a3ff"],
    url: "https://github.com/dharanikumarj16-code/project-jarvis",
    tech: ["python", "git"],
  },
  {
    name: "Auto Silent Pro",
    imageKey: "autosilentpro",
    description: "Smart Android Sound Automation & Emergency Bypass 📱🔔",
    gradient: ["#0d1b2a", "#0077b6"],
    url: "https://github.com/dharanikumarj16-code/auto-Silent-application",
    tech: ["kotlin", "git"],
  },
];
