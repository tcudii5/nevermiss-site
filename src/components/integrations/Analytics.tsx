import Script from 'next/script';

/**
 * ANALYTICS LOADERS
 * Each block only renders when its environment variable is set, so an
 * unconfigured site ships zero third-party script tags.
 *
 * Configure in Netlify → Site settings → Environment variables:
 *   NEXT_PUBLIC_GA_MEASUREMENT_ID   G-XXXXXXXXXX      (Google Analytics 4)
 *   NEXT_PUBLIC_GOOGLE_ADS_ID       AW-XXXXXXXXX      (Google Ads)
 *   NEXT_PUBLIC_META_PIXEL_ID       15-digit pixel ID (Meta)
 *   NEXT_PUBLIC_GHL_TRACKING_ID     GHL location ID
 *
 * Conversion firing lives in lib/analytics.ts (client helper) and is called
 * from the demo form on successful submission.
 */
export function Analytics() {
  const ga = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const ads = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
  const pixel = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const ghl = process.env.NEXT_PUBLIC_GHL_TRACKING_ID;
  const gtagId = ga || ads;

  return (
    <>
      {gtagId ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gtagId}`}
            strategy="afterInteractive"
          />
          <Script id="gtag-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              ${ga ? `gtag('config', '${ga}', { anonymize_ip: true });` : ''}
              ${ads ? `gtag('config', '${ads}');` : ''}
            `}
          </Script>
        </>
      ) : null}

      {pixel ? (
        <>
          <Script id="meta-pixel" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window,document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${pixel}');
              fbq('track', 'PageView');
            `}
          </Script>
          <noscript>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              height="1"
              width="1"
              style={{ display: 'none' }}
              alt=""
              src={`https://www.facebook.com/tr?id=${pixel}&ev=PageView&noscript=1`}
            />
          </noscript>
        </>
      ) : null}

      {ghl ? (
        <Script
          src="https://widgets.leadconnectorhq.com/loader.js"
          data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js"
          data-location-id={ghl}
          strategy="lazyOnload"
        />
      ) : null}
    </>
  );
}
