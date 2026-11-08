"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import styles from "./style.module.scss";
import { opacity, background } from "./anim";
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
  return (
    <motion.header
      className={cn(
        styles.header,
        "transition-colors delay-100 duration-500 ease-in z-[1000]"
      )}
      style={{
        background: isActive ? "hsl(var(--background) / .8)" : "transparent",
        // backgroundImage:
        //   "linear-gradient(0deg, rgba(0, 0, 0, 0), rgb(0, 0, 0))",
      }}
      initial={{
        y: -80,
      }}
      animate={{
        y: 0,
      }}
      transition={{
        delay: loader ? 3.5 : 0, // 3.5 for loading, .5 can be added for delay
        duration: 0.8,
      }}
    >
      {/* <div
        className="absolute inset-0 "
        style={{
          mask: "linear-gradient(rgb(0, 0, 0) 0%, rgba(0, 0, 0, 0) 12.5%)",
        }}
      >
      </div> */}
      <div className={cn(styles.bar, "flex items-center justify-between")}>
        <Link href="/" className="flex items-center justify-center">
          <Button variant={"link"} className="text-md font-heading font-semibold tracking-[-0.01em] hover:no-underline text-foreground">
            {config.title}
          </Button>
        </Link>

        {/* Desktop Quick Nav 3D Floating Capsule */}
        <nav className="hidden lg:flex items-center gap-1.5 mx-auto px-2.5 py-1.5 rounded-full border border-t-white/15 border-x-slate-800 border-b-black/80 bg-slate-950/80 backdrop-blur-xl shadow-[0_8px_20px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.15),inset_0_-2px_0_rgba(0,0,0,0.6)]">
          <Link
            href="/#projects"
            className="!static px-3 py-1 text-xs font-body font-medium text-slate-300 hover:text-cyan-300 rounded-full hover:bg-slate-900/90 shadow-[inset_0_1px_0_transparent] hover:shadow-[0_2px_6px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1)] transition-all active:scale-95 cursor-pointer"
          >
            Projects
          </Link>
          <Link
            href="/#skills"
            className="!static px-3 py-1 text-xs font-body font-medium text-slate-300 hover:text-cyan-300 rounded-full hover:bg-slate-900/90 shadow-[inset_0_1px_0_transparent] hover:shadow-[0_2px_6px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1)] transition-all active:scale-95 cursor-pointer"
          >
            Skills
          </Link>
          <Link
            href="/#experience"
            className="!static px-3 py-1 text-xs font-body font-medium text-slate-300 hover:text-cyan-300 rounded-full hover:bg-slate-900/90 shadow-[inset_0_1px_0_transparent] hover:shadow-[0_2px_6px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1)] transition-all active:scale-95 cursor-pointer"
          >
            Experience
          </Link>
          <Link
            href="/about"
            className="!static px-3 py-1 text-xs font-body font-medium text-slate-300 hover:text-cyan-300 rounded-full hover:bg-slate-900/90 shadow-[inset_0_1px_0_transparent] hover:shadow-[0_2px_6px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1)] transition-all active:scale-95 cursor-pointer"
          >
            About
          </Link>
          <Link
            href="/resume"
            className="!static px-3 py-1 text-xs font-body font-medium text-slate-300 hover:text-cyan-300 rounded-full hover:bg-slate-900/90 shadow-[inset_0_1px_0_transparent] hover:shadow-[0_2px_6px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1)] transition-all active:scale-95 cursor-pointer"
          >
            Resume
          </Link>
          <Link
            href="/#contact"
            onClick={() => {
              if (typeof window !== "undefined") {
                window.dispatchEvent(new CustomEvent("rocket-fly-to-contact"));
              }
            }}
            className="!static px-3.5 py-1 text-xs font-body font-semibold text-cyan-300 bg-cyan-950/70 border border-t-white/20 border-cyan-700/60 border-b-cyan-950 rounded-full shadow-[0_3px_10px_rgba(6,182,212,0.25),inset_0_1px_0_rgba(255,255,255,0.3)] hover:bg-cyan-900/50 hover:shadow-[0_4px_14px_rgba(6,182,212,0.4)] transition-all active:scale-95 cursor-pointer"
          >
            Contact
          </Link>
        </nav>

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
              "m-0 p-0 h-8 px-3 rounded-xl bg-slate-900/80 border border-t-white/15 border-x-slate-800 border-b-black/80 shadow-[0_3px_8px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.1)] flex items-center justify-center cursor-pointer active:translate-y-0.5"
            )}
          >
            <div className="relative hidden md:flex items-center">
              <motion.p
                variants={opacity}
                animate={!isActive ? "open" : "closed"}
              >
                Menu
              </motion.p>
              <motion.p variants={opacity} animate={isActive ? "open" : "closed"}>
                Close
              </motion.p>
            </div>
            <div
              className={`${styles.burger} ${isActive ? styles.burgerActive : ""
                }`}
            ></div>
          </Button>
        </div>
      </div>
      <motion.div
        variants={background}
        initial="initial"
        animate={isActive ? "open" : "closed"}
        className={styles.background}
      ></motion.div>
      <AnimatePresence mode="wait">
        {isActive && <Nav setIsActive={setIsActive} />}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
