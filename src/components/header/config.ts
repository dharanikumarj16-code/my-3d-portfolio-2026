import { Link } from "@/types";

export interface EnhancedLink extends Link {
  subtitle?: string;
  tag?: string;
  description?: string;
}

const links: EnhancedLink[] = [
  {
    title: "Home",
    href: "/",
    thumbnail: "/assets/dharani-3d-portrait.jpg",
    subtitle: "AI & Data Science Engineer",
    tag: "Welcome",
    description: "End-to-end machine learning pipelines, voice AI agents, and intelligent software systems.",
  },
  {
    title: "About",
    href: "/about",
    thumbnail: "/assets/dharani-about-avatar.jpg",
    subtitle: "Background & Philosophy",
    tag: "Personal",
    description: "Explore boldly. Build practically. Learn continuously. Future AI entrepreneur.",
  },
  {
    title: "Skills",
    href: "/#skills",
    thumbnail: "/assets/dharani-3d-balcony.jpg",
    subtitle: "Glass Planet Spheres",
    tag: "Core Stack",
    description: "Machine Learning, Python, Scikit-Learn, PyTorch, LangChain, Next.js, and Cloud Deployment.",
  },
  {
    title: "Experience",
    href: "/#experience",
    thumbnail: "/assets/dharani-3d-portrait.jpg",
    subtitle: "Academic & Engineering Track",
    tag: "Timeline",
    description: "Sri Krishna College of Technology (SKCET) B.Tech AI & DS, milestones, and project leadership.",
  },
  {
    title: "Projects",
    href: "/#projects",
    thumbnail: "/assets/projects-screenshots/smartfarm.png",
    subtitle: "Featured AI Systems",
    tag: "Deployments",
    description: "SmartFarm AI (Crop Prediction), Jiniz.ai, Voice Assistant JARVIS, and AutoSilent Pro.",
  },
  {
    title: "Resume",
    href: "/resume",
    thumbnail: "/assets/dharani-3d-portrait.jpg",
    subtitle: "Curriculum Vitae",
    tag: "Credentials",
    description: "Complete technical profile, verified coursework, competitive programming, and PDF download.",
  },
  {
    title: "Contact",
    href: "/#contact",
    thumbnail: "/assets/dharani-3d-avatar.png",
    subtitle: "Get in Touch",
    tag: "Collaboration",
    description: "Direct inquiries for AI / ML engineering, internships, and innovative project collaborations.",
  },
];

export { links };
