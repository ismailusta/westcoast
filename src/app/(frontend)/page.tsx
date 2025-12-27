import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { RoomType, Amenity, Media } from '@/payload-types'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { HeroSection } from './components/sections/HeroSection'
import { RoomsSection } from './components/sections/RoomsSection'
import { AboutSection } from './components/sections/AboutSection'
import { NewsletterSection } from './components/sections/NewsletterSection'
import { ReviewForm } from './components/sections/ReviewForm'
import { ReviewsSection } from './components/sections/ReviewsSection'
import { getLocale, type Locale } from '@/lib/getLocale'

import { cookies } from 'next/headers'

// Server Component'te locale'i cookie'den al
async function getServerLocale(): Promise<Locale> {
  const cookieStore = await cookies()
  const locale = cookieStore.get('locale')?.value as Locale
  return (locale && ['tr', 'en', 'ru', 'de'].includes(locale)) ? locale : 'tr'
}

export default async function Page() {
  const payload = await getPayload({ config })
  const locale = await getServerLocale()

  // Hero Resimlerini Çek
  const heroImagesResult = await payload.find({
    collection: 'media',
    where: {
      category: {
        equals: 'hero',
      },
    },
    locale,
  })
  const heroImages = heroImagesResult.docs as Media[]

  // Odaları Çek (Tüm odalar, limit yok)
  const roomsResult = await payload.find({
    collection: 'room-types',
    depth: 1,
    locale,
  })

  // Onaylanmış değerlendirmeleri çek
  const reviewsResult = await payload.find({
    collection: 'reviews',
    where: {
      showOnPage: {
        equals: true,
      },
    },
    sort: '-createdAt',
    limit: 9,
    depth: 1,
  })

  // Veriyi formatla
  const formattedRooms = roomsResult.docs.map((room: RoomType) => ({
    id: room.id,
    title: room.title,
    slug: room.slug,
    description: room.description || '',
    price: room.price,
    location: room.location || '',
    capacity_adults: room.capacity_adults,
    capacity_children: room.capacity_children || 0,
    coverImage: typeof room.coverImage === 'object' && room.coverImage !== null && 'id' in room.coverImage
      ? room.coverImage as Media
      : undefined,
    gallery: Array.isArray(room.gallery) 
      ? room.gallery
          .map((item) => {
            if (typeof item === 'object' && item !== null && 'image' in item) {
              const img = item.image
              return typeof img === 'object' && img !== null && 'id' in img ? img as Media : null
            }
            return null
          })
          .filter((img): img is Media => img !== null)
      : [],
    floorPlan: room.floorPlan || null,
    specialNotes: room.specialNotes || null,
    reviews: Array.isArray(room.reviews) ? room.reviews : [],
    features: Array.isArray(room.amenities) 
      ? room.amenities
          .filter((amenity): amenity is Amenity => typeof amenity === 'object' && amenity !== null && 'title' in amenity)
          .map(amenity => ({
            title: amenity.title,
            icon: amenity.icon || null,
          }))
      : [],
  }))

  return (
    <div className="bg-[#F8F5F2] selection:bg-primary selection:text-white">
      <Header />
      
      <main>
        <HeroSection images={heroImages} />
        
        <AboutSection />
        
        <RoomsSection rooms={formattedRooms} />
        
        <ReviewsSection reviews={reviewsResult.docs as any[]} />
        
        <ReviewForm />
        
        <NewsletterSection />
      </main>

      <Footer />
    </div>
  )
}
