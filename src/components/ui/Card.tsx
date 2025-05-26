import { forwardRef, HTMLAttributes } from 'react';

// Base Card Component
interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const Card = forwardRef<HTMLDivElement, CardProps>(({
  children,
  hover = false,
  padding = 'md',
  className = '',
  ...props
}, ref) => {
  const paddingStyles = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const cardStyles = [
    'rounded-lg border bg-card text-card-foreground shadow-sm',
    hover ? 'hover:shadow-md transition-shadow duration-200' : '',
    paddingStyles[padding],
    className
  ].filter(Boolean).join(' ');

  return (
    <div ref={ref} className={cardStyles} {...props}>
      {children}
    </div>
  );
});

Card.displayName = 'Card';

// Card Header Component
interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(({
  children,
  className = '',
  ...props
}, ref) => {
  return (
    <div 
      ref={ref} 
      className={`flex flex-col space-y-1.5 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
});

CardHeader.displayName = 'CardHeader';

// Card Title Component
interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(({
  children,
  as: Component = 'h3',
  className = '',
  ...props
}, ref) => {
  return (
    <Component 
      ref={ref}
      className={`font-semibold leading-none tracking-tight ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
});

CardTitle.displayName = 'CardTitle';

// Card Description Component
interface CardDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}

const CardDescription = forwardRef<HTMLParagraphElement, CardDescriptionProps>(({
  children,
  className = '',
  ...props
}, ref) => {
  return (
    <p 
      ref={ref}
      className={`text-sm text-muted-foreground ${className}`}
      {...props}
    >
      {children}
    </p>
  );
});

CardDescription.displayName = 'CardDescription';

// Card Content Component
interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const CardContent = forwardRef<HTMLDivElement, CardContentProps>(({
  children,
  className = '',
  ...props
}, ref) => {
  return (
    <div 
      ref={ref}
      className={`pt-0 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
});

CardContent.displayName = 'CardContent';

// Card Footer Component
interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(({
  children,
  className = '',
  ...props
}, ref) => {
  return (
    <div 
      ref={ref}
      className={`flex items-center pt-0 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
});

CardFooter.displayName = 'CardFooter';

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
};

// Pre-built product card variants
export interface ProductCardProps extends CardProps {
  locale?: 'he' | 'en';
}

export const ProductCard = forwardRef<HTMLDivElement, ProductCardProps>(({
  children,
  locale = 'he',
  className = '',
  ...props
}, ref) => {
  const isRTL = locale === 'he';
  
  return (
    <Card
      ref={ref}
      hover
      padding="none"
      className={`cursor-pointer group overflow-hidden ${className}`}
      dir={isRTL ? 'rtl' : 'ltr'}
      {...props}
    >
      {children}
    </Card>
  );
});

ProductCard.displayName = 'ProductCard';

// Image container for product cards
export const ProductCardImage = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({
  children,
  className = '',
  ...props
}, ref) => {
  return (
    <div 
      ref={ref}
      className={`aspect-square overflow-hidden bg-muted ${className}`}
      {...props}
    >
      {children}
    </div>
  );
});

ProductCardImage.displayName = 'ProductCardImage';

// Info section for product cards
export const ProductCardInfo = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({
  children,
  className = '',
  ...props
}, ref) => {
  return (
    <div 
      ref={ref}
      className={`p-4 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
});

ProductCardInfo.displayName = 'ProductCardInfo';

// Specialized cards for different content types
export const ReviewCard = forwardRef<HTMLDivElement, ProductCardProps>(({
  children,
  locale = 'he',
  className = '',
  ...props
}, ref) => {
  return (
    <Card
      ref={ref}
      hover
      className={`group ${className}`}
      dir={locale === 'he' ? 'rtl' : 'ltr'}
      {...props}
    >
      {children}
    </Card>
  );
});

ReviewCard.displayName = 'ReviewCard';

export const GuideCard = forwardRef<HTMLDivElement, ProductCardProps>(({
  children,
  locale = 'he',
  className = '',
  ...props
}, ref) => {
  return (
    <Card
      ref={ref}
      hover
      className={`border-l-4 border-l-primary ${className}`}
      dir={locale === 'he' ? 'rtl' : 'ltr'}
      {...props}
    >
      {children}
    </Card>
  );
});

GuideCard.displayName = 'GuideCard';

export const DealCard = forwardRef<HTMLDivElement, ProductCardProps>(({
  children,
  locale = 'he',
  className = '',
  ...props
}, ref) => {
  return (
    <Card
      ref={ref}
      hover
      className={`border-affiliate bg-affiliate/5 ${className}`}
      dir={locale === 'he' ? 'rtl' : 'ltr'}
      {...props}
    >
      {children}
    </Card>
  );
});

DealCard.displayName = 'DealCard';