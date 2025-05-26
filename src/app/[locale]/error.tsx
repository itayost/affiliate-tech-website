// src/app/[locale]/error.tsx
'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Button from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const params = useParams();
  const locale = params.locale as 'he' | 'en' || 'he';
  const isRTL = locale === 'he';

  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error);
  }, [error]);

  const content = {
    he: {
      title: 'אופס! משהו השתבש',
      description: 'מצטערים, נתקלנו בבעיה לא צפויה. אנא נסו שוב או חזרו לעמוד הבית.',
      tryAgain: 'נסה שוב',
      goHome: 'חזור לעמוד הבית',
      errorCode: 'קוד שגיאה',
      whatToDo: 'מה אפשר לעשות?',
      suggestions: [
        'נסו לרענן את העמוד',
        'בדקו את חיבור האינטרנט',
        'נסו שוב בעוד מספר דקות',
        'אם הבעיה נמשכת, צרו איתנו קשר'
      ]
    },
    en: {
      title: 'Oops! Something went wrong',
      description: 'Sorry, we encountered an unexpected problem. Please try again or return to the homepage.',
      tryAgain: 'Try Again',
      goHome: 'Go to Homepage',
      errorCode: 'Error Code',
      whatToDo: 'What can you do?',
      suggestions: [
        'Try refreshing the page',
        'Check your internet connection',
        'Try again in a few minutes',
        'If the problem persists, contact us'
      ]
    }
  };

  const text = content[locale];

  return (
    <div 
      className="min-h-screen flex items-center justify-center px-4 py-16 bg-muted/30"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <Card className="max-w-lg w-full">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mb-4">
            <AlertTriangle className="h-8 w-8 text-destructive" />
          </div>
          <CardTitle className="text-2xl">{text.title}</CardTitle>
          <CardDescription className="text-base mt-2">
            {text.description}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Error details (development only) */}
          {process.env.NODE_ENV === 'development' && error.digest && (
            <div className="p-3 bg-muted rounded-md text-sm font-mono">
              <span className="text-muted-foreground">{text.errorCode}: </span>
              <span>{error.digest}</span>
            </div>
          )}

          {/* Suggestions */}
          <div>
            <h3 className="font-medium mb-3">{text.whatToDo}</h3>
            <ul className={`space-y-2 text-sm text-muted-foreground ${isRTL ? 'pr-5' : 'pl-5'}`}>
              {text.suggestions.map((suggestion, index) => (
                <li key={index} className="list-disc">
                  {suggestion}
                </li>
              ))}
            </ul>
          </div>

          {/* Action buttons */}
          <div className={`flex gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Button
              onClick={reset}
              className="flex-1 gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              {text.tryAgain}
            </Button>
            
            <Link href={`/${locale}`} className="flex-1">
              <Button
                variant="outline"
                className="w-full gap-2"
              >
                <Home className="h-4 w-4" />
                {text.goHome}
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}