import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx,mdx}", "./components/**/*.{ts,tsx}", "./content/**/*.mdx"],
  theme: {
    extend: {
      colors: {
        canvas: "var(--canvas)",
        "canvas-subtle": "var(--canvas-subtle)",
        ink: "var(--ink)",
        body: "var(--body)",
        muted: "var(--muted)",
        border: "var(--border)",
        "border-strong": "var(--border-strong)",
        accent: "var(--accent)",
        "accent-active": "var(--accent-active)",
        "on-accent": "var(--on-accent)",
        danger: "var(--danger)",
        "danger-subtle": "var(--danger-subtle)",
        warning: "var(--warning)",
        success: "var(--success)",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)"],
        mono: ["var(--font-geist-mono)"],
      },
      fontSize: {
        "display-xl": ["clamp(2.75rem, 6vw, 4rem)", { lineHeight: "1.05", letterSpacing: "-0.02em", fontWeight: "600" }],
        "display-lg": ["clamp(2.25rem, 4.5vw, 2.75rem)", { lineHeight: "1.1", letterSpacing: "-0.01em", fontWeight: "600" }],
        "display-md": ["1.875rem", { lineHeight: "1.2", letterSpacing: "-0.01em", fontWeight: "600" }],
        "title-lg": ["1.375rem", { lineHeight: "1.3", fontWeight: "500" }],
        "title-md": ["1.125rem", { lineHeight: "1.4", fontWeight: "500" }],
        "body-lg": ["1.125rem", { lineHeight: "1.6", fontWeight: "400" }],
        "body-md": ["1rem", { lineHeight: "1.65", fontWeight: "400" }],
        "body-sm": ["0.875rem", { lineHeight: "1.5", fontWeight: "400" }],
        label: ["0.8125rem", { lineHeight: "1.3", letterSpacing: "0.04em", fontWeight: "500" }],
        "mono-detail": ["0.8125rem", { lineHeight: "1.5", fontWeight: "400" }],
      },
      borderRadius: {
        sm: "6px",
        md: "12px",
        lg: "20px",
      },
      spacing: {
        "section-mobile": "56px",
        "section-desktop": "96px",
      },
      maxWidth: {
        content: "1200px",
        reading: "680px",
      },
      transitionDuration: {
        fast: "120ms",
        base: "200ms",
        slow: "400ms",
      },
      transitionTimingFunction: {
        standard: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
