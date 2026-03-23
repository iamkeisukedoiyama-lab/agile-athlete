import { motion, AnimatePresence } from "framer-motion"
import { SkipForward } from "lucide-react"
import { useState } from "react"
import { AhaMoment } from "./AhaMoment"

const triggerTags = [
  { id: "1", emoji: "🏢", label: "残業ストレス" },
  { id: "2", emoji: "📉", label: "睡眠不足" },
  { id: "3", emoji: "🤝", label: "飲み会誘い" },
  { id: "4", emoji: "💔", label: "人間関係" },
  { id: "5", emoji: "⏰", label: "時間不足" },
  { id: "6", emoji: "🌧️", label: "悪天候" },
]

interface TriggerTagSheetProps {
  isOpen: boolean
  onClose: () => void
  bugId: string | null
}

export function TriggerTagSheet({ isOpen, onClose, bugId }: TriggerTagSheetProps) {
  const [showAhaMoment, setShowAhaMoment] = useState(false)

  const handleTriggerSelect = (_triggerId: string) => {
    setShowAhaMoment(true)
  }

  const handleSkip = () => {
    setShowAhaMoment(true)
  }

  const handleAhaMomentComplete = () => {
    setShowAhaMoment(false)
    onClose()
  }

  return (
    <>
      <AnimatePresence>
        {isOpen && !showAhaMoment && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50"
              style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }}
              onClick={handleSkip}
            />

            {/* Bottom Sheet */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-50 max-h-[85vh] overflow-hidden"
              style={{
                background: "#111318",
                borderRadius: "28px 28px 0 0",
                border: "1px solid rgba(255,255,255,0.12)",
                borderBottom: "none",
              }}
            >
              {/* Handle */}
              <div className="flex justify-center pt-3 pb-0">
                <div
                  className="w-9 h-1 rounded-full"
                  style={{ background: "rgba(255,255,255,0.2)" }}
                />
              </div>

              <div className="p-6 pb-10">
                {/* Header */}
                <div className="mb-1">
                  <p
                    className="font-mono text-[10px] uppercase tracking-widest mb-2"
                    style={{ color: "#555b6a" }}
                  >
                    Step 2 / 3
                  </p>
                  <div className="flex items-center justify-between">
                    <h2
                      className="text-[22px] font-bold leading-snug"
                      style={{ color: "#e8eaf0", letterSpacing: "-0.3px" }}
                    >
                      何がトリガーに<br />なりましたか？
                    </h2>
                    <button
                      onClick={handleSkip}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-xl font-mono text-[11px] uppercase tracking-wider transition-all active:scale-95"
                      style={{
                        color: "#555b6a",
                        border: "1px solid rgba(255,255,255,0.08)",
                      }}
                    >
                      <SkipForward className="w-3 h-3" />
                      スキップ
                    </button>
                  </div>
                </div>

                <p
                  className="text-[13px] mb-5 mt-3"
                  style={{ color: "#8b90a0" }}
                >
                  トリガーは何でしたか？（任意）
                </p>

                {/* Tag Grid */}
                <div className="grid grid-cols-2 gap-3">
                  {triggerTags.map((tag) => (
                    <motion.button
                      key={tag.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleTriggerSelect(tag.id)}
                      className="p-4 rounded-2xl text-left transition-all"
                      style={{
                        background: "#1e222b",
                        border: "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      <div className="text-3xl mb-2">{tag.emoji}</div>
                      <div
                        className="text-[13px] font-medium"
                        style={{ color: "#e8eaf0" }}
                      >
                        {tag.label}
                      </div>
                    </motion.button>
                  ))}
                </div>

                {/* Skip button bottom */}
                <button
                  onClick={handleSkip}
                  className="w-full mt-4 py-3.5 rounded-2xl font-mono text-[11px] uppercase tracking-wider transition-all active:opacity-70"
                  style={{
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#555b6a",
                  }}
                >
                  ↓ スキップしてホームへ
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AhaMoment
        isOpen={showAhaMoment}
        onComplete={handleAhaMomentComplete}
      />
    </>
  )
}
