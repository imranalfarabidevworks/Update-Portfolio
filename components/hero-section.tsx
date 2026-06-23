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

const ROLES = ['Full Stack Developer', 'AI Engineer', 'Product Builder'];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.3 },
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
    <div className="flex items-center gap-2 font-mono text-sm text-primary">
      <span className="inline-block h-4 w-[2px] animate-pulse bg-primary" />
      <span>{displayed}</span>
    </div>
  );
}

function StatBlock({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="font-display text-2xl font-bold text-foreground sm:text-3xl">
        {value}
      </div>
      <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
        {label}
      </div>
    </div>
  );
}

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden pt-16"
    >
      <HeroCanvas />

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background" />
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-background to-transparent" />
        <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.div variants={item} className="mb-6 flex justify-center">
            <Badge
              variant="outline"
              className="glass gap-2 rounded-full px-4 py-1.5 text-xs font-medium"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
              </span>
              <span className="text-muted-foreground">Available for opportunities</span>
            </Badge>
          </motion.div>

          <motion.h1
            variants={item}
            className="font-display text-5xl font-bold leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl"
          >
            <span className="block">IMRAN AL</span>
            <span className="block text-gradient">FARABI</span>
          </motion.h1>

          <motion.div variants={item} className="mt-6 flex flex-col items-center gap-3">
            <AnimatedRole />
            <p className="max-w-2xl text-balance text-base text-muted-foreground sm:text-lg">
              "I build digital products that solve real problems."
            </p>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Button
              size="lg"
              onClick={() =>
                document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
              }
              className="group w-full rounded-full bg-primary px-8 text-base hover:bg-primary/90 sm:w-auto"
            >
              <Sparkles className="mr-2 h-4 w-4" />
              Explore Work
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="w-full rounded-full px-8 text-base sm:w-auto"
            >
              <a href="https://github.com/imranalfarabi" target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </a>
            </Button>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-12 flex items-center justify-center gap-2 text-xs text-muted-foreground"
          >
            <MapPin className="h-3 w-3" />
            <span>Dhaka, Bangladesh · UTC+6</span>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="mt-16"
        >
          <div className="glass mx-auto grid max-w-md grid-cols-3 gap-4 rounded-2xl px-6 py-5">
            <StatBlock value="5+" label="Years" />
            <div className="border-x border-border/50">
              <StatBlock value="40+" label="Projects" />
            </div>
            <StatBlock value="15+" label="AI Models" />
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex flex-col items-center gap-2 text-muted-foreground"
        >
          <span className="font-mono text-[10px] uppercase tracking-widest">Scroll</span>
          <ArrowDown className="h-4 w-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}
