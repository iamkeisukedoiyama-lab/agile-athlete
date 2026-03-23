'use client'

const FEED = [
  { id:'f1', user:'tanaka_dev', emoji:'🍜', name:'深夜ラーメン', trigger:'残業ストレス', patch:'プロテイン作戦', lgtm:12, patchReact:5, time:'2時間前' },
  { id:'f2', user:'sato_pm',    emoji:'🛏️', name:'ジムサボり',   trigger:'睡眠不足',   patch:null,          lgtm:8,  patchReact:3, time:'5時間前' },
  { id:'f3', user:'yamada_eng', emoji:'🍰', name:'間食しすぎ',   trigger:'SNS見すぎ',  patch:'スマホを別室に', lgtm:20, patchReact:9, time:'昨日' },
]

export default function FeedPage() {
  return (
    <>
      <div className="flex justify-between items-center px-6 pt-14 pb-2">
        <span className="font-mono text-xs" style={{ color: 'var(--text3)' }}>9:41</span>
        <span className="font-mono text-xs" style={{ color: 'var(--text3)' }}>●●●</span>
      </div>

      <div className="px-6 pb-5">
        <p className="font-mono text-[10px] uppercase tracking-widest mb-1.5" style={{ color: 'var(--text3)' }}>
          Community
        </p>
        <h1 className="text-[26px] font-bold tracking-tight">開発ログ</h1>
      </div>

      <div className="px-4 flex flex-col gap-3">
        {FEED.map((item) => (
          <div key={item.id} className="rounded-[20px] p-4"
            style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>

            {/* header */}
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center font-mono text-xs font-bold"
                style={{ background: 'var(--bg3)', color: 'var(--text2)' }}>
                {item.user.slice(0,2).toUpperCase()}
              </div>
              <div>
                <p className="font-mono text-[11px] font-medium" style={{ color: 'var(--text)' }}>
                  @{item.user}
                </p>
                <p className="font-mono text-[10px]" style={{ color: 'var(--text3)' }}>{item.time}</p>
              </div>
              <div className="ml-auto rounded-full px-2.5 py-0.5"
                style={{ background: 'rgba(232,69,42,0.12)', border: '1px solid rgba(232,69,42,0.2)' }}>
                <span className="font-mono text-[9px]" style={{ color: 'var(--brand)' }}>Bug Report</span>
              </div>
            </div>

            {/* bug */}
            <div className="flex items-center gap-2.5 mb-3">
              <span className="text-2xl">{item.emoji}</span>
              <div>
                <p className="text-[14px] font-medium" style={{ color: 'var(--text)' }}>{item.name}</p>
                <p className="font-mono text-[10px]" style={{ color: 'var(--text3)' }}>
                  トリガー: {item.trigger}
                </p>
              </div>
            </div>

            {/* patch */}
            {item.patch && (
              <div className="flex items-center gap-2 mb-3 px-3 py-2 rounded-xl"
                style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.15)' }}>
                <span className="text-xs">🛠️</span>
                <span className="text-[12px]" style={{ color: 'var(--green)' }}>{item.patch}</span>
              </div>
            )}

            {/* reactions */}
            <div className="flex gap-2 pt-2" style={{ borderTop: '1px solid var(--border)' }}>
              {[
                { icon: '👍', label: 'LGTM', count: item.lgtm },
                { icon: '🛠️', label: 'Patch Applied', count: item.patchReact },
              ].map((r) => (
                <button key={r.label}
                  className="flex items-center gap-1.5 rounded-full px-3 py-1.5 font-mono text-[10px]
                    active:scale-95 transition-transform"
                  style={{ background: 'var(--bg3)', color: 'var(--text2)' }}>
                  {r.icon} {r.label} <span style={{ color: 'var(--text3)' }}>{r.count}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
