// src/lib/data/products.ts
import { Product, ProductSummary, ProductSearchParams, ProductSearchResult } from '@/types/product';
import { Locale } from '@/types/common';

// Import your existing product data files
// Adjust these imports based on your actual data structure
// import smartphones from '@/data/products/smartphones';
// import laptops from '@/data/products/laptops';
// import audio from '@/data/products/audio';

// Mock data for now - replace with your actual data imports
const mockProducts: Product[] = [];

/**
 * Get all products with optional filtering
 */
export async function getProducts(params?: ProductSearchParams): Promise<ProductSearchResult> {
  // Simulate async operation
  await new Promise(resolve => setTimeout(resolve, 100));
  
  let products = [...mockProducts]; // Replace with your actual data
  
  // Apply filters
  if (params) {
    // Category filter
    if (params.category) {
      products = products.filter(p => p.category === params.category);
    }
    
    // Brand filter
    if (params.brand && params.brand.length > 0) {
      products = products.filter(p => params.brand!.includes(p.brand));
    }
    
    // Price filter
    if (params.priceRange) {
      products = products.filter(p => 
        p.currentPrice.amount >= params.priceRange!.min &&
        p.currentPrice.amount <= params.priceRange!.max
      );
    }
    
    // Rating filter
    if (params.rating) {
      products = products.filter(p => p.rating.overall >= params.rating!.min);
    }
    
    // Search query
    if (params.query) {
      const query = params.query.toLowerCase();
      products = products.filter(p => 
        p.name.en.toLowerCase().includes(query) ||
        p.name.he.includes(query) ||
        p.brand.toLowerCase().includes(query)
      );
    }
    
    // Sorting
    if (params.sortBy) {
      switch (params.sortBy) {
        case 'price-asc':
          products.sort((a, b) => a.currentPrice.amount - b.currentPrice.amount);
          break;
        case 'price-desc':
          products.sort((a, b) => b.currentPrice.amount - a.currentPrice.amount);
          break;
        case 'rating':
          products.sort((a, b) => b.rating.overall - a.rating.overall);
          break;
        case 'newest':
          products.sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
          break;
        case 'popular':
          products.sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0));
          break;
      }
    }
  }
  
  // Pagination
  const page = params?.page || 1;
  const limit = params?.limit || 12;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  
  const paginatedProducts = products.slice(startIndex, endIndex);
  
  // Convert to ProductSummary
  const productSummaries: ProductSummary[] = paginatedProducts.map(p => ({
    id: p.id,
    slug: p.slug,
    name: p.name,
    brand: p.brand,
    model: p.model,
    category: p.category,
    shortDescription: p.shortDescription || p.description,
    primaryImage: p.images[0],
    rating: {
      overall: p.rating.overall,
      totalReviews: p.rating.totalReviews || 0
    },
    currentPrice: p.currentPrice,
    msrp: p.msrp,
    isNew: p.isNewProduct,
    isFeatured: p.isFeatured,
    availabilityStatus: p.affiliateLinks[0]?.availability || 'out-of-stock',
    quickSpecs: p.specifications.filter(s => s.isHighlight).slice(0, 4),
    lastUpdated: p.updatedAt
  }));
  
  // Generate facets
  const brands = Array.from(new Set(products.map(p => p.brand)));
  const categories = Array.from(new Set(products.map(p => p.category)));
  
  return {
    products: productSummaries,
    totalCount: products.length,
    facets: {
      brands: brands.map(b => ({
        name: b,
        count: products.filter(p => p.brand === b).length
      })),
      categories: categories.map(c => ({
        id: c,
        name: { he: c, en: c }, // Replace with actual category names
        count: products.filter(p => p.category === c).length
      })),
      priceRanges: [
        { min: 0, max: 1000, count: products.filter(p => p.currentPrice.amount <= 1000).length },
        { min: 1000, max: 3000, count: products.filter(p => p.currentPrice.amount > 1000 && p.currentPrice.amount <= 3000).length },
        { min: 3000, max: 5000, count: products.filter(p => p.currentPrice.amount > 3000 && p.currentPrice.amount <= 5000).length },
        { min: 5000, max: 10000, count: products.filter(p => p.currentPrice.amount > 5000).length }
      ],
      ratings: [
        { min: 4, count: products.filter(p => p.rating.overall >= 4).length },
        { min: 3, count: products.filter(p => p.rating.overall >= 3).length },
        { min: 2, count: products.filter(p => p.rating.overall >= 2).length }
      ]
    }
  };
}

/**
 * Get a single product by slug
 */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  await new Promise(resolve => setTimeout(resolve, 100));
  
  const products = [...mockProducts]; // Replace with your actual data
  return products.find(p => p.slug === slug) || null;
}

