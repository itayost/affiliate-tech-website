// src/data/sample/products.ts
import { ProductSummary } from '@/types/product';
import { Category } from '@/types/category';

export const sampleProducts: ProductSummary[] = [
  {
    id: 'prod-1',
    slug: 'iphone-15-pro',
    name: { he: 'אייפון 15 פרו', en: 'iPhone 15 Pro' },
    brand: 'Apple',
    model: 'iPhone 15 Pro',
    category: 'smartphones',
    shortDescription: { 
      he: 'הסמארטפון המתקדם ביותר של אפל', 
      en: 'Apple\'s most advanced smartphone' 
    },
    primaryImage: {
      id: 'img-1',
      url: '/images/products/iphone-15-pro.jpg',
      alt: { he: 'אייפון 15 פרו', en: 'iPhone 15 Pro' },
      isPrimary: true,
      order: 1
    },
    rating: { overall: 4.8, totalReviews: 245 },
    currentPrice: { amount: 4999, currency: 'ILS', formatted: '₪4,999' },
    msrp: { amount: 5499, currency: 'ILS', formatted: '₪5,499' },
    isNew: true,
    isFeatured: true,
    availabilityStatus: 'available',
    quickSpecs: [],
    lastUpdated: new Date()
  }
];

export const sampleCategories: Category[] = [
  {
    id: 'cat-1',
    slug: 'smartphones',
    name: { he: 'סמארטפונים', en: 'Smartphones' },
    description: { 
      he: 'הסמארטפונים החדשים והמתקדמים ביותר', 
      en: 'The latest and most advanced smartphones' 
    },
    icon: '📱',
    productCount: 25,
    isMainCategory: true,
    isFeatured: true,
    isActive: true,
    sortOrder: 1,
    hierarchy: { id: 'cat-1', level: 1, path: [], children: [] },
    childrenIds: [],
    filters: [],
    sortOptions: [],
    featuredProducts: [],
    popularProducts: [],
    newProducts: [],
    dealProducts: [],
    popularBrands: ['Apple', 'Samsung', 'Google'],
    priceRange: { min: 1000, max: 8000, currency: 'ILS' },
    relatedCategories: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    seo: {
      title: { he: 'סמארטפונים', en: 'Smartphones' },
      description: { he: 'סקירות סמארטפונים', en: 'Smartphone reviews' },
      keywords: []
    }
  }
];