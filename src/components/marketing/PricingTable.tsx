'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { plans, pricingNotes } from '@/content/pricing';
import { site } from '@/content/site.config';
import { formatCurrency, cn } from '@/lib/utils';

/**
 * Pricing grid. When site.pricingMode === 'custom' (or
 * NEXT_PUBLIC_PRICING_MODE=custom) every amount is replaced with
 * "Custom Pricing" and the billing toggle is hidden.
 */
export function PricingTable() {
  const [annual, setAnnual] = useState(false);
  const showNumbers = site.pricingMode === 'numbers';

  return (
    <div>
      {showNumbers ? (
        <div className="flex justify-center">
          <div
            role="radiogroup"
            aria-label="Billing period"
            className="inline-flex items-center gap-1 rounded-full border border-surface-border bg-canvas-raised p-1"
          >
            {[
              { label: 'Monthly', value: false },
              { label: 'Annual', value: true },
            ].map((option) => (
              <button
                key={option.label}
                type="button"
                role="radio"
                aria-checked={annual === option.value}
                onClick={() => setAnnual(option.value)}
                className={cn(
                  'rounded-full px-4 py-1.5 text-sm transition-colors',
                  annual === option.value ? 'bg-signal-400 text-canvas-sunken' : 'text-ink-muted hover:text-ink',
                )}
              >
                {option.label}
                {option.value ? <span className="ml-1.5 text-xs opacity-80">save 2 months</span> : null}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      <div className="mt-10 grid gap-6 lg:grid-cols-3 lg:items-start">
        {plans.map((plan) => (
          <div
            key={plan.slug}
            className={cn(
              'relative flex h-full flex-col rounded-3xl border p-7 sm:p-8',
              plan.featured
                ? 'border-signal-400/40 bg-gradient-to-b from-signal-400/[0.09] to-canvas-raised shadow-glow lg:-mt-4 lg:pb-10 lg:pt-12'
                : 'border-surface-border bg-canvas-raised/70',
            )}
          >
            {plan.badge ? (
              <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-signal-400 px-3.5 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-canvas-sunken">
                {plan.badge}
              </span>
            ) : null}

            <h3 className="font-display text-xl text-ink">{plan.name}</h3>
            <p className="mt-2 min-h-[2.75rem] text-sm leading-relaxed text-ink-muted">{plan.tagline}</p>

            <div className="mt-7 border-y border-surface-border py-6">
              {showNumbers ? (
                <>
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-display text-4xl tabular-nums text-ink">
                      {formatCurrency(annual ? Math.round(plan.annual / 12) : plan.monthly)}
                    </span>
                    <span className="text-sm text-ink-muted">/mo</span>
                  </div>
                  <p className="mt-2 text-xs text-ink-faint">
                    {annual
                      ? `${formatCurrency(plan.annual)} billed annually`
                      : 'Billed monthly, cancel anytime'}
                    {' · '}
                    {formatCurrency(plan.setup)} one-time setup
                  </p>
                </>
              ) : (
                <>
                  <div className="font-display text-3xl text-ink">Custom Pricing</div>
                  <p className="mt-2 text-xs text-ink-faint">Scoped to your call volume and service area.</p>
                </>
              )}
            </div>

            <div className="mt-6 flex-1">
              {plan.inherits ? (
                <p className="mb-4 text-sm font-medium text-signal-300">Everything in {plan.inherits}, plus:</p>
              ) : (
                <p className="mb-4 text-sm font-medium text-ink-muted">Includes:</p>
              )}
              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-ink-muted">
                    <Icon name="Check" className="mt-0.5 h-4 w-4 shrink-0 text-signal-400" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8">
              <Button
                href={plan.cta.href}
                variant={plan.featured ? 'primary' : 'secondary'}
                size="lg"
                className="w-full"
              >
                {plan.cta.label}
              </Button>
            </div>
          </div>
        ))}
      </div>

      <ul className="mx-auto mt-10 max-w-2xl space-y-2">
        {pricingNotes.map((note) => (
          <li key={note} className="flex items-start gap-2.5 text-xs leading-relaxed text-ink-faint">
            <Icon name="Info" className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            {note}
          </li>
        ))}
      </ul>
    </div>
  );
}
