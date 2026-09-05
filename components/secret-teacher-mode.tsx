"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { KeyRound, Lock, Unlock, GraduationCap } from "lucide-react"
import { SITE_CONFIG } from "@/lib/site-config"
import { useSiteExperience } from "@/lib/site-experience-context"

export function SecretTeacherMode() {
  const { teacherModeActive, activateTeacherMode } = useSiteExperience()
  const [code, setCode] = useState("")
  const [error, setError] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (code.trim().toUpperCase() === SITE_CONFIG.teacherModeCode) {
      activateTeacherMode()
      setError(false)
    } else {
      setError(true)
      setTimeout(() => setError(false), 1200)
    }
  }

  return (
    <section className="relative flex min-h-[60vh] flex-col items-center justify-center bg-app-gradient px-4 py-24 sm:px-6">
      <div className="mb-8 flex flex-col items-center gap-3 text-center">
        <span className="rounded-full border border-border bg-white/70 px-3 py-1 text-[11px] font-medium tracking-widest text-primary">
          FOR EDUCATORS ONLY
        </span>
        <h2 className="font-heading text-3xl font-semibold text-foreground sm:text-4xl">A hidden staff room</h2>
        <p className="max-w-md text-pretty text-sm text-muted-foreground">
          If you&apos;re one of our teachers, you already know the code. It was on the very first slide.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {!teacherModeActive ? (
          <motion.form
            key="lock"
            exit={{ opacity: 0, scale: 0.95 }}
            onSubmit={handleSubmit}
            className="glass-panel flex w-full max-w-sm flex-col items-center gap-4 rounded-2xl p-6"
          >
            <motion.div
              animate={error ? { x: [0, -8, 8, -8, 0] } : {}}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-primary"
            >
              <Lock className="h-5 w-5" />
            </motion.div>
            <label htmlFor="teacher-code" className="sr-only">
              Teacher access code
            </label>
            <div className="flex w-full items-center gap-2 rounded-full border border-border bg-white/80 px-4 py-2">
              <KeyRound className="h-3.5 w-3.5 text-muted-foreground" />
              <input
                id="teacher-code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Enter access code"
                className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
              />
            </div>
            <button
              data-magnetic
              type="submit"
              className="w-full rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/25"
            >
              Unlock
            </button>
            {error && <p className="text-xs text-destructive">That&apos;s not quite it. Try again.</p>}
          </motion.form>
        ) : (
          <motion.div
            key="unlocked"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel glow-ring flex w-full max-w-md flex-col items-center gap-3 rounded-2xl p-8 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="flex h-14 w-14 items-center justify-center rounded-full bg-gold-gradient text-foreground"
            >
              <Unlock className="h-6 w-6" />
            </motion.div>
            <GraduationCap className="h-5 w-5 text-primary" />
            <p className="font-heading text-lg font-semibold text-foreground">Welcome, Teacher.</p>
            <p className="text-sm text-pretty text-muted-foreground">
              {
                "You may never read this page. But if you do \u2014 know that every slide you shared, every doubt you cleared, and every extra minute you gave, mattered more than any of us said out loud. This entire page exists because of that."
              }
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
