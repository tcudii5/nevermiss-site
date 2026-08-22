import Link from 'next/link';
import { LogoMark } from './LogoMark';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Section';
import { nav, site } from '@/content/site.config';

export function Footer() {
  const year = new Date().getFullYear();
  const socials = Object.entries(site.social).filter(([, url]) => Boolean(url));

  return (
    <footer className="relative border-t border-surface-border bg-canvas-sunken">
      <Container className="py-14 sm:py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          <div className="max-w-sm">
            <LogoMark />
            <p className="mt-4 text-sm leading-relaxed text-ink-muted">
              An AI receptionist and CRM for service businesses. Answer every missed call, qualify every lead, and
              keep the follow-up running while you work.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="/contact" size="sm">
                Book a Free Demo
              </Button>
            </div>
            <address className="mt-8 space-y-1.5 not-italic text-sm text-ink-muted">
              <div>
                <a href={`mailto:${site.contact.email}`} className="transition-colors hover:text-ink">
                  {site.contact.email}
                </a>
              </div>
              <div>
                <a href={`tel:${site.contact.phoneHref}`} className="transition-colors hover:text-ink">
                  {site.contact.phone}
                </a>
              </div>
              <div className="text-ink-faint">
                {site.contact.address.street}
                <br />
                {site.contact.address.city}, {site.contact.address.region} {site.contact.address.postalCode}
              </div>
            </address>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {Object.entries(nav.footer).map(([heading, links]) => (
              <div key={heading}>
                <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-faint">{heading}</h2>
                <ul className="mt-4 space-y-3">
                  {links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-sm text-ink-muted transition-colors hover:text-ink">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-surface-border pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-ink-faint">
            © {year} {site.legalName}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-ink-faint">
            {socials.map(([label, url]) => (
              <a
                key={label}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="capitalize transition-colors hover:text-ink"
              >
                {label}
              </a>
            ))}
            <Link href="/privacy" className="transition-colors hover:text-ink">
              Privacy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-ink">
              Terms
            </Link>
          </div>
        </div>

        <p className="mt-6 max-w-3xl text-[0.6875rem] leading-relaxed text-ink-faint">
          Product visuals on this site use illustrative sample data. Figures shown in the missed-lead calculator are
          estimates based on the inputs you provide and are not a projection or guarantee of results.
        </p>
      </Container>
    </footer>
  );
}
