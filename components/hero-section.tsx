'use client';

import * as React from 'react';
import Image from 'next/image';
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
    <div className="flex items-center gap-2 font-mono text-xs sm:text-sm text-cyan-400 font-medium">
      <span className="inline-block h-4 w-[2px] animate-pulse bg-cyan-400" />
      <span className="tracking-wide">{displayed}</span>
    </div>
  );
}

function StatBlock({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center p-1">
      <div className="font-display text-xl font-bold text-foreground sm:text-2xl md:text-3xl bg-gradient-to-b from-white to-slate-300 bg-clip-text text-transparent">
        {value}
      </div>
      <div className="mt-1 text-[10px] uppercase tracking-widest text-muted-foreground/80 sm:text-xs">
        {label}
      </div>
    </div>
  );
}

function ReactMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <circle cx="12" cy="12" r="2.2" fill="currentColor" />
      <g stroke="currentColor" strokeWidth="1.4">
        <ellipse cx="12" cy="12" rx="10" ry="4.2" />
        <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(120 12 12)" />
      </g>
    </svg>
  );
}

function NextMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <circle cx="12" cy="12" r="10.5" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M9 8v8M9 8l6.5 8.4M15.5 8v6.2"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function NodeMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <path
        d="M12 2.4 3 7.3v9.4l9 4.9 9-4.9V7.3L12 2.4Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M9 15.4c0 1 .9 1.4 1.9 1.4 1.4 0 2.1-.6 2.1-1.6 0-1-.7-1.3-2-1.6-1.5-.3-2.6-.7-2.6-2.1 0-1.2 1-2 2.4-2 1.1 0 2 .4 2.4 1.3"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MongoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <path
        d="M12 2c2.6 3 4 6.4 4 10 0 4-1.8 7-4 9-2.2-2-4-5-4-9 0-3.6 1.4-7 4-10Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path d="M12 13v8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

const ORBIT_TECHS = [
  { name: 'React', Icon: ReactMark, corner: 'top-left' as const },
  { name: 'Next.js', Icon: NextMark, corner: 'top-right' as const },
  { name: 'Node.js', Icon: NodeMark, corner: 'bottom-right' as const },
  { name: 'MongoDB', Icon: MongoMark, corner: 'bottom-left' as const },
];

const CORNER_POSITION: Record<string, string> = {
  'top-left': 'top-2 left-2 sm:top-0 sm:left-0 -translate-x-1/4 -translate-y-1/4 sm:-translate-x-1/3 sm:-translate-y-1/3',
  'top-right': 'top-2 right-2 sm:top-0 sm:right-0 translate-x-1/4 -translate-y-1/4 sm:translate-x-1/3 sm:-translate-y-1/3',
  'bottom-right': 'bottom-2 right-2 sm:bottom-0 sm:right-0 translate-x-1/4 translate-y-1/4 sm:translate-x-1/3 sm:translate-y-1/3',
  'bottom-left': 'bottom-2 left-2 sm:bottom-0 sm:left-0 -translate-x-1/4 translate-y-1/4 sm:-translate-x-1/3 sm:translate-y-1/3',
};

