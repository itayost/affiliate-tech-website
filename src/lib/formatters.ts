// src/lib/formatters.ts
import { Price, Currency, Locale } from '@/types/common';

/**
 * Format price with proper locale and currency
 */
export function formatPrice(
  amount: number,
  currency: Currency = 'ILS',
  locale: Locale = 'he'
): string {
  const localeMap = {
    he: 'he-IL',
    en: 'en-US'
  };

  return new Intl.NumberFormat(localeMap[locale], {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format price object
 */
export function formatPriceObject(price: Price, locale: Locale = 'he'): string {
  return formatPrice(price.amount, price.currency, locale);
}

/**
 * Calculate and format discount percentage
 */
export function formatDiscount(originalPrice: number, salePrice: number): string {
  const discount = Math.round(((originalPrice - salePrice) / originalPrice) * 100);
  return `${discount}%`;
}

/**
 * Format date with locale
 */
export function formatDate(
  date: Date | string,
  locale: Locale = 'he',
  options?: Intl.DateTimeFormatOptions
): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const localeMap = {
    he: 'he-IL',
    en: 'en-US'
  };

  return new Intl.DateTimeFormat(localeMap[locale], options || {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(dateObj);
}

/**
 * Format relative time (e.g., "2 days ago")
 */
export function formatRelativeTime(
  date: Date | string,
  locale: Locale = 'he'
): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);

  const units: [string, number][] = [
    ['year', 31536000],
    ['month', 2592000],
    ['week', 604800],
    ['day', 86400],
    ['hour', 3600],
    ['minute', 60],
    ['second', 1]
  ];

  const localeMap = {
    he: 'he-IL',
    en: 'en-US'
  };

  const rtf = new Intl.RelativeTimeFormat(localeMap[locale], { numeric: 'auto' });

  for (const [unit, secondsInUnit] of units) {
    if (diffInSeconds >= secondsInUnit) {
      const value = Math.floor(diffInSeconds / secondsInUnit);
      return rtf.format(-value, unit as Intl.RelativeTimeFormatUnit);
    }
  }

  return rtf.format(0, 'second');
}

/**
 * Format number with locale
 */
export function formatNumber(
  number: number,
  locale: Locale = 'he',
  options?: Intl.NumberFormatOptions
): string {
  const localeMap = {
    he: 'he-IL',
    en: 'en-US'
  };

  return new Intl.NumberFormat(localeMap[locale], options).format(number);
}

/**
 * Format rating (e.g., "4.5 out of 5")
 */
export function formatRating(
  rating: number,
  maxRating: number = 5,
  locale: Locale = 'he'
): string {
  const formatted = formatNumber(rating, locale, { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  
  if (locale === 'he') {
    return `${formatted} מתוך ${maxRating}`;
  }
  return `${formatted} out of ${maxRating}`;
}

/**
 * Format product availability status
 */
export function formatAvailability(
  status: 'in-stock' | 'limited' | 'out-of-stock' | 'pre-order',
  locale: Locale = 'he'
): string {
  const translations = {
    he: {
      'in-stock': 'במלאי',
      'limited': 'מלאי מוגבל',
      'out-of-stock': 'אזל מהמלאי',
      'pre-order': 'בהזמנה מוקדמת'
    },
    en: {
      'in-stock': 'In Stock',
      'limited': 'Limited Stock',
      'out-of-stock': 'Out of Stock',
      'pre-order': 'Pre-order'
    }
  };

  return translations[locale][status];
}

// src/lib/seo.ts
import { Metadata } from 'next';
import { Product, Category } from '@/types';
import { Locale } from '@/types/common';

/**
 * Generate metadata for product pages
 */
export function generateProductMetadata(
  product: Product,
  locale: Locale
): Metadata {
  const title = `${product.name[locale]} - ${product.brand}`;
  const description = product.seo.description[locale] || product.description[locale];
  
  return {
    title,
    description,
    keywords: product.seo.keywords?.[locale],
    openGraph: {
      title,
      description,
      type: 'website',
      images: product.images.map(img => ({
        url: img.url,
        alt: img.alt[locale]
      })),
      locale: locale === 'he' ? 'he_IL' : 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [product.images[0]?.url].filter(Boolean)
    },
    alternates: {
      canonical: product.seo.canonicalUrl,
      languages: {
        'he': `/he/products/${product.slug}`,
        'en': `/en/products/${product.slug}`
      }
    }
  };
}

/**
 * Generate metadata for category pages
 */
export function generateCategoryMetadata(
  category: Category,
  locale: Locale
): Metadata {
  const title = category.seo.title[locale] || category.name[locale];
  const description = category.seo.description[locale] || category.description[locale];
  
  return {
    title,
    description,
    keywords: category.seo.keywords?.[locale],
    openGraph: {
      title,
      description,
      type: 'website',
      images: category.heroImage ? [{ url: category.heroImage }] : [],
      locale: locale === 'he' ? 'he_IL' : 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: category.heroImage ? [category.heroImage] : []
    },
    alternates: {
      languages: {
        'he': `/he/categories/${category.slug}`,
        'en': `/en/categories/${category.slug}`
      }
    }
  };
}

/**
 * Generate structured data for products
 */
export function generateProductStructuredData(
  product: Product,
  locale: Locale
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name[locale],
    description: product.description[locale],
    image: product.images.map(img => img.url),
    brand: {
      '@type': 'Brand',
      name: product.brand
    },
    model: product.model,
    category: product.category,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating.overall,
      reviewCount: product.rating.totalReviews || 0,
      bestRating: 5,
      worstRating: 1
    },
    offers: product.affiliateLinks.map(link => ({
      '@type': 'Offer',
      url: link.url,
      priceCurrency: link.price.currency,
      price: link.price.amount,
      availability: `https://schema.org/${link.availability === 'in-stock' ? 'InStock' : 'OutOfStock'}`,
      seller: {
        '@type': 'Organization',
        name: link.storeId
      }
    }))
  };
}

// src/lib/analytics.ts
/**
 * Track page view
 */
export function trackPageView(url: string) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', process.env.NEXT_PUBLIC_GA_ID!, {
      page_path: url,
    });
  }
}

/**
 * Track affiliate click
 */
export function trackAffiliateClick({
  productId,
  productName,
  store,
  price,
  currency = 'ILS'
}: {
  productId: string;
  productName: string;
  store: string;
  price: number;
  currency?: string;
}) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'affiliate_click', {
      event_category: 'ecommerce',
      event_label: `${productId}_${store}`,
      value: price,
      currency,
      custom_parameters: {
        product_id: productId,
        product_name: productName,
        store_name: store
      }
    });
  }
}

/**
 * Track search
 */
export function trackSearch(searchTerm: string, resultsCount: number) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'search', {
      search_term: searchTerm,
      results_count: resultsCount
    });
  }
}

// src/lib/strings.ts
/**
 * Truncate text with ellipsis
 */
export function truncateText(
  text: string,
  maxLength: number,
  suffix: string = '...'
): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - suffix.length) + suffix;
}

/**
 * Generate slug from text
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim();
}

/**
 * Strip HTML tags from text
 */
export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '');
}

/**
 * Calculate reading time
 */
export function calculateReadingTime(
  text: string,
  wordsPerMinute: number = 200
): number {
  const words = text.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}