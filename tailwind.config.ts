import type { Config } from "tailwindcss";

// "Beige and brown" theme (27 Nov 2026), from the client's own swatch card (#F9F3F0 #E8D5C4 #D4B8A8 #C4A090 #A08070).
// Token names are kept from earlier themes: "beige" is the page, "charcoal" the text, "ink" the brown header and
// footer, "gold" the light-brown accent. Contrast on the page colour: charcoal 14:1, taupe 5.9:1, gold-dark 5.3:1.
// White on ink 7:1.
const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        beige: { DEFAULT: "#F5ECE3", light: "#FBF7F2", dark: "#E8D5C4" },
        sand: "#EDE0D2",
        mist: "#F0E6DB",
        ink: "#6B5344",
        charcoal: { DEFAULT: "#2E211A", light: "#4A372B" },
        frame: "#2E211A",
        door: "#2E211A",
        gold: { DEFAULT: "#D4B8A8", dark: "#7D5740", text: "#7D5740", soft: "#F1E4D8" },
        lit: "#D4B8A8",
        taupe: { DEFAULT: "#6E584A", light: "#A08070" },
        border: "#DCC9B8",
        danger: "#A32B1C",
        whatsapp: "#25D366",
      },
      fontFamily: {
        serif: ["var(--font-display)", "Georgia", "serif"],
        accent: ["var(--font-display)", "Georgia", "serif"],
        dm: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["clamp(2.1rem, 4.2vw, 3.6rem)", { lineHeight: "1.1", letterSpacing: "-0.01em" }],
        "display-lg": ["clamp(1.85rem, 3.2vw, 2.75rem)", { lineHeight: "1.15", letterSpacing: "-0.01em" }],
        "display-md": ["clamp(1.5rem, 2.3vw, 2rem)", { lineHeight: "1.2", letterSpacing: "-0.005em" }],
      },
      spacing: { section: "6rem", "section-sm": "3.75rem" },
      maxWidth: { "8xl": "88rem" },
      boxShadow: { card: "0 1px 2px rgba(29,29,27,0.04), 0 8px 24px -12px rgba(29,29,27,0.12)" },
    },
  },
  plugins: [],
};

export default config;
