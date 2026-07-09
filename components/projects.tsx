'use client';

import * as React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Github, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// ১. এই ফাইলের ভেতরেই সরাসরি ১০টি প্রজেক্টের ডেটা অ্যারে (কোনো ইম্পোর্ট ঝামেলা নেই)
const MY_PROJECTS = [
  {
    id: '1',
    name: 'Glasshaven',
    category: 'Next.js',
    year: '2026',
    tagline: 'Premium real estate, reimagined',
    description: 'A full-stack premium real estate platform enabling seamless property search, browsing, and secure interaction.',
    image: '/images/glasshaven.jpg', // আপনার প্রজেক্টের ইমেজ পাথ দিন
    gradient: 'from-blue-600/20 to-transparent',
    stack: ['Next.js', 'TypeScript', 'MySQL', 'Tailwind CSS'],
    metrics: [
      { value: 'Next.js', label: 'STACK' },
      { value: 'MySQL', label: 'DATABASE' },
      { value: 'Role-Based', label: 'ACCESS' },
      { value: 'SSR', label: 'RENDERING' }
    ],
    liveUrl: 'https://farabi-portfoliopro.vercel.app', // আপনার লাইভ লিংক
    githubUrl: 'https://github.com/imranalfarabidevworks' // আপনার গিটহাব লিংক
  },
  {
    id: '2',
    name: 'FreshMart',
    category: 'Next.js',
    year: '2026',
    tagline: 'Modern e-commerce, made simple',
    description: 'A fully featured e-commerce application built for smooth shopping experiences and secure checkouts.',
    image: '/images/freshmart.jpg',
    gradient: 'from-emerald-600/20 to-transparent',
    stack: ['Next.js', 'TypeScript', 'MongoDB', 'Better Auth', 'Tailwind CSS'],
    metrics: [
      { value: 'Next.js', label: 'STACK' },
      { value: 'MongoDB', label: 'DATABASE' },
      { value: 'Better Auth', label: 'AUTH' },
      { value: 'Streamlined', label: 'CHECKOUT' }
    ],
    liveUrl: '#',
    githubUrl: '#'
  },
  {
    id: '3',
    name: 'Launch-Forge',
    category: 'Next.js',
    year: '2026',
    tagline: 'Build your own web space in minutes',
    description: 'A web-building platform that lets authenticated users configure and deploy their own localized layouts.',
    image: '/images/launchforge.jpg',
    gradient: 'from-purple-600/20 to-transparent',
    stack: ['Next.js', 'TypeScript', 'Supabase', 'Better Auth', 'Tailwind CSS'],
    metrics: [
      { value: 'Next.js', label: 'STACK' },
      { value: 'Supabase', label: 'BACKEND' },
      { value: 'Better Auth', label: 'AUTH' },
      { value: 'Drag & Drop', label: 'EDITING' }
    ],
    liveUrl: '#',
    githubUrl: '#'
  },
  // <-- বাকি ৭টি প্রজেক্টের অবজেক্ট ঠিক এই লাইনের নিচে কমা (,) দিয়ে এক এক করে বসিয়ে দিন
];

export function AllProjects() {
  return (
    <main className="relative min-h-screen py-24 sm:py-32 bg-background">
      {/* Background Glow Settings */}
      <div className="absolute inset-0 dot-pattern opacity-20" />
      <div className="absolute left-1/2 top-0 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Back Link to Home */}
        <Link
          href="/"
          className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
          Back home
        </Link>

        {/* Header Title */}
        <div className="mt-8 mb-16">
          <p className="font-mono text-xs uppercase tracking-widest text-primary">
            Archive · {MY_PROJECTS.length} Projects
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            All <span className="text-gradient">Projects</span>
          </h1>
          <p className="mt-4 max-w-2xl text-muted-foreground text-sm">
            সবগুলো প্রজেক্টের লিস্ট এবং সোর্স কোড এখানে সিরিয়াল অনুযায়ী সাজানো রয়েছে।
          </p>
        </div>

        {/* Grid Area */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {MY_PROJECTS.map((project, i) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group relative overflow-hidden rounded-3xl border border-border/60 bg-card/40 backdrop-blur-sm flex flex-col justify-between h-full"
            >
              <div>
                {/* Project Image View */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  {project.image && (
                    <img
                      src={project.image}
                      alt={project.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  )}
                  <div className={`absolute inset-0 bg-gradient-to-t ${project.gradient}`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />

                  <div className="absolute left-4 top-4 flex gap-2">
                    <Badge variant="secondary" className="glass rounded-full text-[10px]">
                      {project.category}
                    </Badge>
                    <Badge variant="outline" className="glass rounded-full text-[10px]">
                      {project.year}
                    </Badge>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="font-mono text-xs text-primary">{project.tagline}</p>
                    <h3 className="mt-1 font-display text-xl font-bold tracking-tight---">
                      {project.name}
                    </h3>
                  </div>
                </div>

                {/* Card Details Body */}
                <div className="p-6">
                  <p className="text-sm leading-relaxed text-muted-foreground line-clamp-2">
                    {project.description}
                  </p>

                  {/* Tech Stack List */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-border/50 bg-background/40 px-2 py-0.5 font-mono text-[10px] text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Metrics Row mapping */}
                  <div className="mt-5 grid grid-cols-4 gap-2 border-t border-border/40 pt-5">
                    {project.metrics.map((metric) => (
                      <div key={metric.label}>
                        <div className="font-display text-[11px] font-bold text-primary truncate sm:text-xs">
                          {metric.value}
                        </div>
                        <div className="text-[9px] uppercase tracking-wider text-muted-foreground mt-0.5">
                          {metric.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons Inside Card */}
              <div className="px-6 pb-6 mt-auto flex gap-2 pt-4 border-t border-border/20">
                <Button size="sm" className="flex-1 rounded-xl text-xs h-9" asChild>
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
                    Live Demo
                  </a>
                </Button>
                <Button size="sm" variant="outline" className="flex-1 rounded-xl text-xs h-9" asChild>
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-1.5 h-3.5 w-3.5" />
                    Code
                  </a>
                </Button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </main>
  );
}