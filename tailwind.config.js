// tailwind.config.js (v3)
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}",    // <<-- include lib if you keep components there
  ],
  theme: { extend: {} },
  plugins: [require("@tailwindcss/typography")], // optional
};
