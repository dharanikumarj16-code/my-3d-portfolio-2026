// thoda zada ts ho gya idhar
export enum SkillNames {
  JS = "js",
  TS = "ts",
  HTML = "html",
  CSS = "css",
  REACT = "react",
  VUE = "vue",
  NEXTJS = "nextjs",
  TAILWIND = "tailwind",
  NODEJS = "nodejs",
  EXPRESS = "express",
  POSTGRES = "postgres",
  MONGODB = "mongodb",
  GIT = "git",
  GITHUB = "github",
  PRETTIER = "prettier",
  NPM = "npm",
  FIREBASE = "firebase",
  WORDPRESS = "wordpress",
  LINUX = "linux",
  DOCKER = "docker",
  NGINX = "nginx",
  AWS = "aws",
  VIM = "vim",
  VERCEL = "vercel",
}
export type Skill = {
  id: number;
  name: string;
  label: string;
  shortDescription: string;
  color: string;
  icon: string;
};
export const SKILLS: Record<SkillNames, Skill> = {
  [SkillNames.JS]: {
    id: 1,
    name: "js",
    label: "Python",
    shortDescription: "core programming language for AI, automation & data science 🐍⚡",
    color: "#3776AB",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  },
  [SkillNames.TS]: {
    id: 2,
    name: "ts",
    label: "C++",
    shortDescription: "high-performance systems language & algorithmic problem solving ⚡🔒",
    color: "#00599C",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
  },
  [SkillNames.HTML]: {
    id: 3,
    name: "html",
    label: "DSA",
    shortDescription: "Data Structures & Algorithms: trees, graphs, sorting & recursion 🧩🧠",
    color: "#E34C26",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg",
  },
  [SkillNames.CSS]: {
    id: 4,
    name: "css",
    label: "Matplotlib & Seaborn",
    shortDescription: "statistical visualization, distribution plotting & scientific charts 📈🎨",
    color: "#11557C",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  },
  [SkillNames.REACT]: {
    id: 5,
    name: "react",
    label: "LLMs & AI",
    shortDescription: "Large Language Models, prompt engineering & autonomous AI agents 🤖🧠",
    color: "#10A37F",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/networkx/networkx-original.svg",
  },
  [SkillNames.VUE]: {
    id: 6,
    name: "vue",
    label: "Jupyter Notebook",
    shortDescription: "interactive computational notebooks for exploratory data science 🪐📓",
    color: "#F37626",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg",
  },
  [SkillNames.NEXTJS]: {
    id: 7,
    name: "nextjs",
    label: "FastAPI",
    shortDescription: "modern, high-speed asynchronous APIs for machine learning deployment ⚡🚀",
    color: "#009688",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg",
  },
  [SkillNames.TAILWIND]: {
    id: 8,
    name: "tailwind",
    label: "AI & Automation",
    shortDescription: "intelligent workflow automation, voice agents & PC control 🎙️✨",
    color: "#38BDF8",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  },
  [SkillNames.NODEJS]: {
    id: 9,
    name: "nodejs",
    label: "Java",
    shortDescription: "robust OOP foundations, backend logic & enterprise software ☕⚙️",
    color: "#ED8B00",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
  },
  [SkillNames.EXPRESS]: {
    id: 10,
    name: "express",
    label: "NumPy",
    shortDescription: "high-performance multidimensional array computing & linear algebra 🔢⚡",
    color: "#013243",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg",
  },
  [SkillNames.POSTGRES]: {
    id: 11,
    name: "postgres",
    label: "SQL",
    shortDescription: "relational querying, database schema design & data storage 🐘💾",
    color: "#336791",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  },
  [SkillNames.MONGODB]: {
    id: 12,
    name: "mongodb",
    label: "Pandas",
    shortDescription: "structured data wrangling, cleaning & tabular analysis 🐼📊",
    color: "#150458",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg",
  },
  [SkillNames.GIT]: {
    id: 13,
    name: "git",
    label: "Git",
    shortDescription: "distributed version control, safe branching & commit history tracking ⏳🌀",
    color: "#F1502F",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  },
  [SkillNames.GITHUB]: {
    id: 14,
    name: "github",
    label: "GitHub",
    shortDescription: "open-source collaboration, pull requests & automated CI/CD workflows 🐙🤝",
    color: "#000000",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
  },
  [SkillNames.PRETTIER]: {
    id: 15,
    name: "prettier",
    label: "OOP",
    shortDescription: "Object-Oriented Programming: abstraction, encapsulation & inheritance 🧱✨",
    color: "#F7B93A",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
  },
  [SkillNames.NPM]: {
    id: 16,
    name: "npm",
    label: "Pip & Packages",
    shortDescription: "Python virtual environments, dependencies & package management 📦🧭",
    color: "#CB3837",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg",
  },
  [SkillNames.FIREBASE]: {
    id: 17,
    name: "firebase",
    label: "ChatGPT",
    shortDescription: "conversational AI, intelligent prompt engineering & reasoning 💬🧠",
    color: "#10A37F",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/networkx/networkx-original.svg",
  },
  [SkillNames.WORDPRESS]: {
    id: 18,
    name: "wordpress",
    label: "Android Studio",
    shortDescription: "Android SDK, Kotlin mobile builds & system automation testing 📱⚙️",
    color: "#3DDC84",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg",
  },
  [SkillNames.LINUX]: {
    id: 19,
    name: "linux",
    label: "Linux",
    shortDescription: "terminal-first operating system, shell scripting & server environment 🐧🧙‍♂️",
    color: "#FCC624",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
  },
  [SkillNames.DOCKER]: {
    id: 20,
    name: "docker",
    label: "Docker",
    shortDescription: "containerized development environments & reproducible deployments 🐳📦",
    color: "#2496ED",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  },
  [SkillNames.NGINX]: {
    id: 21,
    name: "nginx",
    label: "Render",
    shortDescription: "cloud hosting for FastAPI backends, web services & databases 🌐☁️",
    color: "#46E3B7",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/networkx/networkx-original.svg",
  },
  [SkillNames.AWS]: {
    id: 22,
    name: "aws",
    label: "Google Colab",
    shortDescription: "cloud GPU-accelerated computing & rapid model experimentation ☁️⚡",
    color: "#F9AB00",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg",
  },
  [SkillNames.VIM]: {
    id: 23,
    name: "vim",
    label: "VS Code",
    shortDescription: "Visual Studio Code: primary IDE, extensions & workflow optimization 💻⌨️",
    color: "#007ACC",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
  },
  [SkillNames.VERCEL]: {
    id: 24,
    name: "vercel",
    label: "Vercel",
    shortDescription: "global edge network, serverless deployment & instant hosting ▲🚀",
    color: "#6cc24a",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg",
  },
};

