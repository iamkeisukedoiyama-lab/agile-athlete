'use client'

interface Props {
  bugCount: number
  patchCount: number
  sprintRate: number
}

export default function StatsRow({ bugCount, patchCount, sprintRate }: Props) {
  const stats = [
    { value: bugCount,    color: 'var(--brand)', label: '今週のBugs' },
    { value: patchCount,  color: 'var(--green)', label: 'Patch Applied' },
    { value: `${sprintRate}%`, color: 'var(--gold)', label: 'Sprint Rate' },
  ]
  return (
    <div className="flex gap-2.5">
      {stats.map((s) => (
        <div key={s.label} className="flex-1 rounded-2xl p-3.5 text-center"
          style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
          <div className="font-mono text-[22px] font-bold mb-1" style={{ color: s.color }}>
            {s.value}
          </div>
          <div className="font-mono text-[9px] uppercase tracking-wider" style={{ color: 'var(--text3)' }}>
            {s.label}
          </div>
        </div>
      ))}
    </div>
  )
}
