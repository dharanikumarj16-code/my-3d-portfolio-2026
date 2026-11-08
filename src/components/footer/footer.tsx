"use client";
import React from "react";
import Link from "next/link";
import Lottie from "lottie-react";
import { footer } from "./config";
import { Button } from "../ui/button";
import SocialMediaButtons from "../social/social-media-icons";
import { config } from "@/data/config";
import comingSoonAnim from "../../../public/assets/lottie/developer.json";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalTrigger,
  useModal,
} from "../ui/animated-modal";
import { ArrowUp } from "lucide-react";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="flex w-full shrink-0 flex-col items-center gap-4 border-t border-slate-800/80 bg-slate-950/80 backdrop-blur-md px-4 py-8 sm:flex-row md:px-8 sm:justify-between z-20">
      <p className="text-xs font-body text-slate-400 tabular-nums">
        © {year} {config.author}. All rights reserved.
      </p>
      <SocialMediaButtons />
      <div className="flex items-center gap-4 z-10">
        <button
          onClick={() => {
            if (typeof window !== "undefined") {
              window.dispatchEvent(new CustomEvent("rocket-back-to-top"));
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/90 border border-t-white/20 border-x-slate-800 border-b-black/80 hover:border-cyan-400 text-xs font-body font-semibold whitespace-nowrap text-slate-300 hover:text-cyan-300 shadow-[0_4px_10px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.1)] hover:-translate-y-0.5 active:translate-y-0.5 transition-all cursor-pointer"
          title="Boost to Top with Rocket"
        >
          <ArrowUp className="w-3.5 h-3.5 text-cyan-400" />
          <span>Top</span>
        </button>
      </div>
      <nav className="flex gap-4 sm:gap-6 z-10">
        {footer.map((link, index) => {
          const { title, href } = link;
          const isComingSoon =
            title.toLowerCase() === "blog" ||
            title.toLowerCase() === "newsletter";

          if (isComingSoon) {
            return (
              <Modal key={`modal_${index}`}>
                <ModalTrigger className="bg-transparent p-0 text-xs underline-offset-4 hover:underline">
                  <span className="p-0 h-auto text-xs">{title}</span>
                </ModalTrigger>
                <ComingSoonModal />
              </Modal>
            );
          }

          return (
            <Link
              className="text-xs underline-offset-4 hover:underline"
              href={href}
              key={`l_${index}`}
            >
              <Button variant={"link"} className="p-0 h-auto text-xs">
                {title}
              </Button>
            </Link>
          );
        })}
      </nav>
    </footer>
  );
}

const ComingSoonModal = () => {
  const { setOpen } = useModal();
  return (
    <ModalBody className="md:max-w-lg h-full">
      <ModalContent className="items-center gap-6 text-center">
      <Lottie
        animationData={comingSoonAnim}
        loop
        className="w-44 h-auto md:w-52 mx-auto -mt-16 -mb-4"
      />
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">
            Heads up! Fun stuff loading…
          </h3>
          <p className="text-sm text-muted-foreground">
            We&apos;re brewing the next drop—grab a coffee and stick around.
          </p>
        </div>
        <Button onClick={() => setOpen(false)} className="self-center">
          Got it
        </Button>
      </ModalContent>
    </ModalBody>
  );
};

export default Footer;
