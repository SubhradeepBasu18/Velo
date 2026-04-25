/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: "#D4A843",
          light: "#E8C06A",
          dark: "#A07828",
        },
        bg: "#080808",
        surface: "#111111",
        "surface-alt": "#161616",
        border: "#222222",
        "border-gold": "#2A2210",
        text: "#F0EDE8",
        muted: "#666666",
      },
      fontFamily: {
        sans: ["Manrope", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        mono: ["JetBrains Mono", "Courier New", "monospace"],
      },
      keyframes: {
        fadeIn: {
          from: { opacity: 0, transform: "translateY(8px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
        ticker: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        floatY: {
          "0%, 100%": { transform: "translateY(0px) rotate(-1deg)" },
          "50%": { transform: "translateY(-10px) rotate(1deg)" },
        },
        pulseDot: {
          "0%, 100%": { opacity: 0.5, transform: "scale(1)" },
          "50%": { opacity: 1, transform: "scale(1.3)" },
        },
        dashFlow: {
          to: { strokeDashoffset: -20 },
        },
      },
      animation: {
        "fade-in": "fadeIn 0.35s ease forwards",
        ticker: "ticker 22s linear infinite",
        float: "floatY 5s ease-in-out infinite",
        "pulse-dot": "pulseDot 1.6s ease-in-out infinite",
        "dash-flow": "dashFlow 1.4s linear infinite",
      },
    },
  },
  plugins: [],
};