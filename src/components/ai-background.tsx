"use client";

import React, { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

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

const STAR_COLORS = [
  "#ffffff", // Brilliant White
  "#38bdf8", // Diamond Cyan
  "#22d3ee", // Electric Cyan
  "#2dd4bf", // Vibrant Teal
  "#c084fc", // Soft Celestial Violet
  "#fef08a", // Warm Gold Starlight
];

const AIBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { theme } = useTheme();

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
    const MAX_STARDUST = 90;

    let lastSpawnX = 0;
    let lastSpawnY = 0;

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
      camera.targetX = (clientX - window.innerWidth / 2) * 0.055;
      camera.targetY = (clientY - window.innerHeight / 2) * 0.055;

      // Emit stardust particles along cursor path when moving
      const dist = Math.hypot(clientX - lastSpawnX, clientY - lastSpawnY);
      if (dist > 5) {
        lastSpawnX = clientX;
        lastSpawnY = clientY;

        const count = Math.min(Math.floor(dist / 6), 3);
        for (let i = 0; i < count; i++) {
          if (stardustList.length < MAX_STARDUST) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 1.5 + 0.3;
            stardustList.push({
              x: clientX + (Math.random() - 0.5) * 8,
              y: clientY + (Math.random() - 0.5) * 8,
              vx: Math.cos(angle) * speed + mouse.vx * 0.08,
              vy: Math.sin(angle) * speed + mouse.vy * 0.08 - 0.3,
              size: Math.random() * 2.2 + 1.0,
              color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
              alpha: 1.0,
              maxLife: Math.floor(Math.random() * 25) + 30,
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
      const count = Math.min(Math.max(Math.floor(area / 4200), 160), 340);
      stars = [];

      for (let i = 0; i < count; i++) {
        const depth = Math.random() * 0.9 + 0.1; // 0.1 (far) to 1.0 (near)
        const isForeground = depth > 0.7;

        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          depth,
          radius: (Math.random() * 1.6 + 0.5) * (depth * 1.2 + 0.4),
          baseAlpha: Math.random() * 0.5 + 0.35,
          color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
          twinkleSpeed: Math.random() * 0.03 + 0.01,
          twinklePhase: Math.random() * Math.PI * 2,
          hasGlint: isForeground && Math.random() > 0.35,
        });
      }
    };

    initStars();

    // Occasional shooting star across the cosmic background
    const shootingStar: ShootingStar = {
      x: 0,
      y: 0,
      length: 120,
      speed: 18,
      angle: Math.PI / 4,
      alpha: 0,
      active: false,
    };

    let shootingStarCooldown = Math.floor(Math.random() * 250) + 180;

    const spawnShootingStar = () => {
      shootingStar.x = Math.random() * width * 0.8;
      shootingStar.y = Math.random() * height * 0.4;
      shootingStar.angle = (Math.PI / 4) + (Math.random() - 0.5) * 0.3;
      shootingStar.length = Math.random() * 100 + 80;
      shootingStar.speed = Math.random() * 8 + 14;
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

      // 1. RENDER & UPDATE STARS
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        // Cosmic autonomous drift (gentle ambient movement)
        star.y += star.depth * 0.18;
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
          const push = force * 18 * star.depth;
          renderX -= (dx / dist) * push;
          renderY -= (dy / dist) * push;
        }

        // Shimmering twinkle calculation
        const twinkle = Math.sin(time * 3 * star.twinkleSpeed * 100 + star.twinklePhase);
        const currentAlpha = Math.max(
          0.15,
          Math.min(1.0, star.baseAlpha + twinkle * 0.35)
        );

        ctx.save();
        ctx.globalAlpha = currentAlpha;

        // Soft halo on brighter/closer stars
        if (star.depth > 0.6) {
          const haloGrad = ctx.createRadialGradient(
            renderX,
            renderY,
            0,
            renderX,
            renderY,
            star.radius * 3.5
          );
          haloGrad.addColorStop(0, star.color);
          haloGrad.addColorStop(1, "transparent");
          ctx.fillStyle = haloGrad;
          ctx.beginPath();
          ctx.arc(renderX, renderY, star.radius * 3.5, 0, Math.PI * 2);
          ctx.fill();
        }

        // Star core
        ctx.fillStyle = star.color;
        ctx.beginPath();
        ctx.arc(renderX, renderY, star.radius, 0, Math.PI * 2);
        ctx.fill();

        // 4-Point Star Glint for prominent foreground stars
        if (star.hasGlint && currentAlpha > 0.55) {
          const glintLen = star.radius * (3.8 + twinkle * 1.2);
          ctx.strokeStyle = star.color;
          ctx.lineWidth = 0.8 * dpr;

          ctx.beginPath();
          ctx.moveTo(renderX - glintLen, renderY);
          ctx.lineTo(renderX + glintLen, renderY);
          ctx.moveTo(renderX, renderY - glintLen);
          ctx.lineTo(renderX, renderY + glintLen);
          ctx.stroke();
        }

        ctx.restore();
      }

      // 2. RENDER CURSOR STARDUST TRAIL
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
        const sGlint = pSize * 2.2;
        ctx.strokeStyle = p.color;
        ctx.lineWidth = 0.9 * dpr;
        ctx.beginPath();
        ctx.moveTo(-sGlint, 0);
        ctx.lineTo(sGlint, 0);
        ctx.moveTo(0, -sGlint);
        ctx.lineTo(0, sGlint);
        ctx.stroke();

        ctx.restore();
      }

      // 3. SHOOTING STARS / METEORS
      if (!shootingStar.active) {
        shootingStarCooldown--;
        if (shootingStarCooldown <= 0) {
          spawnShootingStar();
          shootingStarCooldown = Math.floor(Math.random() * 320) + 220;
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
          meteorGrad.addColorStop(0, "rgba(34, 211, 238, 0)");
          meteorGrad.addColorStop(0.7, "rgba(56, 189, 248, 0.6)");
          meteorGrad.addColorStop(1, "rgba(255, 255, 255, 1.0)");

          ctx.strokeStyle = meteorGrad;
          ctx.lineWidth = 1.8 * dpr;
          ctx.beginPath();
          ctx.moveTo(tailX, tailY);
          ctx.lineTo(shootingStar.x, shootingStar.y);
          ctx.stroke();

          // Meteor head glowing diamond
          ctx.fillStyle = "#ffffff";
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
  }, [theme]);

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
      {/* Ambient Deep Space Cosmic Dust Nebulae */}
      <div className="absolute -top-[20%] -left-[10%] w-[55vw] h-[55vw] rounded-full bg-cyan-600/10 blur-[140px] dark:bg-cyan-500/12 pointer-events-none" />
      <div className="absolute top-[35%] -right-[15%] w-[50vw] h-[50vw] rounded-full bg-violet-600/10 blur-[150px] dark:bg-indigo-600/12 pointer-events-none" />
      <div className="absolute -bottom-[20%] left-[20%] w-[60vw] h-[60vw] rounded-full bg-emerald-600/6 blur-[160px] dark:bg-emerald-500/10 pointer-events-none" />

      {/* Interactive 3D Stars & Stardust Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
    </div>
  );
};

export default AIBackground;
