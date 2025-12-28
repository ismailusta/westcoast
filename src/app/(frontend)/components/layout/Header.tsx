'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { LocaleSwitcher } from '../ui/LocaleSwitcher'

const navItems = {
  tr: [
    { label: 'Otelimiz', href: '#about' },
    { label: 'Odalar', href: '#rooms' },
    { label: 'Deneyimler', href: '#reviews' },
    { label: 'İletişim', href: '#contact' },
  ],
  en: [
    { label: 'Our Hotel', href: '#about' },
    { label: 'Rooms', href: '#rooms' },
    { label: 'Experiences', href: '#reviews' },
    { label: 'Contact', href: '#contact' },
  ],
  ru: [
    { label: 'Отель', href: '#about' },
    { label: 'Номера', href: '#rooms' },
    { label: 'Услуги', href: '#reviews' },
    { label: 'Контакты', href: '#contact' },
  ],
  de: [
    { label: 'Unser Hotel', href: '#about' },
    { label: 'Zimmer', href: '#rooms' },
    { label: 'Erlebnisse', href: '#reviews' },
    { label: 'Kontakt', href: '#contact' },
  ],
}

export const Header = () => {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [currentLocale, setCurrentLocale] = useState('tr')

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    
    // Locale'i localStorage'dan al
    const savedLocale = localStorage.getItem('locale') || 'tr'
    setCurrentLocale(savedLocale)
    
    // Locale değişikliklerini dinle
    const handleStorageChange = () => {
      const newLocale = localStorage.getItem('locale') || 'tr'
      setCurrentLocale(newLocale)
    }
    window.addEventListener('storage', handleStorageChange)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  const currentNavItems = navItems[currentLocale as keyof typeof navItems] || navItems.tr
  
  // Eğer anasayfadaysa anchor linkler, değilse ana sayfaya yönlendirip anchor'a git
  const getNavHref = (anchor: string) => {
    if (pathname === '/') {
      return anchor // Anasayfadayken direkt anchor (#about, #rooms, vb.)
    }
    return `/${anchor}` // Diğer sayfalardayken ana sayfaya yönlendirip anchor'a git (/#about, /#rooms, vb.)
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'glass-light py-4 shadow-sm' : 'bg-transparent py-8'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="group relative">
          <span className={`text-2xl font-serif tracking-[0.2em] transition-colors duration-300 ${
            isScrolled ? 'text-secondary' : 'text-white'
          }`}>
            WESTCOAST
          </span>
          <span className={`block text-[10px] uppercase tracking-[0.5em] transition-colors duration-300 ${
            isScrolled ? 'text-primary' : 'text-primary/80'
          }`}>
            Grand Hotel
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-12">
          {currentNavItems.map((item) => {
            const href = getNavHref(item.href)
            return (
              <Link
                key={item.label}
                href={href}
                className={`text-[10px] uppercase tracking-[0.3em] font-medium transition-colors duration-300 hover:text-primary ${
                  isScrolled ? 'text-secondary' : 'text-white'
                }`}
              >
                {item.label}
              </Link>
            )
          })}
          
          <div className={`w-px h-6 mx-2 transition-colors ${isScrolled ? 'bg-secondary/10' : 'bg-white/20'}`} />
          
          <LocaleSwitcher />
          
          <button className={`transition-colors hover:text-primary ${
            isScrolled ? 'text-secondary' : 'text-white'
          }`}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
          </button>
        </nav>

        <button 
          onClick={() => setMobileMenuOpen(true)}
          className="md:hidden flex flex-col gap-1.5 p-2"
        >
          <span className={`w-6 h-0.5 transition-colors ${isScrolled ? 'bg-secondary' : 'bg-white'}`} />
          <span className={`w-6 h-0.5 transition-colors ${isScrolled ? 'bg-secondary' : 'bg-white'}`} />
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-secondary z-[60] flex flex-col p-12"
          >
            <button 
              onClick={() => setMobileMenuOpen(false)}
              className="self-end text-white text-4xl font-light mb-12"
            >
              ×
            </button>
            <div className="flex flex-col gap-8">
              {currentNavItems.map((item) => {
                const href = getNavHref(item.href)
                return (
                  <Link
                    key={item.label}
                    href={href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-white text-3xl font-serif hover:text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                )
              })}
              <div className="pt-4 border-t border-white/10">
                <LocaleSwitcher />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
