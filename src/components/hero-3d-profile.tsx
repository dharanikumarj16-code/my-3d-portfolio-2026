"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { Sparkles, Cpu } from "lucide-react";
import { useSounds } from "@/hooks/use-sounds";

interface Hero3DProfileProps {
  imageUrl?: string;
}

export const Hero3DProfile: React.FC<Hero3DProfileProps> = ({
  imageUrl = "/assets/dharani-3d-portrait.jpg",
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);

  const [imageSrc, setImageSrc] = useState(imageUrl);
  const { playPressSound, playReleaseSound } = useSounds();

  useEffect(() => {
    setImageSrc(imageUrl);
  }, [imageUrl]);

  // 3D Neural Sphere Canvas Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let isIntersecting = true;
    let W = 0;
    let H = 0;
    const DPR = Math.min(window.devicePixelRatio || 1, 2);

    // Pause heavy 3D math and canvas drawing when scrolled out of view
    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersecting = entry.isIntersecting;
        if (isIntersecting && !animId) {
          animId = requestAnimationFrame(renderLoop);
        }
      },
      { threshold: 0.05 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    const updateSize = () => {
      if (!containerRef.current || !canvas) return;
      const rect = containerRef.current.getBoundingClientRect();
      W = rect.width;
      H = rect.height;
      canvas.width = W * DPR;
      canvas.height = H * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    };

    updateSize();
    window.addEventListener("resize", updateSize);

    // Initialize 3D Neural Nodes on Sphere
    const N = 110;
    const R = 230; // Radius calibrated for container
    const nodes: { x: number; y: number; z: number; h: number }[] = [];
    const links: [number, number][] = [];
    const pulses: { l: [number, number]; p: number }[] = [];

    for (let i = 0; i < N; i++) {
      const u = Math.random() * 2 - 1;
      const a = Math.random() * Math.PI * 2;
      const r = R * (0.45 + Math.random() * 0.75);
      const s = Math.sqrt(1 - u * u);
      nodes.push({
        x: r * s * Math.cos(a),
        y: r * u,
        z: r * s * Math.sin(a),
        h: Math.random() < 0.3 ? 270 : 188, // Cyan (188) and Violet (270)
      });
    }

    for (let i = 0; i < N; i++) {
      for (let j = i + 1; j < N; j++) {
        const a = nodes[i];
        const b = nodes[j];
        if (Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z) < 145) {
          links.push([i, j]);
        }
      }
    }

    let mx = 0;
    let my = 0;
    let tx = 0;
    let ty = 0;
    let t = 0;

    const handlePointerMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mx = (e.clientX - (rect.left + rect.width / 2)) / rect.width;
      my = (e.clientY - (rect.top + rect.height / 2)) / rect.height;

      if (cardRef.current) {
        cardRef.current.style.transform = `rotateY(${mx * 22}deg) rotateX(${-my * 18}deg)`;
      }
    };

    const handlePointerLeave = () => {
      mx = 0;
      my = 0;
      if (cardRef.current) {
        cardRef.current.style.transform = "rotateY(0deg) rotateX(0deg)";
      }
    };

    const containerEl = containerRef.current;
    if (containerEl) {
      containerEl.addEventListener("mousemove", handlePointerMove);
      containerEl.addEventListener("mouseleave", handlePointerLeave);
    }

    function proj(
      p: { x: number; y: number; z: number },
      ay: number,
      ax: number
    ) {
      let x = p.x * Math.cos(ay) - p.z * Math.sin(ay);
      let z = p.x * Math.sin(ay) + p.z * Math.cos(ay);
      let y = p.y * Math.cos(ax) - z * Math.sin(ax);
      z = p.y * Math.sin(ax) + z * Math.cos(ax);
      const f = 500 / (500 + z + 240);
      return { x: W / 2 + x * f, y: H / 2 + y * f, f, z };
    }

    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function renderLoop() {
      if (!ctx) return;
      t += still ? 0 : 0.003;
      tx += (mx - tx) * 0.04;
      ty += (my - ty) * 0.04;

      ctx.clearRect(0, 0, W, H);

      // Ambient radial gradient behind 3D card
      const g = ctx.createRadialGradient(
        W / 2,
        H / 2,
        0,
        W / 2,
        H / 2,
        Math.max(W, H) * 0.55
      );
      g.addColorStop(0, "rgba(30, 60, 110, 0.28)");
      g.addColorStop(1, "rgba(4, 7, 13, 0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);

      const P = nodes.map((n) => proj(n, t + tx * 1.2, ty * 0.8));

      // Draw Interconnected Neural Links
      ctx.lineWidth = 1;
      for (const [i, j] of links) {
        const a = P[i];
        const b = P[j];
        const d = (a.f + b.f) / 2;
        ctx.strokeStyle = `hsla(${nodes[i].h}, 90%, 65%, ${0.08 + d * 0.2})`;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }

      // Energy Pulses Flowing Across Links
      if (!still && Math.random() < 0.12 && pulses.length < 24 && links.length > 0) {
        pulses.push({
          l: links[Math.floor(Math.random() * links.length)],
          p: 0,
        });
      }

      for (let k = pulses.length - 1; k >= 0; k--) {
        const q = pulses[k];
        q.p += 0.02;
        if (q.p >= 1) {
          pulses.splice(k, 1);
          continue;
        }
        const a = P[q.l[0]];
        const b = P[q.l[1]];
        const px = a.x + (b.x - a.x) * q.p;
        const py = a.y + (b.y - a.y) * q.p;
        ctx.fillStyle = "rgba(180, 250, 255, 0.95)";
        ctx.shadowColor = "#38e8ff";
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(px, py, 2.0, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Neural Nodes
      for (let i = 0; i < N; i++) {
        const p = P[i];
        const r = 1.2 + p.f * 2.2;
        ctx.fillStyle = `hsla(${nodes[i].h}, 95%, 70%, ${0.3 + p.f * 0.45})`;
        ctx.shadowColor = `hsl(${nodes[i].h}, 95%, 65%)`;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      if (!isIntersecting) {
        animId = 0;
        return;
      }

      animId = requestAnimationFrame(renderLoop);
    }

    renderLoop();

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateSize);
      if (containerEl) {
        containerEl.removeEventListener("mousemove", handlePointerMove);
        containerEl.removeEventListener("mouseleave", handlePointerLeave);
      }
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      onClick={() => {
        playPressSound();
        setTimeout(playReleaseSound, 150);
      }}
      className="relative w-full max-w-[460px] lg:max-w-[500px] min-h-[380px] sm:min-h-[460px] aspect-[4/5] sm:aspect-square flex items-center justify-center cursor-pointer select-none perspective-[1000px] overflow-visible"
    >
      {/* 3D Neural Lines Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      />

      {/* 3D Tilt Card with Full Profile Image */}
      <div
        ref={cardRef}
        style={{
          transformStyle: "preserve-3d",
          transition: "transform 0.15s ease-out",
        }}
        className="relative z-10 w-[78vw] max-w-[340px] sm:max-w-[360px] aspect-[4/5] rounded-[28px] p-2.5 bg-gradient-to-br from-[#38e8ff]/35 to-[#a56bff]/35 shadow-[0_0_60px_rgba(56,232,255,0.28),0_0_120px_rgba(165,107,255,0.18)]"
      >
        {/* Full Image Profile Slot in 3D Depth */}
        <div
          style={{ transform: "translateZ(30px)" }}
          className="relative w-full h-full rounded-[20px] bg-[#02050a] overflow-hidden flex items-center justify-center shadow-2xl group"
        >
          <Image
            src={imageSrc}
            alt="Dharani Kumar J - AI & Data Science Engineer"
            fill
            priority
            fetchPriority="high"
            onError={() => setImageSrc("/assets/dharani-3d-portrait.jpg")}
            unoptimized={imageSrc.startsWith("http")}
            className="object-cover object-center w-full h-full transition-transform duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 80vw, 360px"
          />
          {/* Subtle bottom atmospheric vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#02050a]/60 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Floating Tag 1: Top Right */}
        <div
          style={{ transform: "translateZ(70px)" }}
          className="absolute -top-3.5 right-4 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-[12px] bg-[#040c16]/90 border border-[#38e8ff]/50 text-[#38e8ff] text-xs font-mono shadow-[0_4px_16px_rgba(56,232,255,0.25)] whitespace-nowrap"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#38e8ff] animate-pulse" />
          <span>AI &amp; Data Science</span>
        </div>

        {/* Floating Tag 2: Bottom Left */}
        <div
          style={{ transform: "translateZ(70px)" }}
          className="absolute -bottom-3.5 left-4 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-[12px] bg-[#040c16]/90 border border-[#2de2b0]/50 text-[#2de2b0] text-xs font-mono shadow-[0_4px_16px_rgba(45,226,176,0.25)] whitespace-nowrap"
        >
          <Cpu className="w-3.5 h-3.5 text-[#2de2b0]" />
          <span>Python · ML · Systems</span>
        </div>
      </div>
    </div>
  );
};

export default Hero3DProfile;
