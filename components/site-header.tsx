'use client';

import * as React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useScroll, useMotionValueEvent, motion as m } from 'framer-motion';
import { Menu, X, Command } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useCommandMenu } from '@/components/command-menu';

const navItems = [
  { label: 'Home', href: '#hero' },
  { label: 'Story', href: '#story' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Social', href: '#social' },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { scrollY } = useScroll();
  const { setOpen } = useCommandMenu();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 40);
  });

  const handleNav = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <m.header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500',
        scrolled ? 'py-3' : 'py-5',
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={cn(
            'flex items-center justify-between rounded-2xl px-4 transition-all duration-500 sm:px-6',
            scrolled
              ? 'glass-strong h-14 shadow-lg shadow-black/5'
              : 'h-14 bg-transparent',
          )}
        >
          {/* Logo Section */}
          <Link
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleNav('#hero');
            }}
            className="group flex items-center gap-2"
          >
            {/* লোগো কন্টেইনার এবং ইমেজ সাইজ অপ্টিমাইজড ও গ্লো ইফেক্ট যুক্ত করা হয়েছে */}
            <div className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-primary via-cyan-500 to-blue-600 p-[1.5px] transition-transform duration-300 group-hover:scale-105 shadow-[0_0_15px_rgba(34,211,238,0.2)] group-hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]">
              <div className="flex h-full w-full items-center justify-center rounded-[6px] bg-background overflow-hidden">
                <img 
                  src="https://i.ibb.co.com/7NTN0hp9/Chat-GPT-Image-Jul-10-2026-08-47-19-PM.png" 
                  alt="Farabi Logo"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>
            
            <span className="font-display text-sm font-semibold tracking-tight transition-colors duration-300 group-hover:text-primary">
              Farabi
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNav(item.href)}
                className="relative rounded-lg px-3 py-1.5 text-sm text-muted-foreground transition-all duration-300 hover:text-foreground hover:bg-white/5"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Actions Button Section */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setOpen(true)}
              className="hidden items-center gap-1.5 text-muted-foreground sm:flex hover:bg-white/5"
            >
              <Command className="h-3.5 w-3.5" />
              <span className="text-xs">K</span>
            </Button>
            
            <Button
              size="sm"
              onClick={() => handleNav('#contact')}
              className="rounded-full bg-primary px-5 font-medium transition-all duration-300 hover:bg-primary/90 shadow-[0_0_15px_rgba(34,211,238,0.15)] hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]"
            >
              Let's Talk
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden hover:bg-white/5"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu Open with Smooth Animation */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="mt-2 overflow-hidden md:hidden"
            >
              <div className="glass-strong flex flex-col gap-1 rounded-2xl p-2 border border-white/5 shadow-xl">
                {navItems.map((item) => (
                  <button
                    key={item.href}
                    onClick={() => handleNav(item.href)}
                    className="rounded-xl px-4 py-3 text-left text-sm font-medium text-muted-foreground transition-all duration-200 hover:bg-white/5 hover:text-foreground"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </m.header>
  );
}