# NeverMiss — AI Receptionist + CRM Website

Production-ready marketing site for an AI receptionist / CRM automation business
serving local service companies. Built with Next.js 15 (App Router), React 19,
TypeScript and Tailwind CSS.

> **`NeverMiss` is a placeholder brand name.** See [Renaming the brand](#renaming-the-brand).

---

## Quick start

```bash
npm install
cp .env.example .env.local   # fill in what you have; everything is optional for local dev
npm run dev                  # http://localhost:3000
```

Other scripts:

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Production build |
| `npm start` | Serve the production build locally |
| `npm run lint` | ESLint (next/core-web-vitals + TypeScript rules) |
| `npm run typecheck` | `tsc --noEmit` |

The site runs fully without any credentials. Unconfigured integrations render an
honest placeholder rather than pretending to be connected.

---

## Project structure

```
src/
├── app/                      # Routes (App Router)
│   ├── layout.tsx            # Root shell: fonts, nav, footer, schema, analytics
│   ├── page.tsx              # Home
│   ├── how-it-works/
│   ├── ai-receptionist/
│   ├── crm-automation/
│   ├── industries/
│   │   ├── page.tsx          # Index
│   │   └── [slug]/page.tsx   # Reusable industry template (all industries)
│   ├── pricing/  about/  contact/  privacy/  terms/
│   ├── api/lead/route.ts     # Server-side lead intake → GoHighLevel
│   ├── opengraph-image.tsx   # Generated 1200×630 social card
│   ├── sitemap.ts            # Auto-includes every industry page
│   ├── robots.ts
│   └── not-found.tsx
│
├── components/
│   ├── layout/               # Navbar, Footer, LogoMark, LegalPage
│   ├── ui/                   # Button, Card, Section, Reveal, Icon
│   ├── marketing/            # Hero, FlowDemo, ChatDemo, CrmDashboard,
│   │                         # RoiCalculator, PricingTable, Faq, …
│   ├── forms/                # DemoForm, Field
│   └── integrations/         # CalendarEmbed, Analytics
│
├── content/                  # ← EDIT COPY AND DATA HERE (no JSX required)
│   ├── site.config.ts        # Brand, contact details, nav, feature switches
│   ├── features.ts           # Feature cards, problems, how-it-works steps
│   ├── industries.ts         # Industry pages (add one = add an object)
│   ├── pricing.ts            # Plans and amounts
│   ├── faq.ts                # FAQ (also powers FAQPage schema)
│   ├── automations.ts        # Workflows + CRM sample data
│   ├── chat-demo.ts          # Scripted SMS conversation + hero flow
│   └── testimonials.ts       # Empty by design — see below
│
└── lib/
    ├── gohighlevel.ts        # Server-only GHL delivery (webhook or API)
    ├── validation.ts         # Zod schema shared by client + server
    ├── seo.ts                # Metadata builders + JSON-LD schema
    ├── analytics.ts          # Client conversion helpers
    └── utils.ts
```

### Design system

Defined once in `tailwind.config.ts`:

- **Palette** — `canvas` (near-black navy), `surface` (layered panels),
  `signal` (mint accent = connected/answered/won), `ion` (periwinkle, gradients
  only), `ink` (text: default / muted / faint).
- **Type** — Inter (body) + Inter Tight (display) via `next/font`. Fluid
  `display-xl → display-sm` scale using `clamp()`.
- **Spacing** — Tailwind's 4px base; section rhythm lives in `<Section spacing>`.
- **Breakpoints** — Tailwind defaults, mobile-first.

All body text meets WCAG AA contrast (verified in-browser at 4.5:1 for normal
text, 3:1 for large).

---

## Renaming the brand

Everything flows from one file. Edit `src/content/site.config.ts`:

```ts
name: 'NeverMiss',              // nav, footer, page titles, OG image
legalName: 'NeverMiss AI, LLC', // copyright line, legal pages
```

Then swap the mark in `src/components/layout/LogoMark.tsx` — replace the inline
`<svg>` with an `<Image>` pointing at your asset in `/public`. The sizing
wrapper stays as-is.

---

## Feature switches

Set these in `.env.local` (dev) or Netlify environment variables (production).

| Variable | Effect |
| --- | --- |
| `NEXT_PUBLIC_PRICING_MODE=custom` | Hides all dollar amounts; every tier shows **Custom Pricing** and the monthly/annual toggle disappears. |
| `NEXT_PUBLIC_SHOW_TESTIMONIALS=true` | Shows the testimonial section — **only** once `src/content/testimonials.ts` has real entries. |
| `NEXT_PUBLIC_LOGIN_URL` | Where the nav "Login" link points (your GHL client portal). |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL. Required in production for correct canonicals, OG tags and sitemap. |

### About testimonials

`src/content/testimonials.ts` ships as an **empty array**, and the section
renders nothing while it is empty. No placeholder quotes, fake names or invented
result numbers appear anywhere on the site. Fabricated testimonials and
unsubstantiated performance claims are treated as deceptive advertising by the
FTC — add only real, permission-granted quotes.

The same principle applies elsewhere: the CRM dashboard is labeled **Example
data**, and the ROI calculator carries an explicit estimates-not-projections
disclaimer.

---

## Adding an industry page

Append one object to `src/content/industries.ts`:

```ts
{
  slug: 'pest-control',
  name: 'Pest Control',
  hook: 'Book treatments while your techs are on site.',
  icon: 'Bug',                      // any lucide-react icon name
  headline: '…',
  subhead: '…',
  painPoints: ['…'],
  qualifyingQuestions: ['…'],
  sampleText: '…',
  keyAutomations: ['…'],
}
```

You get, automatically: a card on `/industries`, a full page at
`/industries/pest-control`, page metadata, breadcrumb schema, and a sitemap entry.

**One extra step:** icons are imported explicitly in
`src/components/ui/Icon.tsx` (a namespace import would ship the entire ~600 kB
icon set to the browser). Add your new icon name to both the import list and the
`registry` map there.

---

## GoHighLevel integration

All GHL credentials are **server-side only**. The browser posts to
`/api/lead`, which forwards using environment variables. No token, secret or
location ID is ever exposed in client code — `src/lib/gohighlevel.ts` imports
`server-only`, so the build fails if it is ever pulled into a client component.

### Option A — Inbound webhook (recommended)

1. GoHighLevel → **Automation → Workflows → Create Workflow**
2. Add trigger **Inbound Webhook**, copy the URL
3. Set `GHL_WEBHOOK_URL` to it
4. Add workflow actions: Create/Update Contact → Create Opportunity → Notify me

Simplest path, no API token, and you control the downstream logic visually.

### Option B — Direct API

1. GoHighLevel → **Settings → Private Integrations → Create**
2. Scopes: `contacts.write`, `opportunities.write`
3. Set `GHL_API_TOKEN` and `GHL_LOCATION_ID`
4. Optionally set `GHL_PIPELINE_ID` + `GHL_PIPELINE_STAGE_ID` to also create an
   opportunity in a pipeline stage

If **neither** is configured, submissions return `delivered: false` and the full
payload is written to the server log, so nothing is lost during setup — and the
code does not claim a delivery that did not happen.

### Payload sent to GoHighLevel

Contact fields (`firstName`, `lastName`, `email`, `phone`, `companyName`,
`website`), tags (`website-demo-request`, `industry:<value>`), and custom fields:
`industry`, `employees`, `monthly_leads`, `biggest_followup_problem`,
`page_path`, `referrer`, `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`,
`utm_content`, `submitted_at`.

Create matching custom fields in GHL (**Settings → Custom Fields**) to have them
map cleanly onto the contact record.

### Calendar embed

`src/components/integrations/CalendarEmbed.tsx` renders a labeled placeholder
until you set `NEXT_PUBLIC_GHL_CALENDAR_URL`:

```
GoHighLevel → Calendars → (your calendar) → Share/Embed → copy the src URL
https://api.leadconnectorhq.com/widget/booking/XXXXXXXXXXXX
```

This URL is public by design (visitors load it), so `NEXT_PUBLIC_` is correct
here. Never put an API token in it.

---

## Analytics

Each script loads **only** when its ID is present, so an unconfigured site ships
zero third-party tags.

| Variable | Provider |
| --- | --- |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Google Analytics 4 (`G-…`) |
| `NEXT_PUBLIC_GOOGLE_ADS_ID` | Google Ads (`AW-…`) |
| `NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL` | Google Ads conversion label |
| `NEXT_PUBLIC_META_PIXEL_ID` | Meta pixel |
| `NEXT_PUBLIC_GHL_TRACKING_ID` | GoHighLevel location ID |

Conversion events fire from `src/lib/analytics.ts`:

- `generate_lead` (GA4) + `conversion` (Google Ads) + `Lead` (Meta) on
  successful demo form submission
- `roi_calculator_cta` when the calculator CTA is clicked

---

## SEO

- Per-page `title`, `description`, canonical, Open Graph and Twitter card via
  `buildMetadata()` in `src/lib/seo.ts`
- Generated OG image at `/opengraph-image` (1200×630)
- `sitemap.xml` and `robots.txt` generated at build, industry pages included
- JSON-LD: `ProfessionalService` (root layout), `FAQPage` (home, pricing,
  AI receptionist), `BreadcrumbList` (all inner pages)
- Semantic HTML, one `<h1>` per page, no heading-level skips
- `/privacy` and `/terms` are indexable; `/api/*` is disallowed

**Before launch:** set `NEXT_PUBLIC_SITE_URL` to your real domain, or every
canonical and OG URL will point at `localhost`.

---

## Performance & accessibility

- ~105 kB shared First Load JS; heaviest route ~176 kB
- Explicit icon imports (namespace import cost ~150 kB extra — avoided)
- `next/font` self-hosts Inter with `display: swap`, no layout shift
- Skip-to-content link; visible focus rings on all interactive elements
- Full keyboard support: arrow-key tablist in How It Works, Escape closes menus,
  focus moves to the first invalid field on form error
- `prefers-reduced-motion` respected — every animation renders in its final
  state with no transition
- Wide content (CRM board, workflow rail) scrolls inside its own container; the
  page body never scrolls horizontally
- All body text meets WCAG AA contrast

---

## Deployment (Netlify)

`netlify.toml` is committed and sets the build command, Node 22, security
headers and long-cache rules for immutable assets. Netlify auto-detects Next.js
and installs its runtime plugin, so App Router routes, the `/api/lead` function
and the generated sitemap all work with no extra setup.

1. Netlify → **Add new site → Import an existing project → GitHub**
2. Pick this repository. Build settings are read from `netlify.toml`.
3. **Site configuration → Environment variables** — add your values from
   `.env.example`. At minimum set `NEXT_PUBLIC_SITE_URL`.
4. Deploy.
5. **Domain management → Add a custom domain**, then point DNS at Netlify.
   HTTPS is provisioned automatically.

Re-deploy after changing any `NEXT_PUBLIC_*` variable — those are inlined at
build time, so a running site will not pick them up until it rebuilds.

---

## Compliance note

US business text messaging requires **A2P 10DLC registration** through the
carriers, and marketing or re-engagement messages carry consent obligations
under the **TCPA** that differ from simply replying to someone who just called
you. The site's copy reflects this honestly rather than glossing over it. Handle
registration and consent capture before sending real customer messages.

The Privacy Policy and Terms of Service are **starting templates, not legal
advice** — both carry a visible banner saying so. Have an attorney review them
against your actual data practices and jurisdiction before launch.
