'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, Heart, Compare, ExternalLink, TrendingUp, Award, Zap } from 'lucide-react';
import Button from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { ProductSummary, AffiliateLink, Locale } from '@/types';

interface ProductCardProps {
  product: ProductSummary;
  locale?: Locale;
  variant?: 'default' | 'compact' | 'detailed' | 'featured';
  showCompare?: boolean;
  showWishlist?: boolean;
  showQuickBuy?: boolean;
  affiliateLinks?: AffiliateLink[];
  onAffiliateClick?: (link: AffiliateLink) => void;
  onCompareClick?: (productId: string) => void;
  onWishlistClick?: (productId: string) => void;
  className?: string;
}

export default function ProductCard({
  product,
  locale = 'he',
  variant = 'default',
  showCompare = true,
  showWishlist = true,
  showQuickBuy = true,
  affiliateLinks = [],
  onAffiliateClick,
  onCompareClick,
  onWishlistClick,
  className = ''
}: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  const isRTL = locale === 'he';
  const direction = isRTL ? 'rtl' : 'ltr';

  // Text content by locale
  const content = {
    he: {
      compare: 'השווה',
      wishlist: 'הוסף למועדפים',
      removeWishlist: 'הסר ממועדפים',
      buyNow: 'קנה עכשיו',
      viewReview: 'קרא סקירה',
      comparePrices: 'השווה מחירים',
      inStock: 'במלאי',
      limitedStock: 'מלאי מוגבל',
      outOfStock: 'אזל מהמלאי',
      new: 'חדש',
      featured: 'מומלץ',
      reviews: 'ביקורות',
      from: 'החל מ-',
      originalPrice: 'מחיר מקורי:',
      discount: 'הנחה',
    },
    en: {
      compare: 'Compare',
      wishlist: 'Add to Wishlist',
      removeWishlist: 'Remove from Wishlist',
      buyNow: 'Buy Now',
      viewReview: 'Read Review',
      comparePrices: 'Compare Prices',
      inStock: 'In Stock',
      limitedStock: 'Limited Stock',
      outOfStock: 'Out of Stock',
      new: 'New',
      featured: 'Featured',
      reviews: 'Reviews',
      from: 'From',
      originalPrice: 'Original Price:',
      discount: 'Off',
    }
  };

  const text = content[locale];

  // Get best price from affiliate links
  const bestPrice = affiliateLinks.length > 0 
    ? affiliateLinks.reduce((best, current) => 
        current.price.amount < best.price.amount ? current : best
      )
    : null;

  const displayPrice = bestPrice?.price || product.currentPrice;
  const hasDiscount = product.msrp && displayPrice.amount < product.msrp.amount;
  const discountPercentage = hasDiscount 
    ? Math.round(((product.msrp!.amount - displayPrice.amount) / product.msrp!.amount) * 100)
    : 0;

  // Availability status styling
  const getAvailabilityStyle = (status: string) => {
    switch (status) {
      case 'available':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'limited':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'out-of-stock':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const availabilityText = {
    available: text.inStock,
    limited: text.limitedStock,
    'out-of-stock': text.outOfStock,
  }[product.availabilityStatus] || '';

  // Handle actions
  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    onWishlistClick?.(product.id);
  };

  const handleCompareClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onCompareClick?.(product.id);
  };

  const handleQuickBuy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (bestPrice) {
      onAffiliateClick?.(bestPrice);
    }
  };

  // Render rating stars
  const renderRating = () => {
    const rating = product.rating.overall;
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    return (
      <div className={`flex items-center gap-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
        <div className="flex">
          {[...Array(5)].map((_, index) => (
            <Star
              key={index}
              className={`h-3 w-3 ${
                index < fullStars
                  ? 'fill-yellow-400 text-yellow-400'
                  : index === fullStars && hasHalfStar
                  ? 'fill-yellow-200 text-yellow-400'
                  : 'fill-gray-200 text-gray-200'
              }`}
            />
          ))}
        </div>
        <span className="text-xs text-muted-foreground">
          ({product.rating.totalReviews} {text.reviews})
        </span>
      </div>
    );
  };

  // Card size variants
  const getCardClasses = () => {
    const baseClasses = 'group hover:shadow-lg transition-all duration-200';
    
    switch (variant) {
      case 'compact':
        return `${baseClasses} max-w-xs`;
      case 'detailed':
        return `${baseClasses} max-w-md`;
      case 'featured':
        return `${baseClasses} max-w-lg border-primary shadow-md`;
      default:
        return `${baseClasses} max-w-sm`;
    }
  };

  return (
    <Card 
      className={`${getCardClasses()} ${className}`}
      dir={direction}
    >
      <Link href={`/${locale}/products/${product.slug}`} className="block">
        <CardContent className="p-0">
          {/* Image Section */}
          <div className="relative aspect-square overflow-hidden rounded-t-lg bg-muted">
            {!imageError ? (
              <Image
                src={product.primaryImage.url}
                alt={product.primaryImage.alt[locale]}
                fill
                className="object-cover transition-transform duration-200 group-hover:scale-105"
                onError={() => setImageError(true)}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-muted">
                <div className="text-muted-foreground text-sm">
                  {product.name[locale]}
                </div>
              </div>
            )}

            {/* Badges */}
            <div className={`absolute top-2 flex flex-col gap-1 ${isRTL ? 'left-2' : 'right-2'}`}>
              {product.isNew && (
                <span className="bg-green-500 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                  <Zap className="h-3 w-3" />
                  {text.new}
                </span>
              )}
              {product.isFeatured && (
                <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded flex items-center gap-1">
                  <Award className="h-3 w-3" />
                  {text.featured}
                </span>
              )}
              {hasDiscount && (
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                  -{discountPercentage}%
                </span>
              )}
            </div>

            {/* Action Buttons Overlay */}
            <div className={`absolute top-2 opacity-0 group-hover:opacity-100 transition-opacity ${isRTL ? 'right-2' : 'left-2'}`}>
              <div className="flex flex-col gap-1">
                {showWishlist && (
                  <button
                    onClick={handleWishlistClick}
                    className={`p-2 rounded-full bg-white/90 hover:bg-white shadow-sm transition-colors ${
                      isWishlisted ? 'text-red-500' : 'text-gray-600 hover:text-red-500'
                    }`}
                    aria-label={isWishlisted ? text.removeWishlist : text.wishlist}
                  >
                    <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-current' : ''}`} />
                  </button>
                )}
                
                {showCompare && (
                  <button
                    onClick={handleCompareClick}
                    className="p-2 rounded-full bg-white/90 hover:bg-white text-gray-600 hover:text-primary shadow-sm transition-colors"
                    aria-label={text.compare}
                  >
                    <Compare className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-4 space-y-3">
            {/* Brand and Model */}
            <div className="space-y-1">
              <div className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                {product.brand}
              </div>
              <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors">
                {product.name[locale]}
              </h3>
            </div>

            {/* Rating */}
            {variant !== 'compact' && renderRating()}

            {/* Quick Specs */}
            {variant === 'detailed' && product.quickSpecs.length > 0 && (
              <div className="space-y-1">
                {product.quickSpecs.slice(0, 3).map((spec) => (
                  <div key={spec.key} className={`flex justify-between text-xs ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <span className="text-muted-foreground">{spec.label[locale]}:</span>
                    <span className="font-medium">{spec.value[locale]}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Price Section */}
            <div className="space-y-2">
              <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <span className="text-lg font-bold text-green-600">
                  {displayPrice.formatted}
                </span>
                
                {hasDiscount && product.msrp && (
                  <span className="text-sm text-muted-foreground line-through">
                    {product.msrp.formatted}
                  </span>
                )}
                
                {affiliateLinks.length > 1 && (
                  <span className="text-xs text-muted-foreground">
                    {text.from}
                  </span>
                )}
              </div>

              {/* Availability Status */}
              <span className={`inline-block text-xs px-2 py-1 rounded border ${getAvailabilityStyle(product.availabilityStatus)}`}>
                {availabilityText}
              </span>
            </div>

            {/* Action Buttons */}
            {variant !== 'compact' && (
              <div className={`flex gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                {showQuickBuy && bestPrice && product.availabilityStatus === 'available' && (
                  <Button
                    //variant="affiliate"
                    size="sm"
                    onClick={handleQuickBuy}
                    className="flex-1"
                  >
                    <ExternalLink className="h-3 w-3 mr-1" />
                    {text.buyNow}
                  </Button>
                )}
                
                <Button
                  variant="outline"
                  size="sm"
                  className={showQuickBuy && bestPrice ? 'flex-1' : 'w-full'}
                >
                  {text.viewReview}
                </Button>
              </div>
            )}

            {/* Quick Buy for Compact Variant */}
            {variant === 'compact' && showQuickBuy && bestPrice && (
              <Button
                size="sm"
                onClick={handleQuickBuy}
                className="w-full"
              >
                {text.buyNow}
              </Button>
            )}
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}