/** @type {import('tailwindcss').Config} */
export default {
 content: [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
 ],
 theme: {
  extend: {
   fontFamily: {
    sans: ['Inter', 'system-ui', 'sans-serif'],
   },
   colors: {
    orbit: {
     background: '#040712', // Deep Space Black/Navy
     card: '#0B112B',
     accent: '#3B82F6', // Neon Blue
     purple: '#8B5CF6', // Neon Purple
     glow: '#22D3EE',
    },
    brand: {
     50: '#F0F7FF',
     100: '#E0EFFF',
     200: '#B8DBFF',
     300: '#7AB7FF',
     400: '#3D93FF',
     500: '#0078D4', // Microsoft-inspired Blue
     600: '#0062AF',
     700: '#004C88',
     800: '#003761',
     900: '#00223B',
    },
   },
   backgroundImage: {
    'space-gradient': 'radial-gradient(circle at center, #1E1B4B 0%, #040712 100%)',
    'nebula-gradient': 'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%)',
    'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)',
   },
   borderRadius: {
    'premium': '14px',
    'card': '16px',
   },
   boxShadow: {
    'neon-blue': '0 0 15px rgba(59, 130, 246, 0.5)',
    'neon-blue-hover': '0 0 25px rgba(59, 130, 246, 0.8)',
    'neon-purple': '0 0 15px rgba(139, 92, 246, 0.5)',
    'glow': '0 0 30px rgba(34, 211, 238, 0.3)',
    'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
   },
   keyframes: {
    zoomIn: {
     '0%': { opacity: '0', transform: 'scale(0.95)' },
     '100%': { opacity: '1', transform: 'scale(1)' },
    },
    fadeIn: {
     '0%': { opacity: '0' },
     '100%': { opacity: '1' },
    },
    float: {
     '0%, 100%': { transform: 'translateY(0)' },
     '50%': { transform: 'translateY(-20px)' },
    },
    orbit: {
     '0%': { transform: 'rotate(0deg) translateX(100px) rotate(0deg)' },
     '100%': { transform: 'rotate(360deg) translateX(100px) rotate(-360deg)' },
    },
    shimmer: {
     '100%': { transform: 'translateX(100%)' },
    },
    pulseGlow: {
     '0%, 100%': { opacity: 1, transform: 'scale(1)' },
     '50%': { opacity: 0.7, transform: 'scale(1.05)' },
    }
   },
   animation: {
    zoomIn: 'zoomIn 0.4s ease-out forwards',
    fadeIn: 'fadeIn 0.3s ease-out forwards',
    'float': 'float 6s ease-in-out infinite',
    'orbit-slow': 'orbit 20s linear infinite',
    'shimmer': 'shimmer 2s infinite',
    'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
    'spin-slow': 'spin 15s linear infinite',
   }
  },
 },
 plugins: [],
};
