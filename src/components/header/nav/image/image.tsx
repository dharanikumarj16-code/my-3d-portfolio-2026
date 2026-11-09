import React from "react";
import Image from "next/image";
import { EnhancedLink } from "@/components/header/config";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

interface IndexProps {
  item: EnhancedLink;
  isActive: boolean;
}

const NavImage: React.FC<IndexProps> = ({ item, isActive }) => {
  return (
    <div
      className={cn(
        "hidden lg:flex flex-col justify-center items-center w-[420px] xl:w-[460px] shrink-0 transition-all duration-300 pointer-events-none select-none",
        isActive ? "opacity-100 scale-100" : "opacity-0 scale-95"
      )}
    >
      <div className="relative w-full rounded-3xl bg-slate-900/90 border border-cyan-500/30 p-5 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.15)] overflow-hidden">
        {/* Glow ambient background */}
        <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-cyan-500/20 blur-3xl pointer-events-none" />

        {/* Header row */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 mb-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]" />
            <span className="text-xs font-mono font-medium tracking-[0.02em] text-cyan-300">
              {item.tag || "Section Preview"}
            </span>
          </div>
          <span className="text-xs font-body font-medium text-slate-400">
            {item.title}
          </span>
        </div>

        {/* Image mockup frame */}
        <div className="relative w-full h-[220px] rounded-2xl overflow-hidden bg-slate-950 border border-slate-800/80 shadow-inner">
          <Image
            src={item.thumbnail}
            alt={item.title}
            fill
            className="object-cover object-top transition-all duration-500"
            sizes="460px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Content info */}
        <div className="mt-4 space-y-1">
          <h4 className="text-sm font-heading font-semibold text-white tracking-tight flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>{item.subtitle || item.title}</span>
          </h4>
          <p className="text-xs font-body text-slate-300/85 leading-relaxed line-clamp-2">
            {item.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NavImage;
