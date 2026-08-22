'use client';

/**
 * Client-side conversion helpers. Every call is a no-op when the matching
 * script was never loaded, so nothing breaks on an unconfigured site.
 */
type Gtag = (...args: unknown[]) => void;

declare global {
  interface Window {
    gtag?: Gtag;
    fbq?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

/** Fired when a visitor successfully submits the demo request form. */
export function trackDemoRequest(detail: { industry: string }) {
  const adsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
  const label = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL;

  if (typeof window === 'undefined') return;

  window.gtag?.('event', 'generate_lead', {
    event_category: 'demo',
    event_label: detail.industry,
  });

  if (adsId && label) {
    window.gtag?.('event', 'conversion', { send_to: `${adsId}/${label}` });
  }

  window.fbq?.('track', 'Lead', { content_category: detail.industry });
}

/** Generic interaction event — used by the ROI calculator CTA. */
export function trackEvent(name: string, params: Record<string, unknown> = {}) {
  if (typeof window === 'undefined') return;
  window.gtag?.('event', name, params);
}
