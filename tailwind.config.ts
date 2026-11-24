import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "ios-bg": "#F2F2F7",
        "ios-card": "#FFFFFF",
        "ios-secondary-bg": "#E5E5EA",
        "ios-tertiary-bg": "#F9F9FB",
        "ios-label": "#000000",
        "ios-secondary-label": "#8E8E93",
        "ios-tertiary-label": "#C7C7CC",
        "ios-blue": "#007AFF",
        "ios-rose": "#FF2D55",
        "ios-red": "#FF3B30",
        "ios-green": "#34C759",
        "ios-orange": "#FF9500",
        "ios-purple": "#AF52DE",
        "ios-teal": "#30B0C7",
        primary: "#ba0034",
        surface: "#F2F2F7",
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          '"SF Pro Display"',
          '"SF Pro Text"',
          "Inter",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};
export default config;
