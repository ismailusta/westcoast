import React from 'react'
import { Header } from '../components/layout/Header'
import { Footer } from '../components/layout/Footer'
import { AboutPageContent } from '../components/sections/AboutPageContent'

export default function AboutPage() {
  return (
    <div className="bg-[#F8F5F2] selection:bg-primary selection:text-white">
      <Header />
      
      <main>
        <AboutPageContent />
      </main>

      <Footer />
    </div>
  )
}

