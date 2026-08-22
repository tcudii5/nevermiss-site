import { NextResponse } from 'next/server';
import { demoRequestSchema, flattenErrors } from '@/lib/validation';
import { deliverLead, type LeadMeta } from '@/lib/gohighlevel';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Server-side lead intake. The browser never sees a GoHighLevel credential —
 * it posts here, and this route forwards using env vars.
 */
export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: 'Invalid request body.' }, { status: 400 });
  }

  const parsed = demoRequestSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, message: 'Please check the highlighted fields.', errors: flattenErrors(parsed.error) },
      { status: 422 },
    );
  }

  // Honeypot: silently accept so bots do not learn they were caught.
  if (parsed.data.company_website_url) {
    return NextResponse.json({ ok: true, delivered: true });
  }

  const meta: LeadMeta = readMeta(body, request);
  const result = await deliverLead(parsed.data, meta);

  if (!result.delivered && result.channel !== 'none') {
    console.error('[lead] delivery failed', result.reason);
    return NextResponse.json(
      {
        ok: false,
        message:
          'We could not submit your request just now. Please email us and we will get you scheduled right away.',
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, delivered: result.delivered });
}

function readMeta(body: unknown, request: Request): LeadMeta {
  const raw = (body ?? {}) as Record<string, unknown>;
  const meta = (raw.__meta ?? {}) as Record<string, string | undefined>;

  return {
    source: meta.source ?? 'Website — Book a Demo',
    path: meta.path ?? '/contact',
    referrer: meta.referrer || request.headers.get('referer') || undefined,
    utm: {
      source: meta.utm_source,
      medium: meta.utm_medium,
      campaign: meta.utm_campaign,
      term: meta.utm_term,
      content: meta.utm_content,
    },
  };
}
