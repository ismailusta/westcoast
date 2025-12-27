'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import type { Media } from '@/payload-types'

interface HeroCarouselProps {
  heroImages: Media[]
}

export default function HeroCarousel({ heroImages }: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  if (!heroImages || heroImages.length === 0) {
    return null
  }

  // Otomatik geçiş için useEffect
  useEffect(() => {
    if (heroImages.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % heroImages.length
        return nextIndex
      })
    }, 5000) // 5 saniyede bir geçiş

    return () => clearInterval(interval)
  }, [heroImages.length])

  // Sonraki resme geç
  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % heroImages.length)
  }

  // Önceki resme geç
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + heroImages.length) % heroImages.length)
  }

  // Belirli bir resme geç
  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Hero Images Carousel/Slider */}
      <div className="relative w-full h-full" style={{ zIndex: 1 }}>
        {heroImages.map((image, index) => (
          <div
            key={image.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            style={{ position: 'absolute' }}
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
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/30" />
          </div>
        ))}
      </div>

      {/* Hero Content */}
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

      {/* Navigation Arrows (if multiple images) */}
      {heroImages.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
            aria-label="Önceki resim"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
            aria-label="Sonraki resim"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </>
      )}

      {/* Image Indicators (if multiple images) */}
      {heroImages.length > 1 && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentIndex
                  ? 'w-8 h-2 bg-white'
                  : 'w-2 h-2 bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Resim ${index + 1}'e geç`}
            />
          ))}
        </div>
      )}
    </section>
  )
}




