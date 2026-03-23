'use client'
import { useState } from 'react'

const MOODS = ['😩','😐','😊','😄','🔥']

export default function RetroPage() {
  const [keep, setKeep]   = useState('')
  const [prob, setProb]   = useState('')
  const [tryT, setTryT]   = useState('')
  const [mood, setMood]   = useState(2)
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    // POST /api/retros
    setSaved(true)
  }

  if (saved) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
        <div className="text-6xl mb-6">🎉</div>
        <h2 className="text-2xl font-bold mb-3">Sprint Complete!</h2>
        <p className="text-[14px] mb-8 leading-relaxed" style={{ color: 'var(--text2)' }}>
          スプリント1を完走しました。<br />次のスプリントを始めましょう。
        </p>
        <button onClick={() => setSaved(false)}
          className="px-8 py-3.5 rounded-2xl font-mono text-[12px] uppercase tracking-wider"
          style={{ background: 'var(--brand)', color: 'white' }}>
          次のスプリントへ →
        </button>
      </div>
    )
  }

  return (
    <>
      <div className="flex justify-between items-center px-6 pt-14 pb-2">
        <span className="font-mono text-xs" style={{ color: 'var(--text3)' }}>9:41</span>
      </div>

      <div className="px-6 pb-5">
        <p className="font-mono text-[10px] uppercase tracking-widest mb-1.5" style={{ color: 'var(--text3)' }}>
          Sprint 01 · Retrospective
        </p>
        <h1 className="text-[26px] font-bold tracking-tight">振り返り</h1>
      </div>

      <div className="px-4 flex flex-col gap-3">
        {/* Keep */}
        <KptField
          color="var(--green)" label="K · Keep" emoji="✅"
          placeholder="良かったこと、続けること…"
          value={keep} onChange={setKeep}
        />
        {/* Problem */}
        <KptField
          color="var(--brand)" label="P · Problem" emoji="🐛"
          placeholder="課題になったバグ、改善すべき点…"
          value={prob} onChange={setProb}
        />
        {/* Try */}
        <KptField
          color="var(--gold)" label="T · Try" emoji="🚀"
          placeholder="次スプリントで試すこと…"
          value={tryT} onChange={setTryT}
        />

        {/* Mood */}
        <div className="rounded-[20px] p-4" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
          <p className="font-mono text-[10px] uppercase tracking-wider mb-3" style={{ color: 'var(--text3)' }}>
            今週のコンディション
          </p>
          <div className="flex justify-around">
            {MOODS.map((m, i) => (
              <button key={i} onClick={() => setMood(i)}
                className="text-3xl transition-all active:scale-90"
                style={{ opacity: mood === i ? 1 : 0.3, transform: mood === i ? 'scale(1.2)' : 'scale(1)' }}>
                {m}
              </button>
            ))}
          </div>
        </div>

        {/* Submit */}
        <button onClick={handleSave}
          className="w-full py-4 rounded-2xl font-mono text-[13px] uppercase tracking-wider mt-2
            active:scale-[0.98] transition-transform"
          style={{ background: 'var(--brand)', color: 'white' }}>
          スプリントを完了する ✓
        </button>
      </div>
    </>
  )
}

function KptField({ color, label, emoji, placeholder, value, onChange }: {
  color: string; label: string; emoji: string
  placeholder: string; value: string; onChange: (v: string) => void
}) {
  return (
    <div className="rounded-[20px] p-4" style={{ background: 'var(--surface)', border: `1px solid var(--border)` }}>
      <div className="flex items-center gap-2 mb-3">
        <span>{emoji}</span>
        <span className="font-mono text-[11px] font-bold uppercase tracking-wider" style={{ color }}>
          {label}
        </span>
      </div>
      <textarea
        value={value} onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={3}
        className="w-full resize-none bg-transparent text-[13px] leading-relaxed outline-none"
        style={{ color: 'var(--text)', caretColor: color }}
      />
    </div>
  )
}
