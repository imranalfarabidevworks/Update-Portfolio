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
          {/* আপনার রিকোয়েস্ট অনুযায়ী পেছনের গ্রিড প্যাটার্ন ও অন্যান্য বাড়তি এলিমেন্ট সম্পূর্ণ বাদ দেওয়া হয়েছে */}
          <div className="absolute left-1/2 top-1/2 h-[250px] w-[250px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-3xl sm:h-[400px] sm:w-[400px] md:h-[500px] md:w-[500px]" />

          <div className="relative flex w-full max-w-xs flex-col items-center px-4 sm:max-w-sm sm:px-6 md:max-w-md">
            {/* প্রোফাইল ইমেজ কন্টেইনার (লোগো এফেক্টের সাথে ইন্টিগ্রেটেড) */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative mb-6 sm:mb-8"
            >
              {/* নিয়ন এবং গ্লোয়িং ডাবল রিং অ্যানিমেশন */}
              <div className="absolute inset-0 animate-spin-slow rounded-full border border-cyan-500/30" />
              <div className="absolute inset-1.5 animate-pulse-glow rounded-full border-2 border-primary/20" />
              
              {/* ইমেজ হোল্ডার ফ্রেম */}
              <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-white/10 p-1 bg-card/50 backdrop-blur-md sm:h-24 sm:w-24 md:h-28 md:w-28 shadow-[0_0_20px_rgba(34,211,238,0.15)]">
                {/* ঘূর্ণায়মান অরবিট ডটস */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0 p-0"
                >
                  <div className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
                </motion.div>

                {/* আপনার দেওয়া ইমেজ লিংকটি এখানে সুন্দরভাবে রাউন্ডেড ফ্রেমে সেট করা হয়েছে */}
                <div className="h-full w-full overflow-hidden rounded-full border border-white/5 bg-muted">
                  <img 
                    src="https://i.ibb.co.com/gM7T1mJ6/IMG-20260714-214135-142.png" 
                    alt="Imran Al Farabi" 
                    className="h-full w-full object-cover brightness-105"
                  />
                </div>
              </div>
            </motion.div>

            {/* টেক্সট কন্টেন্ট */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-6 text-center sm:mb-8"
            >
              <h1 className="font-display text-xl font-bold tracking-tight sm:text-2xl md:text-3xl bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                Imran Al Farabi
              </h1>
              <p className="mt-1 font-mono text-[10px] tracking-widest text-cyan-400/80 sm:text-xs">
                FRONTEND DEVELOPER · UI/UX · PRODUCTS
              </p>
            </motion.div>

            {/* প্রোগ্রেস বার এবং বুট স্ট্যাটাস */}
            <div className="w-full px-2">
              <div className="relative h-[3px] w-full overflow-hidden rounded-full bg-white/5">
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600"
                  style={{ width: `${progress}%` }}
                />
                <motion.div
                  className="absolute inset-y-0 w-24 rounded-full bg-gradient-to-r from-transparent via-white/40 to-transparent"
                  animate={{ left: ['-20%', '120%'] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                />
              </div>
              <div className="mt-3 flex items-center justify-between font-mono text-[10px] text-muted-foreground sm:text-[11px]">
                <span className="truncate pr-4 text-slate-400">{BOOT_LINES[currentLine]}</span>
                <span className="tabular-nums font-semibold text-cyan-400 shrink-0">{Math.round(progress)}%</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}