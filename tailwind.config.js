/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "fade-up": "fade-up 0.15s ease-out",
      },
      fontFamily: {
        sans: ["InterVariable", "sans-serif"],
        mono: ["RedditMonoVariable", "monospace"],
      },
      keyframes: {
        "fade-up": {
          "0%": {
            opacity: "0",
            transform: "translateY(50%)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0%)",
          },
        },
      },
      screens: {
        "3xl": "1600px",
        "4xl": "1920px",
      },
    },
  },
  plugins: [],
};
