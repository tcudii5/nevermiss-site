export type Feature = {
  slug: string;
  title: string;
  description: string;
  /** lucide-react icon name, resolved in components/ui/Icon.tsx */
  icon: string;
};

export const receptionistFeatures: Feature[] = [
  {
    slug: 'missed-call-text-back',
    title: 'Instant Missed-Call Text Back',
    description:
      'The second a call goes unanswered, the caller gets a text. No voicemail, no waiting, no reason to try the next company on the list.',
    icon: 'PhoneMissed',
  },
  {
    slug: '24-7-conversations',
    title: '24/7 AI Conversations',
    description:
      'Nights, weekends, holidays, mid-job. The conversation keeps going whether or not anyone on your team is free to type.',
    icon: 'Clock',
  },
  {
    slug: 'lead-qualification',
    title: 'Lead Qualification',
    description:
      'Your questions, asked every time — service needed, urgency, address, ZIP code, budget range. You see a qualified lead, not a name and number.',
    icon: 'ListChecks',
  },
  {
    slug: 'appointment-booking',
    title: 'Appointment Booking',
    description:
      'Once a lead checks out, the AI offers real openings from your calendar and walks them to a booked slot.',
    icon: 'CalendarCheck',
  },
  {
    slug: 'smart-follow-up',
    title: 'Smart Follow-Up',
    description:
      'Leads go quiet constantly. Timed follow-ups bring them back instead of letting them die in a thread nobody reopens.',
    icon: 'Repeat',
  },
  {
    slug: 'human-takeover',
    title: 'Human Takeover',
    description:
      'Anyone on your team can jump into a live conversation from their phone. The AI steps aside the moment a human replies.',
    icon: 'UserCheck',
  },
  {
    slug: 'business-notifications',
    title: 'Business Notifications',
    description:
      'When a lead is hot — emergency job, big ticket, ready to book — the owner or dispatcher gets pinged with the full conversation.',
    icon: 'BellRing',
  },
  {
    slug: 'crm-sync',
    title: 'CRM Sync',
    description:
      'Contact details, transcript, service type and appointment all land on the lead record automatically. Nothing to re-type.',
    icon: 'Database',
  },
];

export const crmFeatures: Feature[] = [
  {
    slug: 'pipeline',
    title: 'Visual Pipeline',
    description: 'Every opportunity on one board, from first text to paid invoice. You can see what stalled without asking anyone.',
    icon: 'KanbanSquare',
  },
  {
    slug: 'unified-inbox',
    title: 'One Inbox',
    description: 'Calls, texts, emails and web form submissions in a single thread per customer, on desktop or your phone.',
    icon: 'Inbox',
  },
  {
    slug: 'automations',
    title: 'Follow-Up Automations',
    description: 'Reminders, estimate nudges, no-response sequences and reactivation campaigns run on schedule without anyone remembering.',
    icon: 'Workflow',
  },
  {
    slug: 'reviews',
    title: 'Review Requests',
    description: 'After a job closes, the customer gets asked for a review at the moment they are happiest.',
    icon: 'Star',
  },
  {
    slug: 'reporting',
    title: 'Lead Reporting',
    description: 'Where leads come from, how fast you responded, what closed. Numbers you can actually act on.',
    icon: 'BarChart3',
  },
  {
    slug: 'calendars',
    title: 'Team Calendars',
    description: 'Route appointments by service type, technician or location, with buffers and travel time respected.',
    icon: 'CalendarRange',
  },
];

export const problems = [
  {
    title: 'Missed Calls',
    description:
      "You're under a sink, on a ladder, or driving to the next job. The phone rings anyway, and it rings for the competition too.",
    icon: 'PhoneOff',
  },
  {
    title: 'Slow Follow-Up',
    description:
      'You call back at 6pm. They booked someone at 2pm. The first business to respond usually gets the customer.',
    icon: 'Hourglass',
  },
  {
    title: 'Leads Get Forgotten',
    description:
      'Names in voicemails, numbers on a notepad, texts three screens deep. Some of those were ready to buy.',
    icon: 'FileWarning',
  },
  {
    title: 'No Consistent Follow-Up',
    description:
      "The ones who weren't ready this week never hear from you again — so they hire whoever does follow up.",
    icon: 'Ghost',
  },
] as const;

export const howItWorksSteps = [
  {
    step: 1,
    title: 'Customer Calls',
    description: 'A potential customer finds you and picks up the phone. This is the most valuable moment in your funnel.',
    detail: 'Works with your existing business number — customers dial the same line they always have.',
    icon: 'PhoneIncoming',
  },
  {
    step: 2,
    title: 'You Miss the Call',
    description: "You're on a job, driving, with another customer, or it's simply after hours.",
    detail: 'No change to how you work. The system only steps in when nobody picks up.',
    icon: 'PhoneMissed',
  },
  {
    step: 3,
    title: 'AI Responds in Seconds',
    description: 'A personalized text goes out immediately, in your business’s name and voice.',
    detail: '"Hey John! Sorry we missed your call. This is Sarah with ABC Plumbing. How can we help you today?"',
    icon: 'MessageSquareText',
  },
  {
    step: 4,
    title: 'AI Qualifies & Books',
    description:
      'It asks the questions you would ask, captures contact details, figures out the job, and guides them toward an appointment.',
    detail: 'Question sets are written for your trade and your service area — not a generic script.',
    icon: 'CalendarCheck',
  },
  {
    step: 5,
    title: 'Your Team Takes Over',
    description:
      'The lead lands in your CRM with the full conversation attached, and the right person gets an alert.',
    detail: 'Jump in and reply as yourself any time. The AI hands off cleanly.',
    icon: 'Users',
  },
] as const;
