import type { Metadata, Viewport } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import dynamic from 'next/dynamic';

// Dynamically import the PerformanceOptimizer with no SSR to ensure it only runs on client
const PerformanceOptimizer = dynamic(
  () => import('@/components/PerformanceOptimizer'),
  { ssr: false }
);

// Optimize font loading
const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'sans-serif'],
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  preload: true,
  fallback: ['Georgia', 'serif'],
});

export const viewport: Viewport = {
  themeColor: '#0C0C0C',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://glamhaven.com'),
  title: 'GlamHaven - Lebanese Dress Rental Gallery',
  description: 'Find your perfect dress for any occasion at our premium Lebanese dress rental service, managed by Ghada and Emma.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://glamhaven.com/',
    siteName: 'GlamHaven',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'GlamHaven - Lebanese Dress Rental Gallery',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@glamhaven',
    creator: '@glamhaven',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://plus.unsplash.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://images.pexels.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://img.freepik.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://cdn.pixabay.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* DNS prefetch */}
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://plus.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.pexels.com" />
        <link rel="dns-prefetch" href="https://img.freepik.com" />
        <link rel="dns-prefetch" href="https://cdn.pixabay.com" />
        
        {/* Preload critical assets */}
        <link rel="preload" href="/images/paper-texture.webp" as="image" />
      </head>
      <body className="bg-dark chromatic-effect">
        <PerformanceOptimizer>
          <div className="grain-overlay"></div>
          {children}
        </PerformanceOptimizer>
      </body>
    </html>
  );
} 