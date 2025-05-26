// src/types/category.ts

import { LocalizedString, SEOData, ProductSummary } from './common';

// Filter types for categories
export interface CategoryFilter {
  id: string;
  type: 'range' | 'select' | 'multiselect' | 'boolean' | 'rating';
  key: string;
  label: LocalizedString;
  description?: LocalizedString;
  unit?: string;
  isRequired?: boolean;
  order: number;
  
  // For range filters (price, size, etc.)
  range?: {
    min: number;
    max: number;
    step: number;
    defaultMin?: number;
    defaultMax?: number;
  };
  
  // For select/multiselect filters
  options?: {
    value: string;
    label: LocalizedString;
    count?: number; // Number of products with this option
    isPopular?: boolean;
  }[];
  
  // For boolean filters
  defaultValue?: boolean;
}

// Category hierarchy and structure
export interface CategoryHierarchy {
  id: string;
  level: number; // 0 = root, 1 = main category, 2 = subcategory, etc.
  path: string[]; // Array of parent category IDs
  children: string[]; // Array of child category IDs
}

// Buying guide associated with category
export interface CategoryBuyingGuide {
  id: string;
  title: LocalizedString;
  summary: LocalizedString;
  content: {
    section: LocalizedString;
    content: LocalizedString;
    order: number;
  }[];
  keyConsiderations: LocalizedString[];
  budgetRanges: {
    label: LocalizedString;
    min: number;
    max: number;
    description: LocalizedString;
    recommendedProducts: string[]; // Product IDs
  }[];
  lastUpdated: Date;
}

// Main Category interface
export interface Category {
  id: string;
  slug: string;
  name: LocalizedString;
  shortName?: LocalizedString; // For mobile/compact displays
  description: LocalizedString;
  shortDescription?: LocalizedString;
  
  // Visual elements
  icon: string;
  color?: string; // Brand color for the category
  heroImage?: string;
  thumbnailImage?: string;
  
  // Hierarchy
  hierarchy: CategoryHierarchy;
  parentId?: string;
  childrenIds: string[];
  
  // Category-specific configuration
  filters: CategoryFilter[];
  sortOptions: {
    key: string;
    label: LocalizedString;
    isDefault?: boolean;
    order: number;
  }[];
  
  // Content
  buyingGuide?: CategoryBuyingGuide;
  featuredProducts: string[]; // Product IDs
  popularProducts: string[]; // Product IDs
  newProducts: string[]; // Product IDs
  dealProducts: string[]; // Product IDs with current deals
  
  // Navigation and display
  isMainCategory: boolean; // Show in main navigation
  isFeatured: boolean; // Show on homepage
  isActive: boolean;
  sortOrder: number;
  
  // Statistics
  productCount: number;
  popularBrands: string[];
  priceRange: {
    min: number;
    max: number;
    currency: string;
  };
  
  // SEO and metadata
  seo: SEOData;
  
  // Category characteristics
  characteristics: {
    key: string;
    label: LocalizedString;
    description: LocalizedString;
    importance: 'high' | 'medium' | 'low';
  }[];
  
  // Related categories
  relatedCategories: string[]; // Category IDs
  
  // Dates
  createdAt: Date;
  updatedAt: Date;
}

// Category for navigation/menu display
export interface CategoryNavItem {
  id: string;
  slug: string;
  name: LocalizedString;
  icon: string;
  productCount: number;
  children?: CategoryNavItem[];
  isActive: boolean;
  isFeatured: boolean;
}

// Category page layout configuration
export interface CategoryPageLayout {
  categoryId: string;
  
  // Hero section
  hero: {
    showHeroImage: boolean;
    showDescription: boolean;
    showQuickStats: boolean;
    customContent?: LocalizedString;
  };
  
  // Product grid configuration
  productGrid: {
    defaultView: 'grid' | 'list';
    productsPerPage: number;
    showFilters: boolean;
    showSorting: boolean;
    enableInfiniteScroll: boolean;
  };
  
