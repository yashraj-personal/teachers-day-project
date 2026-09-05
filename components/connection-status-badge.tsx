"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useSiteExperience } from "@/lib/site-experience-context"

const LABELS: Record<string, string> = {
  connecting: "CONNECTING...",
  connected: "CONNECTED",
  strong: "CONNECTION: STRONG",
}

const COLORS: Record<string, string> = {
  connecting: "#f4b942",
  connected: "#22c55e",
  strong: "#22c55e",
}

export function ConnectionStatusBadge() {
  const { connection } = useSiteExperience()

  return (
    <div className="fixed left-3 top-3 z-[60] sm:left-4 sm:top-4" aria-live="polite">
      <AnimatePresence mode="wait">
        <motion.div
          key={connection}
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          className="flex items-center gap-1.5 rounded-full border border-border bg-white/70 px-3 py-1 text-[10px] font-medium tracking-wide text-foreground shadow-sm backdrop-blur-sm"
        >
          <motion.span
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 1.6, repeat: Number.POSITIVE_INFINITY }}
            className="inline-block h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: COLORS[connection] }}
          />
          <span className="hidden sm:inline">{LABELS[connection]}</span>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
