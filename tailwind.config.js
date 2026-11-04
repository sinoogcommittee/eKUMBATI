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
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      }
    },
  },
  plugins: [],
}
