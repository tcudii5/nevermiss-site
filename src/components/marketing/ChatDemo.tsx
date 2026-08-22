'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion';
import { Section, SectionHeader } from '@/components/ui/Section';
import { Icon } from '@/components/ui/Icon';
import { Button } from '@/components/ui/Button';
import { chatScript, chatOutcomes } from '@/content/chat-demo';
import { cn } from '@/lib/utils';

const TYPING_MS = 900;
const READ_MS = 1150;

/**
 * Animated SMS conversation in a phone frame. Plays once the section scrolls
 * into view, then reveals the outcome chips. Replay button lets a visitor
 * watch it again; reduced-motion users get the finished transcript instantly.
 */
export function ChatDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: '-120px' });
  const reduce = useReducedMotion();

  const [visible, setVisible] = useState(0);
  const [typing, setTyping] = useState(false);
  const [runId, setRunId] = useState(0);

  /**
   * Reduced-motion users get the completed transcript immediately. Deriving it
   * at render (instead of pushing it through an effect) keeps the component to
   * a single render pass and satisfies react-hooks/set-state-in-effect.
   */
  // Replay resets the transcript during render rather than from inside the
  // effect, so the rewind and the restart land in the same render pass.
  const [lastRun, setLastRun] = useState(runId);
  if (lastRun !== runId) {
    setLastRun(runId);
    setVisible(0);
    setTyping(false);
  }

  const shownCount = reduce ? chatScript.length : visible;
  const finished = shownCount >= chatScript.length;

  useEffect(() => {
    if (reduce || !inView) return;

    let cancelled = false;
    const timers: number[] = [];

    const play = (index: number) => {
      if (cancelled || index >= chatScript.length) return;
      const turn = chatScript[index];
      const showTyping = turn.from === 'ai';

      if (showTyping) setTyping(true);

      timers.push(
        window.setTimeout(
          () => {
            if (cancelled) return;
            setTyping(false);
            setVisible(index + 1);
            timers.push(window.setTimeout(() => play(index + 1), READ_MS));
          },
          showTyping ? TYPING_MS : 550,
        ),
      );
    };

    timers.push(window.setTimeout(() => play(0), 400));

    return () => {
      cancelled = true;
      timers.forEach(window.clearTimeout);
    };
  }, [inView, reduce, runId]);

  // Keep the newest message in view inside the phone.
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: reduce ? 'auto' : 'smooth' });
  }, [shownCount, typing, reduce]);

  const replay = useCallback(() => setRunId((n) => n + 1), []);

  return (
    <Section id="live-demo" className="relative border-t border-surface-border/60 overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/4 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-signal-500/[0.07] blur-[120px]"
      />

      <SectionHeader
        eyebrow="Live conversation"
        title="This is what happens after the call you missed"
        description="A real qualification flow — not a canned auto-reply. The customer answers on their own time, and by the end you have a name, a job, an address and a slot on the calendar."
      />

      <div ref={containerRef} className="relative mt-14 grid items-center gap-12 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:gap-16">
        {/* Phone */}
        <div className="mx-auto w-full max-w-[22rem]">
          <div className="relative rounded-[2.75rem] border border-white/[0.09] bg-gradient-to-b from-[#161c26] to-[#0a0e15] p-2.5 shadow-panel">
            <div className="relative overflow-hidden rounded-[2.25rem] bg-canvas-sunken">
              {/* status bar */}
              <div className="flex items-center justify-between px-6 pb-1 pt-3 text-[0.6875rem] font-medium text-ink-muted">
                <span>9:41</span>
                <span className="flex items-center gap-1.5">
                  <Icon name="SignalHigh" className="h-3 w-3" />
                  <Icon name="Wifi" className="h-3 w-3" />
                  <Icon name="BatteryFull" className="h-3.5 w-3.5" />
                </span>
              </div>

              {/* conversation header */}
              <div className="flex items-center gap-3 border-b border-white/[0.07] px-4 pb-3 pt-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-signal-300 to-signal-600 font-display text-sm text-canvas-sunken">
                  AP
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium text-ink">ABC Plumbing</div>
                  <div className="text-[0.6875rem] text-signal-300">Active now</div>
                </div>
                <Icon name="Phone" className="h-4 w-4 text-ink-faint" />
              </div>

              {/* messages */}
              <div ref={scrollRef} className="no-scrollbar h-[26rem] space-y-2.5 overflow-y-auto px-4 py-4">
                <div className="mx-auto w-fit rounded-full bg-white/[0.05] px-3 py-1 text-[0.625rem] text-ink-faint">
                  Missed call · text sent automatically
                </div>

                {chatScript.slice(0, shownCount).map((turn, index) => (
                  <motion.div
                    key={`${runId}-${index}`}
                    initial={reduce ? false : { opacity: 0, y: 12, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                    className={cn('flex', turn.from === 'customer' ? 'justify-start' : 'justify-end')}
                  >
                    <div
                      className={cn(
                        'max-w-[82%] rounded-2xl px-3.5 py-2.5 text-[0.8125rem] leading-relaxed',
                        turn.from === 'customer'
                          ? 'rounded-bl-md bg-surface text-ink'
                          : 'rounded-br-md bg-signal-500 text-canvas-sunken',
                      )}
                    >
                      {turn.text}
                    </div>
                  </motion.div>
                ))}

                <AnimatePresence>
                  {typing ? (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex justify-end"
                    >
                      <div className="flex items-center gap-1 rounded-2xl rounded-br-md bg-signal-500/25 px-4 py-3">
                        {[0, 1, 2].map((dot) => (
                          <motion.span
                            key={dot}
                            className="h-1.5 w-1.5 rounded-full bg-signal-200"
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{ duration: 1, repeat: Infinity, delay: dot * 0.18 }}
                          />
                        ))}
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>

              <div className="flex items-center gap-2 border-t border-white/[0.07] px-4 py-3">
                <div className="flex-1 rounded-full bg-white/[0.05] px-4 py-2 text-xs text-ink-faint">Text message</div>
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-signal-500">
                  <Icon name="ArrowUp" className="h-3.5 w-3.5 text-canvas-sunken" />
                </div>
              </div>
            </div>
          </div>

          {!reduce ? (
            <div className="mt-5 flex justify-center">
              <button
                type="button"
                onClick={replay}
                className="inline-flex items-center gap-2 rounded-full border border-surface-border px-4 py-2 text-xs text-ink-muted transition-colors hover:border-signal-400/40 hover:text-ink"
              >
                <Icon name="RotateCcw" className="h-3.5 w-3.5" />
                Replay conversation
              </button>
            </div>
          ) : null}
        </div>

        {/* Outcomes */}
        <div>
          <h3 className="font-display text-display-sm text-ink">And here&rsquo;s what your office got out of it</h3>
          <p className="mt-3 max-w-lg text-ink-muted">
            All of this happened while the owner was under a sink. Nobody typed a word.
          </p>

          <ul className="mt-8 space-y-3">
            {chatOutcomes.map((outcome, index) => (
              <motion.li
                key={outcome.label}
                initial={reduce ? false : { opacity: 0, x: -14 }}
                animate={finished || reduce ? { opacity: 1, x: 0 } : { opacity: 0.25, x: 0 }}
                transition={{ duration: 0.45, delay: finished ? index * 0.12 : 0, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center gap-4 rounded-2xl border border-surface-border bg-surface/50 p-4"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-signal-400/25 bg-signal-400/10 text-signal-300">
                  <Icon name={outcome.icon} className="h-[1.125rem] w-[1.125rem]" />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-medium text-ink">{outcome.label}</div>
                  <div className="truncate text-xs text-ink-muted">{outcome.detail}</div>
                </div>
                <Icon name="Check" className="ml-auto h-4 w-4 shrink-0 text-signal-400" />
              </motion.li>
            ))}
          </ul>

          <div className="mt-9">
            <Button href="/contact" size="lg">
              Book a Free Demo
              <Icon name="ArrowRight" className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
