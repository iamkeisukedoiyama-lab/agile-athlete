'use client'

export default function BugFab({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-24 right-5 w-[60px] h-[60px] rounded-[20px] flex items-center justify-center
        text-3xl text-white font-light z-50 active:scale-90 transition-transform"
      style={{
        background: 'var(--brand)',
        animation: 'fab-pulse 3s ease-in-out infinite',
      }}
      aria-label="バグを報告する"
    >
      ＋
    </button>
  )
}
