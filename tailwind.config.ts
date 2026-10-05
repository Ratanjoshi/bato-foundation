import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1A2747",
          dark: "#111B33",
          light: "#2A3B63",
          50: "#F0F2F7",
        },
        accent: {
          DEFAULT: "#E3A744",
          dark: "#C88F2E",
          light: "#EDBE6E",
          50: "#FDF5E6",
        },
        surface: "#FBFAF7",
        muted: "#F1EFE9",
        border: "#E4E1D8",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        container: "1240px",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-up": {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-50%)" },
        },
        "marquee-down": {
          "0%": { transform: "translateY(-50%)" },
          "100%": { transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "progress-fill": {
          from: { transform: "scaleX(0)" },
          to: { transform: "scaleX(1)" },
        },
      },
      animation: {
        marquee: "marquee 35s linear infinite",
        float: "float 6s ease-in-out infinite",
        "marquee-up": "marquee-up 40s linear infinite",
        "marquee-down": "marquee-down 46s linear infinite",
        shimmer: "shimmer 2s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
