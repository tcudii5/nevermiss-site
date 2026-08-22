'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Icon } from '@/components/ui/Icon';
import { DemoDataBadge } from '@/components/ui/Card';
import { pipelineStages, sampleLeads, dashboardStats } from '@/content/automations';
import { cn } from '@/lib/utils';

const toneRing: Record<string, string> = {
  signal: 'bg-signal-400',
  ion: 'bg-ion-400',
  muted: 'bg-ink-faint',
};

/**
 * Visual mockup of the CRM pipeline. All numbers come from
 * content/automations.ts and are labeled as example data — nothing here
 * represents a real customer's performance.
 */
export function CrmDashboard() {
  const reduce = useReducedMotion();

  return (
    <div className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-8 rounded-[3rem] bg-gradient-to-tr from-ion-500/10 via-transparent to-signal-400/10 blur-3xl"
      />

      <div className="glass relative overflow-hidden rounded-3xl shadow-panel">
        {/* app chrome */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.07] px-5 py-3.5">
          <div className="flex items-center gap-2.5">
            <span className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-white/12" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/12" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/12" />
            </span>
            <span className="ml-2 text-xs font-medium text-ink-muted">Pipeline · All leads</span>
          </div>
          <DemoDataBadge />
        </div>

        {/* stats */}
        <div className="grid grid-cols-2 gap-px border-b border-white/[0.07] bg-white/[0.05] lg:grid-cols-4">
          {dashboardStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={reduce ? false : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              className="bg-canvas-raised p-4 sm:p-5"
            >
              <div className="flex items-center gap-2 text-ink-faint">
                <Icon name={stat.icon} className="h-3.5 w-3.5" />
                <span className="text-[0.6875rem] font-medium uppercase tracking-wider">{stat.label}</span>
              </div>
              <div className="mt-2 font-display text-2xl text-ink sm:text-[1.75rem]">{stat.value}</div>
              <div className="mt-0.5 text-[0.6875rem] text-signal-300">{stat.delta}</div>
            </motion.div>
          ))}
        </div>

        {/* pipeline columns */}
        <div className="no-scrollbar overflow-x-auto">
          <div className="flex min-w-[52rem] gap-3 p-4 sm:p-5">
            {pipelineStages.map((stage, stageIndex) => {
              const leads = sampleLeads.filter((lead) => lead.stage === stageIndex);
              return (
                <div key={stage.name} className="w-[11rem] shrink-0">
                  <div className="mb-3 flex items-center justify-between gap-2 px-1">
                    <div className="flex min-w-0 items-center gap-2">
                      <span className={cn('h-1.5 w-1.5 shrink-0 rounded-full', toneRing[stage.tone])} />
                      <span className="truncate text-xs font-medium text-ink-muted">{stage.name}</span>
                    </div>
                    <span className="shrink-0 rounded-full bg-white/[0.06] px-1.5 py-0.5 text-[0.625rem] text-ink-faint">
                      {stage.count}
                    </span>
                  </div>

                  <div className="space-y-2">
                    {leads.map((lead) => (
                      <motion.div
                        key={lead.name}
                        initial={reduce ? false : { opacity: 0, y: 8 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: stageIndex * 0.05 }}
                        className="rounded-xl border border-surface-border bg-canvas-raised p-3"
                      >
                        <div className="truncate text-xs font-medium text-ink">{lead.name}</div>
                        <div className="mt-1 truncate text-[0.6875rem] text-ink-muted">{lead.service}</div>
                        <div className="mt-2.5 flex items-center justify-between gap-2">
                          <span className="font-mono text-[0.6875rem] text-signal-300">
                            ${lead.value.toLocaleString('en-US')}
                          </span>
                          <span className="truncate text-[0.625rem] text-ink-faint">{lead.time}</span>
                        </div>
                        <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-white/[0.05] px-1.5 py-0.5 text-[0.5625rem] uppercase tracking-wide text-ink-faint">
                          {lead.source}
                        </div>
                      </motion.div>
                    ))}

                    {leads.length === 0 ? (
                      <div className="rounded-xl border border-dashed border-surface-border/70 p-3 text-center text-[0.625rem] text-ink-faint">
                        {stage.count} more
                      </div>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <p className="mt-4 text-center text-xs text-ink-faint">
        Illustrative interface and sample data. Your board is configured around your own stages and services.
      </p>
    </div>
  );
}
