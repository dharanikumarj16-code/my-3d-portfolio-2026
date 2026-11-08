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
          <Button variant={"link"} className="text-md font-bold tracking-tight hover:no-underline text-foreground">
            {config.title}
          </Button>
        </Link>

        {/* Desktop Quick Nav Pill */}
        <nav className="hidden lg:flex items-center gap-1 mx-auto px-2 py-1 rounded-full border border-slate-800/80 bg-slate-950/70 backdrop-blur-md shadow-lg shadow-black/20">
          <Link
            href="/#projects"
            className="!static px-3 py-1 text-xs font-medium text-slate-300 hover:text-cyan-400 rounded-full hover:bg-slate-900/80 transition-colors"
          >
            Projects
          </Link>
          <Link
            href="/#skills"
            className="!static px-3 py-1 text-xs font-medium text-slate-300 hover:text-cyan-400 rounded-full hover:bg-slate-900/80 transition-colors"
          >
            Skills
          </Link>
          <Link
            href="/#experience"
            className="!static px-3 py-1 text-xs font-medium text-slate-300 hover:text-cyan-400 rounded-full hover:bg-slate-900/80 transition-colors"
          >
            Experience
          </Link>
          <Link
            href="/about"
            className="!static px-3 py-1 text-xs font-medium text-slate-300 hover:text-cyan-400 rounded-full hover:bg-slate-900/80 transition-colors"
          >
            About
          </Link>
          <Link
            href="/resume"
            className="!static px-3 py-1 text-xs font-medium text-slate-300 hover:text-cyan-400 rounded-full hover:bg-slate-900/80 transition-colors"
          >
            Resume
          </Link>
          <Link
            href="/#contact"
            className="!static px-3 py-1 text-xs font-medium text-cyan-400 hover:text-cyan-300 bg-cyan-950/60 border border-cyan-800/50 rounded-full hover:bg-cyan-900/40 transition-colors"
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
              "m-0 p-0 h-6 bg-transparent flex items-center justify-center cursor-pointer"
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
              className={`${styles.burger} ${
                isActive ? styles.burgerActive : ""
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
