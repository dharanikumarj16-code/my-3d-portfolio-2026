"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { cn } from "@/lib/utils";

interface Tile3DProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  isActive?: boolean;
  maxTilt?: number;
}

export const Tile3D: React.FC<Tile3DProps> = ({
  children,
  className,
  glowColor = "#06b6d4",
  isActive = false,
  maxTilt = 12,
  style,
  onMouseMove,
  onMouseEnter,
  onMouseLeave,
  ...props
}) => {
  const tileRef = useRef<HTMLButtonElement>(null);
  const [coords, setCoords] = useState({ x: 0.5, y: 0.5 });
  const [isHovered, setIsHovered] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setIsTouch("ontouchstart" in window || navigator.maxTouchPoints > 0);
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      onMouseMove?.(e);
      if (isTouch || reducedMotion || !tileRef.current) return;
      const rect = tileRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      setCoords({ x, y });
    },
    [isTouch, reducedMotion, onMouseMove]
  );

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      onMouseEnter?.(e);
      if (isTouch || reducedMotion) return;
      setIsHovered(true);
    },
    [isTouch, reducedMotion, onMouseEnter]
  );

  const handleMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      onMouseLeave?.(e);
      setIsHovered(false);
      setCoords({ x: 0.5, y: 0.5 });
    },
    [onMouseLeave]
  );

  const rotateX = isHovered ? (0.5 - coords.y) * maxTilt * 2 : 0;
  const rotateY = isHovered ? (coords.x - 0.5) * maxTilt * 2 : 0;
  const translateZ = isHovered ? 14 : 0;

  return (
    <div style={{ perspective: 700 }} className="inline-block w-full">
      <button
        ref={tileRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          transformStyle: "preserve-3d",
          transform: isHovered
            ? `rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(${translateZ}px) translateY(-3px)`
            : "rotateX(0deg) rotateY(0deg) translateZ(0px) translateY(0px)",
          transition: isHovered
            ? "transform 0.08s ease-out, box-shadow 0.2s ease-out, border-color 0.2s ease-out"
            : "transform 0.35s cubic-bezier(0.2, 0.9, 0.3, 1), box-shadow 0.35s ease-out, border-color 0.3s ease-out",
          boxShadow: isHovered || isActive
            ? `0 14px 28px -4px rgba(0,0,0,0.8), 0 6px 12px -2px rgba(0,0,0,0.6), 0 0 20px ${glowColor}35, inset 0 1px 0 rgba(255,255,255,0.2), inset 0 -2px 0 rgba(0,0,0,0.6)`
            : "0 6px 14px -2px rgba(0,0,0,0.6), 0 2px 4px -1px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1), inset 0 -2px 0 rgba(0,0,0,0.5)",
          ...style,
        }}
        className={cn(
          "relative group w-full flex flex-col items-center justify-center p-3.5 rounded-xl border cursor-pointer select-none",
          "bg-slate-900/85 backdrop-blur-md will-change-transform",
          // Bevel styling: raised top border, deep bottom shadow
          "border-t-white/15 border-x-slate-800/80 border-b-black/80",
          isActive
            ? "border-cyan-400 bg-cyan-950/40 text-white"
            : "text-slate-300 hover:text-white hover:border-cyan-500/50 hover:bg-slate-800/90",
          // Active click feel (tactile push):
          "active:translate-y-1 active:scale-[0.97] active:shadow-[0_2px_4px_rgba(0,0,0,0.9),inset_0_2px_4px_rgba(0,0,0,0.7)]",
          className
        )}
        {...props}
      >
        {children}

        {/* Specular Glare Reflection on Hover */}
        {isHovered && !isTouch && !reducedMotion && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-xl overflow-hidden z-20"
          >
            <div
              className="w-full h-full"
              style={{
                background: `radial-gradient(circle 80px at ${(coords.x * 100).toFixed(0)}% ${(coords.y * 100).toFixed(0)}%, rgba(255,255,255,0.2), transparent 70%)`,
              }}
            />
          </div>
        )}
      </button>
    </div>
  );
};

export default Tile3D;

