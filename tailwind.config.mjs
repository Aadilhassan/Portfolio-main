/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        paper: "#FAF6EE",
        "paper-alt": "#F4F0E8",
        ink: "#1A1A1A",
        accent: "#FF4D00",
        sun: "#FFD02F",
        muted: "#6B675E",
        rule: "#D4D0C8",
      },
      fontFamily: {
        display: ['"Archivo Black"', "system-ui", "sans-serif"],
        sans: ['"Archivo Variable"', "system-ui", "sans-serif"],
        mono: ['"IBM Plex Mono"', "ui-monospace", "SFMono-Regular", "monospace"],
      },
      maxWidth: {
        content: "1120px",
        body: "65ch",
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "65ch",
          },
        },
      },
    },
  },
  plugins: [],
};
