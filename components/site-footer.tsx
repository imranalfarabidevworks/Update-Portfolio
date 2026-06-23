import Link from 'next/link';
import { Github, Linkedin, Twitter, Mail, ArrowUpRight } from 'lucide-react';

const socials = [
  { label: 'GitHub', href: 'https://github.com/imranalfarabi', icon: Github },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/imranalfarabi', icon: Linkedin },
  { label: 'Twitter', href: 'https://twitter.com/imranalfarabi', icon: Twitter },
  { label: 'Email', href: 'mailto:hello@imranalfarabi.com', icon: Mail },
];

const footerLinks = {
  Navigate: [
    { label: 'Home', href: '#hero' },
    { label: 'Story', href: '#story' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
  ],
  Connect: [
    { label: 'Contact', href: '#contact' },
    { label: 'Resume', href: '#' },
    { label: 'Newsletter', href: '#' },
    { label: 'Blog', href: '#' },
  ],
};

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-border/50 pb-10 pt-20">
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute -bottom-40 left-1/2 h-80 w-[600px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Link href="#hero" className="group inline-flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-cyan-600 font-display font-bold text-white">
                F
              </div>
              <span className="font-display text-lg font-semibold">
                Imran Al Farabi
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Building digital products that solve real problems. Full stack
              developer, AI engineer, and product builder crafting the future of
              software.
            </p>
            <div className="mt-6 flex gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="group flex h-10 w-10 items-center justify-center rounded-xl border border-border/60 bg-card/30 text-muted-foreground transition-all hover:border-primary/40 hover:text-primary"
                >
                  <social.icon className="h-4 w-4 transition-transform group-hover:scale-110" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-display text-sm font-semibold">
                {title}
              </h4>
              <ul className="mt-4 space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="group inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                      <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border/40 pt-8 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Imran Al Farabi. Crafted with
            precision.
          </p>
          <p className="font-mono text-xs text-muted-foreground">
            Built with Next.js, Three.js & Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
}
