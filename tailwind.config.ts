import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        // The dusk palette is stock Tailwind `zinc` plus stock `cyan-400`
        // (#22d3ee) and `indigo-500` (#6366f1). This blue is the only value
        // with no stock equivalent, so it is the only color declared here.
        //
        // Do NOT reintroduce flat color declarations like `cyan: '#22d3ee'`.
        // Extending a color with a string replaces the whole ramp, which is
        // how `cyan-400` silently stopped existing in this repo — classes
        // referencing it emitted nothing, with no error.
        //
        // The legacy navy / sky-blue / dark-red / charcoal tokens and the
        // navy-tinted `dusk` ramp were removed once the last route was ported
        // to dusk; a repo-wide grep confirmed zero remaining usages.
        'brand-blue': '#2e8bff',
      },
    },
  },
  plugins: [],
}
export default config
