"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { DiMongodb, DiNginx, DiNpm, DiPostgresql, DiVim } from "react-icons/di";
import {
  FaAws,
  FaBrain,
  FaCss3,
  FaDocker,
  FaEnvelope,
  FaGit,
  FaGithub,
  FaHtml5,
  FaJava,
  FaLinkedin,
  FaLinux,
  FaNodeJs,
  FaReact,
  FaYarn,
} from "react-icons/fa6";
import { RiFirebaseFill, RiTailwindCssFill } from "react-icons/ri";
import {
  SiAndroidstudio,
  SiCplusplus,
  SiExpress,
  SiFastapi,
  SiGooglecolab,
  SiJavascript,
  SiJupyter,
  SiKubuntu,
  SiNumpy,
  SiPandas,
  SiPostgresql,
  SiPrettier,
  SiPython,
  SiRender,
  SiTypescript,
  SiVercel,
  SiVscodium,
} from "react-icons/si";
// @ts-ignore
import { Splide, SplideSlide } from "@splidejs/react-splide";
// @ts-ignore
import "@splidejs/react-splide/css";
import { TbTerminal2 } from "react-icons/tb";
import Script from "next/script";
import { config } from "@/data/config";

const CONTACT_LINKS = [
  {
    name: "Email",
    content: "dharanikumarj16@gmail.com",
    href: "mailto:dharanikumarj16@gmail.com",
    icon: <FaEnvelope />,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/dharani-kumar-j-25ad036",
    content: "/dharani-kumar-j-25ad036",
    icon: <FaLinkedin />,
  },
  {
    name: "GitHub",
    href: "https://github.com/dharanikumarj16-code",
    content: "/dharanikumarj16-code",
    icon: <FaGithub />,
  },
  {
    name: "LeetCode",
    href: "https://leetcode.com/u/dharanikumarj",
    content: "/u/dharanikumarj",
    icon: <TbTerminal2 />,
  },
];

const TOOLS = [
  { name: "Python", content: "Core language for AI, data & automation.", icon: <SiPython size={50} color="#3776AB" /> },
  { name: "C++", content: "High-performance programming & DSA.", icon: <SiCplusplus size={50} color="#00599C" /> },
  { name: "Java", content: "Robust OOP and application foundations.", icon: <FaJava size={50} color="#ED8B00" /> },
  { name: "SQL", content: "Relational querying & database architecture.", icon: <SiPostgresql size={50} color="#336791" /> },
  { name: "Scikit-Learn", content: "KNN, predictive pipelines & machine learning.", icon: <FaBrain size={50} color="#F7931E" /> },
  { name: "Pandas", content: "Data wrangling, cleaning & structured analytics.", icon: <SiPandas size={50} color="#150458" /> },
  { name: "NumPy", content: "High-performance multidimensional array computing.", icon: <SiNumpy size={50} color="#013243" /> },
  { name: "Seaborn", content: "Statistical visualization & scientific plotting.", icon: <FaBrain size={50} color="#4C72B0" /> },
  { name: "LeetCode / DSA", content: "Data structures, graph algorithms & problem solving.", icon: <TbTerminal2 size={50} color="#FFA116" /> },
  { name: "Google Colab", content: "Cloud GPU-accelerated model training.", icon: <SiGooglecolab size={50} color="#F9AB00" /> },
  { name: "Docker", content: "Containerization & dev environment parity.", icon: <FaDocker size={50} color="#2496ed" /> },
  { name: "Linux", content: "Terminal-first development operating system.", icon: <FaLinux size={50} color="#fff" /> },
  { name: "Git", content: "Distributed version control without regrets.", icon: <FaGit size={50} color="#f05032" /> },
  { name: "GitHub", content: "Collaborative open source & CI/CD workflows.", icon: <FaGithub size={50} color="#fff" /> },
  { name: "VS Code", content: "Primary editor workflow & customized extensions.", icon: <SiVscodium size={50} color="#007acc" /> },
  { name: "Android Studio", content: "Location-aware mobile application development.", icon: <SiAndroidstudio size={50} color="#3DDC84" /> },
  { name: "Render", content: "Cloud hosting for SmartFarm AI & ML models.", icon: <SiRender size={50} color="#46E3B7" /> },
  { name: "CI/CD", content: "Continuous deployment & GitHub Actions workflows.", icon: <SiVercel size={50} color="#fff" /> },
];

