'use client';

import * as React from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export function Cursor() {
  const [isVisible, setIsVisible] = React.useState(false);
  const [isPointer, setIsPointer] = React.useState(false);
  const [isHidden, setIsHidden] = React.useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  React.useEffect(() => {
    const isTouchDevice = window.matchMedia('(hover: none)').matches;
    if (isTouchDevice) {
      setIsHidden(true);
      return;
    }

    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);

      const target = e.target as HTMLElement;
      const isInteractive =
        target.closest('a, button, [role="button"], input, textarea, select, [data-cursor="pointer"]') !== null;
      setIsPointer(isInteractive);
    };

    const leave = () => setIsVisible(false);

    window.addEventListener('mousemove', move);
    document.addEventListener('mouseleave', leave);

    return () => {
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseleave', leave);
    };
  }, [cursorX, cursorY]);

  if (isHidden) return null;

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[9999] hidden md:block"
      style={{ x: cursorXSpring, y: cursorYSpring }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="rounded-full border border-primary/50"
        animate={{
          width: isPointer ? 40 : 24,
          height: isPointer ? 40 : 24,
          x: isPointer ? -20 : -12,
          y: isPointer ? -20 : -12,
          backgroundColor: isPointer ? 'rgba(0, 180, 255, 0.1)' : 'rgba(0, 180, 255, 0.03)',
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      />
      <motion.div
        className="absolute left-0 top-0 rounded-full bg-primary"
        animate={{
          width: isPointer ? 6 : 4,
          height: isPointer ? 6 : 4,
          x: isPointer ? -3 : -2,
          y: isPointer ? -3 : -2,
        }}
      />
    </motion.div>
  );
}
