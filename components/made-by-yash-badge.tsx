import { ArrowUpRight, Code2 } from "lucide-react"

export function MadeByYashBadge() {
  return (
    <a
      href="https://github.com/yashraj-personal"
      target="_blank"
      rel="noreferrer"
      className="fixed right-4 top-4 z-[60] inline-flex items-center gap-2 rounded-full border border-border/80 bg-card/85 px-3.5 py-2 text-xs font-semibold text-foreground shadow-lg shadow-background/30 backdrop-blur-md transition-all hover:-translate-y-0.5 hover:border-primary/60 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      aria-label="Made by Yash, open GitHub profile"
    >
      <Code2 className="h-3.5 w-3.5" aria-hidden="true" />
      <span>Made by Yash</span>
      <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" />
    </a>
  )
}
