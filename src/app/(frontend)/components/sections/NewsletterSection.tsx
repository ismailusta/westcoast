'use client'

import React from 'react'
import { useLocale } from '../LocaleProvider'
import { getTranslation } from '@/lib/translations'

export const NewsletterSection = () => {
  const { locale } = useLocale()
  const t = getTranslation(locale)

  return (
    <section className="py-40 bg-white relative overflow-hidden border-t border-secondary/5">
      <div className="container mx-auto px-6 text-center relative z-10">
        <span className="text-primary text-[10px] uppercase tracking-[0.6em] mb-10 block font-bold">
          {t.newsletter.label}
        </span>
        <h2 className="text-5xl md:text-[5rem] text-secondary font-serif mb-16 max-w-4xl mx-auto leading-tight tracking-tight">
          {t.newsletter.title} <br /> 
          <span className="serif-italic text-primary">{t.newsletter.titleItalic}</span>
        </h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-0 max-w-2xl mx-auto border border-secondary/10 p-1">
          <input 
            type="email" 
            placeholder={t.newsletter.placeholder}
            className="w-full bg-transparent px-8 py-5 text-secondary text-sm focus:outline-none font-light placeholder:text-secondary/30"
          />
          <button className="w-full md:w-auto bg-secondary text-white px-12 py-5 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-primary transition-all duration-500 whitespace-nowrap">
            {t.newsletter.button}
          </button>
        </div>
      </div>
      
      {/* Subtle pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #C5A059 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
    </section>
  )
}

