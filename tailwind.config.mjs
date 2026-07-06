/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        ink: "#0F0F0E", // warm near-black background
        surface: "#161613", // raised panels / cards
        surface2: "#1E1E1A", // hover / nested
        line: "rgba(234,231,224,0.10)", // hairline borders
        txt: "#EAE7E0", // warm off-white
        muted: "#8B887F", // secondary text
        faint: "#5E5C55", // tertiary / captions
        accent: "#D8A657", // muted amber
        "accent-soft": "rgba(216,166,87,0.14)",
      },
      fontFamily: {
        sans: ['"Hanken Grotesk Variable"', "system-ui", "sans-serif"],
        mono: ['"IBM Plex Mono"', "ui-monospace", "SFMono-Regular", "monospace"],
      },
      maxWidth: {
        content: "1080px",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) forwards",
      },
    },
  },
  plugins: [],
};
