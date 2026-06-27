import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        accent: "var(--accent)",
        "accent-soft": "var(--accent-soft)",
        surface: "var(--surface)",
        "surface-2": "var(--surface-2)",
        muted: "var(--muted)",
        "muted-soft": "var(--muted-soft)",
        "neo-yellow": "var(--neo-yellow)",
        "neo-cyan": "var(--neo-cyan)",
        "neo-green": "var(--neo-green)",
        "neo-pink": "var(--neo-pink)",
        border: "var(--border)",
        "border-hover": "var(--border-hover)",
        "navbar-bg": "var(--navbar-bg)",
        "nav-pill-bg": "var(--nav-pill-bg)",
        "navbar-btn-bg": "var(--navbar-btn-bg)",
        "navbar-btn-border": "var(--navbar-btn-border)",
        "navbar-btn-hover-bg": "var(--navbar-btn-hover-bg)",
        "navbar-btn-hover-border": "var(--navbar-btn-hover-border)",
        "grid-color": "var(--grid-color)",
        "spotlight-color": "var(--spotlight-color)",
      },
      fontFamily: {
        pixel: ["var(--font-jersey-25)", "sans-serif"],
        display: ["var(--font-space-grotesk)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
    },
  },
  plugins: [],
};

export default config;
