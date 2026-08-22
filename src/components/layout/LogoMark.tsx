import Link from 'next/link';
import { site } from '@/content/site.config';
import { cn } from '@/lib/utils';

/**
 * Placeholder wordmark. To swap in a real logo, replace the <svg> below with
 * an <Image> pointing at your asset in /public — the sizing wrapper stays.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn('group inline-flex items-center gap-2.5 rounded-lg', className)}
      aria-label={`${site.name} home`}
    >
      <span className="relative flex h-8 w-8 items-center justify-center rounded-[0.6rem] bg-gradient-to-br from-signal-300 to-signal-600 shadow-[0_6px_20px_-6px_rgba(52,224,161,0.7)]">
        <svg viewBox="0 0 24 24" className="h-[1.05rem] w-[1.05rem] text-canvas-sunken" aria-hidden>
          <path
            d="M4 6.5c0-1.1.9-2 2-2h12c1.1 0 2 .9 2 2v8c0 1.1-.9 2-2 2h-6.6L7 20.2V16.5H6c-1.1 0-2-.9-2-2v-8Z"
            fill="currentColor"
          />
          <path
            d="M9.2 10.6l1.9 1.9 3.7-3.7"
            fill="none"
            stroke="#0B3A2A"
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="font-display text-[1.0625rem] font-semibold tracking-tight text-ink">{site.name}</span>
    </Link>
  );
}
