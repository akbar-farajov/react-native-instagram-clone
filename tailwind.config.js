/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#3797EF",
        light: {
          100: "#FFFFFF",
          200: "#FAFAFA",
        },
        dark: {
          100: "#121212",
          200: "#000000",
        },
      },
    },
  },
  plugins: [],
};
