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
import { Card3D } from "../ui/card-3d";
import { SkillDefs, SKILL_SVGS } from "./skill-planet-icons";

const CATEGORIES: { label: string; value: "All" | SkillCategory; icon: React.ReactNode }[] = [
  { label: "All Skills", value: "All", icon: <Sparkles className="w-3.5 h-3.5" /> },
  { label: "Languages & Core", value: "Languages & Core", icon: <Terminal className="w-3.5 h-3.5" /> },
  { label: "AI & Data Science", value: "AI, ML & Data Science", icon: <Cpu className="w-3.5 h-3.5" /> },
  { label: "Tools & Platforms", value: "Tools & Platforms", icon: <Wrench className="w-3.5 h-3.5" /> },
  { label: "DevOps & Cloud", value: "DevOps & Cloud", icon: <Cloud className="w-3.5 h-3.5" /> },
];

const SkillsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<"All" | SkillCategory>("All");
  const [selectedSkill, setSelectedSkill] = useState<Skill>(SKILLS[SkillNames.JS]);

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
    setTimeout(() => {
      playReleaseSound();
    }, 120);

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

  const getCategoryShort = (cat: SkillCategory) => {
    if (cat === "AI, ML & Data Science") return "AI / ML";
    if (cat === "Languages & Core") return "Core";
    if (cat === "Tools & Platforms") return "Tool";
    return "Cloud";
  };

  return (
    <SectionWrapper
      id="skills"
      className="relative w-full min-h-[100dvh] flex flex-col justify-start items-center py-20 pointer-events-auto z-10 overflow-hidden"
    >
      <SkillDefs />

      <div className="w-full max-w-6xl px-4 md:px-8 mx-auto flex flex-col items-center relative z-10">
        <SectionHeader
          id="skills"
          eyebrow="Cosmic Orbit"
          title="Tech Stack & Skills"
          desc="Interactive celestial planet spheres — click or hover any sphere to inspect full architecture details"
          className="mb-8"
        />

        {/* Category Filter Pills */}
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
                  "flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-body font-semibold whitespace-nowrap transition-all duration-200",
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
          <div className="w-full max-w-2xl mb-10 z-20">
            <Card3D maxTilt={6} depth={10} className="border border-cyan-500/30 bg-slate-950/85 backdrop-blur-xl p-5 overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.15)]">
              <div
                className="absolute inset-0 pointer-events-none opacity-20"
                style={{
                  background: `radial-gradient(circle at 10% 50%, ${selectedSkill.color}, transparent 60%)`,
                }}
              />
              <div className="flex items-center gap-4 relative z-10">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center p-3 shadow-[0_8px_20px_rgba(0,0,0,0.6),inset_0_0_16px_rgba(255,255,255,0.2)] border border-cyan-400/40 shrink-0 transition-transform duration-300 bg-gradient-to-br from-cyan-950/70 to-slate-950/90"
                  style={{
                    boxShadow: `0 0 24px ${selectedSkill.color}40, inset 0 0 16px ${selectedSkill.color}30`,
                    transform: "translateZ(14px)",
                  }}
                >
                  {SKILL_SVGS[selectedSkill.label] ? (
                    <div
                      className="w-8 h-8 flex items-center justify-center"
                      style={{ color: SKILL_SVGS[selectedSkill.label].color }}
                    >
                      {SKILL_SVGS[selectedSkill.label].svg}
                    </div>
                  ) : (
                    <Image
                      src={selectedSkill.icon}
                      alt={selectedSkill.label}
                      width={40}
                      height={40}
                      className="w-full h-full object-contain filter drop-shadow-md"
                      unoptimized
                    />
                  )}
                </div>
                <div className="flex-1 min-w-0" style={{ transform: "translateZ(10px)" }}>
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h3 className="text-card-heading font-heading font-semibold tracking-[-0.01em] text-white">
                      {selectedSkill.label}
                    </h3>
                    <Badge
                      variant="outline"
                      className="text-[11px] uppercase font-mono font-medium tracking-[0.02em] px-2.5 py-0.5 border-cyan-500/40 text-cyan-300 bg-cyan-950/60 shadow-sm"
                    >
                      {selectedSkill.category}
                    </Badge>
                    <span className="text-[11px] text-cyan-400 font-mono tracking-[0.02em] ml-auto flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping shadow-[0_0_8px_#22d3ee]" />
                      Orbital Focus
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm font-body text-slate-300/85 leading-relaxed max-w-[65ch]">
                    {selectedSkill.shortDescription}
                  </p>
                </div>
              </div>
            </Card3D>
          </div>
        )}

        {/* Planet Spheres Celestial Stage */}
        <div className="skills-stage relative w-full pt-4 pb-20 flex flex-col items-center justify-center [contain:layout_style]">
          {/* Planet Orbit Rows */}
          <div className="planet-rows w-full">
            <div className="planet-row">
              {filteredSkills.map((skill, index) => {
                const isSelected = selectedSkill?.name === skill.name;
                const iconData = SKILL_SVGS[skill.label];

                return (
                  <div
                    key={skill.id}
                    className={cn("planet-cell", isSelected && "cell-active")}
                    style={{ "--i": index } as React.CSSProperties}
                  >
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() => handleSkillClick(skill)}
                      onMouseEnter={() => handleSkillHover(skill)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          handleSkillClick(skill);
                        }
                      }}
                      className={cn(
                        "planet-orb group",
                        isSelected && "orb-active"
                      )}
                      style={
                        isSelected
                          ? ({
                              boxShadow: `0 0 0 1.5px rgba(110,235,255,0.95), 0 0 34px ${skill.color}80, 0 0 85px ${skill.color}50, inset 0 0 28px rgba(110,240,255,0.7), inset 0 -20px 30px rgba(8,50,120,0.6)`,
                            } as React.CSSProperties)
                          : undefined
                      }
                      aria-label={`${skill.label} - ${skill.category}`}
                    >
                      {/* Icon */}
                      <span
                        className="planet-ic transition-transform duration-300 group-hover:scale-110"
                        style={{ color: iconData ? iconData.color : skill.color }}
                      >
                        {iconData ? (
                          iconData.svg
                        ) : (
                          <Image
                            src={skill.icon}
                            alt={skill.label}
                            width={32}
                            height={32}
                            className="w-full h-full object-contain"
                            unoptimized
                          />
                        )}
                      </span>

                      {/* Title */}
                      <b title={skill.label}>{skill.label}</b>

                      {/* Category Subtitle */}
                      <em>{getCategoryShort(skill.category)}</em>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Perspective Floor Grid & Luminous Orbit Rings */}
          <div className="skills-floor" />
          <div className="skills-ring" />
        </div>
      </div>
    </SectionWrapper>
  );
};

export default SkillsSection;
