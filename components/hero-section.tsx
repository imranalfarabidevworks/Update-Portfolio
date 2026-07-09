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
  'top-left': 'top-0 left-0 -translate-x-1/2 -translate-y-1/2',
  'top-right': 'top-0 right-0 translate-x-1/2 -translate-y-1/2',
  'bottom-right': 'bottom-0 right-0 translate-x-1/2 translate-y-1/2',
  'bottom-left': 'bottom-0 left-0 -translate-x-1/2 translate-y-1/2',
};


function PhotoWithOrbit() {
  return (
    <div className="relative mx-auto h-64 w-64 sm:h-80 sm:w-80 lg:h-[22rem] lg:w-[22rem]">
      {/* ambient glow behind everything */}
      <div className="absolute inset-0 -z-10 rounded-full bg-primary/20 blur-3xl" />

     
      <div className="absolute inset-6 overflow-visible">
        <Image
          src="https://i.ibb.co.com/KccKQ324/Whats-App-Image-2025-12-08-at-6-03-13-PM-removebg-preview.png"
          alt="Imran Al Farabi"
          fill
          sizes="(max-width: 768px) 256px, 352px"
          className="object-contain drop-shadow-2xl"
          priority
        />
      </div>

      
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, ease: 'linear', duration: 18 }}
      >
        {ORBIT_TECHS.map(({ name, Icon, corner }) => (
          <div
            key={name}
            className={`absolute h-12 w-12 sm:h-14 sm:w-14 ${CORNER_POSITION[corner]}`}
          >
            {/* counter-rotate so the icon itself stays upright */}
            <motion.div
              className="glass flex h-full w-full items-center justify-center rounded-full border border-border/60 shadow-lg"
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, ease: 'linear', duration: 18 }}
              title={name}
            >
              <Icon className="h-6 w-6 text-primary sm:h-7 sm:w-7" />
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
      className="relative flex min-h-screen items-center justify-center overflow-hidden pt-16"
    >
      <HeroCanvas />

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background" />
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-background to-transparent" />
        <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-4 lg:px-8 xl:gap-2">
        {/* ---------------- Left: text content ---------------- */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="text-center lg:text-left"
        >
          <motion.div variants={item} className="mb-6 flex justify-center lg:justify-start">
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
            className="font-display text-5xl font-bold leading-[0.95] tracking-tight sm:text-7xl lg:text-6xl xl:text-7xl"
          >
            <span className="block">IMRAN AL</span>
            <span className="block text-gradient">FARABI</span>
          </motion.h1>

          <motion.div
            variants={item}
            className="mt-6 flex flex-col items-center gap-3 lg:items-start"
          >
            <AnimatedRole />
            <p className="max-w-2xl text-balance text-base text-muted-foreground sm:text-lg">
              I build digital products that solve real problems.
            </p>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start"
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
              <a href="https://github.com/imranalfarabidevworks" target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </a>
            </Button>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-12 flex items-center justify-center gap-2 text-xs text-muted-foreground lg:justify-start"
          >
            <MapPin className="h-3 w-3" />
            <span>Dhaka, Bangladesh · UTC+6</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.6 }}
            className="mt-12 lg:mt-16"
          >
            <div className="glass mx-auto grid max-w-md grid-cols-3 gap-4 rounded-2xl px-6 py-5 lg:mx-0">
              <StatBlock value="5+" label="Years" />
              <div className="border-x border-border/50">
                <StatBlock value="40+" label="Projects" />
              </div>
              <StatBlock value="15+" label="AI Models" />
            </div>
          </motion.div>
        </motion.div>

        {/* ---------------- Right: photo with orbiting logos ---------------- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="order-first lg:order-last lg:-translate-x-10 xl:-translate-x-16"
        >
          <PhotoWithOrbit />
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