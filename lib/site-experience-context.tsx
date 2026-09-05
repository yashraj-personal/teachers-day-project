"use client"

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react"
import type { ClassroomMode } from "./site-config"

type ConnectionState = "connecting" | "connected" | "strong"

type SiteExperienceValue = {
  activeSection: string
  setActiveSection: (id: string) => void
  progress: number
  setProgress: (value: number) => void
  connection: ConnectionState
  setConnection: (state: ConnectionState) => void
  classroomMode: ClassroomMode
  setClassroomMode: (mode: ClassroomMode) => void
  audioPlaying: boolean
  setAudioPlaying: (playing: boolean) => void
  teacherModeActive: boolean
  activateTeacherMode: () => void
}

const SiteExperienceContext = createContext<SiteExperienceValue | null>(null)

export function SiteExperienceProvider({ children }: { children: ReactNode }) {
  const [activeSection, setActiveSection] = useState("home")
  const [progress, setProgress] = useState(0)
  const [connection, setConnection] = useState<ConnectionState>("strong")
  const [classroomMode, setClassroomMode] = useState<ClassroomMode>("day")
  const [audioPlaying, setAudioPlaying] = useState(false)
  const [teacherModeActive, setTeacherModeActive] = useState(false)

  const activateTeacherMode = useCallback(() => setTeacherModeActive(true), [])

  const value = useMemo(
    () => ({
      activeSection,
      setActiveSection,
      progress,
      setProgress,
      connection,
      setConnection,
      classroomMode,
      setClassroomMode,
      audioPlaying,
      setAudioPlaying,
      teacherModeActive,
      activateTeacherMode,
    }),
    [activeSection, progress, connection, classroomMode, audioPlaying, teacherModeActive, activateTeacherMode],
  )

  return <SiteExperienceContext.Provider value={value}>{children}</SiteExperienceContext.Provider>
}

export function useSiteExperience() {
  const ctx = useContext(SiteExperienceContext)
  if (!ctx) throw new Error("useSiteExperience must be used within SiteExperienceProvider")
  return ctx
}
