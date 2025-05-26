'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowLeft, Star, TrendingUp, Award, Zap, ChevronRight } from 'lucide-react';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { useBreakpoint, ResponsiveContainer, ResponsiveGrid, ResponsiveVisibility } from '@/hooks/responsive';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/product/ProductCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { SearchInput } from '@/components/ui/Input';
import { sampleProducts, sampleCategories } from '@/data/sample/products';
import { Locale } from '@/types';

// Responsive Hero Section
interface ResponsiveHeroProps {
  locale?: Locale;
}

function ResponsiveHero({ locale = 'he' }: ResponsiveHeroProps) {
  const { isMobile, isTablet } = useBreakpoint();
  const isRTL = locale === 'he';

  const content = {
    he: {
      title: 'המדריך המהימן שלכם לעולם הטכנולוגיה',
      subtitle: 'סקירות מקצועיות, השוואות מחירים ומדריכי קנייה עם המלצות מומחים',
      cta: 'התחל לחקור',
      searchPlaceholder: 'מה אתם מחפשים היום?',
      trustedBy: 'נבחר על ידי אלפי קוראים'
    },
    en: {
      title: 'Your Trusted Guide to the World of Technology',
      subtitle: 'Professional reviews, price comparisons and buying guides with expert recommendations',
      cta: 'Start Exploring',
      searchPlaceholder: 'What are you looking for today?',
      trustedBy: 'Trusted by thousands of readers'
    }
  };

  const text = content[locale];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      
      <ResponsiveContainer className="relative">
        <div className={`flex flex-col ${isMobile ? 'text-center py-12' : isTablet ? 'text-center py-16' : 'py-20'} ${isRTL ? 'text-right' : 'text-left'}`}>
          
          {/* Main Content */}
          <div className={`${isMobile ? 'space-y-6' : 'space-y-8'} ${!isMobile ? 'max-w-4xl mx-auto' : ''}`}>
            
            {/* Badge */}
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium ${isMobile ? 'mx-auto' : ''}`}>
              <Award className="h-4 w-4" />
              {text.trustedBy}
            </div>

            {/* Title */}
            <h1 className={`font-bold tracking-tight ${
              isMobile 
                ? 'text-3xl leading-tight' 
                : isTablet 
                ? 'text-4xl leading-tight' 
                : 'text-5xl lg:text-6xl leading-tight'
            }`}>
              {text.title}
            </h1>

            {/* Subtitle */}
            <p className={`text-muted-foreground ${
              isMobile 
                ? 'text-base leading-relaxed' 
                : 'text-lg lg:text-xl leading-relaxed'
            } ${!isMobile ? 'max-w-3xl' : ''}`}>
              {text.subtitle}
            </p>

            {/* Search Bar */}
            <div className={`${isMobile ? 'w-full' : 'max-w-lg'} ${!isMobile && !isRTL ? 'mx-0' : isMobile ? '' : 'mx-auto'}`}>
              <SearchInput
                placeholder={text.searchPlaceholder}
                isRTL={isRTL}
                fullWidth
                className="h-12 text-base"
              />
            </div>

            {/* CTA Button */}
            <div className={isMobile ? 'pt-2' : 'pt-4'}>
              <Button 
                size={isMobile ? 'md' : 'lg'} 
                className={`${isMobile ? 'w-full' : ''} gap-2`}
              >
                {text.cta}
                {isRTL ? <ArrowLeft className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          {/* Stats (Desktop only) */}
          <ResponsiveVisibility hideOn={['xs', 'sm']}>
            <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              {[
                { number: '500+', label: locale === 'he' ? 'סקירות מוצרים' : 'Product Reviews' },
                { number: '50K+', label: locale === 'he' ? 'קוראים חודשיים' : 'Monthly Readers' },
                { number: '100+', label: locale === 'he' ? 'מותגים מובילים' : 'Leading Brands' },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-bold text-primary">{stat.number}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </ResponsiveVisibility>
        </div>
      </ResponsiveContainer>
    </section>
  );
}

// Responsive Featured Categories
interface ResponsiveCategoriesProps {
  locale?: Locale;
}

function ResponsiveCategories({ locale = 'he' }: ResponsiveCategoriesProps) {
  const { isMobile, isTablet } = useBreakpoint();
  const isRTL = locale === 'he';

  const sectionTitle = locale === 'he' ? 'חקור לפי קטגורוי' : 'Explore by Category';
  const sectionSubtitle = locale === 'he' 
    ? 'מצא את המוצרים המושלמים עבורכם' 
    : 'Find the perfect products for you';

  // Grid configuration based on screen size
  const getGridCols = () => {
    if (isMobile) return { xs: 2 };
    if (isTablet) return { xs: 2, md: 3 };
    return { xs: 2, sm: 3, md: 4, lg: 6 };
  };

  return (
    <section className="py-12 lg:py-16">
      <ResponsiveContainer>
        {/* Section Header */}
        <div className={`text-center mb-8 lg:mb-12 ${isRTL ? 'text-right' : 'text-left'}`}>
          <h2 className={`font-bold mb-4 ${
            isMobile ? 'text-2xl' : 'text-3xl lg:text-4xl'
          }`}>
            {sectionTitle}
          </h2>
          <p className={`text-muted-foreground ${
            isMobile ? 'text-sm' : 'text-base lg:text-lg'
          }`}>
            {sectionSubtitle}
          </p>
        </div>

        {/* Categories Grid */}
        <ResponsiveGrid
          cols={getGridCols()}
          gap={isMobile ? 'sm' : 'md'}
        >
          {sampleCategories.slice(0, 6).map((category) => (
            <Link
              key={category.id}
              href={`/${locale}/categories/${category.slug}`}
              className="group"
            >
              <Card className="hover:shadow-lg transition-all duration-200 group-hover:scale-105">
                <CardContent className={`${isMobile ? 'p-4' : 'p-6'} text-center`}>
                  {/* Icon placeholder */}
                  <div className={`mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-3 ${
                    isMobile ? 'w-12 h-12' : 'w-16 h-16'
                  }`}>
                    <span className={`text-primary font-bold ${isMobile ? 'text-lg' : 'text-xl'}`}>
                      {category.name[locale].charAt(0)}
                    </span>
                  </div>
                  
                  <h3 className={`font-semibold mb-1 ${isMobile ? 'text-sm' : 'text-base'}`}>
                    {category.name[locale]}
                  </h3>
                  
                  <p className={`text-muted-foreground ${isMobile ? 'text-xs' : 'text-sm'}`}>
                    {category.productCount} {locale === 'he' ? 'מוצרים' : 'products'}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </ResponsiveGrid>
      </ResponsiveContainer>
    </section>
  );
}

// Responsive Featured Products
interface ResponsiveFeaturedProductsProps {
  locale?: Locale;
}

function ResponsiveFeaturedProducts({ locale = 'he' }: ResponsiveFeaturedProductsProps) {
  const { isMobile, isTablet } = useBreakpoint();
  const isRTL = locale === 'he';

  const sectionTitle = locale === 'he' ? 'המוצרים המומלצים שלנו' : 'Our Featured Products';
  const sectionSubtitle = locale === 'he' 
    ? 'נבחרו בקפידה על ידי המומחים שלנו' 
    : 'Carefully selected by our experts';
  
  const viewAllText = locale === 'he' ? 'צפה בכל המוצרים' : 'View All Products';

  // Filter featured products
  const featuredProducts = sampleProducts.filter(product => product.isFeatured).slice(0, 8);

  // Grid configuration
  const getGridCols = () => {
    if (isMobile) return { xs: 1, sm: 2 };
    if (isTablet) return { xs: 2, md: 3 };
    return { xs: 2, md: 3, lg: 4 };
  };

  return (
    <section className="py-12 lg:py-16 bg-muted/30">
      <ResponsiveContainer>
        {/* Section Header */}
        <div className={`flex items-center justify-between mb-8 lg:mb-12 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <div>
            <h2 className={`font-bold mb-2 ${isMobile ? 'text-2xl' : 'text-3xl lg:text-4xl'}`}>
              {sectionTitle}
            </h2>
            <p className={`text-muted-foreground ${isMobile ? 'text-sm' : 'text-base'}`}>
              {sectionSubtitle}
            </p>
          </div>
          
          <ResponsiveVisibility hideOn={['xs']}>
            <Button variant="outline" className="gap-2">
              {viewAllText}
              {isRTL ? <ArrowLeft className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
            </Button>
          </ResponsiveVisibility>
        </div>

        {/* Products Grid */}
        <ResponsiveGrid
          cols={getGridCols()}
          gap={isMobile ? 'sm' : 'lg'}
          className="mb-8"
        >
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              locale={locale}
              variant={isMobile ? 'compact' : 'default'}
              showCompare={!isMobile}
              showWishlist={!isMobile}
              showQuickBuy={true}
            />
          ))}
        </ResponsiveGrid>

        {/* Mobile View All Button */}
        <ResponsiveVisibility showOn={['xs']}>
          <div className="text-center">
            <Button variant="outline" className="w-full gap-2">
              {viewAllText}
              {isRTL ? <ArrowLeft className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
            </Button>
          </div>
        </ResponsiveVisibility>
      </ResponsiveContainer>
    </section>
  );
}

