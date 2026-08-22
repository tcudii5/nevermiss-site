import { PageHero } from '@/components/marketing/PageHero';
import { PricingTable } from '@/components/marketing/PricingTable';
import { RoiCalculator } from '@/components/marketing/RoiCalculator';
import { Testimonials } from '@/components/marketing/Testimonials';
import { FinalCta } from '@/components/marketing/FinalCta';
import { Faq } from '@/components/marketing/Faq';
import { Section, SectionHeader } from '@/components/ui/Section';
import { pricingFaq } from '@/content/pricing';
import { faqs } from '@/content/faq';
import { buildMetadata, faqSchema, breadcrumbSchema } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Pricing',
  description:
    'Simple monthly plans for AI receptionist, missed-call text back, CRM and automation. No long-term contract. Book a demo to see what fits your call volume.',
  path: '/pricing',
});

const combinedFaq = [...pricingFaq, ...faqs.slice(0, 4)];

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title="Priced against the jobs you're already losing."
        description="One recovered job a month covers most of it. Use the calculator below to see roughly where you land before you talk to anyone."
      />

      <Section>
        <PricingTable />
      </Section>

      <RoiCalculator />
      <Testimonials />

      <Section className="border-t border-surface-border/60">
        <SectionHeader eyebrow="FAQ" title="Before you ask" />
        <Faq items={combinedFaq} className="mt-12" />
      </Section>

      <FinalCta
        headline="Not sure which plan fits?"
        body="Tell us your call volume on a 20-minute demo and we'll tell you straight."
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(combinedFaq)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: 'Home', path: '/' },
              { name: 'Pricing', path: '/pricing' },
            ]),
          ),
        }}
      />
    </>
  );
}
