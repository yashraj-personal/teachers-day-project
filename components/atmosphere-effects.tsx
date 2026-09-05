"use client"

import { useEffect, useMemo, useRef } from "react"
import { motion } from "framer-motion"
import { useSiteExperience } from "@/lib/site-experience-context"

const confetti = Array.from({ length: 28 }, (_, index) => ({
  left: `${(index * 37) % 100}%`,
  delay: `${(index % 7) * 0.13}s`,
  color: index % 3 === 0 ? "var(--gold)" : index % 3 === 1 ? "var(--primary)" : "var(--accent)",
}))

export function AtmosphereEffects() {
  const { classroomMode, audioPlaying, audioPulse, partyPopperActive } = useSiteExperience()
  const previousMode = useRef(classroomMode)
  const celebrationStarted = classroomMode === "celebration" && previousMode.current !== "celebration"

  useEffect(() => {
    previousMode.current = classroomMode
  }, [classroomMode])

  const sceneLabel = useMemo(() => {
    if (classroomMode === "morning") return "Morning light"
    if (classroomMode === "evening") return "Evening glow"
    if (classroomMode === "celebration") return "Celebration mode"
    return "Classroom light"
  }, [classroomMode])

  return (
    <div className={`pointer-events-none fixed inset-0 z-10 overflow-hidden atmosphere atmosphere-${classroomMode}`} aria-hidden="true">
      <motion.div
        className="audio-backlight"
        animate={{ opacity: audioPlaying ? 0.12 + audioPulse * 0.2 : 0.04, scale: 1 + audioPulse * 0.08 }}
        transition={{ duration: 0.18, ease: "easeOut" }}
      />
      <span className="sr-only">{sceneLabel}</span>
      {classroomMode === "morning" && <div className="morning-rays" />}
      {classroomMode === "evening" && <div className="evening-stars" />}
      {classroomMode === "celebration" && (
        <div className={`confetti-layer ${celebrationStarted ? "confetti-layer-active" : ""}`}>
          {confetti.map((piece, index) => (
            <span key={`celebration-${index}`} style={{ left: piece.left, animationDelay: piece.delay, backgroundColor: piece.color }} />
          ))}
        </div>
      )}
      {partyPopperActive && (
        <div key={String(partyPopperActive)} className="confetti-layer confetti-layer-active confetti-layer-global">
          {Array.from({ length: 90 }, (_, index) => {
            const piece = confetti[index % confetti.length]
            return <span key={`party-${index}`} style={{ left: `${(index * 17) % 100}%`, animationDelay: `${(index % 15) * 0.045}s`, backgroundColor: index % 4 === 0 ? "var(--gold)" : index % 4 === 1 ? "var(--primary)" : index % 4 === 2 ? "var(--accent)" : "var(--connected)" }} />
          })}
        </div>
      )}
    </div>
  )
}
