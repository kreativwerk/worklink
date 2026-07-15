"use client";

import { MotionConfig } from "motion/react";

/**
 * Global motion settings. `reducedMotion="user"` disables transform/layout
 * animations for visitors who prefer reduced motion, while opacity still fades
 * — content always becomes visible.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
