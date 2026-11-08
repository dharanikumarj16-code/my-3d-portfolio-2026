"use client";
import React from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ContactForm from "../ContactForm";
import { config } from "@/data/config";
import { SectionHeader } from "./section-header";
import SectionWrapper from "../ui/section-wrapper";
import { MapPin, Sparkles } from "lucide-react";
import { Card3D } from "../ui/card-3d";

const ContactSection = () => {
  return (
    <SectionWrapper id="contact" className="min-h-[100dvh] max-w-7xl mx-auto px-4 sm:px-6">
      <SectionHeader
        id="contact"
        className="relative mb-10 md:mb-14"
        title={
          <>
            LET&apos;S WORK <br />
            TOGETHER
          </>
        }
      />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center z-[10] mt-6">
        {/* Left Column: Contact Form in 3D */}
        <div className="lg:col-span-7">
          <Card3D
            maxTilt={5}
            depth={10}
            glare={true}
            className="w-full bg-slate-950/85 backdrop-blur-xl rounded-3xl border border-t-white/15 border-x-slate-800 border-b-black/80 shadow-[0_16px_35px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.12),inset_0_-2px_0_rgba(0,0,0,0.8)]"
          >
            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-2 mb-2" style={{ transform: "translateZ(8px)" }}>
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping shadow-[0_0_8px_#22d3ee]" />
                <span className="text-[11px] font-mono font-medium uppercase tracking-[0.02em] text-cyan-400">
                  Direct Inquiries &amp; Collaborations
                </span>
              </div>
              <h3
                className="text-card-heading font-heading font-semibold text-white tracking-[-0.01em] mb-2 text-balance"
                style={{ transform: "translateZ(12px)" }}
              >
                Send a Message
              </h3>
              <p
                className="text-xs sm:text-sm font-body text-slate-300/85 mb-6 max-w-[65ch] leading-relaxed"
                style={{ transform: "translateZ(8px)" }}
              >
                Reach out directly via email at{" "}
                <a
                  target="_blank"
                  href={`mailto:${config.email}`}
                  className="text-cyan-400 hover:text-cyan-300 font-medium underline underline-offset-4 cursor-pointer transition-colors"
                >
                  {config.email}
                </a>{" "}
                or fill in your details below.
              </p>
              <div style={{ transform: "translateZ(10px)" }}>
                <ContactForm />
              </div>
            </div>
          </Card3D>
        </div>

        {/* Right Column: Original 3D Avatar Profile & Connect Card */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center">
          <div className="relative w-full max-w-[420px] flex flex-col items-center">
            {/* Ambient AI Cyan/Purple Halo */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] rounded-full bg-gradient-to-tr from-cyan-500/25 via-indigo-500/20 to-purple-500/20 blur-[80px] pointer-events-none" />

            {/* Cyber Ring Background Accent */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] rounded-full border border-cyan-500/20 bg-slate-950/20 pointer-events-none" />

            {/* 3D Character Avatar Image */}
            <div className="relative z-10 w-full h-[360px] sm:h-[420px] flex items-center justify-center drop-shadow-[0_20px_45px_rgba(6,182,212,0.35)]">
              <Image
                src="/assets/dharani-3d-avatar.png"
                alt="Dharani Kumar J - 3D AI Developer Avatar"
                width={440}
                height={480}
                priority
                className="w-full h-full object-contain filter drop-shadow-2xl transition-transform duration-500 hover:scale-[1.04]"
              />
            </div>

            {/* Connected Status Card in 3D */}
            <div className="relative z-20 -mt-6 w-full">
              <Card3D
                maxTilt={6}
                depth={10}
                glare={true}
                className="w-full rounded-2xl border border-cyan-500/40 bg-slate-950/90 backdrop-blur-xl p-5 shadow-[0_12px_30px_rgba(0,0,0,0.7),0_0_20px_rgba(6,182,212,0.15),inset_0_1px_0_rgba(255,255,255,0.2)] space-y-3"
              >
                <div className="flex items-center justify-between" style={{ transform: "translateZ(8px)" }}>
                  <span className="flex items-center gap-2 text-xs font-mono font-medium tracking-[0.01em] text-emerald-400">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 shadow-[0_0_8px_#10b981]"></span>
                    </span>
                    Available for Hire &amp; Collaboration
                  </span>
                  <span className="flex items-center gap-1 text-[11px] font-mono font-medium tracking-[0.02em] px-2.5 py-0.5 rounded-full bg-cyan-950/80 text-cyan-300 border border-cyan-700/60 shadow-sm">
                    <Sparkles className="w-3 h-3 text-cyan-400" />
                    AI &amp; Data Science
                  </span>
                </div>

                <p className="text-xs font-body text-slate-300/85 leading-relaxed max-w-[65ch]" style={{ transform: "translateZ(6px)" }}>
                  Interested in building innovative AI agents, custom machine learning models, or automated systems? Send a message and let&apos;s turn vision into reality.
                </p>

                <div
                  className="pt-2 border-t border-zinc-800/80 flex items-center justify-between text-xs font-body text-slate-400"
                  style={{ transform: "translateZ(6px)" }}
                >
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                    Tamil Nadu, India
                  </span>
                  <span className="font-mono text-[11px] font-medium tracking-[0.02em] text-cyan-300">
                    ⚡ Fast Response (&lt; 24h)
                  </span>
                </div>
              </Card3D>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default ContactSection;
