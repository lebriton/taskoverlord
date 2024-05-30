/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["InterVariable", "sans-serif"],
        mono: ["RedditMonoVariable", "monospace"],
      },
      screens: {
        "3xl": "1600px",
        "4xl": "1920px",
      },
    },
  },
  plugins: [],
};
