/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["InterVariable", "sans-serif"],
      },

      keyframes: {
        "grow-y": {
          "0%": {
            gridTemplateRows: "0fr",
          },
          "100%": {
            gridTemplateRows: "1fr",
          },
        },
      },
      animation: {
        "grow-y": "grow-y .15s ease-out",
      },
    },
  },
  plugins: [],
};
