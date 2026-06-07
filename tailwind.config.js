/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#eef6ff',
          100: '#d9eaff',
          200: '#bcd9ff',
          300: '#8fc1ff',
          400: '#5b9eff',
          500: '#357dff',
          600: '#1f5ef0',
          700: '#1a49c9',
          800: '#1c3fa3',
          900: '#1d3982'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'Segoe UI', 'sans-serif']
      },
      boxShadow: {
        soft: '0 4px 20px -2px rgba(0,0,0,0.08)',
        card: '0 8px 30px -4px rgba(0,0,0,0.10)'
      },
      keyframes: {
        'fade-in':   { '0%': { opacity: 0 }, '100%': { opacity: 1 } },
        'slide-up':  { '0%': { opacity: 0, transform: 'translateY(20px)' }, '100%': { opacity: 1, transform: 'translateY(0)' } },
        'slide-in-r':{ '0%': { transform: 'translateX(100%)' }, '100%': { transform: 'translateX(0)' } },
        'bounce-s':  { '0%,100%': { transform: 'scale(1)' }, '50%': { transform: 'scale(1.2)' } }
      },
      animation: {
        'fade-in':   'fade-in 0.3s ease-out',
        'slide-up':  'slide-up 0.4s ease-out',
        'slide-in-r':'slide-in-r 0.3s ease-out',
        'bounce-s':  'bounce-s 0.4s ease-in-out'
      }
    }
  },
  plugins: []
}
