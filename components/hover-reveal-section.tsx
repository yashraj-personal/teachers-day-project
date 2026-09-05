"use client"

import { motion } from "framer-motion"

const appreciations = [
  ["PATIENCE", "For explaining it one more time."],
  ["GUIDANCE", "For helping us when we did not know where to start."],
  ["INSPIRATION", "For making us want to learn more."],
]

export function HoverRevealSection() {
  return (
    <section id="messages" className="relative overflow-hidden bg-app-gradient px-4 py-24 sm:px-6">
      <div className="ambient-grid" aria-hidden="true" />
      <div className="relative mx-auto max-w-5xl">
        <div className="mb-12 max-w-xl">
          <p className="eyebrow-label">The teacher effect</p>
          <h2 className="mt-4 font-heading text-3xl font-semibold text-foreground sm:text-5xl">The things that stayed with us.</h2>
          <p className="mt-4 max-w-lg text-pretty text-sm leading-7 text-muted-foreground sm:text-base">Move across each word. The big feeling is often hidden inside the smallest classroom moments.</p>
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          {appreciations.map(([title, reveal]) => (
            <motion.article key={title} whileHover={{ y: -6 }} className="reveal-card group relative min-h-52 overflow-hidden rounded-3xl border border-border/70 bg-card/75 p-6 shadow-2xl shadow-background/20">
              <span className="absolute right-5 top-5 text-xs text-primary/70">hover</span>
              <h3 className="font-heading text-3xl font-semibold tracking-tight text-foreground transition-all duration-500 group-hover:scale-95 group-hover:text-primary">{title}</h3>
              <p className="absolute inset-x-6 bottom-6 translate-y-5 text-sm leading-6 text-muted-foreground opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">{reveal}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
