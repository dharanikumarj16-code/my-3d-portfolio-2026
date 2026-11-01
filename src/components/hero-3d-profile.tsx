"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Sparkles, Terminal, Cpu } from "lucide-react";
import { useSounds } from "@/hooks/use-sounds";

export const Hero3DProfile: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { playPressSound, playReleaseSound } = useSounds();

  // Mouse tilt tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 180 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-14, 14]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    playReleaseSound();
  };

  const handleClick = () => {
    playPressSound();
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className="relative w-full max-w-[460px] lg:max-w-[500px] px-4 sm:px-6 py-4 mx-auto flex items-center justify-center cursor-pointer select-none perspective-[1200px]"
    >
      {/* Dynamic 3D Tilt Card */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative w-full aspect-square flex items-center justify-center"
      >
        {/* Ambient AI Cyan/Purple Halo */}
        <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-tr from-cyan-500/25 via-indigo-500/20 to-purple-500/25 blur-[70px] animate-pulse pointer-events-none" />

        {/* Outer Cyber Accent Ring */}
        <div className="absolute -inset-3 rounded-[3rem] border border-cyan-500/20 bg-slate-950/20 backdrop-blur-sm shadow-[0_0_50px_rgba(6,182,212,0.15)] pointer-events-none">
          <div className="absolute inset-2 rounded-[2.8rem] border border-dashed border-indigo-400/25 animate-[spin_80s_linear_infinite]" />
        </div>

        {/* Full Original 1:1 Aspect Ratio Image Frame */}
        <div className="relative z-10 w-full h-full rounded-[2.5rem] overflow-hidden border border-cyan-500/35 bg-slate-950/70 backdrop-blur-md shadow-[0_20px_50px_rgba(6,182,212,0.3)] flex items-center justify-center group">
          <Image
            src="/assets/dharani-about-avatar.jpg"
            alt="Dharani Kumar J - 3D AI Developer Avatar"
            width={600}
            height={600}
            priority
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
          {/* Subtle bottom vignette gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Floating AI Badge: Top Right */}
        <motion.div
          style={{ transform: "translateZ(45px)" }}
          className="absolute -top-3 right-3 z-20 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-cyan-400/30 bg-slate-950/90 backdrop-blur-xl shadow-lg shadow-cyan-500/20 text-xs font-mono text-cyan-300"
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span>AI &amp; Data Science</span>
        </motion.div>

        {/* Floating AI Badge: Bottom Left */}
        <motion.div
          style={{ transform: "translateZ(55px)" }}
          className="absolute -bottom-3 left-3 z-20 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-emerald-400/30 bg-slate-950/90 backdrop-blur-xl shadow-lg shadow-emerald-500/20 text-xs font-mono text-emerald-300"
        >
          <Cpu className="w-3.5 h-3.5 text-emerald-400" />
          <span>Python • ML • Systems</span>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero3DProfile;
