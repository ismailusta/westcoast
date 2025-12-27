'use client'

import React from 'react'
import { motion } from 'framer-motion'
import type { Media } from '@/payload-types'
import { useLocale } from '../LocaleProvider'
import { getTranslation } from '@/lib/translations'

interface ReviewImage {
  image: number | Media
  id?: string | null
}

interface Review {
  id: number
  guestName: string
  rating: number
  comment: string
  images?: ReviewImage[] | null
  createdAt: string
  isVerified?: boolean
}

interface ReviewsSectionProps {
  reviews: Review[]
}

export const ReviewsSection = ({ reviews }: ReviewsSectionProps) => {
  const { locale } = useLocale()
  const t = getTranslation(locale)

  if (reviews.length === 0) {
    return null
  }

  return (
    <section className="py-32 bg-[#F8F5F2]">
      <div className="container mx-auto px-6">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-6xl font-serif text-secondary mb-16 text-center"
        >
          {t.reviews?.sectionTitle || 'Misafir Değerlendirmeleri'}
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, index) => {
            const reviewImages = Array.isArray(review.images) 
              ? review.images
                  .map((item) => {
                    if (typeof item.image === 'object' && item.image !== null && 'url' in item.image) {
                      return item.image as Media
                    }
                    return null
                  })
                  .filter((img): img is Media => img !== null)
              : []

            return (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 border border-secondary/10 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-serif text-lg">
                      {review.guestName.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-serif text-lg text-secondary">{review.guestName}</h4>
                      {review.isVerified && (
                        <span className="text-primary text-xs" title="Doğrulanmış Misafir">✓</span>
                      )}
                    </div>
                    <div className="flex gap-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <span 
                          key={i} 
                          className={`text-sm ${i < review.rating ? 'text-primary' : 'text-secondary/20'}`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <p className="text-secondary/70 mb-4 leading-relaxed font-light">
                  {review.comment}
                </p>
                
                {reviewImages.length > 0 && (
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    {reviewImages.slice(0, 4).map((img, i) => (
                      <div key={i} className="aspect-square overflow-hidden bg-accent">
                        <img
                          src={img.url}
                          alt={`Review by ${review.guestName}`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                )}

                <p className="text-secondary/40 text-xs mt-4">
                  {new Date(review.createdAt).toLocaleDateString(locale === 'tr' ? 'tr-TR' : locale === 'en' ? 'en-US' : locale === 'ru' ? 'ru-RU' : 'de-DE', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