// Responsive Stats Section
interface ResponsiveStatsProps {
  locale?: Locale;
}

function ResponsiveStats({ locale = 'he' }: ResponsiveStatsProps) {
  const { isMobile } = useBreakpoint();

  const stats = [
    {
      icon: <TrendingUp className="h-6 w-6" />,
      number: '98%',
      label: locale === 'he' ? 'שביעות רצון קוראים' : 'Reader Satisfaction'
    },
    {
      icon: <Award className="h-6 w-6" />,
      number: '500+',
      label: locale === 'he' ? 'סקירות מומחים' : 'Expert Reviews'
    },
    {
      icon: <Zap className="h-6 w-6" />,
      number: '24/7',
      label: locale === 'he' ? 'עדכונים שוטפים' : 'Continuous Updates'
    },
    {
      icon: <Star className="h-6 w-6" />,
      number: '4.9',
      label: locale === 'he' ? 'דירוג ממוצע' : 'Average Rating'
    }
  ];

  return (
    <section className="py-12 lg:py-16">
      <ResponsiveContainer>
        <ResponsiveGrid
          cols={{ xs: 2, md: 4 }}
          gap={isMobile ? 'md' : 'lg'}
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 text-primary rounded-full mb-4">
                {stat.icon}
              </div>
              <div className={`font-bold text-primary mb-1 ${isMobile ? 'text-2xl' : 'text-3xl'}`}>
                {stat.number}
              </div>
              <div className={`text-muted-foreground ${isMobile ? 'text-sm' : 'text-base'}`}>
                {stat.label}
              </div>
            </div>
          ))}
        </ResponsiveGrid>
      </ResponsiveContainer>
    </section>
  );
}

