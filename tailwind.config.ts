import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    container: { center: true, padding: { DEFAULT: "1rem", sm: "1.5rem", lg: "2rem" }, screens: { "2xl": "1280px" } },
    extend: {
      colors: {
        lemon: "#FFF21A",
        ink: "#171717",
        lavender: "#A65BFF",
        alabaster: "#F8F8F4",
        slate: "#6B6B76",
        mint: "#00E5A8",
      },
      fontFamily: {
        display: ['"Space Grotesk Variable"', "system-ui", "sans-serif"],
        sans: ['"Inter Variable"', "system-ui", "sans-serif"],
      },
      boxShadow: {
        brut: "4px 4px 0 0 #171717",
        "brut-lg": "8px 8px 0 0 #171717",
        "brut-sm": "2px 2px 0 0 #171717",
      },
      borderRadius: { brut: "14px" },
    },
  },
  plugins: [],
};
export default config;
