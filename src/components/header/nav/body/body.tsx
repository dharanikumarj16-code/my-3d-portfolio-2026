import { motion } from "framer-motion";
import Link from "next/link";
import styles from "./style.module.scss";
import { blur, translate } from "../../anim";
import { Link as LinkType } from "@/types";
import { cn } from "@/lib/utils";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import FunnyThemeToggle from "@/components/theme/funny-theme-toggle";

interface SelectedLink {
  isActive: boolean;
  index: number;
}

interface BodyProps {
  links: LinkType[];
  selectedLink: SelectedLink;
  setSelectedLink: (selectedLink: SelectedLink) => void;
  setIsActive: (isActive: boolean) => void;
}

export default function Body({
  links,
  selectedLink,
  setSelectedLink,
  setIsActive,
}: BodyProps) {
  const params = useParams();
  const [currentHref, setCurrentHref] = useState("/");
  useEffect(() => {
    if (typeof window === "undefined") return;
    const { pathname, hash } = window.location;
    setCurrentHref(pathname + hash);
  }, [params]);

  const getChars = (word: string) => {
    let chars: JSX.Element[] = [];
    word.split("").forEach((char, i) => {
      chars.push(
        <motion.span
          className="pointer-events-none"
          custom={[i * 0.02, (word.length - i) * 0.01]}
          variants={translate}
          initial="initial"
          animate="enter"
          exit="exit"
          key={char + i}
        >
          {char}
        </motion.span>
      );
    });
    return chars;
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setIsActive(false);
    if (href.startsWith("/#") && window.location.pathname === "/") {
      e.preventDefault();
      const targetId = href.replace("/#", "");
      const el = document.getElementById(targetId);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
          window.history.pushState(null, "", href);
        }, 150);
      }
    }
  };

  return (
    <div className={cn(styles.body, "flex flex-col items-start")}>
      {links.map((link, index) => {
        const { title, href, target } = link;
        const isSelected = selectedLink.isActive && selectedLink.index === index;

        return (
          <Link
            key={`l_${index}`}
            href={href}
            target={target}
            onClick={(e) => handleLinkClick(e, href)}
            className="cursor-can-hover group relative flex items-baseline gap-4 py-2 transition-transform duration-200 hover:translate-x-3"
            onMouseEnter={() => setSelectedLink({ isActive: true, index })}
            onFocus={() => setSelectedLink({ isActive: true, index })}
          >
            <span className="font-mono text-xs text-cyan-400/70 group-hover:text-cyan-300">
              0{index + 1}
            </span>
            <motion.p
              className={cn(
                "font-heading font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight transition-colors duration-200",
                isSelected
                  ? "text-cyan-300 drop-shadow-[0_0_20px_rgba(34,211,238,0.5)]"
                  : currentHref === href
                    ? "text-white underline underline-offset-8 decoration-cyan-400"
                    : "text-slate-400 group-hover:text-white"
              )}
              variants={blur}
              animate={
                selectedLink.isActive && selectedLink.index !== index
                  ? "open"
                  : "closed"
              }
            >
              {getChars(title)}
            </motion.p>
          </Link>
        );
      })}
    </div>
  );
}
