"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { SITE_CONFIG } from "@/lib/site-config"
import { useReducedMotion } from "@/lib/use-reduced-motion"

export function GraduationCapScene() {
  const reducedMotion = useReducedMotion()
  const [wordIndex, setWordIndex] = useState(0)

  return (
    <section className="relative flex min-h-[80vh] flex-col items-center justify-center overflow-hidden bg-app-gradient px-4 py-24 sm:px-6">
      <div className="mb-8 flex flex-col items-center gap-3 text-center">
        <span className="rounded-full border border-border bg-white/70 px-3 py-1 text-[11px] font-medium tracking-widest text-primary">
          WHAT THEY GAVE US
        </span>
        <h2 className="font-heading text-3xl font-semibold text-foreground sm:text-4xl">Not just a degree</h2>
      </div>

      <div
        className="relative flex h-56 w-56 items-center justify-center sm:h-72 sm:w-72"
        style={{ perspective: "1200px" }}
      >
        <motion.div
          data-magnetic
          animate={reducedMotion ? undefined : { rotateY: 360 }}
          transition={reducedMotion ? undefined : { duration: 14, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          whileHover={{ scale: 1.06 }}
          onClick={() => setWordIndex((w) => (w + 1) % SITE_CONFIG.capWords.length)}
          role="button"
          tabIndex={0}
          aria-label="Rotate the graduation cap to reveal a word"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") setWordIndex((w) => (w + 1) % SITE_CONFIG.capWords.length)
          }}
          style={{ transformStyle: "preserve-3d" }}
          className="relative flex h-40 w-40 cursor-pointer items-center justify-center sm:h-52 sm:w-52"
        >
          {/* Cap top (board) */}
          <div
            className="absolute left-1/2 top-1/2 h-36 w-36 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-md bg-gradient-to-br from-foreground/90 to-foreground/70 shadow-2xl sm:h-48 sm:w-48"
            style={{ transform: "translateZ(20px) rotateX(60deg) rotate(45deg)" }}
          />
          {/* Cap button */}
          <div
            className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-gradient shadow-md"
            style={{ transform: "translateZ(40px)" }}
          />
          {/* Tassel */}
          <motion.div
            animate={reducedMotion ? undefined : { rotate: [0, 6, -6, 0] }}
            transition={reducedMotion ? undefined : { duration: 3, repeat: Number.POSITIVE_INFINITY }}
            className="absolute left-1/2 top-1/2 origin-top"
            style={{ transform: "translateZ(42px) translate(30px, 0px)" }}
          >
            <div className="h-16 w-0.5 bg-gold sm:h-20" />
            <div className="h-3 w-3 rounded-full bg-gold-gradient" />
          </motion.div>
          {/* Cap base cone */}
          <div
            className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground/80 shadow-xl sm:h-20 sm:w-20"
            style={{ transform: "translateZ(-10px)" }}
          />
        </motion.div>
      </div>

      <motion.p
        key={wordIndex}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-8 font-heading text-xl font-semibold text-gradient-primary sm:text-2xl"
      >
        {SITE_CONFIG.capWords[wordIndex]}
      </motion.p>
      <p className="mt-2 text-xs text-muted-foreground">Tap the cap to reveal what they really gave us.</p>
    </section>
  )
}
