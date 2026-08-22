export type AutomationTrack = {
  slug: string;
  name: string;
  trigger: string;
  description: string;
  steps: string[];
  icon: string;
};

/** The headline workflow rendered as a flow diagram on /crm-automation. */
export const primaryWorkflow = [
  'New Lead',
  'Immediate SMS',
  'AI Conversation',
  'Qualification',
  'Appointment Booking',
  'Reminder',
  'Follow-Up',
  'Review Request',
] as const;

export const automationTracks: AutomationTrack[] = [
  {
    slug: 'missed-call',
    name: 'Missed-Call Campaign',
    trigger: 'A call rings out unanswered',
    description: 'The caller hears from you before they can dial the next business on the search results page.',
    steps: ['Text sent within seconds', 'AI conversation opens', 'Lead created in CRM', 'Owner alerted if urgent'],
    icon: 'PhoneMissed',
  },
  {
    slug: 'appointment-reminders',
    name: 'Appointment Reminders',
    trigger: 'An appointment is booked',
    description: 'Confirmation, day-before and morning-of reminders — the cheapest no-show reduction there is.',
    steps: ['Instant confirmation', '24-hour reminder', 'Morning-of reminder', 'Reschedule link if they cannot make it'],
    icon: 'CalendarClock',
  },
  {
    slug: 'estimate-follow-up',
    name: 'Estimate Follow-Up',
    trigger: 'An estimate or quote is sent',
    description: 'The sequence you always meant to run manually and never did.',
    steps: ['Day 1 delivery confirmation', 'Day 3 check-in', 'Day 7 questions offer', 'Day 14 last call'],
    icon: 'FileText',
  },
  {
    slug: 'no-response',
    name: 'No-Response Follow-Up',
    trigger: 'A lead goes quiet mid-conversation',
    description: 'Most people are not saying no. They got busy. This brings a real share of them back.',
    steps: ['2-hour nudge', 'Next-day check-in', 'Day 4 different angle', 'Move to long-term nurture'],
    icon: 'MessageSquareDashed',
  },
  {
    slug: 'review-requests',
    name: 'Review Requests',
    trigger: 'A job is marked complete',
    description: 'Asks at the moment the customer is happiest, and routes unhappy replies to you privately first.',
    steps: ['Completion detected', 'Thank-you message', 'Review link sent', 'Reminder if not left'],
    icon: 'Star',
  },
  {
    slug: 'reactivation',
    name: 'Old-Lead Reactivation',
    trigger: 'A dormant contact hits a set age',
    description: 'The list you already paid for. Reactivation campaigns run against leads that went cold months ago.',
    steps: ['Segment dormant leads', 'Re-open with a relevant offer', 'AI handles the replies', 'Book what comes back'],
    icon: 'RotateCcw',
  },
  {
    slug: 'nurture',
    name: 'Customer Nurture',
    trigger: 'A job closes successfully',
    description: 'Seasonal service reminders and check-ins that turn one job into a repeat customer.',
    steps: ['Post-job thank you', 'Seasonal service reminder', 'Maintenance offer', 'Referral ask'],
    icon: 'Sprout',
  },
];

/** Sample data for the CRM dashboard visual. Clearly labeled as illustrative. */
export const pipelineStages = [
  { name: 'New Leads', count: 27, tone: 'signal' },
  { name: 'Contacted', count: 21, tone: 'ion' },
  { name: 'Qualified', count: 18, tone: 'ion' },
  { name: 'Appointment Scheduled', count: 14, tone: 'signal' },
  { name: 'Estimate Sent', count: 11, tone: 'ion' },
  { name: 'Won', count: 9, tone: 'signal' },
  { name: 'Lost', count: 6, tone: 'muted' },
] as const;

export const sampleLeads = [
  { name: 'John Whitfield', service: 'Water heater leak', value: 1450, stage: 0, source: 'Missed call', time: '2m ago' },
  { name: 'Maria Delgado', service: 'AC not cooling', value: 890, stage: 1, source: 'Missed call', time: '14m ago' },
  { name: 'Dave Chen', service: 'Panel upgrade', value: 3200, stage: 2, source: 'Web form', time: '38m ago' },
  { name: 'Karen Boyle', service: 'Roof inspection', value: 640, stage: 3, source: 'Missed call', time: '1h ago' },
  { name: 'Tom Rivera', service: 'Drain clearing', value: 375, stage: 4, source: 'Google Ads', time: '2h ago' },
  { name: 'Alexa Nunes', service: 'Full repipe', value: 7800, stage: 5, source: 'Referral', time: '3h ago' },
] as const;

export const dashboardStats = [
  { label: 'New Leads', value: '27', delta: '+8 this week', icon: 'UserPlus' },
  { label: 'Appointments', value: '14', delta: '+3 this week', icon: 'CalendarCheck' },
  { label: 'Won Customers', value: '9', delta: '+2 this week', icon: 'Trophy' },
  { label: 'Avg. Response Time', value: '8 sec', delta: 'first text sent', icon: 'Timer' },
] as const;