export type Experience = {
  id: number;
  startDate: string;
  endDate: string;
  title: string;
  company: string;
  description: string[];
  skills: SkillNames[];
};

export const EXPERIENCE: Experience[] = [
  {
    id: 1,
    startDate: "2024",
    endDate: "Present",
    title: "AI & Automation Developer",
    company: "Open Source / Independent Projects",
    description: [
      "Architected JARVIS: an AI-powered voice operator designed for accessible computing, combining STT, NLP routing, and planning agents.",
      "Engineered Python automation tools to translate natural-language voice instructions into hands-free system operations.",
      "Experimented with local LLMs, prompt engineering, and intelligent agents to explore next-generation human-computer interaction.",
    ],
    skills: [
      SkillNames.JS,
      SkillNames.REACT,
      SkillNames.NEXTJS,
      SkillNames.DOCKER,
      SkillNames.LINUX,
      SkillNames.GIT,
    ],
  },
  {
    id: 2,
    startDate: "2023",
    endDate: "2027 (Expected)",
    title: "B.Tech in Artificial Intelligence & Data Science",
    company: "Sri Krishna College of Engineering and Technology (SKCET)",
    description: [
      "Specializing in AI and Data Science with coursework in Data Structures & Algorithms (DSA), OOP, and Machine Learning foundations.",
      "Conducting data analysis, exploratory computing, and model experimentation using Python, NumPy, Pandas, and Jupyter/Colab.",
      "Building practical software applications combining C++, Java, Python, and relational database systems.",
    ],
    skills: [
      SkillNames.JS,
      SkillNames.TS,
      SkillNames.NODEJS,
      SkillNames.POSTGRES,
      SkillNames.HTML,
      SkillNames.PRETTIER,
      SkillNames.MONGODB,
      SkillNames.EXPRESS,
    ],
  },
];

export const themeDisclaimers = {
  light: [
    "Warning: Light mode emits a gazillion lumens of pure radiance!",
    "Caution: Light mode ahead! Please don't try this at home.",
    "Only trained professionals can handle this much brightness. Proceed with sunglasses!",
    "Brace yourself! Light mode is about to make everything shine brighter than your future.",
    "Flipping the switch to light mode... Are you sure your eyes are ready for this?",
  ],
  dark: [
    "Light mode? I thought you went insane... but welcome back to the dark side!",
    "Switching to dark mode... How was life on the bright side?",
    "Dark mode activated! Thanks you from the bottom of my heart, and my eyes too.",
    "Welcome back to the shadows. How was life out there in the light?",
    "Dark mode on! Finally, someone who understands true sophistication.",
  ],
};
