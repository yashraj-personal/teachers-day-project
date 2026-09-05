"use client"

import { PartyPopper } from "lucide-react"
import { useSiteExperience } from "@/lib/site-experience-context"

export function PartyPopperControl() {
  const { triggerPartyPoppers } = useSiteExperience()
  return <button data-magnetic onClick={triggerPartyPoppers} className="fixed left-4 top-1/2 z-[60] flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-gold/40 bg-card/90 text-gold shadow-xl shadow-gold/10 backdrop-blur-md transition hover:-translate-y-[calc(50%+4px)] hover:bg-gold hover:text-background" aria-label="Celebrate with party poppers"><PartyPopper className="h-5 w-5" /></button>
}
