/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'verde-oscuro': '#4C6442',
        'terracota': '#A15C49',
        'crema': '#F5F5DC',
        'gris-oscuro': '#333333',
        'verde-disponible': '#7FB069',
        'naranja-ocupado': '#FF5733',
        'gris-deshabilitado': '#999999',
      },
      fontFamily: {
        'sans': ['ABeeZee', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
