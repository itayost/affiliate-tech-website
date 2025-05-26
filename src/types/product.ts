// src/types/product.ts

import { 
  LocalizedString, 
  LocalizedContent,
  Rating, 
  ProductImage, 
  AffiliateLink, 
  SEOData, 
  ContentMeta,
  Price
} from './common';

// Product specifications and technical details
export interface ProductSpecification {
  key: string;
  label: LocalizedString;
  value: LocalizedString;
  unit?: string;
  category: 'general' | 'performance' | 'design' | 'connectivity' | 'other';
  isHighlight?: boolean; // Show in quick specs
  order: number;
}

// Product features and highlights
export interface ProductFeature {
  id: string;
  title: LocalizedString;
  description: LocalizedString;
  icon?: string;
  isHighlight: boolean;
  category: string;
}

// Pros and cons structure
export interface ProductProsAndCons {
  pros: {
    id: string;
    text: LocalizedString;
    category: 'performance' | 'design' | 'value' | 'features' | 'usability';
    importance: 'high' | 'medium' | 'low';
  }[];
  cons: {
    id: string;
    text: LocalizedString;
    category: 'performance' | 'design' | 'value' | 'features' | 'usability';
    severity: 'high' | 'medium' | 'low';
  }[];
}

// Product variants (size, color, storage, etc.)
export interface ProductVariant {
  id: string;
  name: LocalizedString;
  type: 'color' | 'size' | 'storage' | 'memory' | 'other';
  value: string;
  priceModifier: number; // +/- amount from base price
  availability: 'available' | 'limited' | 'unavailable';
  sku?: string;
}

// Product comparison data
export interface ComparisonData {
  competitorIds: string[]; // Other product IDs to compare with
  comparisonPoints: {
    category: string;
    items: {
      label: LocalizedString;
      thisProduct: string | number;
      comparison: 'better' | 'same' | 'worse' | 'different';
    }[];
  }[];
  verdict: LocalizedString;
}

// Product review content
export interface ProductReview {
  summary: LocalizedString;
  introduction: LocalizedContent;
  sections: {
    id: string;
    title: LocalizedString;
    content: LocalizedContent;
    order: number;
    images?: ProductImage[];
  }[];
  verdict: LocalizedContent;
  recommendation: {
    buyIf: LocalizedString[];
    skipIf: LocalizedString[];
    alternatives: string[]; // Product IDs
  };
  testingMethodology?: LocalizedContent;
  updateNotes?: {
    date: Date;
    changes: LocalizedString;
  }[];
}

// Main Product interface
export interface Product extends ContentMeta {
  // Basic information
  name: LocalizedString;
  brand: string;
  model: string;
  category: string;
  subcategory?: string;
  description: LocalizedString;
  shortDescription?: LocalizedString;

  // Pricing and availability
  msrp: Price; // Manufacturer's suggested retail price
  currentPrice: Price; // Current best price
  priceHistory: {
    date: Date;
    price: Price;
    storeId: string;
  }[];
  
  // Product details
  specifications: ProductSpecification[];
  features: ProductFeature[];
  variants?: ProductVariant[];
  
  // Media
  images: ProductImage[];
  videos?: {
    type: 'review' | 'unboxing' | 'demo';
    url: string;
    thumbnail: string;
    title: LocalizedString;
    duration?: number;
  }[];
  
  // Rating and review
  rating: Rating;
  prosAndCons: ProductProsAndCons;
  review: ProductReview;
  
  // E-commerce
  affiliateLinks: AffiliateLink[];
  
  // Relationships
  relatedProducts: string[]; // Product IDs
  compatibleWith?: string[]; // Product IDs for accessories
  requiredFor?: string[]; // Product IDs that need this product
  comparisonData?: ComparisonData;
  
  // SEO and metadata
  seo: SEOData;
  
  // Product status
  isActive: boolean;
  isFeatured: boolean;
  isNewProduct: boolean;
  isDiscontinued: boolean;
  
  // Launch information
  launchDate?: Date;
  announcementDate?: Date;
  
  // Awards and recognitions
  awards?: {
    title: LocalizedString;
    organization: string;
    date: Date;
    icon?: string;
  }[];
}

