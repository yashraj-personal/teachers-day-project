"use client"

import { useEffect, useState } from "react"
import { useReducedMotion } from "@/lib/use-reduced-motion"

export function WaterRippleLayer() {
  const reducedMotion = useReducedMotion()
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([])

  useEffect(() => {
    if (reducedMotion) return
    const handlePointerDown = (event: PointerEvent) => {
      const id = Date.now() + Math.random()
      setRipples((current) => [...current.slice(-5), { id, x: event.clientX, y: event.clientY }])
      window.setTimeout(() => setRipples((current) => current.filter((ripple) => ripple.id !== id)), 900)
    }
    window.addEventListener("pointerdown", handlePointerDown, { passive: true })
    return () => window.removeEventListener("pointerdown", handlePointerDown)
  }, [reducedMotion])

  return (
    <div className="pointer-events-none fixed inset-0 z-[70] overflow-hidden" aria-hidden="true">
      {ripples.map((ripple) => (
        <span key={ripple.id} className="water-ripple" style={{ left: ripple.x, top: ripple.y }} />
      ))}
    </div>
  )
}
