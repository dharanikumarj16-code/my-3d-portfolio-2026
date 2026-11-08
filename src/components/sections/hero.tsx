"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowDown, FileText, Mail, Sparkles, Terminal, Code2, GraduationCap } from "lucide-react";
import { SiGithub, SiLinkedin, SiLeetcode } from "react-icons/si";
import { config } from "@/data/config";
import { getProfile } from "@/lib/supabase/data-service";
import { usePreloader } from "../preloader";
import { BlurIn, BoxReveal } from "../reveal-animations";
import SectionWrapper from "../ui/section-wrapper";
import Hero3DProfile from "../hero-3d-profile";
import ScrollDownIcon from "../scroll-down-icon";
import { cn } from "@/lib/utils";

const HeroSection = () => {
  const { isLoading } = usePreloader();
  const [resumeUrl, setResumeUrl] = useState(
    config.resumeUrl || "/assets/dharani-kumar-j-resume.pdf"
  );
  const [profileData, setProfileData] = useState({
    role: config.role,
    bio: config.description.short,
  });

  useEffect(() => {
    getProfile()
      .then((p) => {
        if (p?.resume_url) setResumeUrl(p.resume_url);
        if (p?.role) setProfileData((prev) => ({ ...prev, role: p.role }));
      })
      .catch(() => {});
  }, []);

  return (
    <SectionWrapper
      id="hero"
      className="relative w-full min-h-[100dvh] flex items-center justify-center pt-24 pb-16 md:py-24 z-10"
    >
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column: Introduction & CTAs */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left z-20">
          {!isLoading && (
            <>
              {/* Availability Status Pill */}
              <BlurIn delay={0.3}>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-950/40 backdrop-blur-md text-cyan-300 text-xs font-mono mb-6 shadow-sm shadow-cyan-500/10">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span>Available for AI / ML &amp; Software Roles</span>
                </div>
              </BlurIn>

              {/* Main Headline */}
              <BlurIn delay={0.5}>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
                  Hi, I&apos;m{" "}
                  <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">
                    {config.fullName}
                  </span>
                </h1>
              </BlurIn>

              {/* Specialization Role */}
              <BlurIn delay={0.7}>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-slate-200 mt-3 tracking-tight">
                  {profileData.role}
                </h2>
              </BlurIn>

              {/* Punchy Bio Description */}
              <BlurIn delay={0.9}>
                <p className="mt-4 text-sm sm:text-base md:text-lg text-slate-400 max-w-2xl leading-relaxed">
                  Crafting end-to-end predictive machine learning pipelines, low-latency intelligent voice agents, and cloud-deployed software systems that transform complex data into actionable impact.
                </p>
              </BlurIn>

              {/* Credential / Highlight Badges */}
              <BlurIn delay={1.1}>
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 mt-6">
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900/80 border border-slate-800 text-xs font-mono text-slate-300">
                    <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
                    <span>SKCET • B.Tech AI &amp; DS</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900/80 border border-slate-800 text-xs font-mono text-slate-300">
                    <Terminal className="w-3.5 h-3.5 text-teal-400" />
                    <span>ML Pipelines &amp; NLP</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900/80 border border-slate-800 text-xs font-mono text-slate-300">
                    <Code2 className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Python • C++ • Cloud</span>
                  </div>
                </div>
              </BlurIn>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-3 w-full sm:w-auto">
                {/* Primary CTA: Explore Projects */}
                <Link
                  href="#projects"
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-slate-950 font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 active:scale-95 transition-all"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Explore Projects</span>
                  <ArrowDown className="w-4 h-4" />
                </Link>

                {/* Secondary CTA: Download Resume */}
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-800 hover:border-slate-700 font-medium text-sm flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95"
                >
                  <FileText className="w-4 h-4 text-cyan-400" />
                  <span>View Resume</span>
                </a>

                {/* Tertiary CTA: Contact */}
                <Link
                  href="#contact"
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-900/50 hover:bg-slate-800/80 text-slate-300 border border-slate-800/70 font-medium text-sm flex items-center justify-center gap-2 transition-all active:scale-95"
                >
                  <Mail className="w-4 h-4 text-slate-400" />
                  <span>Contact Me</span>
                </Link>
              </div>

              {/* Social Media Pill Bar */}
              <div className="mt-6 flex items-center justify-center lg:justify-start gap-2.5">
                <span className="text-xs text-slate-500 font-mono mr-1">Connect:</span>
                <a
                  href={config.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 text-slate-400 hover:text-white hover:bg-slate-800 transition-all shadow-sm"
                  title="GitHub Profile"
                  aria-label="GitHub Profile"
                >
                  <SiGithub className="w-4 h-4" />
                </a>
                <a
                  href={config.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 text-slate-400 hover:text-white hover:bg-slate-800 transition-all shadow-sm"
                  title="LinkedIn Profile"
                  aria-label="LinkedIn Profile"
                >
                  <SiLinkedin className="w-4 h-4 text-[#0A66C2]" />
                </a>
                {config.social.leetcode && (
                  <a
                    href={config.social.leetcode}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 text-slate-400 hover:text-white hover:bg-slate-800 transition-all shadow-sm"
                    title="LeetCode Profile"
                    aria-label="LeetCode Profile"
                  >
                    <SiLeetcode className="w-4 h-4 text-[#FFA116]" />
                  </a>
                )}
                <a
                  href={`mailto:${config.email}`}
                  className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 text-slate-400 hover:text-white hover:bg-slate-800 transition-all shadow-sm"
                  title="Send Direct Email"
                  aria-label="Send Direct Email"
                >
                  <Mail className="w-4 h-4 text-cyan-400" />
                </a>
              </div>
            </>
          )}
        </div>

        {/* Right Column: Interactive 3D Card Profile */}
        <div className="lg:col-span-5 flex items-center justify-center z-10">
          {!isLoading && <Hero3DProfile />}
        </div>
      </div>

      {/* Subtle Scroll Down Prompt */}
      <div className="hidden md:block absolute bottom-4 left-1/2 -translate-x-1/2 z-20">
        <ScrollDownIcon />
      </div>
    </SectionWrapper>
  );
};

export default HeroSection;
