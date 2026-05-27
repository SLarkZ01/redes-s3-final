import type { Metadata, Viewport } from 'next';
import { JetBrains_Mono, Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
});

export const metadata: Metadata = {
  title: 'Seguridad en Redes — Firewalls, IDS e IPS',
  description:
    'Proyecto educativo sobre seguridad en redes de computadores: Firewalls, Sistemas de Detección de Intrusiones (IDS) y Sistemas de Prevención de Intrusiones (IPS).',
  keywords: [
    'seguridad en redes',
    'firewall',
    'IDS',
    'IPS',
    'intrusion detection',
    'intrusion prevention',
    'network security',
    'ciberseguridad',
  ],
  authors: [{ name: 'Universidad - Redes de Computadores' }],
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
};

export const viewport: Viewport = {
  themeColor: '#0a0a0f',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${jetbrainsMono.variable} bg-[#0a0a0f]`}>
      <body className="bg-[#0a0a0f] font-sans text-[#e8e8ed] antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  );
}
