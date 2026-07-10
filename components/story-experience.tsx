'use client';

import * as React from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Code2,
  GraduationCap,
  Rocket,
  BrainCircuit,
  Telescope,
  Terminal,
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
    num: 2,
    icon: Code2,
    title: 'How I Started Programming',
    subtitle: 'The first keystroke',
    body: "It began with curiosity and a single line of HTML. I was mesmerized — a few characters in a text file could become something alive in a browser. That spark never faded. I'd sneak in hours after class, building crude websites, breaking things, and rebuilding them better. Each error was a lesson. Each small win, a revelation.",
    highlight: 'console.log("hello, world")',
    accent: 'from-cyan-500/10 via-transparent to-blue-500/5',
  },
  {
    num: 3,
    icon: GraduationCap,
    title: 'My Learning Journey',
    subtitle: 'From tutorials to architecture',
    body: "I consumed everything — documentation at midnight, open-source codebases on weekends, and architecture books until the concepts clicked. I learned that great software isn't just about working code; it's about systems that scale, teams that thrive, and users that feel understood. The foundation was set.",
    highlight: 'git clone → study → iterate → repeat',
    accent: 'from-emerald-500/10 via-transparent to-teal-500/5',
  },
  {
    num: 4,
    icon: Rocket,
    title: 'Building Real Products',
    subtitle: 'Shipping to real users',
    body: "Then came real products — platforms used by thousands. Each taught me the gap between prototype and production, between features and impact. Balancing aesthetics with performance, I turn complex wireframes into clean, interactive, and production-ready applications that users never see but always feel.",
    highlight: 'deploy → monitor → scale → iterate',
    accent: 'from-amber-500/10 via-transparent to-orange-500/5',
  },
  {
    num: 5,
    icon: BrainCircuit,
    title: 'AI Engineering',
    subtitle: 'Teaching machines to think',
    body: "AI shifted how I see problems. Models that diagnose prescriptions. Pipelines that understand language. Agents that take action. I dove deep — fine-tuning, RAG architectures, inference optimization. The goal isn't AI for its own sake; it's AI that earns its place by solving problems humans alone couldn't.",
    highlight: 'model.fit(x, y) → predictions → impact',
    accent: 'from-violet-500/10 via-transparent to-fuchsia-500/5',
  },
  {
    num: 6,
    icon: Telescope,
    title: 'Future Vision',
    subtitle: 'What comes next',
    body: "I'm building toward a future where software is ambient, intelligent, and deeply human — systems that anticipate needs rather than demand attention. Where AI amplifies creativity instead of replacing it. Where every product feels tailor-made. That's the future I'm engineering toward, one commit at a time.",
    highlight: 'while (true) { build(); }',
    accent: 'from-sky-500/10 via-transparent to-indigo-500/5',
  },
];

