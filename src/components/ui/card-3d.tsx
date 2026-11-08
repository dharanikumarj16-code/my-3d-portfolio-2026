"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { cn } from "@/lib/utils";

interface Card3DProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number; // max tilt degrees (default: 10)
  glare?: boolean; // dynamic specular sheen following mouse
  depth?: number; // default translateZ elevation on hover
  disabled?: boolean;
}

export const Card3D: React.FC<Card3DProps> = ({
  children,
  className,
  maxTilt = 10,
  glare = true,
  depth = 12,
  disabled = false,
  style,
  ...props
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setIsTouch("ontouchstart" in window || navigator.maxTouchPoints > 0);
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled || isTouch || reducedMotion || !cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      setCoords({ x, y });
    },
    [disabled, isTouch, reducedMotion]
  );

  const handleMouseEnter = useCallback(() => {
    if (disabled || isTouch || reducedMotion) return;
    setIsHovered(true);
  }, [disabled, isTouch, reducedMotion]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setCoords({ x: 0.5, y: 0.5 });
  }, []);

  // Compute rotation (-maxTilt to +maxTilt)
  const rotateX = isHovered ? (0.5 - coords.y) * maxTilt * 2 : 0;
  const rotateY = isHovered ? (coords.x - 0.5) * maxTilt * 2 : 0;
  const translateZ = isHovered ? depth : 0;

  return (
    <div
      style={{ perspective: 1000 }}
      className="inline-block w-full"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          transformStyle: "preserve-3d",
          transform: isHovered
            ? `rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(${translateZ}px)`
            : "rotateX(0deg) rotateY(0deg) translateZ(0px)",
          transition: isHovered
            ? "transform 0.1s ease-out, box-shadow 0.25s ease-out"
            : "transform 0.4s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.4s ease-out",
          ...style,
        }}
        className={cn(
          "relative rounded-2xl will-change-transform",
          // Physical 3D object styling: top rim light, subtle inner bevel, layered drop shadow
          "shadow-[0_10px_25px_-5px_rgba(0,0,0,0.6),0_8px_10px_-6px_rgba(0,0,0,0.6)]",
          isHovered &&
            "shadow-[0_20px_35px_-5px_rgba(0,0,0,0.8),0_12px_15px_-6px_rgba(6,182,212,0.25)]",
          className
        )}
        {...props}
      >
        {children}

        {/* Dynamic Specular Lighting Sheen */}
        {glare && isHovered && !isTouch && !reducedMotion && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-2xl z-30 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle 260px at ${(coords.x * 100).toFixed(1)}% ${(coords.y * 100).toFixed(1)}%, rgba(255, 255, 255, 0.12), rgba(6, 182, 212, 0.06) 40%, transparent 80%)`,
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Card3D;
