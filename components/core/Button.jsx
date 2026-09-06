"use client";

import Link from "next/link";

/**
 * Button — Implements the Orgix Media design system button specifications:
 * - Pill radius: 999px
 * - Padding: 14px 28px
 * - Primary: --ink (#0F1A2E) background / white text
 * - Ghost: transparent background + 1px --line border
 * - Accent: #2E5BFF on link / hover states only
 */
export default function Button({
  children,
  variant = "primary", // "primary" | "ghost"
  href,
  onClick,
  icon,
  className = "",
  type = "button",
  disabled = false,
  ariaLabel,
  target,
  rel,
  ...props
}) {
  // Normalize legacy variants if encountered
  const normalizedVariant =
    variant === "secondary" ? "ghost" : variant === "accent" ? "primary" : variant;

  const baseStyles =
    "inline-flex items-center justify-center gap-2.5 font-body text-[15px] font-medium leading-none select-none text-center transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none";

  // Exact 14px 28px padding & 999px pill radius
  const shapeStyles = "rounded-[999px] px-[28px] py-[14px]";

  const variantStyles = {
    primary:
      "bg-ink text-white border border-ink hover:bg-[#1A2440] hover:border-[#1A2440] hover:-translate-y-0.5 active:translate-y-0 shadow-sm",
    ghost:
      "bg-transparent text-ink border border-line hover:border-ink hover:text-accent hover:-translate-y-0.5 active:translate-y-0",
  };

  const currentVariantStyle = variantStyles[normalizedVariant] || variantStyles.primary;
  const combinedClasses = `${baseStyles} ${shapeStyles} ${currentVariantStyle} ${className}`.trim();

  const content = (
    <>
      <span>{children}</span>
      {icon && <span className="inline-flex items-center transition-transform duration-200 group-hover:translate-x-0.5">{icon}</span>}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        onClick={onClick}
        className={`group ${combinedClasses}`}
        aria-label={ariaLabel}
        target={target}
        rel={rel}
        {...props}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`group ${combinedClasses}`}
      aria-label={ariaLabel}
      {...props}
    >
      {content}
    </button>
  );
}
