/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ml-primary': '#262626', // Tu color personalizado con valor hexadecimal
      },
    },
  },
  plugins: [],
  important: true,
}

