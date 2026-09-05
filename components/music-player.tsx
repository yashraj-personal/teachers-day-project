"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { Play, Pause, Volume2, VolumeX } from "lucide-react"
import { SITE_CONFIG } from "@/lib/site-config"
import { useSiteExperience } from "@/lib/site-experience-context"
import { AudioVisualizer } from "@/components/audio-visualizer"
import { LyricsPanel } from "@/components/lyrics-panel"

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds)) return "0:00"
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, "0")}`
}

export function MusicPlayer() {
  const { audioPlaying, setAudioPlaying, setAudioPulse } = useSiteExperience()
  const audioRef = useRef<HTMLAudioElement>(null)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [muted, setMuted] = useState(false)
  const [volume, setVolume] = useState(0.85)
  const [peakActive, setPeakActive] = useState(false)
  const [started, setStarted] = useState(false)
  const [audioReady, setAudioReady] = useState(false)
  const [audioError, setAudioError] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    const onTime = () => {
      setCurrentTime(audio.currentTime)
      const pulse = audio.duration ? (Math.sin(audio.currentTime * 7.5) + 1) / 2 : 0
      setAudioPulse(audio.paused ? 0 : pulse)
    }
    const onLoaded = () => {
      setDuration(audio.duration)
      setAudioReady(true)
      setAudioError(false)
    }
    const onCanPlay = () => {
      setAudioReady(true)
      setAudioError(false)
    }
    const onError = () => {
      setAudioReady(false)
      setAudioError(true)
      setAudioPlaying(false)
      setAudioPulse(0)
    }
    const onEnd = () => {
      setAudioPlaying(false)
      setAudioPulse(0)
    }
    audio.addEventListener("timeupdate", onTime)
    audio.addEventListener("loadedmetadata", onLoaded)
    audio.addEventListener("canplay", onCanPlay)
    audio.addEventListener("error", onError)
    audio.addEventListener("ended", onEnd)
    return () => {
      audio.removeEventListener("timeupdate", onTime)
      audio.removeEventListener("loadedmetadata", onLoaded)
      audio.removeEventListener("canplay", onCanPlay)
      audio.removeEventListener("error", onError)
      audio.removeEventListener("ended", onEnd)
    }
  }, [setAudioPlaying, setAudioPulse])

  useEffect(() => {
    if (!duration) return
    const remaining = duration - currentTime
    setPeakActive(remaining < 12 && remaining > 0 && audioPlaying)
  }, [currentTime, duration, audioPlaying])

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio || audioError) return
    if (audioPlaying) {
      audio.pause()
      setAudioPlaying(false)
      setAudioPulse(0)
      return
    }

    setStarted(true)
    void audio.play().then(
      () => setAudioPlaying(true),
      () => {
        setAudioPlaying(false)
        setAudioPulse(0)
      },
    )
  }

  const toggleMute = () => {
    const audio = audioRef.current
    if (!audio) return
    audio.muted = !muted
    setMuted(!muted)
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current
    if (!audio) return
    const val = Number(e.target.value)
    audio.currentTime = val
    setCurrentTime(val)
  }

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current
    const val = Number(e.target.value)
    setVolume(val)
    if (audio) audio.volume = val
    if (val === 0) {
      setMuted(true)
      if (audio) audio.muted = true
    } else if (muted) {
      setMuted(false)
      if (audio) audio.muted = false
    }
  }

  const progressPct = duration ? (currentTime / duration) * 100 : 0

  return (
    <section id="song" className="relative flex min-h-screen items-center justify-center bg-app-gradient px-4 py-24 sm:px-6">
      <audio ref={audioRef} src={SITE_CONFIG.audioSrc} preload="metadata" />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 0.7 }}
        className="glass-panel glow-ring w-full max-w-2xl rounded-3xl p-6 sm:p-10"
      >
        <div className="mb-6 flex flex-col items-center gap-2 text-center">
          <span className="rounded-full border border-border bg-card/80 shadow-sm px-3 py-1 text-[11px] font-medium tracking-widest text-primary">
            NOW PLAYING
          </span>
          <h3 className="font-heading text-2xl font-semibold text-foreground sm:text-3xl">{SITE_CONFIG.songTitle}</h3>
          <p className="text-xs text-muted-foreground">{SITE_CONFIG.songTagline}</p>
        </div>

        <AudioVisualizer audioRef={audioRef} playing={audioPlaying} peakActive={peakActive} />

        <div className="mt-4 flex items-center gap-3">
          <span className="w-10 shrink-0 text-right text-[11px] tabular-nums text-muted-foreground">
            {formatTime(currentTime)}
          </span>
          <input
            type="range"
            min={0}
            max={duration || 0}
            value={currentTime}
            onChange={handleSeek}
            aria-label="Seek song position"
            className="h-1.5 w-full flex-1 cursor-pointer appearance-none rounded-full bg-secondary accent-primary"
            style={{
              background: `linear-gradient(to right, #2563eb ${progressPct}%, #eef6ff ${progressPct}%)`,
            }}
          />
          <span className="w-10 shrink-0 text-[11px] tabular-nums text-muted-foreground">{formatTime(duration)}</span>
        </div>

        <div className="mt-5 flex items-center justify-center gap-4">
          <button
            data-magnetic
            onClick={toggleMute}
            aria-label={muted ? "Unmute" : "Mute"}
            className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </button>

          <motion.button
            data-magnetic
            onClick={togglePlay}
            whileTap={{ scale: 0.92 }}
            aria-label={audioPlaying ? "Pause song" : "Play song"}
            disabled={audioError}
            className="flex h-14 w-14 disabled:cursor-not-allowed disabled:opacity-50 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30"
          >
            {audioPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          </motion.button>

          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={muted ? 0 : volume}
            onChange={handleVolume}
            aria-label="Volume"
            className="h-1.5 w-20 cursor-pointer appearance-none rounded-full accent-primary"
          />
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-center text-[11px] text-muted-foreground">
          <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 ${audioError ? "border-destructive/40 text-destructive" : audioReady ? "border-connected/30 text-connected" : "border-border"}`}>
            <span className={`size-1.5 rounded-full ${audioError ? "bg-destructive" : audioReady ? "bg-connected" : "animate-pulse bg-gold"}`} aria-hidden="true" />
            {audioError ? "Song unavailable — refresh to retry" : audioReady ? "Ready to play" : "Loading song..."}
          </span>
          {!started && !audioError && <span>Press play to hear the tribute song, made just for our teachers.</span>}
        </div>
      </motion.div>

      <LyricsPanel />
    </section>
  )
}
