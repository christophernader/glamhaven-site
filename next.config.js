/** @type {import('next').NextConfig} */
const withBundleAnalyzer = process.env.ANALYZE === 'true' 
  ? require('@next/bundle-analyzer')({}) 
  : (config) => config;

const nextConfig = {
  // Enable React strict mode only in development for better performance in production
  reactStrictMode: process.env.NODE_ENV === 'development',
  
  // Optimize image loading
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.pixabay.com',
      },
      {
        protocol: 'https',
        hostname: 'img.freepik.com',
      },
    ],
    // Optimize image quality for better performance
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60 * 60 * 24 * 7, // 7 days
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  
  // Optimize production builds
  swcMinify: true,
  
  // Improve performance by reducing the amount of code sent to the client
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Optimize page loading
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
    optimizePackageImports: ['framer-motion', 'zustand'],
    optimisticClientCache: true,
  },
  
  // Optimize output
  output: 'standalone',
  
  // Improve caching
  poweredByHeader: false,
  compress: true,
};

module.exports = withBundleAnalyzer(nextConfig); 