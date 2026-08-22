import { PageHero } from '@/components/marketing/PageHero';
import { CrmDashboard } from '@/components/marketing/CrmDashboard';
import { AutomationSection } from '@/components/marketing/AutomationSection';
import { FeatureGrid } from '@/components/marketing/FeatureGrid';
import { FinalCta } from '@/components/marketing/FinalCta';
import { Section, SectionHeader } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { Icon } from '@/components/ui/Icon';
import { crmFeatures } from '@/content/features';
import { pipelineStages } from '@/content/automations';
import { buildMetadata, breadcrumbSchema } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'CRM & Automation for Service Businesses',
  description:
    'Every lead, conversation and appointment in one pipeline — with follow-up, reminders, review requests and reactivation campaigns running automatically.',
  path: '/crm-automation',
});

export default function CrmAutomationPage() {
  return (
    <>
      <PageHero
        eyebrow="CRM & automation"
        title="Every lead. Every conversation. One place."
        description="Stop reconstructing your pipeline from memory, voicemails and text threads. Every opportunity sits on one board with its full history attached."
        primaryCta={{ label: 'Book a Free Demo', href: '/contact' }}
        secondaryCta={{ label: 'See pricing', href: '/pricing' }}
      />

      <Section>
        <Reveal>
          <CrmDashboard />
        </Reveal>
      </Section>

      <Section className="border-t border-surface-border/60" spacing="sm">
        <SectionHeader
          eyebrow="Pipeline"
          title="You can see exactly where every opportunity is"
          description="Stages are configured around how your business actually sells. These are the defaults most service businesses start from."
        />
        <Reveal className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4" stagger={0.05}>
          {pipelineStages.map((stage, index) => (
            <div key={stage.name} className="rounded-2xl border border-surface-border bg-surface/50 p-5">
              <span className="font-mono text-xs text-signal-400">{String(index + 1).padStart(2, '0')}</span>
              <div className="mt-2 font-display text-base text-ink">{stage.name}</div>
            </div>
          ))}
        </Reveal>
      </Section>

      <Section className="border-t border-surface-border/60">
        <SectionHeader eyebrow="What's inside" title="The parts you'll use every day" />
        <FeatureGrid features={crmFeatures} columns={3} className="mt-14" />
      </Section>

      <AutomationSection />

      <Section className="border-t border-surface-border/60">
        <div className="rounded-3xl border border-surface-border bg-canvas-raised/70 p-8 sm:p-12">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-ion-400/25 bg-ion-500/10 text-ion-300">
              <Icon name="MessageSquareWarning" className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-display text-display-sm text-ink">A word on text message compliance</h2>
              <p className="mt-4 max-w-2xl text-ink-muted">
                Automated business texting in the US is regulated. Sending requires registering your business for A2P
                10DLC through the carriers, and marketing or re-engagement messages carry consent obligations under
                the TCPA that are different from simply replying to someone who just called you.
              </p>
              <p className="mt-4 max-w-2xl text-ink-muted">
                We handle registration during onboarding and configure consent capture, opt-out handling and quiet
                hours as part of the build. It affects your launch timeline, so we bring it up on the first call rather
                than after you have signed.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <FinalCta
        headline="How much of your pipeline is currently in someone's head?"
        body="Put it on a board where nothing quietly disappears."
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: 'Home', path: '/' },
              { name: 'CRM & Automation', path: '/crm-automation' },
            ]),
          ),
        }}
      />
    </>
  );
}
