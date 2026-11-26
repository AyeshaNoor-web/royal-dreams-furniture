import type { Config } from "tailwindcss";

// Palette: near-black surfaces #0C0B0A #161412 #221E1A, cream text #F3EBDD #B9AD9B, gold #B8965A #D4AF7A #D9B86A.
// Contrast: cream on black 17:1, muted text 9.5:1, gold text 10:1, black on gold buttons 7.9:1.
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
        // Black and gold (client request, 26 Nov 2026). "beige" is the page surface and "charcoal" the text colour,
        // so the names read inverted on purpose: every component keeps working.
        beige: { DEFAULT: "#0C0B0A", light: "#161412", dark: "#221E1A" },
        ink: "#070606",
        charcoal: { DEFAULT: "#F3EBDD", light: "#E4D9C6" },
        frame: "#050505",
        door: "#0C0B0A",
        gold: { DEFAULT: "#B8965A", dark: "#D4AF7A", text: "#D9B86A" },
        lit: "#D4AF7A",
        taupe: { DEFAULT: "#B9AD9B", light: "#8F8473" },
        border: "#2E2823",
        danger: "#F2A59E",
      },
      fontFamily: {
        serif: ["var(--font-display)", "Georgia", "Times New Roman", "serif"],
        dm: ["var(--font-body)", "Futura", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["clamp(2.75rem, 5.2vw, 5.25rem)", { lineHeight: "1.02", letterSpacing: "-0.02em" }],
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
