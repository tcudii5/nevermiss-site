'use client';

import { useMemo, useState, useId } from 'react';
import { Section, SectionHeader } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { formatCurrency, formatNumber, clamp } from '@/lib/utils';
import { trackEvent } from '@/lib/analytics';

type SliderProps = {
  label: string;
  help: string;
  value: number;
  min: number;
  max: number;
  step: number;
  suffix?: string;
  prefix?: string;
  onChange: (value: number) => void;
};

function Slider({ label, help, value, min, max, step, suffix, prefix, onChange }: SliderProps) {
  const id = useId();
  const percent = ((value - min) / (max - min)) * 100;

  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="text-sm font-medium text-ink">
          {label}
        </label>
        <output htmlFor={id} className="font-display text-lg tabular-nums text-signal-300">
          {prefix}
          {formatNumber(value)}
          {suffix}
        </output>
      </div>

      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-describedby={`${id}-help`}
        className="mt-3 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-surface-border outline-offset-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-signal-400 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-signal-400 [&::-webkit-slider-thumb]:shadow-[0_0_0_4px_rgba(52,224,161,0.18)]"
        style={{
          background: `linear-gradient(to right, #34E0A1 0%, #34E0A1 ${percent}%, #1E2837 ${percent}%, #1E2837 100%)`,
        }}
      />

      <p id={`${id}-help`} className="mt-2 text-xs text-ink-faint">
        {help}
      </p>
    </div>
  );
}

/**
 * Missed-lead estimator. Deliberately conservative: it assumes only a share
 * of missed calls are recoverable, and every output is labeled an estimate.
 */
export function RoiCalculator() {
  const [callsPerMonth, setCallsPerMonth] = useState(180);
  const [missedPercent, setMissedPercent] = useState(25);
  const [jobValue, setJobValue] = useState(650);
  const [conversionRate, setConversionRate] = useState(35);

  const results = useMemo(() => {
    const missedCalls = Math.round(callsPerMonth * (missedPercent / 100));
    const customersLost = missedCalls * (conversionRate / 100);
    const revenueAtStake = customersLost * jobValue;

    /**
     * Recovery assumption: an instant text-back does not save every missed
     * call. We model a 40% recovery rate on the leads that would otherwise be
     * lost — a deliberately conservative planning figure, not a promise.
     */
    const RECOVERY_RATE = 0.4;
    const recoverableCustomers = customersLost * RECOVERY_RATE;
    const recoverableRevenue = recoverableCustomers * jobValue;

    return {
      missedCalls,
      customersLost,
      revenueAtStake,
      recoverableCustomers,
      recoverableRevenue,
      annualRecoverable: recoverableRevenue * 12,
    };
  }, [callsPerMonth, missedPercent, jobValue, conversionRate]);

  return (
    <Section id="calculator" className="border-t border-surface-border/60">
      <SectionHeader
        eyebrow="Missed lead calculator"
        title="Put a number on the calls you're not answering"
        description="Four inputs. Move the sliders to match your business and see roughly what is walking out the door each month."
      />

      <div className="mt-14 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-8">
        {/* Inputs */}
        <div className="rounded-3xl border border-surface-border bg-canvas-raised/70 p-6 sm:p-8">
          <div className="space-y-8">
            <Slider
              label="Average calls per month"
              help="Inbound calls to your business line, all sources."
              value={callsPerMonth}
              min={20}
              max={1500}
              step={10}
              onChange={(v) => setCallsPerMonth(clamp(v, 20, 1500))}
            />
            <Slider
              label="Percentage of calls missed"
              help="Industry surveys commonly put this between 20% and 40% for field service businesses."
              value={missedPercent}
              min={5}
              max={70}
              step={1}
              suffix="%"
              onChange={(v) => setMissedPercent(clamp(v, 5, 70))}
            />
            <Slider
              label="Average job / customer value"
              help="What a typical closed job is worth to you in revenue."
              value={jobValue}
              min={100}
              max={15000}
              step={50}
              prefix="$"
              onChange={(v) => setJobValue(clamp(v, 100, 15000))}
            />
            <Slider
              label="Lead-to-customer conversion rate"
              help="Of the leads you actually speak with, how many become customers."
              value={conversionRate}
              min={5}
              max={90}
              step={1}
              suffix="%"
              onChange={(v) => setConversionRate(clamp(v, 5, 90))}
            />
          </div>
        </div>

        {/* Results */}
        <div className="flex flex-col gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-surface-border bg-surface/60 p-5">
              <div className="text-xs font-medium uppercase tracking-wider text-ink-faint">Estimated missed leads</div>
              <div className="mt-2 font-display text-3xl tabular-nums text-ink">{formatNumber(results.missedCalls)}</div>
              <div className="mt-1 text-xs text-ink-faint">per month</div>
            </div>
            <div className="rounded-2xl border border-surface-border bg-surface/60 p-5">
              <div className="text-xs font-medium uppercase tracking-wider text-ink-faint">Customers potentially lost</div>
              <div className="mt-2 font-display text-3xl tabular-nums text-ink">
                {formatNumber(Math.round(results.customersLost))}
              </div>
              <div className="mt-1 text-xs text-ink-faint">per month</div>
            </div>
          </div>

          <div className="rounded-2xl border border-amber-400/25 bg-amber-400/[0.06] p-6">
            <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-amber-300">
              <Icon name="TrendingDown" className="h-3.5 w-3.5" />
              Estimated revenue opportunity at risk
            </div>
            <div className="mt-2.5 font-display text-4xl tabular-nums text-amber-200">
              {formatCurrency(results.revenueAtStake)}
            </div>
            <div className="mt-1 text-xs text-amber-200/70">per month, before any recovery</div>
          </div>

          <div className="rounded-2xl border border-signal-400/25 bg-gradient-to-br from-signal-400/[0.1] to-ion-500/[0.06] p-6">
            <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-signal-300">
              <Icon name="TrendingUp" className="h-3.5 w-3.5" />
              Potentially recoverable with instant response
            </div>
            <div className="mt-2.5 font-display text-4xl tabular-nums text-signal-200">
              {formatCurrency(results.recoverableRevenue)}
            </div>
            <div className="mt-1 text-xs text-signal-200/70">
              per month · {formatCurrency(results.annualRecoverable)} annually · assumes 40% of missed leads are
              recovered
            </div>
          </div>

          <div className="mt-1">
            <Button
              href="/contact"
              size="lg"
              className="w-full sm:w-auto"
              onClick={() => trackEvent('roi_calculator_cta', { calls_per_month: callsPerMonth })}
            >
              See What AI Could Recover for Your Business
              <Icon name="ArrowRight" className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <p className="mx-auto mt-8 max-w-3xl text-center text-xs leading-relaxed text-ink-faint">
        <strong className="font-medium text-ink-muted">These are estimates, not projections.</strong> Every figure
        above is calculated purely from the values you entered plus a fixed 40% recovery assumption. Actual results
        vary widely by trade, market, pricing, call quality and how quickly your team follows up. Nothing here is a
        guarantee of revenue or performance.
      </p>
    </Section>
  );
}
