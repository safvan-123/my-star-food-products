'use client';
import {motion, MotionConfig, useReducedMotion} from 'motion/react';
import {usePathname} from 'next/navigation';
import type {ReactNode} from 'react';
export function AnimationProvider({children}:{children:ReactNode}) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
export function Reveal({children,delay=0,className=''}:{children:ReactNode;delay?:number;className?:string}) {
  const reduce=useReducedMotion();
  return <motion.div className={className} initial={false} whileInView={reduce?undefined:{opacity:[0.35,1],y:[20,0]}} viewport={{once:true,amount:0.08}} transition={{duration:0.55,delay:Math.min(delay,0.3),ease:'easeOut'}}>{children}</motion.div>;
}
export function PageEntrance({children}:{children:ReactNode}) {
  const path=usePathname(); const reduce=useReducedMotion();
  return <motion.div key={path} initial={false} animate={reduce?undefined:{opacity:[0.6,1],y:[8,0]}} transition={{duration:0.3}}>{children}</motion.div>;
}
