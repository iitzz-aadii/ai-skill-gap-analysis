/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Modern Professional Color Palette
        primary: {
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',  // Main Primary Blue (Modern)
          600: '#2563EB',  // Darker for hover
          700: '#1D4ED8',
          800: '#1E40AF',
          900: '#1E3A8A',
        },
        accent: {
          purple: '#8B5CF6',
          green: '#10B981',
          orange: '#F59E0B',
          red: '#EF4444',
          teal: '#14B8A6',
        },
        neutral: {
          50: '#FAFAFA',
          100: '#F5F5F5',
          200: '#E5E5E5',
          300: '#D4D4D4',
          400: '#A3A3A3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        },
        charcoal: '#1F2937',  // Primary text/headings (darker)
        mediumGrey: '#6B7280',  // Secondary text
        lightGrey: '#E5E7EB',  // Borders
        backgroundGrey: '#F9FAFB',  // Page background (lighter)
        offWhite: '#FFFFFF',  // Header background (pure white)
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.25rem',
        '3xl': '1.5rem',
      },
    },
  },
  plugins: [],
}
