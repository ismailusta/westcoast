'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import type { Media } from '@/payload-types'

interface HeroCarouselProps {
  heroImages?: Media[] // undefined gelme ihtimaline karşı opsiyonel yaptık
}

export default function HeroCarousel({ heroImages = [] }: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Hook'u kesinlikle hiçbir koşula (if) bağlamadan en üstte tutuyoruz
  useEffect(() => {
    // Görüntü sayısını güvenli bir şekilde hesapla
    const imageCount = heroImages?.length || 0
    
    // Eğer görsel yoksa veya tekse bir şey yapma (ama hook yine de çalışmış oldu)
    if (imageCount <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % imageCount)
    }, 5000)

    return () => clearInterval(interval)
  }, [heroImages]) // heroImages array'ini dependency olarak kullan

  // Görüntü sayısını güvenli bir değişkene alalım (early return'den önce)
  const imageCount = heroImages?.length || 0

  // Fonksiyonlar
  const goToNext = () => {
    if (imageCount > 0) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % imageCount)
    }
  }

  const goToPrevious = () => {
    if (imageCount > 0) {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + imageCount) % imageCount)
    }
  }

  // EĞER HİÇ GÖRSEL YOKSA: Early return en sonda olmalı 
  // (Fakat bu durumda bile yukarıdaki Hook'lar çalışmış olacak, kural bu)
  if (imageCount === 0) {
    return null
  }

  return (
    <section className="relative w-full h-screen overflow-hidden">
      <div className="relative w-full h-full" style={{ zIndex: 1 }}>
        {heroImages.map((image, index) => (
          <div
            key={image.id || index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            {image.url && (
              <div className="relative w-full h-full">
                <Image
                  src={image.url}
                  alt={image.alt || 'Hero Image'}
                  fill
                  className="object-cover"
                  priority={index === 0}
                  sizes="100vw"
                />
              </div>
            )}
            <div className="absolute inset-0 bg-black/30" />
          </div>
        ))}
      </div>

      <div className="relative z-10 flex items-center justify-center h-full text-white">
        <div className="text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 drop-shadow-lg">
            Hoş Geldiniz
          </h1>
          <p className="text-xl md:text-2xl mb-8 drop-shadow-md">
            Lüks ve Konforun Buluştuğu Yer
          </p>
        </div>
      </div>

      {imageCount > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all backdrop-blur-sm"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all backdrop-blur-sm"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {heroImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentIndex ? 'w-8 h-2 bg-white' : 'w-2 h-2 bg-white/50 hover:bg-white/75'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  )
}