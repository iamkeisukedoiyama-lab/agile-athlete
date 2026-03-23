import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg:       '#0a0c0f',
        bg2:      '#111318',
        bg3:      '#1a1d24',
        surface:  '#1e222b',
        surface2: '#252a35',
        brand:    '#e8452a',
        'brand-soft': 'rgba(232,69,42,0.12)',
        success:  '#22c55e',
        'success-soft': 'rgba(34,197,94,0.12)',
        gold:     '#f59e0b',
        'gold-soft': 'rgba(245,158,11,0.12)',
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'monospace'],
        sans: ['Noto Sans JP', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
}
export default config
