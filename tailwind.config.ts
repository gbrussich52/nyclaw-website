import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand anchors (kept for recognition + SEO trust equity)
        navy: '#003366',
        'sky-blue': '#0066cc',
        'dark-red': '#c41e3a',
        charcoal: '#2c2c2c',

        // Dusk surfaces — navy-tinted near-blacks for dark sections
        dusk: {
          950: '#07080f',
          900: '#0d1020',
          850: '#11152a',
          800: '#161a2e',
          700: '#1e2440',
        },

        // AI-native accent ramp (used in glows + gradient text)
        'sky-bright': '#2e8bff', // brightened brand sky for dark backgrounds
        cyan: '#22d3ee',
        indigo: '#6366f1',
        violet: '#8b5cf6',
      },
      animation: {
        'pulse-slow': 'pulse 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        aurora: 'aurora 14s ease-in-out infinite',
        float: 'float 7s ease-in-out infinite',
      },
      keyframes: {
        aurora: {
          '0%, 100%': { transform: 'translate3d(-4%, -2%, 0) scale(1)', opacity: '0.8' },
          '50%': { transform: 'translate3d(4%, 3%, 0) scale(1.08)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
