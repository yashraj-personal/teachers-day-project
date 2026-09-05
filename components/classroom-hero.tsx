"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Mic, MicOff, Video, MessageSquare, ChevronDown } from "lucide-react"
import { SITE_CONFIG } from "@/lib/site-config"
import { useSiteExperience } from "@/lib/site-experience-context"

const STATUS_SEQUENCE = ["Connecting...", "Checking classroom...", "Connecting to teacher...", "CONNECTED"]

const DIALOGUE = [
  "Can everyone see the screen?",
  "Yes ma'am, loud and clear.",
  "Good. Let's begin today's lesson.",
]

const TILES = [
  { initials: "AK", muted: true },
  { initials: "RS", muted: false },
  { initials: "PT", muted: true },
  { initials: "MJ", muted: true },
]

export function ClassroomHero() {
  const { setConnection } = useSiteExperience()
  const [statusIndex, setStatusIndex] = useState(0)
  const [showDialogue, setShowDialogue] = useState(false)
  const [showFinal, setShowFinal] = useState(false)

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = []
    setConnection("connecting")
    STATUS_SEQUENCE.forEach((_, i) => {
      timers.push(
        setTimeout(() => {
          setStatusIndex(i)
          if (STATUS_SEQUENCE[i] === "CONNECTED") setConnection("connected")
        }, i * 900),
      )
    })
    timers.push(setTimeout(() => setShowDialogue(true), STATUS_SEQUENCE.length * 900 + 300))
    timers.push(
      setTimeout(() => {
        setShowFinal(true)
        setConnection("strong")
      }, STATUS_SEQUENCE.length * 900 + 300 + DIALOGUE.length * 1000 + 400),
    )
    return () => timers.forEach(clearTimeout)
  }, [setConnection])

  const scrollToNext = () => {
    document.getElementById("main-hero")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-app-gradient px-4 py-20 sm:px-6"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <AnimatePresence mode="wait">
        {!showFinal ? (
          <motion.div
            key="call"
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.5 }}
            className="flex w-full max-w-3xl flex-col items-center gap-6"
          >
            <div className="glass-panel glow-ring w-full rounded-3xl p-4 sm:p-6">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {TILES.map((tile, i) => (
                  <motion.div
                    key={tile.initials}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="relative flex aspect-square flex-col items-center justify-center gap-2 rounded-2xl bg-secondary"
                  >
                    <span className="font-heading text-lg font-semibold text-primary">{tile.initials}</span>
                    <span className="absolute bottom-1.5 right-1.5 rounded-full bg-white/80 p-1">
                      {tile.muted ? (
                        <MicOff className="h-3 w-3 text-muted-foreground" />
                      ) : (
                        <Mic className="h-3 w-3 text-connected" />
                      )}
                    </span>
                  </motion.div>
                ))}
              </div>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="relative mt-3 flex h-40 flex-col items-center justify-center gap-2 rounded-2xl bg-gradient-to-br from-primary/15 via-sky/10 to-gold/15 sm:h-48"
              >
                <motion.div
                  animate={{ boxShadow: ["0 0 0 0 rgba(37,99,235,0.25)", "0 0 0 18px rgba(37,99,235,0)"] }}
                  transition={{ duration: 1.8, repeat: Number.POSITIVE_INFINITY }}
                  className="flex h-16 w-16 items-center justify-center rounded-full bg-primary font-heading text-xl font-semibold text-primary-foreground"
                >
                  T
                </motion.div>
                <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                  Our Teachers
                </span>
                <span className="absolute bottom-2 right-2 rounded-full bg-white/80 p-1">
                  <Video className="h-3.5 w-3.5 text-connected" />
                </span>
                <span className="absolute left-2 top-2 flex items-center gap-1 rounded-full bg-white/80 px-2 py-0.5">
                  <MessageSquare className="h-3 w-3 text-primary" />
                  <span className="text-[10px] font-medium text-primary">3</span>
                </span>
              </motion.div>
            </div>

            <div className="flex min-h-[2.5rem] items-center justify-center">
              <AnimatePresence mode="wait">
                {!showDialogue ? (
                  <motion.p
                    key={statusIndex}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="text-sm font-medium tracking-wide text-muted-foreground"
                  >
                    {STATUS_SEQUENCE[statusIndex]}
                  </motion.p>
                ) : (
                  <DialogueLines />
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="final"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col items-center gap-5 text-center"
          >
            <span className="rounded-full border border-border bg-white/70 px-3 py-1 text-[11px] font-medium tracking-widest text-primary">
              {SITE_CONFIG.institute} · {SITE_CONFIG.batchName}
            </span>
            <h1 className="font-heading text-balance-tight text-4xl font-semibold leading-[1.05] text-foreground sm:text-6xl md:text-7xl">
              HAPPY <span className="text-gradient-primary">{SITE_CONFIG.occasion}</span>
            </h1>
            <p className="max-w-md text-pretty text-sm text-muted-foreground sm:text-base">
              A tribute from every student who ever unmuted with a doubt, and every teacher who never let it go
              unanswered.
            </p>
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground">
              {SITE_CONFIG.date}
            </p>
            <motion.button
              data-magnetic
              onClick={scrollToNext}
              whileHover={{ y: 2 }}
              className="mt-2 flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/25"
            >
              Enter the tribute
              <motion.span animate={{ y: [0, 4, 0] }} transition={{ duration: 1.4, repeat: Number.POSITIVE_INFINITY }}>
                <ChevronDown className="h-4 w-4" />
              </motion.span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

function DialogueLines() {
  const [visible, setVisible] = useState(1)
  useEffect(() => {
    const timers = DIALOGUE.map((_, i) =>
      setTimeout(() => setVisible(i + 2), i * 900),
    )
    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <div className="flex flex-col items-center gap-1">
      {DIALOGUE.slice(0, visible).map((line, i) => (
        <motion.p
          key={line}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-muted-foreground"
        >
          {line}
        </motion.p>
      ))}
    </div>
  )
}
