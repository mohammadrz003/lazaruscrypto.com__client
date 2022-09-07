/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        palette: {
          dark: "#191A19",
          green: "#59CE8F",
          white: "#E8F9FD",
          red: "#FF1E00",
        },
      },
      fontFamily: {
        astraneo: ["Astraneo"],
      },
    },
  },
  plugins: [require("daisyui"), require("@tailwindcss/typography")],
  daisyui: {
    themes: ["light", "dark"],
  },
};
