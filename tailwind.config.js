/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Noto Sans JP"', 'sans-serif'],
      },
      colors: {
        ojisan: {
          bg: '#0f0c1a',
          card: '#1e1830',
          amber: '#f5a623',
          amber2: '#e8941a',
          gold: '#ffd700',
          cream: '#f5efe0',
          red: '#e05a5a',
          green: '#5acea0',
        },
      },
      keyframes: {
        'slide-up': {
          '0%': { transform: 'translateY(60px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 12px rgba(245,166,35,0.3)' },
          '50%': { boxShadow: '0 0 28px rgba(245,166,35,0.7)' },
        },
      },
      animation: {
        'slide-up': 'slide-up 0.5s ease-out forwards',
        'fade-in': 'fade-in 0.4s ease-out forwards',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
