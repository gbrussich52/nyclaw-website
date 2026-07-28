import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // --- Dusk system (2026 handoff) ---------------------------------
        // The palette is otherwise stock Tailwind `zinc` — #09090b is
        // zinc-950, #18181b zinc-900, #d4d4d8 zinc-300, and so on. Only this
        // blue has no stock equivalent.
        //
        // NOTE: `cyan`, `indigo` and `violet` used to be declared here as flat
        // strings. Extending a color with a string REPLACES the entire ramp,
        // so `cyan-400` did not exist and any such class silently emitted
        // nothing. They are gone now; use the stock ramps (cyan-400 is exactly
        // #22d3ee, indigo-500 exactly #6366f1). Violet is retired outright —
        // TOKENS.md permits one accent gradient and one accent hue.
        'brand-blue': '#2e8bff',

        // --- Legacy light palette ---------------------------------------
        // ~1,300 class usages still reference these across routes not yet
        // ported to dusk. Removing them now would blank out live pages
        // mid-migration. Deleted in the final phase, once grep comes back
        // clean. Do not add new usages.
        navy: '#003366',
        'sky-blue': '#0066cc',
        'dark-red': '#c41e3a',
        charcoal: '#2c2c2c',

        // Legacy navy-tinted dusk ramp, superseded by zinc. Same deal.
        dusk: {
          950: '#07080f',
          900: '#0d1020',
          850: '#11152a',
          800: '#161a2e',
          700: '#1e2440',
        },
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
