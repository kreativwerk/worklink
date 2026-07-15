"use client";

import { motion } from "motion/react";

/**
 * Fade-and-rise on scroll into view.
 * Reduced-motion is handled globally via <MotionConfig reducedMotion="user">
 * (see MotionProvider) — transform is skipped, opacity still fades in, and the
 * DOM structure is identical on server and client (no hydration mismatch).
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
