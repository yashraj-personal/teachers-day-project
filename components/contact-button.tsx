import { MessageCircle } from "lucide-react"

export function ContactButton() {
  return (
    <a
      href="https://wa.me/9060170251"
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-4 right-4 z-[60] inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-transform hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      aria-label="Contact on WhatsApp"
    >
      <MessageCircle className="h-4 w-4" aria-hidden="true" />
      Contact
    </a>
  )
}
