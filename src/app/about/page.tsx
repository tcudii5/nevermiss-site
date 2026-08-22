import { PageHero } from '@/components/marketing/PageHero';
import { FinalCta } from '@/components/marketing/FinalCta';
import { Section, SectionHeader } from '@/components/ui/Section';
import { Card, CardIcon } from '@/components/ui/Card';
import { Reveal } from '@/components/ui/Reveal';
import { Icon } from '@/components/ui/Icon';
import { site } from '@/content/site.config';
import { buildMetadata, breadcrumbSchema } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'About',
  description: `Who ${site.name} is, who we build for, and how we work with service businesses on lead response and follow-up.`,
  path: '/about',
});

const principles = [
  {
    title: 'Speed is the product',
    description:
      'Everything we build serves one number: how long it takes for a customer to hear back. Features that do not move it are noise.',
    icon: 'Zap',
  },
  {
    title: 'Nothing pretends to be human',
    description:
      'The AI is helpful, honest about what it is, and hands off to a person the moment it should. We will not build a system that deceives your customers.',
    icon: 'ShieldCheck',
  },
  {
    title: 'We say what we do not know',
    description:
      'If your setup will be complicated, or a plan is not worth it for your volume, you hear that on the first call — not after you have paid.',
    icon: 'MessageSquareQuote',
  },
  {
    title: 'Built for the field, not the office',
    description:
      'The people using this are on ladders and under sinks. If it needs a manual, it is wrong.',
    icon: 'HardHat',
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="We built this for the businesses that can't sit by the phone."
        description="Service businesses lose real revenue to a problem nobody has time to fix: calls that go unanswered while everyone is doing the actual work."
        primaryCta={{ label: 'Book a Free Demo', href: '/contact' }}
      />

      <Section>
        <div className="mx-auto max-w-prose space-y-6 text-lead text-ink-muted">
          <p>
            Talk to any contractor long enough and the same story comes up. The phone rings during a job. It goes to
            voicemail. Sometimes they call back that evening, sometimes it slips. Either way, a good share of those
            callers already hired someone else — usually whoever answered first.
          </p>
          <p>
            It is not a marketing problem. Those leads were already generated and already paid for. They were lost in
            the gap between the call and the callback, which is the one part of the funnel most businesses have no
            system for at all.
          </p>
          <p>
            {site.name} exists to close that gap. An AI receptionist responds immediately, has a normal conversation,
            asks what you would ask, and puts a real appointment on your calendar. Behind it sits a CRM so nothing gets
            lost, and automations so follow-up happens whether or not anyone remembers.
          </p>
          <p>
            We are not trying to replace anyone on your team. We are trying to make sure the phone ringing while you
            are busy stops being a loss.
          </p>
        </div>
      </Section>

      <Section className="border-t border-surface-border/60">
        <SectionHeader eyebrow="How we work" title="What you can expect from us" />
        <Reveal className="mt-14 grid gap-5 sm:grid-cols-2" stagger={0.07}>
          {principles.map((principle) => (
            <Card key={principle.title} className="h-full">
              <CardIcon>
                <Icon name={principle.icon} />
              </CardIcon>
              <h3 className="font-display text-lg text-ink">{principle.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-ink-muted">{principle.description}</p>
            </Card>
          ))}
        </Reveal>
      </Section>

      <Section className="border-t border-surface-border/60" spacing="sm">
        <div className="rounded-3xl border border-surface-border bg-canvas-raised/70 p-8 sm:p-10">
          <h2 className="font-display text-display-sm text-ink">How to reach us</h2>
          <dl className="mt-7 grid gap-6 sm:grid-cols-3">
            <div>
              <dt className="text-xs font-medium uppercase tracking-wider text-ink-faint">Email</dt>
              <dd className="mt-2">
                <a href={`mailto:${site.contact.email}`} className="text-ink transition-colors hover:text-signal-300">
                  {site.contact.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase tracking-wider text-ink-faint">Phone</dt>
              <dd className="mt-2">
                <a href={`tel:${site.contact.phoneHref}`} className="text-ink transition-colors hover:text-signal-300">
                  {site.contact.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase tracking-wider text-ink-faint">Hours</dt>
              <dd className="mt-2 text-ink-muted">{site.contact.hours}</dd>
            </div>
          </dl>
        </div>
      </Section>

      <FinalCta />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: 'Home', path: '/' },
              { name: 'About', path: '/about' },
            ]),
          ),
        }}
      />
    </>
  );
}
