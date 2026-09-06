/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        "bg-alt": "var(--bg-alt)",
        ink: {
          DEFAULT: "var(--ink)",
          soft: "var(--ink-soft)",
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          muted: "var(--text-muted)",
          faint: "var(--text-faint)",
        },
        surface: {
          DEFAULT: "var(--surface)",
          muted: "var(--surface-muted)",
          elevated: "var(--surface-elevated)",
          hover: "var(--surface-hover)",
        },
        border: {
          DEFAULT: "var(--border)",
          subtle: "var(--border-subtle)",
          active: "var(--border-active)",
        },
        accent: "var(--accent)",
        line: "var(--line)",
      },
      fontFamily: {
        display: ["var(--font-display)", "Instrument Sans", "sans-serif"],
        body: ["var(--font-body)", "Inter", "sans-serif"],
        quote: ["var(--font-quote)", "Playfair Display", "Georgia", "serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      fontSize: {
        "body-sm": ["14px", { lineHeight: "1.6" }],
        "body-md": ["16px", { lineHeight: "1.6" }],
        "body-lg": ["18px", { lineHeight: "1.6" }],
        "heading-md": ["22px", { lineHeight: "1.25" }],
        "heading-lg": ["26px", { lineHeight: "1.2" }],
        "heading-xl": ["32px", { lineHeight: "1.15" }],
        "display-md": ["48px", { lineHeight: "1.05" }],
        "display-lg": ["64px", { lineHeight: "1.0" }],
      },
      borderRadius: {
        card: "24px",
        pill: "999px",
      },
      boxShadow: {
        device: "0 30px 80px rgba(15, 26, 46, 0.10)",
        subtle: "0 4px 20px rgba(15, 26, 46, 0.05)",
        card: "0 30px 80px rgba(15, 26, 46, 0.10)",
        elevated: "0 30px 80px rgba(15, 26, 46, 0.14)",
      },
    },
  },
  plugins: [],
};
