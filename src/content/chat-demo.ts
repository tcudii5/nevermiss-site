export type ChatTurn = {
  from: 'customer' | 'ai';
  text: string;
  /** ms to wait before this message appears */
  delay?: number;
};

/** The scripted conversation played in <ChatDemo />. */
export const chatScript: ChatTurn[] = [
  { from: 'customer', text: 'Hey, I called because my water heater stopped working.' },
  { from: 'ai', text: "Sorry you're dealing with that. I can help get someone out to you. Is the water heater leaking, or just not producing hot water?" },
  { from: 'customer', text: "It's leaking." },
  { from: 'ai', text: 'Thanks. Is the leak currently contained?' },
  { from: 'customer', text: 'Yes.' },
  { from: 'ai', text: "Great — that buys us some time. What's your ZIP code?" },
  { from: 'customer', text: '20874' },
  { from: 'ai', text: 'We service that area. I have availability tomorrow — would morning or afternoon work better?' },
  { from: 'customer', text: 'Morning.' },
  { from: 'ai', text: "Perfect, I've got your request started. What's the best name and email for the appointment?" },
  { from: 'customer', text: 'John Whitfield, john.w@example.com' },
  { from: 'ai', text: "You're all set, John. Tomorrow 8–10am, and you'll get a confirmation text shortly. Anything else I should pass along to the tech?" },
];

/** Outcome chips revealed after the conversation completes. */
export const chatOutcomes = [
  { label: 'New Qualified Lead', detail: 'John Whitfield · Water heater leak', icon: 'UserPlus' },
  { label: 'Appointment Requested', detail: 'Tomorrow, 8:00–10:00 AM', icon: 'CalendarCheck' },
  { label: 'Owner Notified', detail: 'Push alert sent to dispatcher', icon: 'BellRing' },
  { label: 'CRM Updated', detail: 'Transcript + contact saved', icon: 'Database' },
] as const;

/** Steps in the hero product animation. */
export const heroFlow = [
  { label: 'Incoming Call', detail: '(240) 555-0182', icon: 'PhoneIncoming', tone: 'neutral' },
  { label: 'Missed Call', detail: 'No answer after 20s', icon: 'PhoneMissed', tone: 'warn' },
  { label: 'AI Text Sent', detail: 'in 8 seconds', icon: 'MessageSquareText', tone: 'signal' },
  { label: 'Customer Responds', detail: '"Water heater is leaking"', icon: 'MessageSquare', tone: 'neutral' },
  { label: 'AI Qualifies Lead', detail: 'Service · urgency · ZIP', icon: 'ListChecks', tone: 'signal' },
  { label: 'Appointment Booked', detail: 'Tomorrow, 8–10 AM', icon: 'CalendarCheck', tone: 'signal' },
  { label: 'Owner Notified', detail: 'Alert to dispatcher', icon: 'BellRing', tone: 'ion' },
  { label: 'CRM Updated', detail: 'Lead created + transcript', icon: 'Database', tone: 'ion' },
] as const;
