import { DemoForm } from '@/components/forms/DemoForm';
import { CalendarEmbed } from '@/components/integrations/CalendarEmbed';
import { Section, Container, Eyebrow, SectionHeader } from '@/components/ui/Section';
import { Icon } from '@/components/ui/Icon';
import { site } from '@/content/site.config';
import { buildMetadata, breadcrumbSchema } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Book a Free Demo',
  description:
    'See exactly what happens to a missed call at your business. A 20-minute walkthrough of the AI receptionist, CRM and automations — no obligation.',
  path: '/contact',
});

const expectations = [
  { text: 'A 20-minute call, screen shared', icon: 'Clock' },
  { text: 'We look at your actual call volume and follow-up gaps', icon: 'Search' },
  { text: 'You see the AI receptionist run a real conversation', icon: 'MessageSquareText' },
  { text: 'A straight answer on whether this is worth it for you', icon: 'CircleCheck' },
];

export default function ContactPage() {
  return (
    <>
      <section className="spotlight relative overflow-hidden border-b border-surface-border/60 py-16 sm:py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-grid-fade opacity-40"
          style={{ backgroundSize: '100% 100%, 64px 64px, 64px 64px' }}
        />
        <Container className="relative z-10">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            <div className="lg:pt-6">
              <Eyebrow>Book a demo</Eyebrow>
              <h1 className="mt-5 text-balance font-display text-display-lg text-ink">
                See what happens to your next missed call.
              </h1>
              <p className="mt-5 max-w-lg text-pretty text-lead text-ink-muted">
                Tell us a bit about your business and we&rsquo;ll show you the system running on a scenario that looks
                like yours.
              </p>

              <ul className="mt-10 space-y-4">
                {expectations.map((item) => (
                  <li key={item.text} className="flex items-start gap-3.5 text-ink-muted">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-signal-400/25 bg-signal-400/10 text-signal-300">
                      <Icon name={item.icon} className="h-3.5 w-3.5" />
                    </span>
                    <span className="leading-relaxed">{item.text}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-10 flex flex-col gap-3 border-t border-surface-border pt-8 text-sm">
                <a
                  href={`mailto:${site.contact.email}`}
                  className="inline-flex items-center gap-2.5 text-ink-muted transition-colors hover:text-ink"
                >
                  <Icon name="Mail" className="h-4 w-4 text-ink-faint" />
                  {site.contact.email}
                </a>
                <a
                  href={`tel:${site.contact.phoneHref}`}
                  className="inline-flex items-center gap-2.5 text-ink-muted transition-colors hover:text-ink"
                >
                  <Icon name="Phone" className="h-4 w-4 text-ink-faint" />
                  {site.contact.phone}
                </a>
                <span className="inline-flex items-center gap-2.5 text-ink-faint">
                  <Icon name="Clock" className="h-4 w-4" />
                  {site.contact.hours}
                </span>
              </div>
            </div>

            <div id="demo-form">
              <DemoForm />
            </div>
          </div>
        </Container>
      </section>

      <Section id="calendar">
        <SectionHeader
          eyebrow="Prefer to pick a time?"
          title="Grab a slot on the calendar"
          description="Choose a time that works and we'll send the confirmation straight away."
        />
        <div className="mx-auto mt-12 max-w-4xl">
          <CalendarEmbed />
        </div>
      </Section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: 'Home', path: '/' },
              { name: 'Book a Demo', path: '/contact' },
            ]),
          ),
        }}
      />
    </>
  );
}
