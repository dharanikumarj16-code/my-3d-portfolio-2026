"use client";

import React, { useState, useEffect } from "react";
import SectionWrapper from "../ui/section-wrapper";
import { SectionHeader } from "./section-header";
import { SKILLS, Skill, SkillCategory, SkillNames } from "@/data/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { Sparkles, Terminal, Cpu, Wrench, Cloud } from "lucide-react";
import { useSounds } from "@/hooks/use-sounds";

const CATEGORIES: { label: string; value: "All" | SkillCategory; icon: React.ReactNode }[] = [
  { label: "All Skills", value: "All", icon: <Sparkles className="w-3.5 h-3.5" /> },
  { label: "Languages & Core", value: "Languages & Core", icon: <Terminal className="w-3.5 h-3.5" /> },
  { label: "AI & Data Science", value: "AI, ML & Data Science", icon: <Cpu className="w-3.5 h-3.5" /> },
  { label: "Tools & Platforms", value: "Tools & Platforms", icon: <Wrench className="w-3.5 h-3.5" /> },
  { label: "DevOps & Cloud", value: "DevOps & Cloud", icon: <Cloud className="w-3.5 h-3.5" /> },
];

const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState<"All" | SkillCategory>("All");
  const [selectedSkill, setSelectedSkill] = useState<Skill>(SKILLS[SkillNames.JS]);
  const [isPressing, setIsPressing] = useState<string | null>(null);

  const { playPressSound, playReleaseSound } = useSounds();

  // Listen to 3D keyboard interactions from the Spline background (if present)
  useEffect(() => {
    const handleSplineSkillSelect = (e: any) => {
      if (e.detail?.skill) {
        setSelectedSkill(e.detail.skill);
      }
    };
    window.addEventListener("spline-skill-selected", handleSplineSkillSelect);
    return () => window.removeEventListener("spline-skill-selected", handleSplineSkillSelect);
  }, []);

  const handleSkillClick = (skill: Skill) => {
    playPressSound();
    setSelectedSkill(skill);
    setIsPressing(skill.name);
    setTimeout(() => {
      setIsPressing(null);
      playReleaseSound();
    }, 200);

    // Dispatch custom event if any listeners are registered
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("trigger-skill", {
          detail: { skillName: skill.name },
        })
      );
    }
  };

  const handleSkillHover = (skill: Skill) => {
    if (selectedSkill?.name !== skill.name) {
      playPressSound();
      setSelectedSkill(skill);
    }
  };

  const skillsList = Object.values(SKILLS);
  const filteredSkills =
    activeCategory === "All"
      ? skillsList
      : skillsList.filter((s) => s.category === activeCategory);

  return (
    <SectionWrapper
      id="skills"
      className="relative w-full min-h-[100dvh] flex flex-col justify-start items-center py-20 pointer-events-auto z-10"
    >
      <div className="w-full max-w-5xl px-4 md:px-8 mx-auto flex flex-col items-center">
        <SectionHeader
          id="skills"
          title="Tech Stack & Skills"
          desc="Interactive technical skill stack — click or hover any skill to inspect full details and trigger tactile responses"
          className="mb-8"
        />

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8 z-20">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.value;
            return (
              <button
                key={cat.value}
                onClick={() => {
                  playPressSound();
                  setActiveCategory(cat.value);
                }}
                className={cn(
                  "flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-300",
                  "border backdrop-blur-md cursor-pointer",
                  isActive
                    ? "bg-cyan-500/15 text-cyan-300 border-cyan-500/50 shadow-lg shadow-cyan-500/10 scale-105"
                    : "bg-slate-900/60 hover:bg-slate-900/90 text-slate-400 hover:text-slate-200 border-slate-800/80 hover:border-slate-700"
                )}
              >
                {cat.icon}
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Active Skill HUD Card */}
        {selectedSkill && (
          <div className="w-full max-w-2xl mb-8 p-4 md:p-5 rounded-2xl border border-slate-800/90 bg-slate-950/80 backdrop-blur-xl shadow-2xl transition-all duration-300 flex items-center gap-4 z-20 group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-transparent pointer-events-none" />
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center p-2.5 shadow-inner border border-white/10 shrink-0 transition-transform group-hover:scale-105"
              style={{ backgroundColor: `${selectedSkill.color}25` }}
            >
              <Image
                src={selectedSkill.icon}
                alt={selectedSkill.label}
                width={40}
                height={40}
                className="w-full h-full object-contain"
                unoptimized
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <h3 className="text-lg md:text-xl font-bold tracking-tight text-white">
                  {selectedSkill.label}
                </h3>
                <Badge
                  variant="outline"
                  className="text-[10px] uppercase font-mono px-2 py-0 border-cyan-500/30 text-cyan-400 bg-cyan-950/40"
                >
                  {selectedSkill.category}
                </Badge>
                <span className="text-[11px] text-emerald-400 font-mono ml-auto flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Active Skill
                </span>
              </div>
              <p className="text-xs md:text-sm text-slate-300 leading-snug">
                {selectedSkill.shortDescription}
              </p>
            </div>
          </div>
        )}

        {/* Interactive Skills Grid */}
        <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 z-20">
          {filteredSkills.map((skill) => {
            const isSelected = selectedSkill?.name === skill.name;
            const isItemPressing = isPressing === skill.name;

            return (
              <button
                key={skill.id}
                onClick={() => handleSkillClick(skill)}
                onMouseEnter={() => handleSkillHover(skill)}
                onMouseLeave={() => playReleaseSound()}
                className={cn(
                  "group relative flex flex-col items-center justify-center p-3.5 rounded-xl border text-center transition-all duration-200",
                  "backdrop-blur-md cursor-pointer select-none active:scale-95",
                  isSelected
                    ? "border-cyan-500 bg-cyan-950/30 text-white shadow-lg shadow-cyan-500/15 -translate-y-1"
                    : "border-slate-800/80 bg-slate-900/50 hover:bg-slate-900/80 hover:border-slate-700 hover:-translate-y-0.5 text-slate-300",
                  isItemPressing && "scale-95 translate-y-0.5"
                )}
                style={{
                  boxShadow: isSelected ? `0 0 20px ${skill.color}35` : undefined,
                }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center p-1.5 mb-2 transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${skill.color}15` }}
                >
                  <Image
                    src={skill.icon}
                    alt={skill.label}
                    width={32}
                    height={32}
                    className="w-full h-full object-contain"
                    unoptimized
                  />
                </div>
                <span className="text-xs font-semibold text-white line-clamp-1 w-full">
                  {skill.label}
                </span>
                <span className="text-[10px] text-slate-400 font-mono mt-0.5">
                  {skill.category === "AI, ML & Data Science"
                    ? "AI / ML"
                    : skill.category === "Languages & Core"
                    ? "Core"
                    : skill.category === "Tools & Platforms"
                    ? "Tool"
                    : "Cloud"}
                </span>

                {isSelected && (
                  <span
                    className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full animate-ping"
                    style={{ backgroundColor: skill.color }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default SkillsSection;
