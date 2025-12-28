'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import type { Media } from '@/payload-types'
import { AmenityIcon } from '../ui/AmenityIcon'
import { useLocale } from '../LocaleProvider'
import { getTranslation } from '@/lib/translations'

interface RoomDetailProps {
  room: {
    id: number
    title: string
    description: string
    price: number
    location?: string
    capacity_adults?: number
    capacity_children?: number
    coverImage?: Media
    gallery?: Media[]
    floorPlan?: unknown
    specialNotes?: unknown
    reviews?: Array<{ rating?: number }>
    features: Array<{ title: string; icon?: string | null }>
  }
}

export const RoomDetail = ({ room }: RoomDetailProps) => {
  const { locale } = useLocale()
  const t = getTranslation(locale)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const allImages = room.coverImage ? [room.coverImage, ...(room.gallery || [])] : (room.gallery || [])
  const averageRating = room.reviews && room.reviews.length > 0
    ? room.reviews.reduce((sum: number, review: { rating?: number }) => sum + (review.rating || 0), 0) / room.reviews.length
    : 0

  return (
    <section className="pt-32 pb-24">
      <div className="container mx-auto px-6">
        {/* Breadcrumb */}
        <nav className="mb-12 text-sm text-secondary/50">
          <div className="flex items-center gap-2">
            <Link href="/" className="hover:text-primary transition-colors">{t.rooms.home}</Link>
            <span>/</span>
            <Link href="/rooms" className="hover:text-primary transition-colors">{t.rooms.label}</Link>
            <span>/</span>
            <span className="text-secondary">{room.title}</span>
          </div>
        </nav>

        {/* Header */}
        <div className="mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-8">
            <div className="max-w-3xl">
              <h1 className="text-5xl md:text-7xl font-serif text-secondary mb-4">
                {room.title}
              </h1>
              {room.location && (
                <div className="flex items-center gap-2 text-secondary/50">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span className="text-sm uppercase tracking-wider">{room.location}</span>
                </div>
              )}
            </div>
            <div className="flex flex-col items-end gap-4">
              <div className="text-right">
                <div className="text-4xl font-serif text-primary mb-1">{room.price}₺</div>
                <div className="text-sm text-secondary/50 uppercase tracking-wider">{t.rooms.perNight}</div>
              </div>
              {averageRating > 0 && (
                <div className="flex items-center gap-2 bg-white/80 backdrop-blur-md px-4 py-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#C5A059" stroke="#C5A059">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  <span className="text-secondary font-bold">{averageRating.toFixed(1)}</span>
                  <span className="text-secondary/50 text-sm">({room.reviews?.length || 0})</span>
                </div>
              )}
            </div>
          </div>

          {/* Capacity Info */}
          {(room.capacity_adults || room.capacity_children) && (
            <div className="flex items-center gap-6 text-secondary/60 text-sm">
              {room.capacity_adults && (
                <div className="flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  <span>{room.capacity_adults} {t.rooms.adults}</span>
                </div>
              )}
              {room.capacity_children && room.capacity_children > 0 && (
                <div className="flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                  <span>{room.capacity_children} {t.rooms.children}</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Image Gallery */}
        {allImages.length > 0 && (
          <div className="mb-24">
            <div className="relative aspect-[16/9] overflow-hidden bg-accent rounded-sm mb-4">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImageIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  src={allImages[currentImageIndex]?.url || '/room-placeholder.jpg'}
                  alt={room.title}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>

              {/* Navigation Arrows */}
              {allImages.length > 1 && (
                <>
                  <button
                    onClick={() => setCurrentImageIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1))}
                    className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-md p-3 hover:bg-white transition-colors"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M15 18l-6-6 6-6" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setCurrentImageIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1))}
                    className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-md p-3 hover:bg-white transition-colors"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </button>
                </>
              )}

              {/* Image Counter */}
              {allImages.length > 1 && (
                <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-md px-4 py-2 text-sm text-secondary">
                  {currentImageIndex + 1} / {allImages.length}
                </div>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {allImages.length > 1 && (
              <div className="grid grid-cols-6 gap-2">
                {allImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`aspect-square overflow-hidden rounded-sm transition-opacity ${
                      currentImageIndex === index ? 'opacity-100 ring-2 ring-primary' : 'opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img.url || '/room-placeholder.jpg'}
                      alt={`${room.title} - ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 mb-24">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-16">
            {/* Description */}
            <div>
              <h2 className="text-3xl font-serif text-secondary mb-6">{t.rooms.aboutRoom}</h2>
              <div className="prose prose-sm max-w-none text-secondary/70 leading-relaxed">
                <p>{room.description}</p>
              </div>
            </div>

            {/* Features */}
            {Array.isArray(room.features) && room.features.length > 0 && (
              <div>
                <h2 className="text-3xl font-serif text-secondary mb-6">{t.rooms.amenities}</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {room.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3 p-4 bg-white border border-secondary/10">
                      {feature.icon && (
                        <AmenityIcon 
                          iconName={feature.icon} 
                          size={20} 
                          className="text-primary flex-shrink-0" 
                        />
                      )}
                      <span className="text-sm text-secondary">{feature.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Special Notes */}
            {room.specialNotes ? (
              <div>
                <h2 className="text-3xl font-serif text-secondary mb-6">{t.rooms.specialNotes}</h2>
                <div className="prose prose-sm max-w-none text-secondary/70 leading-relaxed">
                  {/* Rich text content would be rendered here */}
                  <p>
                    {typeof room.specialNotes === 'string' 
                      ? room.specialNotes 
                      : typeof room.specialNotes === 'object' && room.specialNotes !== null
                      ? JSON.stringify(room.specialNotes)
                      : String(room.specialNotes)
                    }
                  </p>
                </div>
              </div>
            ) : null}

            {/* Reviews */}
            {room.reviews && room.reviews.length > 0 && (
              <div>
                <h2 className="text-3xl font-serif text-secondary mb-6">{t.rooms.reviews}</h2>
                <div className="space-y-6">
                  {room.reviews.map((review: { rating?: number; comment?: string; guestName?: string }, i: number) => (
                    <div key={i} className="bg-white p-6 border border-secondary/10">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                          <span className="text-primary font-serif">
                            {review.guestName?.charAt(0).toUpperCase() || t.rooms.guest.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <div className="font-serif text-lg text-secondary">{review.guestName || t.rooms.guest}</div>
                          <div className="flex gap-1 mt-1">
                            {[...Array(5)].map((_, j) => (
                              <span 
                                key={j} 
                                className={`text-sm ${j < (review.rating || 0) ? 'text-primary' : 'text-secondary/20'}`}
                              >
                                ★
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-secondary/70">{review.comment || ''}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 bg-white p-8 border border-secondary/10">
              <div className="mb-8">
                <div className="text-4xl font-serif text-primary mb-1">{room.price}₺</div>
                <div className="text-sm text-secondary/50 uppercase tracking-wider">{t.rooms.perNight}</div>
              </div>

              <button className="w-full bg-secondary text-white py-4 text-sm uppercase tracking-wider font-bold hover:bg-primary transition-all mb-6">
                {t.rooms.makeReservation}
              </button>

              <div className="space-y-4 text-sm text-secondary/70">
                <div className="flex justify-between">
                  <span>{t.rooms.checkIn}:</span>
                  <span className="font-medium">14:00</span>
                </div>
                <div className="flex justify-between">
                  <span>{t.rooms.checkOut}:</span>
                  <span className="font-medium">12:00</span>
                </div>
                {room.capacity_adults && (
                  <div className="flex justify-between">
                    <span>{t.rooms.capacity}:</span>
                    <span className="font-medium">
                      {room.capacity_adults} {t.rooms.adults}
                      {room.capacity_children && room.capacity_children > 0 && `, ${room.capacity_children} ${t.rooms.children}`}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

