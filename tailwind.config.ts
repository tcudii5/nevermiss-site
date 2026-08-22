import type { Config } from 'tailwindcss';

/**
 * DESIGN SYSTEM
 * -------------
 * Palette: deep navy-black canvas, layered surfaces, one signal accent.
 * `signal` (mint-green) = "connected / answered / won" — the product's core promise.
 * `ion` (periwinkle) is a support hue used only in gradients and glows.
 *
 * Type scale: display faces use `font-display`, everything else `font-sans`.
 * Spacing: Tailwind's 4px base. Section rhythm lives in <Section /> (py-20 → py-32).
 */
const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        canvas: {
          DEFAULT: '#07090E',
          raised: '#0B0F16',
          sunken: '#04060A',
        },
        surface: {
          DEFAULT: '#111722',
          hover: '#161E2B',
          border: '#1E2837',
        },
        signal: {
          50: '#EAFFF6',
          100: '#C7FDE8',
          200: '#93F7D3',
          300: '#5FEDBC',
          400: '#34E0A1',
          500: '#14C888',
          600: '#07A46E',
          700: '#0A825A',
          800: '#0D6749',
          900: '#0E553E',
        },
        ion: {
          300: '#A7B8FF',
          400: '#8098FF',
          500: '#5B79FF',
          600: '#4159E6',
        },
        ink: {
          DEFAULT: '#F4F7FB',
          muted: '#9AA7BD',
          faint: '#7B8AA1',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'var(--font-inter)', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      fontSize: {
        'display-xl': ['clamp(2.5rem, 5vw, 4.25rem)', { lineHeight: '1.02', letterSpacing: '-0.035em', fontWeight: '600' }],
        'display-lg': ['clamp(2rem, 4vw, 3.25rem)', { lineHeight: '1.05', letterSpacing: '-0.03em', fontWeight: '600' }],
        'display-md': ['clamp(1.875rem, 3.6vw, 2.75rem)', { lineHeight: '1.12', letterSpacing: '-0.025em', fontWeight: '600' }],
        'display-sm': ['clamp(1.5rem, 2.6vw, 2rem)', { lineHeight: '1.2', letterSpacing: '-0.02em', fontWeight: '600' }],
        'lead': ['clamp(1.0625rem, 1.4vw, 1.25rem)', { lineHeight: '1.6' }],
      },
      maxWidth: {
        content: '1200px',
        prose: '68ch',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(52,224,161,0.16), 0 18px 60px -18px rgba(52,224,161,0.35)',
        panel: '0 24px 80px -32px rgba(0,0,0,0.9)',
        lift: '0 1px 0 0 rgba(255,255,255,0.05) inset, 0 20px 50px -24px rgba(0,0,0,0.85)',
      },
      backgroundImage: {
        'grid-fade':
          'linear-gradient(to bottom, rgba(7,9,14,0) 0%, #07090E 90%), linear-gradient(rgba(30,40,55,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(30,40,55,0.5) 1px, transparent 1px)',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(14px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.85)', opacity: '0.7' },
          '70%': { transform: 'scale(1.6)', opacity: '0' },
          '100%': { transform: 'scale(1.6)', opacity: '0' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        'caret-blink': {
          '0%, 70%, 100%': { opacity: '1' },
          '20%, 50%': { opacity: '0' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s cubic-bezier(0.22,1,0.36,1) both',
        'pulse-ring': 'pulse-ring 2.4s cubic-bezier(0.24,0,0.38,1) infinite',
        marquee: 'marquee 38s linear infinite',
        'caret-blink': 'caret-blink 1.2s steps(1) infinite',
      },
    },
  },
  plugins: [],
};

export default config;
