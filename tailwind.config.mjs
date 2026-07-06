/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        paper: "#FAF6EE", // cream background
        ink: "#141414", // near-black ink
        accent: "#FF4D00", // loud orange
        sun: "#FFD02F", // highlighter yellow
        muted: "#6B675E", // secondary text
      },
      fontFamily: {
        display: ['"Archivo Black"', "system-ui", "sans-serif"],
        sans: ['"Archivo Variable"', "system-ui", "sans-serif"],
        mono: ['"IBM Plex Mono"', "ui-monospace", "SFMono-Regular", "monospace"],
      },
      boxShadow: {
        brutal: "5px 5px 0 0 #141414",
        "brutal-sm": "3px 3px 0 0 #141414",
        "brutal-lg": "8px 8px 0 0 #141414",
        "brutal-accent": "5px 5px 0 0 #FF4D00",
        "brutal-sun": "5px 5px 0 0 #FFD02F",
      },
      borderWidth: {
        3: "3px",
      },
      maxWidth: {
        content: "1120px",
      },
    },
  },
  plugins: [],
};
