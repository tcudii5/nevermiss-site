/**
 * INDUSTRY DATA
 * Each entry drives both the card on /industries and a full page at
 * /industries/[slug] via a shared template. To add an industry, append an
 * object here — no new files, no routing changes.
 */
export type Industry = {
  slug: string;
  name: string;
  /** Short line used on the card. */
  hook: string;
  icon: string;
  /** Page hero. */
  headline: string;
  subhead: string;
  /** Trade-specific pains, shown as a list on the industry page. */
  painPoints: string[];
  /** What the AI asks callers in this trade. */
  qualifyingQuestions: string[];
  /** Sample opening text for this trade. */
  sampleText: string;
  /** Automations that matter most here. */
  keyAutomations: string[];
};

export const industries: Industry[] = [
  {
    slug: 'plumbing',
    name: 'Plumbing',
    hook: 'Turn emergency calls into booked jobs.',
    icon: 'Wrench',
    headline: 'Emergency calls do not wait for you to get off the job.',
    subhead:
      'A burst pipe caller will try three plumbers in ten minutes. The one who answers first books the job — and it can be a text, not a call.',
    painPoints: [
      'Emergency callers move down the list fast when nobody picks up',
      'After-hours calls go to voicemail and never come back',
      'Techs in the field cannot stop mid-job to qualify a lead',
      'Estimates get sent and then nobody follows up on them',
    ],
    qualifyingQuestions: [
      'Is this an emergency or can it wait for a scheduled visit?',
      'Is water actively leaking, and is it contained?',
      'Have you been able to shut off the water?',
      'What is the property address and ZIP code?',
      'Is this a home or a commercial property?',
    ],
    sampleText:
      "Hey John! Sorry we missed your call — this is Sarah with ABC Plumbing. Is this an emergency, or something we can schedule?",
    keyAutomations: ['Emergency escalation to the on-call tech', 'Estimate follow-up sequence', 'Annual water heater check-in'],
  },
  {
    slug: 'hvac',
    name: 'HVAC',
    hook: 'Respond instantly when customers need heating or cooling help.',
    icon: 'Thermometer',
    headline: 'On the first 95° day, your phone rings more than you can answer.',
    subhead:
      'Peak season is exactly when calls get missed. Every unanswered ring during a heat wave is a system replacement someone else is quoting.',
    painPoints: [
      'Seasonal call spikes overwhelm the office in a single afternoon',
      'No-heat and no-cool calls are urgent and price-shopped fast',
      'Maintenance plan renewals get forgotten every year',
      'Quoted replacements go cold without a follow-up cadence',
    ],
    qualifyingQuestions: [
      'Is the system not running at all, or running but not cooling/heating?',
      'How old is the unit, roughly?',
      'Is anyone in the home at risk from the temperature right now?',
      'Residential or commercial?',
      'What is your ZIP code?',
    ],
    sampleText:
      "Hi Maria — sorry we missed you! This is the team at Summit Heating & Air. Is your system not turning on at all, or blowing but not cooling?",
    keyAutomations: ['Heat-wave overflow response', 'Maintenance plan renewal reminders', 'Replacement quote follow-up'],
  },
  {
    slug: 'electrical',
    name: 'Electrical',
    hook: 'Capture service requests while your technicians are working.',
    icon: 'Zap',
    headline: 'Your electricians cannot answer the phone with their hands full.',
    subhead:
      'Panel upgrades, outages, EV chargers — high-ticket work starts with a call that came in while everyone was on a job site.',
    painPoints: [
      'Licensed techs are billable, not available to answer phones',
      'High-ticket jobs get quoted by whoever responds first',
      'Permit and scheduling questions eat office time',
      'Referral leads sit unworked for days',
    ],
    qualifyingQuestions: [
      'Is there a safety issue right now — sparking, burning smell, or no power?',
      'Is this a repair, an upgrade, or new installation?',
      'What is the property address?',
      'Do you know the age of your electrical panel?',
      'Is this for a home, rental, or commercial space?',
    ],
    sampleText:
      "Hey Dave, sorry we missed your call — this is Northside Electric. Is anything sparking or is the power out right now?",
    keyAutomations: ['Safety-issue instant escalation', 'Panel upgrade quote nurture', 'EV charger interest campaign'],
  },
  {
    slug: 'roofing',
    name: 'Roofing',
    hook: 'Follow up with estimates and inbound leads automatically.',
    icon: 'Home',
    headline: 'Roofing leads take weeks to close — if anyone stays in touch.',
    subhead:
      'A storm brings a wave of calls, then a long decision cycle. Most of that pipeline dies from silence, not from losing on price.',
    painPoints: [
      'Storm surges create more leads than the office can call back',
      'Long sales cycles need follow-up nobody has time to run',
      'Insurance-claim customers need hand-holding through paperwork',
      'Estimates sent months ago are never revisited',
    ],
    qualifyingQuestions: [
      'Is there an active leak right now?',
      'Is this storm or insurance related?',
      'Roughly how old is the roof?',
      'Are you the property owner?',
      'What is the property address?',
    ],
    sampleText:
      "Hi Karen! Sorry we missed your call — this is Ridgeline Roofing. Is there an active leak, or are you looking for an inspection and estimate?",
    keyAutomations: ['Storm response campaign', 'Insurance claim check-ins', 'Long-cycle estimate nurture'],
  },
  {
    slug: 'physical-therapy',
    name: 'Physical Therapy',
    hook: 'Turn inquiries into scheduled consultations.',
    icon: 'HeartPulse',
    headline: 'The front desk cannot be on the phone and with a patient at once.',
    subhead:
      'New-patient inquiries arrive while your staff is checking someone in. Those calls turn into a plan of care — or into voicemail.',
    painPoints: [
      'Front desk juggles check-ins, calls and insurance questions',
      'New patient inquiries go to voicemail during busy hours',
      'No-shows and cancellations leave gaps nobody fills',
      'Past patients are never re-engaged for new episodes of care',
    ],
    qualifyingQuestions: [
      'What area of the body are you having trouble with?',
      'Do you have a physician referral?',
      'What insurance are you planning to use?',
      'Is this from a recent injury or an ongoing issue?',
      'What days and times generally work for you?',
    ],
    sampleText:
      "Hi Tom! Sorry we missed your call — this is Riverside Physical Therapy. Are you looking to schedule an evaluation? I can help get you on the books.",
    keyAutomations: ['New patient intake sequence', 'Appointment reminders to cut no-shows', 'Past patient re-engagement'],
  },
  {
    slug: 'med-spa',
    name: 'Med Spa',
    hook: 'Respond to treatment questions and appointment requests 24/7.',
    icon: 'Sparkles',
    headline: 'Most med spa inquiries come in after your doors close.',
    subhead:
      'People research treatments at night. If nobody responds until tomorrow, they have already booked a consult somewhere else.',
    painPoints: [
      'Evening and weekend inquiries land when nobody is in',
      'Treatment and pricing questions repeat all day long',
      'Consults booked but never confirmed turn into no-shows',
      'Past clients are not reminded when treatments are due again',
    ],
    qualifyingQuestions: [
      'Which treatment are you interested in?',
      'Have you had this treatment before?',
      'Are you looking for a consultation or ready to book?',
      'What days work best for you?',
      'How did you hear about us?',
    ],
    sampleText:
      "Hi Alexa! Sorry we missed you — this is Lumen Aesthetics. Were you asking about a specific treatment? Happy to answer questions or get you in for a consult.",
    keyAutomations: ['After-hours consult booking', 'Treatment reminder cycles', 'VIP client win-back offers'],
  },
  {
    slug: 'general-contracting',
    name: 'General Contracting',
    hook: 'Qualify project inquiries before they reach your calendar.',
    icon: 'HardHat',
    headline: 'Not every project inquiry is worth a site visit.',
    subhead:
      'Scope, timeline and budget get established before you drive anywhere — so your estimate appointments are with real buyers.',
    painPoints: [
      'Site visits burned on projects that were never a fit',
      'Inquiries arrive while you are on an active build',
      'Bids go out and then follow-up depends on memory',
      'Referrals sit in a text thread for a week',
    ],
    qualifyingQuestions: [
      'What kind of project are you planning?',
      'Do you have a timeline in mind?',
      'Have you set a budget range for the work?',
      'Are drawings or plans already done?',
      'What is the property address?',
    ],
    sampleText:
      "Hey Chris! Sorry we missed your call — this is Marlowe Construction. What kind of project are you looking to get done?",
    keyAutomations: ['Bid follow-up sequence', 'Project milestone updates', 'Post-project review requests'],
  },
  {
    slug: 'auto-services',
    name: 'Auto & Towing',
    hook: 'Answer roadside and service calls without leaving the bay.',
    icon: 'Car',
    headline: 'A stranded customer calls three numbers in two minutes.',
    subhead:
      'Roadside and repair calls are decided on response speed alone. A text back in seconds is often the whole competitive advantage.',
    painPoints: [
      'Techs in the bay cannot stop to take every call',
      'Roadside callers move on within minutes',
      'Service reminders and follow-ups never get sent',
      'Estimate approvals stall waiting on a callback',
    ],
    qualifyingQuestions: [
      'Are you safe and out of traffic right now?',
      'What is your current location or nearest cross street?',
      'What is the year, make and model?',
      'Is the vehicle drivable?',
      'Do you need a tow or a service appointment?',
    ],
    sampleText:
      "Hi! Sorry we missed your call — this is Beltway Auto & Towing. Are you safe where you are? Send me your location and I'll get help moving.",
    keyAutomations: ['Roadside dispatch alerts', 'Service interval reminders', 'Estimate approval follow-up'],
  },
];

export function getIndustry(slug: string) {
  return industries.find((i) => i.slug === slug);
}
