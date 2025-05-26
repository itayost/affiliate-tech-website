//content.ts

import { 
  LocalizedString, 
  LocalizedContent, 
  ContentMeta, 
  SEOData, 
  Author, 
  ProductImage,
  Rating 
} from './common';

// Base content interface
export interface BaseContent extends ContentMeta {
  title: LocalizedString;
  slug: string;
  excerpt: LocalizedString;
  content: LocalizedContent;
  seo: SEOData;
  isPublished: boolean;
  isFeatured: boolean;
  locale: 'he' | 'en' | 'both';
}

// Review-specific interfaces
export interface ProductReviewContent extends BaseContent {
  type: 'product-review';
  
  // Product information
  productId: string;
  productName: LocalizedString;
  productBrand: string;
  productCategory: string;
  
  // Review scoring
  overallRating: Rating;
  
  // Review structure
  sections: {
    id: string;
    title: LocalizedString;
    content: LocalizedContent;
    rating?: number; // Section-specific rating
    order: number;
    images?: ProductImage[];
  }[];
  
  // Pros and cons
  pros: {
    id: string;
    text: LocalizedString;
    importance: 'high' | 'medium' | 'low';
  }[];
  
  cons: {
    id: string;
    text: LocalizedString;
    severity: 'high' | 'medium' | 'low';
  }[];
  
  // Verdict and recommendation
  verdict: LocalizedContent;
  recommendation: {
    score: number; // 1-10
    buyIf: LocalizedString[];
    skipIf: LocalizedString[];
    bestFor: LocalizedString[];
    alternatives: string[]; // Product IDs
  };
  
  // Testing methodology
  testingPeriod: number; // Days of testing
  testingConditions: LocalizedString;
  testingMethods: LocalizedString[];
  
  // Comparison with competitors
  comparedWith: string[]; // Product IDs
  comparisonVerdict?: LocalizedContent;
  
  // Updates and revisions
  updates: {
    date: Date;
    summary: LocalizedString;
    changes: LocalizedContent;
    versionNumber: string;
  }[];
}

// Buying guide interfaces
export interface BuyingGuideContent extends BaseContent {
  type: 'buying-guide';
  
  // Guide scope
  category: string;
  subcategories?: string[];
  targetAudience: LocalizedString[];
  priceRange?: {
    min: number;
    max: number;
    currency: string;
  };
  
  // Guide structure
  introduction: LocalizedContent;
  keyConsiderations: {
    id: string;
    title: LocalizedString;
    description: LocalizedContent;
    importance: 'critical' | 'important' | 'nice-to-have';
    order: number;
  }[];
  
  // Budget recommendations
  budgetTiers: {
    name: LocalizedString;
    description: LocalizedString;
    priceRange: {
      min: number;
      max: number;
      currency: string;
    };
    recommendedProducts: string[]; // Product IDs
    keyFeatures: LocalizedString[];
    compromises?: LocalizedString[];
  }[];
  
  // Use case recommendations
  useCases: {
    id: string;
    name: LocalizedString;
    description: LocalizedString;
    requirements: LocalizedString[];
    recommendedProducts: string[]; // Product IDs
    mustHaveFeatures: string[];
    niceToHaveFeatures: string[];
  }[];
  
  // Common mistakes and tips
  commonMistakes: {
    mistake: LocalizedString;
    explanation: LocalizedString;
    solution: LocalizedString;
  }[];
  
  tips: {
    tip: LocalizedString;
    explanation: LocalizedString;
    category: 'buying' | 'using' | 'maintenance' | 'other';
  }[];
  
  // FAQ section
  faq: {
    question: LocalizedString;
    answer: LocalizedContent;
    category: string;
    order: number;
  }[];
  
  // Conclusion and summary
  conclusion: LocalizedContent;
  quickPicksList: {
    category: LocalizedString;
    productId: string;
    reason: LocalizedString;
  }[];
}

// Comparison article interfaces
export interface ComparisonContent extends BaseContent {
  type: 'comparison';
  
