"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Terminal } from "lucide-react"
import { SITE_CONFIG } from "@/lib/site-config"

export function GratitudeTerminal() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-20%" })
  const [lineCount, setLineCount] = useState(0)
  const [charCounts, setCharCounts] = useState<number[]>([])

  useEffect(() => {
    if (!inView) return
    let cancelled = false

    async function typeLines() {
      for (let i = 0; i < SITE_CONFIG.terminalLines.length; i++) {
        if (cancelled) return
        setLineCount(i + 1)
        const text = SITE_CONFIG.terminalLines[i]
        for (let c = 0; c <= text.length; c++) {
          if (cancelled) return
          setCharCounts((prev) => {
            const next = [...prev]
            next[i] = c
            return next
          })
          await new Promise((r) => setTimeout(r, 18))
        }
        await new Promise((r) => setTimeout(r, 200))
      }
    }
    typeLines()
    return () => {
      cancelled = true
    }
  }, [inView])

  return (
    <section className="relative flex min-h-[70vh] flex-col items-center justify-center bg-app-gradient px-4 py-24 sm:px-6">
      <div className="mb-8 flex flex-col items-center gap-3 text-center">
        <span className="rounded-full border border-primary/25 bg-card/80 px-3 py-1 text-[11px] font-medium tracking-widest text-primary shadow-sm">
          SYSTEM LOG
        </span>
        <h2 className="font-heading text-3xl font-semibold text-foreground sm:text-4xl">Compiling gratitude</h2>
      </div>

      <div ref={ref} className="glass-panel glow-ring w-full max-w-lg overflow-hidden rounded-2xl">
        <div className="flex items-center gap-2 border-b border-border bg-[#07130f] px-4 py-2.5">
          <Terminal className="h-3.5 w-3.5 text-primary" />
          <span className="text-[11px] font-medium tracking-wide text-muted-foreground">gratitude.sh</span>
        </div>
        <div className="min-h-[10rem] px-4 py-4 font-mono text-xs sm:text-sm">
          {SITE_CONFIG.terminalLines.slice(0, lineCount).map((line, i) => {
            const shown = line.slice(0, charCounts[i] ?? 0)
            const isDone = shown.length === line.length
            const isReady = line.includes("READY")
            return (
              <p key={line} className={isReady && isDone ? "font-semibold text-connected" : "text-[#9fffc0]"}>
                <span className="mr-2 text-[#39ff88]">{">"}</span>
                {shown}
                {i === lineCount - 1 && !isDone && (
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY }}
                    className="ml-0.5 inline-block h-3.5 w-1.5 bg-[#39ff88] align-middle"
                  />
                )}
              </p>
            )
          })}
        </div>
      </div>
    </section>
  )
}
