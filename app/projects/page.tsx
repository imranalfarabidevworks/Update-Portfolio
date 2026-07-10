'use client';

import * as React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Github, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// ১. এখানে ১৫টি প্রজেক্টের অ্যারে তৈরি করে দেওয়া হলো
const MY_PROJECTS = [
  
  // 4 to 15
  {
    id: '4',
    name: 'AI PromptHive',
    category: 'React',
    year: '2025',
    tagline: 'Short catchy tagline here',
    description: 'এখানে আপনার ৪র্থ প্রজেক্টের সংক্ষিপ্ত ডেসক্রিপশন লিখুন।',
    image: 'https://i.ibb.co.com/CKBzhyFG/Chat-GPT-Image-Jun-29-2026-10-53-10-PM.png',
    gradient: 'from-amber-600/20 to-transparent',
    stack: ['React', 'Node.js', 'Tailwind'],
    metrics: [{ value: 'MERN', label: 'STACK' }, { value: 'Axios', label: 'API' }, { value: 'JWT', label: 'AUTH' }, { value: '100%', label: 'STABLE' }],
    liveUrl: 'https://ai-prompt-client.vercel.app',
    githubUrl: '#'
  },
  {
    id: '5',
    name: 'Caffe Houes',
    category: 'Next.js',
    year: '2025',
    tagline: 'Short catchy tagline here',
    description: 'এখানে আপনার ৫ম প্রজেক্টের সংক্ষিপ্ত ডেসক্রিপশন লিখুন।',
    image: 'https://i.ibb.co.com/39GBfmzZ/Screenshot-2026-06-26-010557.png',
    gradient: 'from-rose-600/20 to-transparent',
    stack: ['Next.js', 'Prisma', 'Tailwind'],
    metrics: [{ value: 'Next.js', label: 'STACK' }, { value: 'Postgres', label: 'DB' }, { value: 'Clerk', label: 'AUTH' }, { value: 'Edge', label: 'PROP' }],
    liveUrl: 'https://caffee-house.vercel.app',
    githubUrl: '#'
  },
  {
    id: '6',
    name: 'Video Editor',
    category: 'Full-Stack',
    year: '2025',
    tagline: 'Short catchy tagline here',
    description: 'এখানে আপনার ৬ষ্ঠ প্রজেক্টের সংক্ষিপ্ত ডেসক্রিপশন লিখুন।',
    image: 'https://i.ibb.co.com/KxzmXFGj/Screenshot-158.png',
    gradient: 'from-cyan-600/20 to-transparent',
    stack: ['React', 'Express', 'MongoDB'],
    metrics: [{ value: 'MERN', label: 'STACK' }, { value: 'Mongo', label: 'DB' }, { value: 'Firebase', label: 'AUTH' }, { value: '99%', label: 'SPEED' }],
    liveUrl: 'https://video-portfolio-five-ashy.vercel.app',
    githubUrl: '#'
  },
  {
    id: '7',
    name: 'Duzo Food',
    category: 'Frontend',
    year: '2025',
    tagline: 'Short catchy tagline here',
    description: 'এখানে আপনার ৭ম প্রজেক্টের সংক্ষিপ্ত ডেসক্রিপশন লিখুন।',
    image: 'https://i.ibb.co.com/QvGCdg84/image.png',
    gradient: 'from-fuchsia-600/20 to-transparent',
    stack: ['HTML', 'CSS', 'JavaScript'],
    metrics: [{ value: 'JS Native', label: 'STACK' }, { value: 'CSS3', label: 'UI' }, { value: 'DOM', label: 'LOGIC' }, { value: 'Responsive', label: 'LAYOUT' }],
    liveUrl: 'https://duzo-food.vercel.app',
    githubUrl: '#'
  },
  {
    id: '8',
    name: 'Zexo Perfume',
    category: 'React',
    year: '2025',
    tagline: 'Short catchy tagline here',
    description: 'এখানে আপনার ৮ম প্রজেক্টের সংক্ষিপ্ত ডেসক্রিপশন লিখুন।',
    image: 'https://i.ibb.co.com/TD7Fjtf7/image.png',
    gradient: 'from-violet-600/20 to-transparent',
    stack: ['React', 'Redux Toolkit', 'Sass'],
    metrics: [{ value: 'React', label: 'STACK' }, { value: 'Redux', label: 'STATE' }, { value: 'Sass', label: 'STYLING' }, { value: 'Clean', label: 'CODE' }],
    liveUrl: 'https://zexo-perfume.vercel.app',
    githubUrl: '#'
  },
  {
    id: '9',
    name: 'Tiles Gallery',
    category: 'Next.js',
    year: '2025',
    tagline: 'Short catchy tagline here',
    description: 'এখানে আপনার ৯ম প্রজেক্টের সংক্ষিপ্ত ডেসক্রিপশন লিখুন।',
    image: 'https://i.ibb.co.com/2YHrzD89/Screenshot-129.png',
    gradient: 'from-orange-600/20 to-transparent',
    stack: ['Next.js', 'Sanity.io', 'Tailwind'],
    metrics: [{ value: 'Next.js', label: 'STACK' }, { value: 'Sanity', label: 'CMS' }, { value: 'Dynamic', label: 'CONTENT' }, { value: 'SEO', label: 'READY' }],
    liveUrl: 'https://gallery-of-tiles.vercel.app',
    githubUrl: '#'
  },
  {
    id: '10',
    name: 'MediScript',
    category: 'Mobile App',
    year: '2025',
    tagline: 'Short catchy tagline here',
    description: 'এখানে আপনার ১০ম প্রজেক্টের সংক্ষিপ্ত ডেসক্রিপশন লিখুন।',
    image: 'https://i.ibb.co.com/gbDnmN1F/Chat-GPT-Image-Jun-29-2026-11-00-14-PM.png',
    gradient: 'from-indigo-600/20 to-transparent',
    stack: ['React Native', 'Expo', 'Firebase'],
    metrics: [{ value: 'Native', label: 'STACK' }, { value: 'Firestore', label: 'DB' }, { value: 'Push', label: 'NOTIFY' }, { value: 'Android/iOS', label: 'OS' }],
    liveUrl: 'https://mediscript-phi.vercel.app',
    githubUrl: '#'
  },
  {
    id: '11',
    name: 'Task Flow',
    category: 'Next.js',
    year: '2025',
    tagline: 'Short catchy tagline here',
    description: 'এখানে আপনার ১১তম প্রজেক্টের সংক্ষিপ্ত ডেসক্রিপশন লিখুন।',
    image: 'https://i.ibb.co.com/XBXsMjf/image.png',
    gradient: 'from-pink-600/20 to-transparent',
    stack: ['Next.js', 'Framer Motion'],
    metrics: [{ value: 'Next.js', label: 'STACK' }, { value: 'Framer', label: 'ANIMATION' }, { value: 'Micro', label: 'INTERACTION' }, { value: '60 FPS', label: 'PERF' }],
    liveUrl: 'https://task-flow-ebon-phi.vercel.app',
    githubUrl: '#'
  },
  {
    id: '12',
    name: 'Doctor Appointment',
    category: 'React',
    year: '2025',
    tagline: 'Short catchy tagline here',
    description: 'এখানে আপনার ১২তম প্রজেক্টের সংক্ষিপ্ত ডেসক্রিপশন লিখুন।',
    image: 'https://i.ibb.co.com/TMCrvGK4/image.png',
    gradient: 'from-lime-600/20 to-transparent',
    stack: ['React', 'Zustand', 'Shadcn UI'],
    metrics: [{ value: 'React', label: 'STACK' }, { value: 'Zustand', label: 'STATE' }, { value: 'Shadcn', label: 'COMPONENTS' }, { value: 'Atomic', label: 'DESIGN' }],
    liveUrl: 'https://doctor-app-client-opal.vercel.app',
    githubUrl: '#'
  },
  {
    id: '13',
    name: 'Project Thirteen',
    category: 'Backend',
    year: '2025',
    tagline: 'Short catchy tagline here',
    description: 'এখানে আপনার ১৩তম প্রজেক্টের সংক্ষিপ্ত ডেসক্রিপশন লিখুন।',
    image: '/images/project13.jpg',
    gradient: 'from-sky-600/20 to-transparent',
    stack: ['Node.js', 'Express', 'PostgreSQL'],
    metrics: [{ value: 'Node.js', label: 'STACK' }, { value: 'Postgres', label: 'DB' }, { value: 'REST', label: 'ARCH' }, { value: 'Docker', label: 'DEV' }],
    liveUrl: '#',
    githubUrl: '#'
  },
  {
    id: '14',
    name: 'Project Fourteen',
    category: 'Next.js',
    year: '2025',
    tagline: 'Short catchy tagline here',
    description: 'এখানে আপনার ১৪তম প্রজেক্টের সংক্ষিপ্ত ডেসক্রিপশন লিখুন।',
    image: '/images/project14.jpg',
    gradient: 'from-teal-600/20 to-transparent',
    stack: ['Next.js', 'GraphQL', 'Apollo'],
    metrics: [{ value: 'Next.js', label: 'STACK' }, { value: 'GraphQL', label: 'API' }, { value: 'Apollo', label: 'CLIENT' }, { value: 'Type-Safe', label: 'DATA' }],
    liveUrl: '#',
    githubUrl: '#'
  },
  {
    id: '15',
    name: 'Project Fifteen',
    category: 'UI/UX Static',
    year: '2025',
    tagline: 'Short catchy tagline here',
    description: 'এখানে আপনার ১৫তম প্রজেক্টের সংক্ষিপ্ত ডেসক্রিপশন লিখুন।',
    image: '/images/project15.jpg',
    gradient: 'from-yellow-600/20 to-transparent',
    stack: ['Tailwind CSS', 'Alpine.js'],
    metrics: [{ value: 'HTML5', label: 'CORE' }, { value: 'Tailwind', label: 'UTILITY' }, { value: 'Alpine', label: 'INTERACT' }, { value: 'Static', label: 'HOST' }],
    liveUrl: '#',
    githubUrl: '#'
  }
];

