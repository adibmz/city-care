/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        civic: {
          50: '#f0f6f8',
          100: '#d9e7ec',
          200: '#b7cfd8',
          300: '#8fb0bf',
          400: '#6b92a7',
          500: '#4f6f86',
          600: '#3d596c',
          700: '#2f4553',
          800: '#20313b',
          900: '#121c22'
        },
        accent: {
          500: '#1f8a70',
          600: '#156d58'
        },
        warning: {
          500: '#f0b429'
        },
        success: {
          600: '#12805c'
        }
      },
      fontFamily: {
        sans: ['"Public Sans"', 'system-ui', 'sans-serif'],
        serif: ['"Newsreader"', 'serif']
      },
      boxShadow: {
        soft: '0 12px 40px rgba(17, 34, 51, 0.12)'
      }
    }
  },
  plugins: []
};
