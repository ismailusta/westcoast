import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { RoomType, Media, Amenity } from '@/payload-types'
import { Header } from '../../components/layout/Header'
import { Footer } from '../../components/layout/Footer'
import { RoomDetail } from '../../components/sections/RoomDetail'
import { getLocale, type Locale } from '@/lib/getLocale'
import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'

// Server Component'te locale'i cookie'den al
async function getServerLocale(): Promise<Locale> {
  const cookieStore = await cookies()
  const locale = cookieStore.get('locale')?.value as Locale
  return (locale && ['tr', 'en', 'ru', 'de'].includes(locale)) ? locale : 'tr'
}

export default async function RoomDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const payload = await getPayload({ config })
  const locale = await getServerLocale()
  const { slug: rawSlug } = await params

  // Slug'u decode et
  let decodedSlug = rawSlug
  try {
    decodedSlug = decodeURIComponent(rawSlug)
  } catch {
    decodedSlug = rawSlug
  }
  
  // + karakterini space'e çevir ve trim et
  decodedSlug = decodedSlug.replace(/\+/g, ' ').trim()

  // Önce decoded slug ile dene
  let roomResult = await payload.find({
    collection: 'room-types',
    where: {
      slug: {
        equals: decodedSlug,
      },
    },
    depth: 2,
    locale,
    limit: 1,
  })

  // Bulunamazsa raw slug ile dene
  if (roomResult.docs.length === 0) {
    roomResult = await payload.find({
      collection: 'room-types',
      where: {
        slug: {
          equals: rawSlug,
        },
      },
      depth: 2,
      locale,
      limit: 1,
    })
  }

  // Hala bulunamazsa, tüm odaları çek ve slug'u manuel kontrol et
  if (roomResult.docs.length === 0) {
    const allRooms = await payload.find({
      collection: 'room-types',
      depth: 2,
      locale,
      limit: 100,
    })
    
    const foundRoom = allRooms.docs.find((room: RoomType) => {
      const roomSlug = String(room.slug || '').trim()
      const searchSlug = decodedSlug.trim()
      const searchRawSlug = rawSlug.trim()
      
      return roomSlug === searchSlug || 
             roomSlug === searchRawSlug ||
             roomSlug.replace(/\+/g, ' ') === searchSlug ||
             decodeURIComponent(roomSlug.replace(/\+/g, '%20')) === searchSlug
    })
    
    if (foundRoom) {
      roomResult = { docs: [foundRoom] } as any
    }
  }

  if (roomResult.docs.length === 0) {
    console.error('Room not found. Searched slugs:', { rawSlug, decodedSlug })
    notFound()
  }

  const room = roomResult.docs[0] as RoomType

  // Veriyi formatla
  const formattedRoom = {
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
  }

  return (
    <div className="bg-[#F8F5F2] selection:bg-primary selection:text-white">
      <Header />
      
      <main>
        <RoomDetail room={formattedRoom} />
      </main>

      <Footer />
    </div>
  )
}

