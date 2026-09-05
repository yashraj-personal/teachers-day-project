"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronLeft, ChevronRight, BookOpen } from "lucide-react"
import { SITE_CONFIG } from "@/lib/site-config"

export function InteractiveBook() {
  const pages = SITE_CONFIG.bookPages
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)

  const goTo = (next: number) => {
    if (next < 0 || next >= pages.length) return
    setDirection(next > index ? 1 : -1)
    setIndex(next)
  }

  const page = pages[index]

  return (
    <section id="lessons" className="relative flex min-h-screen flex-col items-center justify-center bg-app-gradient px-4 py-24 sm:px-6">
      <div className="mb-10 flex flex-col items-center gap-3 text-center">
        <span className="rounded-full border border-border bg-card/80 shadow-sm px-3 py-1 text-[11px] font-medium tracking-widest text-primary">
          THE DIGITAL DIARY
        </span>
        <h2 className="font-heading text-3xl font-semibold text-foreground sm:text-4xl">A book of quiet lessons</h2>
      </div>

      <div className="flex w-full max-w-xl flex-col items-center gap-6" style={{ perspective: "1600px" }}>
        <div className="relative h-80 w-full sm:h-72">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={index}
              custom={direction}
              initial={{ rotateY: direction > 0 ? 90 : -90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: direction > 0 ? -90 : 90, opacity: 0 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformStyle: "preserve-3d", backfaceVisibility: "hidden" }}
              className="glass-panel glow-ring absolute inset-0 flex flex-col justify-between rounded-3xl p-6 sm:p-8"
            >
              <div>
                <div className="mb-4 flex items-center gap-2 text-primary">
                  <BookOpen className="h-4 w-4" />
                  <span className="text-[11px] font-medium uppercase tracking-widest">{page.title}</span>
                </div>
                <p className="text-pretty font-heading text-lg leading-relaxed text-foreground sm:text-xl">
                  {page.body}
                </p>
              </div>
              <span className="self-end text-[11px] tabular-nums text-muted-foreground">
                {index + 1} / {pages.length}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center gap-4">
          <button
            data-magnetic
            onClick={() => goTo(index - 1)}
            disabled={index === 0}
            aria-label="Previous page"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/80 shadow-sm text-foreground transition-opacity disabled:opacity-30"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <div className="flex items-center gap-1.5" aria-hidden="true">
            {pages.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to page ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${i === index ? "w-6 bg-primary" : "w-1.5 bg-border"}`}
              />
            ))}
          </div>
          <button
            data-magnetic
            onClick={() => goTo(index + 1)}
            disabled={index === pages.length - 1}
            aria-label="Next page"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/80 shadow-sm text-foreground transition-opacity disabled:opacity-30"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  )
}
