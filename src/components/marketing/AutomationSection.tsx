import { Section, SectionHeader } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { Reveal, revealChild } from '@/components/ui/Reveal';
import { Icon } from '@/components/ui/Icon';
import { MotionItem } from './MotionItem';
import { automationTracks, primaryWorkflow } from '@/content/automations';

export function AutomationSection() {
  return (
    <Section id="automation" className="border-t border-surface-border/60">
      <SectionHeader
        eyebrow="Automation"
        title="Your follow-up runs even when you don't."
        description="The sequences every business means to run and almost none actually do — because they depend on somebody remembering."
      />

      {/* Primary workflow */}
      <Reveal className="mt-14">
        <div className="rounded-3xl border border-surface-border bg-canvas-raised/70 p-6 sm:p-8">
          <div className="mb-6 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.14em] text-ink-faint">
            <Icon name="Workflow" className="h-3.5 w-3.5 text-signal-400" />
            Standard new-lead workflow
          </div>
          <ol className="no-scrollbar flex snap-x items-stretch gap-2 overflow-x-auto pb-2">
            {primaryWorkflow.map((step, index) => (
              <li key={step} className="flex snap-start items-center gap-2">
                <div className="flex h-full min-w-[9.5rem] flex-col justify-center rounded-xl border border-surface-border bg-surface/60 px-4 py-3.5">
                  <span className="font-mono text-[0.625rem] text-signal-400">{String(index + 1).padStart(2, '0')}</span>
                  <span className="mt-1 text-sm font-medium leading-snug text-ink">{step}</span>
                </div>
                {index < primaryWorkflow.length - 1 ? (
                  <Icon name="ChevronRight" className="h-4 w-4 shrink-0 text-ink-faint" />
                ) : null}
              </li>
            ))}
          </ol>
        </div>
      </Reveal>

      {/* Campaign library */}
      <Reveal className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
        {automationTracks.map((track) => (
          <MotionItem key={track.slug} variants={revealChild} className="h-full">
            <Card interactive className="flex h-full flex-col">
              <div className="flex items-start justify-between gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-ion-400/20 bg-ion-500/10 text-ion-300">
                  <Icon name={track.icon} className="h-[1.125rem] w-[1.125rem]" />
                </div>
              </div>
              <h3 className="mt-5 font-display text-lg text-ink">{track.name}</h3>
              <p className="mt-1.5 text-xs uppercase tracking-wider text-signal-300/90">Trigger: {track.trigger}</p>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">{track.description}</p>
              <ul className="mt-5 space-y-2 border-t border-surface-border pt-5">
                {track.steps.map((step) => (
                  <li key={step} className="flex items-start gap-2.5 text-xs text-ink-muted">
                    <Icon name="ArrowRight" className="mt-0.5 h-3 w-3 shrink-0 text-ink-faint" />
                    {step}
                  </li>
                ))}
              </ul>
            </Card>
          </MotionItem>
        ))}
      </Reveal>
    </Section>
  );
}
