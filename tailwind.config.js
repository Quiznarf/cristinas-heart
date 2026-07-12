/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        night: {
          DEFAULT: "#0a0e24",
          2: "#10163a",
          3: "#1a2150",
        },
        ivory: {
          DEFAULT: "#fdf9f0",
          2: "#f7efdf",
        },
        ink: {
          DEFAULT: "#232041",
          soft: "#4c476e",
        },
        gold: {
          DEFAULT: "#e8b64c",
          light: "#f6d98a",
          deep: "#c48f24",
        },
        rose: {
          DEFAULT: "#e06a8a",
          light: "#f4a7bc",
        },
        violet: {
          DEFAULT: "#8f7ae8",
          light: "#bcaef7",
        },
        sky: {
          DEFAULT: "#6fc3e8",
        },
      },
      fontFamily: {
        serif: ["'Cormorant Garamond'", "Georgia", "serif"],
        sans: ["'Plus Jakarta Sans'", "-apple-system", "'Segoe UI'", "sans-serif"],
      },
      borderRadius: {
        lux: "26px",
      },
      boxShadow: {
        soft: "0 20px 60px -18px rgba(35,32,65,.25)",
        glow: "0 0 44px rgba(232,182,76,.35)",
        cta: "0 10px 34px -8px rgba(224,106,138,.55)",
      },
      transitionTimingFunction: {
        lux: "cubic-bezier(.22,1,.36,1)",
      },
      animation: {
        flicker: "flicker 3s ease-in-out infinite",
        "float-slow": "floaty 7s ease-in-out infinite",
        "fade-up": "fadeUp 0.7s ease-out both",
        aurora: "auroraDrift 22s ease-in-out infinite alternate",
      },
      keyframes: {
        flicker: {
          "0%, 100%": { transform: "scale(1) rotate(-1deg)", opacity: "0.95" },
          "25%": { transform: "scale(1.06) rotate(1.5deg)", opacity: "1" },
          "50%": { transform: "scale(0.97) rotate(-0.5deg)", opacity: "0.9" },
          "75%": { transform: "scale(1.04) rotate(0.8deg)", opacity: "1" },
        },
        floaty: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        auroraDrift: {
          "0%": { transform: "translate3d(-2%, -1%, 0) scale(1)" },
          "100%": { transform: "translate3d(2%, 2%, 0) scale(1.06)" },
        },
      },
    },
  },
  plugins: [],
};
