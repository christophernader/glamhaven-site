import Image from 'next/image';
import dynamic from 'next/dynamic';
import React, { Suspense } from 'react';

// Import Navbar normally since it's critical for navigation
import Navbar from '@/components/Navbar';

// Loading fallbacks
const LoadingHero = () => <div className="min-h-screen bg-dark"></div>;
const LoadingSection = () => <div className="min-h-[50vh] bg-dark"></div>;

// Dynamically import components with optimized loading
const Hero = dynamic(() => import('@/components/Hero'), { 
  ssr: true,
  loading: LoadingHero
});

// Prioritize loading of visible components
const Gallery = dynamic(() => import('@/components/Gallery'), { 
  ssr: true,
  loading: LoadingSection
});

// Load below-the-fold components with lower priority
const About = dynamic(() => import('@/components/About'), { 
  ssr: false,
  loading: LoadingSection
});

const Contact = dynamic(() => import('@/components/Contact'), { 
  ssr: false,
  loading: LoadingSection
});

const Footer = dynamic(() => import('@/components/Footer'), { 
  ssr: false,
  loading: LoadingSection
});

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="grain-overlay"></div>
      <Navbar />
      
      {/* Critical above-the-fold content */}
      <Hero />
      
      {/* Visible but can be loaded with slight delay */}
      <Gallery />
      
      {/* Below-the-fold content that can be lazy-loaded */}
      <Suspense fallback={<LoadingSection />}>
        <About />
      </Suspense>
      
      <Suspense fallback={<LoadingSection />}>
        <Contact />
      </Suspense>
      
      <Suspense fallback={<LoadingSection />}>
        <Footer />
      </Suspense>
    </main>
  );
} 