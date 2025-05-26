const createNextIntlPlugin = require('next-intl/plugin');
 
// הוסף את הנתיב הנכון
const withNextIntl = createNextIntlPlugin('./src/i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/webp', 'image/avif'],
    remotePatterns: [
    {
      protocol: 'https',
      hostname: 'localhost',
    },
    {
      protocol: 'https',
      hostname: 'example.com',
    },
  ],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
}

module.exports = withNextIntl(nextConfig);