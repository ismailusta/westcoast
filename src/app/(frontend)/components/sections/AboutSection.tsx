'use client'

import React from 'react'
import Image from 'next/image' // Next.js Image bileşeni zaten import edilmiş
import { motion } from 'framer-motion'
import { useLocale } from '../LocaleProvider'
import { getTranslation } from '@/lib/translations'

export const AboutSection = () => {
  const { locale } = useLocale()
  const t = getTranslation(locale)
  
  return (
    <section id="about" className="py-40 overflow-hidden bg-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
          
          <div className="lg:col-span-6 relative">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2 }}
              viewport={{ once: true }}
              className="relative z-10 aspect-[4/5] overflow-hidden shadow-3xl"
            >
              {/* 1. Hata Çözümü: <img> yerine Next.js <Image /> kullanımı. 
                Zaten <Image /> kullanmışsın ama muhtemelen başka bir yerde 
                <img> etiketi kalmış olabilir veya build sırasında bir uyarı tetiklenmiş.
              */}
              <Image 
                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=2070" 
                alt="Luxury Hotel Architecture" 
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority // LCP performans uyarısı için eklendi
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

            {/* Background Texture */}
            <div className="absolute -top-16 -left-16 w-80 h-80 opacity-5 -z-10" style={{ backgroundImage: 'radial-gradient(#C5A059 1.5px, transparent 1.5px)', backgroundSize: '30px 30px' }} />
          </div>

          <div className="lg:col-span-5 lg:offset-1">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <span className="text-primary text-[10px] uppercase tracking-[0.6em] mb-8 block font-bold">{t.about.label}</span>
              <h2 className="text-5xl md:text-7xl text-secondary mb-10 leading-[1.1] tracking-tight">
                {t.about.title} <br /> 
                <span className="serif-italic text-primary font-light">{t.about.titleItalic}</span>
              </h2>
              
              <div className="space-y-8 text-secondary/70 leading-relaxed font-light text-lg">
                <p>
                  {t.about.description1}
                </p>
                {/* 2. Hata Çözümü: React içinde düz tırnak (") kullanılamaz. 
                  Bunun yerine &ldquo; (açılış) ve &rdquo; (kapanış) kullanmalısın.
                */}
                <p className="font-serif italic text-primary/80 border-l-2 border-primary/20 pl-6 py-2">
                  &ldquo;{t.about.description2.split('.')[0]}.&rdquo;
                </p>
              </div>

              <div className="mt-16 flex items-center gap-10">
                <div className="flex flex-col gap-1">
                  <span className="text-secondary font-serif text-2xl tracking-wide">{t.about.founder}</span>
                  <span className="text-[9px] uppercase tracking-widest text-primary font-bold">{t.about.founderTitle}</span>
                </div>
                <div className="h-px flex-1 bg-secondary/5" />
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full border border-secondary/10 flex items-center justify-center text-secondary/30 text-xs">01</div>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}