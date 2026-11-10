// Shared Tailwind (CDN) theme. Load AFTER https://cdn.tailwindcss.com
tailwind.config = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
        urdu: ['Noto Nastaliq Urdu', 'Noto Sans Arabic', 'serif'],
      },
      colors: {
        brandBlue: '#1E3A8A',
        brandBlueHover: '#1D4ED8',
        brandBlueLight: '#2563EB',
        accentSky: '#0284C7',
        creamCard: '#FFFDF5',
        creamBorder: '#CBD5E1',
      },
    },
  },
};
