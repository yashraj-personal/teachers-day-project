"use client"

import { useEffect, useRef, useState } from "react"
import { Bell, Check, GraduationCap, Heart, Mail, X } from "lucide-react"

const notifications = [
  { label: "New Lecture Available", icon: GraduationCap, tone: "blue" },
  { label: "Assignment Reminder", icon: Check, tone: "blue" },
  { label: "Teacher joined the class", icon: GraduationCap, tone: "blue" },
  { label: "Doubt session starting", icon: Bell, tone: "yellow" },
  { label: "Teachers' Day message received", icon: Heart, tone: "pink" },
]

export function NotificationCenter() {
  const [open, setOpen] = useState(false)
  const [read, setRead] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const handlePointerDown = (event: PointerEvent) => {
      if (!panelRef.current?.contains(event.target as Node)) setOpen(false)
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false)
    }
    document.addEventListener("pointerdown", handlePointerDown)
    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [open])

  const openTribute = () => {
    setRead(true)
    setOpen(false)
    document.getElementById("next")?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <div ref={panelRef} className="fixed right-4 top-16 z-50 sm:right-8" aria-live="polite">
      <button
        type="button"
        aria-label={open ? "Close notifications" : `Open notifications${read ? "" : ", 6 unread"}`}
        aria-expanded={open}
        aria-controls="notification-panel"
        onClick={() => setOpen((current) => !current)}
        className="relative flex size-10 items-center justify-center rounded-full border border-border/80 bg-card/90 text-muted-foreground shadow-lg backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-primary/60 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        {open ? <X aria-hidden="true" /> : <Bell aria-hidden="true" />}
        {!read && <span className="absolute right-1 top-1 size-2.5 rounded-full bg-primary ring-2 ring-card" aria-hidden="true" />}
      </button>

      {open && (
        <section id="notification-panel" role="dialog" aria-label="Notifications" className="absolute right-0 mt-3 w-[min(22rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-border bg-card/95 p-2 text-card-foreground shadow-2xl backdrop-blur-2xl">
          <div className="flex items-center justify-between px-3 pb-2 pt-2">
            <div>
              <p className="font-heading text-sm font-semibold">Notifications</p>
              <p className="text-xs text-muted-foreground">Your class, kept in sync.</p>
            </div>
            {!read && <span className="rounded-full bg-primary/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary">6 new</span>}
          </div>
          <div className="flex flex-col gap-1" role="list">
            {notifications.map(({ label, icon: Icon, tone }) => (
              <div key={label} role="listitem" className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition hover:bg-secondary/70">
                <span className={`size-2 shrink-0 rounded-full ${tone === "yellow" ? "bg-gold" : tone === "pink" ? "bg-primary" : "bg-sky"}`} aria-hidden="true" />
                <Icon className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                <span className="text-sm text-foreground">{label}</span>
              </div>
            ))}
            <button type="button" onClick={openTribute} className="flex items-center gap-3 rounded-xl border border-primary/20 bg-primary/10 px-3 py-3 text-left transition hover:bg-primary/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
              <Heart className="size-4 shrink-0 text-primary" fill="currentColor" aria-hidden="true" />
              <span className="flex-1 text-sm font-semibold text-foreground">A message from your students</span>
              <Mail className="size-4 shrink-0 text-primary" aria-hidden="true" />
            </button>
          </div>
        </section>
      )}
    </div>
  )
}
