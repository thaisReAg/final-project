/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "orange": "#ff9f43", // Naranja
        "turq": "#86e8c1", // TURQUESA
        "cream": "#f3f0e3", // Crema
        "dark": "#333333", // Negro
        "error": "#ff6961", // Rojo
        'white': "#fff", // Blanco
      },
    },
  },
  plugins: [],
};
