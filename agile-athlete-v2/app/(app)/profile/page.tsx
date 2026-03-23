export default function ProfilePage() {
  return (
    <>
      <div className="flex justify-between items-center px-6 pt-14 pb-2">
        <span className="font-mono text-xs" style={{ color: 'var(--text3)' }}>9:41</span>
      </div>

      <div className="px-6 pb-6">
        <p className="font-mono text-[10px] uppercase tracking-widest mb-1.5" style={{ color: 'var(--text3)' }}>
          Your Profile
        </p>
        <h1 className="text-[26px] font-bold tracking-tight">プロフィール</h1>
      </div>

      <div className="px-4 flex flex-col gap-3">
        {/* User card */}
        <div className="rounded-[20px] p-5" style={{ background: 'var(--surface)', border: '1px solid var(--border2)' }}>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold"
              style={{ background: 'var(--bg3)', color: 'var(--text2)' }}>
              田
            </div>
            <div>
              <p className="text-[18px] font-bold">田中_dev</p>
              <p className="font-mono text-[11px]" style={{ color: 'var(--text3)' }}>Sprint 1 進行中</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2.5">
          {[
            { val: '1', label: 'Sprint数' },
            { val: '2', label: 'Total Bugs' },
            { val: '1', label: 'Patches' },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl p-4 text-center"
              style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
              <p className="font-mono text-[22px] font-bold mb-1" style={{ color: 'var(--text)' }}>{s.val}</p>
              <p className="font-mono text-[9px] uppercase tracking-wider" style={{ color: 'var(--text3)' }}>
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* Sprint history */}
        <div className="rounded-[20px] p-4" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
          <p className="font-mono text-[11px] uppercase tracking-wider mb-3" style={{ color: 'var(--text3)' }}>
            スプリント履歴
          </p>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center font-mono text-[10px]"
              style={{ background: 'rgba(232,69,42,0.12)', color: 'var(--brand)' }}>
              01
            </div>
            <div className="flex-1">
              <p className="text-[13px] font-medium">週3回ウェアを着て外に出る</p>
              <p className="font-mono text-[10px]" style={{ color: 'var(--text3)' }}>
                3/17 – 3/23 · 進行中
              </p>
            </div>
            <span className="font-mono text-[10px]" style={{ color: 'var(--brand)' }}>Active</span>
          </div>
        </div>
      </div>
    </>
  )
}