// Newsletter Section
interface ResponsiveNewsletterProps {
  locale?: Locale;
}

function ResponsiveNewsletter({ locale = 'he' }: ResponsiveNewsletterProps) {
  const [email, setEmail] = useState('');
  const { isMobile } = useBreakpoint();
  const isRTL = locale === 'he';

  const content = {
    he: {
      title: 'הישארו מעודכנים',
      subtitle: 'קבלו את הסקירות החדשות והמבצעים הכי טובים ישירות למייל',
      placeholder: 'כתובת אימייל',
      button: 'הרשמה',
      privacy: 'לא נשלח דואר זבל. ניתן לבטל בכל עת.'
    },
    en: {
      title: 'Stay Updated',
      subtitle: 'Get the latest reviews and best deals directly to your inbox',
      placeholder: 'Email address',
      button: 'Subscribe',
      privacy: 'No spam. Unsubscribe at any time.'
    }
  };

  const text = content[locale];

  return (
    <section className="py-12 lg:py-16 bg-primary/5">
      <ResponsiveContainer>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className={`font-bold mb-4 ${isMobile ? 'text-2xl' : 'text-3xl lg:text-4xl'}`}>
            {text.title}
          </h2>
          <p className={`text-muted-foreground mb-8 ${isMobile ? 'text-sm' : 'text-base lg:text-lg'}`}>
            {text.subtitle}
          </p>

          {/* Newsletter Form */}
          <div className={`${isMobile ? 'space-y-3' : 'flex gap-3 max-w-md mx-auto'} ${isRTL && !isMobile ? 'flex-row-reverse' : ''}`}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={text.placeholder}
              className={`${isMobile ? 'w-full' : 'flex-1'} px-4 py-2 rounded-md border border-input bg-background ${isRTL ? 'text-right' : 'text-left'}`}
            />
            <Button className={isMobile ? 'w-full' : ''}>
              {text.button}
            </Button>
          </div>

          <p className={`text-xs text-muted-foreground mt-4 ${isRTL ? 'text-right' : 'text-left'}`}>
            {text.privacy}
          </p>
        </div>
      </ResponsiveContainer>
    </section>
  );
}

