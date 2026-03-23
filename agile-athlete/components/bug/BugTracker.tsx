'use client'
import { useState, useCallback } from 'react'
import { BUG_TAGS, TRIGGER_TAGS, PATCHES } from '@/lib/master'
import BottomSheet from '@/components/ui/BottomSheet'
import AhaMoment from '@/components/bug/AhaMoment'

type Step = 'bug' | 'trigger' | 'aha' | 'patch' | 'done'

interface Props {
  sprintId: string
  open: boolean
  onClose: () => void
}

export default function BugTracker({ sprintId, open, onClose }: Props) {
  const [step, setStep] = useState<Step>('bug')
  const [selectedBug, setSelectedBug]         = useState<string | null>(null)
  const [selectedTrigger, setSelectedTrigger] = useState<string | null>(null)

  const reset = useCallback(() => {
    setStep('bug')
    setSelectedBug(null)
    setSelectedTrigger(null)
    onClose()
  }, [onClose])

  // ── Step 1: バグ選択 ──
  const handleBugSelect = useCallback((id: string) => {
    setSelectedBug(id)
    setStep('trigger')
    // Optimistic UI: APIコールはAha!発火時に非同期実行
  }, [])

  // ── Step 2: トリガー選択 or スキップ ──
  const handleTriggerSelect = useCallback((id: string | null) => {
    setSelectedTrigger(id)
    setStep('aha')
    // バックグラウンドでPOST /api/bugs 実行
    postBug(sprintId, selectedBug!, id)
  }, [sprintId, selectedBug])

  // ── Step 3: Aha! 終了後 ──
  const handleAhaDone = useCallback(() => {
    setStep('patch')
  }, [])

  // ── Step 4: パッチ選択 or スキップ ──
  const handlePatchSelect = useCallback((_patch: string | null) => {
    reset()
  }, [reset])

  const patches = PATCHES[selectedBug ?? ''] ?? PATCHES.default

  if (!open) return null

  return (
    <>
      {/* ── STEP 1: Bug Sheet ── */}
      <BottomSheet
        open={step === 'bug'}
        onClose={reset}
        step="1 / 3"
        headline={'どんなバグが\n発生しましたか？'}
      >
        <div className="grid grid-cols-2 gap-2.5 px-4">
          {BUG_TAGS.map((tag) => (
            <button key={tag.id}
              onClick={() => handleBugSelect(tag.id)}
              className="rounded-2xl p-3.5 text-center active:scale-95 transition-transform"
              style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
            >
              <span className="block text-2xl mb-1.5">{tag.emoji}</span>
              <span className="block text-[12px] font-medium" style={{ color: 'var(--text)' }}>
                {tag.label}
              </span>
            </button>
          ))}
        </div>
      </BottomSheet>

      {/* ── STEP 2: Trigger Sheet ── */}
      <BottomSheet
        open={step === 'trigger'}
        onClose={reset}
        step="2 / 3"
        headline={'何がトリガーに\nなりましたか？'}
      >
        <div className="grid grid-cols-2 gap-2.5 px-4">
          {TRIGGER_TAGS.map((tag) => (
            <button key={tag.id}
              onClick={() => handleTriggerSelect(tag.id)}
              className="rounded-2xl p-3.5 text-center active:scale-95 transition-transform"
              style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
            >
              <span className="block text-2xl mb-1.5">{tag.emoji}</span>
              <span className="block text-[12px] font-medium" style={{ color: 'var(--text)' }}>
                {tag.label}
              </span>
            </button>
          ))}
        </div>
        <button
          onClick={() => handleTriggerSelect(null)}
          className="mx-4 mt-3.5 w-[calc(100%-2rem)] py-3.5 rounded-2xl font-mono text-[11px]
            uppercase tracking-wider active:opacity-70 transition-opacity"
          style={{ border: '1px solid var(--border2)', color: 'var(--text3)' }}
        >
          ↓ スキップして次へ
        </button>
      </BottomSheet>

      {/* ── STEP 3: Aha! ── */}
      {step === 'aha' && <AhaMoment onDone={handleAhaDone} />}

      {/* ── STEP 4: Patch Sheet ── */}
      <BottomSheet
        open={step === 'patch'}
        onClose={() => handlePatchSelect(null)}
        step="Patch Applied"
        headline={'次スプリントの\n修正パッチを選ぼう'}
      >
        <div className="px-4 flex flex-col gap-2.5">
          {patches.map((patch) => (
            <button key={patch.letter}
              onClick={() => handlePatchSelect(patch.letter)}
              className="flex items-start gap-3 rounded-2xl p-4 text-left active:scale-[0.98] transition-transform"
              style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
            >
              <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0
                font-mono text-xs font-bold"
                style={{
                  background: 'rgba(245,158,11,0.12)',
                  border: '1px solid rgba(245,158,11,0.2)',
                  color: 'var(--gold)',
                }}>
                {patch.letter}
              </div>
              <p className="text-[13px] leading-relaxed" style={{ color: 'var(--text)' }}>
                {patch.text}
              </p>
            </button>
          ))}
        </div>
        <button
          onClick={() => handlePatchSelect(null)}
          className="mx-4 mt-3 w-[calc(100%-2rem)] py-3.5 rounded-2xl font-mono text-[11px]
            uppercase tracking-wider active:opacity-70 transition-opacity"
          style={{ border: '1px solid var(--border2)', color: 'var(--text3)' }}
        >
          ↓ 今回はスキップ
        </button>
      </BottomSheet>
    </>
  )
}

// ── バックグラウンドAPIコール（Optimistic UI）──
async function postBug(sprintId: string, bugTagId: string, triggerTagId: string | null) {
  try {
    await fetch('/api/bugs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sprint_id: sprintId,
        bug_tag_id: bugTagId,
        trigger_tag_id: triggerTagId,
        is_public: true,
        occurred_at: new Date().toISOString(),
      }),
    })
  } catch (e) {
    console.error('Bug post failed:', e)
    // Toast通知はここで発火（MVP: 省略）
  }
}
