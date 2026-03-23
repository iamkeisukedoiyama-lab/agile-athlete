'use client'
import { useEffect, useRef } from 'react'

interface Props {
  open: boolean
  onClose: () => void
  step: string
  headline: string
  children: React.ReactNode
}

export default function BottomSheet({ open, onClose, step, headline, children }: Props) {
  const sheetRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (sheetRef.current) {
      sheetRef.current.style.transform = open ? 'translateY(0)' : 'translateY(100%)'
    }
  }, [open])

  if (!open) return null

  return (
    <>
      {/* overlay */}
      <div
        className="fixed inset-0 z-40"
        style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}
        onClick={onClose}
      />

      {/* sheet */}
      <div
        ref={sheetRef}
        className="fixed bottom-0 left-0 right-0 z-50 pb-10"
        style={{
          background: 'var(--bg2)',
          borderRadius: '28px 28px 0 0',
          border: '1px solid var(--border2)',
          borderBottom: 'none',
          transform: 'translateY(100%)',
          transition: 'transform 0.35s cubic-bezier(0.32,0.72,0,1)',
        }}
      >
        {/* handle */}
        <div className="w-9 h-1 rounded-full mx-auto mt-3 mb-0"
          style={{ background: 'var(--border2)' }} />

        {/* step label */}
        <p className="font-mono text-[10px] uppercase tracking-widest text-center mt-4 mb-1"
          style={{ color: 'var(--text3)' }}>
          {step}
        </p>

        {/* headline */}
        <h2 className="text-[18px] font-bold text-center mb-5 px-6 leading-snug"
          style={{ color: 'var(--text)', whiteSpace: 'pre-line' }}>
          {headline}
        </h2>

        {children}
      </div>
    </>
  )
}
