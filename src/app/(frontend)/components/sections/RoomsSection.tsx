'use client'

import React, { useRef, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { RoomCard } from '../ui/RoomCard'
import type { Media } from '@/payload-types'
import { useLocale } from '../LocaleProvider'
import { getTranslation } from '@/lib/translations'

interface RoomsSectionProps {
  rooms: any[]
}

export const RoomsSection = ({ rooms }: RoomsSectionProps) => {
  const { locale } = useLocale()
  const t = getTranslation(locale)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const autoScrollIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const isUserScrollingRef = useRef(false)

  const checkScrollability = () => {
    if (!scrollContainerRef.current) return
    
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
    setCanScrollLeft(scrollLeft > 0)
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
  }

  const scroll = (direction: 'left' | 'right', isAuto = false) => {
    if (!scrollContainerRef.current) return
    
    if (!isAuto) {
      isUserScrollingRef.current = true
      // Kullanıcı scroll yaptığında otomatik scroll'u durdur
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current)
        autoScrollIntervalRef.current = null
      }
      // 6 saniye sonra tekrar başlat
      setTimeout(() => {
        isUserScrollingRef.current = false
        startAutoScroll()
      }, 6000)
    }
    
    const scrollAmount = scrollContainerRef.current.clientWidth
    const targetScroll = direction === 'left' 
      ? scrollContainerRef.current.scrollLeft - scrollAmount
      : scrollContainerRef.current.scrollLeft + scrollAmount
    
    scrollContainerRef.current.scrollTo({
      left: targetScroll,
      behavior: 'smooth'
    })
    
    // Scroll sonrası durumu kontrol et
    setTimeout(() => {
      checkScrollability()
    }, 500)
  }

  const startAutoScroll = () => {
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
          setTimeout(() => checkScrollability(), 500)
        } else {
          const scrollAmount = clientWidth
          scrollContainerRef.current.scrollTo({
            left: scrollLeft + scrollAmount,
            behavior: 'smooth'
          })
          setTimeout(() => checkScrollability(), 500)
        }
      }
    }, 5000) // 5 saniye
  }

  React.useEffect(() => {
    checkScrollability()
    const container = scrollContainerRef.current
    if (container) {
      const handleScroll = () => {
        checkScrollability()
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
      window.addEventListener('resize', checkScrollability)
      
      // Otomatik scroll'u başlat
      startAutoScroll()
      
      return () => {
        container.removeEventListener('scroll', handleScroll)
        window.removeEventListener('resize', checkScrollability)
        if (autoScrollIntervalRef.current) {
          clearInterval(autoScrollIntervalRef.current)
        }
      }
    }
  }, [rooms])

  return (
    <section id="rooms" className="py-32 bg-[#F8F5F2]">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-primary text-xs uppercase tracking-[0.5em] mb-4 block"
            >
              {t.rooms.label}
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-6xl text-secondary leading-tight"
            >
              {t.rooms.title} <br />
              <span className="serif-italic text-primary">{t.rooms.titleItalic}</span>
            </motion.h2>
          </div>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-secondary/60 max-w-sm text-sm leading-relaxed mb-2"
          >
            {t.rooms.description}
          </motion.p>
        </div>

        {/* Scrollable Carousel Container */}
        <div className="relative">
          {/* Scrollable Container */}
          <div
            ref={scrollContainerRef}
            className="overflow-x-auto scrollbar-hide scroll-smooth"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            <div className="flex gap-8 pb-8">
              {rooms.map((room, index) => (
                <div
                  key={room.id}
                  className="flex-shrink-0 w-[90vw] sm:w-[90vw] lg:w-[calc(33.333%-1.33rem)] max-w-none"
                >
                  <RoomCard
                    title={room.title}
                    description={room.description}
                    price={room.price}
                    slug={room.slug}
                    location={room.location}
                    capacity_adults={room.capacity_adults}
                    capacity_children={room.capacity_children}
                    image={room.coverImage}
                    gallery={room.gallery}
                    features={room.features}
                    reviews={room.reviews}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-24 text-center">
          <Link href="/rooms" className="inline-block group relative pb-1 overflow-hidden">
            <span className="text-xs uppercase tracking-[0.4em] font-bold text-secondary">
              {t.rooms.viewAll}
            </span>
            <div className="absolute bottom-0 left-0 w-full h-px bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
          </Link>
        </div>
      </div>

    </section>
  )
}
