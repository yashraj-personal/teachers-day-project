import { SITE_CONFIG } from "@/lib/site-config"

export function MadeByYashBadge() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed right-3 top-3 z-[60] select-none rounded-full border border-border bg-white/70 px-3 py-1 text-[10px] font-medium tracking-wide text-muted-foreground shadow-sm backdrop-blur-sm sm:right-4 sm:top-4"
    >
      {SITE_CONFIG.credit}
    </div>
  )
}
