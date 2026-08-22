import { Hero } from '@/components/marketing/Hero';
import { ProblemSection } from '@/components/marketing/ProblemSection';
import { HowItWorks } from '@/components/marketing/HowItWorks';
import { ChatDemo } from '@/components/marketing/ChatDemo';
import { FeatureGrid } from '@/components/marketing/FeatureGrid';
import { CrmDashboard } from '@/components/marketing/CrmDashboard';
import { AutomationSection } from '@/components/marketing/AutomationSection';
import { BeforeAfter } from '@/components/marketing/BeforeAfter';
import { IndustryGrid } from '@/components/marketing/IndustryGrid';
import { RoiCalculator } from '@/components/marketing/RoiCalculator';
import { PricingTable } from '@/components/marketing/PricingTable';
import { Testimonials } from '@/components/marketing/Testimonials';
import { Faq } from '@/components/marketing/Faq';
import { FinalCta } from '@/components/marketing/FinalCta';
import { Section, SectionHeader } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { receptionistFeatures } from '@/content/features';
import { faqs } from '@/content/faq';
import { buildMetadata, faqSchema } from '@/lib/seo';
import { site } from '@/content/site.config';

export const metadata = buildMetadata({
  title: `${site.name} — Never Lose Another Customer to a Missed Call`,
  description: site.description,
  path: '/',
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProblemSection />
      <HowItWorks />
      <ChatDemo />

      <Section id="features" className="border-t border-surface-border/60">
        <SectionHeader
          eyebrow="AI receptionist"
          title="You can't answer every call. Your AI receptionist can."
          description="Everything it does between the missed call and the booked job."
        />
        <FeatureGrid features={receptionistFeatures} className="mt-14" />
      </Section>

      <Section id="crm" className="border-t border-surface-border/60">
        <SectionHeader
          eyebrow="CRM"
          title="Every lead. Every conversation. One place."
          description="Open one board and see exactly where every opportunity stands — what's new, what's booked, what's about to go cold."
        />
        <Reveal className="mt-14">
          <CrmDashboard />
        </Reveal>
        <div className="mt-10 flex justify-center">
          <Button href="/crm-automation" variant="outline">
            Explore the CRM
          </Button>
        </div>
      </Section>

      <AutomationSection />
      <BeforeAfter />

      <Section id="industries" className="border-t border-surface-border/60">
        <SectionHeader
          eyebrow="Industries"
          title="Configured for the way your trade actually sells"
          description="The qualifying questions, the urgency rules and the follow-up cadence change by industry. So does the setup."
        />
        <IndustryGrid className="mt-14" limit={6} />
        <div className="mt-10 flex justify-center">
          <Button href="/industries" variant="outline">
            See all industries
          </Button>
        </div>
      </Section>

      <RoiCalculator />

      <Section id="pricing" className="border-t border-surface-border/60">
        <SectionHeader
          eyebrow="Pricing"
          title="Straightforward plans, no long-term contract"
          description="Start with instant response, add the AI receptionist when you're ready."
        />
        <div className="mt-14">
          <PricingTable />
        </div>
      </Section>

      <Testimonials />

      <Section id="faq" className="border-t border-surface-border/60">
        <SectionHeader eyebrow="FAQ" title="Questions owners actually ask" />
        <Faq items={faqs} className="mt-12" />
      </Section>

      <FinalCta />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }}
      />
    </>
  );
}
