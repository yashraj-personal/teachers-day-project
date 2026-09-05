"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "./theme-provider"

export function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme()
  const nextTheme = theme === "dark" ? "light" : "dark"

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${nextTheme} theme`}
      title={`Switch to ${nextTheme} theme`}
      className="theme-switcher fixed right-40 top-4 z-50 inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/85 px-3 py-2 text-xs font-semibold tracking-wide text-muted-foreground shadow-lg backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:border-primary/50 hover:text-foreground"
    >
      {theme === "dark" ? <Sun data-icon="inline-start" /> : <Moon data-icon="inline-start" />}
      <span className="hidden sm:inline">{theme === "dark" ? "Light mood" : "Dark mood"}</span>
    </button>
  )
}
