import type { Config } from "tailwindcss";

// "Showroom" theme (27 Nov 2026): charcoal header and footer, near-white pages, a sand tint for alternate bands and
// one bronze accent taken from the gold logo. Token names are kept from earlier themes so older pages keep working:
// "beige" is the page surface, "charcoal" the text colour, "gold" the accent.
// Contrast on the page colour #FAFAF8: charcoal 16:1, taupe 5.6:1, gold-dark 5.7:1. White on ink 14:1.
const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        beige: { DEFAULT: "#FAFAF8", light: "#FFFFFF", dark: "#E7E4DE" },
        sand: "#F3F0EA",
        mist: "#EFEFEC",
        ink: "#262624",
        charcoal: { DEFAULT: "#1D1D1B", light: "#3A3A36" },
        frame: "#1D1D1B",
        door: "#1D1D1B",
        gold: { DEFAULT: "#B8935A", dark: "#7A5C2E", text: "#7A5C2E", soft: "#F1E7D6" },
        lit: "#B8935A",
        taupe: { DEFAULT: "#66645E", light: "#9A978F" },
        border: "#E4E1DA",
        danger: "#A32B1C",
        whatsapp: "#25D366",
      },
      fontFamily: {
        serif: ["var(--font-body)", "system-ui", "sans-serif"],
        accent: ["var(--font-accent)", "Georgia", "serif"],
        dm: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["clamp(2.25rem, 4.6vw, 4rem)", { lineHeight: "1.05", letterSpacing: "-0.04em" }],
        "display-lg": ["clamp(2rem, 3.6vw, 3.1rem)", { lineHeight: "1.1", letterSpacing: "-0.035em" }],
        "display-md": ["clamp(1.6rem, 2.6vw, 2.25rem)", { lineHeight: "1.15", letterSpacing: "-0.03em" }],
      },
      spacing: { section: "6rem", "section-sm": "3.75rem" },
      maxWidth: { "8xl": "88rem" },
      boxShadow: { card: "0 1px 2px rgba(29,29,27,0.04), 0 8px 24px -12px rgba(29,29,27,0.12)" },
    },
  },
  plugins: [],
};

export default config;
