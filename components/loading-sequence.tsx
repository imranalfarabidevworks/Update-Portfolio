'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BOOT_LINES = [
  'Initializing Farabi OS...',
  'Loading neural interfaces...',
  'Calibrating 3D engine...',
  'Mounting particle systems...',
  'Synchronizing design tokens...',
  'Warming up the experience...',
  'Ready.',
];

export function LoadingSequence({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = React.useState(0);
  const [currentLine, setCurrentLine] = React.useState(0);
  const [done, setDone] = React.useState(false);

  React.useEffect(() => {
    const start = Date.now();
    const duration = 2200;

    const tick = () => {
      const elapsed = Date.now() - start;
      const p = Math.min(100, (elapsed / duration) * 100);
      setProgress(p);
      setCurrentLine(Math.min(
        BOOT_LINES.length - 1,
        Math.floor((p / 100) * BOOT_LINES.length),
      ));

      if (p < 100) {
        requestAnimationFrame(tick);
      } else {
        setTimeout(() => setDone(true), 350);
        setTimeout(onComplete, 1100);
      }
    };
    const raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute inset-0 grid-pattern opacity-30" />
          <div className="absolute left-1/2 top-1/2 h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl sm:h-[400px] sm:w-[400px] md:h-[500px] md:w-[500px]" />

          <div className="relative flex w-full max-w-xs flex-col items-center px-4 sm:max-w-sm sm:px-6 md:max-w-md">
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative mb-6 sm:mb-8"
            >
              <div className="absolute inset-0 animate-spin-slow rounded-full border border-primary/30" />
              <div className="absolute inset-2 animate-pulse-glow rounded-full border-2 border-primary/20" />
              <div className="relative flex h-16 w-16 items-center justify-center sm:h-20 sm:w-20 md:h-24 md:w-24">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0"
                >
                  <div className="absolute -top-1 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-primary sm:h-2 sm:w-2" />
                  <div className="absolute -bottom-1 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-primary/50 sm:h-2 sm:w-2" />
                </motion.div>
                <span className="font-display text-2xl font-bold text-gradient sm:text-3xl">F</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-6 text-center sm:mb-8"
            >
              <h1 className="font-display text-lg font-bold tracking-tight sm:text-2xl md:text-3xl">
                Imran Al Farabi
              </h1>
              <p className="mt-1 font-mono text-[10px] text-muted-foreground sm:text-xs">
                FULL STACK · AI · PRODUCTS
              </p>
            </motion.div>

            <div className="w-full">
              <div className="relative h-1 w-full overflow-hidden rounded-full bg-border">
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-cyan-400 via-primary to-cyan-600"
                  style={{ width: `${progress}%` }}
                />
                <motion.div
                  className="absolute inset-y-0 w-16 rounded-full bg-gradient-to-r from-transparent via-white/60 to-transparent sm:w-24"
                  animate={{ left: ['0%', '100%'] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
                />
              </div>
              <div className="mt-4 flex items-center justify-between font-mono text-[10px] text-muted-foreground sm:text-[11px]">
                <span className="truncate pr-2">{BOOT_LINES[currentLine]}</span>
                <span className="tabular-nums shrink-0">{Math.round(progress)}%</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}