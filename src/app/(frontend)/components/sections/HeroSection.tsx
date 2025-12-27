'use client'

import React from 'react'
import { motion } from 'framer-motion'
import type { Media } from '@/payload-types'
import { useLocale } from '../LocaleProvider'
import { getTranslation } from '@/lib/translations'

interface HeroProps {
  images?: Media[]
}

export const HeroSection = ({ images }: HeroProps) => {
  const { locale } = useLocale()
  const t = getTranslation(locale)
  const heroImage = images?.[0]?.url || 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=2070'

  return (
    <section className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center">
      {/* Background with parallax effect */}
      <motion.div 
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-black/30 z-10" />
        <img
          src={heroImage}
          alt="Luxury Hotel Hero"
          className="w-full h-full object-cover"
        />
      </motion.div>

      <div className="container mx-auto px-6 relative z-20 text-center mb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <span className="text-primary text-[10px] uppercase tracking-[0.6em] mb-8 block font-semibold">
            {t.hero.subtitle}
          </span>
          <h1 className="text-white text-6xl md:text-[6.5rem] font-serif mb-8 leading-[1.1] tracking-tight">
            {t.hero.title} <br /> 
            <span className="serif-italic">{t.hero.titleItalic}</span>
          </h1>
        </motion.div>
      </div>

      {/* Integrated Booking Bar - Bottom of Hero */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-0 left-0 w-full z-30 px-6 pb-12"
      >
        <div className="max-w-6xl mx-auto glass-dark-gold p-2 rounded-sm shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-4 items-center">
            
            <div className="p-6 border-r border-white/5 flex flex-col gap-1">
              <span className="text-[9px] uppercase tracking-widest text-primary font-bold">{t.hero.checkIn}</span>
              <span className="text-white/90 text-sm font-light uppercase tracking-tighter">{t.hero.dateExample}</span>
            </div>
            
            <div className="p-6 border-r border-white/5 flex flex-col gap-1">
              <span className="text-[9px] uppercase tracking-widest text-primary font-bold">{t.hero.checkOut}</span>
              <span className="text-white/90 text-sm font-light uppercase tracking-tighter">{t.hero.dateExample}</span>
            </div>
            
            <div className="p-6 border-r border-white/5 flex flex-col gap-1">
              <span className="text-[9px] uppercase tracking-widest text-primary font-bold">{t.hero.guests}</span>
              <span className="text-white/90 text-sm font-light uppercase tracking-tighter">{t.hero.guestsExample}</span>
            </div>
            
            <div className="p-4">
              <button className="w-full bg-primary hover:bg-white text-secondary py-5 text-[11px] uppercase tracking-[0.3em] font-bold transition-all duration-500 shadow-lg">
                {t.hero.availability}
              </button>
            </div>

          </div>
        </div>
      </motion.div>

      {/* Decorative Elements */}
      <div className="absolute right-10 top-1/2 -translate-y-1/2 hidden lg:block z-20">
        <span className="text-white/20 text-[9px] uppercase tracking-[0.5em] [writing-mode:vertical-lr]">
          WestCoast — Grand Hotel
        </span>
      </div>
    </section>
  )
}
