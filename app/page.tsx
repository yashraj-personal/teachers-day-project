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
import { SecretTeacherMode } from "@/components/secret-teacher-mode"
import { LetterPuzzle } from "@/components/letter-puzzle"
import { FinalTribute } from "@/components/final-tribute"

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
          <SecretTeacherMode />
          <LetterPuzzle />
          <FinalTribute />
          <ClassroomControls />
        </main>
      )}
    </>
  )
}
