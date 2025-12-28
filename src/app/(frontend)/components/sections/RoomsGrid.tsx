'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { RoomCard } from '../ui/RoomCard'
import { useLocale } from '../LocaleProvider'
import { getTranslation } from '@/lib/translations'

interface RoomsGridProps {
  rooms: any[]
}

export const RoomsGrid = ({ rooms }: RoomsGridProps) => {
  const { locale } = useLocale()
  const t = getTranslation(locale)

  return (
    <section className="pt-32 pb-24">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mb-20">
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-primary text-xs uppercase tracking-[0.5em] mb-4 block"
          >
            {t.rooms.label}
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl text-secondary leading-tight mb-6"
          >
            {t.rooms.title} <br />
            <span className="serif-italic text-primary">{t.rooms.titleItalic}</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-secondary/60 max-w-2xl text-sm leading-relaxed"
          >
            {t.rooms.description}
          </motion.p>
        </div>

        {/* Rooms Grid */}
        {rooms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rooms.map((room, index) => (
              <motion.div
                key={room.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
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
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <p className="text-secondary/50 text-lg">Henüz oda bulunmamaktadır.</p>
          </div>
        )}
      </div>
    </section>
  )
}

