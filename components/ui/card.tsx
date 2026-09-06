"use client";

import React from "react";

/**
 * Card — Conforms strictly to Agney Design System:
 * - Border-radius: 20px
 * - Padding: 32px (features) / 24px (products)
 * - Background: #141414 / #111
 * - Subtle depth box shadow: 0 4px 24px rgba(0,0,0,0.25)
 * - Smooth transition: all 0.3s ease
 * - Hover state: translateY(-6px) + stronger shadow
 * - Top border glow in flame color (#FF4500) on hover
 */
export function Card({
  children,
  className = "",
  variant = "feature", // "feature" | "product" | "testimonial" | "surface"
  topGlow = true,
  onClick,
  style = {},
  as: Component = "div",
  ...props
}) {
  const isProduct = variant === "product";

  return (
    <Component
      onClick={onClick}
      style={style}
      className={`relative group rounded-[20px] transition-all duration-300 ease-out overflow-hidden ${
        isProduct
          ? "bg-[#161616] border border-white/10 hover:scale-[1.02] hover:shadow-[0_20px_40px_-15px_rgba(255,69,0,0.25)] hover:border-white/20 min-w-[280px] min-h-[380px] flex flex-col"
          : "bg-[#141414] border border-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.25)] hover:-translate-y-1.5 hover:shadow-[0_16px_36px_-10px_rgba(0,0,0,0.6),0_0_24px_rgba(255,69,0,0.18)] hover:border-white/20"
      } ${className}`}
      {...props}
    >
      {/* Top border glow in brand flame color (#FF4500) on hover */}
      {topGlow && (
        <div
          className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF4500] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 pointer-events-none"
          aria-hidden="true"
        />
      )}

      {children}
    </Component>
  );
}

/**
 * 48x48px Icon wrapped in brand flame colored rounded square (#FF4500)
 */
export function CardIcon({ children, icon: IconComponent, className = "" }) {
  return (
    <div
      className={`w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FF4500] to-[#E8380D] flex items-center justify-center text-white shadow-[0_4px_14px_rgba(255,69,0,0.35)] shrink-0 ${className}`}
    >
      {IconComponent ? <IconComponent size={24} className="stroke-[2.2]" /> : children}
    </div>
  );
}

export function CardHeader({ children, className = "" }) {
  return <div className={`flex flex-col gap-1.5 ${className}`}>{children}</div>;
}

export function CardTitle({ children, className = "", as: Component = "h3" }) {
  return (
    <Component
      className={`font-agneyDisplay font-semibold text-[20px] text-white tracking-tight leading-snug group-hover:text-[#FFB400] transition-colors duration-200 ${className}`}
    >
      {children}
    </Component>
  );
}

export function CardDescription({ children, className = "" }) {
  return (
    <p
      className={`font-agneyBody text-[15px] font-normal text-[#A3A3A3] leading-relaxed ${className}`}
    >
      {children}
    </p>
  );
}

export function CardContent({ children, className = "" }) {
  return <div className={`flex-1 ${className}`}>{children}</div>;
}

export function CardFooter({ children, className = "" }) {
  return (
    <div
      className={`pt-4 border-t border-white/10 flex items-center justify-between mt-auto ${className}`}
    >
      {children}
    </div>
  );
}

export function CardBadge({ children, className = "", variant = "flame" }) {
  const styles = {
    flame: "bg-[#FF4500]/15 text-[#FF4500] border-[#FF4500]/30",
    gold: "bg-[#FFB400]/15 text-[#FFB400] border-[#FFB400]/30",
    dark: "bg-white/10 text-white/80 border-white/15",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold uppercase tracking-wider border backdrop-blur-md ${
        styles[variant] || styles.flame
      } ${className}`}
    >
      {children}
    </span>
  );
}

export default Card;
