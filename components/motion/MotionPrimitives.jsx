"use client";

import { motion, useReducedMotion } from "framer-motion";

export const transitions = {
  fast: { duration: 0.18, ease: [0.16, 1, 0.3, 1] },
  normal: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
  emphasis: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  cinematic: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
};

/**
 * FadeUp — progressive enhancement reveal that is always visible by default
 */
export function FadeUp({
  children,
  delay = 0,
  duration = 0.6,
  y = 20,
  className = "",
  once = true,
}) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.05 }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * FadeIn — clean opacity reveal
 */
export function FadeIn({
  children,
  delay = 0,
  duration = 0.5,
  className = "",
  once = true,
}) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once, amount: 0.05 }}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * ScaleIn — subtle expansion reveal
 */
export function ScaleIn({
  children,
  delay = 0,
  duration = 0.5,
  scale = 0.96,
  className = "",
  once = true,
}) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once, amount: 0.05 }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * StaggerContainer & StaggerItem
 */
export function StaggerContainer({
  children,
  stagger = 0.08,
  delay = 0,
  className = "",
  once = true,
}) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.05 }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: stagger,
            delayChildren: delay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  y = 16,
  duration = 0.5,
  className = "",
}) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration, ease: [0.16, 1, 0.3, 1] },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
