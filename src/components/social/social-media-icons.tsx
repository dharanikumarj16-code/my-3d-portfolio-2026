"use client";

import { useInView } from "framer-motion";
import React, { useRef } from "react";
import { Button } from "../ui/button";
import { SiGithub, SiUpwork, SiLeetcode } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa6";
import { config } from "@/data/config";
import Link from "next/link";

const BUTTONS = [
  ...(config.social.upwork
    ? [
        {
          name: "Upwork",
          href: config.social.upwork,
          icon: <SiUpwork size={"24"} color={"#fff"} />,
        },
      ]
    : []),
  {
    name: "Github",
    href: config.social.github,
    icon: <SiGithub size={"24"} color={"#fff"} />,
  },
  {
    name: "LinkedIn",
    href: config.social.linkedin,
    icon: <FaLinkedin size={"24"} color={"#fff"} />,
  },
  ...(config.social.leetcode
    ? [
        {
          name: "LeetCode",
          href: config.social.leetcode,
          icon: <SiLeetcode size={"24"} color={"#FFA116"} />,
        },
      ]
    : []),
];

const SocialMediaButtons = () => {
  const ref = useRef<HTMLDivElement>(null);
  const show = useInView(ref, { once: true });
  return (
    <div ref={ref} className="z-10">
      {show &&
        BUTTONS.map((button) => (
          <Link href={button.href} key={button.name} target="_blank">
            <Button variant={"ghost"}>{button.icon}</Button>
          </Link>
        ))}
    </div>
  );
};

export default SocialMediaButtons;
