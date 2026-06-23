'use client';

import * as React from 'react';
import { Command as CommandPrimitive } from 'cmdk';
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Home,
  User,
  FolderGit2,
  Sparkles,
  Mail,
  Github,
  Linkedin,
  FileText,
  Rocket,
  Cpu,
  Brain,
} from 'lucide-react';

type CommandItem = {
  label: string;
  hint?: string;
  icon: React.ElementType;
  action: () => void;
  group: string;
};

type CommandContextValue = {
  open: boolean;
  setOpen: (v: boolean) => void;
};

const Context = React.createContext<CommandContextValue>({
  open: false,
  setOpen: () => {},
});

export function useCommandMenu() {
  return React.useContext(Context);
}

export function CommandMenuProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === '/' && !e.altKey && !e.metaKey && !e.ctrlKey) {
        const target = e.target as HTMLElement;
        if (
          target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable
        )
          return;
        e.preventDefault();
        setOpen(true);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const scrollTo = (sel: string) => {
    setOpen(false);
    setTimeout(() => {
      document.querySelector(sel)?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const openLink = (url: string) => {
    setOpen(false);
    setTimeout(() => window.open(url, '_blank', 'noopener'), 100);
  };

  const items: CommandItem[] = [
    { label: 'Go Home', icon: Home, action: () => scrollTo('#hero'), group: 'Navigation' },
    { label: 'Read My Story', icon: User, action: () => scrollTo('#story'), group: 'Navigation' },
    { label: 'View Projects', icon: FolderGit2, action: () => scrollTo('#projects'), group: 'Navigation' },
    { label: 'Explore Skills', icon: Sparkles, action: () => scrollTo('#skills'), group: 'Navigation' },
    { label: 'Social Proof', icon: Github, action: () => scrollTo('#social'), group: 'Navigation' },
    { label: 'Contact', icon: Mail, action: () => scrollTo('#contact'), group: 'Navigation' },
    {
      label: 'Open Farabi AI',
      hint: 'Chat assistant',
      icon: Brain,
      action: () =>
        document
          .querySelector('[data-farabi-trigger]')
          ?.dispatchEvent(new Event('click', { bubbles: true })),
      group: 'Actions',
    },
    { label: 'AI Prescription Platform', hint: 'Featured project', icon: FileText, action: () => scrollTo('#projects'), group: 'Projects' },
    { label: 'Job Portal Ecosystem', hint: 'Featured project', icon: Rocket, action: () => scrollTo('#projects'), group: 'Projects' },
    { label: 'Community Services Platform', hint: 'Featured project', icon: Cpu, action: () => scrollTo('#projects'), group: 'Projects' },
    { label: 'View GitHub', icon: Github, action: () => openLink('https://github.com/imranalfarabi'), group: 'Connect' },
    { label: 'LinkedIn', icon: Linkedin, action: () => openLink('https://linkedin.com/in/imranalfarabi'), group: 'Connect' },
    { label: 'Send Email', icon: Mail, action: () => openLink('mailto:hello@imranalfarabi.com'), group: 'Connect' },
  ];

  return (
    <Context.Provider value={{ open, setOpen }}>
      {children}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="overflow-hidden p-0 shadow-2xl" aria-describedby={undefined}>
          <DialogTitle className="sr-only">Command Menu</DialogTitle>
          <CommandPrimitive className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group]]:px-2 [&_[cmdk-input]]:h-12">
            <div className="flex items-center gap-2 border-b border-border/50 px-3">
              <Sparkles className="h-4 w-4 text-primary" />
              <CommandPrimitive.Input
                placeholder="Type a command or search..."
                className="h-12 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                autoFocus
              />
            </div>
            <CommandPrimitive.List className="max-h-[400px] overflow-y-auto overflow-x-hidden p-2">
              <CommandPrimitive.Empty className="py-6 text-center text-sm text-muted-foreground">
                No results found.
              </CommandPrimitive.Empty>
              {Array.from(new Set(items.map((i) => i.group))).map((group) => (
                <CommandPrimitive.Group key={group} heading={group}>
                  {items
                    .filter((i) => i.group === group)
                    .map((item) => (
                      <CommandPrimitive.Item
                        key={item.label}
                        onSelect={() => item.action()}
                        className="flex cursor-pointer items-center gap-3 rounded-lg px-2 py-2.5 text-sm aria-selected:bg-accent aria-selected:text-accent-foreground"
                      >
                        <item.icon className="h-4 w-4 text-muted-foreground" />
                        <span>{item.label}</span>
                        {item.hint && (
                          <span className="ml-auto text-xs text-muted-foreground">
                            {item.hint}
                          </span>
                        )}
                      </CommandPrimitive.Item>
                    ))}
                </CommandPrimitive.Group>
              ))}
            </CommandPrimitive.List>
          </CommandPrimitive>
        </DialogContent>
      </Dialog>
    </Context.Provider>
  );
}

export function CommandMenu() {
  return null;
}
