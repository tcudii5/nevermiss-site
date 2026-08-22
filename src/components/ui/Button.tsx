import Link from 'next/link';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline';
type Size = 'sm' | 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2 rounded-full text-center font-medium tracking-tight transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-55';

const variants: Record<Variant, string> = {
  primary:
    'bg-signal-400 text-canvas-sunken shadow-glow hover:bg-signal-300 hover:shadow-[0_0_0_1px_rgba(52,224,161,0.3),0_22px_70px_-18px_rgba(52,224,161,0.55)] active:scale-[0.98]',
  secondary:
    'bg-white/[0.06] text-ink border border-white/10 backdrop-blur hover:bg-white/[0.11] hover:border-white/20 active:scale-[0.98]',
  outline:
    'border border-surface-border text-ink hover:border-signal-400/50 hover:text-signal-200 hover:bg-signal-400/[0.06]',
  ghost: 'text-ink-muted hover:text-ink hover:bg-white/[0.05]',
};

const sizes: Record<Size, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-5 text-[0.9375rem]',
  lg: 'h-[3.25rem] px-7 text-base',
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsLink = CommonProps & {
  href: string;
} & Omit<React.ComponentPropsWithoutRef<typeof Link>, 'href' | 'className' | 'children'>;

type ButtonAsButton = CommonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'> & { href?: undefined };

export function Button(props: ButtonAsLink | ButtonAsButton) {
  const { variant = 'primary', size = 'md', className, children } = props;
  const classes = cn(base, variants[variant], sizes[size], className);

  if ('href' in props && props.href) {
    const { href, variant: _v, size: _s, className: _c, children: _ch, ...rest } = props as ButtonAsLink;
    const external = href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:');

    if (external) {
      return (
        <a
          href={href}
          className={classes}
          {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  const { variant: _v, size: _s, className: _c, children: _ch, ...rest } = props as ButtonAsButton;
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
