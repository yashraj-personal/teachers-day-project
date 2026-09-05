"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { SITE_CONFIG } from "@/lib/site-config"

const STEPS = ["IIT PATNA", "Setting up our classroom...", "Gathering four semesters of memories..."]

export function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState(0)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = []
    STEPS.forEach((_, i) => {
      timers.push(setTimeout(() => setStep(i), i * 700))
    })
    timers.push(
      setTimeout(() => {
        setHidden(true)
        onDone()
      }, STEPS.length * 700 + 500),
    )
    return () => timers.forEach(clearTimeout)
  }, [onDone])

  return (
    <AnimatePresence>
      {!hidden && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-app-gradient"
          role="status"
          aria-live="polite"
        >
          <div className="flex flex-col items-center gap-6 px-6 text-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={step}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4 }}
                className={
                  step === 0
                    ? "font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
                    : "font-sans text-sm text-muted-foreground sm:text-base"
                }
              >
                {STEPS[step]}
              </motion.p>
            </AnimatePresence>
            <div className="flex items-center gap-1.5" aria-hidden="true">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="h-2 w-2 rounded-full bg-primary"
                  animate={{ opacity: [0.25, 1, 0.25], scale: [0.85, 1, 0.85] }}
                  transition={{ duration: 1.1, repeat: Number.POSITIVE_INFINITY, delay: i * 0.18 }}
                />
              ))}
            </div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              {SITE_CONFIG.batchName}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
