/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        taskade: {
          bg: '#090d16',
          sidebar: '#0d1322',
          card: '#121a2d',
          cardHover: '#18233c',
          border: '#1f2d4a',
          cyan: '#00f0ff',
          emerald: '#10b981',
          purple: '#8b5cf6',
          accent: '#38bdf8'
        }
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'monospace'],
        sans: ['Plus Jakarta Sans', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
