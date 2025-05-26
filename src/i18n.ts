import {getRequestConfig} from 'next-intl/server';

export const locales = ['he', 'en'] as const;
export const defaultLocale = 'he' as const;

export default getRequestConfig(async ({locale}) => {
  console.log('🎯 i18n loading for locale:', locale);
  
  // תיקון: אם locale הוא undefined, השתמש בdefault
  const validLocale = locale || defaultLocale;
  
  // וודא שה-locale תקין
  if (!locales.includes(validLocale as any)) {
    console.warn(`Invalid locale: ${validLocale}, using default: ${defaultLocale}`);
    const finalLocale = defaultLocale;
    
    return {
      locale: finalLocale,
      messages: {
        Navigation: {
          home: finalLocale === 'he' ? 'בית' : 'Home',
          categories: finalLocale === 'he' ? 'קטגוריות' : 'Categories',
          reviews: finalLocale === 'he' ? 'סקירות' : 'Reviews'
        },
        Common: {
          loading: finalLocale === 'he' ? 'טוען...' : 'Loading...',
          search: finalLocale === 'he' ? 'חיפוש' : 'Search',
          language: finalLocale === 'he' ? 'עברית' : 'English'
        },
        HomePage: {
          title: finalLocale === 'he' ? 'ברוכים הבאים ל-TechReviews' : 'Welcome to TechReviews',
          subtitle: finalLocale === 'he' ? 'סקירות מקצועיות של מוצרי טכנולוגיה' : 'Professional technology product reviews'
        }
      },
      timeZone: 'Asia/Jerusalem'
    };
  }
  
  return {
    locale: validLocale,
    messages: {
      Navigation: {
        home: validLocale === 'he' ? 'בית' : 'Home',
        categories: validLocale === 'he' ? 'קטגוריות' : 'Categories',
        reviews: validLocale === 'he' ? 'סקירות' : 'Reviews'
      },
      Common: {
        loading: validLocale === 'he' ? 'טוען...' : 'Loading...',
        search: validLocale === 'he' ? 'חיפוש' : 'Search',
        language: validLocale === 'he' ? 'עברית' : 'English'
      },
      HomePage: {
        title: validLocale === 'he' ? 'ברוכים הבאים ל-TechReviews' : 'Welcome to TechReviews',
        subtitle: validLocale === 'he' ? 'סקירות מקצועיות של מוצרי טכנולוגיה' : 'Professional technology product reviews'
      }
    },
    timeZone: 'Asia/Jerusalem'
  };
});