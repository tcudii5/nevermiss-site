import { z } from 'zod';

export const industryOptions = [
  'Plumbing',
  'HVAC',
  'Electrical',
  'Roofing',
  'General Contracting',
  'Remodeling',
  'Landscaping',
  'Cleaning',
  'Auto / Towing',
  'Physical Therapy',
  'Med Spa',
  'Dental',
  'Legal',
  'Real Estate',
  'Other',
] as const;

export const employeeOptions = ['Just me', '2–5', '6–15', '16–50', '50+'] as const;

export const monthlyLeadOptions = [
  'Under 25',
  '25–75',
  '75–150',
  '150–400',
  '400+',
  'Not sure',
] as const;

/**
 * Shared between the client form and the /api/lead route so validation
 * rules can never drift apart.
 */
/**
 * z.string() reports a generic "Required" when a key is missing entirely
 * rather than empty. This keeps the human message consistent either way.
 */
function requiredString(message: string, max: number) {
  return z
    .string({ required_error: message, invalid_type_error: message })
    .trim()
    .min(1, message)
    .max(max);
}

export const demoRequestSchema = z.object({
  firstName: requiredString('First name is required', 60),
  lastName: requiredString('Last name is required', 60),
  businessName: requiredString('Business name is required', 120),
  email: requiredString('Email is required', 160).email('Enter a valid email address'),
  phone: requiredString('Phone is required', 20).regex(/^[\d\s()+.-]{10,20}$/, 'Enter a valid phone number'),
  website: z
    .string()
    .trim()
    .max(200)
    .optional()
    .or(z.literal(''))
    .refine(
      (value) => !value || /^(https?:\/\/)?[\w-]+(\.[\w-]+)+([/?#].*)?$/i.test(value),
      'Enter a valid website address',
    ),
  industry: z.enum(industryOptions, { errorMap: () => ({ message: 'Select your industry' }) }),
  employees: z.enum(employeeOptions, { errorMap: () => ({ message: 'Select a team size' }) }),
  monthlyLeads: z.enum(monthlyLeadOptions, { errorMap: () => ({ message: 'Select an estimate' }) }),
  challenge: z.string().trim().max(1200).optional().or(z.literal('')),
  consent: z.literal(true, {
    errorMap: () => ({ message: 'Please agree to be contacted so we can reach you' }),
  }),
  /**
   * Honeypot. Deliberately permissive: rejecting it here would return a
   * validation error naming the field, which tells a bot exactly what tripped
   * it. The route accepts these submissions and silently discards them instead.
   */
  company_website_url: z.string().max(200).optional(),
});

export type DemoRequest = z.infer<typeof demoRequestSchema>;

export type FieldErrors = Partial<Record<keyof DemoRequest, string>>;

export function flattenErrors(error: z.ZodError): FieldErrors {
  const out: FieldErrors = {};
  for (const issue of error.issues) {
    const key = issue.path[0] as keyof DemoRequest | undefined;
    if (key && !out[key]) out[key] = issue.message;
  }
  return out;
}
