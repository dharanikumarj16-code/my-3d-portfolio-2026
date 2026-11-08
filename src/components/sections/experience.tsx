"use client";

import { useEffect, useState } from "react";
import { EXPERIENCE, SkillNames, SKILLS } from "@/data/constants";
import { getExperiences } from "@/lib/supabase/data-service";
import { SectionHeader } from "./section-header";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import SectionWrapper from "../ui/section-wrapper";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ExperienceSection = () => {
  const [experienceList, setExperienceList] = useState<any[]>(EXPERIENCE);

  useEffect(() => {
    getExperiences()
      .then((data) => {
        if (data && data.length > 0) {
          setExperienceList(data);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <SectionWrapper
      id="experience"
      className="flex flex-col items-center justify-center min-h-[100dvh] md:min-h-[180dvh] py-20"
    >
      <div className="w-full max-w-4xl px-4 md:px-8 mx-auto" id="experience">
        <SectionHeader
          id="experience"
          title="Experience & Education"
          desc="My academic and technical journey in AI & software development."
          className="mb-12 md:mb-20 mt-0"
        />

        <div
          className="relative flex flex-col gap-8 md:block"
          style={{
            minHeight: `calc(${experienceList.length} * 70vh)`,
          }}
        >
          {experienceList.map((exp, index) => (
            <ExperienceCard
              key={exp.id || index}
              experience={exp}
              index={index}
              total={experienceList.length}
            />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};

const ExperienceCard = ({
  experience,
  index,
}: {
  experience: any;
  index: number;
  total: number;
}) => {
  const roleTitle = experience.title || experience.role;
  const periodText = experience.period || `${experience.startDate} - ${experience.endDate}`;
  const descriptions = experience.description || [];

  return (
    <motion.div
      className="sticky top-40 md:top-52 max-w-3xl"
      style={{
        zIndex: index + 1,
        paddingTop: index === 0 ? 0 : index * 95,
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.1,
        ease: "easeOut",
      }}
      viewport={{ once: true, margin: "-50px" }}
    >
      <Card
        className={cn(
          "bg-card text-card-foreground border-border",
          "hover:border-primary/20 transition-colors duration-300",
          "shadow-sm hover:shadow-md"
        )}
      >
        <CardHeader className="pb-3">
          <div className="flex flex-row items-start justify-between gap-4">
            <div className="space-y-1">
              <CardTitle className="text-xl font-bold tracking-tight">
                {roleTitle}
              </CardTitle>
              <div className="text-base font-medium text-muted-foreground">
                {experience.company}
              </div>
            </div>
            <Badge
              variant="secondary"
              className="w-fit font-mono text-xs font-normal"
            >
              {periodText}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <ul className="list-disc list-outside ml-4 space-y-2 text-base text-muted-foreground leading-relaxed">
            {descriptions.map((point: string, i: number) => (
              <li key={i}>{point}</li>
            ))}
          </ul>

          {experience.skills && experience.skills.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {experience.skills.map((skillName: string) => {
                const skill = SKILLS[skillName as SkillNames];
                if (!skill) return null;
                return (
                  <Badge
                    key={skillName}
                    variant="outline"
                    className="gap-2 text-xs font-normal bg-secondary/30 hover:bg-secondary/50 transition-colors border-transparent"
                  >
                    <img
                      src={skill.icon}
                      alt={skill.label}
                      className="w-3.5 h-3.5 object-contain opacity-80"
                    />
                    {skill.label}
                  </Badge>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ExperienceSection;
