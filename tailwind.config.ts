import type { Config } from "tailwindcss";

// Contrast on plaster #FAF5EF: ink 14:1, taupe 5.4:1, bronze 5.9:1. Brass #B98A52 is 3:1 on plaster, so it is used for
// large text and rules only; small labels use bronze. Cream on umber 16:1, brass on umber 5.5:1.
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
        // "The Atelier": warm plaster canvas, oat surfaces, espresso ink, brass accents, deep umber for the dark moments.
        beige: { DEFAULT: "#FAF5EF", light: "#F0E6DB", dark: "#E3D7C9" },
        ink: "#1C140E",
        charcoal: { DEFAULT: "#241A12", light: "#3A2C22" },
        frame: "#1C140E",
        door: "#241A12",
        gold: { DEFAULT: "#B98A52", dark: "#8A5A2B", text: "#8A5A2B" },
        lit: "#B98A52",
        taupe: { DEFAULT: "#7A6655", light: "#9A8673" },
        border: "#E3D7C9",
        danger: "#9B2C20",
        whatsapp: "#25D366",
      },
      fontFamily: {
        serif: ["var(--font-display)", "Georgia", "Times New Roman", "serif"],
        dm: ["var(--font-body)", "Futura", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["clamp(2.75rem, 5.6vw, 5.25rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display-lg": ["clamp(2.4rem, 4.2vw, 3.75rem)", { lineHeight: "1.06", letterSpacing: "-0.02em" }],
        "display-md": ["clamp(2rem, 3.2vw, 3rem)", { lineHeight: "1.1", letterSpacing: "-0.015em" }],
      },
      spacing: { section: "7rem", "section-sm": "4.5rem" },
      maxWidth: { "8xl": "88rem" },
    },
  },
  plugins: [],
};

export default config;
