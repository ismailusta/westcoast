'use client'

import React, { useState, useTransition, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { FlagIcon } from './FlagIcon'

const locales = [
  { code: 'tr' as const, label: 'TR', fullLabel: 'Türkçe' },
  { code: 'en' as const, label: 'EN', fullLabel: 'English' },
  { code: 'ru' as const, label: 'RU', fullLabel: 'Русский' },
  { code: 'de' as const, label: 'DE', fullLabel: 'Deutsch' },
]

export const LocaleSwitcher = () => {
  const router = useRouter()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [currentLocale, setCurrentLocale] = useState('tr')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('locale') || 'tr'
      setCurrentLocale(saved)
    }
  }, [])

  const changeLocale = async (locale: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('locale', locale)
      
      // Cookie'ye de kaydet
      document.cookie = `locale=${locale}; path=/; max-age=31536000`
    }
    setCurrentLocale(locale)
    setIsOpen(false)
    
    // Sayfayı yenile (locale değiştiğinde)
    startTransition(() => {
      router.refresh()
      // Kısa bir gecikme sonrası sayfayı tam yenile (server-side locale güncellemesi için)
      setTimeout(() => {
        window.location.reload()
      }, 100)
    })
  }

  const currentLocaleData = locales.find(l => l.code === currentLocale) || locales[0]

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3 py-2 text-[10px] uppercase tracking-wider font-semibold transition-all duration-300 hover:text-primary ${
          isOpen ? 'text-primary' : ''
        }`}
      >
        <FlagIcon code={currentLocaleData.code} size={18} className="rounded-sm overflow-hidden" />
        <span>{currentLocaleData.label}</span>
        <motion.svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <path d="M6 9l6 6 6-6" />
        </motion.svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div 
              className="fixed inset-0 z-40" 
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute right-0 top-full mt-2 z-50 bg-white border border-secondary/10 shadow-xl min-w-[140px]"
            >
              {locales.map((locale) => (
                <button
                  key={locale.code}
                  onClick={() => changeLocale(locale.code)}
                  className={`w-full text-left px-4 py-3 text-xs uppercase tracking-wider transition-all duration-200 ${
                    currentLocale === locale.code
                      ? 'bg-primary text-white font-bold'
                      : 'text-secondary hover:bg-accent hover:text-primary'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <FlagIcon code={locale.code} size={20} className="rounded-sm overflow-hidden" />
                      <span>{locale.fullLabel}</span>
                    </div>
                    {currentLocale === locale.code && (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    )}
                  </div>
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