  // Sidebar content
  sidebar: {
    showBuyingGuide: boolean;
    showPopularProducts: boolean;
    showRelatedCategories: boolean;
    showBrands: boolean;
    customWidgets?: string[];
  };
  
  // SEO enhancements
  seo: {
    showBreadcrumbs: boolean;
    showStructuredData: boolean;
    showCanonicalUrl: boolean;
  };
}

// Category statistics and analytics
export interface CategoryAnalytics {
  categoryId: string;
  period: 'day' | 'week' | 'month' | 'year';
  metrics: {
    pageViews: number;
    uniqueVisitors: number;
    averageTimeOnPage: number;
    bounceRate: number;
    productClickThroughs: number;
    affiliateClicks: number;
    conversionRate: number;
  };
  topProducts: {
    productId: string;
    views: number;
    clicks: number;
    conversions: number;
  }[];
  topSearchTerms: {
    term: string;
    count: number;
  }[];
  filterUsage: {
    filterId: string;
    usageCount: number;
    values: { value: string; count: number }[];
  }[];
}

// Category comparison (for admin/analytics)
export interface CategoryComparison {
  categories: {
    id: string;
    name: LocalizedString;
    metrics: {
      productCount: number;
      averageRating: number;
      priceRange: { min: number; max: number };
      popularityScore: number;
      revenueContribution: number;
    };
  }[];
  timeframe: {
    start: Date;
    end: Date;
  };
}

// Category trending data
export interface CategoryTrends {
  categoryId: string;
  trends: {
    metric: 'popularity' | 'sales' | 'searches' | 'reviews';
    direction: 'up' | 'down' | 'stable';
    changePercent: number;
    period: 'daily' | 'weekly' | 'monthly';
  }[];
  emergingProducts: string[]; // Product IDs gaining traction
  decliningProducts: string[]; // Product IDs losing interest
  seasonalPatterns?: {
    month: number;
    multiplier: number; // Relative activity compared to average
  }[];
}

// Category brand information
export interface CategoryBrand {
  name: string;
  logo?: string;
  description?: LocalizedString;
  productCount: number;
  averageRating: number;
  priceRange: {
    min: number;
    max: number;
  };
  isPopular: boolean;
  isFeatured: boolean;
  marketShare?: number; // Percentage in this category
}

// Specialized category types
export type CategoryType = 
  | 'product-category'     // Regular product categories
  | 'brand-category'       // Brand-specific pages
  | 'price-category'       // Budget/Premium categories
  | 'use-case-category'    // By use case (gaming, work, etc.)
  | 'feature-category';    // By key features

export interface SpecializedCategory extends Omit<Category, 'type'> {
  type: CategoryType;
  
  // Type-specific configuration
  brandSpecific?: {
    brandName: string;
    brandInfo: CategoryBrand;
  };
  
  priceSpecific?: {
    priceRange: { min: number; max: number };
    targetAudience: LocalizedString;
  };
  
  useCaseSpecific?: {
    primaryUseCase: string;
    targetUsers: LocalizedString[];
    keyRequirements: LocalizedString[];
  };
  
  featureSpecific?: {
    primaryFeature: string;
    featureDescription: LocalizedString;
    relatedFeatures: string[];
  };
}

// Category sitemap generation
export interface CategorySitemap {
  categories: {
    id: string;
    slug: string;
    url: string;
    lastModified: Date;
    changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
    priority: number;
    alternateUrls: {
      locale: string;
      url: string;
    }[];
  }[];
  generated: Date;
}

// Export utility types
export type CategoryFormData = Omit<Category, 'id' | 'createdAt' | 'updatedAt' | 'productCount'>;
export type CategoryUpdateData = Partial<CategoryFormData>;
export type CategoryCardData = Pick<Category, 'id' | 'slug' | 'name' | 'shortDescription' | 'icon' | 'productCount' | 'isFeatured'>;
export type CategoryMenuData = CategoryNavItem;