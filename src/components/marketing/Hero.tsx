import { Container } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { FlowDemo } from './FlowDemo';
import { Icon } from '@/components/ui/Icon';

const proofPoints = [
  { icon: 'Timer', label: 'First reply in seconds' },
  { icon: 'MoonStar', label: 'Runs nights & weekends' },
  { icon: 'PhoneCall', label: 'Keeps your current number' },
];

export function Hero() {
  return (
    <section className="spotlight relative overflow-hidden pb-16 pt-14 sm:pb-24 sm:pt-20 lg:pb-28 lg:pt-24">
      {/* Grid texture — decorative only */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-grid-fade opacity-[0.55]"
        style={{ backgroundSize: '100% 100%, 64px 64px, 64px 64px' }}
      />

      <Container className="relative z-10">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs text-ink-muted backdrop-blur">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-signal-400/80" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-signal-400" />
              </span>
              AI receptionist + CRM for service businesses
            </div>

            <h1 className="mt-6 text-balance font-display text-display-xl text-ink">
              Never lose another customer to a{' '}
              <span className="accent-gradient">missed call</span>.
            </h1>

            <p className="mt-6 max-w-xl text-pretty text-lead text-ink-muted">
              Our AI receptionist responds to missed calls in seconds, qualifies leads, books appointments, follows up
              automatically, and keeps everything organized inside your CRM — 24/7.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button href="/contact" size="lg">
                Book a Free Demo
                <Icon name="ArrowRight" className="h-4 w-4" />
              </Button>
              <Button href="/how-it-works" variant="secondary" size="lg">
                See How It Works
              </Button>
            </div>

            <p className="mt-5 text-sm text-ink-faint">Built for service businesses that depend on every lead.</p>

            <ul className="mt-10 flex flex-wrap gap-x-7 gap-y-3 border-t border-surface-border/70 pt-7">
              {proofPoints.map((point) => (
                <li key={point.label} className="flex items-center gap-2 text-sm text-ink-muted">
                  <Icon name={point.icon} className="h-4 w-4 text-signal-400" />
                  {point.label}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:pl-4">
            <FlowDemo />
          </div>
        </div>
      </Container>
    </section>
  );
}
