"use client";

import AIBackground from "@/components/ai-background";
import EasterEggs from "@/components/easter-eggs";
import SpaceshipCursor from "@/components/ui/spaceship-cursor";
import RocketJourney from "@/components/ui/rocket-journey";

export default function AppOverlays() {
  return (
    <>
      <AIBackground />
      <EasterEggs />
      <RocketJourney />
      <SpaceshipCursor />
    </>
  );
}
