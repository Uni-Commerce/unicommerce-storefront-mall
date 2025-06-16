// Tailwind 的默认断点：
// sm: 640px
// md: 768px
// lg: 1024px
// xl: 1280px
// 2xl: 1536px

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        custom: '240px 1fr'
      }
    }
  },
  plugins: []
}
