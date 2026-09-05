/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        sm: "1.5rem",
        lg: "2rem",
        xl: "2.5rem",
        "2xl": "3rem",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
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
        ink: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          muted: "var(--text-muted)",
          faint: "var(--text-faint)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          soft: "var(--accent-soft)",
          muted: "var(--accent-muted)",
          foreground: "var(--accent-foreground)",
          hover: "var(--accent-hover)",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      fontSize: {
        "display-2xl": ["clamp(4rem, 8vw, 7.5rem)", { lineHeight: "0.95", letterSpacing: "-0.04em" }],
        "display-xl": ["clamp(3.25rem, 6vw, 5.75rem)", { lineHeight: "1.0", letterSpacing: "-0.035em" }],
        "display-lg": ["clamp(2.5rem, 4.5vw, 4.25rem)", { lineHeight: "1.05", letterSpacing: "-0.03em" }],
        "display-md": ["clamp(2rem, 3.5vw, 3rem)", { lineHeight: "1.12", letterSpacing: "-0.025em" }],
        "heading-xl": ["clamp(1.75rem, 2.5vw, 2.25rem)", { lineHeight: "1.2", letterSpacing: "-0.02em" }],
        "heading-lg": ["clamp(1.375rem, 2vw, 1.75rem)", { lineHeight: "1.25", letterSpacing: "-0.015em" }],
        "heading-md": ["clamp(1.125rem, 1.5vw, 1.375rem)", { lineHeight: "1.3", letterSpacing: "-0.01em" }],
        "body-lg": ["1.125rem", { lineHeight: "1.6", letterSpacing: "-0.01em" }],
        "body-md": ["1rem", { lineHeight: "1.55", letterSpacing: "-0.005em" }],
        "body-sm": ["0.875rem", { lineHeight: "1.5", letterSpacing: "0" }],
        label: ["0.75rem", { lineHeight: "1.4", letterSpacing: "0.06em" }],
        caption: ["0.6875rem", { lineHeight: "1.3", letterSpacing: "0.04em" }],
      },
      borderRadius: {
        xs: "var(--r-xs, 4px)",
        sm: "var(--r-sm, 8px)",
        md: "var(--r-md, 12px)",
        lg: "var(--r-lg, 16px)",
        xl: "var(--r-xl, 24px)",
        "2xl": "var(--r-2xl, 32px)",
        full: "9999px",
      },
      boxShadow: {
        subtle: "0 1px 2px 0 rgba(0, 0, 0, 0.4), 0 0 0 1px var(--border-subtle)",
        card: "0 12px 32px -8px rgba(0, 0, 0, 0.6), 0 0 0 1px var(--border)",
        elevated: "0 24px 48px -12px rgba(0, 0, 0, 0.8), 0 0 0 1px var(--border)",
        accent: "0 0 30px -5px var(--accent-soft)",
      },
      transitionTimingFunction: {
        expo: "cubic-bezier(0.16, 1, 0.3, 1)",
        smooth: "cubic-bezier(0.25, 1, 0.5, 1)",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-subtle": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "pulse-subtle": "pulse-subtle 3s ease-in-out infinite",
        marquee: "marquee 45s linear infinite",
      },
    },
  },
  plugins: [],
};
