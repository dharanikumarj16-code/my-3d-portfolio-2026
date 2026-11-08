"use client";

import { useInView } from "framer-motion";
import React, { useRef } from "react";
import { Button } from "../ui/button";
import { SiGithub, SiUpwork, SiLeetcode } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa6";
import { config } from "@/data/config";
import Link from "next/link";

const BUTTONS = [
  ...(config.social.upwork
    ? [
        {
          name: "Upwork",
          href: config.social.upwork,
          icon: <SiUpwork size={"24"} color={"#fff"} />,
        },
      ]
    : []),
  {
    name: "Github",
    href: config.social.github,
    icon: <SiGithub size={"24"} color={"#fff"} />,
  },
  {
    name: "LinkedIn",
    href: config.social.linkedin,
    icon: <FaLinkedin size={"24"} color={"#fff"} />,
  },
  ...(config.social.leetcode
    ? [
        {
          name: "LeetCode",
          href: config.social.leetcode,
          icon: <SiLeetcode size={"24"} color={"#FFA116"} />,
        },
      ]
    : []),
];

const SocialMediaButtons = () => {
  const ref = useRef<HTMLDivElement>(null);
  const show = useInView(ref, { once: true });
  return (
    <div ref={ref} className="z-10 flex items-center gap-2">
      {show &&
        BUTTONS.map((button) => (
          <Link
            href={button.href}
            key={button.name}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={button.name}
            className="group relative inline-flex items-center justify-center w-10 h-10 rounded-xl bg-slate-900/90 border border-t-white/20 border-x-slate-800/80 border-b-black/80 text-slate-300 hover:text-white shadow-[0_4px_10px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.15),inset_0_-2px_0_rgba(0,0,0,0.6)] hover:border-cyan-500/50 hover:shadow-[0_8px_20px_rgba(6,182,212,0.25),inset_0_1px_0_rgba(255,255,255,0.3)] hover:-translate-y-1 active:translate-y-0.5 active:shadow-[0_1px_3px_rgba(0,0,0,0.8)] transition-all duration-200 cursor-pointer"
          >
            <div className="transition-transform duration-200 group-hover:scale-110">
              {button.icon}
            </div>
          </Link>
        ))}
    </div>
  );
};

export default SocialMediaButtons;
