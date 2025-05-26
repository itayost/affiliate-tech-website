import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'

const locales = ['he', 'en']

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  
  if (!locales.includes(locale as any)) {
    notFound()
  }

  const messages = await getMessages()
  const direction = locale === 'he' ? 'rtl' : 'ltr'

  return (
    <NextIntlClientProvider messages={messages}>
      <div dir={direction} lang={locale}>
        {children}
      </div>
    </NextIntlClientProvider>
  )
}