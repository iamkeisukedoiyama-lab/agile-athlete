'use client'
import { useState } from 'react'
import SprintCard from '@/components/sprint/SprintCard'
import BugList from '@/components/bug/BugList'
import BugFab from '@/components/bug/BugFab'
import BugTracker from '@/components/bug/BugTracker'
import StatsRow from '@/components/sprint/StatsRow'

// ── Demo data (MVP: 実際はSupabaseから取得) ──
const DEMO_SPRINT = {
  id: 'sprint-1',
  title: 'Sprint 01',
  goal: '週3回、ウェアを着て外に出る',
  startDate: '2025-03-17',
  endDate: '2025-03-23',
  daysCompleted: 3,
  totalDays: 7,
  status: 'active' as const,
}

const DEMO_BUGS = [
  { id: 'b1', emoji: '🍜', name: '深夜ラーメン',  trigger: '残業ストレス', time: '昨日 23:45', patched: true,  patchText: 'プロテイン作戦' },
  { id: 'b2', emoji: '🛏️', name: 'ジムをサボった', trigger: '睡眠不足',   time: '今日 07:30', patched: false, patchText: null },
]

export default function HomePage() {
  const [trackerOpen, setTrackerOpen] = useState(false)

  return (
    <>
      {/* ── Status Bar ── */}
      <div className="flex justify-between items-center px-6 pt-14 pb-2">
        <span className="font-mono text-xs" style={{ color: 'var(--text3)' }}>9:41</span>
        <span className="font-mono text-xs" style={{ color: 'var(--text3)' }}>●●●</span>
      </div>

      {/* ── Header ── */}
      <div className="px-6 pb-5">
        <p className="font-mono text-[10px] uppercase tracking-widest mb-1.5" style={{ color: 'var(--text3)' }}>
          Week 1 · Sprint in Progress
        </p>
        <h1 className="text-[26px] font-bold leading-tight tracking-tight">
          おはよう、<br />
          <span style={{ color: 'var(--brand)' }}>田中_dev</span>
        </h1>
      </div>

      {/* ── Sprint Card ── */}
      <div className="px-4 mb-4">
        <SprintCard sprint={DEMO_SPRINT} />
      </div>

      {/* ── Stats ── */}
      <div className="px-4 mb-5">
        <StatsRow bugCount={2} patchCount={1} sprintRate={60} />
      </div>

      {/* ── Bug Log ── */}
      <div className="flex justify-between items-center px-6 mb-3">
        <span className="font-mono text-[11px] uppercase tracking-widest" style={{ color: 'var(--text3)' }}>
          今週のバグログ
        </span>
        <span className="font-mono text-[11px]" style={{ color: 'var(--text2)' }}>
          {DEMO_BUGS.length}件
        </span>
      </div>
      <div className="px-4">
        <BugList bugs={DEMO_BUGS} />
      </div>

      {/* ── FAB ── */}
      <BugFab onClick={() => setTrackerOpen(true)} />

      {/* ── Bug Tracker Flow ── */}
      <BugTracker
        sprintId={DEMO_SPRINT.id}
        open={trackerOpen}
        onClose={() => setTrackerOpen(false)}
      />
    </>
  )
}
