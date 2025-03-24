/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2563EB", // Blue
        secondary: "#10B981", // Green
        accent: "#F59E0B", // Amber
        background: "#F9FAFB", // Light gray
        text: "#1F2937", // Dark gray
      },
    },
  },
  plugins: [],
}
