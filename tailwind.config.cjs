
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f4f7fa',
          100: '#e9eff5',
          200: '#c8d7e6',
          300: '#a7bfd7',
          400: '#658eb9',
          500: '#2A5C8A',
          600: '#26537c',
          700: '#204568',
          800: '#193753',
          900: '#152d43',
          950: '#0d1d2b',
        },
        accent: {
          50: '#fff7f4',
          100: '#fff0e9',
          200: '#ffd8c8',
          300: '#ffc1a7',
          400: '#ff9165',
          500: '#FF6B35',
          600: '#e66030',
          700: '#bf5028',
          800: '#99411f',
          900: '#7d351a',
        },
        success: '#4CAF50',
        neutral: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Poppins', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      animation: {
        'fade-in': 'fade-in 0.6s ease-out',
        'slide-up': 'slide-up 0.6s ease-out',
        'bounce-gentle': 'bounce-gentle 2s infinite',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'bounce-gentle': {
          '0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)' },
          '40%': { transform: 'translateY(-5px)' },
          '60%': { transform: 'translateY(-3px)' },
        },
      },
    },
  },
  plugins: [],
}
