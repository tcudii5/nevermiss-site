import { Container, Eyebrow } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';

type PageHeroProps = {
  eyebrow: string;
  title: React.ReactNode;
  description: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  children?: React.ReactNode;
};

/** Shared hero for every non-home page, so headers stay visually consistent. */
export function PageHero({ eyebrow, title, description, primaryCta, secondaryCta, children }: PageHeroProps) {
  return (
    <section className="spotlight relative overflow-hidden border-b border-surface-border/60 py-16 sm:py-20 lg:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-grid-fade opacity-40"
        style={{ backgroundSize: '100% 100%, 64px 64px, 64px 64px' }}
      />
      <Container className="relative z-10">
        <div className="max-w-3xl">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="mt-5 text-balance font-display text-display-lg text-ink">{title}</h1>
          <p className="mt-5 max-w-2xl text-pretty text-lead text-ink-muted">{description}</p>

          {primaryCta || secondaryCta ? (
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              {primaryCta ? (
                <Button href={primaryCta.href} size="lg">
                  {primaryCta.label}
                  <Icon name="ArrowRight" className="h-4 w-4" />
                </Button>
              ) : null}
              {secondaryCta ? (
                <Button href={secondaryCta.href} variant="secondary" size="lg">
                  {secondaryCta.label}
                </Button>
              ) : null}
            </div>
          ) : null}

          {children}
        </div>
      </Container>
    </section>
  );
}
