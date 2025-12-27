'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { getLocale, type Locale } from '@/lib/getLocale'

interface LocaleContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
}

const LocaleContext = createContext<LocaleContextType>({
  locale: 'tr',
  setLocale: () => {},
})

export const useLocale = () => useContext(LocaleContext)

export const LocaleProvider = ({ children }: { children: React.ReactNode }) => {
  const [locale, setLocaleState] = useState<Locale>('tr')

  useEffect(() => {
    const savedLocale = getLocale()
    setLocaleState(savedLocale)
  }, [])

  const setLocale = (newLocale: Locale) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('locale', newLocale)
    }
    setLocaleState(newLocale)
    // Sayfayı yenile
    window.location.reload()
  }

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  )
}

