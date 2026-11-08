export type ProfileRecord = {
  id?: string;
  full_name: string;
  role: string;
  bio: string;
  email: string;
  phone?: string;
  location?: string;
  resume_url?: string;
  avatar_url?: string;
  github_url?: string;
  linkedin_url?: string;
  updated_at?: string;
};

export type ProjectRecord = {
  id?: string;
  name: string;
  description: string;
  url: string;
  image_url?: string;
  gradient?: [string, string];
  tech?: string[];
  order_index?: number;
  created_at?: string;
};

export type ExperienceRecord = {
  id?: string;
  company: string;
  role: string;
  period: string;
  description: string[];
  order_index?: number;
  created_at?: string;
};

export type SkillRecord = {
  id?: string;
  name: string;
  label: string;
  category: "Languages & Core" | "AI, ML & Data Science" | "Tools & Platforms" | "DevOps & Cloud" | string;
  short_description?: string;
  icon_url?: string;
  color?: string;
  order_index?: number;
};
