"use client";

import Link from "next/link";
import Icon from "../core/Icon";

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
  size, // optional override
  href,
  onClick,
  icon = false,
  iconName = "arrow",
  className = "",
  type = "button",
  disabled = false,
  ariaLabel,
  target,
  rel,
  magnetic,
  ...props
}) {
  const normalizedVariant =
    variant === "secondary" ? "ghost" : variant === "accent" ? "primary" : variant;

  const baseStyles =
    `inline-flex items-center justify-center gap-2.5 font-body text-[15px] font-medium leading-none select-none text-center transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none ${
      magnetic ? "interactive-magnetic" : ""
    }`.trim();

  // Exact 14px 28px padding & 999px pill radius (allows smaller size if explicitly specified)
  const shapeStyles =
    size === "sm"
      ? "rounded-[999px] px-[20px] py-[10px] text-[13.5px]"
      : size === "lg"
      ? "rounded-[999px] px-[32px] py-[16px] text-[16px]"
      : "rounded-[999px] px-[28px] py-[14px]";

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
      {icon && (
        <Icon
          name={iconName}
          size={14}
          className="transition-transform duration-200 group-hover:translate-x-0.5"
        />
      )}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
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
