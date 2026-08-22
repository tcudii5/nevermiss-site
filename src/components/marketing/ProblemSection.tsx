import { Section, SectionHeader } from '@/components/ui/Section';
import { Card, CardIcon } from '@/components/ui/Card';
import { Reveal, revealChild } from '@/components/ui/Reveal';
import { Icon } from '@/components/ui/Icon';
import { problems } from '@/content/features';
import { MotionItem } from './MotionItem';

export function ProblemSection() {
  return (
    <Section id="problem" className="border-t border-surface-border/60">
      <SectionHeader
        eyebrow="The real cost"
        title={
          <>
            How much business are you losing when you{' '}
            <span className="text-ink-muted">can&rsquo;t answer the phone?</span>
          </>
        }
        description="Nothing here is a technology problem. It's a timing problem — and timing is what decides who gets the job."
      />

      <Reveal className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
        {problems.map((problem) => (
          <MotionItem key={problem.title} variants={revealChild}>
            <Card className="h-full">
              <CardIcon className="border-amber-400/20 from-amber-400/15 to-amber-500/5 text-amber-300">
                <Icon name={problem.icon} />
              </CardIcon>
              <h3 className="font-display text-lg text-ink">{problem.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-ink-muted">{problem.description}</p>
            </Card>
          </MotionItem>
        ))}
      </Reveal>

      <Reveal className="mt-14" delay={0.1}>
        <div className="relative overflow-hidden rounded-3xl border border-signal-400/20 bg-gradient-to-br from-signal-400/[0.09] via-canvas-raised to-ion-500/[0.07] px-7 py-12 text-center sm:px-12">
          <p className="mx-auto max-w-2xl text-balance font-display text-display-sm text-ink">
            Your business shouldn&rsquo;t stop selling just because you&rsquo;re busy working.
          </p>
        </div>
      </Reveal>
    </Section>
  );
}
