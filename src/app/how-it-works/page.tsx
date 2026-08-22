import { PageHero } from '@/components/marketing/PageHero';
import { HowItWorks } from '@/components/marketing/HowItWorks';
import { ChatDemo } from '@/components/marketing/ChatDemo';
import { BeforeAfter } from '@/components/marketing/BeforeAfter';
import { AutomationSection } from '@/components/marketing/AutomationSection';
import { FinalCta } from '@/components/marketing/FinalCta';
import { Section, SectionHeader } from '@/components/ui/Section';
import { Card, CardIcon } from '@/components/ui/Card';
import { Reveal } from '@/components/ui/Reveal';
import { Icon } from '@/components/ui/Icon';
import { buildMetadata, breadcrumbSchema } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'How It Works',
  description:
    'From missed call to booked appointment: how the AI receptionist responds in seconds, qualifies the lead, books the job, and updates your CRM automatically.',
  path: '/how-it-works',
});

const setupSteps = [
  {
    title: 'Kickoff call',
    description: 'We map how calls come in today, what you ask customers, and which jobs you actually want more of.',
    icon: 'Phone',
    duration: 'Day 1',
  },
  {
    title: 'We build it',
    description:
      'Number connection, CRM and pipeline setup, AI question set written for your trade, calendar rules configured.',
    icon: 'Settings2',
    duration: 'Days 2–4',
  },
  {
    title: 'You review',
    description: 'You test the conversation yourself and change anything you want before a real customer sees it.',
    icon: 'ClipboardCheck',
    duration: 'Day 4',
  },
  {
    title: 'Go live',
    description: 'It switches on. Your team gets the mobile app, and we watch the first week of conversations with you.',
    icon: 'Rocket',
    duration: 'Day 5',
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        eyebrow="How it works"
        title="The first business to respond usually gets the customer."
        description="This is the whole system, end to end — what happens on a missed call, what your customer experiences, and what lands on your desk afterward."
        primaryCta={{ label: 'Book a Free Demo', href: '/contact' }}
        secondaryCta={{ label: 'See pricing', href: '/pricing' }}
      />

      <HowItWorks />
      <ChatDemo />
      <BeforeAfter />
      <AutomationSection />

      <Section className="border-t border-surface-border/60">
        <SectionHeader
          eyebrow="Getting started"
          title="Live in about a week"
          description="You are not building anything. We configure it, you approve it, it turns on."
        />
        <Reveal className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {setupSteps.map((step) => (
            <Card key={step.title} className="h-full">
              <CardIcon>
                <Icon name={step.icon} />
              </CardIcon>
              <div className="text-xs font-medium uppercase tracking-wider text-signal-300">{step.duration}</div>
              <h3 className="mt-2 font-display text-lg text-ink">{step.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-ink-muted">{step.description}</p>
            </Card>
          ))}
        </Reveal>
        <p className="mx-auto mt-8 max-w-2xl text-center text-xs leading-relaxed text-ink-faint">
          Timeline assumes prompt access to your phone number and calendar. Business text messaging in the US also
          requires A2P 10DLC registration, which is carrier-controlled and can add a few days — we start it on day one.
        </p>
      </Section>

      <FinalCta />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: 'Home', path: '/' },
              { name: 'How It Works', path: '/how-it-works' },
            ]),
          ),
        }}
      />
    </>
  );
}
