/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        kumbati: {
          orange: {
            50: '#FFF7ED',
            100: '#FFEDD5',
            200: '#FED7AA',
            300: '#FDBA74',
            400: '#FB923C',
            500: '#F97316', // Primary KUMBATI Orange
            600: '#EA580C', // Deep Red-Orange
            700: '#C2410C',
            800: '#9A3412',
            900: '#7C2D12',
          },
          red: {
            500: '#EF4444',
            600: '#DC2626', // Alert / PTV Emergency Red
            700: '#B91C1C',
          },
          ivory: '#FFFDF9', // Warm Bohol Ivory
          slate: {
            800: '#1E293B',
            900: '#0F172A', // Dark Slate
          }
        }
      },
      fontFamily: {
        sans: ['Inter', 'Plus Jakarta Sans', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'kumbati': '0 10px 25px -5px rgba(249, 115, 22, 0.1), 0 8px 10px -6px rgba(249, 115, 22, 0.1)',
        'kumbati-hover': '0 20px 30px -10px rgba(249, 115, 22, 0.2), 0 10px 15px -5px rgba(249, 115, 22, 0.15)',
        'sinoog': '0 1px 3px rgba(15, 23, 42, 0.05), 0 12px 28px -6px rgba(194, 65, 12, 0.20), 0 30px 60px -16px rgba(15, 23, 42, 0.16), inset 0 1.5px 0 0 rgba(255, 255, 255, 1), inset 0 8px 20px -2px rgba(255, 255, 255, 0.85)',
        'sinoog-hover': '0 3px 6px rgba(15, 23, 42, 0.08), 0 18px 38px -6px rgba(194, 65, 12, 0.30), 0 42px 80px -20px rgba(15, 23, 42, 0.22), inset 0 2px 0 0 rgba(255, 255, 255, 1), inset 0 10px 24px -2px rgba(255, 255, 255, 0.95)',
        'sinoog-raised': '0 4px 8px rgba(15, 23, 42, 0.08), 0 22px 48px -8px rgba(194, 65, 12, 0.32), 0 48px 90px -24px rgba(15, 23, 42, 0.24), inset 0 2px 0 0 rgba(255, 255, 255, 1), inset 0 12px 28px -2px rgba(255, 255, 255, 0.95)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      }
    },
  },
  plugins: [],
}
