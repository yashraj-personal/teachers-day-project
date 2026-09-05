"use client"

import { useEffect, useRef } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { useReducedMotion } from "@/lib/use-reduced-motion"

type Props = {
  audioRef: React.RefObject<HTMLAudioElement | null>
  playing: boolean
  peakActive: boolean
}

export function AudioVisualizer({ audioRef, playing, peakActive }: Props) {
  const reducedMotion = useReducedMotion()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const dataRef = useRef<Uint8Array | null>(null)
  const contextRef = useRef<AudioContext | null>(null)
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio || reducedMotion) return

    if (!contextRef.current) {
      try {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext
        const ctx = new AudioCtx()
        const source = ctx.createMediaElementSource(audio)
        const analyser = ctx.createAnalyser()
        analyser.fftSize = 128
        source.connect(analyser)
        analyser.connect(ctx.destination)
        contextRef.current = ctx
        sourceRef.current = source
        analyserRef.current = analyser
        dataRef.current = new Uint8Array(analyser.frequencyBinCount)
      } catch {
        // Web Audio not available; visualizer will stay idle
      }
    }

    if (playing && contextRef.current?.state === "suspended") {
      contextRef.current.resume()
    }
  }, [audioRef, playing, reducedMotion])

  useEffect(() => {
    if (reducedMotion) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      canvas.width = canvas.clientWidth * devicePixelRatio
      canvas.height = canvas.clientHeight * devicePixelRatio
    }
    resize()
    window.addEventListener("resize", resize)

    let raf: number
    const barCount = 40
    const render = () => {
      const analyser = analyserRef.current
      const data = dataRef.current
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const w = canvas.width
      const h = canvas.height
      const gap = w / barCount
      const barWidth = gap * 0.55

      if (analyser && data) {
        analyser.getByteFrequencyData(data)
      }

      for (let i = 0; i < barCount; i++) {
        let amplitude = 0.08
        if (analyser && data) {
          const idx = Math.floor((i / barCount) * data.length)
          amplitude = playing ? Math.max(0.06, data[idx] / 255) : 0.06
        } else if (playing) {
          amplitude = 0.15 + Math.sin(Date.now() / 300 + i) * 0.08
        }
        const barH = amplitude * h * 0.85
        const x = i * gap + (gap - barWidth) / 2
        const y = h - barH
        const gradient = ctx.createLinearGradient(0, y, 0, h)
        gradient.addColorStop(0, "#38bdf8")
        gradient.addColorStop(1, "#2563eb")
        ctx.fillStyle = gradient
        ctx.beginPath()
        if (ctx.roundRect) {
          ctx.roundRect(x, y, barWidth, barH, 4)
        } else {
          ctx.rect(x, y, barWidth, barH)
        }
        ctx.fill()
      }
      raf = requestAnimationFrame(render)
    }
    raf = requestAnimationFrame(render)
    return () => {
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(raf)
    }
  }, [playing, reducedMotion])

  return (
    <div className="relative h-32 w-full sm:h-40">
      {reducedMotion ? (
        <div className="flex h-full items-center justify-center gap-1">
          {Array.from({ length: 24 }).map((_, i) => (
            <div key={i} className="w-1.5 rounded-full bg-primary/40" style={{ height: `${20 + (i % 5) * 10}%` }} />
          ))}
        </div>
      ) : (
        <canvas ref={canvasRef} className="h-full w-full" aria-hidden="true" />
      )}
      <AnimatePresence>
        {peakActive && !reducedMotion && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, letterSpacing: "0.4em" }}
            animate={{ opacity: 1, scale: 1, letterSpacing: "0.15em" }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.9 }}
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
          >
            <span className="font-heading text-2xl font-semibold text-gradient-primary sm:text-4xl">THANK YOU</span>
          </motion.div>
        )}
        {peakActive && reducedMotion && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
          >
            <span className="font-heading text-2xl font-semibold text-gradient-primary sm:text-4xl">THANK YOU</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
