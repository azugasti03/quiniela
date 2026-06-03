'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const tabs = [
  {
    href: '/leaderboard',
    label: 'Posiciones',
    icon: (active: boolean) => (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={active ? 0 : 1.8}>
        {active
          ? <path d="M13 2.5a1 1 0 00-2 0V4H7a1 1 0 00-1 1v3a4 4 0 004 4h.5v1.5A2.5 2.5 0 018 16H7a1 1 0 000 2h10a1 1 0 000-2h-1a2.5 2.5 0 01-2.5-2.5V12H14a4 4 0 004-4V5a1 1 0 00-1-1h-4V2.5z" />
          : <path strokeLinecap="round" strokeLinejoin="round" d="M8 5v4a4 4 0 004 4m0 0a4 4 0 004-4V5M12 13v5m-3 2h6M6 5h12" />
        }
      </svg>
    ),
  },
  {
    href: '/equipos',
    label: 'Equipos',
    icon: (active: boolean) => (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    href: '/partidos',
    label: 'Partidos',
    icon: (active: boolean) => (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <circle cx="12" cy="12" r="9" />
        <path strokeLinecap="round" d="M12 3c0 0-2 3-2 9s2 9 2 9M3 12h18M5.5 6.5c2 1 4 1.5 6.5 1.5s4.5-.5 6.5-1.5M5.5 17.5c2-1 4-1.5 6.5-1.5s4.5.5 6.5 1.5" />
      </svg>
    ),
  },
  {
    href: '/bracket',
    label: 'Bracket',
    icon: (active: boolean) => (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 6h4v4H3zM3 14h4v4H3zM17 9h4v4h-4zM7 8h4M7 16h4M11 8v8M11 12h6" />
      </svg>
    ),
  },
  {
    href: '/pagos',
    label: 'Pagos',
    icon: (active: boolean) => (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <path strokeLinecap="round" d="M2 10h20M6 15h4" />
      </svg>
    ),
  },
]

export default function BottomNav() {
  const pathname = usePathname()
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-[0_-1px_8px_rgba(0,0,0,0.06)]">
      <div className="flex max-w-lg mx-auto">
        {tabs.map((tab) => {
          const active = pathname.startsWith(tab.href)
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex-1 flex flex-col items-center gap-0.5 py-2.5 text-xs font-medium transition-colors ${
                active ? 'text-green-600' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {tab.icon(active)}
              {tab.label}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