// Product listing/card view (lighter version for lists)
export interface ProductSummary {
  id: string;
  slug: string;
  name: LocalizedString;
  brand: string;
  model: string;
  category: string;
  shortDescription: LocalizedString;
  primaryImage: ProductImage;
  rating: {
    overall: number;
    totalReviews: number;
  };
  currentPrice: Price;
  msrp?: Price;
  isNew: boolean;
  isFeatured: boolean;
  availabilityStatus: 'available' | 'limited' | 'out-of-stock';
  quickSpecs: ProductSpecification[]; // Top 3-4 most important specs
  lastUpdated: Date;
}

// Product category structure
export interface ProductCategory {
  id: string;
  slug: string;
  name: LocalizedString;
  description: LocalizedString;
  icon: string;
  image?: string;
  parentCategory?: string;
  subcategories: string[];
  
  // Category-specific filters
  availableFilters: {
    brands: string[];
    priceRanges: { min: number; max: number; label: LocalizedString }[];
    specifications: {
      key: string;
      label: LocalizedString;
      type: 'range' | 'select' | 'boolean';
      options?: { value: string; label: LocalizedString }[];
    }[];
  };
  
  // Featured products for this category
  featuredProducts: string[];
  popularProducts: string[];
  
  // SEO
  seo: SEOData;
  
  // Category metadata
  productCount: number;
  isActive: boolean;
  sortOrder: number;
}

// Product search and filtering
export interface ProductSearchParams {
  query?: string;
  category?: string;
  brand?: string[];
  priceRange?: {
    min: number;
    max: number;
  };
  rating?: {
    min: number;
  };
  features?: string[];
  sortBy?: 'relevance' | 'price-asc' | 'price-desc' | 'rating' | 'newest' | 'popular';
  page?: number;
  limit?: number;
}

export interface ProductSearchResult {
  products: ProductSummary[];
  totalCount: number;
  facets: {
    brands: { name: string; count: number }[];
    categories: { id: string; name: LocalizedString; count: number }[];
    priceRanges: { min: number; max: number; count: number }[];
    ratings: { min: number; count: number }[];
  };
  suggestions?: string[];
  didYouMean?: string;
}

// Product comparison
export interface ProductComparison {
  products: Product[];
  comparisonMatrix: {
    category: string;
    categoryLabel: LocalizedString;
    specs: {
      label: LocalizedString;
      values: (string | number | boolean)[];
      winner?: number; // Index of the winning product
      unit?: string;
    }[];
  }[];
  recommendation: {
    overall: number; // Index of overall recommended product
    byUseCase: {
      useCase: LocalizedString;
      recommended: number;
      reason: LocalizedString;
    }[];
  };
}

// Product inventory and stock
export interface ProductInventory {
  productId: string;
  variantId?: string;
  storeId: string;
  quantity: number;
  status: 'in-stock' | 'low-stock' | 'out-of-stock' | 'discontinued';
  lastUpdated: Date;
  nextRestock?: Date;
  preOrderInfo?: {
    availableDate: Date;
    limitPerCustomer?: number;
  };
}

// Product price tracking
export interface PriceAlert {
  id: string;
  productId: string;
  userEmail: string;
  targetPrice: number;
  currency: string;
  isActive: boolean;
  createdAt: Date;
  triggeredAt?: Date;
}

// Product bundle or kit
export interface ProductBundle {
  id: string;
  name: LocalizedString;
  description: LocalizedString;
  products: {
    productId: string;
    quantity: number;
    isOptional: boolean;
  }[];
  bundlePrice: Price;
  savings: Price;
  category: string;
  isActive: boolean;
}

// Product launch and lifecycle
export type ProductLifecycleStage = 
  | 'announced' 
  | 'pre-order' 
  | 'launched' 
  | 'mature' 
  | 'end-of-life' 
  | 'discontinued';

export interface ProductLifecycle {
  stage: ProductLifecycleStage;
  announcementDate?: Date;
  preOrderDate?: Date;
  launchDate?: Date;
  endOfLifeDate?: Date;
  discontinuedDate?: Date;
  successorProductId?: string;
}

// Export utility types
export type ProductFormData = Omit<Product, 'id' | 'publishedAt' | 'updatedAt' | 'viewCount'>;
export type ProductUpdateData = Partial<ProductFormData>;
export type ProductCardData = ProductSummary;