// Main Homepage Component
interface ResponsiveHomepageProps {
  locale?: Locale;
}

export default function ResponsiveHomepage({ locale = 'he' }: ResponsiveHomepageProps) {
  const { isMobile } = useBreakpoint();

  return (
    <ThemeProvider defaultTheme="system" storageKey="techreviews-theme">
      <div className="min-h-screen bg-background">
        {/* Header */}
        <Header
          locale={locale}
          onLanguageChange={(newLocale) => {
            // Handle language change
            console.log('Language changed to:', newLocale);
          }}
          onThemeToggle={() => {
            // Theme toggle handled by ThemeProvider
          }}
        />

        {/* Main Content */}
        <main>
          {/* Hero Section */}
          <ResponsiveHero locale={locale} />

          {/* Featured Categories */}
          <ResponsiveCategories locale={locale} />

          {/* Featured Products */}
          <ResponsiveFeaturedProducts locale={locale} />

          {/* Stats Section */}
          <ResponsiveStats locale={locale} />

          {/* Newsletter */}
          <ResponsiveNewsletter locale={locale} />
        </main>

        {/* Footer */}
        <Footer locale={locale} />

        {/* Mobile-specific floating elements */}
        <ResponsiveVisibility showOn={['xs']}>
          {/* Bottom spacing for mobile navigation if needed */}
          <div className="h-16" />
        </ResponsiveVisibility>
      </div>
    </ThemeProvider>
  );
}

// Additional Responsive Utility Components

// Responsive Image with loading states
interface ResponsiveImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: {
    mobile: string;
    tablet: string;
    desktop: string;
  };
}