function ChapterCard({ chapter, index }: { chapter: Chapter; index: number }) {
  const ref = React.useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0, 1, 1, 0.3]);
  const scale = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0.95, 1, 1, 0.97]);

  const isReversed = index % 2 === 1;

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen items-center justify-center py-24 overflow-hidden"
    >
      {/* Background soft lighting gradient */}
      <div
        className={`pointer-events-none absolute inset-0 bg-gradient-to-b ${chapter.accent} opacity-30`}
      />

      <motion.div
        style={{ opacity, scale }}
        className={`relative grid w-full max-w-6xl items-center gap-12 px-6 lg:grid-cols-2 lg:px-8 ${
          isReversed ? 'lg:[direction:rtl]' : ''
        }`}
      >
        {/* ---------------- Left/Content Side ---------------- */}
        <motion.div style={{ y }} className={`[direction:ltr] ${isReversed ? 'lg:order-2' : ''}`}>
          {/* Chapter Number Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative mb-6 inline-flex"
          >
            <div className="absolute inset-0 animate-pulse rounded-xl bg-cyan-500/10 blur-md" />
            <div className="relative flex h-12 w-12 items-center justify-center rounded-xl border border-white/5 bg-white/[0.02] shadow-[0_0_20px_rgba(34,211,238,0.05)] backdrop-blur-sm">
              <chapter.icon className="h-5 w-5 text-cyan-400" />
            </div>
            <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-cyan-500 font-mono text-[10px] font-bold text-black shadow-md">
              {chapter.num}
            </span>
          </motion.div>

          {/* Subtitle / Chapter Meta */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-cyan-400/80 font-medium"
          >
            Chapter {chapter.num.toString().padStart(2, '0')} · {chapter.subtitle}
          </motion.p>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl"
          >
            {chapter.title}
          </motion.h2>

          {/* Body Description */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="mt-6 text-sm sm:text-base leading-relaxed text-muted-foreground/90 font-light text-balance"
          >
            {chapter.body}
          </motion.p>

          {/* Interactive Console / Code Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/5 bg-white/[0.01] px-4 py-2 font-mono text-xs text-muted-foreground/60 shadow-inner"
          >
            <Terminal className="h-3.5 w-3.5 text-cyan-500/70" />
            <span>~ {chapter.highlight}</span>
          </motion.div>
        </motion.div>

        {/* ---------------- Right/Visual Side (Elegant Picture Orbit) ---------------- */}
        <motion.div
          initial={{ opacity: 0, x: isReversed ? -40 : 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className={`relative flex justify-center [direction:ltr] ${isReversed ? 'lg:order-1 lg:justify-start' : 'lg:justify-end'}`}
        >
          {/* Main Visual Node Outer Circles */}
          <div className="relative h-72 w-72 sm:h-80 sm:w-80 md:h-[24rem] md:w-[24rem] lg:h-[26rem] lg:w-[26rem]">
            {/* Double Circle Radar Rings */}
            <div className="absolute inset-0 rounded-full border border-white/[0.015]" />
            <div className="absolute inset-6 rounded-full border border-white/[0.025]" />
            <div className="absolute inset-12 rounded-full border border-white/[0.035]" />
            <div className="absolute inset-20 rounded-full border border-white/[0.05]" />

            {/* Pulsing Core Glow */}
            <div className="absolute inset-24 rounded-full bg-cyan-500/5 blur-3xl" />

            {/* Only display the Picture inside Chapter 2 frame */}
            {chapter.num === 2 ? (
              <div className="absolute inset-14 overflow-hidden rounded-full border border-white/10 bg-gradient-to-b from-white/[0.03] to-white/[0.01] backdrop-blur-[8px] shadow-[0_20px_50px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.05)]">
                {/* Bottom shadow fade to merge seamlessly */}
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-background/70 via-transparent to-transparent pointer-events-none" />
                <Image
                  src="https://i.ibb.co.com/KccKQ324/Whats-App-Image-2025-12-08-at-6-03-13-PM-removebg-preview.png"
                  alt="Imran Al Farabi"
                  fill
                  sizes="(max-width: 640px) 200px, 300px"
                  className="object-cover scale-105 translate-y-3 mix-blend-screen brightness-110 contrast-105 transition-transform duration-500 hover:scale-110"
                  priority
                />
              </div>
            ) : (
              /* Other Chapters fall back to clean minimalistic vector icon wireframe */
              <div className="absolute inset-14 flex items-center justify-center rounded-full border border-white/5 bg-white/[0.01] backdrop-blur-sm shadow-xl">
                <div className="relative h-24 w-24">
                  <chapter.icon className="h-full w-full text-cyan-400/20" strokeWidth={0.5} />
                  <div className="absolute inset-0 animate-pulse rounded-full bg-cyan-500/5 blur-xl" />
                </div>
              </div>
            )}

            {/* Small Rotating/Floating Indicator Orbit Dots */}
            {[0, 120, 240].map((angle, i) => (
              <div
                key={angle}
                className="absolute left-1/2 top-1/2 animate-spin-slow"
                style={{
                  transform: `rotate(${angle + index * 45}deg) translateY(-48%)`,
                  animationDuration: '12s',
                }}
              >
                <motion.div
                  animate={{ scale: [0.9, 1.2, 0.9], opacity: [0.3, 0.7, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.7 }}
                  className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]"
                />
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

export function StoryExperience() {
  return (
    <section id="story" className="relative bg-background">
      {/* Chapter Section Title Group */}
      <div className="relative mx-auto max-w-7xl px-4 pt-32 pb-12 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-xs uppercase tracking-widest text-cyan-400 font-semibold">
            The Journey
          </p>
          <h2 className="mt-3 font-display text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-white">
            A Story Worth <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Telling</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-balance text-sm sm:text-base text-muted-foreground/80 font-light">
            Five chapters. One mission. Scroll through the evolution of a builder
            who never stopped learning.
          </p>
        </motion.div>
      </div>

      {/* Chapters Mapping Render list */}
      <div className="relative z-10">
        {CHAPTERS.map((chapter, i) => (
          <ChapterCard key={chapter.num} chapter={chapter} index={i} />
        ))}
      </div>
    </section>
  );
}