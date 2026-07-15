import type { Config } from "tailwindcss";

/**
 * Prestige Malts design system.
 * Colours are mirrored as CSS custom properties in globals.css so both the
 * Tailwind utilities and the 3D scene / canvas label generator can read them.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Charcoal base ramp
        charcoal: {
          DEFAULT: "#211e1b",
          950: "#141210",
          900: "#1a1815",
          800: "#211e1b",
          700: "#2e2a25",
          600: "#3c3730",
          500: "#4c463d",
        },
        // Warm whisky-gold accents
        amber: {
          DEFAULT: "#c8952f",
          300: "#e6c983",
          400: "#e0b45c",
          500: "#c8952f",
          600: "#a9791f",
          700: "#875f16",
        },
        // Aged-paper cream surfaces
        cream: {
          DEFAULT: "#f4ede0",
          50: "#faf6ee",
          100: "#f4ede0",
          200: "#e9ddc8",
          300: "#dccbac",
        },
        // Muted brass detail
        brass: {
          DEFAULT: "#b89258",
          light: "#cdaa74",
          dark: "#8f6f3f",
        },
        // Petrol navy — cooler section/panel surfaces (not body bg)
        petrol: {
          DEFAULT: "#023047",
          950: "#011828",
          900: "#023047",
          800: "#0a4058",
        },
        // Cerulean — sparse provenance accents only
        cerulean: {
          DEFAULT: "#0077B6",
          400: "#1a8fc4",
          500: "#0077B6",
          600: "#005f92",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      fontSize: {
        // Fluid editorial scale
        "display-xl": ["clamp(3rem, 8vw, 6.5rem)", { lineHeight: "0.98", letterSpacing: "-0.02em" }],
        "display-lg": ["clamp(2.5rem, 5.5vw, 4.5rem)", { lineHeight: "1.02", letterSpacing: "-0.015em" }],
        "display-md": ["clamp(2rem, 4vw, 3rem)", { lineHeight: "1.08", letterSpacing: "-0.01em" }],
        "display-sm": ["clamp(1.5rem, 2.5vw, 2rem)", { lineHeight: "1.15" }],
        eyebrow: ["0.75rem", { lineHeight: "1", letterSpacing: "0.28em" }],
      },
      letterSpacing: {
        widest2: "0.28em",
      },
      spacing: {
        section: "clamp(5rem, 12vh, 9rem)",
      },
      maxWidth: {
        container: "80rem",
        prose2: "42rem",
      },
      transitionTimingFunction: {
        silk: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) both",
        shimmer: "shimmer 2.5s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
