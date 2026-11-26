import type { Config } from "tailwindcss";

// Palette from the client's swatch card:
// #F9F3F0  #E8D5C4  #D4B8A8  #C4A090  #A08070
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
        beige: { DEFAULT: "#E8D5C4", light: "#F9F3F0", dark: "#D4B8A8" },
        charcoal: { DEFAULT: "#2A1F18", light: "#3D2F26" },
        frame: "#1C140F",
        door: "#2A1F18",
        gold: { DEFAULT: "#C4A090", dark: "#A08070", text: "#765542" },
        lit: "#D4B8A8",
        taupe: { DEFAULT: "#6E584A", light: "#A08070" },
        border: "#D4B8A8",
      },
      fontFamily: {
        serif: ["var(--font-display)", "Georgia", "Times New Roman", "serif"],
        dm: ["var(--font-body)", "Futura", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["clamp(2.75rem, 5.6vw, 5.25rem)", { lineHeight: "1.06", letterSpacing: "-0.01em" }],
        "display-lg": ["clamp(2.4rem, 4.4vw, 4rem)", { lineHeight: "1.08", letterSpacing: "-0.01em" }],
        "display-md": ["clamp(1.9rem, 3vw, 2.75rem)", { lineHeight: "1.14", letterSpacing: "-0.005em" }],
      },
      spacing: { section: "7rem", "section-sm": "4.5rem" },
      maxWidth: { "8xl": "88rem" },
    },
  },
  plugins: [],
};

export default config;
