'use client';
import Link from 'next/link';
import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ArrowRight, Github, ExternalLink, X, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

type Project = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  longDescription: string;
  category: string;
  year: string;
  image: string;
  gradient: string;
  metrics: { label: string; value: string }[];
  stack: string[];
  journey: string[];
  liveUrl?: string;
  githubUrl?: string;
};

const PROJECTS: Project[] = [
  {
    id: 'glasshaven',
    name: 'Glasshaven',
    tagline: 'Premium real estate, reimagined',
    description:
      'A full-stack premium real estate platform enabling seamless property search, browsing, and secure purchase management.',
    longDescription:
      'Built a full-stack real estate platform where clients can browse premium estate listings and initiate property purchases securely. Paired the client-facing experience with an advanced Admin Dashboard featuring role-based access, allowing admins to efficiently manage, review, and confirm customer orders. Used TypeScript and Next.js for high-performance server-side rendering, backed by a secure MySQL database.',
    category: 'Real Estate / Full-Stack',
    year: '2025',
    image:
      'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1600',
    gradient: 'from-cyan-500/30 via-blue-600/20 to-transparent',
    metrics: [
      { label: 'Stack', value: 'Next.js' },
      { label: 'Database', value: 'MySQL' },
      { label: 'Access', value: 'Role-Based' },
      { label: 'Rendering', value: 'SSR' },
    ],
    stack: ['Next.js', 'TypeScript', 'MySQL', 'Tailwind CSS'],
    journey: [
      'Designed property listing and search flows so clients can browse premium estates with rich filtering.',
      'Built a secure purchase-initiation flow letting clients start property transactions directly from a listing.',
      'Developed an advanced Admin Dashboard with role-based permissions to manage and review customer orders.',
      'Implemented order confirmation workflows so admins can approve or reject purchase requests.',
      'Used Next.js server-side rendering with TypeScript for fast page loads and a secure MySQL schema for data integrity.',
    ],
    liveUrl: 'https://glasshaven-estates.vercel.app', // TODO: add live demo link
    githubUrl: 'https://github.com/imranalfarabidevworks/glasshaven',
  },
  {
    id: 'freshmart',
    name: 'FreshMart',
    tagline: 'Modern e-commerce, made simple',
    description:
      'A fully featured e-commerce application built for smooth shopping experiences and secure transactions.',
    longDescription:
      'Built an end-to-end e-commerce platform covering interactive product listings, a dynamic shopping cart, and a streamlined checkout workflow. Integrated a secure payment gateway flow to handle client transactions and financial data safely, and implemented robust user authentication and session management using Better Auth alongside MongoDB.',
    category: 'E-Commerce',
    year: '2025',
    image:
      'https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=1600',
    gradient: 'from-emerald-500/30 via-teal-600/20 to-transparent',
    metrics: [
      { label: 'Stack', value: 'Next.js' },
      { label: 'Database', value: 'MongoDB' },
      { label: 'Auth', value: 'Better Auth' },
      { label: 'Checkout', value: 'Stripe' },
    ],
    stack: ['Next.js', 'TypeScript', 'MongoDB', 'Better Auth', 'Tailwind CSS'],
    journey: [
      'Built interactive product listing pages with dynamic filtering and a persistent shopping cart.',
      'Designed a streamlined, multi-step checkout workflow to reduce friction at purchase time.',
      'Integrated a secure payment gateway flow to handle client transactions and financial data.',
      'Implemented user authentication and session management with Better Auth on top of MongoDB.',
      'Structured MongoDB schemas for products, orders, and users to support fast, reliable queries.',
    ],
    liveUrl: 'https://freshmart-bay.vercel.app', // TODO: add live demo link
    githubUrl: 'https://github.com/imranalfarabidevworks/Fresh-Mart',
  },
  {
    id: 'launch-forge',
    name: 'Launch-Forge',
    tagline: 'Build your own web space in minutes',
    description:
      'A web-building platform that lets authenticated users configure and deploy their own localized micro-websites.',
    longDescription:
      'Created a web-building platform where authenticated users can sign up, manage their profile, and create a small personalized web space of their own. Built a custom content management layer for individuals to configure their site, powered by Supabase for real-time data tracking, cloud storage, and schema management. Designed an intuitive, responsive interface optimized for fluid layout changes and drag-and-drop mechanics.',
    category: 'SaaS / Website Builder',
    year: '2025',
    image:
      'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1600',
    gradient: 'from-amber-500/30 via-orange-600/20 to-transparent',
    metrics: [
      { label: 'Stack', value: 'Next.js' },
      { label: 'Backend', value: 'Supabase' },
      { label: 'Auth', value: 'Better Auth' },
      { label: 'Editing', value: 'Drag & Drop' },
    ],
    stack: ['Next.js', 'TypeScript', 'Supabase', 'Better Auth', 'Tailwind CSS'],
    journey: [
      'Built account sign-up and profile management so users can create their own personalized web space.',
      'Developed a custom content management layout for configuring pages without touching code.',
      'Used Supabase for real-time data tracking, cloud storage, and schema management.',
      'Designed a responsive, intuitive interface optimized for fluid layout modifications.',
      'Implemented drag-and-drop mechanics so users can rearrange their site sections visually.',
    ],
    liveUrl: 'https://lanuch-forge-gold.vercel.app', // TODO: add live demo link
    githubUrl: 'https://github.com/imranalfarabidevworks/lanuch-forge',
  },
];

