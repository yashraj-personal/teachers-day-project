"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"
import { useIsTouch } from "@/lib/use-is-touch"
import { useReducedMotion } from "@/lib/use-reduced-motion"

export function MagneticCursor() {
  const isTouch = useIsTouch()
  const reducedMotion = useReducedMotion()
  const [enabled, setEnabled] = useState(false)
  const [hoveringMagnetic, setHoveringMagnetic] = useState(false)
  const [pressed, setPressed] = useState(false)

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const springX = useSpring(cursorX, { damping: 25, stiffness: 300, mass: 0.4 })
  const springY = useSpring(cursorY, { damping: 25, stiffness: 300, mass: 0.4 })

  const rippleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setEnabled(!isTouch && !reducedMotion)
  }, [isTouch, reducedMotion])

  useEffect(() => {
    if (!enabled) {
      document.documentElement.classList.remove("custom-cursor-active")
      return
    }
    document.documentElement.classList.add("custom-cursor-active")

    const handleMove = (e: MouseEvent) => {
      const eventTarget = e.target instanceof Element ? e.target : null
      const target = eventTarget?.closest("[data-magnetic]") as HTMLElement | null
      if (target) {
        const rect = target.getBoundingClientRect()
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2
        const pullX = cx + (e.clientX - cx) * 0.35
        const pullY = cy + (e.clientY - cy) * 0.35
        cursorX.set(pullX)
        cursorY.set(pullY)
        setHoveringMagnetic(true)
      } else {
        cursorX.set(e.clientX)
        cursorY.set(e.clientY)
        setHoveringMagnetic(false)
      }
    }

    const handleDown = () => setPressed(true)
    const handleUp = () => setPressed(false)

    window.addEventListener("mousemove", handleMove)
    window.addEventListener("mousedown", handleDown)
    window.addEventListener("mouseup", handleUp)
    return () => {
      document.documentElement.classList.remove("custom-cursor-active")
      window.removeEventListener("mousemove", handleMove)
      window.removeEventListener("mousedown", handleDown)
      window.removeEventListener("mouseup", handleUp)
    }
  }, [enabled, cursorX, cursorY])

  if (!enabled) return null

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[9999] mix-blend-normal"
      style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
    >
      <motion.div
        animate={{
          scale: pressed ? 0.75 : hoveringMagnetic ? 1.8 : 1,
          opacity: hoveringMagnetic ? 0.9 : 0.75,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="h-4 w-4 rounded-full border-2"
        style={{
          borderColor: "#2563eb",
          background: hoveringMagnetic ? "rgba(37,99,235,0.15)" : "rgba(37,99,235,0.35)",
        }}
      />
      <div ref={rippleRef} />
    </motion.div>
  )
}
