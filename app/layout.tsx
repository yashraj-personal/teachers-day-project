import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'
import { SiteExperienceProvider } from '@/lib/site-experience-context'
import { MagneticCursor } from '@/components/magnetic-cursor'
import { ParticleCursor } from '@/components/particle-cursor'
import { MadeByYashBadge } from '@/components/made-by-yash-badge'
import { ClassProgressBar } from '@/components/class-progress'
import { ConnectionStatusBadge } from '@/components/connection-status-badge'
import { AtmosphereEffects } from '@/components/atmosphere-effects'
import { ContactButton } from '@/components/contact-button'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk' })

export const metadata: Metadata = {
  title: "The Teacher Effect | IIT Patna Teachers' Day Tribute",
  description:
    "A cinematic Teachers' Day tribute from the IIT Patna Online Certification Batch — every doubt answered, every lesson remembered.",
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#f8fafc',
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`light ${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="bg-background text-foreground antialiased font-sans">
        <SiteExperienceProvider>
          <ClassProgressBar />
          <ConnectionStatusBadge />
          <MadeByYashBadge />
          <ContactButton />
          <AtmosphereEffects />
          <MagneticCursor />
          <ParticleCursor />
          {children}
        </SiteExperienceProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
