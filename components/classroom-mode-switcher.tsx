"use client"

import { motion } from "framer-motion"
import { Sunrise, Sun, Sunset, PartyPopper } from "lucide-react"
import { SITE_CONFIG, type ClassroomMode } from "@/lib/site-config"
import { useSiteExperience } from "@/lib/site-experience-context"

const ICONS: Record<ClassroomMode, typeof Sunrise> = {
  morning: Sunrise,
  day: Sun,
  evening: Sunset,
  celebration: PartyPopper,
}

const GRADIENTS: Record<ClassroomMode, string> = {
  morning: "from-[#fff7e6] via-[#eef6ff] to-[#f8fafc]",
  day: "from-[#eef6ff] via-[#f8fafc] to-[#ffffff]",
  evening: "from-[#eef2ff] via-[#f3e8ff] to-[#f8fafc]",
  celebration: "from-[#fff1d6] via-[#eef6ff] to-[#fff7e6]",
}

const MESSAGES: Record<ClassroomMode, string> = {
  morning: "Early classes, early doubts, early patience.",
  day: "Mid-day lectures that kept us going.",
  evening: "Evening revisions that felt like second lessons.",
  celebration: "Every mode, every mood — today, we celebrate you.",
}

export function ClassroomModeSwitcher() {
  const { classroomMode, setClassroomMode } = useSiteExperience()
  const Icon = ICONS[classroomMode]

  return (
    <section className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden px-4 py-24 transition-colors sm:px-6">
      <motion.div
        key={classroomMode}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className={`absolute inset-0 -z-10 bg-gradient-to-br ${GRADIENTS[classroomMode]}`}
      />

      <div className="mb-8 flex flex-col items-center gap-3 text-center">
        <span className="rounded-full border border-border bg-card/80 shadow-sm px-3 py-1 text-[11px] font-medium tracking-widest text-primary">
          EVERY HOUR, THEY SHOWED UP
        </span>
        <h2 className="font-heading text-3xl font-semibold text-foreground sm:text-4xl">Choose the classroom hour</h2>
      </div>

      <div className="glass-panel flex items-center gap-1.5 rounded-full p-1.5 shadow-md">
        {SITE_CONFIG.classroomModes.map((mode) => {
          const ModeIcon = ICONS[mode.id]
          const active = classroomMode === mode.id
          return (
            <button
              key={mode.id}
              data-magnetic
              onClick={() => setClassroomMode(mode.id)}
              aria-pressed={active}
              className={`relative flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-medium transition-colors sm:px-4 ${
                active ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {active && (
                <motion.span
                  layoutId="mode-active"
                  className="absolute inset-0 rounded-full bg-primary"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <ModeIcon className="relative z-10 h-3.5 w-3.5" />
              <span className="relative z-10">{mode.label}</span>
            </button>
          )
        })}
      </div>

      <motion.p
        key={`msg-${classroomMode}`}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-6 max-w-md text-pretty text-center text-sm text-muted-foreground"
      >
        {MESSAGES[classroomMode]}
      </motion.p>

      <motion.div className="mt-4 text-primary" aria-hidden="true">
        <Icon className="h-6 w-6" />
      </motion.div>
    </section>
  )
}
