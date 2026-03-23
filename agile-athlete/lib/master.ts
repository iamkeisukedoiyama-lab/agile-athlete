export const BUG_TAGS = [
  { id: 'midnight-carbs',  emoji: '🍜', label: '深夜の炭水化物', category: 'food' },
  { id: 'skip-gym',        emoji: '🛏️', label: 'ジム・サボり',   category: 'exercise' },
  { id: 'drink-too-much',  emoji: '🍺', label: '飲みすぎ',       category: 'food' },
  { id: 'low-steps',       emoji: '🚶', label: '歩数不足',       category: 'exercise' },
  { id: 'bad-sleep',       emoji: '😴', label: '睡眠乱れ',       category: 'sleep' },
  { id: 'snack',           emoji: '🍰', label: '間食しすぎ',     category: 'food' },
]

export const TRIGGER_TAGS = [
  { id: 'overwork',   emoji: '🏢', label: '残業ストレス' },
  { id: 'lack-sleep', emoji: '📉', label: '睡眠不足' },
  { id: 'people',     emoji: '😤', label: '人間関係疲れ' },
  { id: 'sns',        emoji: '📱', label: 'SNS見すぎ' },
  { id: 'weather',    emoji: '🌧️', label: '天気・気分' },
  { id: 'no-time',    emoji: '⏰', label: '時間がない' },
]

export const PATCHES: Record<string, { letter: string; text: string }[]> = {
  'midnight-carbs': [
    { letter: 'A', text: '帰宅前にプロテインを飲んで深夜の食欲を抑える' },
    { letter: 'B', text: '残業時はコンビニでサラダをキープしておく' },
    { letter: 'C', text: '22時以降はキッチンに入らないルールを設定する' },
  ],
  'skip-gym': [
    { letter: 'A', text: 'ジムバッグを前夜に玄関に置いておく' },
    { letter: 'B', text: '15分だけと決めてとにかく着替える' },
    { letter: 'C', text: '週2回に目標を下げてハードルを下げる' },
  ],
  default: [
    { letter: 'A', text: '発生パターンをメモして次回の対策を立てる' },
    { letter: 'B', text: '環境を変えてトリガーを遠ざける' },
    { letter: 'C', text: '代替行動を事前に決めておく' },
  ],
}
