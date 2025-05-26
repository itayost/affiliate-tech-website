'use client';

import Link from 'next/link';
import { ShoppingCart, Mail, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

interface FooterProps {
  locale?: 'he' | 'en';
}

export default function Footer({ locale = 'he' }: FooterProps) {
  const isRTL = locale === 'he';
  const direction = isRTL ? 'rtl' : 'ltr';

  // Footer content in both languages
  const footerContent = {
    he: {
      tagline: 'המדריך המהימן שלכם לעולם הטכנולוגיה',
      categories: {
        title: 'קטגוריות',
        links: [
          { href: '/he/categories/smartphones', label: 'סמארטפונים' },
          { href: '/he/categories/laptops', label: 'מחשבים ניידים' },
          { href: '/he/categories/audio', label: 'אוזניות ואודיו' },
          { href: '/he/categories/gaming', label: 'גיימינג' },
          { href: '/he/categories/smart-home', label: 'בית חכם' },
          { href: '/he/categories/wearables', label: 'ביישן' },
        ]
      },
      content: {
        title: 'תוכן',
        links: [
          { href: '/he/reviews', label: 'סקירות מוצרים' },
          { href: '/he/guides', label: 'מדריכי קנייה' },
          { href: '/he/deals', label: 'מבצעים ועסקאות' },
          { href: '/he/compare', label: 'השוואת מוצרים' },
          { href: '/he/news', label: 'חדשות טכנולוגיה' },
        ]
      },
      company: {
        title: 'החברה',
        links: [
          { href: '/he/about', label: 'אודותינו' },
          { href: '/he/contact', label: 'צור קשר' },
          { href: '/he/privacy', label: 'מדיניות פרטיות' },
          { href: '/he/terms', label: 'תנאי שימוש' },
          { href: '/he/disclosure', label: 'גילוי נאות' },
        ]
      },
      newsletter: {
        title: 'הישארו מעודכנים',
        description: 'קבלו את הסקירות והמבצעים החדשים ישירות למייל',
        placeholder: 'כתובת אימייל',
        button: 'הרשמה',
      },
      social: {
        title: 'עקבו אחרינו',
      },
      copyright: '© 2025 טק ביקורות. כל הזכויות שמורות.',
      affiliate: 'אתר זה משתמש בקישורי שותפות ומקבל עמלה על רכישות.',
    },
    en: {
      tagline: 'Your trusted guide to the world of technology',
      categories: {
        title: 'Categories',
        links: [
          { href: '/en/categories/smartphones', label: 'Smartphones' },
          { href: '/en/categories/laptops', label: 'Laptops' },
          { href: '/en/categories/audio', label: 'Audio & Headphones' },
          { href: '/en/categories/gaming', label: 'Gaming' },
          { href: '/en/categories/smart-home', label: 'Smart Home' },
          { href: '/en/categories/wearables', label: 'Wearables' },
        ]
      },
      content: {
        title: 'Content',
        links: [
          { href: '/en/reviews', label: 'Product Reviews' },
          { href: '/en/guides', label: 'Buying Guides' },
          { href: '/en/deals', label: 'Deals & Offers' },
          { href: '/en/compare', label: 'Product Comparison' },
          { href: '/en/news', label: 'Tech News' },
        ]
      },
      company: {
        title: 'Company',
        links: [
          { href: '/en/about', label: 'About Us' },
          { href: '/en/contact', label: 'Contact' },
          { href: '/en/privacy', label: 'Privacy Policy' },
          { href: '/en/terms', label: 'Terms of Service' },
          { href: '/en/disclosure', label: 'Affiliate Disclosure' },
        ]
      },
      newsletter: {
        title: 'Stay Updated',
        description: 'Get the latest reviews and deals directly to your inbox',
        placeholder: 'Email address',
        button: 'Subscribe',
      },
      social: {
        title: 'Follow Us',
      },
      copyright: '© 2025 TechReviews. All rights reserved.',
      affiliate: 'This site uses affiliate links and earns commission on purchases.',
    }
  };

  const content = footerContent[locale];

  return (
    <footer 
      className="border-t bg-muted/50"
      dir={direction}
    >
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Brand & Newsletter */}
          <div className="lg:col-span-2">
            {/* Brand */}
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <ShoppingCart className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold">
                {locale === 'he' ? 'טק ביקורות' : 'TechReviews'}
              </span>
            </div>
            
            <p className="text-muted-foreground mb-6 max-w-md">
              {content.tagline}
            </p>

            {/* Newsletter Signup */}
            <div className="mb-6">
              <h3 className="font-semibold mb-2">{content.newsletter.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {content.newsletter.description}
              </p>
              <div className={`flex gap-2 max-w-md ${isRTL ? 'flex-row-reverse' : ''}`}>
                <input
                  type="email"
                  placeholder={content.newsletter.placeholder}
                  className={`flex-1 px-3 py-2 bg-background border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring ${isRTL ? 'text-right' : ''}`}
                />
                <button className="btn-primary px-4 py-2 text-sm whitespace-nowrap">
                  {content.newsletter.button}
                </button>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h3 className="font-semibold mb-3">{content.social.title}</h3>
              <div className={`flex gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <a 
                  href="#" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a 
                  href="#" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a 
                  href="#" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a 
                  href="#" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold mb-4">{content.categories.title}</h3>
            <ul className="space-y-2">
              {content.categories.links.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Content & Company */}
          <div>
            <h3 className="font-semibold mb-4">{content.content.title}</h3>
            <ul className="space-y-2 mb-6">
              {content.content.links.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h3 className="font-semibold mb-4">{content.company.title}</h3>
            <ul className="space-y-2">
              {content.company.links.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t mt-12 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-muted-foreground">
              {content.copyright}
            </div>
            
            <div className="text-xs text-muted-foreground bg-muted px-3 py-1 rounded">
              <Mail className="inline h-3 w-3 mr-1" />
              {content.affiliate}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}