'use client';

import { useState, useEffect } from 'react';

// Breakpoint definitions matching Tailwind CSS
export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

export type Breakpoint = keyof typeof breakpoints;

// Hook to get current screen size
export function useScreenSize() {
  const [screenSize, setScreenSize] = useState<{
    width: number;
    height: number;
    currentBreakpoint: Breakpoint | 'xs';
  }>({
    width: 0,
    height: 0,
    currentBreakpoint: 'xs',
  });

  useEffect(() => {
    const updateScreenSize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      // Determine current breakpoint
      let currentBreakpoint: Breakpoint | 'xs' = 'xs';
      
      if (width >= breakpoints['2xl']) {
        currentBreakpoint = '2xl';
      } else if (width >= breakpoints.xl) {
        currentBreakpoint = 'xl';
      } else if (width >= breakpoints.lg) {
        currentBreakpoint = 'lg';
      } else if (width >= breakpoints.md) {
        currentBreakpoint = 'md';
      } else if (width >= breakpoints.sm) {
        currentBreakpoint = 'sm';
      }

      setScreenSize({ width, height, currentBreakpoint });
    };

    // Set initial size
    updateScreenSize();

    // Add event listener
    window.addEventListener('resize', updateScreenSize);
    
    // Cleanup
    return () => window.removeEventListener('resize', updateScreenSize);
  }, []);

  return screenSize;
}

// Hook for responsive breakpoint checks
export function useBreakpoint() {
  const { currentBreakpoint, width } = useScreenSize();

  const isXs = currentBreakpoint === 'xs';
  const isSm = currentBreakpoint === 'sm';
  const isMd = currentBreakpoint === 'md';
  const isLg = currentBreakpoint === 'lg';
  const isXl = currentBreakpoint === 'xl';
  const is2Xl = currentBreakpoint === '2xl';

  // Greater than or equal checks
  const isSmUp = width >= breakpoints.sm;
  const isMdUp = width >= breakpoints.md;
  const isLgUp = width >= breakpoints.lg;
  const isXlUp = width >= breakpoints.xl;
  const is2XlUp = width >= breakpoints['2xl'];

  // Less than checks
  const isSmDown = width < breakpoints.sm;
  const isMdDown = width < breakpoints.md;
  const isLgDown = width < breakpoints.lg;
  const isXlDown = width < breakpoints.xl;

  // Mobile/Desktop checks
  const isMobile = width < breakpoints.md;
  const isTablet = width >= breakpoints.md && width < breakpoints.lg;
  const isDesktop = width >= breakpoints.lg;

  return {
    currentBreakpoint,
    width,
    isXs,
    isSm,
    isMd,
    isLg,
    isXl,
    is2Xl,
    isSmUp,
    isMdUp,
    isLgUp,
    isXlUp,
    is2XlUp,
    isSmDown,
    isMdDown,
    isLgDown,
    isXlDown,
    isMobile,
    isTablet,
    isDesktop,
  };
}

// Hook for media query matching
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    
    // Set initial value
    setMatches(media.matches);
    
    // Create listener
    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };
    
    // Add listener
    media.addEventListener('change', listener);
    
    // Cleanup
    return () => media.removeEventListener('change', listener);
  }, [query]);

  return matches;
}

// Container component with responsive behavior
interface ResponsiveContainerProps {
  children: React.ReactNode;
  maxWidth?: Breakpoint | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  className?: string;
}

export function ResponsiveContainer({
  children,
  maxWidth = 'xl',
  padding = 'md',
  className = ''
}: ResponsiveContainerProps) {
  const paddingClasses = {
    none: '',
    sm: 'px-4',
    md: 'px-4 sm:px-6 lg:px-8',
    lg: 'px-6 sm:px-8 lg:px-12',
  };

  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-7xl',
    '2xl': 'max-w-none',
    full: 'max-w-full',
  };

  return (
    <div className={`mx-auto w-full ${maxWidthClasses[maxWidth]} ${paddingClasses[padding]} ${className}`}>
      {children}
    </div>
  );
}

// Responsive grid component
interface ResponsiveGridProps {
  children: React.ReactNode;
  cols?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    '2xl'?: number;
  };
  gap?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export function ResponsiveGrid({
  children,
  cols = { xs: 1, sm: 2, md: 3, lg: 4 },
  gap = 'md',
  className = ''
}: ResponsiveGridProps) {
  const gapClasses = {
    none: 'gap-0',
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
    xl: 'gap-8',
  };

  const getGridClass = () => {
    const classes = ['grid'];
    
    if (cols.xs) classes.push(`grid-cols-${cols.xs}`);
    if (cols.sm) classes.push(`sm:grid-cols-${cols.sm}`);
    if (cols.md) classes.push(`md:grid-cols-${cols.md}`);
    if (cols.lg) classes.push(`lg:grid-cols-${cols.lg}`);
    if (cols.xl) classes.push(`xl:grid-cols-${cols.xl}`);
    if (cols['2xl']) classes.push(`2xl:grid-cols-${cols['2xl']}`);
    
    return classes.join(' ');
  };

  return (
    <div className={`${getGridClass()} ${gapClasses[gap]} ${className}`}>
      {children}
    </div>
  );
}

