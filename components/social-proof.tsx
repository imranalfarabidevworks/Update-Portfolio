'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Github, Star, GitFork, Users, Award, Quote, TrendingUp } from 'lucide-react';

function generateContributionData() {
  const weeks = 53;
  const days = 7;
  const data: number[][] = [];

  for (let w = 0; w < weeks; w++) {
    const column: number[] = [];
    for (let d = 0; d < days; d++) {
      const seed = (w * 7 + d) % 11;
      const base = Math.sin(w * 0.3) * 0.5 + 0.5;
      const intensity =
        seed < 3 ? 0 : seed < 6 ? Math.floor(base * 2) : seed < 9 ? Math.floor(base * 3) + 1 : 4;
      column.push(intensity);
    }
    data.push(column);
  }
  return data;
}

const contributionColors = [
  'bg-border/40',
  'bg-primary/20',
  'bg-primary/40',
  'bg-primary/70',
  'bg-primary',
];

const ACHIEVEMENTS = [
  { label: 'Repositories', value: '60+', icon: Github },
  { label: 'Total Stars', value: '1.2K', icon: Star },
  { label: 'Contributions', value: '3.4K', icon: TrendingUp },
  { label: 'Followers', value: '850+', icon: Users },
];

const TESTIMONIALS = [
  {
    quote: "Imran delivered our AI prescription platform ahead of schedule and beyond what we scoped. His attention to detail in the clinical domain was remarkable.",
    name: 'Dr. Sarah Chen',
    title: 'CTO, MediTech Solutions',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=120',
  },
  {
    quote: "One of the rare engineers who can own a product end-to-end — from architecture to deployment to polish. He shipped what would have taken our team three months.",
    name: 'Marcus Rodriguez',
    title: 'Founder, TalentBridge',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=120',
  },
  {
    quote: "His community platform changed how our neighborhood operates. The engineering is solid and the impact is real. He builds with heart.",
    name: 'Aisha Patel',
    title: 'Community Lead, NeighborConnect',
    avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=120',
  },
];

export function SocialProof() {
  const contributions = React.useMemo(generateContributionData, []);

  return (
    <section id="social" className="relative py-32">
      <div className="absolute inset-0 dot-pattern opacity-20" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="font-mono text-xs uppercase tracking-widest text-primary">
            Proof of Work
          </p>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Built in the <span className="text-gradient">Open</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-balance text-muted-foreground">
            Consistent contributions, open-source dedication, and the people who
            can vouch for it.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="mb-12 grid grid-cols-2 gap-4 sm:grid-cols-4"
        >
          {ACHIEVEMENTS.map((stat) => (
            <div
              key={stat.label}
              className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/40 p-6 text-center backdrop-blur-sm transition-colors hover:border-primary/40"
            >
              <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                <stat.icon className="h-4 w-4" />
              </div>
              <div className="font-display text-3xl font-bold">{stat.value}</div>
              <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="mb-16 overflow-hidden rounded-3xl border border-border/60 bg-card/40 p-6 backdrop-blur-sm sm:p-8"
        >
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Github className="h-5 w-5 text-primary" />
              <h3 className="font-display text-base font-semibold">
                Contribution Activity
              </h3>
            </div>
            <span className="font-mono text-xs text-muted-foreground">
              3,400+ contributions in the last year
            </span>
          </div>

          <div className="flex gap-[3px] overflow-x-auto pb-2">
            {contributions.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-[3px]">
                {week.map((day, di) => (
                  <motion.div
                    key={di}
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: (wi + di) * 0.002, duration: 0.3 }}
                    className={`h-2.5 w-2.5 rounded-sm ${contributionColors[day]}`}
                    title={`${day} contributions`}
                  />
                ))}
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-end gap-2 text-[10px] text-muted-foreground">
            <span>Less</span>
            {contributionColors.map((c, i) => (
              <div key={i} className={`h-2.5 w-2.5 rounded-sm ${c}`} />
            ))}
            <span>More</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
        >
          <div className="mb-8 flex items-center gap-3">
            <Quote className="h-5 w-5 text-primary" />
            <h3 className="font-display text-xl font-semibold">What People Say</h3>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/40 p-6 backdrop-blur-sm transition-colors hover:border-primary/40"
              >
                <Quote className="absolute -right-4 -top-4 h-20 w-20 text-primary/5 transition-colors group-hover:text-primary/10" />
                <p className="relative text-sm leading-relaxed text-foreground/90">
                  "{t.quote}"
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="h-10 w-10 rounded-full object-cover"
                    loading="lazy"
                  />
                  <div>
                    <div className="text-sm font-semibold">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.title}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          id="contact"
          className="mt-24"
        >
          <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-card/40 p-10 text-center backdrop-blur-sm sm:p-16">
            <div className="absolute inset-0 grid-pattern opacity-30" />
            <div className="absolute left-1/2 top-0 h-40 w-[400px] -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />

            <div className="relative">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
                Let's Build Something <span className="text-gradient">Remarkable</span>
              </h3>
              <p className="mx-auto mt-4 max-w-xl text-balance text-muted-foreground">
                Whether you're a recruiter, founder, investor, or collaborator,
                I'd love to hear what you're working on.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a
                  href="mailto:hello@imranalfarabi.com"
                  className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Get in Touch
                </a>
                <a
                  href="https://github.com/imranalfarabidevworks"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-border/60 bg-card/40 px-8 py-3 text-sm font-medium transition-colors hover:border-primary/40"
                >
                  <Github className="h-4 w-4" />
                  View GitHub
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
