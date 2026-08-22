import { ImageResponse } from 'next/og';
import { site } from '@/content/site.config';

export const runtime = 'edge';
export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/** Generated social card so every share has a branded image, no design file needed. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, #07090E 0%, #0B0F16 55%, #0D1F1A 100%)',
          padding: '72px',
          color: '#F4F7FB',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 14,
              background: 'linear-gradient(135deg, #5FEDBC, #07A46E)',
            }}
          />
          <div style={{ fontSize: 34, fontWeight: 600, letterSpacing: -0.5 }}>{site.name}</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ fontSize: 74, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2.5, maxWidth: 940 }}>
            Never lose another customer to a missed call.
          </div>
          <div style={{ fontSize: 30, color: '#9AA7BD', maxWidth: 880, lineHeight: 1.4 }}>
            AI receptionist, lead qualification, booking and CRM follow-up for service businesses.
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 24, color: '#34E0A1' }}>
          <div style={{ width: 12, height: 12, borderRadius: 999, background: '#34E0A1' }} />
          Responds in seconds · 24/7
        </div>
      </div>
    ),
    size,
  );
}
