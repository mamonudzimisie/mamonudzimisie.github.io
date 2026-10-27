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
        // Paleta „premium”: chłodniejszy papier, głęboki atrament i granat,
        // jeden akcent (terakota, nazwa `orange` zostaje dla zgodności klas).
        paper: {
          DEFAULT: '#F6F1E9',
          dark: '#EDE6DA',
        },
        ink: '#1E1C19',
        green: {
          DEFAULT: '#2F5D4A',
          light: '#E6ECE6',
        },
        orange: {
          DEFAULT: '#B9532F',
          light: '#F2E4DA',
        },
        navy: {
          DEFAULT: '#1F2A48',
          light: '#E6E8EE',
        },
      },
      fontFamily: {
        display: ['var(--font-display)'],
        body: ['var(--font-body)'],
      },
      fontWeight: {
        // Newsreader jest zmienny: „800” z dawnego Baloo wygląda w nim zbyt
        // ciężko, więc nagłówki dostają spokojniejszą grubość.
        600: '500',
        700: '600',
        800: '600',
      },
      backgroundImage: {
        grid: 'linear-gradient(#00000012 1px, transparent 1px), linear-gradient(90deg, #00000012 1px, transparent 1px)',
      },
      backgroundSize: {
        grid: '28px 28px',
      },
      boxShadow: {
        cover: '0 14px 28px -14px rgba(30, 28, 25, 0.28)',
        'cover-lg': '0 34px 60px -24px rgba(30, 28, 25, 0.3)',
      },
    },
  },
  plugins: [],
};

export default config;
