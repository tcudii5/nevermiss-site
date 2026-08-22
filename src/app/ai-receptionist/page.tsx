import { PageHero } from '@/components/marketing/PageHero';
import { ChatDemo } from '@/components/marketing/ChatDemo';
import { FeatureGrid } from '@/components/marketing/FeatureGrid';
import { FinalCta } from '@/components/marketing/FinalCta';
import { Section, SectionHeader } from '@/components/ui/Section';
import { Faq } from '@/components/marketing/Faq';
import { Reveal } from '@/components/ui/Reveal';
import { Icon } from '@/components/ui/Icon';
import { receptionistFeatures } from '@/content/features';
import { faqs } from '@/content/faq';
import { buildMetadata, faqSchema, breadcrumbSchema } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'AI Receptionist for Service Businesses',
  description:
    'An AI receptionist that texts back missed callers in seconds, holds a real conversation, qualifies the lead, and books the appointment — 24/7, in your business’s name.',
  path: '/ai-receptionist',
});

const boundaries = [
  {
    title: 'It follows your rules',
    description:
      'You decide what it can discuss and what it must hand off. Pricing, diagnoses, warranty terms — anything you want off-limits stays off-limits.',
    icon: 'ShieldCheck',
  },
  {
    title: 'It never invents answers',
    description:
      'When it does not know something, it says so, captures the question, and flags a human. It does not guess at a price or a timeline.',
    icon: 'CircleHelp',
  },
  {
    title: 'It identifies itself honestly',
    description:
      'The messages come from your business, and it does not pretend to be something it is not when a customer asks.',
    icon: 'BadgeCheck',
  },
  {
    title: 'A human is always one tap away',
    description:
      'Every conversation is visible to your team in real time. Jump in whenever you want and the AI steps back immediately.',
    icon: 'Hand',
  },
];

const receptionistFaqs = faqs.slice(0, 8);

export default function AiReceptionistPage() {
  return (
    <>
      <PageHero
        eyebrow="AI receptionist"
        title="While you're on the job, your AI receptionist is working the leads."
        description="It picks up where voicemail fails: an immediate text, a real conversation, the questions you would have asked, and an appointment on the calendar before you get back to your truck."
        primaryCta={{ label: 'Book a Free Demo', href: '/contact' }}
        secondaryCta={{ label: 'See how it works', href: '/how-it-works' }}
      />

      <ChatDemo />

      <Section className="border-t border-surface-border/60">
        <SectionHeader
          eyebrow="Capabilities"
          title="Everything it handles between the missed call and the booked job"
        />
        <FeatureGrid features={receptionistFeatures} className="mt-14" />
      </Section>

      <Section className="border-t border-surface-border/60">
        <SectionHeader
          eyebrow="Guardrails"
          title="What it will not do"
          description="An AI talking to your customers is only useful if you can trust its limits. These are set during setup and enforced on every conversation."
        />
        <Reveal className="mt-14 grid gap-5 sm:grid-cols-2" stagger={0.07}>
          {boundaries.map((item) => (
            <div
              key={item.title}
              className="flex gap-4 rounded-2xl border border-surface-border bg-surface/50 p-6"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-signal-400/20 bg-signal-400/10 text-signal-300">
                <Icon name={item.icon} className="h-[1.125rem] w-[1.125rem]" />
              </div>
              <div>
                <h3 className="font-display text-base text-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{item.description}</p>
              </div>
            </div>
          ))}
        </Reveal>
      </Section>

      <Section className="border-t border-surface-border/60">
        <SectionHeader eyebrow="FAQ" title="About the AI receptionist" />
        <Faq items={receptionistFaqs} className="mt-12" />
      </Section>

      <FinalCta
        headline="Your phone is going to ring while you're busy today."
        body="The only question is whether anything happens after it stops."
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(receptionistFaqs)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: 'Home', path: '/' },
              { name: 'AI Receptionist', path: '/ai-receptionist' },
            ]),
          ),
        }}
      />
    </>
  );
}
