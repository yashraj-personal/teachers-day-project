"use client"

import { useEffect, useMemo, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronDown, Music2, X } from "lucide-react"
import { SITE_CONFIG } from "@/lib/site-config"

type LyricsPanelProps = {
  currentTime: number
  duration: number
  playing: boolean
}

type LyricLine = {
  text: string
  section: string
  start: number
  end: number
  chorus: boolean
}

const importantWords = /\b(teacher|teachers|thank|thanks|thank you|light|learn|love|guide|guidance|dream|dreams|remember|remembered|classroom|students?)\b/gi

function highlightWords(text: string) {
  return text.split(importantWords).map((part, index) =>
    /^(teacher|teachers|thank|thanks|thank you|light|learn|love|guide|guidance|dream|dreams|remember|remembered|classroom|students?)$/i.test(part.trim()) ? (
      <span key={`${part}-${index}`} className="text-primary font-semibold">
        {part}
      </span>
    ) : (
      <span key={`${part}-${index}`}>{part}</span>
    ),
  )
}

function buildLyricLines(duration: number): LyricLine[] {
  const lines = SITE_CONFIG.lyrics.flatMap((block) =>
    block.lines.filter(Boolean).map((text) => ({ text, section: block.section, chorus: /chorus/i.test(block.section) })),
  )
  const usableDuration = duration > 8 ? duration : Math.max(lines.length * 4.2, 1)
  const lineDuration = usableDuration / Math.max(lines.length, 1)
  return lines.map((line, index) => ({
    ...line,
    start: index * lineDuration,
    end: (index + 1) * lineDuration,
  }))
}

export function LyricsPanel({ currentTime, duration, playing }: LyricsPanelProps) {
  const [open, setOpen] = useState(false)
  const [chorusDismissed, setChorusDismissed] = useState(false)
  const lines = useMemo(() => buildLyricLines(duration), [duration])
  const activeIndex = Math.min(lines.length - 1, Math.max(0, lines.findIndex((line) => currentTime >= line.start && currentTime < line.end)))
  const activeLine = lines[activeIndex]
  const isChorus = Boolean(playing && activeLine?.chorus)

  useEffect(() => {
    if (!isChorus) setChorusDismissed(false)
  }, [isChorus])

  return (
    <>
      <AnimatePresence>
        {isChorus && !chorusDismissed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-background/90 p-6 backdrop-blur-xl"
            role="status"
            aria-live="polite"
          >
            <motion.div
              initial={{ scale: 0.82, opacity: 0, rotate: -3 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 140, damping: 16 }}
              className="text-center"
            >
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.45em] text-primary">From every student</p>
              <h2 className="font-heading text-[clamp(4rem,18vw,13rem)] font-black leading-none tracking-tight text-foreground">THANK YOU</h2>
              <button
                type="button"
                onClick={() => setChorusDismissed(true)}
                className="mt-8 inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-4 py-2 text-xs font-semibold text-muted-foreground transition hover:border-primary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                Continue listening <X className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.6 }}
        className="glass-panel mt-6 w-full max-w-2xl overflow-hidden rounded-2xl"
      >
        <div className="px-5 pb-5 pt-6 sm:px-8">
          <div className="mb-5 flex items-center gap-2.5">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary"><Music2 className="h-4 w-4" aria-hidden="true" /></span>
            <div>
              <p className="font-heading text-sm font-semibold text-foreground sm:text-base">Live lyrics</p>
              <p className="text-[11px] text-muted-foreground">{SITE_CONFIG.songTitle}</p>
            </div>
          </div>
          <div className="flex min-h-40 flex-col justify-center gap-3" aria-live="polite">
            <AnimatePresence initial={false} mode="popLayout">
              {activeIndex > 0 && (
                <motion.p key={`previous-${activeIndex}`} initial={{ opacity: 0 }} animate={{ opacity: 0.28 }} exit={{ opacity: 0 }} className="text-sm text-muted-foreground">{lines[activeIndex - 1]?.text}</motion.p>
              )}
              <motion.p key={`active-${activeIndex}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="font-heading text-xl font-semibold leading-snug text-foreground sm:text-2xl">{activeLine ? highlightWords(activeLine.text) : "Press play to enter the song"}</motion.p>
              {lines[activeIndex + 1] && <motion.p key={`next-${activeIndex}`} initial={{ opacity: 0 }} animate={{ opacity: 0.55 }} exit={{ opacity: 0 }} className="text-sm text-muted-foreground">{lines[activeIndex + 1].text}</motion.p>}
            </AnimatePresence>
          </div>
        </div>

        <button
          data-magnetic
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="lyrics-content"
          className="flex w-full items-center justify-between gap-3 border-t border-border/60 px-5 py-4 text-left text-xs font-semibold uppercase tracking-widest text-muted-foreground transition-colors hover:bg-secondary/70 hover:text-foreground sm:px-8"
        >
          <span>{open ? "Hide full lyrics" : "Read full lyrics"}</span>
          <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }}><ChevronDown className="h-4 w-4" /></motion.span>
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div id="lyrics-content" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: "easeInOut" }} className="overflow-hidden">
              <div className="max-h-[60vh] overflow-y-auto border-t border-border/60 px-5 py-5 sm:px-8">
                <div className="flex flex-col gap-6">
                  {SITE_CONFIG.lyrics.map((block, index) => (
                    <div key={block.section + index}>
                      <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-widest text-primary">[{block.section}]</p>
                      <div className="flex flex-col gap-0.5">
                        {block.lines.map((line, lineIndex) => line === "" ? <div key={lineIndex} className="h-2" /> : <p key={lineIndex} className="text-sm leading-relaxed text-foreground/85 sm:text-[15px]">{highlightWords(line)}</p>)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  )
}
