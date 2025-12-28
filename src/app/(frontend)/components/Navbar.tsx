'use client'

import React, { useState } from 'react'
import Link from 'next/link'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Linkleri bir diziye alarak kod tekrarını önleyelim
  const navLinks = [
    { name: 'Anasayfa', href: '#anasayfa' },
    { name: 'Odalar', href: '#odalar' },
    { name: 'Hakkımızda', href: '#hakkimizda' },
    { name: 'Restoran', href: '#restoran' },
    { name: 'İletişim', href: '#iletisim' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-slate-800">
              Otel Adı
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-slate-700 hover:text-slate-900 px-3 py-2 text-sm font-medium transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="#rezervasyon"
                className="bg-slate-800 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-slate-900 transition-colors"
              >
                Rezervasyon
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-700 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
            >
              <span className="sr-only">Ana menüyü aç</span>
              <svg
                className="block h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMenuOpen(false)} // Linke tıklayınca menüyü kapat
                className="text-slate-700 hover:text-slate-900 block px-3 py-2 text-base font-medium"
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="#rezervasyon"
              onClick={() => setIsMenuOpen(false)}
              className="bg-slate-800 text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-slate-900"
            >
              Rezervasyon
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}