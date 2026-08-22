import { notFound } from 'next/navigation';
import { PageHero } from '@/components/marketing/PageHero';
import { ChatDemo } from '@/components/marketing/ChatDemo';
import { IndustryGrid } from '@/components/marketing/IndustryGrid';
import { RoiCalculator } from '@/components/marketing/RoiCalculator';
import { FinalCta } from '@/components/marketing/FinalCta';
import { FeatureGrid } from '@/components/marketing/FeatureGrid';
import { Section, SectionHeader } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { Icon } from '@/components/ui/Icon';
import { industries, getIndustry } from '@/content/industries';
import { receptionistFeatures } from '@/content/features';
import { buildMetadata, breadcrumbSchema } from '@/lib/seo';

/**
 * REUSABLE INDUSTRY TEMPLATE
 * Every industry page is generated from this one file. To add an industry,
 * append an entry to src/content/industries.ts — a static route, metadata and
 * sitemap entry are produced automatically.
 */
export function generateStaticParams() {
  return industries.map((industry) => ({ slug: industry.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) return buildMetadata({ title: 'Industry not found', description: '', noIndex: true });

  return buildMetadata({
    title: `AI Receptionist for ${industry.name} Businesses`,
    description: `${industry.hook} Missed-call text back, lead qualification, appointment booking and automated follow-up built for ${industry.name.toLowerCase()} companies.`,
    path: `/industries/${industry.slug}`,
  });
}

export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const industry = getIndustry(slug);

  if (!industry) notFound();

  return (
    <>
      <PageHero
        eyebrow={industry.name}
        title={industry.headline}
        description={industry.subhead}
        primaryCta={{ label: 'Book a Free Demo', href: '/contact' }}
        secondaryCta={{ label: 'See how it works', href: '/how-it-works' }}
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <h2 className="font-display text-display-sm text-ink">What it costs you today</h2>
            <ul className="mt-7 space-y-4">
              {industry.painPoints.map((point) => (
                <li key={point} className="flex gap-3.5 text-ink-muted">
                  <Icon name="X" className="mt-1 h-4 w-4 shrink-0 text-red-400/80" />
                  <span className="leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-signal-400/25 bg-gradient-to-b from-signal-400/[0.08] to-canvas-raised p-7 sm:p-8">
            <h2 className="font-display text-display-sm text-ink">What your AI asks callers</h2>
            <p className="mt-3 text-sm text-ink-muted">
              Written for {industry.name.toLowerCase()} work, and editable any time.
            </p>
            <ul className="mt-7 space-y-3.5">
              {industry.qualifyingQuestions.map((question) => (
                <li key={question} className="flex gap-3 text-sm leading-relaxed text-ink">
                  <Icon name="MessageSquareText" className="mt-0.5 h-4 w-4 shrink-0 text-signal-400" />
                  {question}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Reveal className="mt-12">
          <div className="rounded-3xl border border-surface-border bg-canvas-raised/70 p-7 sm:p-9">
            <div className="text-xs font-medium uppercase tracking-[0.14em] text-ink-faint">
              Sample first message · {industry.name}
            </div>
            <p className="mt-5 max-w-2xl rounded-2xl rounded-bl-md bg-signal-500 px-5 py-4 text-[0.9375rem] leading-relaxed text-canvas-sunken">
              {industry.sampleText}
            </p>
            <p className="mt-4 text-xs text-ink-faint">Sent automatically, seconds after the call goes unanswered.</p>
          </div>
        </Reveal>
      </Section>

      <Section className="border-t border-surface-border/60" spacing="sm">
        <SectionHeader
          eyebrow="Automations"
          title={`The campaigns that matter most in ${industry.name.toLowerCase()}`}
        />
        <Reveal className="mt-12 grid gap-5 sm:grid-cols-3">
          {industry.keyAutomations.map((automation, index) => (
            <div key={automation} className="rounded-2xl border border-surface-border bg-surface/50 p-6">
              <span className="font-mono text-xs text-signal-400">{String(index + 1).padStart(2, '0')}</span>
              <div className="mt-2.5 font-display text-base leading-snug text-ink">{automation}</div>
            </div>
          ))}
        </Reveal>
      </Section>

      <ChatDemo />

      <Section className="border-t border-surface-border/60">
        <SectionHeader eyebrow="Capabilities" title="What's included" />
        <FeatureGrid features={receptionistFeatures.slice(0, 4)} className="mt-14" />
      </Section>

      <RoiCalculator />

      <Section className="border-t border-surface-border/60" spacing="sm">
        <SectionHeader eyebrow="More industries" title="Other trades we set this up for" />
        <IndustryGrid className="mt-12" limit={3} exclude={industry.slug} />
      </Section>

      <FinalCta />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: 'Home', path: '/' },
              { name: 'Industries', path: '/industries' },
              { name: industry.name, path: `/industries/${industry.slug}` },
            ]),
          ),
        }}
      />
    </>
  );
}
