'use client'
import { useEffect, useRef } from 'react'

const COLORS = ['#e8452a','#22c55e','#f59e0b','#3b82f6','#a855f7','#ec4899','#ffffff']

export default function AhaMoment({ onDone }: { onDone: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // confetti生成
    if (containerRef.current) {
      for (let i = 0; i < 70; i++) {
        const el = document.createElement('div')
        const size = 6 + Math.random() * 9
        el.style.cssText = `
          position: absolute;
          left: ${Math.random() * 100}%;
          top: -20px;
          width: ${size}px;
          height: ${size}px;
          border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
          background: ${COLORS[Math.floor(Math.random() * COLORS.length)]};
          animation: confetti-fall ${1.8 + Math.random() * 1.2}s ease-in both;
          animation-delay: ${Math.random() * 0.6}s;
          pointer-events: none;
        `
        containerRef.current.appendChild(el)
      }
    }
    // 2秒後に次のステップへ
    const t = setTimeout(onDone, 2200)
    return () => clearTimeout(t)
  }, [onDone])

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center text-center"
      style={{ background: 'var(--bg)' }}>

      {/* 背景グロー */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(circle at 50% 50%, rgba(34,197,94,0.15) 0%, transparent 70%)' }} />

      {/* confetti */}
      <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none" />

      {/* アイコン */}
      <div className="w-[120px] h-[120px] rounded-[36px] flex items-center justify-center text-[56px] mb-7 relative z-10"
        style={{
          background: 'rgba(34,197,94,0.12)',
          border: '1px solid rgba(34,197,94,0.25)',
          animation: 'aha-bounce 0.6s cubic-bezier(0.34,1.56,0.64,1) both',
        }}>
        🐛
      </div>

      {/* テキスト */}
      <h2 className="font-mono text-[28px] font-bold mb-2 relative z-10"
        style={{ color: 'var(--green)', animation: 'fade-up 0.5s 0.2s both' }}>
        Bug Captured!
      </h2>
      <p className="text-[15px] mb-7 relative z-10 leading-relaxed"
        style={{ color: 'var(--text2)', animation: 'fade-up 0.5s 0.3s both' }}>
        未知のバグを発見しました。<br />これが改善の第一歩です。
      </p>

      {/* リアクション */}
      <div className="flex gap-2.5 relative z-10"
        style={{ animation: 'fade-up 0.5s 0.4s both' }}>
        {['👍 LGTM', '🛠️ We can fix it!'].map((r) => (
          <div key={r} className="flex items-center gap-1.5 rounded-full px-4 py-2.5 font-mono text-[12px]"
            style={{ background: 'var(--surface)', border: '1px solid var(--border2)', color: 'var(--text)' }}>
            {r}
          </div>
        ))}
      </div>
    </div>
  )
}
