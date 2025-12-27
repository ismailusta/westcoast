'use client'

import React from 'react'
import Link from 'next/link'
import { useLocale } from '../LocaleProvider'
import { getTranslation } from '@/lib/translations'

export const Footer = () => {
  const { locale } = useLocale()
  const t = getTranslation(locale)
  return (
    <footer className="bg-secondary text-white py-24">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
          
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="group inline-block mb-8">
              <span className="text-3xl font-serif tracking-widest block">WESTCOAST</span>
              <span className="text-[10px] uppercase tracking-[0.4em] text-primary">Grand Hotel</span>
            </Link>
            <p className="text-white/40 max-w-sm text-sm leading-relaxed font-light">
              {t.footer.description}
            </p>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.3em] font-bold text-primary mb-8">{t.footer.quickLinks}</h4>
            <ul className="space-y-4">
              {[
                t.footer.links.about,
                t.footer.links.rooms,
                t.footer.links.restaurant,
                t.footer.links.spa,
                t.footer.links.contact,
              ].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-sm text-white/60 hover:text-white transition-colors font-light">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.3em] font-bold text-primary mb-8">{t.footer.contact}</h4>
            <ul className="space-y-4 text-sm text-white/60 font-light">
              <li>123 Luxury Ave, Ocean View</li>
              <li>+90 (212) 555 0100</li>
              <li>hello@westcoasthotel.com</li>
            </ul>
            <div className="flex gap-6 mt-8">
              {['Instagram', 'Facebook', 'LinkedIn'].map((social) => (
                <Link key={social} href="#" className="text-[10px] uppercase tracking-widest text-white/40 hover:text-primary transition-colors">
                  {social}
                </Link>
              ))}
            </div>
          </div>

        </div>

        <div className="mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/20 text-[10px] uppercase tracking-[0.2em]">
            {t.footer.copyright}
          </p>
          <div className="flex gap-8">
            <Link href="#" className="text-white/20 text-[10px] uppercase tracking-[0.2em] hover:text-white transition-colors">{t.footer.kvkk}</Link>
            <Link href="#" className="text-white/20 text-[10px] uppercase tracking-[0.2em] hover:text-white transition-colors">{t.footer.cookie}</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

