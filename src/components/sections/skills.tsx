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
import { Tile3D } from "../ui/tile-3d";
import { Card3D } from "../ui/card-3d";

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

        {/* Category Filter Pills with 3D Pill depth */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-8 z-20">
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
                  "flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200",
                  "border cursor-pointer select-none",
                  "shadow-[0_4px_12px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.15)]",
                  "active:translate-y-0.5 active:shadow-[0_2px_4px_rgba(0,0,0,0.7)]",
                  isActive
                    ? "bg-cyan-500/20 text-cyan-200 border-cyan-400 shadow-[0_6px_20px_rgba(6,182,212,0.3),inset_0_1px_0_rgba(255,255,255,0.3)] scale-105"
                    : "bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border-slate-700/80 hover:border-slate-600 hover:-translate-y-0.5"
                )}
              >
                {cat.icon}
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Active Skill HUD Card in 3D */}
        {selectedSkill && (
          <div className="w-full max-w-2xl mb-8 z-20">
            <Card3D maxTilt={6} depth={10} className="border border-slate-800/90 bg-slate-950/85 backdrop-blur-xl p-5 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-transparent pointer-events-none" />
              <div className="flex items-center gap-4 relative z-10">
                <div
                  className="w-16 h-16 rounded-xl flex items-center justify-center p-3 shadow-[0_8px_16px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.2)] border border-white/10 shrink-0 transition-transform duration-300"
                  style={{
                    backgroundColor: `${selectedSkill.color}25`,
                    transform: "translateZ(14px)",
                  }}
                >
                  <Image
                    src={selectedSkill.icon}
                    alt={selectedSkill.label}
                    width={44}
                    height={44}
                    className="w-full h-full object-contain filter drop-shadow-md"
                    unoptimized
                  />
                </div>
                <div className="flex-1 min-w-0" style={{ transform: "translateZ(10px)" }}>
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h3 className="text-lg md:text-xl font-bold tracking-tight text-white">
                      {selectedSkill.label}
                    </h3>
                    <Badge
                      variant="outline"
                      className="text-[10px] uppercase font-mono px-2.5 py-0.5 border-cyan-500/30 text-cyan-300 bg-cyan-950/50 shadow-sm"
                    >
                      {selectedSkill.category}
                    </Badge>
                    <span className="text-[11px] text-emerald-400 font-mono ml-auto flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
                      Active 3D Tile
                    </span>
                  </div>
                  <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                    {selectedSkill.shortDescription}
                  </p>
                </div>
              </div>
            </Card3D>
          </div>
        )}

        {/* Interactive Floating 3D Skills Grid */}
        <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5 z-20">
          {filteredSkills.map((skill) => {
            const isSelected = selectedSkill?.name === skill.name;

            return (
              <Tile3D
                key={skill.id}
                glowColor={skill.color}
                isActive={isSelected}
                onClick={() => handleSkillClick(skill)}
                onMouseEnter={() => handleSkillHover(skill)}
                onMouseLeave={() => playReleaseSound()}
              >
                <div
                  className="w-11 h-11 rounded-lg flex items-center justify-center p-2 mb-2 transition-transform duration-300 group-hover:scale-110"
                  style={{
                    backgroundColor: `${skill.color}18`,
                    transform: "translateZ(12px)",
                  }}
                >
                  <Image
                    src={skill.icon}
                    alt={skill.label}
                    width={32}
                    height={32}
                    className="w-full h-full object-contain filter drop-shadow"
                    unoptimized
                  />
                </div>
                <span
                  className="text-xs font-semibold text-white line-clamp-1 w-full"
                  style={{ transform: "translateZ(8px)" }}
                >
                  {skill.label}
                </span>
                <span
                  className="text-[10px] text-slate-400 font-mono mt-0.5"
                  style={{ transform: "translateZ(6px)" }}
                >
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
              </Tile3D>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default SkillsSection;
