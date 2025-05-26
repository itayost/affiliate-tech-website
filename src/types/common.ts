// src/types/common.ts

// Locale and internationalization types
export type Locale = 'he' | 'en';

export interface LocalizedString {
  he: string;
  en: string;
}

export interface LocalizedContent {
  he: string;
  en: string;
}

// Currency and pricing types
export type Currency = 'ILS' | 'USD' | 'EUR';

export interface Price {
  amount: number;
  currency: Currency;
  originalAmount?: number; // For showing discounts
  formatted: string; // Pre-formatted price string
}

// Store and retailer information
export interface Store {
  id: string;
  name: string;
  displayName: LocalizedString;
  website: string;
  logo?: string;
  trustScore: number; // 1-5 rating
  shippingInfo: LocalizedString;
  returnPolicy: LocalizedString;
  isAffiliate: boolean;
}

// Rating and review system
export interface Rating {
  overall: number; // 1-5
  value: number; // Price-to-performance ratio
  design: number;
  performance: number;
  features: number;
  buildQuality: number;
  userExperience: number;
  totalReviews?: number;
}

// SEO and metadata
export interface SEOData {
  title: LocalizedString;
  description: LocalizedString;
  keywords: LocalizedString[];
  ogImage?: string;
  canonicalUrl?: string;
  structuredData?: Record<string, any>;
}

// Image and media
export interface ProductImage {
  id: string;
  url: string;
  alt: LocalizedString;
  caption?: LocalizedString;
  isPrimary: boolean;
  order: number;
  width?: number;
  height?: number;
}

export interface MediaContent {
  type: 'image' | 'video' | 'gallery';
  url: string;
  thumbnail?: string;
  alt?: LocalizedString;
  caption?: LocalizedString;
}

// Author and content creator
export interface Author {
  id: string;
  name: LocalizedString;
  bio: LocalizedString;
  avatar?: string;
  expertise: string[];
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    website?: string;
  };
}

// Affiliate and tracking
export interface AffiliateLink {
  storeId: string;
  url: string;
  price: Price;
  availability: 'in-stock' | 'out-of-stock' | 'pre-order' | 'limited';
  shippingCost?: Price;
  deliveryTime: LocalizedString;
  specialOffer?: LocalizedString;
  trackingId: string;
  lastUpdated: Date;
  isVerified: boolean;
}

// Generic content types
export interface ContentMeta {
  id: string;
  slug: string;
  publishedAt: Date;
  updatedAt: Date;
  status: 'draft' | 'published' | 'archived';
  author: Author;
  tags: string[];
  readingTime: number; // in minutes
  viewCount?: number;
  shareCount?: number;
}

// Search and filtering
export interface SearchFilters {
  priceRange?: {
    min: number;
    max: number;
    currency: Currency;
  };
  brands?: string[];
  categories?: string[];
  rating?: {
    min: number;
    max: number;
  };
  features?: string[];
  availability?: ('in-stock' | 'out-of-stock' | 'pre-order')[];
  sortBy?: 'price-asc' | 'price-desc' | 'rating-desc' | 'newest' | 'popularity';
}

export interface SearchResult<T> {
  items: T[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  filters: SearchFilters;
  facets?: {
    brands: { name: string; count: number }[];
    priceRanges: { min: number; max: number; count: number }[];
    categories: { id: string; name: string; count: number }[];
  };
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: LocalizedString;
    details?: any;
  };
  meta?: {
    timestamp: string;
    requestId: string;
    version: string;
  };
}

export interface PaginatedResponse<T> {
  items: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// UI and component props
export interface BaseComponentProps {
  className?: string;
  locale?: Locale;
  'data-testid'?: string;
}

// Form and validation
export interface FormField {
  name: string;
  value: any;
  error?: string;
  touched: boolean;
  required: boolean;
}

export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any) => string | null;
}

// Analytics and tracking
export interface AnalyticsEvent {
  event: string;
  category: 'engagement' | 'ecommerce' | 'navigation' | 'content';
  action: string;
  label?: string;
  value?: number;
  customParameters?: Record<string, any>;
}

export interface ConversionEvent {
  type: 'affiliate_click' | 'product_view' | 'review_read' | 'comparison_used';
  productId?: string;
  storeId?: string;
  value?: number;
  currency?: Currency;
  timestamp: Date;
  userId?: string;
  sessionId: string;
}

// Newsletter and email
export interface NewsletterSubscription {
  email: string;
  locale: Locale;
  interests: string[];
  subscribedAt: Date;
  status: 'active' | 'unsubscribed' | 'bounced';
}

// Theme and preferences
export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  locale: Locale;
  currency: Currency;
  emailNotifications: boolean;
  compareList: string[]; // Product IDs
  wishlist: string[]; // Product IDs
}

// Error handling
export interface AppError {
  code: string;
  message: LocalizedString;
  statusCode?: number;
  timestamp: Date;
  path?: string;
  userId?: string;
}

// Content status and workflow
export type ContentStatus = 'draft' | 'review' | 'published' | 'archived';

export interface ContentWorkflow {
  status: ContentStatus;
  createdBy: string;
  createdAt: Date;
  reviewedBy?: string;
  reviewedAt?: Date;
  publishedBy?: string;
  publishedAt?: Date;
  notes?: string;
}

// Utility types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// Environment and configuration
export interface EnvironmentConfig {
  apiUrl: string;
  cdnUrl: string;
  analyticsId: string;
  affiliateIds: Record<string, string>;
  features: {
    userAccounts: boolean;
    newsletter: boolean;
    comments: boolean;
    comparison: boolean;
    wishlist: boolean;
  };
}