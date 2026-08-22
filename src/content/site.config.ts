/**
 * SINGLE SOURCE OF TRUTH for brand + business details.
 * Rename the company, swap contact details, or flip pricing display here —
 * every page reads from this file.
 */
export const site = {
  name: 'SBC Media',

  /**
   * Legal entity name — used in the copyright line, Privacy Policy and Terms.
   * Deliberately has NO entity suffix: the LLC is still in formation, and
   * asserting "LLC" before registration is a misrepresentation. Change this to
   * the exact registered name (e.g. "SBC Media LLC") once the filing clears.
   */
  legalName: 'SBC Media',

  tagline: 'Never Let Another Lead Slip Away.',
  description:
    'An AI receptionist that answers missed calls by text in seconds, qualifies the lead, books the appointment, and files everything in your CRM — built for service businesses.',

  /** Set NEXT_PUBLIC_SITE_URL in .env / Netlify. Falls back for local dev. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',

  contact: {
    email: 'hello@example.com',
    phone: '(555) 010-0199',
    /** E.164 form, used for tel: links and schema. */
    phoneHref: '+15550100199',
    address: {
      street: '123 Main Street, Suite 200',
      city: 'Baltimore',
      region: 'MD',
      postalCode: '21201',
      country: 'US',
    },
    hours: 'Mon–Fri, 9am–6pm ET (the AI receptionist runs 24/7)',
  },

  social: {
    linkedin: '',
    facebook: '',
    instagram: '',
    youtube: '',
  },

  /** Where the "Login" nav item points — your GoHighLevel client portal. */
  loginUrl: process.env.NEXT_PUBLIC_LOGIN_URL ?? 'https://app.gohighlevel.com/',

  /**
   * PRICING DISPLAY SWITCH
   * 'numbers'  → show the dollar amounts defined in content/pricing.ts
   * 'custom'   → hide amounts, show "Custom Pricing" on every tier
   * Override without a code change via NEXT_PUBLIC_PRICING_MODE.
   */
  pricingMode: (process.env.NEXT_PUBLIC_PRICING_MODE ?? 'numbers') as 'numbers' | 'custom',

  /**
   * SOCIAL PROOF SWITCH
   * Testimonials are hidden until you have real, permission-granted quotes.
   * Set NEXT_PUBLIC_SHOW_TESTIMONIALS=true only after filling content/testimonials.ts.
   */
  showTestimonials: process.env.NEXT_PUBLIC_SHOW_TESTIMONIALS === 'true',

  /** Global CTA copy — keep consistent everywhere. */
  cta: {
    primary: { label: 'Book a Free Demo', href: '/contact' },
    secondary: { label: 'See How It Works', href: '/how-it-works' },
  },
} as const;

export const nav = {
  primary: [
    { label: 'How It Works', href: '/how-it-works' },
    {
      label: 'Solutions',
      href: '/ai-receptionist',
      children: [
        { label: 'AI Receptionist', href: '/ai-receptionist', description: 'Answers missed calls by text in seconds.' },
        { label: 'CRM & Automation', href: '/crm-automation', description: 'Every lead tracked, every follow-up automatic.' },
      ],
    },
    { label: 'Industries', href: '/industries' },
    { label: 'Pricing', href: '/pricing' },
  ],
  footer: {
    Product: [
      { label: 'AI Receptionist', href: '/ai-receptionist' },
      { label: 'CRM & Automation', href: '/crm-automation' },
      { label: 'How It Works', href: '/how-it-works' },
      { label: 'Pricing', href: '/pricing' },
    ],
    Industries: [
      { label: 'Plumbing', href: '/industries/plumbing' },
      { label: 'HVAC', href: '/industries/hvac' },
      { label: 'Electrical', href: '/industries/electrical' },
      { label: 'All industries', href: '/industries' },
    ],
    Company: [
      { label: 'About', href: '/about' },
      { label: 'Book a Demo', href: '/contact' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
    ],
  },
} as const;
