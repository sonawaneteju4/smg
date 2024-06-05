/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      screens: {
        sm: "640px", // Default Tailwind breakpoints
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      maxWidth: {
        "container-sm": "540px",
        "container-md": "720px",
        "container-lg": "960px",
        "container-xl": "1140px",
        "container-2xl": "1320px",
      },
    },
  },
  plugins: [],
};