export function ResponsiveImage({
  src,
  alt,
  className = '',
  priority = false,
  sizes = {
    mobile: '100vw',
    tablet: '50vw', 
    desktop: '33vw'
  }
}: ResponsiveImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const responsiveSizes = `
    (max-width: 767px) ${sizes.mobile},
    (max-width: 1023px) ${sizes.tablet},
    ${sizes.desktop}
  `;

  if (error) {
    return (
      <div className={`bg-muted flex items-center justify-center ${className}`}>
        <span className="text-muted-foreground text-sm">
          Failed to load image
        </span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-muted animate-pulse" />
      )}
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={responsiveSizes}
        className={`object-cover transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setError(true);
        }}
      />
    </div>
  );
}

// Responsive Modal/Dialog
interface ResponsiveModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'full';
}

export function ResponsiveModal({
  isOpen,
  onClose,
  title,
  children,
  size = 'md'
}: ResponsiveModalProps) {
  const { isMobile } = useBreakpoint();

  if (!isOpen) return null;

  // Mobile: Full screen modal
  if (isMobile) {
    return (
      <div className="fixed inset-0 z-50 bg-background">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold">{title}</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {children}
          </div>
        </div>
      </div>
    );
  }

  // Desktop: Centered modal
  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-2xl',
    full: 'max-w-6xl'
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className={`w-full ${sizeClasses[size]} bg-card border rounded-lg shadow-lg`}>
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-lg font-semibold">{title}</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Content */}
          <div className="p-6">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}

// Responsive Tabs
interface ResponsiveTabsProps {
  tabs: {
    id: string;
    label: string;
    content: React.ReactNode;
  }[];
  defaultTab?: string;
  locale?: Locale;
}

export function ResponsiveTabs({ 
  tabs, 
  defaultTab, 
  locale = 'he' 
}: ResponsiveTabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);
  const { isMobile } = useBreakpoint();
  const isRTL = locale === 'he';

  // Mobile: Dropdown style
  if (isMobile) {
    const activeTabData = tabs.find(tab => tab.id === activeTab);
    
    return (
      <div className="space-y-4">
        {/* Tab Selector */}
        <select
          value={activeTab}
          onChange={(e) => setActiveTab(e.target.value)}
          className={`w-full p-3 border border-input rounded-md bg-background ${isRTL ? 'text-right' : 'text-left'}`}
        >
          {tabs.map((tab) => (
            <option key={tab.id} value={tab.id}>
              {tab.label}
            </option>
          ))}
        </select>
        
        {/* Content */}
        <div>
          {activeTabData?.content}
        </div>
      </div>
    );
  }

  // Desktop: Traditional tabs
  return (
    <div className="space-y-4">
      {/* Tab Headers */}
      <div className={`flex border-b ${isRTL ? 'flex-row-reverse' : ''}`}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      
      {/* Content */}
      <div>
        {tabs.find(tab => tab.id === activeTab)?.content}
      </div>
    </div>
  );
}

// Responsive Sidebar Layout
interface ResponsiveSidebarLayoutProps {
  sidebar: React.ReactNode;
  children: React.ReactNode;
  sidebarPosition?: 'left' | 'right';
  locale?: Locale;
}

export function ResponsiveSidebarLayout({
  sidebar,
  children,
  sidebarPosition = 'left',
  locale = 'he'
}: ResponsiveSidebarLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isMobile } = useBreakpoint();
  const isRTL = locale === 'he';

  // Mobile: Overlay sidebar
  if (isMobile) {
    return (
      <div className="relative">
        {/* Mobile Header with Sidebar Toggle */}
        <div className="flex items-center justify-between p-4 border-b lg:hidden">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu className="h-4 w-4 mr-2" />
            {locale === 'he' ? 'תפריט' : 'Menu'}
          </Button>
        </div>

        {/* Main Content */}
        <div className="p-4">
          {children}
        </div>

        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <>
            <div 
              className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm"
              onClick={() => setIsSidebarOpen(false)}
            />
            <div className={`fixed top-0 bottom-0 z-50 w-80 bg-background border-r overflow-y-auto ${
              isRTL ? 'right-0' : 'left-0'
            }`}>
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">
                    {locale === 'he' ? 'תפריט' : 'Menu'}
                  </h3>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                {sidebar}
              </div>
            </div>
          </>
        )}
      </div>
    );
  }

  // Desktop: Side-by-side layout
  return (
    <div className={`flex gap-6 ${isRTL && sidebarPosition === 'right' ? 'flex-row-reverse' : ''}`}>
      {sidebarPosition === 'left' && (
        <div className="w-64 flex-shrink-0">
          {sidebar}
        </div>
      )}
      
      <div className="flex-1 min-w-0">
        {children}
      </div>
      
      {sidebarPosition === 'right' && (
        <div className="w-64 flex-shrink-0">
          {sidebar}
        </div>
      )}
    </div>
  );
}