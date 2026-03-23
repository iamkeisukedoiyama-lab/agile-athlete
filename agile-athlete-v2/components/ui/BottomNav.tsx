'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV = [
  { href: '/home',  icon: '⚡', label: 'Sprint' },
  { href: '/feed',  icon: '🌐', label: 'Feed' },
  { href: '/retro', icon: '📋', label: 'Retro' },
  { href: '/profile', icon: '👤', label: 'Profile' },
]

export default function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 flex items-start justify-around pt-3"
      style={{
        height: 80,
        background: 'rgba(10,12,15,0.95)',
        backdropFilter: 'blur(20px)',
        borderTop: '1px solid var(--border)',
      }}>
      {NAV.map(({ href, icon, label }) => {
        const active = pathname === href
        return (
          <Link key={href} href={href}
            className="flex flex-col items-center gap-1 px-4 py-1 rounded-xl transition-all active:scale-95"
            style={{ opacity: active ? 1 : 0.4 }}
          >
            <span className="text-xl leading-none">{icon}</span>
            <span className="font-mono text-[9px] uppercase tracking-wider"
              style={{ color: active ? 'var(--brand)' : 'var(--text3)' }}>
              {label}
            </span>
          </Link>
        )
      })}
    </nav>
  )
}
