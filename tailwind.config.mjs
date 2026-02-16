```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#EAF0F6',
          100: '#D5E1ED',
          200: '#ACC3DB',
          300: '#82A5CA',
          400: '#5987B8',
          500: '#446E9B',
          600: '#2D557F',
          700: '#2D3748', // Base: Slate Blue
          800: '#202835',
          900: '#161C24',
        },
        accent: {
          50: '#EDF9F1',
          100: '#D5F1DE',
          200: '#ADDEC4',
          300: '#85CAAB',
          400: '#5CB691',
          500: '#38A169', // Base: Tech Green
          600: '#2F855A',
          700: '#276749',
          800: '#1F4D38',
          900: '#173628',
        },
        secondary: { // Optional: Warm Ochre
          50: '#FEF8ED',
          100: '#FDF0D5',
          200: '#FAE3AD',
          300: '#F6D684',
          400: '#F0C25A',
          500: '#D69E2E', // Base: Warm Ochre
          600: '#B08226',
          700: '#8A661E',
          800: '#644A16',
          900: '#3E2E0E',
        },
        surface: { // Neutrals
          50: '#F7FAFC',   // Off-White (Page Background)
          100: '#EDF2F7',
          200: '#E2E8F0',  // Light Gray (Borders, Cards)
          300: '#CBD5E0',
          400: '#A0AEC0',
          500: '#718096',
          600: '#4A5568',
          700: '#2D3748',  // Same as primary-700
          800: '#1A202C',  // Dark Text
          900: '#171923',
        },
        success: '#38A169',
        warning: '#D69E2E',
        error: '#C53030',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.6' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '1.4' }],
        '4xl': ['2.25rem', { lineHeight: '1.3' }],
        '5xl': ['3rem', { lineHeight: '1.2' }],
        '6xl': ['3.75rem', { lineHeight: '1.1' }],
      },
      transitionTimingFunction: {
        'in-out': 'ease-in-out',
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem', // px-4 on mobile
          md: '1.5rem',    // px-6 on md+
        },
        screens: {
          '2xl': '1280px',
        },
      },
    },
  },
  plugins: [],
}
```