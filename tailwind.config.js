/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {},
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        watchPartyDark: {
          "primary": "#3abff8",
          "secondary": "#828df8",
          "accent": "#f471b5",
          "neutral": "#24272e",
          // base-100 is what the html bg color will be set to
          "base-100": "#090d15",
          "info": "#0ca6e9",
          "success": "#2bd4bd",
          "warning": "#f4c152",
          "error": "#fb6f84",
        },
      },
    ],
  },
};
