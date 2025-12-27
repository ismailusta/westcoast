export type Locale = 'tr' | 'en' | 'ru' | 'de'

export const locales: Locale[] = ['tr', 'en', 'ru', 'de']

export const defaultLocale: Locale = 'tr'

export function getLocale(): Locale {
  if (typeof window === 'undefined') {
    return defaultLocale
  }
  
  const saved = localStorage.getItem('locale') as Locale
  if (saved && locales.includes(saved)) {
    return saved
  }
  
  // Browser diline göre otomatik seçim
  const browserLang = navigator.language.split('-')[0]
  if (browserLang === 'tr') return 'tr'
  if (browserLang === 'en') return 'en'
  if (browserLang === 'ru') return 'ru'
  if (browserLang === 'de') return 'de'
  
  return defaultLocale
}

