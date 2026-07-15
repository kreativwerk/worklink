"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { FAQ } from "@/lib/content";

export function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y divide-border overflow-hidden rounded-[var(--radius-card)] border border-border bg-bg-elevated">
      {FAQ.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              aria-expanded={isOpen}
            >
              <span className="text-[15px] font-medium sm:text-base">{item.q}</span>
              <span
                className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-border transition-transform duration-300"
                style={{ transform: isOpen ? "rotate(45deg)" : "none" }}
              >
                <Plus className="h-4 w-4" />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-5 text-fg-muted">{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
