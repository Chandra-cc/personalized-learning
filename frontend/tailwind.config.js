module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#1e3a8a", // Custom blue
        accent: "#10b981",  // Custom green
      },
      animation: {
        fade: "fadeIn 0.6s ease-in-out",
        slide: "slideIn 0.5s ease-in-out",
      },
    },
  },
  plugins: [],
};
