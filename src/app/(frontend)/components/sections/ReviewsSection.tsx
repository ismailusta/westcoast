'use client'

import React, { useRef, useCallback } from 'react'
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
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const autoScrollIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const isUserScrollingRef = useRef(false)

  const startAutoScroll = useCallback(() => {
    if (autoScrollIntervalRef.current) {
      clearInterval(autoScrollIntervalRef.current)
    }
    
    autoScrollIntervalRef.current = setInterval(() => {
      if (!isUserScrollingRef.current && scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
        const isAtEnd = scrollLeft >= scrollWidth - clientWidth - 10
        
        if (isAtEnd) {
          // Sona geldiysek başa dön
          scrollContainerRef.current.scrollTo({
            left: 0,
            behavior: 'smooth'
          })
        } else {
          const scrollAmount = clientWidth
          scrollContainerRef.current.scrollTo({
            left: scrollLeft + scrollAmount,
            behavior: 'smooth'
          })
        }
      }
    }, 5000) // 5 saniye
  }, [])

  // useEffect her zaman en üstte olmalı - early return'den önce
  React.useEffect(() => {
    if (reviews.length === 0) return

    const container = scrollContainerRef.current
    if (container) {
      const handleScroll = () => {
        isUserScrollingRef.current = true
        if (autoScrollIntervalRef.current) {
          clearInterval(autoScrollIntervalRef.current)
          autoScrollIntervalRef.current = null
        }
        setTimeout(() => {
          isUserScrollingRef.current = false
          startAutoScroll()
        }, 6000)
      }
      
      container.addEventListener('scroll', handleScroll)
      
      // Otomatik scroll'u başlat
      startAutoScroll()
      
      return () => {
        container.removeEventListener('scroll', handleScroll)
        if (autoScrollIntervalRef.current) {
          clearInterval(autoScrollIntervalRef.current)
        }
      }
    }
  }, [reviews, startAutoScroll])

  // Early return useEffect'ten sonra olmalı
  if (reviews.length === 0) {
    return null
  }

  return (
    <section id="reviews" className="py-32 bg-[#F8F5F2]">
      <div className="container mx-auto px-6">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-6xl font-serif text-secondary mb-16 text-center"
        >
          {t.reviews?.sectionTitle || 'Değerlendirmeler'}
        </motion.h2>
        
        {/* Scrollable Carousel Container */}
        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="overflow-x-auto scrollbar-hide scroll-smooth"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            <div className="flex gap-8 pb-8">
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
                    className="flex-shrink-0 w-[90vw] sm:w-[90vw] lg:w-[calc(33.333%-1.33rem)] max-w-none"
                  >
                    <div className="bg-white p-8 border border-secondary/10 hover:shadow-lg transition-shadow h-full">
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
                            img.url && (
                              <div key={i} className="aspect-square overflow-hidden bg-accent">
                                <img
                                  src={img.url}
                                  alt={`Review by ${review.guestName}`}
                                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                />
                              </div>
                            )
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
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

