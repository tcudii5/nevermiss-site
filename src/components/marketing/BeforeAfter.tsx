import { Section, SectionHeader } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { Icon } from '@/components/ui/Icon';
import { cn } from '@/lib/utils';

const before = [
  { label: 'Customer calls', icon: 'PhoneIncoming' },
  { label: 'No answer', icon: 'PhoneOff' },
  { label: 'Voicemail', icon: 'Voicemail' },
  { label: 'You call back hours later', icon: 'Clock' },
  { label: 'They already hired a competitor', icon: 'X' },
];

const after = [
  { label: 'Customer calls', icon: 'PhoneIncoming' },
  { label: 'No answer', icon: 'PhoneOff' },
  { label: 'AI responds within seconds', icon: 'MessageSquareText' },
  { label: 'Customer explains what they need', icon: 'MessageSquare' },
  { label: 'Lead gets qualified', icon: 'ListChecks' },
  { label: 'Appointment booked', icon: 'CalendarCheck' },
  { label: 'Owner notified', icon: 'BellRing' },
];

function Track({
  title,
  caption,
  steps,
  tone,
}: {
  title: string;
  caption: string;
  steps: { label: string; icon: string }[];
  tone: 'bad' | 'good';
}) {
  const good = tone === 'good';

  return (
    <div
      className={cn(
        'relative flex h-full flex-col overflow-hidden rounded-3xl border p-6 sm:p-8',
        good
          ? 'border-signal-400/25 bg-gradient-to-b from-signal-400/[0.08] to-transparent'
          : 'border-surface-border bg-canvas-raised/60',
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <span
          className={cn(
            'inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em]',
            good ? 'bg-signal-400/15 text-signal-300' : 'bg-white/[0.06] text-ink-faint',
          )}
        >
          {title}
        </span>
        <span className={cn('font-mono text-xs', good ? 'text-signal-300' : 'text-ink-faint')}>{caption}</span>
      </div>

      <ol className="mt-7 space-y-0">
        {steps.map((step, index) => {
          const isLast = index === steps.length - 1;
          return (
            <li key={step.label} className="relative flex gap-4 pb-5 last:pb-0">
              {!isLast ? (
                <span
                  aria-hidden
                  className={cn(
                    'absolute left-[1.09rem] top-9 h-[calc(100%-1.5rem)] w-px',
                    good ? 'bg-signal-400/30' : 'bg-surface-border',
                  )}
                />
              ) : null}
              <span
                className={cn(
                  'relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border',
                  good
                    ? isLast
                      ? 'border-signal-400/50 bg-signal-400 text-canvas-sunken'
                      : 'border-signal-400/25 bg-signal-400/10 text-signal-300'
                    : isLast
                      ? 'border-red-500/40 bg-red-500/12 text-red-300'
                      : 'border-surface-border bg-canvas text-ink-faint',
                )}
              >
                <Icon name={step.icon} className="h-4 w-4" />
              </span>
              <span
                className={cn(
                  'pt-1.5 text-sm leading-snug',
                  good ? 'text-ink' : isLast ? 'text-red-200' : 'text-ink-muted',
                )}
              >
                {step.label}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export function BeforeAfter() {
  return (
    <Section id="before-after" className="border-t border-surface-border/60">
      <SectionHeader
        eyebrow="Before / after"
        title="Same missed call. Completely different outcome."
        description="Nothing about the call changed. The only variable is what happened in the sixty seconds afterward."
      />

      <Reveal className="mt-14 grid gap-6 lg:grid-cols-2">
        <Track title="Before" caption="~4 hours" steps={before} tone="bad" />
        <Track title="After" caption="~2 minutes" steps={after} tone="good" />
      </Reveal>
    </Section>
  );
}
