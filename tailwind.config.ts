import type { Config } from "tailwindcss";

// "Pine & Amber" (27 Nov 2026). Token names are kept from earlier themes so every page keeps working:
// "beige" is the page surface (ivory), "charcoal" the text colour, "ink" the deepest band, "gold" the warm accent.
// Contrast on ivory #F7F2E7: charcoal 15:1, taupe 5.3:1, gold-text 5.2:1. Ivory on pine 11:1, amber on pine 6:1.
const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        beige: { DEFAULT: "#F7F2E7", light: "#EFE8D8", dark: "#DDD3BE" },
        ink: "#0A2319",
        charcoal: { DEFAULT: "#13241D", light: "#1F4636" },
        pine: { DEFAULT: "#123A2B", soft: "#1B4B39", deep: "#0A2319" },
        sage: { DEFAULT: "#DCE8DC", deep: "#C5D8C7" },
        clay: "#D4623A",
        frame: "#0A2319",
        door: "#13241D",
        gold: { DEFAULT: "#EBA63A", dark: "#8C570E", text: "#8C570E", soft: "#F8DFAE" },
        lit: "#EBA63A",
        taupe: { DEFAULT: "#56655D", light: "#8C9891" },
        border: "#DDD3BE",
        danger: "#A32B1C",
        whatsapp: "#25D366",
      },
      fontFamily: {
        serif: ["var(--font-display)", "system-ui", "sans-serif"],
        accent: ["var(--font-accent)", "Georgia", "serif"],
        dm: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-2xl": ["clamp(2.9rem, 7.2vw, 6.75rem)", { lineHeight: "0.96", letterSpacing: "-0.045em" }],
        "display-xl": ["clamp(2.6rem, 5.6vw, 5rem)", { lineHeight: "1", letterSpacing: "-0.04em" }],
        "display-lg": ["clamp(2.25rem, 4.2vw, 3.75rem)", { lineHeight: "1.02", letterSpacing: "-0.035em" }],
        "display-md": ["clamp(1.9rem, 3.2vw, 2.9rem)", { lineHeight: "1.06", letterSpacing: "-0.03em" }],
      },
      borderRadius: { "4xl": "2rem", "5xl": "2.75rem" },
      spacing: { section: "7rem", "section-sm": "4.5rem" },
      maxWidth: { "8xl": "88rem" },
    },
  },
  plugins: [],
};

export default config;
