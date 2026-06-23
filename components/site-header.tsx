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
          <Link
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleNav('#hero');
            }}
            className="group flex items-center gap-2"
          >
            <div className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-primary to-cyan-600 text-sm font-bold text-white">
              <span className="font-display">F</span>
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>
            <span className="font-display text-sm font-semibold tracking-tight">
              Farabi
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNav(item.href)}
                className="relative rounded-lg px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setOpen(true)}
              className="hidden items-center gap-1.5 text-muted-foreground sm:flex"
            >
              <Command className="h-3.5 w-3.5" />
              <span className="text-xs">K</span>
            </Button>
            <Button
              size="sm"
              onClick={() => handleNav('#contact')}
              className="rounded-full bg-primary px-5 hover:bg-primary/90"
            >
              Let's Talk
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-2 overflow-hidden md:hidden"
            >
              <div className="glass-strong flex flex-col gap-1 rounded-2xl p-2">
                {navItems.map((item) => (
                  <button
                    key={item.href}
                    onClick={() => handleNav(item.href)}
                    className="rounded-lg px-4 py-3 text-left text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
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
