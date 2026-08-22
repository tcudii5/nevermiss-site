import 'server-only';
import type { DemoRequest } from './validation';

/**
 * GOHIGHLEVEL INTEGRATION LAYER
 * =============================
 * This module runs SERVER-SIDE ONLY (`server-only` above will fail the build
 * if it is ever imported into a client component). No credential in this file
 * is exposed to the browser.
 *
 * Configure in .env.local (dev) and in Netlify → Site settings → Environment
 * variables (production). See .env.example and README.md for how to obtain each.
 *
 *   GHL_WEBHOOK_URL        Inbound Webhook trigger URL from a GHL workflow.
 *                          Simplest path — no API token needed.
 *   GHL_API_TOKEN          Private Integration token (Settings → Private
 *                          Integrations). Only needed for the direct API path.
 *   GHL_LOCATION_ID        Your sub-account / location ID.
 *   GHL_PIPELINE_ID        Pipeline to create the opportunity in (optional).
 *   GHL_PIPELINE_STAGE_ID  Stage within that pipeline (optional).
 *
 * Delivery strategy:
 *   1. If GHL_WEBHOOK_URL is set → POST the payload there. Recommended.
 *   2. Else if GHL_API_TOKEN + GHL_LOCATION_ID are set → create the contact
 *      via the v2 API (and an opportunity when pipeline IDs are provided).
 *   3. Else → the route logs the submission and returns `delivered: false`
 *      so the UI can tell the truth instead of pretending it was sent.
 */

const GHL_API_BASE = 'https://services.leadconnectorhq.com';
const GHL_API_VERSION = '2021-07-28';

export type DeliveryResult = {
  delivered: boolean;
  channel: 'webhook' | 'api' | 'none';
  /** Present when delivery failed or was skipped. Never shown to the user verbatim. */
  reason?: string;
  contactId?: string;
};

export function integrationStatus() {
  return {
    webhookConfigured: Boolean(process.env.GHL_WEBHOOK_URL),
    apiConfigured: Boolean(process.env.GHL_API_TOKEN && process.env.GHL_LOCATION_ID),
    pipelineConfigured: Boolean(process.env.GHL_PIPELINE_ID && process.env.GHL_PIPELINE_STAGE_ID),
  };
}

function toPayload(data: DemoRequest, meta: LeadMeta) {
  return {
    firstName: data.firstName,
    lastName: data.lastName,
    name: `${data.firstName} ${data.lastName}`,
    email: data.email,
    phone: data.phone,
    companyName: data.businessName,
    website: data.website || undefined,
    source: meta.source,
    tags: ['website-demo-request', `industry:${data.industry.toLowerCase()}`],
    customFields: {
      industry: data.industry,
      employees: data.employees,
      monthly_leads: data.monthlyLeads,
      biggest_followup_problem: data.challenge || '',
      page_path: meta.path,
      referrer: meta.referrer ?? '',
      utm_source: meta.utm.source ?? '',
      utm_medium: meta.utm.medium ?? '',
      utm_campaign: meta.utm.campaign ?? '',
      utm_term: meta.utm.term ?? '',
      utm_content: meta.utm.content ?? '',
      submitted_at: new Date().toISOString(),
    },
  };
}

export type LeadMeta = {
  source: string;
  path: string;
  referrer?: string;
  utm: {
    source?: string;
    medium?: string;
    campaign?: string;
    term?: string;
    content?: string;
  };
};

async function postWebhook(payload: unknown): Promise<DeliveryResult> {
  const url = process.env.GHL_WEBHOOK_URL!;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    // Never let a slow third party hang the request.
    signal: AbortSignal.timeout(10_000),
  });

  if (!res.ok) {
    return { delivered: false, channel: 'webhook', reason: `Webhook responded ${res.status}` };
  }
  return { delivered: true, channel: 'webhook' };
}

async function createViaApi(data: DemoRequest, payload: ReturnType<typeof toPayload>): Promise<DeliveryResult> {
  const token = process.env.GHL_API_TOKEN!;
  const locationId = process.env.GHL_LOCATION_ID!;

  const headers = {
    Authorization: `Bearer ${token}`,
    Version: GHL_API_VERSION,
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  const contactRes = await fetch(`${GHL_API_BASE}/contacts/upsert`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      locationId,
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
      phone: payload.phone,
      companyName: payload.companyName,
      website: payload.website,
      source: payload.source,
      tags: payload.tags,
    }),
    signal: AbortSignal.timeout(10_000),
  });

  if (!contactRes.ok) {
    return { delivered: false, channel: 'api', reason: `Contact upsert responded ${contactRes.status}` };
  }

  const contactJson = (await contactRes.json()) as { contact?: { id?: string } };
  const contactId = contactJson.contact?.id;

  const pipelineId = process.env.GHL_PIPELINE_ID;
  const stageId = process.env.GHL_PIPELINE_STAGE_ID;

  if (contactId && pipelineId && stageId) {
    // Opportunity creation is best-effort: the contact already landed, so a
    // pipeline failure should not read as a failed submission to the visitor.
    try {
      await fetch(`${GHL_API_BASE}/opportunities/`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          locationId,
          contactId,
          pipelineId,
          pipelineStageId: stageId,
          name: `${data.businessName} — demo request`,
          status: 'open',
        }),
        signal: AbortSignal.timeout(10_000),
      });
    } catch (error) {
      console.error('[ghl] opportunity creation failed', error);
    }
  }

  return { delivered: true, channel: 'api', contactId };
}

export async function deliverLead(data: DemoRequest, meta: LeadMeta): Promise<DeliveryResult> {
  const payload = toPayload(data, meta);

  try {
    if (process.env.GHL_WEBHOOK_URL) {
      return await postWebhook(payload);
    }

    if (process.env.GHL_API_TOKEN && process.env.GHL_LOCATION_ID) {
      return await createViaApi(data, payload);
    }
  } catch (error) {
    console.error('[ghl] delivery failed', error);
    return {
      delivered: false,
      channel: process.env.GHL_WEBHOOK_URL ? 'webhook' : 'api',
      reason: error instanceof Error ? error.message : 'Unknown error',
    };
  }

  // Nothing configured yet. Log it so submissions during setup are recoverable
  // from the Netlify function log rather than lost silently.
  console.warn(
    '[ghl] No GoHighLevel credentials configured — submission captured in logs only:',
    JSON.stringify({ ...payload, customFields: payload.customFields }),
  );
  return { delivered: false, channel: 'none', reason: 'not-configured' };
}
