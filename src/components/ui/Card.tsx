import { cn } from '@/lib/utils';

type CardProps = {
  className?: string;
  children: React.ReactNode;
  /** Adds a hover lift + accent border. Use for linked/interactive cards. */
  interactive?: boolean;
};

export function Card({ className, children, interactive = false }: CardProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl border border-surface-border bg-surface/60 p-6 shadow-lift backdrop-blur-sm',
        interactive &&
          'transition-all duration-300 hover:-translate-y-1 hover:border-signal-400/35 hover:bg-surface-hover/70',
        className,
      )}
    >
      {children}
    </div>
  );
}

export function CardIcon({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        'mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-signal-400/20 bg-gradient-to-br from-signal-400/15 to-ion-500/10 text-signal-300',
        className,
      )}
    >
      {children}
    </div>
  );
}

export function StatCard({
  label,
  value,
  detail,
  className,
}: {
  label: string;
  value: string;
  detail?: string;
  className?: string;
}) {
  return (
    <div className={cn('rounded-xl border border-surface-border bg-canvas-raised/80 p-4', className)}>
      <div className="text-xs font-medium uppercase tracking-wider text-ink-faint">{label}</div>
      <div className="mt-1.5 font-display text-2xl text-ink">{value}</div>
      {detail ? <div className="mt-0.5 text-xs text-ink-faint">{detail}</div> : null}
    </div>
  );
}

/** Small honesty label used anywhere we show illustrative numbers. */
export function DemoDataBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[0.6875rem] font-medium uppercase tracking-wider text-ink-faint',
        className,
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-ink-faint" />
      Example data
    </span>
  );
}
