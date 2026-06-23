'use client';

import * as React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Code2,
  GraduationCap,
  Rocket,
  BrainCircuit,
  Telescope,
  type LucideIcon,
} from 'lucide-react';

type Chapter = {
  num: number;
  icon: LucideIcon;
  title: string;
  subtitle: string;
  body: string;
  highlight: string;
  accent: string;
};

const CHAPTERS: Chapter[] = [
  {
    num: 1,
    icon: Code2,
    title: 'How I Started Programming',
    subtitle: 'The first keystroke',
    body: "It began with curiosity and a single line of HTML. I was mesmerized — a few characters in a text file could become something alive in a browser. That spark never faded. I'd sneak in hours after class, building crude websites, breaking things, and rebuilding them better. Each error was a lesson. Each small win, a revelation.",
    highlight: 'console.log("hello, world")',
    accent: 'from-cyan-500/20 to-blue-500/5',
  },
  {
    num: 2,
    icon: GraduationCap,
    title: 'My Learning Journey',
    subtitle: 'From tutorials to architecture',
    body: "I consumed everything — documentation at midnight, open-source codebases on weekends, and architecture books until the concepts clicked. I learned that great software isn't just about working code; it's about systems that scale, teams that thrive, and users that feel understood. The foundation was set.",
    highlight: 'git clone → study → iterate → repeat',
    accent: 'from-emerald-500/20 to-teal-500/5',
  },
  {
    num: 3,
    icon: Rocket,
    title: 'Building Real Products',
    subtitle: 'Shipping to real users',
    body: "Then came real products — platforms used by thousands. A health analytics system deployed in clinics. A job portal connecting careers. A community services platform unifying local help. Each taught me the gap between prototype and production, between features and impact. I learned to obsess over the details users never see but always feel.",
    highlight: 'deploy → monitor → scale → iterate',
    accent: 'from-amber-500/20 to-orange-500/5',
  },
  {
    num: 4,
    icon: BrainCircuit,
    title: 'AI Engineering',
    subtitle: 'Teaching machines to think',
    body: "AI shifted how I see problems. Models that diagnose prescriptions. Pipelines that understand language. Agents that take action. I dove deep — fine-tuning, RAG architectures, inference optimization. The goal isn't AI for its own sake; it's AI that earns its place by solving problems humans alone couldn't.",
    highlight: 'model.fit(x, y) → predictions → impact',
    accent: 'from-violet-500/20 to-fuchsia-500/5',
  },
  {
    num: 5,
    icon: Telescope,
    title: 'Future Vision',
    subtitle: 'What comes next',
    body: "I'm building toward a future where software is ambient, intelligent, and deeply human — systems that anticipate needs rather than demand attention. Where AI amplifies creativity instead of replacing it. Where every product feels tailor-made. That's the future I'm engineering toward, one commit at a time.",
    highlight: 'while (true) { build(); }',
    accent: 'from-sky-500/20 to-indigo-500/5',
  },
];

function ChapterCard({ chapter, index }: { chapter: Chapter; index: number }) {
  const ref = React.useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0.3]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.92, 1, 1, 0.96]);

  const isReversed = index % 2 === 1;

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen items-center justify-center py-32"
    >
      <div
        className={`pointer-events-none absolute inset-0 bg-gradient-to-b ${chapter.accent} opacity-50`}
      />

      <motion.div
        style={{ opacity, scale }}
        className={`relative grid w-full max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8 ${isReversed ? 'lg:[direction:rtl]' : ''}`}
      >
        <motion.div style={{ y }} className={`[direction:ltr] ${isReversed ? 'lg:order-2' : ''}`}>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative mb-6 inline-flex"
          >
            <div className="absolute inset-0 animate-pulse-glow rounded-2xl bg-primary/20 blur-xl" />
            <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-border/60 bg-card/60 backdrop-blur-sm">
              <chapter.icon className="h-7 w-7 text-primary" />
            </div>
            <span className="absolute -right-3 -top-3 flex h-8 w-8 items-center justify-center rounded-full bg-primary font-display text-sm font-bold text-primary-foreground">
              {chapter.num}
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mb-2 font-mono text-xs uppercase tracking-widest text-primary"
          >
            Chapter {chapter.num.toString().padStart(2, '0')} · {chapter.subtitle}
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
          >
            {chapter.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ delay: 0.15, duration: 0.7 }}
            className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            {chapter.body}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-8 inline-flex items-center gap-2 rounded-lg border border-border/60 bg-card/40 px-4 py-2 font-mono text-xs text-primary"
          >
            <span className="text-muted-foreground">~</span>
            {chapter.highlight}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: isReversed ? -60 : 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className={`relative [direction:ltr] ${isReversed ? 'lg:order-1' : ''}`}
        >
          <div className="relative aspect-square w-full max-w-md mx-auto">
            <div className="absolute inset-0 animate-spin-slow rounded-full border border-dashed border-primary/20" />
            <div className="absolute inset-8 rounded-full border border-primary/10" />
            <div className="absolute inset-16 rounded-full border border-primary/5" />

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative h-32 w-32">
                <chapter.icon className="h-full w-full text-primary/80" strokeWidth={0.8} />
                <div className="absolute inset-0 animate-pulse-glow rounded-full bg-primary/10 blur-2xl" />
              </div>
            </div>

            {[0, 60, 120, 180, 240, 300].map((angle, i) => (
              <motion.div
                key={angle}
                className="absolute left-1/2 top-1/2"
                style={{
                  transform: `rotate(${angle}deg) translateY(-48%)`,
                }}
              >
                <motion.div
                  animate={{
                    scale: [1, 1.4, 1],
                    opacity: [0.4, 1, 0.4],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.5,
                  }}
                  className="h-3 w-3 rounded-full bg-primary shadow-[0_0_16px_rgba(6,182,212,0.6)]"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

export function StoryExperience() {
  return (
    <section id="story" className="relative">
      <div className="relative mx-auto max-w-7xl px-4 py-32 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-xs uppercase tracking-widest text-primary">
            The Journey
          </p>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            A Story Worth <span className="text-gradient">Telling</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-balance text-muted-foreground">
            Five chapters. One mission. Scroll through the evolution of a builder
            who never stopped learning.
          </p>
        </motion.div>
      </div>

      {CHAPTERS.map((chapter, i) => (
        <ChapterCard key={chapter.num} chapter={chapter} index={i} />
      ))}
    </section>
  );
}
