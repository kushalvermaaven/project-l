/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          900: '#0a0a0f',
          800: '#13131a',
          700: '#1a1a2e',
          600: '#252540',
          500: '#303055',
        },
        purple: {
          400: '#8a2be2', // Violet
          500: '#6a0dad', // Purple
          600: '#4b0082', // Indigo/Deep Violet
          700: '#3a0066',
          800: '#2a004d',
        },
        cyan: {
          400: '#1e90ff', // Dodger Blue
          500: '#008b8b', // Teal
          600: '#006666',
        },
        neon: {
          cyan: '#008b8b',
          cyanLight: '#1e90ff',
          pink: '#c71585', // Magenta
          orange: '#ff4500', // Orange Red
          green: '#ffd700', // Yellow (from logo)
        }
      },
      fontFamily: {
        heading: ['Space Grotesk', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'hero-gradient': 'linear-gradient(135deg, rgba(75,0,130,0.2), rgba(0,139,139,0.1), rgba(199,21,133,0.15))',
        'card-gradient': 'linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
      },
      boxShadow: {
        'neon-purple': '0 0 20px rgba(75,0,130,0.5), 0 0 60px rgba(75,0,130,0.2)',
        'neon-cyan': '0 0 20px rgba(0,139,139,0.5), 0 0 60px rgba(0,139,139,0.2)',
        'neon-pink': '0 0 20px rgba(199,21,133,0.5), 0 0 60px rgba(199,21,133,0.2)',
        'card': '0 8px 32px rgba(0,0,0,0.1), 0 2px 8px rgba(0,0,0,0.05)',
        'card-hover': '0 20px 60px rgba(0,0,0,0.15), 0 0 40px rgba(75,0,130,0.1)',
        'glass': '0 8px 32px rgba(0,0,0,0.05), inset 0 1px 0 rgba(0,0,0,0.02)',
        'inner-glow': 'inset 0 0 30px rgba(75,0,130,0.1)',
      },
      animation: {
        float:        'float 4s ease-in-out infinite',
        'float-slow': 'float-slow 7s ease-in-out infinite',
        glow:         'glow 2s ease-in-out infinite alternate',
        'glow-pulse':  'glow-pulse 3s ease-in-out infinite',
        'spin-slow':  'spin-slow 20s linear infinite',
        'ping-slow':  'ping-slow 2.5s cubic-bezier(0,0,0.2,1) infinite',
        aurora:       'aurora 8s ease infinite',
        'gradient-x': 'gradient-x 4s ease infinite',
        shimmer:      'shimmer 1.5s ease-in-out infinite',
        slideUp:      'slide-up 0.5s ease-out',
        fadeIn:       'fade-in 0.5s ease-out',
        marquee:      'marquee 25s linear infinite',
        flicker:      'text-flicker 8s linear infinite',
        'border-dance': 'border-dance 4s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%':       { transform: 'translateY(-12px) rotate(1deg)' },
          '66%':       { transform: 'translateY(-6px) rotate(-1deg)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0) scale(1)' },
          '50%':       { transform: 'translateY(-20px) scale(1.02)' },
        },
        glow: {
          '0%':   { boxShadow: '0 0 5px #7c3aed, 0 0 20px rgba(124,58,237,0.3)' },
          '100%': { boxShadow: '0 0 10px #22d3ee, 0 0 40px rgba(6,182,212,0.3)' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%':       { opacity: '0.8', transform: 'scale(1.1)' },
        },
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to:   { transform: 'rotate(360deg)' },
        },
        'ping-slow': {
          '0%':   { transform: 'scale(1)', opacity: '0.8' },
          '100%': { transform: 'scale(2.2)', opacity: '0' },
        },
        aurora: {
          '0%':   { backgroundPosition: '0% 50%' },
          '50%':  { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%':       { backgroundPosition: '100% 50%' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        'slide-up': {
          from: { transform: 'translateY(20px)', opacity: '0' },
          to:   { transform: 'translateY(0)', opacity: '1' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to:   { transform: 'translateX(-50%)' },
        },
        'text-flicker': {
          '0%, 100%': { opacity: '1' },
          '92%':       { opacity: '1' },
          '93%':       { opacity: '0.8' },
          '94%':       { opacity: '1' },
          '96%':       { opacity: '0.9' },
          '97%':       { opacity: '1' },
        },
        'border-dance': {
          '0%':   { borderColor: 'rgba(124,58,237,0.4)' },
          '33%':  { borderColor: 'rgba(6,182,212,0.4)' },
          '66%':  { borderColor: 'rgba(236,72,153,0.4)' },
          '100%': { borderColor: 'rgba(124,58,237,0.4)' },
        },
      },
      backdropBlur: {
        xs: '2px',
        '4xl': '80px',
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'smooth': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};
