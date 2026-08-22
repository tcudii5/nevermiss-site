import { cn } from '@/lib/utils';

export function Container({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn('mx-auto w-full max-w-content px-5 sm:px-8', className)}>{children}</div>;
}

type SectionProps = {
  id?: string;
  className?: string;
  containerClassName?: string;
  /** Tightens vertical rhythm for stacked sections. */
  spacing?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  as?: 'section' | 'div';
};

const spacings = {
  sm: 'py-14 sm:py-16',
  md: 'py-20 sm:py-24 lg:py-28',
  lg: 'py-24 sm:py-32 lg:py-40',
};

export function Section({
  id,
  className,
  containerClassName,
  spacing = 'md',
  children,
  as: Tag = 'section',
}: SectionProps) {
  return (
    <Tag id={id} className={cn('relative', spacings[spacing], className)}>
      <Container className={containerClassName}>{children}</Container>
    </Tag>
  );
}

type HeaderProps = {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: 'left' | 'center';
  className?: string;
};

export function SectionHeader({ eyebrow, title, description, align = 'center', className }: HeaderProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-4',
        align === 'center' ? 'mx-auto max-w-3xl text-center items-center' : 'max-w-2xl',
        className,
      )}
    >
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2 className="text-display-md font-display text-balance text-ink">{title}</h2>
      {description ? <p className="text-lead text-pretty text-ink-muted">{description}</p> : null}
    </div>
  );
}

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full border border-signal-400/25 bg-signal-400/[0.07] px-3 py-1 text-xs font-medium uppercase tracking-[0.14em] text-signal-300',
        className,
      )}
    >
      {children}
    </span>
  );
}
