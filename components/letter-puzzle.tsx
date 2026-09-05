"use client"

import { useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"
import { SITE_CONFIG } from "@/lib/site-config"

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

export function LetterPuzzle() {
  const word = SITE_CONFIG.puzzleWord
  const letters = useMemo(() => word.split(""), [word])
  const [pool, setPool] = useState<{ char: string; id: number }[]>([])
  const [placed, setPlaced] = useState<(string | null)[]>(Array(letters.length).fill(null))
  const [solved, setSolved] = useState(false)

  useEffect(() => {
    setPool(shuffle(letters.map((char, id) => ({ char, id }))))
  }, [letters])

  useEffect(() => {
    if (placed.every((p, i) => p === letters[i])) {
      if (placed.some((p) => p !== null)) setSolved(true)
    }
  }, [placed, letters])

  const handlePick = (item: { char: string; id: number }) => {
    const nextIndex = placed.findIndex((p) => p === null)
    if (nextIndex === -1) return
    const updated = [...placed]
    updated[nextIndex] = item.char
    setPlaced(updated)
    setPool((prev) => prev.filter((p) => p.id !== item.id))
  }

  const reset = () => {
    setPlaced(Array(letters.length).fill(null))
    setPool(shuffle(letters.map((char, id) => ({ char, id }))))
    setSolved(false)
  }

  return (
    <section className="relative flex min-h-[70vh] flex-col items-center justify-center bg-app-gradient px-4 py-24 sm:px-6">
      <div className="mb-8 flex flex-col items-center gap-3 text-center">
        <span className="rounded-full border border-border bg-white/70 px-3 py-1 text-[11px] font-medium tracking-widest text-primary">
          A SMALL PUZZLE
        </span>
        <h2 className="font-heading text-3xl font-semibold text-foreground sm:text-4xl">Arrange what we mean</h2>
        <p className="text-sm text-muted-foreground">Tap the letters in order.</p>
      </div>

      <div className="mb-6 flex flex-wrap justify-center gap-2">
        {placed.map((char, i) => (
          <div
            key={i}
            className={`flex h-12 w-10 items-center justify-center rounded-xl border-2 font-heading text-lg font-semibold sm:h-14 sm:w-12 ${
              char ? "border-primary bg-white text-primary" : "border-dashed border-border bg-white/40 text-transparent"
            }`}
          >
            {char ?? "_"}
          </div>
        ))}
      </div>

      {!solved ? (
        <div className="flex flex-wrap justify-center gap-2">
          {pool.map((item) => (
            <motion.button
              key={item.id}
              data-magnetic
              layout
              onClick={() => handlePick(item)}
              whileTap={{ scale: 0.9 }}
              className="flex h-12 w-10 items-center justify-center rounded-xl bg-primary font-heading text-lg font-semibold text-primary-foreground shadow-md sm:h-14 sm:w-12"
            >
              {item.char}
            </motion.button>
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-3"
        >
          <motion.div
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, repeatDelay: 1 }}
            className="text-gold"
          >
            <Sparkles className="h-6 w-6" />
          </motion.div>
          <p className="text-sm text-muted-foreground">Exactly right. That&apos;s all we wanted to say.</p>
          <button
            data-magnetic
            onClick={reset}
            className="rounded-full border border-border bg-white/70 px-4 py-1.5 text-xs font-medium text-foreground"
          >
            Play again
          </button>
        </motion.div>
      )}
    </section>
  )
}
