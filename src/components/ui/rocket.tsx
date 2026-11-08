"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

export interface RocketProps {
  size?: number; // Size in px (default 72)
  flameIntensity?: number; // 0.2 (idle) to 2.5 (boost)
  state?: "idle" | "launching" | "flying" | "boost" | "offscreen";
  rotation?: number; // In degrees
  isHovered?: boolean;
  isRolling?: boolean;
  className?: string;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export const Rocket: React.FC<RocketProps> = ({
  size = 76,
  flameIntensity = 1.0,
  state = "flying",
  rotation = 0,
  isHovered = false,
  isRolling = false,
  className,
  onClick,
  onMouseEnter,
  onMouseLeave,
}) => {
  // Clamped flame length multiplier based on intensity & hover
  const activeFlame = Math.max(0.3, Math.min(2.8, flameIntensity * (isHovered ? 1.4 : 1.0)));
  const flameScaleX = activeFlame;
  const flameScaleY = 0.85 + (activeFlame - 1) * 0.15;

  return (
    <div
      role="button"
      tabIndex={0}
      aria-hidden="true"
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick?.();
        }
      }}
      className={cn(
        "relative select-none pointer-events-auto cursor-pointer focus:outline-none transition-filter duration-300",
        isRolling && "animate-[spin_0.65s_cubic-bezier(0.34,1.56,0.64,1)]",
        className
      )}
      style={{
        width: size,
        height: size * 0.9,
        transform: `rotate(${rotation}deg)`,
        filter: isHovered
          ? "drop-shadow(0 0 16px rgba(56, 232, 255, 0.8)) drop-shadow(0 0 28px rgba(249, 115, 22, 0.5))"
          : "drop-shadow(0 4px 12px rgba(0, 0, 0, 0.7)) drop-shadow(0 0 10px rgba(56, 189, 248, 0.3))",
      }}
    >
      <svg
        viewBox="0 0 120 110"
        className="w-full h-full overflow-visible"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Flame Gradients */}
          <linearGradient id="rocketOuterFlame" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="50%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.8" />
          </linearGradient>
          <linearGradient id="rocketInnerFlame" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#facc15" />
            <stop offset="60%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#ffffff" />
          </linearGradient>

          {/* Fuselage Gradients */}
          <linearGradient id="hullGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="65%" stopColor="#f1f5f9" />
            <stop offset="100%" stopColor="#cbd5e1" />
          </linearGradient>
          <linearGradient id="noseGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f87171" />
            <stop offset="40%" stopColor="#ef4444" />
            <stop offset="100%" stopColor="#b91c1c" />
          </linearGradient>
          <linearGradient id="glassDomeGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(224, 242, 254, 0.95)" />
            <stop offset="60%" stopColor="rgba(125, 211, 252, 0.75)" />
            <stop offset="100%" stopColor="rgba(56, 189, 248, 0.45)" />
          </linearGradient>
          <linearGradient id="visorGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="60%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>
          <linearGradient id="portholeGlass" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#38e8ff" />
            <stop offset="100%" stopColor="#0284c7" />
          </linearGradient>
        </defs>

        {/* --- DYNAMIC REAR EXHAUST FLAME --- */}
        <g
          className="transition-transform duration-150 origin-[100px_72px]"
          style={{
            transform: `scale(${flameScaleX}, ${flameScaleY})`,
          }}
        >
          {/* Outer Orange/Red Flame */}
          <path
            d="M 98 64 Q 130 72 108 72 Q 130 72 98 80 Z"
            fill="url(#rocketOuterFlame)"
            className="animate-pulse"
          />
          {/* Mid Yellow Flame */}
          <path
            d="M 98 66 Q 122 72 105 72 Q 122 72 98 78 Z"
            fill="#facc15"
          />
          {/* Inner Cyan/White Plasma Jet */}
          <path
            d="M 98 68 Q 114 72 102 72 Q 114 72 98 76 Z"
            fill="url(#rocketInnerFlame)"
          />
        </g>

        {/* --- REAR THRUSTER NOZZLE --- */}
        <path
          d="M 92 65 L 100 62 L 100 82 L 92 79 Z"
          fill="#334155"
          stroke="#0f172a"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />

        {/* --- TOP FIN --- */}
        <path
          d="M 72 52 C 78 40, 92 40, 96 46 C 90 54, 82 56, 75 58 Z"
          fill="url(#noseGrad)"
          stroke="#0f172a"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />

        {/* --- BOTTOM FIN --- */}
        <path
          d="M 72 92 C 78 104, 92 104, 96 98 C 90 90, 82 88, 75 86 Z"
          fill="url(#noseGrad)"
          stroke="#0f172a"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />

        {/* --- SIDE STABILIZER WING --- */}
        <path
          d="M 68 70 C 82 68, 92 70, 94 72 C 92 74, 82 76, 68 74 Z"
          fill="url(#noseGrad)"
          stroke="#0f172a"
          strokeWidth="2"
        />

        {/* --- ASTRONAUT COCKPIT DOME & PILOT --- */}
        {/* Cockpit Base Rim */}
        <path
          d="M 36 53 C 44 49, 70 49, 78 53 C 78 55, 36 55, 36 53 Z"
          fill="#ef4444"
          stroke="#0f172a"
          strokeWidth="2"
        />

        {/* Glass Dome */}
        <circle
          cx="57"
          cy="34"
          r="26"
          fill="url(#glassDomeGrad)"
          stroke="#0f172a"
          strokeWidth="2.8"
        />

        {/* Astronaut Helmet Visor */}
        <ellipse
          cx="57"
          cy="34"
          rx="18"
          ry="18"
          fill="url(#visorGrad)"
          stroke="#334155"
          strokeWidth="2"
        />

        {/* Visor Glint / Sparkle Reflections */}
        <ellipse cx="64" cy="28" rx="4.5" ry="7" fill="#ffffff" opacity="0.85" transform="rotate(25 64 28)" />
        <circle cx="50" cy="42" r="2" fill="#ffffff" opacity="0.6" />

        {/* Astronaut Helmet Ear Comms */}
        <rect x="71" y="28" width="5" height="12" rx="2.5" fill="#e2e8f0" stroke="#0f172a" strokeWidth="1.8" />

        {/* Cute Spacesuit Hands Steering */}
        <path
          d="M 46 51 C 48 47, 54 47, 56 51 Z"
          fill="#f8fafc"
          stroke="#0f172a"
          strokeWidth="1.8"
        />
        <path
          d="M 58 51 C 60 47, 66 47, 68 51 Z"
          fill="#f8fafc"
          stroke="#0f172a"
          strokeWidth="1.8"
        />

        {/* Dome Specular Highlight */}
        <path
          d="M 40 24 C 44 14, 62 12, 68 15 C 60 14, 45 17, 40 24 Z"
          fill="#ffffff"
          opacity="0.8"
        />

        {/* --- MAIN FUSELAGE HULL --- */}
        <path
          d="M 32 54 C 52 50, 80 54, 94 65 C 96 73, 94 81, 88 86 C 72 96, 44 96, 30 88 C 16 78, 16 64, 32 54 Z"
          fill="url(#hullGrad)"
          stroke="#0f172a"
          strokeWidth="3.2"
          strokeLinejoin="round"
        />

        {/* Fuselage Gloss Belly Reflection */}
        <path
          d="M 34 85 C 50 91, 74 91, 84 83 C 74 87, 48 87, 34 85 Z"
          fill="#94a3b8"
          opacity="0.4"
        />

        {/* --- AERODYNAMIC NOSECONE --- */}
        <path
          d="M 12 72 C 12 60, 24 55, 34 54 C 28 66, 28 78, 34 88 C 24 87, 12 82, 12 72 Z"
          fill="url(#noseGrad)"
          stroke="#0f172a"
          strokeWidth="3.2"
          strokeLinejoin="round"
        />

        {/* Nosecone Specular Highlight */}
        <ellipse
          cx="20"
          cy="66"
          rx="5.5"
          ry="3.5"
          fill="#ffffff"
          opacity="0.85"
          transform="rotate(-25 20 66)"
        />

        {/* --- CYAN CIRCULAR PORTHOLE WINDOW --- */}
        <circle cx="56" cy="73" r="11" fill="#e2e8f0" stroke="#0f172a" strokeWidth="2.5" />
        <circle cx="56" cy="73" r="8.5" fill="url(#portholeGlass)" stroke="#0284c7" strokeWidth="1.2" />
        {/* Porthole Glass Highlight */}
        <path
          d="M 50 71 Q 56 66 62 69 Q 56 68 50 71 Z"
          fill="#ffffff"
          opacity="0.8"
        />
      </svg>
    </div>
  );
};

export default Rocket;

