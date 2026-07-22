import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './data/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: '#FBF3E3',
          dark: '#F3E7D0',
        },
        ink: '#2E2A26',
        green: {
          DEFAULT: '#2F7A5C',
          light: '#E4F1EA',
        },
        orange: {
          DEFAULT: '#E8793C',
          light: '#FCE7DA',
        },
        navy: {
          DEFAULT: '#26355D',
          light: '#E4E7F1',
        },
      },
      fontFamily: {
        display: ['var(--font-display)'],
        body: ['var(--font-body)'],
      },
      backgroundImage: {
        grid: 'linear-gradient(#00000012 1px, transparent 1px), linear-gradient(90deg, #00000012 1px, transparent 1px)',
      },
      backgroundSize: {
        grid: '28px 28px',
      },
      boxShadow: {
        cover: '0 18px 35px -12px rgba(46, 42, 38, 0.35)',
      },
    },
  },
  plugins: [],
};

export default config;
