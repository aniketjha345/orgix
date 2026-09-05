"use client";

import Link from "next/link";
import Icon from "../core/Icon";
import { MagneticButton } from "../motion/MotionPrimitives";

export default function Button({
  children,
  variant = "primary", // "primary" | "secondary" | "ghost" | "accent"
  size = "md", // "sm" | "md" | "lg"
  href,
  onClick,
  icon = true,
  iconName = "arrow",
  magnetic = false,
  className = "",
  type = "button",
  disabled = false,
  ariaLabel,
  ...props
}) {
  const baseStyles =
    "relative inline-flex items-center justify-center font-body font-medium transition-all duration-200 outline-none select-none disabled:opacity-50 disabled:cursor-not-allowed";

  const sizeStyles = {
    sm: "text-[12.5px] px-3.5 py-1.5 gap-1.5 rounded-full tracking-normal",
    md: "text-[13.5px] px-5 py-2.5 gap-2 rounded-full tracking-normal",
    lg: "text-[15px] px-6 py-3.5 gap-2.5 rounded-full font-semibold tracking-tight",
  };

  const variantStyles = {
    primary:
      "bg-accent text-accent-foreground hover:bg-accent-hover shadow-[0_2px_12px_-2px_rgba(196,240,66,0.35)] active:scale-[0.98]",
    secondary:
      "bg-surface-muted/60 text-ink-primary border border-border hover:bg-surface-elevated hover:border-white/20 active:scale-[0.98] backdrop-blur-md",
    ghost:
      "bg-transparent text-ink-secondary hover:text-ink-primary hover:bg-white/[0.04] active:scale-[0.98]",
    accent:
      "bg-white text-black hover:bg-white/90 shadow-[0_2px_16px_rgba(255,255,255,0.2)] active:scale-[0.98]",
  };

  const combinedClasses = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

  const content = (
    <>
      <span>{children}</span>
      {icon && (
        <Icon
          name={iconName}
          size={size === "sm" ? 13 : size === "lg" ? 17 : 15}
          className="transition-transform duration-200 group-hover:translate-x-0.5"
        />
      )}
    </>
  );

  const innerElement = href ? (
    <Link href={href} className={`group ${combinedClasses}`} aria-label={ariaLabel} {...props}>
      {content}
    </Link>
  ) : (
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

  if (magnetic) {
    return <MagneticButton>{innerElement}</MagneticButton>;
  }

  return innerElement;
}
