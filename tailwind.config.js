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
        'sinoog': '0 1px 2px rgba(15, 23, 42, 0.05), 0 10px 28px -10px rgba(234, 88, 12, 0.12), 0 24px 50px -30px rgba(15, 23, 42, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.85)',
        'sinoog-hover': '0 2px 4px rgba(15, 23, 42, 0.06), 0 16px 36px -10px rgba(234, 88, 12, 0.22), 0 32px 60px -28px rgba(249, 115, 22, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.95)',
        'sinoog-raised': '0 4px 8px rgba(15, 23, 42, 0.08), 0 20px 42px -10px rgba(234, 88, 12, 0.24), 0 36px 64px -26px rgba(15, 23, 42, 0.16), inset 0 1px 0 rgba(255, 255, 255, 0.95)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      }
    },
  },
  plugins: [],
}
