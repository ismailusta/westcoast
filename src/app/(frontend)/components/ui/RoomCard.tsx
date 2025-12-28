'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import type { Media } from '@/payload-types'
import { AmenityIcon } from './AmenityIcon'
import { useLocale } from '../LocaleProvider'
import { getTranslation } from '@/lib/translations'

interface RoomCardProps {
  title: string
  description: string
  price: number
  slug?: string
  location?: string
  capacity_adults?: number
  capacity_children?: number
  image?: Media
  gallery?: Media[]
  features: Array<{ title: string; icon?: string | null }> | string[]
  reviews?: any[]
}

export const RoomCard = ({ 
  title, 
  description, 
  price,
  slug,
  location,
  capacity_adults,
  capacity_children,
  image, 
  gallery = [],
  features,
  reviews = []
}: RoomCardProps) => {
  const { locale } = useLocale()
  const t = getTranslation(locale)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const allImages = image ? [image, ...gallery] : gallery
  const hasMultipleImages = allImages.length > 1
  const averageRating = reviews.length > 0
    ? reviews.reduce((sum, review) => sum + (review.rating || 0), 0) / reviews.length
    : 0

  const cardContent = (
    <>
      <div className="relative aspect-[4/5] overflow-hidden mb-6 bg-accent">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImageIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            src={allImages[currentImageIndex]?.url || '/room-placeholder.jpg'}
            alt={title}
            className="w-full h-full object-cover"
          />
        </AnimatePresence>
        
        {/* Image Navigation Dots */}
        {hasMultipleImages && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {allImages.slice(0, 5).map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation()
                  setCurrentImageIndex(index)
                }}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  currentImageIndex === index 
                    ? 'bg-primary w-6' 
                    : 'bg-white/40 hover:bg-white/60'
                }`}
              />
            ))}
            {allImages.length > 5 && (
              <span className="text-white/60 text-[8px] ml-1">+{allImages.length - 5}</span>
            )}
          </div>
        )}

        {/* Price Badge */}
        <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md px-4 py-2">
          <span className="text-secondary text-[10px] uppercase tracking-widest font-semibold">
            {price}₺ <span className="text-secondary/60">/ Gece</span>
          </span>
        </div>

        {/* Rating Badge */}
        {averageRating > 0 && (
          <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-3 py-1.5 flex items-center gap-1.5">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="#C5A059" stroke="#C5A059">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <span className="text-secondary text-[9px] font-bold">{averageRating.toFixed(1)}</span>
          </div>
        )}
      </div>
      
      <div className="space-y-3">
        <div>
          <h3 className="text-2xl font-serif text-secondary group-hover:text-primary transition-colors">
            {title}
          </h3>
          {location && (
            <div className="flex items-center gap-1.5 mt-1">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary/60">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span className="text-secondary/50 text-[10px] uppercase tracking-wider font-light">
                {location}
              </span>
            </div>
          )}
        </div>

        {/* Capacity Info */}
        {(capacity_adults || capacity_children) && (
          <div className="flex items-center gap-3 text-secondary/50 text-[10px] uppercase tracking-wider">
            {capacity_adults && (
              <span className="flex items-center gap-1">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                {capacity_adults} {t.rooms.adults}
              </span>
            )}
            {capacity_children && capacity_children > 0 && (
              <span className="flex items-center gap-1">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
                {capacity_children} {t.rooms.children}
              </span>
            )}
          </div>
        )}
        
        <p className="text-secondary/60 text-sm line-clamp-2 leading-relaxed font-light">
          {description}
        </p>
        
        <div className="flex flex-wrap gap-3 pt-2">
          {features.slice(0, 3).map((feature, i) => {
            const featureTitle = typeof feature === 'string' ? feature : feature.title
            const featureIcon = typeof feature === 'string' ? null : feature.icon
            
            return (
              <span key={i} className="flex items-center gap-1.5 text-[9px] uppercase tracking-widest text-primary font-medium border border-primary/20 px-2 py-1">
                {featureIcon && (
                  <AmenityIcon 
                    iconName={featureIcon} 
                    size={12} 
                    className="text-primary flex-shrink-0" 
                  />
                )}
                {featureTitle}
              </span>
            )
          })}
          {features.length > 3 && (
            <span className="text-[9px] uppercase tracking-widest text-secondary/40 font-medium px-2 py-1">
              +{features.length - 3}
            </span>
          )}
        </div>
        
        <div className="pt-4 flex items-center gap-2 group/btn">
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-secondary">
            {t.rooms.details}
          </span>
          <motion.div 
            className="h-px w-8 bg-secondary origin-left"
            whileHover={{ scaleX: 1.5 }}
          />
        </div>
      </div>
    </>
  )

  const cardWrapper = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group cursor-pointer"
    >
      {cardContent}
    </motion.div>
  )

  if (slug) {
    return (
      <Link href={`/rooms/${slug}`}>
        {cardWrapper}
      </Link>
    )
  }

  return cardWrapper
}