export default function ProjectsPage() {
  return (
    <main className="relative min-h-screen py-16 sm:py-24 md:py-32 bg-background text-foreground overflow-x-hidden">
      {/* Background Shapes */}
      <div className="absolute inset-0 dot-pattern opacity-15" />
      <div className="absolute left-1/2 top-0 h-[300px] w-[300px] sm:h-[400px] sm:w-[600px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Back Home Link */}
        <Link
          href="/"
          className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
          Back home
        </Link>

        {/* Responsive Header */}
        <div className="mt-6 mb-12 sm:mt-8 sm:mb-16">
          <p className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-primary">
            Archive · {MY_PROJECTS.length} Projects
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            All Projects
          </h1>
          <p className="mt-3 max-w-2xl text-muted-foreground text-xs sm:text-sm leading-relaxed">
            আমার তৈরি করা ১৫টি প্রজেক্টের লিস্ট এবং সোর্স কোড এখানে রেসপন্সিভ লেআউটে সাজানো রয়েছে।
          </p>
        </div>

        {/* 100% Responsive Grid Layout */}
        {/* মোবাইল ডিভাইসে ১টি, ট্যাবলেটে ২টি এবং ডেক্সটপে ৩টি কলামে অটো-রিসাইজ হবে */}
        <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {MY_PROJECTS.map((project, i) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: Math.min(i * 0.05, 0.3) }}
              className="group relative overflow-hidden rounded-3xl border border-border/60 bg-card/40 backdrop-blur-sm flex flex-col justify-between h-full transition-all duration-300 hover:border-border/100"
            >
              <div>
                {/* Aspect Ratio Responsive Image Section */}
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

                  {/* Top Badges */}
                  <div className="absolute left-3 top-3 sm:left-4 sm:top-4 flex gap-1.5">
                    <Badge variant="secondary" className="glass rounded-full text-[9px] sm:text-[10px] px-2 py-0">
                      {project.category}
                    </Badge>
                    <Badge variant="outline" className="glass rounded-full text-[9px] sm:text-[10px] px-2 py-0">
                      {project.year}
                    </Badge>
                  </div>

                  {/* Image Bottom Info */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                    <p className="font-mono text-[10px] sm:text-xs text-primary">{project.tagline}</p>
                    <h3 className="mt-0.5 font-display text-lg sm:text-xl font-bold tracking-tight">
                      {project.name}
                    </h3>
                  </div>
                </div>

                {/* Card Main content Body */}
                <div className="p-4 sm:p-6">
                  <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground line-clamp-2">
                    {project.description}
                  </p>

                  {/* Tech Stack Responsive Badge List */}
                  <div className="mt-3.5 flex flex-wrap gap-1.5">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-border/50 bg-background/40 px-2 py-0.5 font-mono text-[9px] sm:text-[10px] text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* 4-Column Responsive Metrics Area */}
                  <div className="mt-4 sm:mt-5 grid grid-cols-4 gap-1.5 border-t border-border/40 pt-4 sm:pt-5">
                    {project.metrics.map((metric) => (
                      <div key={metric.label} className="min-w-0">
                        <div className="font-display text-[10px] sm:text-xs font-bold text-primary truncate">
                          {metric.value}
                        </div>
                        <div className="text-[8px] sm:text-[9px] uppercase tracking-wider text-muted-foreground mt-0.5 truncate">
                          {metric.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Responsive Bottom Call-To-Action Buttons */}
              <div className="px-4 pb-4 sm:px-6 sm:pb-6 mt-auto flex gap-2 pt-3 sm:pt-4 border-t border-border/20">
                <Button size="sm" className="flex-1 rounded-xl text-xs h-9 h-8 sm:h-9" asChild>
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
                    Live Demo
                  </a>
                </Button>
                <Button size="sm" variant="outline" className="flex-1 rounded-xl text-xs h-8 sm:h-9" asChild>
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