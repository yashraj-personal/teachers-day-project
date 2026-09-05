"use client"

import { motion } from "framer-motion"
import { SITE_CONFIG } from "@/lib/site-config"

export function GratitudeStats() {
  return (
    <section id="tribute" className="relative flex min-h-[70vh] flex-col items-center justify-center bg-app-gradient px-4 py-24 sm:px-6">
      <div className="mb-10 flex flex-col items-center gap-3 text-center">
        <span className="rounded-full border border-primary/25 bg-card/80 px-3 py-1 text-[11px] font-medium tracking-widest text-primary shadow-sm">
          NUMBERS THAT DON&apos;T CAPTURE IT
        </span>
        <h2 className="font-heading text-3xl font-semibold text-foreground sm:text-4xl">But we counted anyway</h2>
      </div>

      <div className="mb-8 flex items-center gap-3 rounded-full border border-connected/25 bg-connected/10 px-4 py-2 text-sm text-connected">
        <span className="h-2 w-2 animate-pulse rounded-full bg-connected" />
        <span>72 students connected</span>
        <span className="student-connection-dots" aria-hidden="true">+ + +</span>
      </div>

      <div className="grid w-full max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
        {SITE_CONFIG.stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="glass-panel flex flex-col items-center gap-1 rounded-2xl px-4 py-6 text-center"
          >
            <span className="font-heading text-3xl font-semibold text-gradient-primary sm:text-4xl">
              {stat.value}
            </span>
            <span className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
              {stat.label}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
