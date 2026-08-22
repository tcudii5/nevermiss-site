import { Container } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';

export function FinalCta({
  headline = 'How many leads will you miss this week?',
  body = 'Let AI handle the first response so your team can focus on doing the work.',
}: {
  headline?: string;
  body?: string;
}) {
  return (
    <section className="relative overflow-hidden border-t border-surface-border/60 py-24 sm:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 top-0 bg-[radial-gradient(60%_70%_at_50%_100%,rgba(52,224,161,0.15)_0%,rgba(91,121,255,0.07)_40%,transparent_72%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'linear-gradient(rgba(30,40,55,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(30,40,55,0.4) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
          maskImage: 'radial-gradient(60% 60% at 50% 50%, black, transparent)',
          WebkitMaskImage: 'radial-gradient(60% 60% at 50% 50%, black, transparent)',
        }}
      />

      <Container className="relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-balance font-display text-display-lg text-ink">{headline}</h2>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-lead text-ink-muted">{body}</p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="/contact" size="lg">
              Book Your Free Demo
              <Icon name="ArrowRight" className="h-4 w-4" />
            </Button>
            <Button href="/how-it-works" variant="secondary" size="lg">
              See How It Works
            </Button>
          </div>

          <p className="mt-6 text-sm text-ink-faint">
            A 20-minute call. We look at your call volume and show you exactly what the system would do.
          </p>
        </div>
      </Container>
    </section>
  );
}
