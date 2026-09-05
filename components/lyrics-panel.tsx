"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronDown, Music2 } from "lucide-react"
import { SITE_CONFIG } from "@/lib/site-config"

export function LyricsPanel() {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.6 }}
      className="glass-panel mt-6 w-full max-w-2xl overflow-hidden rounded-2xl"
    >
      <button
        data-magnetic
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="lyrics-content"
        className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left transition-colors hover:bg-secondary/70"
      >
        <span className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Music2 className="h-4 w-4" />
          </span>
          <span>
            <span className="block font-heading text-sm font-semibold text-foreground sm:text-base">Lyrics</span>
            <span className="block text-[11px] text-muted-foreground">{SITE_CONFIG.songTitle}</span>
          </span>
        </span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }} className="text-muted-foreground">
          <ChevronDown className="h-4 w-4" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id="lyrics-content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="max-h-[60vh] overflow-y-auto border-t border-border/60 px-5 py-5 sm:px-8">
              <div className="space-y-6">
                {SITE_CONFIG.lyrics.map((block, i) => (
                  <motion.div
                    key={block.section + i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.04 }}
                  >
                    <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-widest text-primary">
                      [{block.section}]
                    </p>
                    <div className="space-y-0.5">
                      {block.lines.map((line, j) =>
                        line === "" ? (
                          <div key={j} className="h-2" />
                        ) : (
                          <p key={j} className="text-sm leading-relaxed text-foreground/85 sm:text-[15px]">
                            {line}
                          </p>
                        ),
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
