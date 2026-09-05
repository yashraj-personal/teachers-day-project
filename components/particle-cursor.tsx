"use client"

import { useEffect, useRef, useState } from "react"
import { useIsTouch } from "@/lib/use-is-touch"
import { useReducedMotion } from "@/lib/use-reduced-motion"

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  size: number
  hue: string
}

const COLORS = ["#2563eb", "#38bdf8", "#f4b942"]
const MAX_PARTICLES = 40

export function ParticleCursor() {
  const isTouch = useIsTouch()
  const reducedMotion = useReducedMotion()
  const [enabled, setEnabled] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const lastPosRef = useRef({ x: -1, y: -1 })

  useEffect(() => {
    setEnabled(!isTouch && !reducedMotion)
  }, [isTouch, reducedMotion])

  useEffect(() => {
    if (!enabled) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize)

    const handleMove = (e: MouseEvent) => {
      const last = lastPosRef.current
      const dist = last.x < 0 ? 999 : Math.hypot(e.clientX - last.x, e.clientY - last.y)
      if (dist > 6) {
        lastPosRef.current = { x: e.clientX, y: e.clientY }
        if (particlesRef.current.length < MAX_PARTICLES) {
          particlesRef.current.push({
            x: e.clientX,
            y: e.clientY,
            vx: (Math.random() - 0.5) * 0.6,
            vy: (Math.random() - 0.5) * 0.6 - 0.2,
            life: 0,
            maxLife: 40 + Math.random() * 20,
            size: 2 + Math.random() * 2.5,
            hue: COLORS[Math.floor(Math.random() * COLORS.length)],
          })
        }
      }
    }
    window.addEventListener("mousemove", handleMove)

    let raf: number
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particlesRef.current = particlesRef.current.filter((p) => p.life < p.maxLife)
      for (const p of particlesRef.current) {
        p.x += p.vx
        p.y += p.vy
        p.life += 1
        const t = Math.max(0, Math.min(1, 1 - p.life / p.maxLife))
        const radius = Math.max(0.01, p.size * t)
        ctx.beginPath()
        ctx.fillStyle = p.hue
        ctx.globalAlpha = Math.max(0, t * 0.6)
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1
      raf = requestAnimationFrame(render)
    }
    raf = requestAnimationFrame(render)

    return () => {
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", handleMove)
      cancelAnimationFrame(raf)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9998]"
    />
  )
}
