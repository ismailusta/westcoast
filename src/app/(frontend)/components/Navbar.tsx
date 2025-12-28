'use client'

import React, { useState } from 'react'
import Link from 'next/link'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

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
              <a
                href="#anasayfa"
                className="text-slate-700 hover:text-slate-900 px-3 py-2 text-sm font-medium transition-colors"
              >
                Anasayfa
              </a>
              <a
                href="#odalar"
                className="text-slate-700 hover:text-slate-900 px-3 py-2 text-sm font-medium transition-colors"
              >
                Odalar
              </a>
              <a
                href="#hakkimizda"
                className="text-slate-700 hover:text-slate-900 px-3 py-2 text-sm font-medium transition-colors"
              >
                Hakkımızda
              </a>
              <a
                href="#restoran"
                className="text-slate-700 hover:text-slate-900 px-3 py-2 text-sm font-medium transition-colors"
              >
                Restoran
              </a>
              <a
                href="#iletisim"
                className="text-slate-700 hover:text-slate-900 px-3 py-2 text-sm font-medium transition-colors"
              >
                İletişim
              </a>
              <a
                href="#rezervasyon"
                className="bg-slate-800 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-slate-900 transition-colors"
              >
                Rezervasyon
              </a>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-700 hover:text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-slate-500"
              aria-expanded="false"
            >
              <span className="sr-only">Ana menüyü aç</span>
              {!isMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
            <a
              href="#anasayfa"
              className="text-slate-700 hover:text-slate-900 block px-3 py-2 text-base font-medium"
            >
              Anasayfa
            </a>
            <a
              href="#odalar"
              className="text-slate-700 hover:text-slate-900 block px-3 py-2 text-base font-medium"
            >
              Odalar
            </a>
            <a
              href="#hakkimizda"
              className="text-slate-700 hover:text-slate-900 block px-3 py-2 text-base font-medium"
            >
              Hakkımızda
            </a>
            <a
              href="#restoran"
              className="text-slate-700 hover:text-slate-900 block px-3 py-2 text-base font-medium"
            >
              Restoran
            </a>
            <a
              href="#iletisim"
              className="text-slate-700 hover:text-slate-900 block px-3 py-2 text-base font-medium"
            >
              İletişim
            </a>
            <a
              href="#rezervasyon"
              className="bg-slate-800 text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-slate-900"
            >
              Rezervasyon
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}





