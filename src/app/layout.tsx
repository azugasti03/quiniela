import type { Metadata, Viewport } from 'next'
import './globals.css'
import BottomNav from '@/components/BottomNav'

export const metadata: Metadata = {
  title: 'Quiniela Mundial 2026',
  description: 'Sigue tu quiniela del Mundial 2026',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="h-full">
      <body className="min-h-full bg-slate-900 text-slate-100 antialiased">
        <main className="pb-nav">{children}</main>
        <BottomNav />
      </body>
    </html>
  )
}
