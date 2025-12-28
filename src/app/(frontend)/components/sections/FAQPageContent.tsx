'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Faq } from '@/payload-types'
import { useLocale } from '../LocaleProvider'
import { getTranslation } from '@/lib/translations'
import { lexicalToHtml } from '@/lib/lexicalToHtml'

interface FAQPageContentProps {
  faqs: Faq[]
}

export const FAQPageContent = ({ faqs }: FAQPageContentProps) => {
  const { locale } = useLocale()
  const t = getTranslation(locale)
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  // FAQ'ları kategoriye göre grupla
  const groupedFAQs = faqs.reduce((acc, faq) => {
    const category = faq.category || 'general'
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(faq)
    return acc
  }, {} as Record<string, Faq[]>)

  // Kategori sıralaması
  const categoryOrder = ['general', 'rooms', 'reservation', 'services', 'contact']
  
  // Kategorileri sıralı şekilde al
  const sortedCategories = Object.keys(groupedFAQs).sort((a, b) => {
    const indexA = categoryOrder.indexOf(a)
    const indexB = categoryOrder.indexOf(b)
    // Eğer kategori sıralamada yoksa en sona koy
    if (indexA === -1) return 1
    if (indexB === -1) return -1
    return indexA - indexB
  })

  const categoryLabels: Record<string, Record<string, string>> = {
    general: {
      tr: 'Genel',
      en: 'General',
      ru: 'Общие',
      de: 'Allgemein',
    },
    reservation: {
      tr: 'Rezervasyon',
      en: 'Reservation',
      ru: 'Бронирование',
      de: 'Reservierung',
    },
    rooms: {
      tr: 'Odalar',
      en: 'Rooms',
      ru: 'Номера',
      de: 'Zimmer',
    },
    services: {
      tr: 'Hizmetler',
      en: 'Services',
      ru: 'Услуги',
      de: 'Dienstleistungen',
    },
    contact: {
      tr: 'İletişim',
      en: 'Contact',
      ru: 'Контакты',
      de: 'Kontakt',
    },
  }

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
            {locale === 'tr' ? 'Sıkça Sorulan Sorular' : locale === 'en' ? 'Frequently Asked Questions' : locale === 'ru' ? 'Часто задаваемые вопросы' : 'Häufig gestellte Fragen'}
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl text-secondary leading-tight mb-6"
          >
            {locale === 'tr' ? 'Sıkça Sorulan' : locale === 'en' ? 'Frequently Asked' : locale === 'ru' ? 'Часто задаваемые' : 'Häufig gestellte'} <br />
            <span className="serif-italic text-primary">
              {locale === 'tr' ? 'Sorular' : locale === 'en' ? 'Questions' : locale === 'ru' ? 'вопросы' : 'Fragen'}
            </span>
          </motion.h1>
        </div>

        {/* FAQ Categories */}
        {sortedCategories.length > 0 ? (
          <div className="space-y-16">
            {sortedCategories.map((category, categoryIndex) => {
              const categoryFAQs = groupedFAQs[category]
              return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: categoryIndex * 0.1 }}
              >
                <h2 className="text-3xl font-serif text-secondary mb-8 pb-4 border-b border-secondary/10">
                  {categoryLabels[category]?.[locale] || category}
                </h2>
                
                <div className="space-y-4">
                  {categoryFAQs.map((faq, index) => {
                    const globalIndex = faqs.indexOf(faq)
                    const isOpen = openIndex === globalIndex
                    
                    return (
                      <div
                        key={faq.id}
                        className="bg-white border border-secondary/10 overflow-hidden"
                      >
                        <button
                          onClick={() => setOpenIndex(isOpen ? null : globalIndex)}
                          className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-secondary/5 transition-colors"
                        >
                          <span className="text-lg font-serif text-secondary pr-8">
                            {faq.question}
                          </span>
                          <motion.div
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                            className="flex-shrink-0"
                          >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
                              <path d="M6 9l6 6 6-6" />
                            </svg>
                          </motion.div>
                        </button>
                        
                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div 
                                className="px-6 py-5 border-t border-secondary/10 text-secondary/70 leading-relaxed prose prose-sm max-w-none"
                                dangerouslySetInnerHTML={{ 
                                  __html: typeof faq.answer === 'string' 
                                    ? faq.answer 
                                    : lexicalToHtml(faq.answer) 
                                }} 
                              />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )
                  })}
                </div>
              </motion.div>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-24">
            <p className="text-secondary/50 text-lg">
              {locale === 'tr' ? 'Henüz soru bulunmamaktadır.' : locale === 'en' ? 'No questions yet.' : locale === 'ru' ? 'Пока нет вопросов.' : 'Noch keine Fragen.'}
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

