"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { SITE_CONFIG } from "@/lib/site-config"
import { useReducedMotion } from "@/lib/use-reduced-motion"

const WORDS = ["HAPPY", "TEACHERS'", "DAY"]

export function MainHero() {
  const reducedMotion = useReducedMotion()
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (reducedMotion) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    let raf: number
    let particles = Array.from({ length: 36 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: 1 + Math.random() * 2,
      speed: 0.05 + Math.random() * 0.1,
      drift: Math.random() * Math.PI * 2,
    }))

    const resize = () => {
      canvas.width = canvas.clientWidth
      canvas.height = canvas.clientHeight
    }
    resize()
    window.addEventListener("resize", resize)

    const colors = ["#2563eb", "#38bdf8", "#f4b942"]
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((p, i) => {
        p.y -= p.speed * 0.002
        if (p.y < 0) p.y = 1
        const x = p.x * canvas.width + Math.sin(p.drift + p.y * 10) * 8
        const y = p.y * canvas.height
        ctx.beginPath()
        ctx.fillStyle = colors[i % colors.length]
        ctx.globalAlpha = 0.35
        ctx.arc(x, y, p.r, 0, Math.PI * 2)
        ctx.fill()
      })
      ctx.globalAlpha = 1
      raf = requestAnimationFrame(render)
    }
    raf = requestAnimationFrame(render)
    return () => {
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(raf)
    }
  }, [reducedMotion])

  return (
    <section
      id="main-hero"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-app-gradient px-4 py-24 sm:px-6"
    >
      <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full" />
      <div className="relative flex flex-col items-center gap-4 text-center">
        {WORDS.map((word, i) => (
          <motion.h2
            key={word}
            initial={{ opacity: 0, y: 40, scale: 0.94 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.7, delay: i * 0.18, ease: [0.16, 1, 0.3, 1] }}
            className={`font-heading text-balance-tight font-semibold leading-[0.95] tracking-tight ${
              i === 1 ? "text-gradient-primary" : "text-foreground"
            } text-6xl sm:text-8xl md:text-9xl`}
          >
            {word}
          </motion.h2>
        ))}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-6 max-w-lg text-pretty text-sm text-muted-foreground sm:text-base"
        >
          From the {SITE_CONFIG.institute} {SITE_CONFIG.batchName} — for every teacher who turned a screen into a
          classroom.
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1, duration: 0.6 }}
          className="text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground"
        >
          {SITE_CONFIG.date}
        </motion.p>
      </div>
    </section>
  )
}
