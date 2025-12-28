'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useLocale } from '../LocaleProvider'
import { getTranslation } from '@/lib/translations'

export const AboutPageContent = () => {
  const { locale } = useLocale()
  const t = getTranslation(locale)

  return (
    <section className="pt-32 pb-24">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mb-20 text-center">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary text-xs uppercase tracking-[0.5em] mb-4 block"
          >
            {t.about.label}
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl text-secondary leading-tight mb-6"
          >
            {t.about.title} <br />
            <span className="serif-italic text-primary">{t.about.titleItalic}</span>
          </motion.h1>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center mb-24">
          <div className="lg:col-span-6 relative">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2 }}
              viewport={{ once: true }}
              className="relative z-10 aspect-[4/5] overflow-hidden shadow-3xl"
            >
              <img 
                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=2070" 
                alt="Luxury Hotel Architecture" 
                className="w-full h-full object-cover"
              />
            </motion.div>
            
            {/* Floating Decorative Branding */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              viewport={{ once: true }}
              className="absolute -bottom-12 -right-12 z-20 bg-secondary p-12 hidden md:block border border-primary/20"
            >
              <div className="text-white">
                <span className="text-primary text-[10px] uppercase tracking-[0.5em] block mb-4 font-bold">
                  {locale === 'tr' ? 'Kuruluş' : locale === 'en' ? 'Established' : locale === 'ru' ? 'Основан' : 'Gegründet'}
                </span>
                <span className="text-7xl font-serif block leading-none tracking-tighter">{t.about.experience}</span> 
                <span className="text-[9px] uppercase tracking-[0.3em] font-medium opacity-40 block mt-4">
                  {t.about.experienceLabel}
                </span>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-6 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <p className="text-secondary/70 text-lg leading-relaxed mb-6">
                {t.about.description1}
              </p>
              <p className="text-secondary/70 text-lg leading-relaxed">
                {t.about.description2}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="pt-8 border-t border-secondary/10"
            >
              <div className="mb-4">
                <span className="text-primary text-xs uppercase tracking-[0.3em] font-bold block mb-2">
                  {locale === 'tr' ? 'Kurucu' : locale === 'en' ? 'Founder' : locale === 'ru' ? 'Основатель' : 'Gründer'}
                </span>
                <span className="text-2xl font-serif text-secondary">{t.about.founder}</span>
              </div>
              <span className="text-secondary/50 text-sm uppercase tracking-wider">
                {t.about.founderTitle}
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

