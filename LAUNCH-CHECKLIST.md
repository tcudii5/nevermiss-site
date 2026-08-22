# Launch checklist

Everything you need to provide to take this from working code to a live site
connected to your real accounts. Ordered by dependency.

---

## 1. Domain

- [ ] Buy/choose the domain
- [ ] In Netlify: **Domain management → Add a custom domain**, follow the DNS
      instructions (either point nameservers at Netlify, or add the CNAME/A
      records they show you)
- [ ] Set `NEXT_PUBLIC_SITE_URL=https://www.yourdomain.com` (no trailing slash)
      in Netlify environment variables, then **re-deploy**

> Until this is set, canonical URLs, Open Graph tags and `sitemap.xml` all point
> at `localhost`. This is the single most important variable.

---

## 2. Brand

- [ ] Company name + legal entity name → `src/content/site.config.ts`
- [ ] Logo file → `/public`, then update `src/components/layout/LogoMark.tsx`
- [ ] Real email, phone (display + E.164), business address, hours →
      `site.config.ts` (currently placeholders: `hello@example.com`,
      `(555) 010-0199`, a placeholder Baltimore address)
- [ ] Social profile URLs → `site.social` (empty entries are hidden automatically)
- [ ] Favicon: add `src/app/icon.png` (512×512) — Next.js picks it up automatically

---

## 3. GoHighLevel

Pick **one** delivery path.

**Option A — Inbound webhook (recommended)**

- [ ] Create a workflow with an **Inbound Webhook** trigger
- [ ] Copy the webhook URL → Netlify env var `GHL_WEBHOOK_URL`
- [ ] Add workflow actions: Create/Update Contact → Create Opportunity →
      Notify me → (optional) start your nurture sequence

**Option B — Direct API**

- [ ] Settings → Private Integrations → create a token with `contacts.write`
      and `opportunities.write` → `GHL_API_TOKEN`
- [ ] Sub-account/location ID → `GHL_LOCATION_ID`
- [ ] (Optional) pipeline + stage IDs → `GHL_PIPELINE_ID`,
      `GHL_PIPELINE_STAGE_ID`

**Both paths**

- [ ] Create custom fields in GHL matching the payload keys so they map onto the
      contact record: `industry`, `employees`, `monthly_leads`,
      `biggest_followup_problem`, `page_path`, `referrer`, `utm_source`,
      `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`, `submitted_at`
- [ ] Calendar → Share/Embed → copy the booking URL →
      `NEXT_PUBLIC_GHL_CALENDAR_URL`
- [ ] Client portal URL → `NEXT_PUBLIC_LOGIN_URL` (the nav "Login" link)
- [ ] Submit the live form once and confirm the contact lands in GHL

> Never commit any of these to git. `.env.local` is gitignored; set the real
> values in Netlify's environment variables UI.

---

## 4. Analytics

- [ ] GA4 measurement ID → `NEXT_PUBLIC_GA_MEASUREMENT_ID`
- [ ] Meta pixel ID → `NEXT_PUBLIC_META_PIXEL_ID`
- [ ] Google Ads ID → `NEXT_PUBLIC_GOOGLE_ADS_ID`
- [ ] Google Ads conversion label → `NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL`
- [ ] GHL location ID for its tracking script → `NEXT_PUBLIC_GHL_TRACKING_ID`
- [ ] Submit a test lead and confirm the conversion fires in each platform

Nothing loads until its ID is set, so you can add these one at a time.

---

## 5. Content decisions

- [ ] **Pricing** — edit amounts in `src/content/pricing.ts`, or set
      `NEXT_PUBLIC_PRICING_MODE=custom` to hide numbers entirely
- [ ] **Testimonials** — collect real quotes with written permission, add them to
      `src/content/testimonials.ts`, then set
      `NEXT_PUBLIC_SHOW_TESTIMONIALS=true`. The section stays hidden until then;
      do not add invented quotes or unverified result numbers.
- [ ] **Industries** — add or remove entries in `src/content/industries.ts`
- [ ] **FAQ** — review `src/content/faq.ts` and adjust to how you actually operate

---

## 6. Legal & compliance

- [ ] Have an attorney review `/privacy` and `/terms` against your real data
      practices and jurisdiction (both currently show a "template, not legal
      advice" banner — remove it once reviewed)
- [ ] Complete **A2P 10DLC registration** through your messaging provider before
      sending real customer texts. This is carrier-controlled and takes days.
- [ ] Confirm your consent capture, opt-out (STOP) handling and quiet-hours
      configuration in GHL
- [ ] Confirm the form's consent checkbox language matches what your attorney
      approves

---

## 7. Pre-launch verification

- [ ] `npm run build` passes
- [ ] Submit the demo form on the live site → contact appears in GHL
- [ ] Visit `/sitemap.xml` and `/robots.txt` on the live domain and confirm the
      URLs use your real domain
- [ ] Share a link in Slack/iMessage and confirm the OG card renders
- [ ] Test on a real phone, not just a resized browser window
- [ ] Submit the sitemap in Google Search Console
- [ ] Run Lighthouse against the deployed URL (local dev scores are not representative)

---

## Environment variable summary

| Variable | Required | Exposed to browser |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | **Yes** | Yes |
| `NEXT_PUBLIC_LOGIN_URL` | No | Yes |
| `NEXT_PUBLIC_PRICING_MODE` | No | Yes |
| `NEXT_PUBLIC_SHOW_TESTIMONIALS` | No | Yes |
| `NEXT_PUBLIC_GHL_CALENDAR_URL` | No | Yes (by design) |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | No | Yes |
| `NEXT_PUBLIC_META_PIXEL_ID` | No | Yes |
| `NEXT_PUBLIC_GOOGLE_ADS_ID` | No | Yes |
| `NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL` | No | Yes |
| `NEXT_PUBLIC_GHL_TRACKING_ID` | No | Yes |
| `GHL_WEBHOOK_URL` | One of these | **No — server only** |
| `GHL_API_TOKEN` | One of these | **No — server only** |
| `GHL_LOCATION_ID` | With API token | **No — server only** |
| `GHL_PIPELINE_ID` | No | **No — server only** |
| `GHL_PIPELINE_STAGE_ID` | No | **No — server only** |

Anything prefixed `NEXT_PUBLIC_` is inlined into the JavaScript bundle and
visible to anyone. Never use that prefix for a token or secret.
