import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['he', 'en'],
  defaultLocale: 'he',
  localePrefix: 'always'
});

export const config = {
  matcher: ['/', '/(he|en)/:path*']
};