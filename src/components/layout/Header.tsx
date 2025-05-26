'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Menu, X, Sun, Moon, Globe, ShoppingCart } from 'lucide-react';

interface HeaderProps {
  locale?: 'he' | 'en';
  onLanguageChange?: (locale: 'he' | 'en') => void;
  onThemeToggle?: () => void;
  isDarkMode?: boolean;
}

export default function Header({
  locale = 'he',
  onLanguageChange,
  onThemeToggle,
  isDarkMode = false
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const isRTL = locale === 'he';
  const direction = isRTL ? 'rtl' : 'ltr';

  // Navigation items with translations
  const navItems = {
    he: [
      { href: '/he', label: 'בית' },
      { href: '/he/categories', label: 'קטגוריות' },
      { href: '/he/reviews', label: 'סקירות' },
      { href: '/he/guides', label: 'מדריכים' },
      { href: '/he/deals', label: 'מבצעים' },
      { href: '/he/compare', label: 'השוואה' },
    ],
    en: [
      { href: '/en', label: 'Home' },
      { href: '/en/categories', label: 'Categories' },
      { href: '/en/reviews', label: 'Reviews' },
      { href: '/en/guides', label: 'Guides' },
      { href: '/en/deals', label: 'Deals' },
      { href: '/en/compare', label: 'Compare' },
    ]
  };

  const currentNavItems = navItems[locale];

  const searchPlaceholder = locale === 'he' ? 'חיפוש מוצרים...' : 'Search products...';
  const languageButtonText = locale === 'he' ? 'English' : 'עברית';

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <header 
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      dir={direction}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <ShoppingCart className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold">
              {locale === 'he' ? 'טק ביקורות' : 'TechReviews'}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {currentNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Search Bar - Desktop */}
          <div className={`hidden lg:flex items-center space-x-4 ${isRTL ? 'space-x-reverse' : ''}`}>
            <div className="relative">
              <Search className={`absolute top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground ${isRTL ? 'right-3' : 'left-3'}`} />
              <input
                type="search"
                placeholder={searchPlaceholder}
                className={`h-9 w-64 rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${isRTL ? 'pr-10 text-right' : 'pl-10'}`}
              />
            </div>
          </div>

          {/* Right side controls */}
          <div className={`flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''}`}>
            
            {/* Search button - Mobile */}
            <button
              onClick={toggleSearch}
              className="lg:hidden p-2 rounded-md hover:bg-accent"
              aria-label={locale === 'he' ? 'פתח חיפוש' : 'Open search'}
            >
              <Search className="h-5 w-5" />
            </button>

            {/* Language Toggle */}
            <button
              onClick={() => onLanguageChange?.(locale === 'he' ? 'en' : 'he')}
              className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium hover:bg-accent transition-colors"
            >
              <Globe className="h-4 w-4" />
              <span>{languageButtonText}</span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={onThemeToggle}
              className="p-2 rounded-md hover:bg-accent transition-colors"
              aria-label={locale === 'he' ? 'החלף צבע רקע' : 'Toggle theme'}
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-md hover:bg-accent"
              aria-label={locale === 'he' ? 'פתח תפריט' : 'Open menu'}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <div className="lg:hidden py-4 border-t">
            <div className="relative">
              <Search className={`absolute top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground ${isRTL ? 'right-3' : 'left-3'}`} />
              <input
                type="search"
                placeholder={searchPlaceholder}
                className={`w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${isRTL ? 'pr-10 text-right' : 'pl-10'}`}
                autoFocus
              />
            </div>
          </div>
        )}

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-3">
              {currentNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-accent transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}