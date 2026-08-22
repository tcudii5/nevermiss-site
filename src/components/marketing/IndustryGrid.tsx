import Link from 'next/link';
import { Reveal, revealChild } from '@/components/ui/Reveal';
import { Icon } from '@/components/ui/Icon';
import { MotionItem } from './MotionItem';
import { industries, type Industry } from '@/content/industries';
import { cn } from '@/lib/utils';

export function IndustryCard({ industry }: { industry: Industry }) {
  return (
    <Link
      href={`/industries/${industry.slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-surface-border bg-surface/50 p-6 shadow-lift transition-all duration-300 hover:-translate-y-1 hover:border-signal-400/35 hover:bg-surface-hover/60"
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-signal-400/20 bg-gradient-to-br from-signal-400/15 to-ion-500/10 text-signal-300">
        <Icon name={industry.icon} />
      </div>
      <h3 className="mt-5 font-display text-lg text-ink">{industry.name}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">{industry.hook}</p>
      <span className="mt-5 inline-flex items-center gap-1.5 text-sm text-signal-300 transition-transform group-hover:gap-2.5">
        See how it works
        <Icon name="ArrowRight" className="h-3.5 w-3.5" />
      </span>
    </Link>
  );
}

export function IndustryGrid({
  limit,
  exclude,
  className,
}: {
  limit?: number;
  exclude?: string;
  className?: string;
}) {
  const list = industries.filter((i) => i.slug !== exclude).slice(0, limit ?? industries.length);

  return (
    <Reveal className={cn('grid gap-5 sm:grid-cols-2 lg:grid-cols-3', className)} stagger={0.06}>
      {list.map((industry) => (
        <MotionItem key={industry.slug} variants={revealChild} className="h-full">
          <IndustryCard industry={industry} />
        </MotionItem>
      ))}
    </Reveal>
  );
}
