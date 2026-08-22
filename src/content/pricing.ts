/**
 * PRICING
 * Amounts below are PLACEHOLDERS. Edit `monthly`, `annual` and `setup` freely.
 * To hide all numbers and show "Custom Pricing" instead, set
 * NEXT_PUBLIC_PRICING_MODE=custom (see content/site.config.ts).
 */
export type Plan = {
  slug: string;
  name: string;
  tagline: string;
  monthly: number;
  annual: number;
  setup: number;
  featured?: boolean;
  badge?: string;
  inherits?: string;
  features: string[];
  cta: { label: string; href: string };
};

export const plans: Plan[] = [
  {
    slug: 'starter',
    name: 'Starter',
    tagline: 'For small businesses that want instant lead response.',
    monthly: 297,
    annual: 2970,
    setup: 497,
    features: [
      'Missed-call text back',
      'Full CRM with contact records',
      'Basic automations',
      'Lead notifications to your phone',
      'Online appointment booking',
      'Shared inbox for calls, texts and email',
    ],
    cta: { label: 'Book a Demo', href: '/contact' },
  },
  {
    slug: 'growth',
    name: 'Growth',
    tagline: 'For businesses that want every lead worked, not just captured.',
    monthly: 597,
    annual: 5970,
    setup: 997,
    featured: true,
    badge: 'Most Popular',
    inherits: 'Starter',
    features: [
      'AI receptionist conversations',
      'Advanced lead qualification',
      'Automated follow-up sequences',
      'Pipeline automation',
      'Review requests',
      'Old-lead reactivation campaigns',
      'Advanced reporting',
    ],
    cta: { label: 'Book a Demo', href: '/contact' },
  },
  {
    slug: 'pro',
    name: 'Pro',
    tagline: 'For multi-location teams that need automation built to spec.',
    monthly: 1197,
    annual: 11970,
    setup: 1997,
    inherits: 'Growth',
    features: [
      'Custom workflows',
      'Multiple locations and teams',
      'Advanced integrations',
      'Custom AI training on your services',
      'Priority support',
      'Custom onboarding and migration',
    ],
    cta: { label: 'Talk to Us', href: '/contact' },
  },
];

/** Shown under the pricing grid — set expectations honestly. */
export const pricingNotes = [
  'Message and phone usage is billed at cost through your connected phone number provider.',
  'Annual plans are billed once and work out to ten months of the monthly rate.',
  'No long-term contract — plans are month to month unless you choose annual.',
];

export const pricingFaq = [
  {
    question: 'What is included in setup?',
    answer:
      'Number connection, CRM build, pipeline configuration, writing your AI receptionist’s question set and tone, calendar setup, and training your team on the mobile app.',
  },
  {
    question: 'Do I need to change my phone number?',
    answer:
      'No. Your existing business number keeps working exactly as it does today. The system connects to it so it can detect a missed call and respond.',
  },
  {
    question: 'What if I want to start smaller?',
    answer:
      'Starter exists for that. Missed-call text back alone usually pays for itself before you add AI conversations on top.',
  },
];
