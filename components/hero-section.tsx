'use client';

import * as React from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { ArrowDown, Github, Sparkles, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const HeroCanvas = dynamic(() => import('./hero-canvas').then((m) => m.HeroCanvas), {
  ssr: false,
});

const ROLES = ['Frontend Developer', 'UI/UX Specialist', 'Product Builder'];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

function AnimatedRole() {
  const [index, setIndex] = React.useState(0);
  const [displayed, setDisplayed] = React.useState('');
  const [phase, setPhase] = React.useState<'typing' | 'pausing' | 'deleting'>('typing');

  React.useEffect(() => {
    const current = ROLES[index];
    let timeout: ReturnType<typeof setTimeout>;

    if (phase === 'typing') {
      if (displayed.length < current.length) {
        timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 60);
      } else {
        timeout = setTimeout(() => setPhase('pausing'), 1600);
      }
    } else if (phase === 'pausing') {
      timeout = setTimeout(() => setPhase('deleting'), 400);
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), 35);
      } else {
        setIndex((i) => (i + 1) % ROLES.length);
        setPhase('typing');
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, index, phase]);

  return (
    <div className="flex items-center gap-2 font-mono text-sm sm:text-base text-cyan-400 font-medium">
      <span className="inline-block h-4 w-[2px] animate-pulse bg-cyan-400" />
      <span className="tracking-wide">{displayed}</span>
    </div>
  );
}

function StatBlock({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center p-2">
      <div className="font-display text-2xl font-bold text-foreground sm:text-3xl bg-gradient-to-b from-white to-slate-300 bg-clip-text text-transparent">
        {value}
      </div>
      <div className="mt-1 text-[10px] uppercase tracking-widest text-muted-foreground/80 sm:text-xs">
        {label}
      </div>
    </div>
  );
}

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden pt-24 pb-16"
    >
      <HeroCanvas />

      {/* Background Glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] sm:h-[800px] sm:w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/5 blur-3xl animate-pulse" />
      </div>

      {/* Main Content - Centered Layout */}
      <div className="relative z-10 mx-auto w-full max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center justify-center"
        >
          {/* Badge */}
          <motion.div variants={item} className="mb-6">
            <Badge
              variant="outline"
              className="glass gap-2 rounded-full px-4 py-1.5 text-[11px] font-medium border-white/5 bg-white/5"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="text-slate-300">Available for opportunities</span>
            </Badge>
          </motion.div>

          {/* Title */}
          <motion.h1
            variants={item}
            className="font-display text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-7xl md:text-8xl text-white"
          >
            IMRAN AL{' '}
            <span className="text-gradient bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 block sm:inline">
              FARABI
            </span>
          </motion.h1>

          {/* Role & Subtitle */}
          <motion.div
            variants={item}
            className="mt-6 flex flex-col items-center gap-3"
          >
            <AnimatedRole />
            <p className="max-w-2xl text-balance text-base sm:text-lg md:text-xl text-muted-foreground/90 leading-relaxed font-light">
              I build high-performance user interfaces and responsive digital products that combine beautiful dark aesthetics with clean, scalable code.
            </p>
          </motion.div>

          {/* CTAs */}
          <motion.div
            variants={item}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row w-full sm:w-auto"
          >
            <Button
              size="lg"
              onClick={() =>
                document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
              }
              className="group w-full sm:w-60 rounded-full bg-primary px-8 py-6 text-base font-medium hover:bg-primary/90 transition-all shadow-[0_0_25px_rgba(34,211,238,0.15)] hover:shadow-[0_0_35px_rgba(34,211,238,0.3)]"
            >
              <Sparkles className="mr-2 h-5 w-5 text-cyan-200" />
              Explore Work
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="w-full sm:w-44 rounded-full px-8 py-6 text-base font-medium border-white/10 bg-white/5 hover:bg-white/10 transition-all"
            >
              <a href="https://github.com/imranalfarabidevworks" target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-5 w-5" />
                GitHub
              </a>
            </Button>
          </motion.div>

          {/* Location */}
          <motion.div
            variants={item}
            className="mt-12 flex items-center justify-center gap-2 text-xs font-mono text-muted-foreground/70"
          >
            <MapPin className="h-3.5 w-3.5 text-cyan-400" />
            <span>Dhaka, Bangladesh · UTC+6</span>
          </motion.div>

          {/* Stats Box */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="mt-12 w-full max-w-md"
          >
            <div className="glass grid grid-cols-3 gap-2 rounded-2xl border border-white/5 bg-white/[0.01] px-6 py-5 shadow-2xl backdrop-blur-md">
              <StatBlock value="3rd Year" label="Honors" />
              <div className="border-x border-white/5">
                <StatBlock value="40+" label="Projects" />
              </div>
              <StatBlock value="15+" label="UI Designs" />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden sm:block"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="flex flex-col items-center gap-1.5 text-muted-foreground/50 hover:text-muted-foreground transition-colors cursor-pointer"
          onClick={() => document.querySelector('#story')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <span className="font-mono text-[9px] uppercase tracking-widest">Scroll Down</span>
          <ArrowDown className="h-4 w-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}