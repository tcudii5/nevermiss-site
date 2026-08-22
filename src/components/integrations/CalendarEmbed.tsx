import { Icon } from '@/components/ui/Icon';

/**
 * GOHIGHLEVEL CALENDAR EMBED
 * ==========================
 * Set NEXT_PUBLIC_GHL_CALENDAR_URL to your calendar's embed URL and this
 * component swaps the placeholder for the live booking widget.
 *
 * Where to find it:
 *   GoHighLevel → Calendars → (your calendar) → Share/Embed
 *   Copy the src URL, which looks like:
 *   https://api.leadconnectorhq.com/widget/booking/XXXXXXXXXXXXXXX
 *
 * The URL is public by design (it is what visitors load), so NEXT_PUBLIC_ is
 * the correct prefix here. Never put an API token in this variable.
 *
 * If you prefer GHL's own resizing script, add this to the page and drop the
 * iframe height class:
 *   <script src="https://link.msgsndr.com/js/form_embed.js" />
 */
export function CalendarEmbed() {
  const calendarUrl = process.env.NEXT_PUBLIC_GHL_CALENDAR_URL;

  if (!calendarUrl) {
    return (
      <div className="rounded-3xl border border-dashed border-surface-border bg-canvas-raised/50 p-8 text-center sm:p-12">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-surface-border bg-canvas text-ink-faint">
          <Icon name="CalendarPlus" className="h-5 w-5" />
        </div>
        <h3 className="mt-5 font-display text-lg text-ink">Calendar not connected yet</h3>
        <p className="mx-auto mt-2.5 max-w-md text-sm leading-relaxed text-ink-muted">
          This is where your GoHighLevel booking calendar will appear. Until it&rsquo;s connected, the form above is
          the live path — submissions still reach you.
        </p>
        <p className="mx-auto mt-4 max-w-md rounded-xl border border-surface-border bg-canvas-sunken/70 p-3 font-mono text-[0.6875rem] leading-relaxed text-ink-faint">
          Set NEXT_PUBLIC_GHL_CALENDAR_URL to your calendar embed URL
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-surface-border bg-canvas-raised">
      <iframe
        src={calendarUrl}
        title="Book a demo — select a time"
        className="h-[46rem] w-full border-0"
        loading="lazy"
        scrolling="no"
      />
    </div>
  );
}
