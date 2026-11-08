"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  getProfile,
  upsertProfile,
  getProjects,
  createProject,
  updateProject,
  deleteProject,
  getExperiences,
  createExperience,
  updateExperience,
  deleteExperience,
  getSkills,
  createSkill,
  updateSkill,
  deleteSkill,
} from "@/lib/supabase/data-service";
import { uploadPortfolioAsset } from "@/lib/supabase/storage";
import { ProfileRecord, ProjectRecord, ExperienceRecord, SkillRecord } from "@/types/database";
import {
  User,
  Briefcase,
  Layers,
  Sparkles,
  LogOut,
  Upload,
  Plus,
  Trash2,
  Edit2,
  ExternalLink,
  Check,
  AlertCircle,
  FileText,
  Image as ImageIcon,
} from "lucide-react";

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<"profile" | "projects" | "experience" | "skills">("profile");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const router = useRouter();
  const supabase = createClient();

  // State
  const [profile, setProfile] = useState<ProfileRecord>({
    full_name: "",
    role: "",
    bio: "",
    email: "",
    phone: "",
    location: "",
    resume_url: "",
    avatar_url: "",
    github_url: "",
    linkedin_url: "",
  });

  const [projects, setProjects] = useState<ProjectRecord[]>([]);
  const [experiences, setExperiences] = useState<ExperienceRecord[]>([]);
  const [skills, setSkills] = useState<SkillRecord[]>([]);

  // Project Modal/Form State
  const [editingProject, setEditingProject] = useState<ProjectRecord | null>(null);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

  // Experience Modal/Form State
  const [editingExperience, setEditingExperience] = useState<ExperienceRecord | null>(null);
  const [isExperienceModalOpen, setIsExperienceModalOpen] = useState(false);

  // Skill Modal/Form State
  const [editingSkill, setEditingSkill] = useState<SkillRecord | null>(null);
  const [isSkillModalOpen, setIsSkillModalOpen] = useState(false);

  // File Uploading Indicators
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [uploadingResume, setUploadingResume] = useState(false);
  const [uploadingProjectImage, setUploadingProjectImage] = useState(false);

  // Notify Helper
  const showToast = (type: "success" | "error", message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  // Check Auth & Fetch Data
  useEffect(() => {
    const init = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          router.push("/admin/login");
          return;
        }

        const [profData, projData, expData, skillData] = await Promise.all([
          getProfile(),
          getProjects(),
          getExperiences(),
          getSkills(),
        ]);

        setProfile(profData);
        setProjects(projData);
        setExperiences(expData);
        setSkills(skillData);
      } catch (err: any) {
        showToast("error", err?.message || "Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  // ==========================================
  // PROFILE HANDLERS
  // ==========================================
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const updated = await upsertProfile(profile);
      setProfile(updated);
      showToast("success", "Profile & Resume information successfully saved!");
    } catch (err: any) {
      showToast("error", err?.message || "Failed to save profile");
    } finally {
      setSaving(false);
    }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingAvatar(true);
    const { url, error } = await uploadPortfolioAsset(file, "avatars");
    setUploadingAvatar(false);

    if (error || !url) {
      showToast("error", error || "Avatar upload failed");
    } else {
      setProfile((prev) => ({ ...prev, avatar_url: url }));
      showToast("success", "Profile picture uploaded! Remember to save changes.");
    }
  };

  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingResume(true);
    const { url, error } = await uploadPortfolioAsset(file, "resumes");
    setUploadingResume(false);

    if (error || !url) {
      showToast("error", error || "Resume upload failed");
    } else {
      setProfile((prev) => ({ ...prev, resume_url: url }));
      showToast("success", "New resume uploaded! Remember to save changes.");
    }
  };

  // ==========================================
  // PROJECT CRUD HANDLERS
  // ==========================================
  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;
    setSaving(true);

    try {
      if (editingProject.id && !editingProject.id.startsWith("static-")) {
        // Update
        const updated = await updateProject(editingProject.id, editingProject);
        setProjects((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
        showToast("success", "Project updated successfully!");
      } else {
        // Create
        const { id, ...newProjData } = editingProject;
        const created = await createProject({
          ...newProjData,
          order_index: projects.length,
        });
        setProjects((prev) => [...prev, created]);
        showToast("success", "New project created successfully!");
      }
      setIsProjectModalOpen(false);
      setEditingProject(null);
    } catch (err: any) {
      showToast("error", err?.message || "Failed to save project");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteProject = async (id?: string) => {
    if (!id || !confirm("Are you sure you want to delete this project?")) return;
    try {
      if (!id.startsWith("static-")) {
        await deleteProject(id);
      }
      setProjects((prev) => prev.filter((p) => p.id !== id));
      showToast("success", "Project deleted.");
    } catch (err: any) {
      showToast("error", err?.message || "Failed to delete project");
    }
  };

  // ==========================================
  // EXPERIENCE CRUD HANDLERS
  // ==========================================
  const handleSaveExperience = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingExperience) return;
    setSaving(true);

    try {
      if (editingExperience.id && !editingExperience.id.startsWith("static-")) {
        const updated = await updateExperience(editingExperience.id, editingExperience);
        setExperiences((prev) => prev.map((exp) => (exp.id === updated.id ? updated : exp)));
        showToast("success", "Experience updated!");
      } else {
        const { id, ...newExpData } = editingExperience;
        const created = await createExperience({
          ...newExpData,
          order_index: experiences.length,
        });
        setExperiences((prev) => [...prev, created]);
        showToast("success", "New experience added!");
      }
      setIsExperienceModalOpen(false);
      setEditingExperience(null);
    } catch (err: any) {
      showToast("error", err?.message || "Failed to save experience");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteExperience = async (id?: string) => {
    if (!id || !confirm("Are you sure you want to delete this experience?")) return;
    try {
      if (!id.startsWith("static-")) {
        await deleteExperience(id);
      }
      setExperiences((prev) => prev.filter((e) => e.id !== id));
      showToast("success", "Experience deleted.");
    } catch (err: any) {
      showToast("error", err?.message || "Failed to delete experience");
    }
  };

  // ==========================================
  // SKILL CRUD HANDLERS
  // ==========================================
  const handleSaveSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSkill) return;
    setSaving(true);

    try {
      if (editingSkill.id && !editingSkill.id.startsWith("static-")) {
        const updated = await updateSkill(editingSkill.id, editingSkill);
        setSkills((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
        showToast("success", "Skill updated!");
      } else {
        const { id, ...newSkillData } = editingSkill;
        const created = await createSkill({
          ...newSkillData,
          order_index: skills.length,
        });
        setSkills((prev) => [...prev, created]);
        showToast("success", "New skill added!");
      }
      setIsSkillModalOpen(false);
      setEditingSkill(null);
    } catch (err: any) {
      showToast("error", err?.message || "Failed to save skill");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteSkill = async (id?: string) => {
    if (!id || !confirm("Are you sure you want to delete this skill?")) return;
    try {
      if (!id.startsWith("static-")) {
        await deleteSkill(id);
      }
      setSkills((prev) => prev.filter((s) => s.id !== id));
      showToast("success", "Skill deleted.");
    } catch (err: any) {
      showToast("error", err?.message || "Failed to delete skill");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-slate-950 text-slate-100">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-3 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin" />
          <p className="text-sm text-slate-400">Loading Portfolio Management Portal...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Top Navbar */}
      <header className="h-16 border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md sticky top-0 z-30 px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center shadow-md shadow-cyan-500/20">
            <Layers className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-tight text-white leading-none">Admin Control Center</h1>
            <p className="text-xs text-slate-400 mt-0.5">Dharani Kumar J • Portfolio 2026</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 text-xs text-slate-300 flex items-center gap-1.5 transition-colors"
          >
            <span>Live Portfolio</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <button
            onClick={handleSignOut}
            className="px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-xs text-red-400 flex items-center gap-1.5 transition-colors border border-red-500/20"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {/* Notification Toast */}
      {notification && (
        <div className="fixed top-20 right-6 z-50">
          <div
            className={`px-4 py-3 rounded-xl shadow-xl flex items-center gap-2.5 text-sm backdrop-blur-md border ${
              notification.type === "success"
                ? "bg-emerald-950/80 border-emerald-500/40 text-emerald-300"
                : "bg-red-950/80 border-red-500/40 text-red-300"
            }`}
          >
            {notification.type === "success" ? (
              <Check className="w-4 h-4 text-emerald-400" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-400" />
            )}
            <span>{notification.message}</span>
          </div>
        </div>
      )}

      {/* Main Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-6 md:p-8 flex flex-col md:flex-row gap-8">
        {/* Sidebar Navigation */}
        <aside className="w-full md:w-64 flex-shrink-0 space-y-1.5">
          <button
            onClick={() => setActiveTab("profile")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
              activeTab === "profile"
                ? "bg-gradient-to-r from-cyan-500/15 to-indigo-500/15 text-cyan-400 border border-cyan-500/30 shadow-sm"
                : "text-slate-400 hover:text-white hover:bg-slate-900/60"
            }`}
          >
            <User className="w-4 h-4" />
            <span>Profile & Resume</span>
          </button>

          <button
            onClick={() => setActiveTab("projects")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
              activeTab === "projects"
                ? "bg-gradient-to-r from-cyan-500/15 to-indigo-500/15 text-cyan-400 border border-cyan-500/30 shadow-sm"
                : "text-slate-400 hover:text-white hover:bg-slate-900/60"
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <div className="flex items-center justify-between flex-1">
              <span>Projects</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                {projects.length}
              </span>
            </div>
          </button>

          <button
            onClick={() => setActiveTab("experience")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
              activeTab === "experience"
                ? "bg-gradient-to-r from-cyan-500/15 to-indigo-500/15 text-cyan-400 border border-cyan-500/30 shadow-sm"
                : "text-slate-400 hover:text-white hover:bg-slate-900/60"
            }`}
          >
            <Layers className="w-4 h-4" />
            <div className="flex items-center justify-between flex-1">
              <span>Experience</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                {experiences.length}
              </span>
            </div>
          </button>

          <button
            onClick={() => setActiveTab("skills")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
              activeTab === "skills"
                ? "bg-gradient-to-r from-cyan-500/15 to-indigo-500/15 text-cyan-400 border border-cyan-500/30 shadow-sm"
                : "text-slate-400 hover:text-white hover:bg-slate-900/60"
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <div className="flex items-center justify-between flex-1">
              <span>Skills & Tech</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                {skills.length}
              </span>
            </div>
          </button>
        </aside>

        {/* Content Area */}
        <main className="flex-1 min-w-0">
          {/* ========================================== */}
          {/* TAB 1: PROFILE & RESUME */}
          {/* ========================================== */}
          {activeTab === "profile" && (
            <div className="bg-slate-900/50 border border-slate-800/80 rounded-2xl p-6 md:p-8 backdrop-blur-sm space-y-8">
              <div>
                <h2 className="text-xl font-bold text-white">Profile & Identity</h2>
                <p className="text-sm text-slate-400 mt-1">
                  Manage your personal details, bio, avatar image, and resume PDF asset.
                </p>
              </div>

              {/* Assets Upload Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-xl bg-slate-950/50 border border-slate-800">
                {/* Profile Pic Upload */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-3">
                    Profile Picture
                  </label>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-slate-800 overflow-hidden border border-slate-700 flex-shrink-0 flex items-center justify-center">
                      {profile.avatar_url ? (
                        <img
                          src={profile.avatar_url}
                          alt="Avatar"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <ImageIcon className="w-8 h-8 text-slate-500" />
                      )}
                    </div>
                    <div>
                      <label className="cursor-pointer inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-medium text-white transition-colors">
                        <Upload className="w-3.5 h-3.5" />
                        <span>{uploadingAvatar ? "Uploading..." : "Upload New Photo"}</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleAvatarUpload}
                          disabled={uploadingAvatar}
                        />
                      </label>
                      <p className="text-[11px] text-slate-500 mt-1.5">PNG, JPG or WebP (max 5MB)</p>
                    </div>
                  </div>
                </div>

                {/* Resume PDF Upload */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-3">
                    Resume Document (PDF)
                  </label>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center border border-slate-700 flex-shrink-0">
                      <FileText className="w-8 h-8 text-cyan-400" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <label className="cursor-pointer inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-medium text-white transition-colors">
                          <Upload className="w-3.5 h-3.5" />
                          <span>{uploadingResume ? "Uploading..." : "Upload PDF Resume"}</span>
                          <input
                            type="file"
                            accept=".pdf"
                            className="hidden"
                            onChange={handleResumeUpload}
                            disabled={uploadingResume}
                          />
                        </label>
                        {profile.resume_url && (
                          <a
                            href={profile.resume_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs transition-colors"
                            title="View current resume"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1.5">Uploaded directly to Supabase CDN</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSaveProfile} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={profile.full_name}
                      onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                      className="w-full bg-slate-950/60 border border-slate-800 rounded-xl py-2.5 px-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                      Headline Role
                    </label>
                    <input
                      type="text"
                      required
                      value={profile.role}
                      onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                      className="w-full bg-slate-950/60 border border-slate-800 rounded-xl py-2.5 px-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                      Contact Email
                    </label>
                    <input
                      type="email"
                      required
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      className="w-full bg-slate-950/60 border border-slate-800 rounded-xl py-2.5 px-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      value={profile.phone || ""}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      className="w-full bg-slate-950/60 border border-slate-800 rounded-xl py-2.5 px-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      value={profile.location || ""}
                      onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                      className="w-full bg-slate-950/60 border border-slate-800 rounded-xl py-2.5 px-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                      GitHub URL
                    </label>
                    <input
                      type="url"
                      value={profile.github_url || ""}
                      onChange={(e) => setProfile({ ...profile, github_url: e.target.value })}
                      className="w-full bg-slate-950/60 border border-slate-800 rounded-xl py-2.5 px-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                      LinkedIn URL
                    </label>
                    <input
                      type="url"
                      value={profile.linkedin_url || ""}
                      onChange={(e) => setProfile({ ...profile, linkedin_url: e.target.value })}
                      className="w-full bg-slate-950/60 border border-slate-800 rounded-xl py-2.5 px-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                      Professional Bio (Long Description)
                    </label>
                    <textarea
                      rows={4}
                      value={profile.bio}
                      onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                      className="w-full bg-slate-950/60 border border-slate-800 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-slate-800">
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-medium text-sm flex items-center gap-2 shadow-lg shadow-cyan-500/20 active:scale-[0.98] transition-all disabled:opacity-50"
                  >
                    {saving ? "Saving..." : "Save Profile Changes"}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* ========================================== */}
          {/* TAB 2: PROJECTS CRUD */}
          {/* ========================================== */}
          {activeTab === "projects" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white">Projects Management</h2>
                  <p className="text-sm text-slate-400 mt-1">
                    Add, edit, and organize projects shown on your live portfolio.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setEditingProject({
                      name: "",
                      description: "",
                      url: "",
                      image_url: "",
                      gradient: ["#0b2b1a", "#10b981"],
                      tech: ["python", "git"],
                    });
                    setIsProjectModalOpen(true);
                  }}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-medium text-xs flex items-center gap-2 shadow-md shadow-cyan-500/20"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Project</span>
                </button>
              </div>

              {/* Projects List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projects.map((proj) => (
                  <div
                    key={proj.id}
                    className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 flex flex-col justify-between group hover:border-slate-700 transition-all"
                  >
                    <div>
                      {proj.image_url && (
                        <div className="w-full h-36 rounded-xl bg-slate-800 overflow-hidden mb-4 border border-slate-700/50">
                          <img
                            src={proj.image_url}
                            alt={proj.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <h3 className="font-semibold text-white text-base">{proj.name}</h3>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-2">{proj.description}</p>

                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {proj.tech?.map((t) => (
                          <span
                            key={t}
                            className="px-2 py-0.5 rounded-md bg-slate-800/80 text-[11px] text-cyan-300 font-mono"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-800/80">
                      <a
                        href={proj.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-slate-400 hover:text-cyan-400 flex items-center gap-1"
                      >
                        <span>Preview</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setEditingProject(proj);
                            setIsProjectModalOpen(true);
                          }}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteProject(proj.id)}
                          className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors border border-red-500/20"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================== */}
          {/* TAB 3: EXPERIENCE CRUD */}
          {/* ========================================== */}
          {activeTab === "experience" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white">Experience Timeline</h2>
                  <p className="text-sm text-slate-400 mt-1">Manage your career and education milestones.</p>
                </div>
                <button
                  onClick={() => {
                    setEditingExperience({
                      company: "",
                      role: "",
                      period: "",
                      description: [""],
                    });
                    setIsExperienceModalOpen(true);
                  }}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-medium text-xs flex items-center gap-2 shadow-md shadow-cyan-500/20"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Experience</span>
                </button>
              </div>

              <div className="space-y-4">
                {experiences.map((exp) => (
                  <div
                    key={exp.id}
                    className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 flex flex-col md:flex-row md:items-start justify-between gap-4"
                  >
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="font-bold text-white text-base">{exp.role}</h3>
                        <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-mono">
                          {exp.period}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-slate-300">{exp.company}</p>
                      <ul className="list-disc list-inside text-xs text-slate-400 space-y-1 mt-2">
                        {exp.description.map((desc, i) => (
                          <li key={i}>{desc}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button
                        onClick={() => {
                          setEditingExperience(exp);
                          setIsExperienceModalOpen(true);
                        }}
                        className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteExperience(exp.id)}
                        className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors border border-red-500/20"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================== */}
          {/* TAB 4: SKILLS CRUD */}
          {/* ========================================== */}
          {activeTab === "skills" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white">Skills & Technologies</h2>
                  <p className="text-sm text-slate-400 mt-1">Manage technical proficiencies and categories.</p>
                </div>
                <button
                  onClick={() => {
                    setEditingSkill({
                      name: "",
                      label: "",
                      category: "Languages & Core",
                      short_description: "",
                      icon_url: "/assets/tech/python.png",
                      color: "#3776AB",
                    });
                    setIsSkillModalOpen(true);
                  }}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-medium text-xs flex items-center gap-2 shadow-md shadow-cyan-500/20"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Skill</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {skills.map((skill) => (
                  <div
                    key={skill.id}
                    className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      {skill.icon_url && (
                        <img src={skill.icon_url} alt={skill.label} className="w-8 h-8 object-contain" />
                      )}
                      <div>
                        <h4 className="font-semibold text-white text-sm">{skill.label}</h4>
                        <p className="text-[11px] text-slate-400">{skill.category}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => {
                          setEditingSkill(skill);
                          setIsSkillModalOpen(true);
                        }}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteSkill(skill.id)}
                        className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ========================================== */}
      {/* MODAL: PROJECT EDIT / CREATE */}
      {/* ========================================== */}
      {isProjectModalOpen && editingProject && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-white mb-4">
              {editingProject.id ? "Edit Project" : "Add New Project"}
            </h3>

            <form onSubmit={handleSaveProject} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300 mb-1.5">
                  Project Title
                </label>
                <input
                  type="text"
                  required
                  value={editingProject.name}
                  onChange={(e) => setEditingProject({ ...editingProject, name: e.target.value })}
                  placeholder="e.g. SmartFarm AI"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300 mb-1.5">
                  Project Screenshot / Preview Image
                </label>
                <div className="flex items-center gap-3">
                  {editingProject.image_url && (
                    <img
                      src={editingProject.image_url}
                      alt="Preview"
                      className="w-16 h-12 object-cover rounded-lg border border-slate-700"
                    />
                  )}
                  <label className="cursor-pointer px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-medium text-white flex items-center gap-2">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{uploadingProjectImage ? "Uploading..." : "Upload Image"}</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        setUploadingProjectImage(true);
                        const { url, error } = await uploadPortfolioAsset(file, "projects");
                        setUploadingProjectImage(false);
                        if (error || !url) {
                          showToast("error", error || "Upload failed");
                        } else {
                          setEditingProject({ ...editingProject, image_url: url });
                          showToast("success", "Screenshot uploaded!");
                        }
                      }}
                      disabled={uploadingProjectImage}
                    />
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300 mb-1.5">
                  Description
                </label>
                <textarea
                  rows={3}
                  required
                  value={editingProject.description}
                  onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300 mb-1.5">
                  Project URL / Live Link
                </label>
                <input
                  type="url"
                  required
                  value={editingProject.url}
                  onChange={(e) => setEditingProject({ ...editingProject, url: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300 mb-1.5">
                  Tech Stack (comma separated)
                </label>
                <input
                  type="text"
                  value={editingProject.tech?.join(", ") || ""}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      tech: e.target.value.split(",").map((t) => t.trim()).filter(Boolean),
                    })
                  }
                  placeholder="python, scikit-learn, render"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-sm text-white"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsProjectModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-white text-xs font-medium shadow-md shadow-cyan-500/20"
                >
                  {saving ? "Saving..." : "Save Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* MODAL: EXPERIENCE EDIT / CREATE */}
      {/* ========================================== */}
      {isExperienceModalOpen && editingExperience && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-white mb-4">
              {editingExperience.id ? "Edit Experience" : "Add Experience"}
            </h3>

            <form onSubmit={handleSaveExperience} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300 mb-1.5">
                  Company / Organization
                </label>
                <input
                  type="text"
                  required
                  value={editingExperience.company}
                  onChange={(e) => setEditingExperience({ ...editingExperience, company: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300 mb-1.5">
                  Role Title
                </label>
                <input
                  type="text"
                  required
                  value={editingExperience.role}
                  onChange={(e) => setEditingExperience({ ...editingExperience, role: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300 mb-1.5">
                  Period / Duration
                </label>
                <input
                  type="text"
                  required
                  value={editingExperience.period}
                  onChange={(e) => setEditingExperience({ ...editingExperience, period: e.target.value })}
                  placeholder="e.g. June 2024 - Present"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300 mb-1.5">
                  Description Points (one per line)
                </label>
                <textarea
                  rows={4}
                  required
                  value={editingExperience.description?.join("\n") || ""}
                  onChange={(e) =>
                    setEditingExperience({
                      ...editingExperience,
                      description: e.target.value.split("\n").filter(Boolean),
                    })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-sm text-white"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsExperienceModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-white text-xs font-medium"
                >
                  {saving ? "Saving..." : "Save Experience"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* MODAL: SKILL EDIT / CREATE */}
      {/* ========================================== */}
      {isSkillModalOpen && editingSkill && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-4">
              {editingSkill.id ? "Edit Skill" : "Add Skill"}
            </h3>

            <form onSubmit={handleSaveSkill} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300 mb-1.5">
                  Skill Label
                </label>
                <input
                  type="text"
                  required
                  value={editingSkill.label}
                  onChange={(e) =>
                    setEditingSkill({
                      ...editingSkill,
                      label: e.target.value,
                      name: editingSkill.name || e.target.value.toLowerCase().replace(/\s+/g, ""),
                    })
                  }
                  placeholder="e.g. PyTorch"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300 mb-1.5">
                  Category
                </label>
                <select
                  value={editingSkill.category}
                  onChange={(e) => setEditingSkill({ ...editingSkill, category: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-sm text-white"
                >
                  <option value="Languages & Core">Languages & Core</option>
                  <option value="AI, ML & Data Science">AI, ML & Data Science</option>
                  <option value="Tools & Platforms">Tools & Platforms</option>
                  <option value="DevOps & Cloud">DevOps & Cloud</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300 mb-1.5">
                  Icon URL / Asset Path
                </label>
                <input
                  type="text"
                  value={editingSkill.icon_url || ""}
                  onChange={(e) => setEditingSkill({ ...editingSkill, icon_url: e.target.value })}
                  placeholder="/assets/tech/python.png"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300 mb-1.5">
                  Short Description
                </label>
                <input
                  type="text"
                  value={editingSkill.short_description || ""}
                  onChange={(e) => setEditingSkill({ ...editingSkill, short_description: e.target.value })}
                  placeholder="Neural networks & deep learning pipelines 🧠"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-sm text-white"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsSkillModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-white text-xs font-medium"
                >
                  {saving ? "Saving..." : "Save Skill"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