function ProjectCard({ project, onSelect }: { project: Project; onSelect: () => void }) {
  const [ref, rect] = useBounds();

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden rounded-3xl border border-border/60 bg-card/40 backdrop-blur-sm"
      style={{
        transform: `perspective(1200px) rotateY(${rect ? (rect.centerX - 0.5) * -6 : 0}deg) rotateX(${rect ? (rect.centerY - 0.5) * 4 : 0}deg)`,
        transitionProperty: 'transform',
        transitionDuration: '300ms',
      }}
    >
      <button onClick={onSelect} className="block w-full text-left" data-cursor="pointer">
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={project.image}
            alt={project.name}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div className={cn('absolute inset-0 bg-gradient-to-t', project.gradient)} />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />

          <div className="absolute left-4 top-4 flex gap-2">
            <Badge variant="secondary" className="glass rounded-full text-xs">
              {project.category}
            </Badge>
            <Badge variant="outline" className="glass rounded-full text-xs">
              {project.year}
            </Badge>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-6">
            <p className="font-mono text-xs text-primary">{project.tagline}</p>
            <h3 className="mt-1 font-display text-2xl font-bold tracking-tight">
              {project.name}
            </h3>
          </div>

          <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/90 text-primary-foreground opacity-0 transition-all duration-300 group-hover:opacity-100">
            <ArrowUpRight className="h-4 w-4" />
          </div>
        </div>

        <div className="p-6">
          <p className="text-sm leading-relaxed text-muted-foreground line-clamp-2">
            {project.description}
          </p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.stack.slice(0, 5).map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-border/50 bg-background/40 px-2 py-0.5 font-mono text-[10px] text-muted-foreground"
              >
                {tech}
              </span>
            ))}
            {project.stack.length > 5 && (
              <span className="rounded-md border border-border/50 bg-background/40 px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
                +{project.stack.length - 5}
              </span>
            )}
          </div>

          <div className="mt-5 grid grid-cols-4 gap-2 border-t border-border/40 pt-5">
            {project.metrics.map((metric) => (
              <div key={metric.label}>
                <div className="font-display text-lg font-bold text-primary">
                  {metric.value}
                </div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </button>
    </motion.article>
  );
}

function useBounds() {
  const ref = React.useRef<HTMLElement>(null);
  const [bounds, setBounds] = React.useState<{ centerX: number; centerY: number } | null>(null);

  React.useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      setBounds({
        centerX: (e.clientX - rect.left) / rect.width,
        centerY: (e.clientY - rect.top) / rect.height,
      });
    };
    const leave = () => setBounds(null);
    window.addEventListener('mousemove', handle);
    const el = ref.current;
    el?.addEventListener('mouseleave', leave);
    return () => {
      window.removeEventListener('mousemove', handle);
      el?.removeEventListener('mouseleave', leave);
    };
  }, []);

  return [ref, bounds] as const;
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  React.useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const hasLive = Boolean(project.liveUrl);
  const hasCode = Boolean(project.githubUrl);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-background/80 backdrop-blur-md" />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl border border-border bg-card shadow-2xl"
      >
        <div className="relative aspect-[16/8] overflow-hidden">
          <img src={project.image} alt={project.name} className="h-full w-full object-cover" />
          <div className={cn('absolute inset-0 bg-gradient-to-t', project.gradient)} />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />

          <button
            onClick={onClose}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full glass-strong transition-colors hover:text-primary"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
            <div className="flex gap-2">
              <Badge variant="secondary" className="glass rounded-full text-xs">
                {project.category}
              </Badge>
              <Badge variant="outline" className="glass rounded-full text-xs">
                {project.year}
              </Badge>
            </div>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              {project.name}
            </h2>
            <p className="mt-1 font-mono text-sm text-primary">{project.tagline}</p>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <p className="text-base leading-relaxed text-muted-foreground">
            {project.longDescription}
          </p>

          <div className="mt-8">
            <h3 className="flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-wider">
              <Layers className="h-4 w-4 text-primary" />
              Architecture & Stack
            </h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-lg border border-border/60 bg-background/40 px-3 py-1.5 font-mono text-xs"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {project.metrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-xl border border-border/60 bg-background/40 p-5"
              >
                <div className="font-display text-3xl font-bold text-primary">
                  {metric.value}
                </div>
                <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider">
              Development Journey
            </h3>
            <ol className="mt-4 space-y-4">
              {project.journey.map((step, i) => (
                <li key={i} className="flex gap-4">
                  <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-primary/10 font-mono text-xs text-primary">
                    {i + 1}
                  </span>
                  <p className="pt-0.5 text-sm leading-relaxed text-muted-foreground">
                    {step}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          {(hasLive || hasCode) && (
            <div className="mt-8 flex flex-col gap-3 border-t border-border/40 pt-6 sm:flex-row">
              {hasLive && (
                <Button className="flex-1 rounded-full" asChild>
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Live Demo
                  </a>
                </Button>
              )}
              {hasCode && (
                <Button variant="outline" className="flex-1 rounded-full" asChild>
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    View Code
                  </a>
                </Button>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export function ProjectsShowcase() {
  const [selected, setSelected] = React.useState<Project | null>(null);

  return (
    <section id="projects" className="relative py-32">
      <div className="absolute inset-0 dot-pattern opacity-30" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="font-mono text-xs uppercase tracking-widest text-primary">
            Featured Work
          </p>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Products That <span className="text-gradient">Ship</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-balance text-muted-foreground">
            Three platforms. Tens of thousands of users. Real impact delivered
            through thoughtful engineering.
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-3">
          {PROJECTS.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onSelect={() => setSelected(project)}
            />
          ))}
        </div>

        {/* View All Projects CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 flex justify-center"
        >
          <Link href="/projects" className="group relative" data-cursor="pointer">
            <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-cyan-400 via-primary to-cyan-600 opacity-40 blur transition-opacity duration-500 group-hover:opacity-80" />
            <div className="relative flex items-center gap-3 overflow-hidden rounded-full border border-border/60 bg-card/60 px-8 py-4 backdrop-blur-sm transition-all duration-300 group-hover:border-primary/50 group-hover:bg-card/90">
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-primary/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <span className="font-display text-sm font-semibold tracking-wide">
                View All Projects
              </span>
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </span>
            </div>
          </Link>
        </motion.div>
      </div>

      <AnimatePresence>
        {selected && (
          <ProjectModal project={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}