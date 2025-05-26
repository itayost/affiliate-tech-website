//ThemeToggle.tsx
'use client';

import { useState } from 'react';
import { Sun, Moon, Monitor, Check, ChevronDown } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import Button from '@/components/ui/Button';

interface ThemeToggleProps {
  variant?: 'button' | 'dropdown' | 'switch';
  size?: 'sm' | 'md' | 'lg';
  showLabels?: boolean;
  locale?: 'he' | 'en';
  className?: string;
}

export function ThemeToggle({
  variant = 'button',
  size = 'md',
  showLabels = false,
  locale = 'he',
  className = ''
}: ThemeToggleProps) {
  const { theme, setTheme, resolvedTheme, isDark, isSystem } = useTheme();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const isRTL = locale === 'he';

  const themeOptions = {
    he: {
      light: 'בהיר',
      dark: 'כהה',
      system: 'אוטומטי',
      toggle: 'החלף צבע רקע',
      currentTheme: 'צבע רקע נוכחי'
    },
    en: {
      light: 'Light',
      dark: 'Dark',
      system: 'System',
      toggle: 'Toggle theme',
      currentTheme: 'Current theme'
    }
  };

  const text = themeOptions[locale];

  const getThemeIcon = (themeType: string, className: string = '') => {
    switch (themeType) {
      case 'light':
        return <Sun className={className} />;
      case 'dark':
        return <Moon className={className} />;
      case 'system':
        return <Monitor className={className} />;
      default:
        return <Sun className={className} />;
    }
  };

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme);
    setIsDropdownOpen(false);
  };

  // Simple button toggle (cycles through themes)
  if (variant === 'button') {
    const toggleTheme = () => {
      if (theme === 'light') {
        setTheme('dark');
      } else if (theme === 'dark') {
        setTheme('system');
      } else {
        setTheme('light');
      }
    };

    return (
      <Button
        variant="ghost"
        size={size}
        onClick={toggleTheme}
        className={`${className} ${showLabels ? 'gap-2' : ''}`}
        aria-label={text.toggle}
      >
        {getThemeIcon(theme, size === 'sm' ? 'h-4 w-4' : size === 'lg' ? 'h-6 w-6' : 'h-5 w-5')}
        {showLabels && <span>{text[theme as keyof typeof text]}</span>}
      </Button>
    );
  }

  // Switch component (light/dark only)
  if (variant === 'switch') {
    return (
      <div className={`flex items-center gap-3 ${className} ${isRTL ? 'flex-row-reverse' : ''}`}>
        {showLabels && (
          <>
            <Sun className={`h-4 w-4 ${!isDark ? 'text-yellow-500' : 'text-muted-foreground'}`} />
            <span className="text-sm">{text.light}</span>
          </>
        )}
        
        <button
          onClick={() => setTheme(isDark ? 'light' : 'dark')}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${
            isDark ? 'bg-primary' : 'bg-gray-200'
          }`}
          role="switch"
          aria-checked={isDark}
          aria-label={text.toggle}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              isDark ? 'translate-x-6' : 'translate-x-1'
            }`}
          >
            {isDark ? (
              <Moon className="h-3 w-3 text-primary p-0.5" />
            ) : (
              <Sun className="h-3 w-3 text-yellow-500 p-0.5" />
            )}
          </span>
        </button>

        {showLabels && (
          <>
            <span className="text-sm">{text.dark}</span>
            <Moon className={`h-4 w-4 ${isDark ? 'text-blue-400' : 'text-muted-foreground'}`} />
          </>
        )}
      </div>
    );
  }

  // Dropdown variant (all three options)
  if (variant === 'dropdown') {
    return (
      <div className={`relative ${className}`}>
        <Button
          variant="outline"
          size={size}
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className={`gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}
          aria-expanded={isDropdownOpen}
          aria-haspopup="true"
          aria-label={text.currentTheme}
        >
          {getThemeIcon(theme, size === 'sm' ? 'h-4 w-4' : 'h-5 w-5')}
          {showLabels && <span>{text[theme as keyof typeof text]}</span>}
          <ChevronDown className={`h-4 w-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
        </Button>

        {isDropdownOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-10"
              onClick={() => setIsDropdownOpen(false)}
            />
            
            {/* Dropdown Menu */}
            <div className={`absolute top-full mt-1 z-20 w-48 bg-popover border border-border rounded-md shadow-lg ${isRTL ? 'right-0' : 'left-0'}`}>
              <div className="p-1">
                {(['light', 'dark', 'system'] as const).map((themeOption) => (
                  <button
                    key={themeOption}
                    onClick={() => handleThemeChange(themeOption)}
                    className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md hover:bg-accent transition-colors ${
                      theme === themeOption ? 'bg-accent' : ''
                    } ${isRTL ? 'flex-row-reverse text-right' : 'text-left'}`}
                  >
                    {getThemeIcon(themeOption, 'h-4 w-4')}
                    <span className="flex-1">{text[themeOption]}</span>
                    {theme === themeOption && (
                      <Check className="h-4 w-4 text-primary" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    );
  }

  return null;
}

// Compact theme toggle for mobile
export function CompactThemeToggle({
  locale = 'he',
  className = ''
}: {
  locale?: 'he' | 'en';
  className?: string;
}) {
  const { theme, setTheme, isDark } = useTheme();

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-md hover:bg-accent transition-colors ${className}`}
      aria-label={locale === 'he' ? 'החלף צבע רקע' : 'Toggle theme'}
    >
      {isDark ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </button>
  );
}

// Theme status indicator
export function ThemeIndicator({
  locale = 'he',
  showText = true,
  className = ''
}: {
  locale?: 'he' | 'en';
  showText?: boolean;
  className?: string;
}) {
  const { theme, resolvedTheme } = useTheme();
  
  const text = {
    he: {
      light: 'מצב בהיר',
      dark: 'מצב כהה',
      system: 'מצב מערכת'
    },
    en: {
      light: 'Light mode',
      dark: 'Dark mode',
      system: 'System mode'
    }
  };

  const currentText = text[locale][theme as keyof typeof text[typeof locale]];

  return (
    <div className={`flex items-center gap-2 text-sm text-muted-foreground ${className}`}>
      <div className={`w-2 h-2 rounded-full ${resolvedTheme === 'dark' ? 'bg-blue-400' : 'bg-yellow-400'}`} />
      {showText && <span>{currentText}</span>}
    </div>
  );
}