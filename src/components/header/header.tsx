"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import styles from "./style.module.scss";
import { opacity } from "./anim";
import Nav from "./nav";
import { cn } from "@/lib/utils";
import FunnyThemeToggle from "../theme/funny-theme-toggle";
import { Button } from "../ui/button";
import { config } from "@/data/config";
import { GitHubFollowersButton } from "../ui/shadcn-io/github-followers-button";

interface HeaderProps {
  loader?: boolean;
}

const Header = ({ loader }: HeaderProps) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>("");

  // Lock background scrolling and allow Escape to close menu
  useEffect(() => {
    if (isActive) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") setIsActive(false);
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [isActive]);

  // Track active section for top capsule menu highlighting
  useEffect(() => {
    if (typeof window === "undefined" || window.location.pathname !== "/") return;

    const sections = ["skills", "experience", "projects", "contact"];
    const handleScroll = () => {
      const scrollY = window.scrollY;
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop - 140;
          const height = el.offsetHeight;
          if (scrollY >= top && scrollY < top + height) {
            setActiveSection(sectionId);
            return;
          }
        }
      }
      if (scrollY < 300) setActiveSection("");
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSectionClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    if (typeof window !== "undefined" && window.location.pathname === "/") {
      e.preventDefault();
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        window.history.pushState(null, "", `#${targetId}`);
        setActiveSection(targetId);
      }
    }
  };

  return (
    <>
      <motion.header
        className={cn(
          styles.header,
          "transition-colors delay-100 duration-500 ease-in z-[1000]"
        )}
        style={{
          background: isActive ? "hsl(var(--background) / .8)" : "transparent",
        }}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{
          delay: loader ? 3.5 : 0,
          duration: 0.8,
        }}
      >
        <div className={cn(styles.bar, "flex items-center justify-between")}>
          {/* Logo / Brand Name */}
          <Link href="/" className="flex items-center justify-center">
            <Button
              variant={"link"}
              className="text-md font-heading font-semibold tracking-[-0.01em] hover:no-underline text-foreground"
            >
              {config.title}
            </Button>
          </Link>

          {/* Desktop Quick Nav 3D Floating Capsule - Matched to Page Order */}
          <nav className="hidden lg:flex items-center gap-1 mx-auto px-3 py-1.5 rounded-full border border-t-white/15 border-x-slate-800 border-b-black/80 bg-slate-950/90 backdrop-blur-xl shadow-[0_8px_20px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.15),inset_0_-2px_0_rgba(0,0,0,0.6)]">
            <Link
              href="/#skills"
              onClick={(e) => handleSectionClick(e, "skills")}
              className={cn(
                "px-3 py-1 text-xs font-body font-medium rounded-full transition-all active:scale-95 cursor-pointer",
                activeSection === "skills"
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 shadow-[0_0_12px_rgba(6,182,212,0.3)]"
                  : "text-slate-300 hover:text-cyan-300 hover:bg-slate-900/90"
              )}
            >
              Skills
            </Link>
            <Link
              href="/#experience"
              onClick={(e) => handleSectionClick(e, "experience")}
              className={cn(
                "px-3 py-1 text-xs font-body font-medium rounded-full transition-all active:scale-95 cursor-pointer",
                activeSection === "experience"
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 shadow-[0_0_12px_rgba(6,182,212,0.3)]"
                  : "text-slate-300 hover:text-cyan-300 hover:bg-slate-900/90"
              )}
            >
              Experience
            </Link>
            <Link
              href="/#projects"
              onClick={(e) => handleSectionClick(e, "projects")}
              className={cn(
                "px-3 py-1 text-xs font-body font-medium rounded-full transition-all active:scale-95 cursor-pointer",
                activeSection === "projects"
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 shadow-[0_0_12px_rgba(6,182,212,0.3)]"
                  : "text-slate-300 hover:text-cyan-300 hover:bg-slate-900/90"
              )}
            >
              Projects
            </Link>
            <Link
              href="/about"
              className="px-3 py-1 text-xs font-body font-medium text-slate-300 hover:text-cyan-300 rounded-full hover:bg-slate-900/90 transition-all active:scale-95 cursor-pointer"
            >
              About
            </Link>
            <Link
              href="/resume"
              className="px-3 py-1 text-xs font-body font-medium text-slate-300 hover:text-cyan-300 rounded-full hover:bg-slate-900/90 transition-all active:scale-95 cursor-pointer"
            >
              Resume
            </Link>
            <Link
              href="/#contact"
              onClick={(e) => {
                handleSectionClick(e, "contact");
                if (typeof window !== "undefined") {
                  window.dispatchEvent(new CustomEvent("rocket-fly-to-contact"));
                }
              }}
              className={cn(
                "px-3.5 py-1 text-xs font-body font-semibold rounded-full border transition-all active:scale-95 cursor-pointer",
                activeSection === "contact"
                  ? "bg-cyan-400 text-slate-950 border-cyan-300 shadow-[0_0_16px_rgba(6,182,212,0.6)]"
                  : "text-cyan-300 bg-cyan-950/70 border-cyan-700/60 shadow-[0_3px_10px_rgba(6,182,212,0.25)] hover:bg-cyan-900/50"
              )}
            >
              Contact
            </Link>
          </nav>

          {/* Right Controls: Theme + Followers + Fullscreen Menu Trigger */}
          <div className="flex items-center">
            <FunnyThemeToggle className="w-6 h-6 mr-4 flex" />
            {config.githubUsername && (
              <GitHubFollowersButton
                username={config.githubUsername}
                className="mr-4"
              />
            )}
            <Button
              variant={"ghost"}
              onClick={() => setIsActive(!isActive)}
              className={cn(
                styles.el,
                "m-0 p-0 h-8 px-3 rounded-xl bg-slate-900/80 border border-t-white/15 border-x-slate-800 border-b-black/80 shadow-[0_3px_8px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.1)] flex items-center justify-center cursor-pointer active:translate-y-0.5",
                isActive && "border-cyan-400 text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.4)]"
              )}
              aria-label={isActive ? "Close Navigation Menu" : "Open Navigation Menu"}
            >
              <div className="relative hidden md:flex items-center">
                <motion.p variants={opacity} animate={!isActive ? "open" : "closed"}>
                  Menu
                </motion.p>
                <motion.p variants={opacity} animate={isActive ? "open" : "closed"}>
                  Close
                </motion.p>
              </div>
              <div
                className={`${styles.burger} ${
                  isActive ? styles.burgerActive : ""
                }`}
              ></div>
            </Button>
          </div>
        </div>

        {/* Fullscreen Backdrop Blur Overlay on all layers */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              onClick={() => setIsActive(false)}
              className="fixed inset-0 w-screen h-[100dvh] bg-slate-950/92 backdrop-blur-3xl z-[-1] cursor-pointer"
              style={{ WebkitBackdropFilter: "blur(28px)" }}
              aria-hidden="true"
            />
          )}
        </AnimatePresence>

        {/* Original Menu Layout */}
        <AnimatePresence mode="wait">
          {isActive && <Nav setIsActive={setIsActive} />}
        </AnimatePresence>
      </motion.header>
    </>
  );
};

export default Header;
