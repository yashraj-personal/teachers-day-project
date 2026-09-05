"use client"

import { useState } from "react"
import { LoadingScreen } from "@/components/loading-screen"
import { ClassroomHero } from "@/components/classroom-hero"
import { ClassroomControls } from "@/components/classroom-controls"
import { MainHero } from "@/components/main-hero"
import { MusicPlayer } from "@/components/music-player"
import { FloatingWindows } from "@/components/floating-windows"
import { InteractiveBook } from "@/components/interactive-book"
import { GraduationCapScene } from "@/components/graduation-cap"
import { ClassroomModeSwitcher } from "@/components/classroom-mode-switcher"
import { GratitudeTerminal } from "@/components/gratitude-terminal"
import { GratitudeStats } from "@/components/gratitude-stats"
import { LetterPuzzle } from "@/components/letter-puzzle"
import { FinalTribute } from "@/components/final-tribute"
import { HoverRevealSection } from "@/components/hover-reveal-section"
import { GiftBox } from "@/components/gift-box"
import { PartyPopperControl } from "@/components/party-popper-control"
import { InfiniteEnding } from "@/components/infinite-ending"

export default function Page() {
  const [loaded, setLoaded] = useState(false)

  return (
    <>
      <LoadingScreen onDone={() => setLoaded(true)} />
      {loaded && (
        <main>
          <ClassroomHero />
          <MainHero />
          <MusicPlayer />
          <FloatingWindows />
          <InteractiveBook />
          <GraduationCapScene />
          <ClassroomModeSwitcher />
          <GratitudeTerminal />
          <GratitudeStats />
          <HoverRevealSection />
          <GiftBox />
          <LetterPuzzle />
          <FinalTribute />
          <InfiniteEnding />
          <ClassroomControls />
          <PartyPopperControl />
        </main>
      )}
    </>
  )
}
