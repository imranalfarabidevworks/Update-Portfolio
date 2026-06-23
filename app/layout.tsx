import './globals.css';
import type { Metadata } from 'next';
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { CommandMenuProvider } from '@/components/command-menu';
import { Cursor } from '@/components/cursor';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { FarabiAIWidget } from '@/components/farabi-ai-widget';
import { cn } from '@/lib/utils';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Imran Al Farabi',
  jobTitle: 'Full Stack Developer & AI Engineer',
  url: 'https://imranalfarabi.com',
  sameAs: [
    'https://github.com/imranalfarabi',
    'https://linkedin.com/in/imranalfarabi',
    'https://twitter.com/imranalfarabi',
  ],
  knowsAbout: [
    'Artificial Intelligence',
    'Full Stack Development',
    'Machine Learning',
    'Cloud Architecture',
    'Product Engineering',
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL('https://imranalfarabi.com'),
  title: {
    default: 'Imran Al Farabi — Full Stack Developer & AI Engineer',
    template: '%s · Imran Al Farabi',
  },
  description:
    'I build digital products that solve real problems. Full stack developer, AI engineer, and product builder crafting the future of software.',
  keywords: [
    'Imran Al Farabi',
    'Full Stack Developer',
    'AI Engineer',
    'Product Builder',
    'Software Engineer',
    'Machine Learning',
    'Next.js',
    'TypeScript',
  ],
  authors: [{ name: 'Imran Al Farabi' }],
  creator: 'Imran Al Farabi',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://imranalfarabi.com',
    title: 'Imran Al Farabi — Full Stack Developer & AI Engineer',
    description:
      'I build digital products that solve real problems. Full stack developer, AI engineer, and product builder crafting the future of software.',
    siteName: 'Imran Al Farabi',
    images: [
      {
        url: '/api/og',
        width: 1200,
        height: 630,
        alt: 'Imran Al Farabi — Full Stack Developer & AI Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Imran Al Farabi — Full Stack Developer & AI Engineer',
    description:
      'I build digital products that solve real problems. Full stack developer, AI engineer, and product builder.',
    images: ['/api/og'],
    creator: '@imranalfarabi',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: '/manifest.json',
};

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f8fafc' },
    { media: '(prefers-color-scheme: dark)', color: '#08101c' },
  ],
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        inter.variable,
        spaceGrotesk.variable,
        jetbrainsMono.variable,
      )}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body className="font-sans antialiased noise-overlay">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <CommandMenuProvider>
            <Cursor />
            <SiteHeader />
            <main className="relative">{children}</main>
            <SiteFooter />
            <FarabiAIWidget />
          </CommandMenuProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
