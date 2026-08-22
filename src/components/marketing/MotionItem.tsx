'use client';

import { motion, type Variants } from 'framer-motion';

/**
 * Thin client wrapper so server components can hand children to a staggered
 * <Reveal> without becoming client components themselves.
 */
export function MotionItem({
  children,
  variants,
  className,
}: {
  children: React.ReactNode;
  variants: Variants;
  className?: string;
}) {
  return (
    <motion.div variants={variants} className={className}>
      {children}
    </motion.div>
  );
}