function PhotoWithOrbit() {
  return (
    <div className="relative mx-auto h-72 w-72 sm:h-85 sm:w-85 md:h-[24rem] md:w-[24rem] lg:h-[26rem] lg:w-[26rem] -translate-x-2 md:-translate-x-8 lg:-translate-x-12">
      {/* Soft Background Glow */}
      <div className="absolute inset-0 -z-10 rounded-full bg-gradient-to-tr from-cyan-500/10 to-primary/10 blur-3xl animate-pulse-glow" />

      {/* 
        ✨ গ্লাসমরফিজম মাস্ক কন্টেইনার:
        ছবির চারকোণা সলিড কালো বক্সকে ঢাকার জন্য ব্যাকড্রপ ব্লার ফিল্টার অ্যাড করা হয়েছে।
      */}
      <div className="absolute inset-2 overflow-hidden rounded-full border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01] backdrop-blur-[12px] shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.08)]">
        
        {/* গ্লাস ওভারলে গ্রেডিয়েন্ট ফিল্টার */}
        <div className="absolute inset-0 z-10 rounded-full bg-gradient-to-t from-background/30 via-transparent to-transparent pointer-events-none" />
        
        <Image
          src="https://i.ibb.co.com/KccKQ324/Whats-App-Image-2025-12-08-at-6-03-13-PM-removebg-preview.png"
          alt="Imran Al Farabi"
          fill
          sizes="(max-width: 640px) 280px, (max-width: 1024px) 360px, 420px"
         
          className="object-cover scale-105 translate-y-2 mix-blend-screen brightness-110 contrast-105 transition-transform duration-500 hover:scale-110"
          priority
        />
      </div>

      {/* আইকন অরবিট লেয়ার */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-20"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, ease: 'linear', duration: 28 }}
      >
        {ORBIT_TECHS.map(({ name, Icon, corner }) => (
          <div
            key={name}
            className={`absolute h-11 w-11 sm:h-13 sm:w-13 md:h-14 md:w-14 pointer-events-auto ${CORNER_POSITION[corner]}`}
          >
            <motion.div
              className="glass flex h-full w-full items-center justify-center rounded-full border border-white/15 bg-background/80 shadow-[0_4px_15px_rgba(0,0,0,0.4)] backdrop-blur-md transition-all hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(34,211,238,0.3)]"
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, ease: 'linear', duration: 28 }}
              title={name}
            >
              <Icon className="h-5.5 w-5.5 text-cyan-400 sm:h-6 sm:w-6 md:h-6.5 md:w-6.5" />
            </motion.div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden pt-20 pb-16 lg:pt-24"
    >
      <HeroCanvas />

      {/* Layer Overlay Gradients */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] sm:h-[700px] sm:w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/5 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-4 lg:px-8 xl:gap-8">
        
        {/* Right Content (Image) - Mobile ফ্রেন্ডলি পজিশন */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="order-first lg:order-last lg:-translate-x-4 xl:-translate-x-8"
        >
          <PhotoWithOrbit />
        </motion.div>

        {/* Left Content (Text) */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="text-center lg:text-left flex flex-col justify-center"
        >
          <motion.div variants={item} className="mb-5 flex justify-center lg:justify-start">
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

          <motion.h1
            variants={item}
            className="font-display text-4xl font-extrabold leading-[0.95] tracking-tight sm:text-6xl md:text-7xl lg:text-6xl xl:text-7xl text-white"
          >
            <span className="block">IMRAN AL</span>
            <span className="block text-gradient bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">FARABI</span>
          </motion.h1>

          <motion.div
            variants={item}
            className="mt-5 flex flex-col items-center gap-2.5 lg:items-start"
          >
            <AnimatedRole />
            <p className="max-w-xl text-balance text-sm sm:text-base text-muted-foreground leading-relaxed">
              I build high-performance user interfaces and responsive digital products that combine beautiful dark aesthetics with clean code.
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            variants={item}
            className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start"
          >
            <Button
              size="lg"
              onClick={() =>
                document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
              }
              className="group w-full rounded-full bg-primary px-7 text-sm font-medium hover:bg-primary/90 sm:w-auto transition-all shadow-[0_0_20px_rgba(34,211,238,0.15)] hover:shadow-[0_0_25px_rgba(34,211,238,0.3)]"
            >
              <Sparkles className="mr-2 h-4 w-4 text-cyan-200" />
              Explore Work
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="w-full rounded-full px-7 text-sm font-medium border-white/10 bg-white/5 hover:bg-white/10 sm:w-auto transition-all"
            >
              <a href="https://github.com/imranalfarabidevworks" target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </a>
            </Button>
          </motion.div>

          {/* Location Info */}
          <motion.div
            variants={item}
            className="mt-10 flex items-center justify-center gap-2 text-[11px] font-mono text-muted-foreground/80 lg:justify-start"
          >
            <MapPin className="h-3 w-3 text-cyan-400" />
            <span>Dhaka, Bangladesh · UTC+6</span>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            className="mt-10 lg:mt-12"
          >
            <div className="glass mx-auto grid max-w-sm grid-cols-3 gap-2 rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-4 sm:px-6 lg:mx-0 shadow-xl">
              <StatBlock value="3rd Year" label="Honors" />
              <div className="border-x border-white/5">
                <StatBlock value="40+" label="Projects" />
              </div>
              <StatBlock value="15+" label="UI Designs" />
            </div>
          </motion.div>
        </motion.div>

      </div>

      {/* Animated Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden sm:block"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="flex flex-col items-center gap-1.5 text-muted-foreground/60 hover:text-muted-foreground transition-colors cursor-pointer"
          onClick={() => document.querySelector('#story')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <span className="font-mono text-[9px] uppercase tracking-widest">Scroll</span>
          <ArrowDown className="h-3.5 w-3.5" />
        </motion.div>
      </motion.div>
    </section>
  );
}