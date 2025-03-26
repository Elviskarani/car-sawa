/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class', // Enable dark mode with explicit class toggle
  theme: {
    extend: {
      colors: {
        background: "#ffffff",
        foreground: "#0f172a",
        primary: "#0284c7",
        secondary: "#64748b",
        accent: "#f59e0b",
        muted: "#f1f5f9",
        destructive: "#ef4444",
        border: "#e2e8f0",
        input: "#e2e8f0",
        ring: "#0284c7",
      },
      borderRadius: {
        sm: '0.125rem',
        md: '0.25rem',
        lg: '0.5rem',
        xl: '1rem',
      },
    },
  },
  plugins: [],
}