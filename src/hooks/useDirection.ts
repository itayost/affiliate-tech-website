'use client'

import { useParams } from 'next/navigation'
import { useMemo } from 'react'

export type Direction = 'rtl' | 'ltr'
export type Locale = 'he' | 'en'

export function useDirection() {
  const params = useParams()
  const locale = params.locale as Locale
  
  const direction: Direction = useMemo(() => {
    return locale === 'he' ? 'rtl' : 'ltr'
  }, [locale])
  
  const isRTL = direction === 'rtl'
  const isLTR = direction === 'ltr'
  const isHebrew = locale === 'he'
  const isEnglish = locale === 'en'
  
  // Helper functions for conditional classes
  const rtlClass = (rtlClass: string, ltrClass: string = '') => {
    return isRTL ? rtlClass : ltrClass
  }
  
  const ltrClass = (ltrClass: string, rtlClass: string = '') => {
    return isLTR ? ltrClass : rtlClass
  }
  
  // Helper for spacing classes
  const spaceClass = (base: string) => {
    if (base.includes('space-x-')) {
      return isRTL ? `${base} space-x-reverse` : base
    }
    return base
  }
  
  // Helper for margin classes
  const marginClass = (left: string, right: string) => {
    return isRTL ? right : left
  }
  
  // Helper for positioning classes
  const positionClass = (left: string, right: string) => {
    return isRTL ? right : left
  }
  
  return {
    direction,
    locale,
    isRTL,
    isLTR,
    isHebrew,
    isEnglish,
    rtlClass,
    ltrClass,
    spaceClass,
    marginClass,
    positionClass,
  }
}