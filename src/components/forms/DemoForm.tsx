'use client';

import { useState, type FormEvent } from 'react';
import { TextField, SelectField, TextAreaField } from './Field';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import {
  demoRequestSchema,
  flattenErrors,
  industryOptions,
  employeeOptions,
  monthlyLeadOptions,
  type FieldErrors,
} from '@/lib/validation';
import { trackDemoRequest } from '@/lib/analytics';
import { site } from '@/content/site.config';

type Status = 'idle' | 'submitting' | 'success' | 'error';

const initialValues = {
  firstName: '',
  lastName: '',
  businessName: '',
  email: '',
  phone: '',
  website: '',
  industry: '',
  employees: '',
  monthlyLeads: '',
  challenge: '',
  consent: false,
  company_website_url: '',
};

/** Reads UTM params so attribution follows the lead into the CRM. */
function readUtm() {
  if (typeof window === 'undefined') return {};
  const params = new URLSearchParams(window.location.search);
  const keys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'] as const;
  const out: Record<string, string> = {};
  for (const key of keys) {
    const value = params.get(key);
    if (value) out[key] = value;
  }
  return out;
}

export function DemoForm() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');

  const set = (key: keyof typeof initialValues, value: string | boolean) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => (prev[key as keyof FieldErrors] ? { ...prev, [key]: undefined } : prev));
  };

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage('');

    const parsed = demoRequestSchema.safeParse(values);
    if (!parsed.success) {
      const fieldErrors = flattenErrors(parsed.error);
      setErrors(fieldErrors);
      setStatus('error');
      setMessage('Please fix the highlighted fields and try again.');
      // Move focus to the first invalid control for keyboard/screen reader users.
      const firstKey = Object.keys(fieldErrors)[0];
      document.querySelector<HTMLElement>(`[aria-invalid="true"]`)?.focus();
      if (!firstKey) return;
      return;
    }

    setStatus('submitting');
    setErrors({});

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...parsed.data,
          __meta: {
            source: 'Website — Book a Demo',
            path: window.location.pathname,
            referrer: document.referrer,
            ...readUtm(),
          },
        }),
      });

      const result = (await response.json()) as {
        ok: boolean;
        message?: string;
        errors?: FieldErrors;
        delivered?: boolean;
      };

      if (!response.ok || !result.ok) {
        setErrors(result.errors ?? {});
        setStatus('error');
        setMessage(result.message ?? 'Something went wrong. Please try again or email us directly.');
        return;
      }

      trackDemoRequest({ industry: parsed.data.industry });
      setStatus('success');
      setValues(initialValues);
    } catch {
      setStatus('error');
      setMessage('We could not reach the server. Please check your connection or email us directly.');
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-3xl border border-signal-400/30 bg-gradient-to-b from-signal-400/[0.09] to-canvas-raised p-8 text-center sm:p-12">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-signal-400 text-canvas-sunken">
          <Icon name="Check" className="h-7 w-7" />
        </div>
        <h3 className="mt-6 font-display text-display-sm text-ink">Request received</h3>
        <p className="mx-auto mt-3 max-w-md text-ink-muted">
          Thanks — we&rsquo;ll reach out shortly to get a time on the calendar. If you&rsquo;d rather pick a slot now,
          scroll down and grab one directly.
        </p>
        <div className="mt-7">
          <Button variant="outline" onClick={() => setStatus('idle')}>
            Submit another request
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="rounded-3xl border border-surface-border bg-canvas-raised/70 p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          label="First name"
          required
          autoComplete="given-name"
          value={values.firstName}
          error={errors.firstName}
          onChange={(e) => set('firstName', e.target.value)}
        />
        <TextField
          label="Last name"
          required
          autoComplete="family-name"
          value={values.lastName}
          error={errors.lastName}
          onChange={(e) => set('lastName', e.target.value)}
        />
        <TextField
          label="Business name"
          required
          autoComplete="organization"
          className="sm:col-span-2"
          value={values.businessName}
          error={errors.businessName}
          onChange={(e) => set('businessName', e.target.value)}
        />
        <TextField
          label="Email"
          type="email"
          required
          autoComplete="email"
          inputMode="email"
          value={values.email}
          error={errors.email}
          onChange={(e) => set('email', e.target.value)}
        />
        <TextField
          label="Phone"
          type="tel"
          required
          autoComplete="tel"
          inputMode="tel"
          placeholder="(555) 010-0199"
          value={values.phone}
          error={errors.phone}
          onChange={(e) => set('phone', e.target.value)}
        />
        <TextField
          label="Website"
          type="url"
          autoComplete="url"
          placeholder="yourbusiness.com"
          className="sm:col-span-2"
          value={values.website}
          error={errors.website}
          onChange={(e) => set('website', e.target.value)}
        />
        <SelectField
          label="Industry"
          required
          options={industryOptions}
          placeholder="Select your industry"
          value={values.industry}
          error={errors.industry}
          onChange={(e) => set('industry', e.target.value)}
        />
        <SelectField
          label="Number of employees"
          required
          options={employeeOptions}
          placeholder="Select team size"
          value={values.employees}
          error={errors.employees}
          onChange={(e) => set('employees', e.target.value)}
        />
        <SelectField
          label="Approximate monthly leads"
          required
          options={monthlyLeadOptions}
          placeholder="Select an estimate"
          className="sm:col-span-2"
          value={values.monthlyLeads}
          error={errors.monthlyLeads}
          onChange={(e) => set('monthlyLeads', e.target.value)}
        />
        <TextAreaField
          label="Biggest lead follow-up problem"
          className="sm:col-span-2"
          placeholder="e.g. We miss most calls during the day and never get around to calling people back."
          hint="The more specific you are, the more useful the demo will be."
          value={values.challenge}
          error={errors.challenge}
          onChange={(e) => set('challenge', e.target.value)}
        />
      </div>

      {/* Honeypot — visually and programmatically hidden from real users. */}
      <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company_website_url">Do not fill this out</label>
        <input
          id="company_website_url"
          name="company_website_url"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.company_website_url}
          onChange={(e) => set('company_website_url', e.target.value)}
        />
      </div>

      <div className="mt-6 rounded-2xl border border-surface-border bg-canvas-sunken/60 p-4">
        <label className="flex cursor-pointer items-start gap-3 text-xs leading-relaxed text-ink-muted">
          <input
            type="checkbox"
            checked={values.consent}
            onChange={(e) => set('consent', e.target.checked)}
            aria-invalid={Boolean(errors.consent)}
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-surface-border bg-canvas accent-signal-400"
          />
          <span>
            I agree that {site.name} may contact me by phone, email or text about my request. Message and data rates
            may apply. Consent is not a condition of purchase, and I can opt out at any time.
          </span>
        </label>
        {errors.consent ? (
          <p role="alert" className="mt-2 pl-7 text-xs text-red-300">
            {errors.consent}
          </p>
        ) : null}
      </div>

      {status === 'error' && message ? (
        <div role="alert" className="mt-5 flex items-start gap-2.5 rounded-xl border border-red-500/30 bg-red-500/[0.08] p-4 text-sm text-red-200">
          <Icon name="TriangleAlert" className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{message}</span>
        </div>
      ) : null}

      <div className="mt-7">
        <Button type="submit" size="lg" className="w-full" disabled={status === 'submitting'}>
          {status === 'submitting' ? (
            <>
              <Icon name="LoaderCircle" className="h-4 w-4 animate-spin" />
              Sending…
            </>
          ) : (
            <>
              Request My Demo
              <Icon name="ArrowRight" className="h-4 w-4" />
            </>
          )}
        </Button>
        <p className="mt-3 text-center text-xs text-ink-faint">
          No pressure and no obligation. We&rsquo;ll show you the system and tell you honestly whether it fits.
        </p>
      </div>
    </form>
  );
}
