"use client";

import React, { useEffect, useState } from "react";
import { EXPERIENCE, SkillNames, SKILLS } from "@/data/constants";
import { getExperiences } from "@/lib/supabase/data-service";
import { SectionHeader } from "./section-header";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import SectionWrapper from "../ui/section-wrapper";
import { motion } from "framer-motion";
import { GraduationCap, Briefcase, Calendar, MapPin, Award, CheckCircle2 } from "lucide-react";
import { Card3D } from "../ui/card-3d";

const ExperienceSection = () => {
  const [experienceList, setExperienceList] = useState<any[]>(EXPERIENCE);

  useEffect(() => {
    getExperiences()
      .then((data) => {
        if (data && data.length > 0) {
          setExperienceList(data);
        }
      })
      .catch(() => { });
  }, []);

  return (
    <SectionWrapper
      id="experience"
      className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 z-10"
    >
      <SectionHeader
        id="experience"
        eyebrow="Milestones & Timeline"
        title={
          <span>
            Experience &amp; <span className="bg-gradient-to-r from-cyan-400 to-teal-300 bg-clip-text text-transparent">Education</span>
          </span>
        }
        desc="My academic foundation at SKCET and hands-on software & AI engineering track record."
      />

      {/* Timeline Container */}
      <div className="relative mt-12 pl-6 sm:pl-8 border-l border-slate-800/80 space-y-12">
        {/* Subtle Glowing Timeline Spine */}
        <div className="absolute top-0 bottom-0 left-[-1px] w-[2px] bg-gradient-to-b from-cyan-500 via-teal-500/50 to-transparent pointer-events-none" />

        {experienceList.map((exp, index) => {
          const isEducation =
            exp.title?.toLowerCase().includes("b.tech") ||
            exp.role?.toLowerCase().includes("b.tech") ||
            exp.company?.toLowerCase().includes("student");

          const roleTitle = exp.title || exp.role;
          const periodText = exp.period || `${exp.startDate} - ${exp.endDate}`;
          const descriptions = exp.description || [];

          return (
            <motion.div
              key={exp.id || index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative group"
            >
              {/* Timeline Pin Node */}
              <div
                className={cn(
                  "absolute -left-[37px] sm:-left-[45px] top-1.5 w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300",
                  "bg-slate-950 border-slate-700 group-hover:border-cyan-400 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                )}
              >
                {isEducation ? (
                  <GraduationCap className="w-4 h-4 text-cyan-400" />
                ) : (
                  <Briefcase className="w-4 h-4 text-teal-400" />
                )}
              </div>

              {/* Milestone Card in 3D */}
              <Card3D
                maxTilt={6}
                depth={12}
                glare={true}
                className="p-6 sm:p-8 rounded-3xl bg-slate-900/75 border border-slate-800/90 hover:border-cyan-500/50 backdrop-blur-xl shadow-[0_12px_30px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.12),inset_0_-1px_0_rgba(0,0,0,0.8)] transition-all duration-300"
              >
                {/* Header Row */}
                <div
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-4 border-b border-slate-800/60"
                  style={{ transform: "translateZ(8px)" }}
                >
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors">
                      {roleTitle}
                    </h3>
                    <div className="flex items-center gap-2 mt-1 text-xs sm:text-sm font-medium text-slate-300">
                      <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>{exp.company}</span>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/90 border border-slate-700/80 text-xs font-mono text-cyan-300 self-start sm:self-auto shrink-0 shadow-[0_2px_6px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.15)]">
                    <Calendar className="w-3 h-3 text-cyan-400" />
                    <span>{periodText}</span>
                  </span>
                </div>

                {/* Bullet Points */}
                <ul className="mt-5 space-y-2.5" style={{ transform: "translateZ(10px)" }}>
                  {descriptions.map((desc: string, dIdx: number) => {
                    const isCertLine = desc.startsWith("Certifications:");

                    return (
                      <li
                        key={dIdx}
                        className={cn(
                          "flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed",
                          isCertLine &&
                          "p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-500/30 text-cyan-200 mt-3 shadow-[0_4px_12px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1)]"
                        )}
                      >
                        {isCertLine ? (
                          <Award className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        ) : (
                          <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                        )}
                        <span>{desc}</span>
                      </li>
                    );
                  })}
                </ul>

                {/* Skills Utilized 3D Pills */}
                {exp.skills && exp.skills.length > 0 && (
                  <div
                    className="mt-6 pt-5 border-t border-slate-800/60 flex flex-wrap items-center gap-2"
                    style={{ transform: "translateZ(6px)" }}
                  >
                    <span className="text-[11px] font-mono text-slate-400 mr-1">Skills:</span>
                    {exp.skills.map((skillName: string) => {
                      const skill = SKILLS[skillName as SkillNames];
                      if (!skill) return null;

                      return (
                        <span
                          key={skillName}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700/80 text-[11px] font-mono text-slate-200 shadow-[0_2px_4px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1)] transition-transform hover:-translate-y-0.5"
                        >
                          <img
                            src={skill.icon}
                            alt={skill.label}
                            className="w-3.5 h-3.5 object-contain"
                          />
                          <span>{skill.label}</span>
                        </span>
                      );
                    })}
                  </div>
                )}
              </Card3D>
            </motion.div>
          );
        })}
      </div>
    </SectionWrapper>
  );
};

export default ExperienceSection;
