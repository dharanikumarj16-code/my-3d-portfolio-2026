"use client";

import React, { useEffect, useRef, useState } from "react";
import Rocket from "./rocket";
import { cn } from "@/lib/utils";

interface StardustSparkle {
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

// Tunable Configuration Parameters
export const ROCKET_CONFIG = {
  sizeDesktop: 76, // Rocket size in px on desktop
  sizeMobile: 56, // Rocket size in px on mobile
  maxParticlesDesktop: 16, // Low particle count for 60fps
  maxParticlesMobile: 6,
  lerpFactor: 0.08, // Smooth travel easing
  idleBobAmplitude: 8, // Floating bob in px
  idleBobSpeed: 2.2, // Bob cycle speed in seconds
  flameMin: 0.5, // Stationary flame scale
  flameMax: 2.4, // Max flame boost when scrolling fast
};

export const RocketJourney: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isRolling, setIsRolling] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Position, velocity, scroll tracking
  const pos = useRef({ x: 0, y: 0 });
  const targetPos = useRef({ x: 0, y: 0 });
  const rotation = useRef(-65); // Initial launch angle pointing upward
  const targetRotation = useRef(-65);
  const flameIntensity = useRef(1.0);
  const scrollSpeed = useRef(0);
  const lastScrollY = useRef(0);
  const lastScrollTime = useRef(0);

  // Lifecycle state: "launching" -> "floating" -> "scroll-journey"
  const lifecycle = useRef<"launching" | "floating" | "scroll-journey">("launching");
  const launchProgress = useRef(0); // 0 (bottom) to 1 (settled)

  const particles = useRef<StardustSparkle[]>([]);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMounted(true);

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(mediaQuery.matches);

    const handleReducedMotion = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
    };
    mediaQuery.addEventListener("change", handleReducedMotion);

    // Initial position starts off-screen below the hero
    const initX = window.innerWidth * (window.innerWidth < 768 ? 0.78 : 0.84);
    const startY = window.innerHeight + 140;
    const heroSettleY = window.innerHeight * 0.22;

    pos.current = { x: initX, y: startY };
    targetPos.current = { x: initX, y: heroSettleY };

    lastScrollY.current = window.scrollY;
    lastScrollTime.current = performance.now();

    // Scroll speed calculator
    const handleScroll = () => {
      const now = performance.now();
      const dt = Math.max(16, now - lastScrollTime.current);
      const dy = Math.abs(window.scrollY - lastScrollY.current);

      scrollSpeed.current = (dy / dt) * 16; // Pixels per frame equivalent
      lastScrollY.current = window.scrollY;
      lastScrollTime.current = now;

      if (lifecycle.current === "floating" && window.scrollY > 20) {
        lifecycle.current = "scroll-journey";
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", checkMobile);

    // Custom Interactive Events
    const handleFlyToContact = () => {
      setIsRolling(true);
      setTimeout(() => setIsRolling(false), 700);
      flameIntensity.current = 2.6;

      // Burst of sparkles
      for (let i = 0; i < 18; i++) {
        const a = Math.random() * Math.PI * 2;
        const spd = Math.random() * 3.5 + 2.0;
        particles.current.push({
          x: pos.current.x,
          y: pos.current.y,
          vx: Math.cos(a) * spd,
          vy: Math.sin(a) * spd,
          size: Math.random() * 3 + 1.5,
          alpha: 1.0,
          maxLife: 30,
          life: 0,
          color: Math.random() > 0.4 ? "#38e8ff" : "#f59e0b",
        });
      }
    };

    const handleBackToTop = () => {
      targetRotation.current = 90; // Point straight up
      flameIntensity.current = 2.5;
    };

    window.addEventListener("rocket-fly-to-contact", handleFlyToContact);
    window.addEventListener("rocket-back-to-top", handleBackToTop);

    // Visibility change (pause/resume when tab is blurred)
    let isTabVisible = true;
    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
      if (isTabVisible && !animId) {
        animId = requestAnimationFrame(render);
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Canvas setup
    const canvas = canvasRef.current;
    let ctx: CanvasRenderingContext2D | null = null;
    if (canvas) {
      ctx = canvas.getContext("2d");
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    const handleCanvasResize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleCanvasResize);

    // Main 60fps Animation Loop
    let animId: number;
    let time = 0;

    const render = () => {
      if (!isTabVisible) {
        animId = 0;
        return;
      }

      time += 0.016;

      // Dampen scroll speed smoothly
      scrollSpeed.current *= 0.92;

      const W = window.innerWidth;
      const H = window.innerHeight;
      const docHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        1
      );
      const maxScroll = Math.max(docHeight - H, 1);
      const scrollProgress = Math.min(1, Math.max(0, window.scrollY / maxScroll));

      // 1. LAUNCH ON LOAD PHASE
      if (lifecycle.current === "launching") {
        launchProgress.current += 0.018;
        pos.current.y += (heroSettleY - pos.current.y) * 0.06;
        pos.current.x = initX;
        flameIntensity.current = 1.8;
        targetRotation.current = -70;

        if (launchProgress.current >= 1 || Math.abs(pos.current.y - heroSettleY) < 4) {
          lifecycle.current = "floating";
          pos.current.y = heroSettleY;
        }
      }
      // 2. HERO GENTLE FLOATING LOOP OR SCROLL JOURNEY
      else if (!isReducedMotion) {
        // Compute path waypoints based on page sections
        // Section 0: Hero (Top Right)
        // Section 1: Skills (Curves around Left / Mid-left orbital plane)
        // Section 2: Experience / Projects (Curves across right & left)
        // Section 3: Contact (Curves into lower right anchor)
        let pathX = initX;
        let pathY = heroSettleY;
        let tangentAngle = -70;

        if (scrollProgress < 0.22) {
          // In Hero section
          const t = scrollProgress / 0.22;
          pathX = initX - t * (W * 0.25);
          pathY = heroSettleY + t * (H * 0.35);
          tangentAngle = -65 + t * 45;
        } else if (scrollProgress < 0.55) {
          // In Skills section (orbiting around the spheres)
          const t = (scrollProgress - 0.22) / 0.33;
          pathX = (W * (isMobile ? 0.8 : 0.86)) - Math.sin(t * Math.PI) * (W * 0.45);
          pathY = H * 0.32 + t * (H * 0.3);
          tangentAngle = -20 + Math.sin(t * Math.PI) * 55;
        } else if (scrollProgress < 0.82) {
          // In Experience & Projects section
          const t = (scrollProgress - 0.55) / 0.27;
          pathX = (W * 0.18) + t * (W * 0.62);
          pathY = H * 0.42 + t * (H * 0.25);
          tangentAngle = 25 - t * 40;
        } else {
          // In Contact section
          const t = (scrollProgress - 0.82) / 0.18;
          pathX = W * (isMobile ? 0.78 : 0.82) - Math.sin(t * Math.PI) * (W * 0.1);
          pathY = H * 0.55 + t * (H * 0.18);
          tangentAngle = -45;
        }

        // Add subtle floating bob
        const bob = Math.sin((time * 2 * Math.PI) / ROCKET_CONFIG.idleBobSpeed) * ROCKET_CONFIG.idleBobAmplitude;

        targetPos.current.x = pathX;
        targetPos.current.y = pathY + bob;

        // Smooth position interpolation
        pos.current.x += (targetPos.current.x - pos.current.x) * ROCKET_CONFIG.lerpFactor;
        pos.current.y += (targetPos.current.y - pos.current.y) * ROCKET_CONFIG.lerpFactor;

        // Smooth angle tracking
        targetRotation.current = tangentAngle;
        rotation.current += (targetRotation.current - rotation.current) * 0.1;

        // Dynamic flame intensity linked to scroll speed
        const speedBoost = Math.min(2.0, scrollSpeed.current * 0.14);
        const targetFlame = ROCKET_CONFIG.flameMin + speedBoost + (isHovered ? 0.8 : 0);
        flameIntensity.current += (targetFlame - flameIntensity.current) * 0.15;
      } else {
        // Reduced motion: static gentle float near hero
        pos.current = { x: initX, y: heroSettleY };
        rotation.current = -60;
        flameIntensity.current = 0.8;
      }

      // 3. EMIT STARDUST & SMOKE PARTICLES BEHIND THRUSTER
      const maxParticles = isMobile
        ? ROCKET_CONFIG.maxParticlesMobile
        : ROCKET_CONFIG.maxParticlesDesktop;

      if (flameIntensity.current > 0.6 && particles.current.length < maxParticles) {
        // Calculate nozzle position based on rocket rotation & center
        const rad = (rotation.current * Math.PI) / 180;
        const nozzleDist = isMobile ? 32 : 42;
        const nozzleX = pos.current.x + Math.cos(rad) * nozzleDist;
        const nozzleY = pos.current.y + Math.sin(rad) * nozzleDist;

        // Exhaust ejects opposite to heading
        const exhaustAngle = rad + (Math.random() - 0.5) * 0.45;
        const exhaustSpeed = Math.random() * 2.2 + flameIntensity.current * 1.5;

        particles.current.push({
          x: nozzleX,
          y: nozzleY,
          vx: Math.cos(exhaustAngle) * exhaustSpeed,
          vy: Math.sin(exhaustAngle) * exhaustSpeed,
          size: Math.random() * 2.8 + 1.4,
          alpha: 1.0,
          maxLife: Math.floor(Math.random() * 16) + 18,
          life: 0,
          color: Math.random() > 0.35 ? "#38bdf8" : "#f59e0b",
        });
      }

      // 4. DRAW EXHAUST PARTICLES ON CANVAS
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
          ctx.globalAlpha = Math.max(0, p.alpha * 0.8);
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * (1 - (p.life / p.maxLife) * 0.3), 0, Math.PI * 2);
          ctx.fill();

          // Subtle glowing spark
          if (p.life < 8) {
            ctx.strokeStyle = "#ffffff";
            ctx.lineWidth = 0.7;
            ctx.beginPath();
            ctx.moveTo(p.x - p.size, p.y);
            ctx.lineTo(p.x + p.size, p.y);
            ctx.moveTo(p.x, p.y - p.size);
            ctx.lineTo(p.x, p.y + p.size);
            ctx.stroke();
          }
          ctx.restore();
        }
      }

      // 5. UPDATE ROCKET DOM ELEMENT POSITION
      if (containerRef.current) {
        containerRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%)`;
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("resize", handleCanvasResize);
      window.removeEventListener("rocket-fly-to-contact", handleFlyToContact);
      window.removeEventListener("rocket-back-to-top", handleBackToTop);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      mediaQuery.removeEventListener("change", handleReducedMotion);
      if (animId) cancelAnimationFrame(animId);
    };
  }, [isReducedMotion, isHovered, isMobile]);

  const handleRocketClick = () => {
    setIsRolling(true);
    setTimeout(() => setIsRolling(false), 700);

    // Boost flame & sound wave burst
    flameIntensity.current = 2.4;

    // Dispatch custom sound event (uses stardust crash chime)
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("trigger-star-clash"));
    }
  };

  if (!mounted) return null;

  const currentSize = isMobile ? ROCKET_CONFIG.sizeMobile : ROCKET_CONFIG.sizeDesktop;

  return (
    <>
      {/* Particle Canvas for Rocket Exhaust */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[9990]"
        aria-hidden="true"
      />

      {/* Floating Rocket Layer (pointer-events: none on container, auto on Rocket) */}
      <div
        ref={containerRef}
        className="fixed top-0 left-0 pointer-events-none z-[9992] will-change-transform"
        aria-hidden="true"
      >
        <Rocket
          size={currentSize}
          flameIntensity={flameIntensity.current}
          rotation={rotation.current}
          isHovered={isHovered}
          isRolling={isRolling}
          onClick={handleRocketClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        />
      </div>
    </>
  );
};

export default RocketJourney;

