'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Icon } from '@/components/ui/Icon';
import type { FaqItem } from '@/content/faq';
import { cn } from '@/lib/utils';

export function Faq({ items, className }: { items: readonly FaqItem[]; className?: string }) {
  const [open, setOpen] = useState<number | null>(0);
  const reduce = useReducedMotion();

  return (
    <div className={cn('mx-auto max-w-3xl divide-y divide-surface-border border-y border-surface-border', className)}>
      {items.map((item, index) => {
        const isOpen = open === index;
        return (
          <div key={item.question}>
            <h3>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : index)}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${index}`}
                id={`faq-button-${index}`}
                className="flex w-full items-start justify-between gap-6 py-5 text-left transition-colors hover:text-signal-200"
              >
                <span className="font-display text-[1.0625rem] leading-snug text-ink">{item.question}</span>
                <span
                  className={cn(
                    'mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-surface-border transition-transform duration-300',
                    isOpen && 'rotate-45 border-signal-400/40 text-signal-300',
                  )}
                >
                  <Icon name="Plus" className="h-3.5 w-3.5" />
                </span>
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  key="panel"
                  id={`faq-panel-${index}`}
                  role="region"
                  aria-labelledby={`faq-button-${index}`}
                  initial={reduce ? false : { height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={reduce ? undefined : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-prose pb-6 pr-10 text-[0.9375rem] leading-relaxed text-ink-muted">
                    {item.answer}
                  </p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
