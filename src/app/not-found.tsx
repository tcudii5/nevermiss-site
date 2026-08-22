import { Container } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';

export default function NotFound() {
  return (
    <section className="spotlight relative flex min-h-[70vh] items-center overflow-hidden py-20">
      <Container className="relative z-10">
        <div className="mx-auto max-w-xl text-center">
          <span className="font-mono text-sm text-signal-400">404</span>
          <h1 className="mt-4 text-balance font-display text-display-md text-ink">
            This one got missed.
          </h1>
          <p className="mt-4 text-lead text-ink-muted">
            The page you were looking for isn&rsquo;t here. Unlike your phone calls, we can fix that right now.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href="/" size="lg">
              Back to home
              <Icon name="ArrowRight" className="h-4 w-4" />
            </Button>
            <Button href="/contact" variant="secondary" size="lg">
              Book a demo
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
