import { Section, SectionHeader } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { Reveal, revealChild } from '@/components/ui/Reveal';
import { MotionItem } from './MotionItem';
import { testimonials, type Testimonial } from '@/content/testimonials';
import { site } from '@/content/site.config';

function initials(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <Card className="flex h-full flex-col">
      <blockquote className="flex-1 text-[0.9375rem] leading-relaxed text-ink">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>

      {testimonial.result ? (
        <div className="mt-5 rounded-xl border border-signal-400/20 bg-signal-400/[0.06] px-4 py-3 text-sm text-signal-200">
          {testimonial.result}
        </div>
      ) : null}

      <figcaption className="mt-6 flex items-center gap-3 border-t border-surface-border pt-5">
        {testimonial.photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={testimonial.photo}
            alt=""
            width={44}
            height={44}
            loading="lazy"
            className="h-11 w-11 rounded-full object-cover"
          />
        ) : (
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-signal-400/25 to-ion-500/20 font-display text-sm text-signal-200">
            {initials(testimonial.name)}
          </span>
        )}
        <span className="min-w-0">
          <span className="block truncate text-sm font-medium text-ink">{testimonial.name}</span>
          <span className="block truncate text-xs text-ink-muted">
            {testimonial.company} · {testimonial.industry}
          </span>
        </span>
      </figcaption>
    </Card>
  );
}

/**
 * Renders nothing unless real testimonials exist AND the env flag is on.
 * No placeholder quotes ship to production — inventing social proof is both
 * dishonest and, for advertising claims, illegal.
 */
export function Testimonials() {
  if (!site.showTestimonials || testimonials.length === 0) return null;

  return (
    <Section id="testimonials" className="border-t border-surface-border/60">
      <SectionHeader
        eyebrow="Customers"
        title="What service business owners say"
        description="Real customers, in their words."
      />
      <Reveal className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
        {testimonials.map((testimonial) => (
          <MotionItem key={testimonial.name} variants={revealChild} className="h-full">
            <TestimonialCard testimonial={testimonial} />
          </MotionItem>
        ))}
      </Reveal>
    </Section>
  );
}
