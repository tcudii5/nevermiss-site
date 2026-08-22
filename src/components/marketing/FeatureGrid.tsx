import { Card, CardIcon } from '@/components/ui/Card';
import { Reveal, revealChild } from '@/components/ui/Reveal';
import { Icon } from '@/components/ui/Icon';
import { MotionItem } from './MotionItem';
import type { Feature } from '@/content/features';
import { cn } from '@/lib/utils';

export function FeatureGrid({
  features,
  columns = 4,
  className,
}: {
  features: Feature[];
  columns?: 2 | 3 | 4;
  className?: string;
}) {
  const cols = {
    2: 'sm:grid-cols-2',
    3: 'sm:grid-cols-2 lg:grid-cols-3',
    4: 'sm:grid-cols-2 lg:grid-cols-4',
  }[columns];

  return (
    <Reveal className={cn('grid gap-5', cols, className)} stagger={0.06}>
      {features.map((feature) => (
        <MotionItem key={feature.slug} variants={revealChild} className="h-full">
          <Card interactive className="h-full">
            <CardIcon>
              <Icon name={feature.icon} />
            </CardIcon>
            <h3 className="font-display text-lg text-ink">{feature.title}</h3>
            <p className="mt-2.5 text-sm leading-relaxed text-ink-muted">{feature.description}</p>
          </Card>
        </MotionItem>
      ))}
    </Reveal>
  );
}
