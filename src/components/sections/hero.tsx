import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { File, Github, Linkedin } from "lucide-react";
import { getProfile } from "@/lib/supabase/data-service";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { usePreloader } from "../preloader";
import { BlurIn, BoxReveal } from "../reveal-animations";
import ScrollDownIcon from "../scroll-down-icon";
import { SiGithub, SiUpwork, SiLeetcode } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa6";
import { config } from "@/data/config";

import SectionWrapper from "../ui/section-wrapper";
import Hero3DProfile from "../hero-3d-profile";

const HeroSection = () => {
  const { isLoading } = usePreloader();
  const [resumeUrl, setResumeUrl] = useState(config.resumeUrl || "/assets/dharani-kumar-j-resume.pdf");

  useEffect(() => {
    getProfile()
      .then((p) => {
        if (p?.resume_url) setResumeUrl(p.resume_url);
      })
      .catch(() => {});
  }, []);

  return (
    <SectionWrapper id="hero" className={cn("relative w-full min-h-[100dvh] h-auto md:h-[100dvh]")}>
      <div className="grid grid-cols-1 md:grid-cols-2 items-center">
        <div
          className={cn(
            "h-auto md:h-[calc(100dvh-4rem)] z-[2]",
            "col-span-1",
            "flex flex-col justify-start md:justify-center items-center md:items-start",
            "pt-24 sm:pt-28 pb-6 md:p-20 lg:p-24 xl:p-28"
          )}
        >
          {!isLoading && (
            <div className="flex flex-col">
              <div>
                <BlurIn delay={0.7}>
                  <p
                    className={cn(
                      "md:self-start mt-4 font-thin text-md text-slate-500 dark:text-zinc-400",
                      "cursor-default font-display sm:text-xl md:text-xl whitespace-nowrap bg-clip-text "
                    )}
                  >
                    Hi, I am
                    <br className="md:hidden" />
                  </p>
                </BlurIn>

                <BlurIn delay={1}>
                  <Tooltip delayDuration={300}>
                    <TooltipTrigger asChild>
                      <h1
                        className={cn(
                          "-ml-[4px] leading-none font-thin text-transparent text-slate-800 text-left mt-1",
                          "font-thin text-7xl md:text-7xl lg:text-8xl xl:text-9xl",
                          "cursor-default text-edge-outline font-display "
                        )}
                      >
                        {config.author.split(" ")[0]}
                        <span className="md:hidden"> </span>
                        <br className="hidden md:block" />
                        {config.author.split(" ").slice(1).join(" ")}
                      </h1>
                    </TooltipTrigger>
                    <TooltipContent
                      side="top"
                      className="dark:bg-white dark:text-black"
                    >
                      Artificial Intelligence & Data Science Student
                    </TooltipContent>
                  </Tooltip>
                </BlurIn>
                <BlurIn delay={1.2}>
                  <p
                    className={cn(
                      "md:self-start mt-2 font-thin text-md text-slate-500 dark:text-zinc-400",
                      "cursor-default font-display sm:text-xl md:text-xl whitespace-nowrap bg-clip-text "
                    )}
                  >
                    Artificial Intelligence & Data Science Student
                  </p>
                </BlurIn>
              </div>
              <div className="mt-6 flex flex-col gap-3 w-fit">
                <Link
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <BoxReveal delay={2} width="100%">
                    <Button className="flex items-center gap-2 w-full shadow-md">
                      <File size={22} />
                      <p>View / Download Resume</p>
                    </Button>
                  </BoxReveal>
                </Link>
                <div className="md:self-start flex gap-3">
                  <Tooltip delayDuration={300}>
                    <TooltipTrigger asChild>
                      <Link href={"#contact"}>
                        <Button
                          variant={"outline"}
                          className="block w-full overflow-hidden"
                        >
                          Hire Me
                        </Button>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                      <p>Get in touch with Dharani Kumar J</p>
                    </TooltipContent>
                  </Tooltip>
                  <div className="flex items-center h-full gap-2">
                    <Link
                      href={config.social.github}
                      target="_blank"
                      className="cursor-can-hover"
                      title="GitHub"
                    >
                      <Button variant={"outline"} size="icon">
                        <SiGithub size={20} />
                      </Button>
                    </Link>
                    <Link
                      href={config.social.linkedin}
                      target="_blank"
                      className="cursor-can-hover"
                      title="LinkedIn"
                    >
                      <Button variant={"outline"} size="icon">
                        <FaLinkedin size={20} />
                      </Button>
                    </Link>
                    {config.social.leetcode && (
                      <Link
                        href={config.social.leetcode}
                        target="_blank"
                        className="cursor-can-hover"
                        title="LeetCode"
                      >
                        <Button variant={"outline"} size="icon">
                          <SiLeetcode size={20} className="text-[#FFA116]" />
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="flex col-span-1 items-center justify-center p-4 lg:p-8 z-10 pb-12 md:pb-0" id="hero-profile-container">
          {!isLoading && <Hero3DProfile />}
        </div>
      </div>
      <div className="hidden md:block absolute bottom-8 left-[50%] translate-x-[-50%]">
        <ScrollDownIcon />
      </div>
    </SectionWrapper>
  );
};

export default HeroSection;