function Page() {
  const [toolsLoaded, setToolsLoaded] = useState(false);

  useEffect(() => {
    setToolsLoaded(true);
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 text-zinc-200 pt-20 lg:pt-24 pb-16">
      <Script
        id="ld-json-about"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfilePage",
            name: "About " + config.author,
            url: `${config.site}/about`,
            description: config.description.short,
            inLanguage: "en",
            author: {
              "@type": "Person",
              name: config.author,
              email: config.email,
              url: config.site,
            },
            publisher: {
              "@type": "Person",
              name: config.author,
            },
          }),
        }}
      />
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-9">
        <aside className="w-full xl:max-w-1/3 xl:col-span-1 xl:justify-self-start">
          <div className="p-5 sm:p-7 lg:p-8 rounded-2xl border border-zinc-700/70 bg-gradient-to-b from-zinc-900/70 via-black/50 to-black/30 backdrop-blur-md shadow-lg">
            <div className="flex flex-col sm:flex-row xl:flex-col items-center gap-4 sm:gap-6">
              <div className="relative flex justify-center items-center w-full max-w-[220px] sm:max-w-[240px] aspect-square rounded-2xl bg-slate-950/70 border border-cyan-500/30 overflow-hidden shadow-[0_0_40px_rgba(6,182,212,0.25)] group">
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/15 via-transparent to-purple-500/15 pointer-events-none z-10" />
                <Image
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  alt="Dharanikumar J - 3D AI Developer Avatar"
                  src="/assets/dharani-about-avatar.jpg"
                  width={280}
                  height={280}
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none z-10" />
              </div>
              <div className="flex flex-col gap-2 items-center text-center sm:items-start sm:text-left xl:items-center xl:text-center">
                <p className="text-lg sm:text-xl md:text-2xl">Dharanikumar J</p>
                <div className="text-[11px] sm:text-xs bg-zinc-700 w-fit px-3 py-1 rounded-full">
                  AI Engineer & Automation Developer
                </div>
              </div>
            </div>
            <div className="mt-8">
              <hr className="my-6 border-zinc-700" />
              <ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-3">
                {CONTACT_LINKS.map((link) => (
                  <li key={link.name}>
                    <a
                      className="flex items-center px-3.5 gap-3 w-full h-14 border border-t-white/15 border-x-slate-800 border-b-black/80 bg-slate-900/90 hover:border-cyan-500/50 rounded-xl shadow-[0_4px_10px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.1)] hover:shadow-[0_8px_20px_rgba(6,182,212,0.2)] hover:-translate-y-1 active:translate-y-0.5 transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-500 cursor-pointer"
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="w-8 flex items-center justify-center text-lg text-cyan-400">
                        {link.icon}
                      </div>
                      <div className="flex flex-col">
                        <div className="text-sm sm:text-base font-semibold text-white">{link.name}</div>
                        <div className="text-xs text-slate-400 truncate">
                          {link.content}
                        </div>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>

        <main className="w-full xl:max-w-2/3 xl:col-span-2 xl:justify-self-end">
          <div className="p-4 sm:p-6 lg:p-8 border border-zinc-700/70 rounded-2xl bg-gradient-to-b from-zinc-900/70 via-black/50 to-black/30 backdrop-blur-md shadow-lg space-y-6 sm:space-y-8">
            <div className="space-y-4 sm:space-y-6">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl">About me</h1>
              <p className="leading-relaxed text-sm sm:text-base text-zinc-200 font-medium">
                Hi, I&apos;m Dharani 👋
              </p>
              <p className="leading-relaxed text-sm sm:text-base text-zinc-200">
                I&apos;m a second-year B.Tech student specializing in Artificial Intelligence and Data Science at Sri Krishna College of Engineering and Technology. I&apos;m passionate about exploring emerging technologies, experimenting with new ideas, and discovering how AI can solve real-world problems.
              </p>
              <p className="leading-relaxed text-sm sm:text-base text-zinc-200">
                My interests include AI agents, LangChain, LangGraph, machine learning, model training, Python development, and DevOps fundamentals. I enjoy learning how things work under the hood and turning what I learn into practical projects.
              </p>
              <p className="leading-relaxed text-sm sm:text-base text-zinc-200">
                I believe the best way to learn technology is by building with it. From experimenting with local AI models to exploring intelligent agents and automation, I enjoy challenging myself, learning quickly, and finding creative ways to solve problems.
              </p>
              <p className="leading-relaxed text-sm sm:text-base text-zinc-100 font-medium">
                My goal is to transform innovative ideas into useful AI-powered solutions and eventually build my own AI company.
              </p>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <h2 className="text-xl sm:text-2xl lg:text-3xl">Beyond Coding</h2>
              <p className="leading-relaxed text-sm sm:text-base text-zinc-200">
                When I&apos;m not coding, I&apos;m exploring emerging technologies, researching new AI tools, experimenting with ideas, and looking for opportunities to improve my technical skills.
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-xl border border-zinc-700/80 bg-zinc-800/40 backdrop-blur-sm">
              <h3 className="text-xs uppercase tracking-wider text-zinc-400 font-semibold mb-1">My Philosophy</h3>
              <p className="italic text-base sm:text-lg text-purple-300">
                &ldquo;Explore boldly. Build practically. Learn continuously.&rdquo;
              </p>
            </div>

            <div className="space-y-4 sm:space-y-6">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl">Stuff I use</h2>
              <div>
                {!toolsLoaded ? (
                  <div className="h-[120px] bg-zinc-800/40 rounded-lg animate-pulse" />
                ) : (
                  <Splide
                  options={{
                    type: "loop",
                    interval: 2200,
                    autoplay: true,
                    pagination: false,
                    speed: 1200,
                    perPage: 4,
                    perMove: 1,
                    gap: "1.25rem",
                    breakpoints: {
                      1280: { perPage: 3 },
                      1024: { perPage: 2 },
                      768: { perPage: 2 },
                      640: { perPage: 1 },
                    },
                    rewind: true,
                    easing: "cubic-bezier(0.25, 1, 0.5, 1)",
                    arrows: false,
                  }}
                    aria-label="Tools"
                  >
                    {TOOLS.map((tool) => (
                      <SplideSlide key={tool.name}>
                        <div className="flex flex-col rounded-2xl border border-t-white/15 border-x-slate-800 border-b-black/80 bg-slate-900/90 p-4 sm:p-5 justify-center items-center h-[170px] sm:h-[190px] md:h-[200px] text-center gap-2 shadow-[0_8px_20px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.15)] hover:border-cyan-500/50 hover:shadow-[0_12px_28px_rgba(6,182,212,0.25)] hover:-translate-y-1 transition-all duration-300">
                          <div className="mb-2 transition-transform duration-300 hover:scale-110">{tool.icon}</div>
                          <div className="text-base sm:text-lg font-bold text-white">{tool.name}</div>
                          <div className="text-xs sm:text-sm text-slate-400 leading-snug">
                            {tool.content}
                          </div>
                        </div>
                      </SplideSlide>
                    ))}
                  </Splide>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Page;
