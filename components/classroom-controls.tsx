"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Home, Music2, Sparkles, BookOpen, HeartHandshake, ArrowRight } from "lucide-react"
import { SITE_CONFIG } from "@/lib/site-config"
import { useSiteExperience } from "@/lib/site-experience-context"

const ICONS: Record<string, typeof Home> = {
  home: Home,
  song: Music2,
  experience: Sparkles,
  lessons: BookOpen,
  tribute: HeartHandshake,
  next: ArrowRight,
}

export function ClassroomControls() {
  const { activeSection, setActiveSection } = useSiteExperience()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.5)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const sections = SITE_CONFIG.navItems.map((n) => document.getElementById(n.id)).filter(Boolean) as HTMLElement[]
    if (sections.length === 0) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { rootMargin: "-45% 0px -45% 0px" },
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [setActiveSection])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <motion.nav
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: visible ? 0 : 80, opacity: visible ? 1 : 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 26 }}
      aria-label="Section navigation"
      className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 px-2"
    >
      <ul className="glass-panel flex items-center gap-1 rounded-full p-1.5 shadow-lg">
        {SITE_CONFIG.navItems.map((item) => {
          const Icon = ICONS[item.id]
          const active = activeSection === item.id
          return (
            <li key={item.id}>
              <button
                data-magnetic
                onClick={() => scrollTo(item.id)}
                aria-current={active ? "true" : undefined}
                className={`relative flex items-center gap-1.5 rounded-full px-2.5 py-2 text-xs font-medium transition-colors sm:px-3.5 ${
                  active ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-full bg-primary"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <Icon className="relative z-10 h-3.5 w-3.5" />
                <span className="relative z-10 hidden sm:inline">{item.label}</span>
              </button>
            </li>
          )
        })}
      </ul>
    </motion.nav>
  )
}
