/**
 * SOCIAL PROOF — INTENTIONALLY EMPTY
 *
 * This array ships empty on purpose. Nothing here is invented, and the
 * testimonial section does not render at all while it is empty.
 *
 * To turn it on:
 *   1. Add real, permission-granted quotes below.
 *   2. Drop headshots in /public/testimonials/ and set `photo` to the path.
 *   3. Set NEXT_PUBLIC_SHOW_TESTIMONIALS=true in your environment.
 *
 * Never publish a result claim you cannot substantiate — the FTC treats
 * fabricated testimonials and unsubstantiated results as deceptive advertising.
 */
export type Testimonial = {
  name: string;
  company: string;
  industry: string;
  /** Path under /public, e.g. '/testimonials/jane.jpg'. Leave '' for initials. */
  photo: string;
  quote: string;
  /** Optional outcome line. Only use figures the customer confirmed. */
  result?: string;
};

export const testimonials: Testimonial[] = [];
