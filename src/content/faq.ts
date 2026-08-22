export type FaqItem = { question: string; answer: string };

export const faqs: FaqItem[] = [
  {
    question: 'What is an AI receptionist?',
    answer:
      'It is software that handles the first response for you. When a call goes unanswered, it texts the caller in your business’s name, holds a real back-and-forth conversation, asks your qualifying questions, and helps the person book an appointment — then files everything in your CRM. It is not a robot answering the phone with a menu; it is a text conversation the caller can have at their own pace.',
  },
  {
    question: 'How quickly does the system respond?',
    answer:
      'The first text goes out within seconds of the call ending. Speed is the entire point — response time is usually what decides who gets the job when a customer calls several businesses.',
  },
  {
    question: 'Can the AI book appointments?',
    answer:
      'Yes. It reads real availability from your connected calendar, offers open slots that fit your rules (service type, travel time, working hours), and confirms the booking. You can also configure it to request an appointment and let a human confirm.',
  },
  {
    question: 'Can I take over a conversation?',
    answer:
      'Any time. Every conversation shows up in a shared inbox on desktop and mobile. The moment you or a team member sends a message, the AI stops and stays out of the way until you hand it back.',
  },
  {
    question: 'Does this replace my employees?',
    answer:
      'No. It covers the moments no employee is available — you are on a job, it is 9pm, or three calls come in at once. It handles the first response and the busywork so your people spend their time on the conversations that need a human.',
  },
  {
    question: 'Can it work after business hours?',
    answer:
      'Yes, and that is where a lot of the value shows up. Nights, weekends and holidays are when calls get missed most and when competitors are equally unavailable. You can set different messaging for after-hours so expectations stay accurate.',
  },
  {
    question: 'Can it connect with my existing CRM?',
    answer:
      'The platform includes a full CRM, and most customers move onto it because everything lives in one place. If you need to keep an existing system, integrations are available on the Pro plan — we look at your specific setup during the demo before promising anything.',
  },
  {
    question: 'What happens if the AI does not know the answer?',
    answer:
      'It does not guess. It tells the customer a team member will follow up, captures their details, and flags the conversation for a human. You decide which topics it should never handle on its own — pricing, diagnoses, legal questions, anything you want.',
  },
  {
    question: 'Can I customize what the AI says?',
    answer:
      'Everything: the greeting, the business name it uses, tone, the qualifying questions for your trade, what it will and will not discuss, and when it escalates to you. It is configured around how you already talk to customers.',
  },
  {
    question: 'How long does setup take?',
    answer:
      'Typically a few business days from kickoff to live, depending on how quickly we can get access to your phone number and calendar and how complex your booking rules are. We handle the build; you review it before anything goes to a real customer.',
  },
  {
    question: 'Is texting customers like this compliant?',
    answer:
      'Messaging in the US requires registered business texting (A2P 10DLC) and consent rules under the TCPA. Replying to someone who just called you is a normal business practice, but marketing and re-engagement campaigns have real rules. We walk through registration and consent as part of onboarding — it is not an afterthought.',
  },
  {
    question: 'What if my customers do not want to text?',
    answer:
      'They can call back, and many do — the text often prompts it. Nothing stops a customer from reaching a human, and you still get the lead captured either way.',
  },
];
