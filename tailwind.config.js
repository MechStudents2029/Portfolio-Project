/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        sky: {
          start: "#2b6fff",
          mid: "#46c2ff",
          end: "#8ee8ff",
        },
        ink: "#05070d",
      },
      fontFamily: {
        sf: [
          "-apple-system",
          "BlinkMacSystemFont",
          '"SF Pro Display"',
          '"Helvetica Neue"',
          "sans-serif",
        ],
      },
      backgroundImage: {
        "sky-gradient": "linear-gradient(135deg, #2b6fff 0%, #46c2ff 55%, #8ee8ff 100%)",
      },
    },
  },
  plugins: [],
};
