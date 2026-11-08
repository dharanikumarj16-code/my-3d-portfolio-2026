"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { SectionHeader } from "./section-header";
import { cn } from "@/lib/utils";
import { PROJECTS, SimpleProject } from "@/data/projects";
import { getProjects } from "@/lib/supabase/data-service";
import { ExternalLink, Sparkles, CheckCircle2 } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { Card3D } from "../ui/card-3d";

const imageExtensions: Record<string, string> = {
  smartfarm: "png",
  jiniz: "jpg",
  jarvis: "jpg",
  autosilentpro: "jpg",
};

const availableTechIcons: Record<string, string> = {
  python: "/assets/tech/python.svg",
  kotlin: "/assets/tech/kotlin.svg",
  git: "/assets/tech/git.svg",
  javascript: "/assets/tech/javascript.svg",
  typescript: "/assets/tech/typescript.svg",
  nextjs: "/assets/tech/nextjs.svg",
  react: "/assets/tech/react.svg",
  tailwindcss: "/assets/tech/tailwindcss.svg",
  firebase: "/assets/tech/firebase.svg",
  mongodb: "/assets/tech/mongodb.svg",
  numpy: "/assets/tech/numpy.png",
  colab: "/assets/tech/colab.png",
  cpp: "/assets/tech/cpp.png",
  huggingface: "/assets/tech/huggingface.png",
  render: "/assets/tech/render.png",
  sql: "/assets/tech/sql.png",
  seaborn: "/assets/tech/seaborn.png",
  vscode: "/assets/tech/vscode.png",
};

