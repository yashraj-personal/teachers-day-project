"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { StickyNote, Camera, MessageCircleHeart } from "lucide-react"

const WINDOWS = [
  {
    id: "note",
    icon: StickyNote,
    title: "A sticky note",
    body: "\u201CSir, one more doubt before the class ends?\u201D — asked in every single lecture, answered every single time.",
    rotate: -4,
    accent: "bg-gold-gradient",
    position: "sm:top-6 sm:left-4",
  },
  {
    id: "snapshot",
    icon: Camera,
    title: "A classroom snapshot",
    body: "Forty small video tiles, one shared screen, and a lesson that somehow still felt personal.",
    rotate: 3,
    accent: "bg-gradient-to-br from-primary to-sky",
    position: "sm:top-24 sm:right-6",
  },
  {
    id: "message",
    icon: MessageCircleHeart,
    title: "A message we never sent",
    body: "Thank you for explaining it again, and again, without once making us feel like a burden.",
    rotate: -2,
    accent: "bg-gradient-to-br from-sky to-primary",
    position: "sm:bottom-4 sm:left-1/3",
  },
]

export function FloatingWindows() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <section
      id="experience"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-app-gradient px-4 py-24 sm:px-6"
    >
      <div className="mb-10 flex flex-col items-center gap-3 text-center">
        <span className="rounded-full border border-border bg-card/80 shadow-sm px-3 py-1 text-[11px] font-medium tracking-widest text-primary">
          MOMENTS WE KEPT
        </span>
        <h2 className="font-heading text-3xl font-semibold text-foreground sm:text-4xl">Little windows, big memories</h2>
        <p className="max-w-md text-pretty text-sm text-muted-foreground">Drag them around. They don&apos;t mind.</p>
      </div>

      <div ref={containerRef} className="relative flex w-full max-w-4xl flex-col gap-6 sm:h-[26rem] sm:flex-row sm:gap-0">
        {WINDOWS.map((win, i) => {
          const Icon = win.icon
          return (
            <motion.div
              key={win.id}
              drag
              dragConstraints={containerRef}
              dragElastic={0.15}
              whileDrag={{ scale: 1.05, zIndex: 20, boxShadow: "0 30px 60px -20px rgba(37,99,235,0.35)" }}
              initial={{ opacity: 0, y: 30, rotate: 0 }}
              whileInView={{ opacity: 1, y: 0, rotate: win.rotate }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className={`glass-panel absolute-none relative w-full cursor-grab select-none touch-none rounded-2xl p-5 shadow-lg active:cursor-grabbing sm:absolute sm:w-72 ${win.position}`}
              data-magnetic
            >
              <div className="flex items-start gap-3">
                <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-white ${win.accent}`}>
                  <Icon className="h-4 w-4" />
                </span>
                <div>
                  <p className="font-heading text-sm font-semibold text-foreground">{win.title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{win.body}</p>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
