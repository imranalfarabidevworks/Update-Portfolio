'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Send, X, Sparkles, Navigation, FolderGit2, User, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  suggestions?: { label: string; action: () => void }[];
};

const KNOWLEDGE_BASE: Record<
  string,
  { response: string; navigate?: string }
> = {
  projects: {
    response:
      "Here are Imran's three flagship projects:\n\n1. AI Prescription & Health Analytics — A healthcare platform using fine-tuned ML models to assist with diagnoses. 94.2% accuracy, serving 12K+ patients across 8 clinics.\n\n2. Modern Job Portal Ecosystem — A full-featured platform with AI candidate matching, video interviews, and real-time tracking. 45K+ users, 8.2K job listings.\n\n3. Community Help & Local Services — A hyperlocal platform connecting neighbors with verified service providers. 120+ communities, 85K+ requests fulfilled.\n\nWould you like me to scroll down to the projects section?",
    navigate: '#projects',
  },
  skills: {
    response:
      "Imran's core technologies span across:\n\n• Frontend: TypeScript, React, Next.js, JavaScript, Tailwind (5 years, 95% proficiency)\n• Backend: Node.js,Express.js,Better Auth,JwT FastAPI, MySQL, MongoDB,  (2 years, 90%+)\n•",
    navigate: '#skills',
  },
  story: {
    response:
      "Imran's journey spans five chapters:\n\n1. How I Started Programming — a spark from a single line of HTML\n2. My Learning Journey — from tutorials to systems architecture\n3. Building Real Products — shipping to thousands of users\n4. AI Engineering — teaching machines to think and diagnose\n5. Future Vision — ambient, intelligent, deeply human software\n\nScroll down to experience it as a cinematic storytelling journey.",
    navigate: '#story',
  },
  contact: {
    response:
      "You can reach Imran through:\n\n• Email:imranalfarabidevworks@gmail.com\n• LinkedIn:www.linkedin.com/in/imran-al-farabi-6868f\n• GitHub:https://github.com/imranalfarabidevworks\n•He's currently available for new opportunities and collaborations.",
  },
  experience: {
    response:
      "Imran has 3+ years of professional experience with 40+ shipped projects and 15+ deployed AI models. His work spans healthcare (AI prescriptions), SaaS platforms (job portal ecosystem with 45K+ users), and community marketplaces (85K+ service requests). He's based in Dhaka, Bangladesh and works across time zones.",
  },
  default: {
    response:
      "Hi! I'm Farabi AI, Imran's portfolio assistant. I can help you navigate, explain projects, summarize skills, or answer career questions. What would you like to explore?",
  },
};

const QUICK_PROMPTS = [
  { label: 'Show projects', query: 'projects', icon: FolderGit2 },
  { label: 'View skills', query: 'skills', icon: Zap },
  { label: 'Read story', query: 'story', icon: User },
  { label: 'Contact', query: 'contact', icon: Sparkles },
];

function getResponse(query: string): Message {
  const lower = query.toLowerCase();
  let match: Message | null = null;

  for (const [key, entry] of Object.entries(KNOWLEDGE_BASE)) {
    if (key === 'default') continue;
    if (lower.includes(key) || lower.includes(key.slice(0, -1))) {
      match = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: entry.response,
        suggestions: entry.navigate
          ? [
              {
                label: `Navigate to ${entry.navigate}`,
                action: () =>
                  document
                    .querySelector(entry.navigate!)
                    ?.scrollIntoView({ behavior: 'smooth' }),
              },
            ]
          : undefined,
      };
    }
  }

  return (
    match ?? {
      id: crypto.randomUUID(),
      role: 'assistant',
      content:
        "I'm not sure I caught that, but I can help with projects, skills, story, experience, or contact information. Try one of the quick prompts below!",
    }
  );
}

export function FarabiAIWidget() {
  const [open, setOpen] = React.useState(false);
  const [messages, setMessages] = React.useState<Message[]>([
    {
      id: 'greeting',
      role: 'assistant',
      content: "Hi! I'm Farabi AI. I can help you explore Imran's portfolio. What would you like to discover?",
    },
  ]);
  const [input, setInput] = React.useState('');
  const [isThinking, setIsThinking] = React.useState(false);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isThinking]);

  const send = (text: string) => {
    if (!text.trim()) return;
    setMessages((prev) => [
      ...prev,
      { id: crypto.randomUUID(), role: 'user', content: text },
    ]);
    setInput('');
    setIsThinking(true);

    setTimeout(() => {
      const response = getResponse(text);
      setMessages((prev) => [...prev, response]);
      setIsThinking(false);
    }, 800 + Math.random() * 600);
  };

  return (
    <>
      <button
        data-farabi-trigger
        onClick={() => setOpen(!open)}
        className="group fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary to-cyan-600 text-white shadow-lg shadow-primary/30 transition-all hover:scale-105 hover:shadow-xl hover:shadow-primary/40"
        aria-label="Open Farabi AI"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X className="h-5 w-5" />
            </motion.div>
          ) : (
            <motion.div
              key="brain"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <Brain className="h-6 w-6" />
            </motion.div>
          )}
        </AnimatePresence>
        {!open && (
          <span className="absolute inset-0 animate-ping rounded-full bg-primary/40" />
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-24 right-6 z-50 flex h-[500px] w-[calc(100vw-3rem)] max-w-md flex-col overflow-hidden rounded-3xl border border-border/60 bg-card/95 shadow-2xl backdrop-blur-xl"
          >
            <div className="flex items-center justify-between border-b border-border/40 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-cyan-600">
                  <Brain className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-display text-sm font-semibold">Farabi AI</h3>
                  <p className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-500" />
                    </span>
                    Online
                  </p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-muted-foreground hover:text-foreground"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div
              ref={scrollRef}
              className="flex-1 space-y-4 overflow-y-auto p-4"
            >
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    'flex',
                    msg.role === 'user' ? 'justify-end' : 'justify-start',
                  )}
                >
                  <div
                    className={cn(
                      'max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-sm leading-relaxed',
                      msg.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-secondary-foreground',
                    )}
                  >
                    {msg.content}
                    {msg.suggestions && (
                      <div className="mt-3 flex flex-wrap gap-2 border-t border-border/40 pt-3">
                        {msg.suggestions.map((s, i) => (
                          <button
                            key={i}
                            onClick={s.action}
                            className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-xs text-primary hover:bg-primary/20"
                          >
                            <Navigation className="h-3 w-3" />
                            {s.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}

              {isThinking && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="flex gap-1 rounded-2xl bg-secondary px-4 py-3">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        animate={{ y: [0, -4, 0] }}
                        transition={{
                          duration: 0.6,
                          repeat: Infinity,
                          delay: i * 0.15,
                        }}
                        className="h-1.5 w-1.5 rounded-full bg-muted-foreground"
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            <div className="border-t border-border/40 p-3">
              <div className="mb-2 flex flex-wrap gap-1.5">
                {QUICK_PROMPTS.map((p) => (
                  <button
                    key={p.label}
                    onClick={() => send(p.query)}
                    className="inline-flex items-center gap-1 rounded-full border border-border/60 bg-background/40 px-2.5 py-1 text-[11px] text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
                  >
                    <p.icon className="h-3 w-3" />
                    {p.label}
                  </button>
                ))}
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  send(input);
                }}
                className="flex items-center gap-2"
              >
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask Farabi AI anything..."
                  className="flex-1 rounded-full border border-border/60 bg-background/40 px-4 py-2 text-sm outline-none transition-colors focus:border-primary/60"
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-primary text-primary-foreground transition-opacity disabled:opacity-40"
                  aria-label="Send"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
