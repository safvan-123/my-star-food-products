'use client';
import {motion, MotionConfig, useReducedMotion} from 'motion/react';
import {usePathname} from 'next/navigation';
import type {ReactNode} from 'react';

export function AnimationProvider({children}: {children: ReactNode}) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

export function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={false}
      whileInView={
        reduce ? undefined : {opacity: [0.25, 1], y: [28, 0], scale: [0.98, 1]}
      }
      viewport={{once: true, amount: 0.08}}
      transition={{
        duration: 0.6,
        delay: Math.min(delay, 0.35),
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

export function FloatBox({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      animate={reduce ? undefined : {y: [0, -10, 0], rotate: [0, 0.6, 0, -0.6, 0]}}
      transition={{duration: 6, repeat: Infinity, ease: 'easeInOut'}}
    >
      {children}
    </motion.div>
  );
}

export function PageEntrance({children}: {children: ReactNode}) {
  const path = usePathname();
  const reduce = useReducedMotion();
  return (
    <motion.div
      key={path}
      initial={false}
      animate={reduce ? undefined : {opacity: [0.55, 1], y: [10, 0]}}
      transition={{duration: 0.35, ease: 'easeOut'}}
    >
      {children}
    </motion.div>
  );
}