  // Products being compared
  products: string[]; // Product IDs (2-4 products typically)
  
  // Comparison structure
  introduction: LocalizedContent;
  
  comparisonCategories: {
    id: string;
    name: LocalizedString;
    description?: LocalizedString;
    weight: number; // Importance weight for overall scoring
    winner?: string; // Product ID of category winner
    
    criteria: {
      id: string;
      name: LocalizedString;
      description?: LocalizedString;
      values: {
        productId: string;
        value: string | number;
        score: number; // 1-10
        notes?: LocalizedString;
      }[];
      winner?: string; // Product ID
    }[];
  }[];
  
  // Overall verdict
  overallWinner: string; // Product ID
  runnerUp?: string; // Product ID
  verdict: LocalizedContent;
  
  // Recommendations by use case
  recommendations: {
    useCase: LocalizedString;
    recommendedProduct: string; // Product ID
    reason: LocalizedString;
  }[];
  
  // Comparison table data
  quickComparisonTable: {
    feature: LocalizedString;
    values: {
      productId: string;
      value: string;
      highlight?: boolean;
    }[];
  }[];
}

// News article interfaces
export interface NewsContent extends BaseContent {
  type: 'news';
  
  // News specific fields
  newsType: 'product-launch' | 'industry-news' | 'review-update' | 'deals' | 'rumors';
  
  // Related entities
  relatedProducts?: string[]; // Product IDs
  relatedBrands?: string[];
  relatedCategories?: string[];
  
  // News metadata
  publishDate: Date;
  lastUpdated?: Date;
  source?: {
    name: string;
    url?: string;
    reliability: 'high' | 'medium' | 'low';
  };
  
  // Content structure
  summary: LocalizedString; // Brief summary for previews
  bodyContent: LocalizedContent;
  
  // Impact and significance
  impactLevel: 'high' | 'medium' | 'low';
  affectedProducts?: string[]; // Product IDs that might be affected
  
  // Updates and corrections
  corrections?: {
    date: Date;
    description: LocalizedString;
    correctedContent: LocalizedContent;
  }[];
}

// Deal and offer content
export interface DealContent extends BaseContent {
  type: 'deal';
  
  // Deal information
  dealType: 'discount' | 'coupon' | 'bundle' | 'cashback' | 'gift-with-purchase';
  
  // Products involved
  products: string[]; // Product IDs
  
  // Deal details
  originalPrice: number;
  dealPrice: number;
  savings: number;
  savingsPercentage: number;
  currency: string;
  
  // Deal validity
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  
  // Deal conditions
  conditions: LocalizedString[];
  couponCode?: string;
  minimumPurchase?: number;
  
  // Store information
  storeId: string;
  storeName: string;
  storeUrl: string;
  affiliateUrl: string;
  
  // Deal urgency
  urgency: 'low' | 'medium' | 'high';
  limitedQuantity?: number;
  remainingQuantity?: number;
  
  // Deal content
  description: LocalizedContent;
  termsAndConditions: LocalizedContent;
}

// Tutorial/How-to content
export interface TutorialContent extends BaseContent {
  type: 'tutorial';
  
  // Tutorial metadata
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: number; // in minutes
  requiredProducts?: string[]; // Product IDs
  requiredTools?: LocalizedString[];
  
  // Tutorial structure
  introduction: LocalizedContent;
  
  steps: {
    stepNumber: number;
    title: LocalizedString;
    content: LocalizedContent;
    images?: ProductImage[];
    tips?: LocalizedString[];
    warnings?: LocalizedString[];
    estimatedTime?: number; // minutes for this step
  }[];
  
  conclusion: LocalizedContent;
  
  // Additional resources
  relatedTutorials?: string[]; // Other tutorial IDs
  troubleshooting?: {
    problem: LocalizedString;
    solution: LocalizedString;
  }[];
  
  // Prerequisites
  prerequisites: LocalizedString[];
  skillsNeeded: LocalizedString[];
}

