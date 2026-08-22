'use client';

import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Icon } from '@/components/ui/Icon';
import { heroFlow } from '@/content/chat-demo';
import { cn } from '@/lib/utils';

const toneStyles: Record<string, { dot: string; ring: string; text: string }> = {
  neutral: { dot: 'bg-ink-muted', ring: 'border-white/12 bg-white/[0.04]', text: 'text-ink' },
  warn: { dot: 'bg-amber-400', ring: 'border-amber-400/30 bg-amber-400/[0.07]', text: 'text-amber-200' },
  signal: { dot: 'bg-signal-400', ring: 'border-signal-400/30 bg-signal-400/[0.07]', text: 'text-signal-200' },
  ion: { dot: 'bg-ion-400', ring: 'border-ion-400/30 bg-ion-400/[0.07]', text: 'text-ion-300' },
};

const STEP_MS = 1150;

/**
 * Hero product animation: the missed-call → booked-appointment sequence,
 * playing as a live activity feed rather than a static diagram.
 * Loops continuously; renders fully-completed and still when reduced motion
 * is preferred.
 */
export function FlowDemo() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(reduce ? heroFlow.length : 0);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => {
      setActive((prev) => (prev >= heroFlow.length ? 0 : prev + 1));
    }, STEP_MS);
    return () => window.clearInterval(id);
  }, [reduce]);

  const complete = active >= heroFlow.length;

  return (
    <div className="relative">
      {/* ambient glow behind the panel */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-signal-400/12 via-transparent to-ion-500/12 blur-2xl"
      />

      <div className="glass relative overflow-hidden rounded-3xl shadow-panel">
        {/* window chrome */}
        <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-3.5">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2 w-2">
              <span
                className={cn(
                  'absolute inline-flex h-full w-full rounded-full bg-signal-400/70',
                  !reduce && 'animate-pulse-ring',
                )}
              />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-signal-400" />
            </span>
            <span className="text-xs font-medium tracking-wide text-ink-muted">Live activity</span>
          </div>
          <span className="font-mono text-[0.6875rem] text-ink-faint">ABC Plumbing · (240) 555-0182</span>
        </div>

        <ol className="relative space-y-1 p-4 sm:p-5">
          {/* connective spine */}
          <div aria-hidden className="absolute bottom-8 left-[2.4rem] top-8 w-px bg-surface-border sm:left-[2.65rem]" />
          <motion.div
            aria-hidden
            className="absolute left-[2.4rem] top-8 w-px bg-gradient-to-b from-signal-400 to-ion-400 sm:left-[2.65rem]"
            initial={{ height: 0 }}
            animate={{ height: `${(Math.min(active, heroFlow.length) / heroFlow.length) * 100}%` }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
          />

          {heroFlow.map((step, index) => {
            const isDone = index < active;
            const isCurrent = index === active - 1;
            const tone = toneStyles[step.tone] ?? toneStyles.neutral;

            return (
              <li key={step.label} className="relative flex items-center gap-3.5 rounded-xl px-1.5 py-2">
                <div
                  className={cn(
                    'relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-500',
                    isDone ? tone.ring : 'border-surface-border bg-canvas-raised',
                  )}
                >
                  <Icon
                    name={step.icon}
                    className={cn('h-4 w-4 transition-colors duration-500', isDone ? tone.text : 'text-ink-faint/90')}
                  />
                  {isCurrent && !reduce ? (
                    <motion.span
                      className={cn('absolute inset-0 rounded-full border', tone.ring)}
                      initial={{ opacity: 0.9, scale: 1 }}
                      animate={{ opacity: 0, scale: 1.7 }}
                      transition={{ duration: 1.1, repeat: Infinity }}
                    />
                  ) : null}
                </div>

                <div className="min-w-0 flex-1">
                  <div
                    className={cn(
                      'text-sm font-medium transition-colors duration-500',
                      isDone ? 'text-ink' : 'text-ink-faint',
                    )}
                  >
                    {step.label}
                  </div>
                  <div
                    className={cn(
                      'truncate text-xs transition-colors duration-500',
                      isDone ? 'text-ink-muted' : 'text-ink-faint/90',
                    )}
                  >
                    {step.detail}
                  </div>
                </div>

                <motion.div
                  initial={false}
                  animate={{ opacity: isDone ? 1 : 0, scale: isDone ? 1 : 0.7 }}
                  transition={{ duration: 0.3 }}
                  className="shrink-0"
                >
                  <Icon name="Check" className={cn('h-4 w-4', tone.text)} />
                </motion.div>
              </li>
            );
          })}
        </ol>

        <motion.div
          initial={false}
          animate={{ opacity: complete ? 1 : 0.35 }}
          transition={{ duration: 0.4 }}
          className="flex items-center justify-between gap-3 border-t border-white/[0.07] bg-signal-400/[0.05] px-5 py-3.5"
        >
          <span className="text-xs font-medium text-signal-200">
            {complete ? 'Lead captured, booked and filed' : 'Working the lead…'}
          </span>
          <span className="font-mono text-[0.6875rem] text-ink-faint">total 41s</span>
        </motion.div>
      </div>
    </div>
  );
}
