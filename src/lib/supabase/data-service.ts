import { createClient } from "./client";
import { ProfileRecord, ProjectRecord, ExperienceRecord, SkillRecord } from "@/types/database";
import { PROJECTS } from "@/data/projects";
import { EXPERIENCE, SKILLS } from "@/data/constants";
import { config as staticConfig } from "@/data/config";

const supabase = createClient();

// ==========================================
// PROFILE SERVICES
// ==========================================
export async function getProfile(): Promise<ProfileRecord> {
  try {
    const { data, error } = await supabase
      .from("profile")
      .select("*")
      .order("updated_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error || !data) {
      return {
        full_name: staticConfig.fullName,
        role: staticConfig.role,
        bio: staticConfig.description.long,
        email: staticConfig.email,
        phone: staticConfig.phone,
        location: staticConfig.location,
        resume_url: staticConfig.resumeUrl,
        avatar_url: "/assets/dharani-3d-portrait.jpg",
        github_url: staticConfig.social.github,
        linkedin_url: staticConfig.social.linkedin,
      };
    }
    return data;
  } catch {
    return {
      full_name: staticConfig.fullName,
      role: staticConfig.role,
      bio: staticConfig.description.long,
      email: staticConfig.email,
      phone: staticConfig.phone,
      location: staticConfig.location,
      resume_url: staticConfig.resumeUrl,
      avatar_url: "/assets/dharani-3d-portrait.jpg",
      github_url: staticConfig.social.github,
      linkedin_url: staticConfig.social.linkedin,
    };
  }
}

export async function upsertProfile(profile: ProfileRecord) {
  const { data, error } = await supabase
    .from("profile")
    .upsert({
      ...profile,
      updated_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

// ==========================================
// PROJECTS CRUD SERVICES
// ==========================================
export async function getProjects(): Promise<ProjectRecord[]> {
  try {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("order_index", { ascending: true });

    if (error || !data || data.length === 0) {
      // Fallback to static PROJECTS
      return PROJECTS.map((p, idx) => ({
        id: `static-${idx}`,
        name: p.name,
        description: p.description,
        url: p.url,
        image_url: `/assets/projects/${p.imageKey}.png`,
        gradient: p.gradient,
        tech: p.tech,
        order_index: idx,
      }));
    }
    return data;
  } catch {
    return PROJECTS.map((p, idx) => ({
      id: `static-${idx}`,
      name: p.name,
      description: p.description,
      url: p.url,
      image_url: `/assets/projects/${p.imageKey}.png`,
      gradient: p.gradient,
      tech: p.tech,
      order_index: idx,
    }));
  }
}

export async function createProject(project: Omit<ProjectRecord, "id">) {
  const { data, error } = await supabase
    .from("projects")
    .insert([project])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateProject(id: string, updates: Partial<ProjectRecord>) {
  const { data, error } = await supabase
    .from("projects")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteProject(id: string) {
  const { error } = await supabase.from("projects").delete().eq("id", id);
  if (error) throw error;
  return true;
}

// ==========================================
// EXPERIENCE CRUD SERVICES
// ==========================================
export async function getExperiences(): Promise<ExperienceRecord[]> {
  try {
    const { data, error } = await supabase
      .from("experience")
      .select("*")
      .order("order_index", { ascending: true });

    if (error || !data || data.length === 0) {
      return EXPERIENCE.map((e, idx) => ({
        id: `static-exp-${idx}`,
        company: e.company,
        role: e.title,
        period: `${e.startDate} - ${e.endDate}`,
        description: e.description,
        order_index: idx,
      }));
    }
    return data;
  } catch {
    return EXPERIENCE.map((e, idx) => ({
      id: `static-exp-${idx}`,
      company: e.company,
      role: e.title,
      period: `${e.startDate} - ${e.endDate}`,
      description: e.description,
      order_index: idx,
    }));
  }
}

export async function createExperience(exp: Omit<ExperienceRecord, "id">) {
  const { data, error } = await supabase
    .from("experience")
    .insert([exp])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateExperience(id: string, updates: Partial<ExperienceRecord>) {
  const { data, error } = await supabase
    .from("experience")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteExperience(id: string) {
  const { error } = await supabase.from("experience").delete().eq("id", id);
  if (error) throw error;
  return true;
}

// ==========================================
// SKILLS CRUD SERVICES
// ==========================================
export async function getSkills(): Promise<SkillRecord[]> {
  try {
    const { data, error } = await supabase
      .from("skills")
      .select("*")
      .order("order_index", { ascending: true });

    if (error || !data || data.length === 0) {
      return Object.values(SKILLS).map((s, idx) => ({
        id: `static-skill-${idx}`,
        name: s.name,
        label: s.label,
        category: s.category,
        short_description: s.shortDescription,
        icon_url: s.icon,
        color: s.color,
        order_index: idx,
      }));
    }
    return data;
  } catch {
    return Object.values(SKILLS).map((s, idx) => ({
      id: `static-skill-${idx}`,
      name: s.name,
      label: s.label,
      category: s.category,
      short_description: s.shortDescription,
      icon_url: s.icon,
      color: s.color,
      order_index: idx,
    }));
  }
}

export async function createSkill(skill: Omit<SkillRecord, "id">) {
  const { data, error } = await supabase
    .from("skills")
    .insert([skill])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateSkill(id: string, updates: Partial<SkillRecord>) {
  const { data, error } = await supabase
    .from("skills")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteSkill(id: string) {
  const { error } = await supabase.from("skills").delete().eq("id", id);
  if (error) throw error;
  return true;
}