// List/Roundup content (Best of, Top 10, etc.)
export interface ListContent extends BaseContent {
  type: 'list';
  
  // List metadata
  listType: 'best-of' | 'top-products' | 'budget-picks' | 'premium-picks' | 'alternatives';
  category: string;
  year?: number;
  
  // List items
  items: {
    rank: number;
    productId: string;
    title: LocalizedString;
    description: LocalizedContent;
    whyIncluded: LocalizedString;
    pros: LocalizedString[];
    cons?: LocalizedString[];
    bestFor: LocalizedString[];
    price?: {
      amount: number;
      currency: string;
    };
  }[];
  
  // List criteria
  selectionCriteria: LocalizedString[];
  methodology: LocalizedContent;
  
  // Quick picks
  quickPicks: {
    category: LocalizedString;
    productId: string;
    reason: LocalizedString;
  }[];
  
  // List conclusion
  conclusion: LocalizedContent;
  
  // Update information
  lastReviewed: Date;
  nextReviewDate?: Date;
}

// Union type for all content types
export type Content = 
  | ProductReviewContent 
  | BuyingGuideContent 
  | ComparisonContent 
  | NewsContent 
  | DealContent 
  | TutorialContent 
  | ListContent;

// Content status and workflow
export interface ContentWorkflow {
  contentId: string;
  currentStatus: 'draft' | 'in-review' | 'approved' | 'published' | 'archived';
  
  statusHistory: {
    status: string;
    changedBy: string;
    changedAt: Date;
    notes?: string;
  }[];
  
  assignedTo?: string; // User ID
  reviewers?: string[]; // User IDs
  dueDate?: Date;
  
  // Content quality checks
  qualityChecks: {
    check: string;
    status: 'passed' | 'failed' | 'skipped';
    checkedBy?: string;
    checkedAt?: Date;
    notes?: string;
  }[];
}

// Content analytics
export interface ContentAnalytics {
  contentId: string;
  
  // Engagement metrics
  pageViews: number;
  uniqueVisitors: number;
  averageTimeOnPage: number;
  bounceRate: number;
  shareCount: number;
  commentCount: number;
  
  // Conversion metrics
  affiliateClicks: number;
  conversionRate: number;
  revenue: number;
  
  // SEO metrics
  organicTraffic: number;
  searchRankings: {
    keyword: string;
    position: number;
    searchVolume: number;
  }[];
  
  // Social metrics
  socialShares: {
    platform: string;
    count: number;
  }[];
  
  // Time-based data
  period: {
    start: Date;
    end: Date;
  };
  
  // Traffic sources
  trafficSources: {
    source: string;
    visitors: number;
    percentage: number;
  }[];
}

// Content schedule and editorial calendar
export interface ContentSchedule {
  id: string;
  contentType: Content['type'];
  title: LocalizedString;
  assignedAuthor: string;
  
  // Timeline
  assignmentDate: Date;
  draftDueDate: Date;
  reviewDueDate: Date;
  publishDate: Date;
  
  // Status
  currentStatus: 'assigned' | 'in-progress' | 'draft-complete' | 'in-review' | 'approved' | 'published';
  
  // Content details
  category?: string;
  products?: string[]; // Product IDs
  priority: 'low' | 'medium' | 'high' | 'urgent';
  
  // Notes and requirements
  briefNotes?: string;
  requirements?: string[];
  targetWordCount?: number;
  targetKeywords?: string[];
}

// Export utility types
export type ContentFormData<T extends Content['type']> = Omit<
  Extract<Content, { type: T }>, 
  'id' | 'publishedAt' | 'updatedAt' | 'viewCount'
>;

export type ContentUpdateData<T extends Content['type']> = Partial<ContentFormData<T>>;

export type ContentSummary = Pick<
  Content, 
  'id' | 'slug' | 'title' | 'excerpt' | 'type' | 'publishedAt' | 'author' | 'isFeatured'
>;