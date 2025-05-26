'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronUp, Smartphone, Laptop, Headphones, Gamepad2, Home, Watch } from 'lucide-react';

interface NavigationProps {
  locale?: 'he' | 'en';
  className?: string;
}

export default function Navigation({ locale = 'he', className = '' }: NavigationProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  
  const isRTL = locale === 'he';

  // Navigation structure
  const navigationData = {
    he: {
      main: [
        { href: '/he', label: 'בית' },
        { 
          label: 'קטגוריות', 
          dropdown: [
            { href: '/he/categories/smartphones', label: 'סמארטפונים', icon: Smartphone },
            { href: '/he/categories/laptops', label: 'מחשבים ניידים', icon: Laptop },
            { href: '/he/categories/audio', label: 'אוזניות ואודיו', icon: Headphones },
            { href: '/he/categories/gaming', label: 'גיימינג', icon: Gamepad2 },
            { href: '/he/categories/smart-home', label: 'בית חכם', icon: Home },
            { href: '/he/categories/wearables', label: 'ביישן', icon: Watch },
          ]
        },
        { href: '/he/reviews', label: 'סקירות' },
        { href: '/he/guides', label: 'מדריכים' },
        { href: '/he/deals', label: 'מבצעים' },
        { href: '/he/compare', label: 'השוואה' },
      ]
    },
    en: {
      main: [
        { href: '/en', label: 'Home' },
        { 
          label: 'Categories', 
          dropdown: [
            { href: '/en/categories/smartphones', label: 'Smartphones', icon: Smartphone },
            { href: '/en/categories/laptops', label: 'Laptops', icon: Laptop },
            { href: '/en/categories/audio', label: 'Audio & Headphones', icon: Headphones },
            { href: '/en/categories/gaming', label: 'Gaming', icon: Gamepad2 },
            { href: '/en/categories/smart-home', label: 'Smart Home', icon: Home },
            { href: '/en/categories/wearables', label: 'Wearables', icon: Watch },
          ]
        },
        { href: '/en/reviews', label: 'Reviews' },
        { href: '/en/guides', label: 'Guides' },
        { href: '/en/deals', label: 'Deals' },
        { href: '/en/compare', label: 'Compare' },
      ]
    }
  };

  const navItems = navigationData[locale].main;

  const handleDropdownToggle = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  const handleItemClick = () => {
    setOpenDropdown(null);
  };

  return (
    <nav className={`relative ${className}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
        {navItems.map((item) => (
          <div key={item.label} className="relative group">
            {item.dropdown ? (
              // Dropdown Menu Item
              <div className="relative">
                <button
                  onClick={() => handleDropdownToggle(item.label)}
                  className={`flex items-center space-x-1 px-3 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors rounded-md hover:bg-accent ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}
                  aria-expanded={openDropdown === item.label}
                  aria-haspopup="true"
                >
                  <span>{item.label}</span>
                  {openDropdown === item.label ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </button>

                {/* Dropdown Menu */}
                {openDropdown === item.label && (
                  <div className={`absolute top-full mt-1 w-64 bg-popover border border-border rounded-md shadow-lg z-50 ${isRTL ? 'right-0' : 'left-0'}`}>
                    <div className="p-2">
                      {item.dropdown.map((dropdownItem) => {
                        const IconComponent = dropdownItem.icon;
                        return (
                          <Link
                            key={dropdownItem.href}
                            href={dropdownItem.href}
                            onClick={handleItemClick}
                            className={`flex items-center space-x-3 px-3 py-2 text-sm text-popover-foreground hover:bg-accent rounded-md transition-colors ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}
                          >
                            <IconComponent className="h-4 w-4 text-muted-foreground" />
                            <span>{dropdownItem.label}</span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              // Regular Menu Item
              <Link
                href={item.href}
                className="px-3 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors rounded-md hover:bg-accent"
              >
                {item.label}
              </Link>
            )}
          </div>
        ))}
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <div className="space-y-1">
          {navItems.map((item) => (
            <div key={item.label}>
              {item.dropdown ? (
                // Mobile Dropdown
                <div>
                  <button
                    onClick={() => handleDropdownToggle(item.label)}
                    className={`flex items-center justify-between w-full px-3 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors rounded-md hover:bg-accent ${isRTL ? 'flex-row-reverse' : ''}`}
                  >
                    <span>{item.label}</span>
                    {openDropdown === item.label ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </button>

                  {/* Mobile Dropdown Content */}
                  {openDropdown === item.label && (
                    <div className={`ml-4 mt-1 space-y-1 ${isRTL ? 'ml-0 mr-4' : ''}`}>
                      {item.dropdown.map((dropdownItem) => {
                        const IconComponent = dropdownItem.icon;
                        return (
                          <Link
                            key={dropdownItem.href}
                            href={dropdownItem.href}
                            onClick={handleItemClick}
                            className={`flex items-center space-x-3 px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-accent ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}
                          >
                            <IconComponent className="h-4 w-4" />
                            <span>{dropdownItem.label}</span>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              ) : (
                // Mobile Regular Item
                <Link
                  href={item.href}
                  onClick={handleItemClick}
                  className="block px-3 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors rounded-md hover:bg-accent"
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Overlay for mobile dropdown */}
      {openDropdown && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setOpenDropdown(null)}
        />
      )}
    </nav>
  );
}