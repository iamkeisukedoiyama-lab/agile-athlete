import BottomNav from '@/components/ui/BottomNav'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen" style={{ background: 'var(--bg)' }}>
      <main className="pb-24">{children}</main>
      <BottomNav />
    </div>
  )
}
