/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,html}"],
  theme: {
    extend: {
      colors: {
        primary: "#FFC400",
        secondary: "#FF9900",
        dark: "#3A3A3A",
        light: "#F7F7F7",
      },

      fontFamily: {
        gilroy: ["Gilroy", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
      },

      boxShadow: {
        soft: "0 10px 40px rgba(0,0,0,.06)",
      },

      borderRadius: {
        hero: "60px",
        card: "24px",
      },

      maxWidth: {
        container: "1570px",
      },
    },
  },
  plugins: [],
};
