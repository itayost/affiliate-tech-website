import type { Metadata } from 'next'
import { Inter, Assistant } from 'next/font/google'
import './globals.css'

// Font configurations
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const assistant = Assistant({
  subsets: ['latin', 'hebrew'],
  variable: '--font-assistant',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    template: '%s | TechReviews',
    default: 'TechReviews - Professional Technology Reviews',
  },
  description: 'Professional technology reviews, buying guides, and price comparisons in Hebrew and English',
  keywords: ['tech reviews', 'technology', 'buying guides', 'product comparison', 'סקירות טכנולוגיה'],
  authors: [{ name: 'TechReviews Team' }],
  creator: 'TechReviews',
  metadataBase: new URL('https://techreviews.co.il'),
  
  // Open Graph
  openGraph: {
    type: 'website',
    locale: 'he_IL',
    alternateLocale: ['en_US'],
    url: 'https://techreviews.co.il',
    siteName: 'TechReviews',
    title: 'TechReviews - Professional Technology Reviews',
    description: 'Professional technology reviews, buying guides, and price comparisons',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'TechReviews Logo',
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: 'TechReviews - Professional Technology Reviews',
    description: 'Professional technology reviews, buying guides, and price comparisons',
    creator: '@techreviews',
    images: ['/og-image.jpg'],
  },

  // Additional meta tags
  other: {
    'theme-color': '#2563eb',
    'color-scheme': 'light dark',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html 
      suppressHydrationWarning
      className={`${inter.variable} ${assistant.variable}`}
    >
      <head>
        {/* Preload critical fonts */}
        <link 
          rel="preload" 
          href="/fonts/inter-latin.woff2" 
          as="font" 
          type="font/woff2" 
          crossOrigin="anonymous" 
        />
        <link 
          rel="preload" 
          href="/fonts/assistant-hebrew.woff2" 
          as="font" 
          type="font/woff2" 
          crossOrigin="anonymous" 
        />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        
        {/* Manifest */}
        <link rel="manifest" href="/manifest.json" />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      
      <body 
        className="min-h-screen bg-background font-sans antialiased"
        suppressHydrationWarning
      >
        {/* Skip to main content for accessibility */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 px-4 py-2 bg-primary text-primary-foreground rounded-md"
        >
          Skip to main content
        </a>
        
        {/* Theme and locale providers will wrap children */}
        <div id="app" className="relative flex min-h-screen flex-col">
          {children}
        </div>
        
        {/* Structured Data for Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'TechReviews',
              url: 'https://techreviews.co.il',
              logo: 'https://techreviews.co.il/logo.png',
              description: 'Professional technology reviews and buying guides',
              sameAs: [
                'https://facebook.com/techreviews',
                'https://twitter.com/techreviews',
                'https://instagram.com/techreviews',
              ],
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+972-XX-XXXXXXX',
                contactType: 'Customer Service',
                areaServed: 'IL',
                availableLanguage: ['Hebrew', 'English'],
              },
            }),
          }}
        />
      </body>
    </html>
  )
}