// Responsive text component
interface ResponsiveTextProps {
  children: React.ReactNode;
  size?: {
    xs?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
    sm?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
    md?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
    lg?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
  };
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
  align?: 'left' | 'center' | 'right' | 'justify';
  className?: string;
  as?: 'p' | 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export function ResponsiveText({
  children,
  size = { xs: 'sm', md: 'base' },
  weight = 'normal',
  align = 'left',
  className = '',
  as: Component = 'p'
}: ResponsiveTextProps) {
  const getSizeClasses = () => {
    const classes = [];
    
    if (size.xs) classes.push(`text-${size.xs}`);
    if (size.sm) classes.push(`sm:text-${size.sm}`);
    if (size.md) classes.push(`md:text-${size.md}`);
    if (size.lg) classes.push(`lg:text-${size.lg}`);
    
    return classes.join(' ');
  };

  const weightClass = `font-${weight}`;
  const alignClass = `text-${align}`;

  return (
    <Component className={`${getSizeClasses()} ${weightClass} ${alignClass} ${className}`}>
      {children}
    </Component>
  );
}

// Hide/Show components at different breakpoints
interface ResponsiveVisibilityProps {
  children: React.ReactNode;
  hideOn?: Breakpoint[];
  showOn?: Breakpoint[];
  hideMobile?: boolean;
  hideTablet?: boolean;
  hideDesktop?: boolean;
  showMobile?: boolean;
  showTablet?: boolean;
  showDesktop?: boolean;
}

export function ResponsiveVisibility({
  children,
  hideOn = [],
  showOn = [],
  hideMobile = false,
  hideTablet = false,
  hideDesktop = false,
  showMobile = false,
  showTablet = false,
  showDesktop = false,
}: ResponsiveVisibilityProps) {
  const classes = [];

  // Hide on specific breakpoints
  hideOn.forEach(bp => {
    classes.push(`${bp}:hidden`);
  });

  // Show on specific breakpoints
  if (showOn.length > 0) {
    classes.push('hidden');
    showOn.forEach(bp => {
      classes.push(`${bp}:block`);
    });
  }

  // Mobile/Tablet/Desktop shortcuts
  if (hideMobile) classes.push('max-md:hidden');
  if (hideTablet) classes.push('md:hidden lg:block');
  if (hideDesktop) classes.push('lg:hidden');
  
  if (showMobile) classes.push('block md:hidden');
  if (showTablet) classes.push('hidden md:block lg:hidden');
  if (showDesktop) classes.push('hidden lg:block');

  return (
    <div className={classes.join(' ')}>
      {children}
    </div>
  );
}

// Responsive spacing utility
export function getResponsiveSpacing(
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl',
  property: 'p' | 'm' | 'px' | 'py' | 'pt' | 'pb' | 'pl' | 'pr' | 'mx' | 'my' | 'mt' | 'mb' | 'ml' | 'mr'
): string {
  const spacingMap = {
    xs: '2',
    sm: '4',
    md: '6',
    lg: '8',
    xl: '12',
  };

  const responsiveSpacingMap = {
    xs: '4',
    sm: '6',
    md: '8',
    lg: '12',
    xl: '16',
  };

  return `${property}-${spacingMap[size]} md:${property}-${responsiveSpacingMap[size]}`;
}

// Responsive aspect ratio component
interface ResponsiveAspectRatioProps {
  children: React.ReactNode;
  ratio?: {
    xs?: 'square' | 'video' | '4/3' | '3/4' | '16/9' | '9/16';
    sm?: 'square' | 'video' | '4/3' | '3/4' | '16/9' | '9/16';
    md?: 'square' | 'video' | '4/3' | '3/4' | '16/9' | '9/16';
    lg?: 'square' | 'video' | '4/3' | '3/4' | '16/9' | '9/16';
  };
  className?: string;
}

export function ResponsiveAspectRatio({
  children,
  ratio = { xs: 'square', md: 'video' },
  className = ''
}: ResponsiveAspectRatioProps) {
  const getRatioClasses = () => {
    const classes = [];
    
    if (ratio.xs) classes.push(`aspect-${ratio.xs}`);
    if (ratio.sm) classes.push(`sm:aspect-${ratio.sm}`);
    if (ratio.md) classes.push(`md:aspect-${ratio.md}`);
    if (ratio.lg) classes.push(`lg:aspect-${ratio.lg}`);
    
    return classes.join(' ');
  };

  return (
    <div className={`${getRatioClasses()} ${className}`}>
      {children}
    </div>
  );
}

// Safe area utilities for mobile devices
export function useSafeArea() {
  const [safeArea, setSafeArea] = useState({
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  });

  useEffect(() => {
    const updateSafeArea = () => {
      const getEnvValue = (name: string) => {
        const value = getComputedStyle(document.documentElement)
          .getPropertyValue(`--safe-area-inset-${name}`);
        return parseInt(value) || 0;
      };

      setSafeArea({
        top: getEnvValue('top'),
        bottom: getEnvValue('bottom'),
        left: getEnvValue('left'),
        right: getEnvValue('right'),
      });
    };

    updateSafeArea();
    window.addEventListener('resize', updateSafeArea);
    window.addEventListener('orientationchange', updateSafeArea);

    return () => {
      window.removeEventListener('resize', updateSafeArea);
      window.removeEventListener('orientationchange', updateSafeArea);
    };
  }, []);

  return safeArea;
}

// Export all utilities
export {
  ResponsiveContainer as Container,
  ResponsiveGrid as Grid,
  ResponsiveText as Text,
  ResponsiveVisibility as Show,
  ResponsiveAspectRatio as AspectRatio,
};