const ProjectsSection = () => {
  const [projectList, setProjectList] = useState<SimpleProject[]>(PROJECTS);

  useEffect(() => {
    getProjects()
      .then((data) => {
        if (data && data.length > 0) {
          // Merge with static metadata for rich highlights/links if not present in DB
          const enriched = data.map((dbProj, idx) => {
            const staticMatch = PROJECTS.find(
              (p) => p.name.toLowerCase() === dbProj.name.toLowerCase()
            ) || PROJECTS[idx % PROJECTS.length];

            return {
              ...staticMatch,
              ...dbProj,
              githubUrl: (dbProj as any).github_url || staticMatch?.githubUrl,
              liveUrl: (dbProj as any).live_url || dbProj.url || staticMatch?.liveUrl,
              highlights: staticMatch?.highlights || [
                "Production engineered for performance and scalability",
                "Full data processing and continuous deployment pipeline"
              ],
            };
          });
          setProjectList(enriched);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section
      id="projects"
      className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 z-10"
    >
      <SectionHeader
        id="projects"
        eyebrow="Engineering Showcase"
        title={
          <span>
            Featured <span className="bg-gradient-to-r from-cyan-400 to-teal-300 bg-clip-text text-transparent">AI Projects</span>
          </span>
        }
        desc="Production predictive pipelines, intelligent agents, and software systems designed to solve real-world problems."
      />

      {/* Responsive Projects Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
        {projectList.map((project, idx) => (
          <ProjectCard key={project.name + idx} project={project} index={idx} />
        ))}
      </div>
    </section>
  );
};

interface ProjectCardProps {
  project: SimpleProject;
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const imageSrc =
    project.imageKey
      ? `/assets/projects-screenshots/${project.imageKey}.${
          imageExtensions[project.imageKey] ?? "png"
        }`
      : (project as any).image_url || "/assets/projects-screenshots/jarvis.jpg";

  const liveUrl = project.liveUrl || project.url;
  const githubUrl = project.githubUrl || project.url;
  const hasLiveDemo = liveUrl && !liveUrl.includes("github.com");

  return (
    <Card3D
      maxTilt={8}
      depth={14}
      glare={true}
      className={cn(
        "group relative flex flex-col justify-between rounded-3xl overflow-hidden h-full",
        "bg-slate-900/75 border border-slate-800/90 hover:border-cyan-500/50",
        "shadow-[0_12px_30px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.12),inset_0_-1px_0_rgba(0,0,0,0.8)]",
        "backdrop-blur-xl"
      )}
    >
      {/* Top Ambient 3D Rim Glow */}
      <div
        className="absolute top-0 inset-x-0 h-1 pointer-events-none opacity-90"
        style={{
          background: `linear-gradient(90deg, ${project.gradient?.[0] || "#0891b2"}, ${
            project.gradient?.[1] || "#14b8a6"
          })`,
          transform: "translateZ(10px)",
        }}
      />

      <div>
        {/* Mockup Frame Header in 3D Relief */}
        <div
          className="flex items-center justify-between px-5 py-3 border-b border-slate-800/80 bg-slate-950/60 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
          style={{ transform: "translateZ(8px)" }}
        >
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 shadow-[0_0_6px_rgba(239,68,68,0.5)]" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 shadow-[0_0_6px_rgba(245,158,11,0.5)]" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 shadow-[0_0_6px_rgba(16,185,129,0.5)]" />
          </div>
          <span className="text-[11px] font-mono text-slate-400 truncate max-w-[180px]">
            {project.name.toLowerCase().replace(/[^a-z0-9]/g, "-")}.ai
          </span>
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_6px_#22d3ee]" />
        </div>

        {/* Project Screenshot Container with Depth */}
        <div
          className="relative w-full h-52 sm:h-56 bg-slate-950 overflow-hidden border-b border-slate-800/60"
          style={{ transform: "translateZ(6px)" }}
        >
          <Image
            src={imageSrc}
            alt={project.name}
            fill
            unoptimized={typeof imageSrc === "string" && imageSrc.startsWith("http")}
            className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          />
          {/* Subtle vignette gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent pointer-events-none" />

          {/* Floating 3D Status Badge */}
          <div
            className="absolute top-3 right-3 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/90 backdrop-blur-md border border-cyan-500/40 text-[11px] font-mono text-cyan-300 shadow-[0_4px_12px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.2)]"
            style={{ transform: "translateZ(14px)" }}
          >
            <Sparkles className="w-3 h-3 text-cyan-400" />
            <span>{hasLiveDemo ? "Live Deployment" : "Open Source"}</span>
          </div>
        </div>

        {/* Content Body with Parallax Depth */}
        <div className="p-6" style={{ transform: "translateZ(12px)" }}>
          <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors">
            {project.name}
          </h3>

          <p className="text-xs sm:text-sm text-slate-300 mt-2.5 leading-relaxed line-clamp-3">
            {project.description}
          </p>

          {/* Key Feature Highlights */}
          {project.highlights && project.highlights.length > 0 && (
            <ul className="mt-4 space-y-1.5 border-t border-slate-800/60 pt-4">
              {project.highlights.slice(0, 2).map((highlight, hIdx) => (
                <li
                  key={hIdx}
                  className="flex items-start gap-2 text-[12px] text-slate-200 leading-snug"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          )}

          {/* 3D Tech Stack Pills */}
          <div className="flex flex-wrap items-center gap-1.5 mt-5">
            {project.tech?.map((techName) => {
              const cleanTech = techName.toLowerCase().trim();
              const iconSrc = availableTechIcons[cleanTech];

              return (
                <span
                  key={techName}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800/90 border border-slate-700/80 text-[11px] font-mono text-cyan-200 shadow-[0_2px_4px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1)] transition-transform hover:-translate-y-0.5"
                  style={{ transform: "translateZ(6px)" }}
                >
                  {iconSrc && (
                    <img
                      src={iconSrc}
                      alt={techName}
                      className="w-3 h-3 object-contain"
                    />
                  )}
                  <span className="capitalize">{cleanTech}</span>
                </span>
              );
            })}
          </div>
        </div>
      </div>

      {/* Card Action Buttons with 3D tactile press */}
      <div
        className="p-6 pt-0 mt-2 flex items-center gap-3 relative z-20"
        style={{ transform: "translateZ(16px)" }}
      >
        {hasLiveDemo && (
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-[0_6px_16px_rgba(6,182,212,0.3),inset_0_1px_0_rgba(255,255,255,0.4),inset_0_-2px_0_rgba(0,0,0,0.3)] active:translate-y-0.5 active:shadow-[0_2px_4px_rgba(0,0,0,0.5)] transition-all cursor-pointer"
          >
            <span>Live Demo</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        )}

        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "py-2.5 px-4 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-100 font-semibold text-xs flex items-center justify-center gap-2 border border-slate-700/80 shadow-[0_4px_12px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.15),inset_0_-2px_0_rgba(0,0,0,0.4)] active:translate-y-0.5 active:shadow-[0_2px_4px_rgba(0,0,0,0.6)] transition-all cursor-pointer",
            hasLiveDemo ? "w-auto" : "flex-1"
          )}
          title="View GitHub Repository"
        >
          <SiGithub className="w-3.5 h-3.5" />
          <span>{hasLiveDemo ? "Code" : "View on GitHub"}</span>
        </a>
      </div>
    </Card3D>
  );
};

export default ProjectsSection;
