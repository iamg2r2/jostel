/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        azure: {
          50: '#f0f8fb',
          100: '#daedf3',
          200: '#b8dde9',
          300: '#87c5d8',
          400: '#4fa4c0',
          500: '#087EA4',
          600: '#0a6b8c',
          700: '#0e5670',
          800: '#12445a',
          900: '#13394c',
        },
        tangerine: {
          50: '#fef6ee',
          100: '#fdead4',
          200: '#fad2a8',
          300: '#f7b370',
          400: '#f39a4f',
          500: '#EF8A3A',
          600: '#e06e1c',
          700: '#ba5518',
          800: '#94441a',
          900: '#783a19',
        },
        ink: {
          700: '#33424e',
          800: '#243139',
          900: '#1b262d',
        },
      },
      fontFamily: {
        sans: ['"Source Sans 3"', 'system-ui', 'sans-serif'],
        display: ['"Fraunces"', 'Georgia', 'serif'],
      },
      borderRadius: {
        card: '14px',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(19, 57, 76, 0.06), 0 4px 16px rgba(19, 57, 76, 0.06)',
      },
    },
  },
  plugins: [],
}
