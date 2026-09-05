"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useSiteExperience } from "@/lib/site-experience-context"

export function ClassProgressBar() {
  const { progress, setProgress } = useSiteExperience()
  const [complete, setComplete] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const doc = document.documentElement
      const scrollable = doc.scrollHeight - doc.clientHeight
      const pct = scrollable > 0 ? Math.min(100, Math.max(0, (doc.scrollTop / scrollable) * 100)) : 0
      setProgress(pct)
      setComplete(pct > 99)
    }
    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [setProgress])

  return (
    <div className="fixed left-0 top-0 z-50 h-1 w-full bg-transparent" aria-hidden="true">
      <motion.div
        className="h-full origin-left bg-gradient-to-r from-primary via-sky to-gold"
        style={{ width: `${progress}%` }}
        transition={{ ease: "linear" }}
      />
      {complete && (
        <div className="absolute right-3 top-2 rounded-full border border-border bg-white/85 px-2.5 py-1 text-[10px] font-medium text-primary shadow-sm">
          Class complete
        </div>
      )}
    </div>
  )
}
