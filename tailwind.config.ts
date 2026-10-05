import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        canvas: "var(--bg)",
        ink: "var(--fg)",
        mute: "var(--muted)",
        accent: "var(--accent)",
        accent2: "var(--accent2)",
        surface: "var(--surface)",
        line: "var(--border)",
      },
    },
  },
  plugins: [],
};
export default config;