/**
 * Get products by category
 */
export async function getProductsByCategory(categorySlug: string, locale: Locale): Promise<ProductSummary[]> {
  const result = await getProducts({ category: categorySlug });
  return result.products;
}

/**
 * Get featured products
 */
export async function getFeaturedProducts(limit: number = 8): Promise<ProductSummary[]> {
  const products = [...mockProducts].filter(p => p.isFeatured);
  
  return products.slice(0, limit).map(p => ({
    id: p.id,
    slug: p.slug,
    name: p.name,
    brand: p.brand,
    model: p.model,
    category: p.category,
    shortDescription: p.shortDescription || p.description,
    primaryImage: p.images[0],
    rating: {
      overall: p.rating.overall,
      totalReviews: p.rating.totalReviews || 0
    },
    currentPrice: p.currentPrice,
    msrp: p.msrp,
    isNew: p.isNewProduct,
    isFeatured: p.isFeatured,
    availabilityStatus: p.affiliateLinks[0]?.availability || 'out-of-stock',
    quickSpecs: p.specifications.filter(s => s.isHighlight).slice(0, 4),
    lastUpdated: p.updatedAt
  }));
}

/**
 * Get new products
 */
export async function getNewProducts(limit: number = 8): Promise<ProductSummary[]> {
  const products = [...mockProducts]
    .filter(p => p.isNewProduct)
    .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
  
  return products.slice(0, limit).map(p => ({
    id: p.id,
    slug: p.slug,
    name: p.name,
    brand: p.brand,
    model: p.model,
    category: p.category,
    shortDescription: p.shortDescription || p.description,
    primaryImage: p.images[0],
    rating: {
      overall: p.rating.overall,
      totalReviews: p.rating.totalReviews || 0
    },
    currentPrice: p.currentPrice,
    msrp: p.msrp,
    isNew: p.isNewProduct,
    isFeatured: p.isFeatured,
    availabilityStatus: p.affiliateLinks[0]?.availability || 'out-of-stock',
    quickSpecs: p.specifications.filter(s => s.isHighlight).slice(0, 4),
    lastUpdated: p.updatedAt
  }));
}

/**
 * Get products on sale
 */
export async function getDealsProducts(limit: number = 8): Promise<ProductSummary[]> {
  const products = [...mockProducts]
    .filter(p => p.msrp && p.currentPrice.amount < p.msrp.amount)
    .sort((a, b) => {
      const aDiscount = ((a.msrp!.amount - a.currentPrice.amount) / a.msrp!.amount) * 100;
      const bDiscount = ((b.msrp!.amount - b.currentPrice.amount) / b.msrp!.amount) * 100;
      return bDiscount - aDiscount;
    });
  
  return products.slice(0, limit).map(p => ({
    id: p.id,
    slug: p.slug,
    name: p.name,
    brand: p.brand,
    model: p.model,
    category: p.category,
    shortDescription: p.shortDescription || p.description,
    primaryImage: p.images[0],
    rating: {
      overall: p.rating.overall,
      totalReviews: p.rating.totalReviews || 0
    },
    currentPrice: p.currentPrice,
    msrp: p.msrp,
    isNew: p.isNewProduct,
    isFeatured: p.isFeatured,
    availabilityStatus: p.affiliateLinks[0]?.availability || 'out-of-stock',
    quickSpecs: p.specifications.filter(s => s.isHighlight).slice(0, 4),
    lastUpdated: p.updatedAt
  }));
}

/**
 * Get related products
 */
export async function getRelatedProducts(productId: string, limit: number = 4): Promise<ProductSummary[]> {
  const product = await getProductBySlug(productId);
  if (!product) return [];
  
  const products = [...mockProducts]
    .filter(p => 
      p.id !== productId && 
      (p.category === product.category || p.brand === product.brand)
    )
    .sort((a, b) => b.rating.overall - a.rating.overall);
  
  return products.slice(0, limit).map(p => ({
    id: p.id,
    slug: p.slug,
    name: p.name,
    brand: p.brand,
    model: p.model,
    category: p.category,
    shortDescription: p.shortDescription || p.description,
    primaryImage: p.images[0],
    rating: {
      overall: p.rating.overall,
      totalReviews: p.rating.totalReviews || 0
    },
    currentPrice: p.currentPrice,
    msrp: p.msrp,
    isNew: p.isNewProduct,
    isFeatured: p.isFeatured,
    availabilityStatus: p.affiliateLinks[0]?.availability || 'out-of-stock',
    quickSpecs: p.specifications.filter(s => s.isHighlight).slice(0, 4),
    lastUpdated: p.updatedAt
  }));
}