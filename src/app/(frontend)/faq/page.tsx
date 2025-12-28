import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { FAQ } from '@/payload-types'
import { Header } from '../components/layout/Header'
import { Footer } from '../components/layout/Footer'
import { FAQPageContent } from '../components/sections/FAQPageContent'
import { cookies } from 'next/headers'
import { getLocale, type Locale } from '@/lib/getLocale'

// Server Component'te locale'i cookie'den al
async function getServerLocale(): Promise<Locale> {
  const cookieStore = await cookies()
  const locale = cookieStore.get('locale')?.value as Locale
  return (locale && ['tr', 'en', 'ru', 'de'].includes(locale)) ? locale : 'tr'
}

export default async function FAQPage() {
  const payload = await getPayload({ config })
  const locale = await getServerLocale()

  // Tüm FAQ'ları çek
  const faqsResult = await payload.find({
    collection: 'faqs',
    depth: 1,
    locale,
    sort: 'order',
  })

  const faqs = faqsResult.docs as FAQ[]

  return (
    <div className="bg-[#F8F5F2] selection:bg-primary selection:text-white">
      <Header />
      
      <main>
        <FAQPageContent faqs={faqs} />
      </main>

      <Footer />
    </div>
  )
}

