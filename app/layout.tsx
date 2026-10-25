import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'BE SOOCIAL - Creative Media & Production Agency',
  description: 'Premier creative media & production agency website featuring cinematic 3D experiences, full services showcase, case study portfolio, interactive project builder, and client management.',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: 'BE SOOCIAL - Creative Media & Production Agency',
    description: 'Premier creative media & production agency website featuring cinematic 3D experiences, full services showcase, case study portfolio, interactive project builder, and client management.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BE SOOCIAL - Creative Media & Production Agency',
    description: 'Premier creative media & production agency website featuring cinematic 3D experiences, full services showcase, case study portfolio, interactive project builder, and client management.',
  },
};

import { ScrollProgress } from '@/components/ui/ScrollProgress';
import { ConsoleWarningPatch } from '@/components/utils/ConsoleWarningPatch';

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <ConsoleWarningPatch />
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}
