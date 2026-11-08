"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface ExhaustParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  maxLife: number;
  life: number;
  color: string;
}

export const SpaceshipCursor: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const pos = useRef({ x: -100, y: -100 });
  const target = useRef({ x: -100, y: -100 });
  const vel = useRef({ x: 0, y: 0 });
  const angle = useRef(0);

  const shipRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particles = useRef<ExhaustParticle[]>([]);

  useEffect(() => {
    // Only render custom cursor on devices that support hover (desktop/mouse)
    const isTouch = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    if (isTouch) return;

    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
      if (!isVisible) setIsVisible(true);

      // Detect if hovering over clickable elements
      const targetEl = e.target as HTMLElement | null;
      if (targetEl) {
        const isClickable = Boolean(
          targetEl.closest(
            'a, button, input, textarea, select, label, [role="button"], .planet-orb, .cursor-pointer'
          )
        );
        setIsHovering(isClickable);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    // Setup exhaust particles canvas
    const canvas = canvasRef.current;
    let ctx: CanvasRenderingContext2D | null = null;
    if (canvas) {
      ctx = canvas.getContext("2d");
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    const handleResize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    let animId: number;

    const renderLoop = () => {
      // Smooth lerp following mouse
      const dx = target.current.x - pos.current.x;
      const dy = target.current.y - pos.current.y;

      vel.current.x = dx * 0.22;
      vel.current.y = dy * 0.22;

      pos.current.x += vel.current.x;
      pos.current.y += vel.current.y;

      // Dynamic banking tilt based on horizontal velocity
      const targetAngle = Math.max(-24, Math.min(24, vel.current.x * 1.8));
      angle.current += (targetAngle - angle.current) * 0.18;

      const speed = Math.hypot(vel.current.x, vel.current.y);

      // Emit cute stardust exhaust particles from spaceship engine
      if (speed > 1.2 && particles.current.length < 50) {
        const pAngle = (angle.current * Math.PI) / 180 + Math.PI / 2 + (Math.random() - 0.5) * 0.5;
        const pSpeed = Math.random() * 2.0 + 1.0;
        particles.current.push({
          x: pos.current.x,
          y: pos.current.y + 16,
          vx: Math.cos(pAngle) * pSpeed + vel.current.x * 0.08,
          vy: Math.sin(pAngle) * pSpeed + 1.2,
          size: Math.random() * 2.5 + 1.5,
          alpha: 1.0,
          maxLife: 22,
          life: 0,
          color: Math.random() > 0.4 ? "#38bdf8" : "#facc15",
        });
      }

      // Render exhaust particles
      if (ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = particles.current.length - 1; i >= 0; i--) {
          const p = particles.current[i];
          p.life++;
          p.x += p.vx;
          p.y += p.vy;
          p.alpha = 1.0 - p.life / p.maxLife;

          if (p.life >= p.maxLife || p.alpha <= 0) {
            particles.current.splice(i, 1);
            continue;
          }

          ctx.save();
          ctx.globalAlpha = Math.max(0, p.alpha * 0.85);
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * (1 - p.life / p.maxLife * 0.4), 0, Math.PI * 2);
          ctx.fill();

          // Tiny twinkle cross
          ctx.strokeStyle = "#ffffff";
          ctx.lineWidth = 0.75;
          ctx.beginPath();
          ctx.moveTo(p.x - p.size, p.y);
          ctx.lineTo(p.x + p.size, p.y);
          ctx.moveTo(p.x, p.y - p.size);
          ctx.lineTo(p.x, p.y + p.size);
          ctx.stroke();
          ctx.restore();
        }
      }

      // Position the mini spaceship element
      if (shipRef.current) {
        const scaleVal = isClicking ? 0.88 : isHovering ? 1.18 : 1.0;
        shipRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%) rotate(${angle.current}deg) scale(${scaleVal})`;
      }

      animId = requestAnimationFrame(renderLoop);
    };

    animId = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
    };
  }, [isVisible, isHovering, isClicking]);

  if (!mounted) return null;

  return (
    <>
      {/* Exhaust Stardust Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[9998]"
        style={{ opacity: isVisible ? 1 : 0, transition: "opacity 0.2s ease" }}
      />

      {/* Mini Spaceship Cursor */}
      <div
        ref={shipRef}
        className={cn(
          "fixed top-0 left-0 pointer-events-none z-[9999] will-change-transform select-none",
          isVisible ? "opacity-100" : "opacity-0",
          "transition-opacity duration-200"
        )}
        style={{
          width: 44,
          height: 44,
          filter: isHovering
            ? "drop-shadow(0 0 10px rgba(56, 189, 248, 0.9)) drop-shadow(0 0 20px rgba(250, 204, 21, 0.6))"
            : "drop-shadow(0 2px 8px rgba(0, 0, 0, 0.6)) drop-shadow(0 0 12px rgba(56, 189, 248, 0.4))",
        }}
      >
        {/* Cute UFO Vector Illustration */}
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full overflow-visible"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Tractor beam when hovering interactive buttons */}
          {isHovering && (
            <polygon
              points="35,66 65,66 82,98 18,98"
              fill="url(#beamGrad)"
              className="animate-pulse opacity-70"
            />
          )}

          <defs>
            <linearGradient id="beamGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="domeGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#e0f2fe" />
              <stop offset="45%" stopColor="#bae6fd" />
              <stop offset="100%" stopColor="#7dd3fc" />
            </linearGradient>
            <linearGradient id="saucerGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>
            <linearGradient id="bottomGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fde047" />
              <stop offset="100%" stopColor="#eab308" />
            </linearGradient>
          </defs>

          {/* Left Antenna */}
          <line
            x1="32"
            y1="28"
            x2="17"
            y2="12"
            stroke="#0f172a"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <line
            x1="32"
            y1="28"
            x2="17"
            y2="12"
            stroke="#fde047"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <circle cx="15" cy="10" r="7.5" fill="#facc15" stroke="#0f172a" strokeWidth="3" />
          <circle cx="13" cy="8" r="2.2" fill="#ffffff" />

          {/* Right Antenna */}
          <line
            x1="68"
            y1="28"
            x2="83"
            y2="12"
            stroke="#0f172a"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <line
            x1="68"
            y1="28"
            x2="83"
            y2="12"
            stroke="#fde047"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <circle cx="85" cy="10" r="7.5" fill="#facc15" stroke="#0f172a" strokeWidth="3" />
          <circle cx="83" cy="8" r="2.2" fill="#ffffff" />

          {/* Cockpit Dome */}
          <path
            d="M 23 52 C 23 20, 77 20, 77 52 Z"
            fill="url(#domeGrad)"
            stroke="#0f172a"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />

          {/* Glass Gloss Highlight */}
          <path
            d="M 29 48 C 29 26, 68 23, 72 30 C 62 25, 34 29, 31 48 Z"
            fill="#ffffff"
            opacity="0.75"
          />

          {/* Cute Big Sparkling Eyes */}
          {/* Left Eye */}
          <ellipse cx="37" cy="44" rx="9" ry="10" fill="#0b1329" />
          {/* Left Eye Four-Point Star Sparkle */}
          <path
            d="M 35 37 Q 35 41 39 41 Q 35 41 35 45 Q 35 41 31 41 Q 35 41 35 37 Z"
            fill="#ffffff"
          />
          <circle cx="41" cy="49" r="2.2" fill="#ffffff" />

          {/* Right Eye */}
          <ellipse cx="63" cy="44" rx="9" ry="10" fill="#0b1329" />
          {/* Right Eye Four-Point Star Sparkle */}
          <path
            d="M 61 37 Q 61 41 65 41 Q 61 41 61 45 Q 61 41 57 41 Q 61 41 61 37 Z"
            fill="#ffffff"
          />
          <circle cx="67" cy="49" r="2.2" fill="#ffffff" />

          {/* Sweet Smile */}
          <path
            d="M 47 50 Q 50 54 53 50"
            fill="none"
            stroke="#0b1329"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Cute Pink Blush */}
          <ellipse cx="27" cy="47" rx="3.5" ry="2" fill="#f472b6" opacity="0.45" />
          <ellipse cx="73" cy="47" rx="3.5" ry="2" fill="#f472b6" opacity="0.45" />

          {/* Bottom Hull (under saucer) */}
          <path
            d="M 23 64 C 27 80, 73 80, 77 64 Z"
            fill="url(#bottomGrad)"
            stroke="#0f172a"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />

          {/* Saucer Disc Rim */}
          <path
            d="M 6 56 C 6 46, 94 46, 94 56 C 94 67, 6 67, 6 56 Z"
            fill="url(#saucerGrad)"
            stroke="#0f172a"
            strokeWidth="3.5"
          />

          {/* Glowing Porthole Lights */}
          <circle cx="16" cy="56" r="3.8" fill="#fbbf24" stroke="#0f172a" strokeWidth="1.8" />
          <circle cx="16" cy="55.5" r="1.3" fill="#ffffff" />

          <circle cx="32" cy="60" r="4.2" fill="#fbbf24" stroke="#0f172a" strokeWidth="1.8" />
          <circle cx="32" cy="59.5" r="1.5" fill="#ffffff" />

          <circle cx="50" cy="61.5" r="4.5" fill="#fbbf24" stroke="#0f172a" strokeWidth="1.8" />
          <circle cx="50" cy="61" r="1.6" fill="#ffffff" />

          <circle cx="68" cy="60" r="4.2" fill="#fbbf24" stroke="#0f172a" strokeWidth="1.8" />
          <circle cx="68" cy="59.5" r="1.5" fill="#ffffff" />

          <circle cx="84" cy="56" r="3.8" fill="#fbbf24" stroke="#0f172a" strokeWidth="1.8" />
          <circle cx="84" cy="55.5" r="1.3" fill="#ffffff" />
        </svg>

        {/* Pinpoint Target Reticle at cockpit center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-cyan-300 shadow-[0_0_8px_#38bdf8] pointer-events-none opacity-80" />
      </div>
    </>
  );
};

export default SpaceshipCursor;
