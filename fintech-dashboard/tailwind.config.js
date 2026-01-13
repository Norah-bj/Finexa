/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#1A73E8',
          600: '#1565c0',
          700: '#0d47a1',
        },
        secondary: {
          50: '#f3e5f5',
          100: '#e1bee7',
          500: '#4CAF50',
          600: '#43a047',
          700: '#388e3c',
        },
        accent: {
          50: '#fffbf0',
          100: '#fef3c7',
          500: '#FFC107',
          600: '#f57c00',
          700: '#ef6c00',
        },
      },
      fontSize: {
        'xs': ['11px', '16px'],
        'sm': ['13px', '18px'],
        'base': ['14px', '20px'],
        'lg': ['16px', '24px'],
        'xl': ['18px', '28px'],
        '2xl': ['22px', '32px'],
        '3xl': ['28px', '36px'],
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'card-hover': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
    },
  },
  plugins: [],
};
