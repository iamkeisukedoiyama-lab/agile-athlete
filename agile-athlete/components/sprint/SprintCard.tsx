'use client'

interface Sprint {
  id: string
  title: string
  goal: string
  startDate: string
  endDate: string
  daysCompleted: number
  totalDays: number
  status: 'active' | 'completed' | 'skipped'
}

const DAYS = ['月', '火', '水', '木', '金', '土', '日']

export default function SprintCard({ sprint }: { sprint: Sprint }) {
  const pct = Math.round((sprint.daysCompleted / sprint.totalDays) * 100)
  const todayIdx = sprint.daysCompleted  // 0-based: today is the next uncompleted day

  return (
    <div
      className="rounded-[20px] p-5 relative overflow-hidden"
      style={{ background: 'var(--surface)', border: '1px solid var(--border2)' }}
    >
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[2px]"
        style={{ background: 'linear-gradient(90deg, var(--brand), var(--gold))' }} />

      {/* Status badge */}
      <div className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 mb-3"
        style={{ background: 'rgba(232,69,42,0.12)', border: '1px solid rgba(232,69,42,0.2)' }}>
        <span className="w-[5px] h-[5px] rounded-full" style={{
          background: 'var(--brand)',
          animation: 'blink 1.5s infinite'
        }} />
        <span className="font-mono text-[10px]" style={{ color: 'var(--brand)' }}>
          {sprint.title} · Active
        </span>
      </div>

      {/* Goal */}
      <p className="text-[15px] font-medium mb-4 leading-snug" style={{ color: 'var(--text)' }}>
        {sprint.goal}
      </p>

      {/* Progress */}
      <div className="flex justify-between items-center mb-2">
        <span className="font-mono text-[10px] uppercase tracking-wider" style={{ color: 'var(--text3)' }}>
          Progress
        </span>
        <span className="font-mono text-[12px] font-medium" style={{ color: 'var(--green)' }}>
          {sprint.daysCompleted} / {sprint.totalDays} days
        </span>
      </div>

      <div className="h-1 rounded-full mb-4 overflow-hidden" style={{ background: 'var(--bg3)' }}>
        <div className="h-full rounded-full relative transition-all duration-700"
          style={{
            width: `${pct}%`,
            background: 'linear-gradient(90deg, #22c55e, #4ade80)'
          }}>
          <span className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2
            w-2 h-2 rounded-full"
            style={{ background: '#4ade80', boxShadow: '0 0 8px #4ade80' }} />
        </div>
      </div>

      {/* Day dots */}
      <div className="flex gap-1.5">
        {DAYS.map((d, i) => {
          const done    = i < sprint.daysCompleted
          const today   = i === todayIdx
          return (
            <div key={d} className="flex-1 h-7 rounded-[6px] flex items-center justify-center
              font-mono text-[9px] transition-all"
              style={{
                background: done  ? 'rgba(34,197,94,0.12)'  : today ? 'rgba(232,69,42,0.12)' : 'var(--bg3)',
                border:     done  ? '1px solid rgba(34,197,94,0.2)' : today ? '1px solid rgba(232,69,42,0.3)' : 'none',
                color:      done  ? 'var(--green)'  : today ? 'var(--brand)' : 'var(--text3)',
              }}
            >
              {d}
            </div>
          )
        })}
      </div>
    </div>
  )
}
