"use client"

import { motion } from "framer-motion"
import { ArrowUp } from "lucide-react"

export function InfiniteEnding() {
  return (
    <section className="relative overflow-hidden bg-app-gradient px-4 pb-40 pt-24 text-center sm:px-6">
      <div className="ambient-orbit ambient-orbit-one" aria-hidden="true" />
      <div className="ambient-orbit ambient-orbit-two" aria-hidden="true" />
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative mx-auto flex max-w-2xl flex-col items-center gap-6">
        <p className="eyebrow-label">The lesson continues</p>
        <h2 className="font-heading text-5xl font-semibold text-foreground sm:text-7xl">Thank you.</h2>
        <p className="max-w-md text-pretty text-base leading-7 text-muted-foreground">And tomorrow, we learn again.</p>
        <button data-magnetic onClick={() => document.getElementById("home")?.scrollIntoView({ behavior: "smooth" })} className="mt-4 inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-5 py-3 text-sm font-medium text-foreground transition hover:-translate-y-1 hover:border-primary/50 hover:text-primary"><ArrowUp className="h-4 w-4" /> Return to class</button>
      </motion.div>
    </section>
  )
}
