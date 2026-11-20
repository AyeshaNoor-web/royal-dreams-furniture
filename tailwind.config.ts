import type { Config } from "tailwindcss";

// Palette: warm off-white surfaces (client request, 20 Nov 2026) with the original charcoal and gold accents.
// Surfaces #FBF9F5 #F4EFE8 #E7DFD4, accents #C4A090 #A08070, text #2A1F18 #6E584A #765542.
// Text tones are darkened versions of the two deepest swatches so body copy meets WCAG AA on beige.
const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        beige: { DEFAULT: "#F4EFE8", light: "#FBF9F5", dark: "#E7DFD4" },
        charcoal: { DEFAULT: "#2A1F18", light: "#3D2F26" },
        frame: "#1C140F",
        door: "#2A1F18",
        gold: { DEFAULT: "#C4A090", dark: "#A08070", text: "#765542" },
        lit: "#E7DFD4",
        taupe: { DEFAULT: "#6E584A", light: "#826655" },
        border: "#DDD3C7",
      },
      fontFamily: {
        serif: ["var(--font-display)", "Georgia", "Times New Roman", "serif"],
        dm: ["var(--font-body)", "Futura", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["clamp(2.9rem, 6vw, 5.75rem)", { lineHeight: "1.0", letterSpacing: "-0.025em" }],
        "display-lg": ["clamp(2.5rem, 4.6vw, 4.25rem)", { lineHeight: "1.04", letterSpacing: "-0.02em" }],
        "display-md": ["clamp(1.95rem, 3.1vw, 2.85rem)", { lineHeight: "1.1", letterSpacing: "-0.015em" }],
      },
      spacing: { section: "7rem", "section-sm": "4.5rem" },
      maxWidth: { "8xl": "88rem" },
    },
  },
  plugins: [],
};

export default config;
