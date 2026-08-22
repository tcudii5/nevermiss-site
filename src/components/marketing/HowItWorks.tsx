'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Section, SectionHeader } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { howItWorksSteps } from '@/content/features';
import { cn } from '@/lib/utils';

/**
 * Interactive 5-step explainer. Steps are buttons in a tablist-style rail;
 * the detail panel swaps with a crossfade. Fully keyboard operable.
 */
export function HowItWorks() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const step = howItWorksSteps[active];

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault();
      setActive((i) => (i + 1) % howItWorksSteps.length);
    }
    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault();
      setActive((i) => (i - 1 + howItWorksSteps.length) % howItWorksSteps.length);
    }
  };

  return (
    <Section id="how-it-works" className="border-t border-surface-border/60">
      <SectionHeader
        eyebrow="How it works"
        title="From missed call to booked job in five steps"
        description="No new phone number, no app for your customers to download, no change to how your team works."
      />

      <div className="mt-14 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-14">
        <div role="tablist" aria-label="How it works steps" onKeyDown={onKeyDown} className="flex flex-col gap-2">
          {howItWorksSteps.map((item, index) => {
            const isActive = index === active;
            return (
              <button
                key={item.step}
                role="tab"
                id={`step-tab-${item.step}`}
                aria-selected={isActive}
                aria-controls={`step-panel-${item.step}`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActive(index)}
                className={cn(
                  'group relative flex items-start gap-4 rounded-2xl border p-5 text-left transition-all duration-300',
                  isActive
                    ? 'border-signal-400/35 bg-signal-400/[0.06]'
                    : 'border-surface-border bg-surface/40 hover:border-white/15 hover:bg-surface-hover/50',
                )}
              >
                <span
                  className={cn(
                    'flex h-9 w-9 shrink-0 items-center justify-center rounded-full border font-display text-sm transition-colors duration-300',
                    isActive
                      ? 'border-signal-400/50 bg-signal-400 text-canvas-sunken'
                      : 'border-surface-border text-ink-faint group-hover:text-ink-muted',
                  )}
                >
                  {item.step}
                </span>
                <span className="min-w-0">
                  <span
                    className={cn(
                      'block font-display text-base transition-colors',
                      isActive ? 'text-ink' : 'text-ink-muted group-hover:text-ink',
                    )}
                  >
                    {item.title}
                  </span>
                  <span className="mt-1 block text-sm leading-relaxed text-ink-muted">{item.description}</span>
                </span>
              </button>
            );
          })}
        </div>

        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="glass relative overflow-hidden rounded-3xl p-7 shadow-panel sm:p-9">
            <AnimatePresence mode="wait">
              <motion.div
                key={step.step}
                id={`step-panel-${step.step}`}
                role="tabpanel"
                aria-labelledby={`step-tab-${step.step}`}
                initial={reduce ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-signal-400/25 bg-gradient-to-br from-signal-400/20 to-ion-500/10 text-signal-300">
                  <Icon name={step.icon} className="h-6 w-6" />
                </div>
                <div className="mt-6 text-xs font-medium uppercase tracking-[0.16em] text-signal-300">
                  Step {step.step} of {howItWorksSteps.length}
                </div>
                <h3 className="mt-3 font-display text-display-sm text-ink">{step.title}</h3>
                <p className="mt-3 text-lead text-ink-muted">{step.description}</p>
                <div className="mt-7 rounded-2xl border border-surface-border bg-canvas-sunken/70 p-5">
                  <p className="text-sm leading-relaxed text-ink-muted">{step.detail}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-6 flex justify-center lg:justify-start">
            <Button href="/ai-receptionist" variant="outline">
              See the AI Receptionist in Action
              <Icon name="ArrowRight" className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
