import React from 'react'
import { Header } from '../components/layout/Header'
import { Footer } from '../components/layout/Footer'
import { ContactPageContent } from '../components/sections/ContactPageContent'

export default function ContactPage() {
  return (
    <div className="bg-[#F8F5F2] selection:bg-primary selection:text-white">
      <Header />
      
      <main>
        <ContactPageContent />
      </main>

      <Footer />
    </div>
  )
}

