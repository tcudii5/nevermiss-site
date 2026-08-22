'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown } from 'lucide-react';
import { LogoMark } from './LogoMark';
import { Button } from '@/components/ui/Button';
import { nav, site } from '@/content/site.config';
import { cn } from '@/lib/utils';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile sheet on navigation.
  useEffect(() => {
    setOpen(false);
    setSolutionsOpen(false);
  }, [pathname]);

  // Lock body scroll while the mobile sheet is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        setSolutionsOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const isActive = (href: string) => pathname === href || (href !== '/' && pathname.startsWith(href));

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled ? 'border-b border-white/[0.07] bg-canvas/85 backdrop-blur-xl' : 'border-b border-transparent',
      )}
    >
      <nav aria-label="Main" className="mx-auto flex h-16 max-w-content items-center justify-between gap-4 px-5 sm:px-8">
        <LogoMark />

        {/* Desktop nav */}
        <ul className="hidden items-center gap-1 lg:flex">
          {nav.primary.map((item) =>
            'children' in item && item.children ? (
              <li
                key={item.label}
                className="relative"
                onMouseEnter={() => setSolutionsOpen(true)}
                onMouseLeave={() => setSolutionsOpen(false)}
              >
                <button
                  type="button"
                  aria-expanded={solutionsOpen}
                  aria-haspopup="true"
                  onClick={() => setSolutionsOpen((v) => !v)}
                  className={cn(
                    'flex items-center gap-1 rounded-full px-3.5 py-2 text-sm transition-colors',
                    isActive('/ai-receptionist') || isActive('/crm-automation')
                      ? 'text-ink'
                      : 'text-ink-muted hover:text-ink',
                  )}
                >
                  {item.label}
                  <ChevronDown aria-hidden className={cn("h-3.5 w-3.5 transition-transform", solutionsOpen && "rotate-180")} />
                </button>
                {solutionsOpen ? (
                  <div className="absolute left-1/2 top-full w-[22rem] -translate-x-1/2 pt-3">
                    <div className="glass rounded-2xl p-2 shadow-panel">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block rounded-xl px-3.5 py-3 transition-colors hover:bg-white/[0.06]"
                        >
                          <div className="text-sm font-medium text-ink">{child.label}</div>
                          <div className="mt-0.5 text-xs leading-relaxed text-ink-muted">{child.description}</div>
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : null}
              </li>
            ) : (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'rounded-full px-3.5 py-2 text-sm transition-colors',
                    isActive(item.href) ? 'text-ink' : 'text-ink-muted hover:text-ink',
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ),
          )}
        </ul>

        <div className="hidden items-center gap-2 lg:flex">
          <Button href={site.loginUrl} variant="ghost" size="sm">
            Login
          </Button>
          <Button href="/contact" size="sm">
            Book a Demo
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-surface-border text-ink lg:hidden"
        >
          {open ? <X aria-hidden className="h-5 w-5" /> : <Menu aria-hidden className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile sheet */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-white/[0.07] bg-canvas/98 backdrop-blur-xl lg:hidden"
      >
        <ul className="flex flex-col gap-1 px-5 py-6">
          {nav.primary.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className="block rounded-xl px-3 py-3 text-base text-ink transition-colors hover:bg-white/[0.05]"
              >
                {item.label}
              </Link>
              {'children' in item && item.children ? (
                <ul className="ml-3 border-l border-surface-border pl-3">
                  {item.children.map((child) => (
                    <li key={child.href}>
                      <Link
                        href={child.href}
                        className="block rounded-lg px-3 py-2.5 text-sm text-ink-muted transition-colors hover:text-ink"
                      >
                        {child.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          ))}
          <li>
            <Link
              href="/about"
              className="block rounded-xl px-3 py-3 text-base text-ink transition-colors hover:bg-white/[0.05]"
            >
              About
            </Link>
          </li>
        </ul>
        <div className="flex flex-col gap-3 border-t border-surface-border px-5 py-6">
          <Button href="/contact" size="lg">
            Book a Free Demo
          </Button>
          <Button href={site.loginUrl} variant="outline" size="lg">
            Login
          </Button>
        </div>
      </div>
    </header>
  );
}
