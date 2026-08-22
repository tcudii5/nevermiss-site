import { Container } from '@/components/ui/Section';
import { Icon } from '@/components/ui/Icon';

/** Shared shell + prose styling for Privacy and Terms. */
export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <article className="py-16 sm:py-20">
      <Container>
        <div className="mx-auto max-w-prose">
          <h1 className="font-display text-display-md text-ink">{title}</h1>
          <p className="mt-3 text-sm text-ink-faint">Last updated: {updated}</p>

          <div className="mt-8 flex gap-3 rounded-2xl border border-amber-400/25 bg-amber-400/[0.06] p-4">
            <Icon name="Info" className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" />
            <p className="text-xs leading-relaxed text-amber-100/85">
              This document is a starting template, not legal advice. Have a qualified attorney review and adapt it for
              your business, your jurisdiction and your actual data practices before you rely on it.
            </p>
          </div>

          <div className="legal mt-10 space-y-8">{children}</div>
        </div>
      </Container>
    </article>
  );
}

export function LegalSection({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-display text-xl text-ink">{heading}</h2>
      <div className="mt-3 space-y-3 text-[0.9375rem] leading-relaxed text-ink-muted [&_a]:text-signal-300 [&_a:hover]:text-signal-200 [&_li]:pl-1 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5">
        {children}
      </div>
    </section>
  );
}
