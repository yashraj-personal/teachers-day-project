"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Gift, Heart, Mail, Music2, Palette, Sparkles } from "lucide-react"

const gifts = [
  { icon: Music2, title: "A song", copy: "For every lesson that became a memory.", target: "song" },
  { icon: Mail, title: "Messages", copy: "For the words we should have said sooner.", target: "messages" },
  { icon: Palette, title: "Artwork", copy: "For the color you brought to difficult days.", target: "lessons" },
  { icon: Heart, title: "A thank-you", copy: "For teaching beyond the syllabus.", target: "next" },
]

export function GiftBox() {
  const [open, setOpen] = useState(false)
  return (
    <section id="gift" className="relative overflow-hidden bg-app-gradient px-4 py-24 sm:px-6">
      <div className="relative mx-auto flex max-w-4xl flex-col items-center text-center">
        <p className="eyebrow-label">A digital gift</p>
        <h2 className="mt-4 font-heading text-3xl font-semibold text-foreground sm:text-5xl">A gift for our teachers.</h2>
        <button data-magnetic onClick={() => setOpen((value) => !value)} aria-expanded={open} className="gift-box-button group mt-12">
          <motion.span animate={{ rotate: open ? -8 : 0, y: open ? -24 : 0 }} className="gift-lid" />
          <motion.span animate={{ y: open ? 16 : 0 }} className="gift-body"><Gift className="h-14 w-14" /></motion.span>
          <span className="sr-only">{open ? "Close gift" : "Open gift"}</span>
        </button>
        <AnimatePresence>
          {open && (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mt-12 grid w-full gap-3 text-left sm:grid-cols-2">
              {gifts.map(({ icon: Icon, title, copy, target }) => {
                const GiftIcon = Icon as typeof Sparkles
                return (
                  <button
                    key={title}
                    type="button"
                    data-magnetic
                    onClick={() => document.getElementById(target)?.scrollIntoView({ behavior: "smooth", block: "start" })}
                    className="glass-panel reveal-card group rounded-2xl p-5 text-left transition-transform hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    aria-label={`Open ${title}`}
                  >
                    <GiftIcon className="h-5 w-5 text-gold transition-transform group-hover:scale-110" aria-hidden="true" />
                    <h3 className="mt-3 font-heading font-semibold text-foreground">{title}</h3>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">{copy}</p>
                    <span className="mt-4 inline-block text-xs font-semibold uppercase tracking-widest text-primary opacity-70 transition-opacity group-hover:opacity-100">Explore section</span>
                  </button>
                )
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
