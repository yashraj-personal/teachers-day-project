"use client"

import { motion } from "framer-motion"
import { Heart } from "lucide-react"
import { SITE_CONFIG } from "@/lib/site-config"

export function FinalTribute() {
  return (
    <section
      id="next"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-app-gradient px-4 py-24 sm:px-6"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-primary/10 via-sky/10 to-gold/10 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 0.8 }}
        className="flex max-w-xl flex-col items-center gap-6 text-center"
      >
        <motion.div
          animate={{ scale: [1, 1.12, 1] }}
          transition={{ duration: 1.6, repeat: Number.POSITIVE_INFINITY }}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary"
        >
          <Heart className="h-6 w-6" fill="currentColor" />
        </motion.div>

        <h2 className="font-heading text-balance-tight text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
          Thank you, <span className="text-gradient-primary">for everything.</span>
        </h2>

        <p className="text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
          {"To every teacher of the "}
          {SITE_CONFIG.institute} {SITE_CONFIG.batchName}
          {" \u2014 across every muted mic, every buffered second, and every lesson that still landed perfectly. This page is small. Our gratitude isn't."}
        </p>

        <div className="flex flex-col items-center gap-1">
          <p className="font-heading text-lg font-semibold text-primary">{SITE_CONFIG.occasion}</p>
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">{SITE_CONFIG.date}</p>
        </div>

        <motion.button
          data-magnetic
          onClick={() => document.getElementById("home")?.scrollIntoView({ behavior: "smooth" })}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.96 }}
          className="mt-4 rounded-full border border-border bg-card/80 shadow-sm px-5 py-2.5 text-sm font-medium text-foreground shadow-sm"
        >
          Relive the tribute
        </motion.button>

        <p className="mt-8 text-[11px] text-muted-foreground">{SITE_CONFIG.credit}</p>
      </motion.div>
    </section>
  )
}
