/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js}'],
  theme: {
    extend: {
      colors: {
        ink: '#0f1715',
        accent: '#ff454f',
        mist: '#eaf5f6',
      },
      maxWidth: {
        page: '1180px',
      },
      borderRadius: {
        card: '8px',
      },
    },
  },
  plugins: [],
};
