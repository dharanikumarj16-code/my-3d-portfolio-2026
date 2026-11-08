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
        {/* Left Column: Contact Form */}
        <div className="lg:col-span-7">
          <Card className="w-full bg-slate-950/85 backdrop-blur-xl rounded-2xl border border-slate-800/90 shadow-2xl shadow-cyan-950/20">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span className="text-xs font-mono uppercase tracking-wider text-cyan-400">
                  Direct Inquiries &amp; Collaborations
                </span>
              </div>
              <CardTitle className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                Send a Message
              </CardTitle>
              <CardDescription className="text-sm sm:text-base text-slate-300">
                Reach out directly via email at{" "}
                <a
                  target="_blank"
                  href={`mailto:${config.email}`}
                  className="text-cyan-400 hover:text-cyan-300 font-semibold underline underline-offset-4 cursor-pointer transition-colors"
                >
                  {config.email}
                </a>{" "}
                or fill in your details below.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ContactForm />
            </CardContent>
          </Card>
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
                className="w-full h-full object-contain filter drop-shadow-2xl transition-transform duration-300 hover:scale-[1.03]"
              />
            </div>

            {/* Connected Status Card */}
            <div className="relative z-20 -mt-6 w-full rounded-2xl border border-cyan-500/30 bg-slate-950/85 backdrop-blur-xl p-5 shadow-xl shadow-cyan-500/10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                  Available for Hire &amp; Collaboration
                </span>
                <span className="flex items-center gap-1 text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-cyan-950/70 text-cyan-300 border border-cyan-700/50">
                  <Sparkles className="w-3 h-3 text-cyan-400" />
                  AI &amp; Data Science
                </span>
              </div>

              <p className="text-xs text-zinc-300 leading-relaxed">
                Interested in building innovative AI agents, custom machine learning models, or automated systems? Send a message and let&apos;s turn vision into reality.
              </p>

              <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-400">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  Tamil Nadu, India
                </span>
                <span className="font-mono text-[11px] text-zinc-400">
                  ⚡ Fast Response (&lt; 24h)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default ContactSection;
