import { cn } from "@/lib/utils";
import { BoxReveal } from "../reveal-animations";
import { ReactNode } from "react";

export const SectionHeader = ({
  id,
  title,
  desc,
  eyebrow,
  className,
}: {
  id: string;
  title: string | ReactNode;
  desc?: string;
  eyebrow?: string;
  className?: string;
}) => {
  return (
    <div className={cn("relative mb-10 md:mb-14 text-center z-20", className)}>
      {eyebrow && (
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-medium tracking-[0.02em] uppercase mb-3 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span>{eyebrow}</span>
        </div>
      )}
      <BoxReveal width="100%">
        <h2
          className={cn(
            "text-section-heading font-heading font-semibold tracking-[-0.01em] leading-[1.15] text-balance",
            "text-white"
          )}
        >
          {title}
        </h2>
      </BoxReveal>
      {desc && (
        <p className="mx-auto pt-3 max-w-[65ch] font-body font-normal text-body-fluid text-slate-300/85 leading-[1.6] text-pretty">
          {desc}
        </p>
      )}
    </div>
  );
};
