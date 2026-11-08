"use client";

import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

interface Star {
  x: number;
  y: number;
  depth: number; // 0.1 (distant) to 1.0 (foreground)
  radius: number;
  baseAlpha: number;
  color: string;
  twinkleSpeed: number;
  twinklePhase: number;
  hasGlint: boolean;
  // Computed render positions for connecting lines
  renderX: number;
  renderY: number;
}

interface Stardust {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  maxLife: number;
  life: number;
  rotation: number;
  rotSpeed: number;
}

interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  alpha: number;
  active: boolean;
}

// Pure White & Warm White (Light Yellow) palette for Dark Mode (No Blue/Purple)
const DARK_STAR_COLORS = [
  "#ffffff", // Pure White
  "#ffffff", // Pure White
  "#f8fafc", // Bright Starlight White
  "#fffbeb", // Soft Warm White
  "#fef9c3", // Light Warm Yellow
  "#fef08a", // Warm Starlight Glow
];

// Elegant contrast palette for Light Mode (White Mode)
const LIGHT_STAR_COLORS = [
  "#0f172a", // Deep Slate
  "#1e293b", // Slate Charcoal
  "#334155", // Neutral Charcoal
  "#475569", // Soft Slate
  "#78716c", // Warm Stone
];

const AIBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? (resolvedTheme || theme) !== "light" : true;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let width = (canvas.width = window.innerWidth * dpr);
    let height = (canvas.height = window.innerHeight * dpr);
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth * dpr;
      height = canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      initStars();
    };

    window.addEventListener("resize", handleResize);

    // Mouse coordinates and velocity tracking for interactive navigation
    const mouse = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      lastX: window.innerWidth / 2,
      lastY: window.innerHeight / 2,
      vx: 0,
      vy: 0,
      isMoving: false,
      idleTimer: 0,
    };

    // Smooth interpolated camera parallax
    const camera = {
      targetX: 0,
      targetY: 0,
      currX: 0,
      currY: 0,
    };

    const stardustList: Stardust[] = [];
    const MAX_STARDUST = 80;

    let lastSpawnX = 0;
    let lastSpawnY = 0;

    const activeStarColors = isDark ? DARK_STAR_COLORS : LIGHT_STAR_COLORS;

    const handleMouseMove = (e: MouseEvent) => {
      const clientX = e.clientX;
      const clientY = e.clientY;

      mouse.vx = clientX - mouse.lastX;
      mouse.vy = clientY - mouse.lastY;
      mouse.lastX = clientX;
      mouse.lastY = clientY;
      mouse.x = clientX;
      mouse.y = clientY;
      mouse.isMoving = true;
      mouse.idleTimer = 0;

      // Parallax target relative to center
      camera.targetX = (clientX - window.innerWidth / 2) * 0.05;
      camera.targetY = (clientY - window.innerHeight / 2) * 0.05;

      // Emit stardust particles along cursor path when moving
      const dist = Math.hypot(clientX - lastSpawnX, clientY - lastSpawnY);
      if (dist > 6) {
        lastSpawnX = clientX;
        lastSpawnY = clientY;

        const count = Math.min(Math.floor(dist / 7), 3);
        for (let i = 0; i < count; i++) {
          if (stardustList.length < MAX_STARDUST) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 1.4 + 0.3;
            stardustList.push({
              x: clientX + (Math.random() - 0.5) * 8,
              y: clientY + (Math.random() - 0.5) * 8,
              vx: Math.cos(angle) * speed + mouse.vx * 0.07,
              vy: Math.sin(angle) * speed + mouse.vy * 0.07 - 0.25,
              size: Math.random() * 2.0 + 1.0,
              color: activeStarColors[Math.floor(Math.random() * activeStarColors.length)],
              alpha: 1.0,
              maxLife: Math.floor(Math.random() * 24) + 28,
              life: 0,
              rotation: Math.random() * Math.PI,
              rotSpeed: (Math.random() - 0.5) * 0.1,
            });
          }
        }
      }
    };

    const handleMouseLeave = () => {
      mouse.isMoving = false;
      camera.targetX = 0;
      camera.targetY = 0;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    // Populate multi-depth 3D starfield
    let stars: Star[] = [];
    const initStars = () => {
      const area = window.innerWidth * window.innerHeight;
      const count = Math.min(Math.max(Math.floor(area / 4400), 150), 320);
      stars = [];

      for (let i = 0; i < count; i++) {
        const depth = Math.random() * 0.9 + 0.1; // 0.1 (far) to 1.0 (near)
        const isForeground = depth > 0.65;

        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          depth,
          radius: (Math.random() * 1.5 + 0.6) * (depth * 1.1 + 0.4),
          baseAlpha: isDark
            ? Math.random() * 0.45 + 0.35
            : Math.random() * 0.35 + 0.25,
          color: activeStarColors[Math.floor(Math.random() * activeStarColors.length)],
          twinkleSpeed: Math.random() * 0.03 + 0.01,
          twinklePhase: Math.random() * Math.PI * 2,
          hasGlint: isForeground && Math.random() > 0.4,
          renderX: 0,
          renderY: 0,
        });
      }
    };

    initStars();

    // Occasional shooting star across the cosmic background
    const shootingStar: ShootingStar = {
      x: 0,
      y: 0,
      length: 120,
      speed: 16,
      angle: Math.PI / 4,
      alpha: 0,
      active: false,
    };

    let shootingStarCooldown = Math.floor(Math.random() * 280) + 200;

    const spawnShootingStar = () => {
      shootingStar.x = Math.random() * width * 0.8;
      shootingStar.y = Math.random() * height * 0.4;
      shootingStar.angle = Math.PI / 4 + (Math.random() - 0.5) * 0.3;
      shootingStar.length = Math.random() * 110 + 70;
      shootingStar.speed = Math.random() * 7 + 13;
      shootingStar.alpha = 1.0;
      shootingStar.active = true;
    };

    let time = 0;

    // Main 60fps render loop
    const render = () => {
      time += 0.016;

      ctx.clearRect(0, 0, width, height);

      // Smooth camera interpolation for cursor navigation parallax
      camera.currX += (camera.targetX * dpr - camera.currX) * 0.06;
      camera.currY += (camera.targetY * dpr - camera.currY) * 0.06;

      // Mouse idle decay
      mouse.idleTimer++;
      if (mouse.idleTimer > 12) {
        mouse.vx *= 0.85;
        mouse.vy *= 0.85;
      }

      const mouseCanvasX = mouse.x * dpr;
      const mouseCanvasY = mouse.y * dpr;
      const mouseRadius = 130 * dpr;

      // 1. UPDATE STAR POSITIONS & COMPUTE PARALLAX / WARP
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        // Cosmic autonomous drift
        star.y += star.depth * 0.16;
        if (star.y > height) {
          star.y = 0;
          star.x = Math.random() * width;
        }

        // 3D Parallax shift from cursor navigation
        let renderX = star.x - camera.currX * (star.depth * 1.5);
        let renderY = star.y - camera.currY * (star.depth * 1.5);

        // Gravitational warp around moving cursor
        const dx = mouseCanvasX - renderX;
        const dy = mouseCanvasY - renderY;
        const dist = Math.hypot(dx, dy);

        if (dist < mouseRadius && dist > 1) {
          const force = (mouseRadius - dist) / mouseRadius;
          const push = force * 16 * star.depth;
          renderX -= (dx / dist) * push;
          renderY -= (dy / dist) * push;
        }

        star.renderX = renderX;
        star.renderY = renderY;
      }

      // 2. DRAW LIGHT DELICATE CONSTELLATION CONNECTING LINES BETWEEN NEARBY STARS
      const maxConnectionDist = 95 * dpr;
      for (let i = 0; i < stars.length; i++) {
        const p1 = stars[i];
        let connections = 0;

        for (let j = i + 1; j < stars.length; j++) {
          if (connections >= 2) break; // Light, subtle network density
          const p2 = stars[j];

          // Connect stars that reside in roughly the same 3D depth plane
          if (Math.abs(p1.depth - p2.depth) > 0.35) continue;

          const cdx = p1.renderX - p2.renderX;
          const cdy = p1.renderY - p2.renderY;
          const cdist = Math.hypot(cdx, cdy);

          if (cdist < maxConnectionDist) {
            connections++;
            // Very light line opacity
            const alphaFactor = (1 - cdist / maxConnectionDist);
            const lineAlpha = isDark ? alphaFactor * 0.12 : alphaFactor * 0.08;

            ctx.beginPath();
            ctx.moveTo(p1.renderX, p1.renderY);
            ctx.lineTo(p2.renderX, p2.renderY);
            ctx.strokeStyle = isDark
              ? `rgba(255, 250, 230, ${lineAlpha})`
              : `rgba(51, 65, 85, ${lineAlpha})`;
            ctx.lineWidth = 0.65 * dpr;
            ctx.stroke();
          }
        }
      }

      // 3. RENDER THE STARS (PURE WHITE & WARM WHITE)
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        // Shimmering twinkle calculation
        const twinkle = Math.sin(time * 3 * star.twinkleSpeed * 100 + star.twinklePhase);
        const currentAlpha = Math.max(
          0.15,
          Math.min(1.0, star.baseAlpha + twinkle * 0.35)
        );

        ctx.save();
        ctx.globalAlpha = currentAlpha;

        // Soft warm/white halo on brighter/closer stars
        if (star.depth > 0.65) {
          const haloGrad = ctx.createRadialGradient(
            star.renderX,
            star.renderY,
            0,
            star.renderX,
            star.renderY,
            star.radius * 3.2
          );
          haloGrad.addColorStop(
            0,
            isDark ? "rgba(255, 250, 220, 0.45)" : "rgba(30, 41, 59, 0.18)"
          );
          haloGrad.addColorStop(1, "transparent");
          ctx.fillStyle = haloGrad;
          ctx.beginPath();
          ctx.arc(star.renderX, star.renderY, star.radius * 3.2, 0, Math.PI * 2);
          ctx.fill();
        }

        // Star core
        ctx.fillStyle = star.color;
        ctx.beginPath();
        ctx.arc(star.renderX, star.renderY, star.radius, 0, Math.PI * 2);
        ctx.fill();

        // 4-Point Star Glint for prominent foreground stars
        if (star.hasGlint && currentAlpha > 0.52) {
          const glintLen = star.radius * (3.5 + twinkle * 1.0);
          ctx.strokeStyle = isDark ? "#ffffff" : "#1e293b";
          ctx.lineWidth = 0.75 * dpr;

          ctx.beginPath();
          ctx.moveTo(star.renderX - glintLen, star.renderY);
          ctx.lineTo(star.renderX + glintLen, star.renderY);
          ctx.moveTo(star.renderX, star.renderY - glintLen);
          ctx.lineTo(star.renderX, star.renderY + glintLen);
          ctx.stroke();
        }

        ctx.restore();
      }

      // 4. RENDER CURSOR STARDUST TRAIL (PURE WHITE & WARM WHITE)
      for (let i = stardustList.length - 1; i >= 0; i--) {
        const p = stardustList[i];
        p.life++;
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotSpeed;
        p.alpha = Math.max(0, 1.0 - p.life / p.maxLife);

        if (p.life >= p.maxLife || p.alpha <= 0) {
          stardustList.splice(i, 1);
          continue;
        }

        const px = p.x * dpr;
        const py = p.y * dpr;
        const pSize = p.size * dpr * (1.0 - (p.life / p.maxLife) * 0.4);

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.translate(px, py);
        ctx.rotate(p.rotation);

        // Glowing core
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(0, 0, pSize * 0.7, 0, Math.PI * 2);
        ctx.fill();

        // Sparkle glint cross
        const sGlint = pSize * 2.0;
        ctx.strokeStyle = isDark ? "#ffffff" : "#1e293b";
        ctx.lineWidth = 0.85 * dpr;
        ctx.beginPath();
        ctx.moveTo(-sGlint, 0);
        ctx.lineTo(sGlint, 0);
        ctx.moveTo(0, -sGlint);
        ctx.lineTo(0, sGlint);
        ctx.stroke();

        ctx.restore();
      }

      // 5. SHOOTING STARS / METEORS (WARM WHITE & PURE WHITE)
      if (!shootingStar.active) {
        shootingStarCooldown--;
        if (shootingStarCooldown <= 0) {
          spawnShootingStar();
          shootingStarCooldown = Math.floor(Math.random() * 320) + 240;
        }
      } else {
        shootingStar.x += Math.cos(shootingStar.angle) * shootingStar.speed * dpr;
        shootingStar.y += Math.sin(shootingStar.angle) * shootingStar.speed * dpr;
        shootingStar.alpha -= 0.016;

        if (
          shootingStar.alpha <= 0 ||
          shootingStar.x > width + 100 ||
          shootingStar.y > height + 100
        ) {
          shootingStar.active = false;
        } else {
          ctx.save();
          ctx.globalAlpha = shootingStar.alpha;

          const tailX =
            shootingStar.x - Math.cos(shootingStar.angle) * shootingStar.length * dpr;
          const tailY =
            shootingStar.y - Math.sin(shootingStar.angle) * shootingStar.length * dpr;

          const meteorGrad = ctx.createLinearGradient(
            tailX,
            tailY,
            shootingStar.x,
            shootingStar.y
          );

          if (isDark) {
            meteorGrad.addColorStop(0, "rgba(254, 240, 138, 0)");
            meteorGrad.addColorStop(0.7, "rgba(255, 253, 245, 0.7)");
            meteorGrad.addColorStop(1, "rgba(255, 255, 255, 1.0)");
          } else {
            meteorGrad.addColorStop(0, "rgba(71, 85, 105, 0)");
            meteorGrad.addColorStop(0.7, "rgba(30, 41, 59, 0.5)");
            meteorGrad.addColorStop(1, "rgba(15, 23, 42, 0.9)");
          }

          ctx.strokeStyle = meteorGrad;
          ctx.lineWidth = 1.7 * dpr;
          ctx.beginPath();
          ctx.moveTo(tailX, tailY);
          ctx.lineTo(shootingStar.x, shootingStar.y);
          ctx.stroke();

          // Meteor head glowing diamond
          ctx.fillStyle = isDark ? "#ffffff" : "#0f172a";
          ctx.beginPath();
          ctx.arc(shootingStar.x, shootingStar.y, 2.2 * dpr, 0, Math.PI * 2);
          ctx.fill();

          ctx.restore();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDark]);

  return (
    <div
      className={cn(
        "fixed inset-0 pointer-events-none -z-10 overflow-hidden transition-colors duration-500",
        isDark ? "bg-[#000000]" : "bg-[#ffffff]"
      )}
    >
      {/* Deep pure black background in dark mode with ultra-subtle warm celestial dusk */}
      {isDark && (
        <>
          <div className="absolute -top-[25%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-amber-500/[0.025] blur-[160px] pointer-events-none" />
          <div className="absolute -bottom-[20%] right-[10%] w-[55vw] h-[55vw] rounded-full bg-white/[0.015] blur-[170px] pointer-events-none" />
        </>
      )}

      {/* Interactive 3D Stars, Constellations & Stardust Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
    </div>
  );
};

export default AIBackground;
