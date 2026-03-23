'use client'

interface Bug {
  id: string
  emoji: string
  name: string
  trigger: string
  time: string
  patched: boolean
  patchText: string | null
}

export default function BugList({ bugs }: { bugs: Bug[] }) {
  return (
    <div className="flex flex-col gap-2">
      {bugs.map((bug) => (
        <div key={bug.id}
          className="flex items-center gap-3 rounded-2xl p-3.5 cursor-pointer active:scale-[0.98] transition-transform"
          style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
        >
          {/* emoji */}
          <div className="w-10 h-10 rounded-[10px] flex items-center justify-center text-xl flex-shrink-0"
            style={{ background: 'rgba(232,69,42,0.12)' }}>
            {bug.emoji}
          </div>

          {/* info */}
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-medium mb-0.5 truncate" style={{ color: 'var(--text)' }}>
              {bug.name}
            </p>
            <p className="font-mono text-[10px]" style={{ color: 'var(--text3)' }}>
              {bug.trigger} · {bug.time}
            </p>
          </div>

          {/* patch badge */}
          {bug.patched && (
            <div className="rounded-full px-2.5 py-1 flex-shrink-0"
              style={{
                background: 'rgba(34,197,94,0.12)',
                border: '1px solid rgba(34,197,94,0.15)',
              }}>
              <span className="font-mono text-[9px]" style={{ color: 'var(--green)' }}>
                Patched ✓
              </span>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
