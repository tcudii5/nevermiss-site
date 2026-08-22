import { PageHero } from '@/components/marketing/PageHero';
import { IndustryGrid } from '@/components/marketing/IndustryGrid';
import { RoiCalculator } from '@/components/marketing/RoiCalculator';
import { FinalCta } from '@/components/marketing/FinalCta';
import { Section, SectionHeader } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { Icon } from '@/components/ui/Icon';
import { buildMetadata, breadcrumbSchema } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Industries We Serve',
  description:
    'AI receptionist and CRM automation built for plumbers, HVAC, electricians, roofers, contractors, auto shops, physical therapy practices, med spas and other appointment-driven businesses.',
  path: '/industries',
});

const otherIndustries = [
  'Remodeling',
  'Landscaping',
  'Cleaning services',
  'Pest control',
  'Garage doors',
  'Pool service',
  'Dental practices',
  'Chiropractic',
  'Law firms',
  'Real estate',
  'Insurance agencies',
  'Home inspection',
];

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title="Built for businesses where a missed call is a missed job."
        description="The mechanics are the same everywhere. What changes is the urgency, the questions worth asking, and how long a customer will wait before calling someone else."
        primaryCta={{ label: 'Book a Free Demo', href: '/contact' }}
      />

      <Section>
        <IndustryGrid />
      </Section>

      <Section className="border-t border-surface-border/60" spacing="sm">
        <SectionHeader
          eyebrow="Also a fit"
          title="Don't see your trade?"
          description="If customers reach you by phone and you sell an appointment, the system works the same way. These are configured regularly."
        />
        <Reveal className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-2.5">
          {otherIndustries.map((name) => (
            <span
              key={name}
              className="rounded-full border border-surface-border bg-surface/50 px-4 py-2 text-sm text-ink-muted"
            >
              {name}
            </span>
          ))}
        </Reveal>
        <div className="mt-10 flex justify-center">
          <a
            href="/contact"
            className="inline-flex items-center gap-2 text-sm text-signal-300 transition-colors hover:text-signal-200"
          >
            Ask about your industry
            <Icon name="ArrowRight" className="h-3.5 w-3.5" />
          </a>
        </div>
      </Section>

      <RoiCalculator />
      <FinalCta />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: 'Home', path: '/' },
              { name: 'Industries', path: '/industries' },
            ]),
          ),
        }}
      />
    </>
  );
}
