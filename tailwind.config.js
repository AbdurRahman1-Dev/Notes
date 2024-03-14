// tailwind.config.js
const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        dark: {
          extend: "dark", // <- inherit default values from dark theme
          colors: {
            background: "#2c2c2c",
            foreground: "#f3f3f3",
            primary: {
              DEFAULT: "#0582de",
              foreground: "#ffffff",
            },
            focus: "#0582de",
          },
          layout: {
            disabledOpacity: "0.3",
            radius: {
              small: "4px",
              medium: "6px",
              large: "8px",
            },
            borderWidth: {
              small: "1px",
              medium: "2px",
              large: "3px",
            },
          },
        },

        light: {
          extend: "light",
          layout: {}, // dark theme layout tokens
          colors: {
            background: "#ebebeb",
            foreground: "#1d1d1d",
            primary: {
              DEFAULT: "#0582de",
              foreground: "#ffffff",
            },
            focus: "#0582de",
          }, // dark theme colors
        },
        // ... custom themes
      },
    }),
  ],
};
