'use client';

import { useId } from 'react';
import { cn } from '@/lib/utils';

type BaseProps = {
  label: string;
  error?: string;
  required?: boolean;
  hint?: string;
  className?: string;
};

const controlBase =
  'w-full rounded-xl border bg-canvas-raised px-4 py-3 text-[0.9375rem] text-ink placeholder:text-ink-faint transition-colors focus:border-signal-400/60 focus:outline-none focus:ring-2 focus:ring-signal-400/25';

function Wrapper({
  label,
  error,
  required,
  hint,
  id,
  children,
  className,
}: BaseProps & { id: string; children: React.ReactNode }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-ink">
        {label}
        {required ? (
          <span className="ml-1 text-signal-400" aria-hidden>
            *
          </span>
        ) : (
          <span className="ml-1.5 text-xs font-normal text-ink-faint">optional</span>
        )}
      </label>
      {children}
      {hint && !error ? (
        <p id={`${id}-hint`} className="mt-1.5 text-xs text-ink-faint">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-xs text-red-300">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function TextField({
  label,
  error,
  required,
  hint,
  className,
  ...props
}: BaseProps & React.InputHTMLAttributes<HTMLInputElement>) {
  const id = useId();
  return (
    <Wrapper label={label} error={error} required={required} hint={hint} id={id} className={className}>
      <input
        id={id}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        className={cn(controlBase, error ? 'border-red-500/50' : 'border-surface-border')}
        {...props}
      />
    </Wrapper>
  );
}

export function SelectField({
  label,
  error,
  required,
  hint,
  className,
  options,
  placeholder,
  ...props
}: BaseProps &
  React.SelectHTMLAttributes<HTMLSelectElement> & {
    options: readonly string[];
    placeholder?: string;
  }) {
  const id = useId();
  return (
    <Wrapper label={label} error={error} required={required} hint={hint} id={id} className={className}>
      <select
        id={id}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        className={cn(controlBase, 'appearance-none pr-10', error ? 'border-red-500/50' : 'border-surface-border')}
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2365728A' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 1rem center',
        }}
        {...props}
      >
        <option value="">{placeholder ?? 'Select…'}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </Wrapper>
  );
}

export function TextAreaField({
  label,
  error,
  required,
  hint,
  className,
  ...props
}: BaseProps & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const id = useId();
  return (
    <Wrapper label={label} error={error} required={required} hint={hint} id={id} className={className}>
      <textarea
        id={id}
        required={required}
        rows={4}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        className={cn(controlBase, 'resize-y', error ? 'border-red-500/50' : 'border-surface-border')}
        {...props}
      />
    </Wrapper>
  );
}
