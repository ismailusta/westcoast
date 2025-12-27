import React from 'react'
import './globals.css'
import { Cormorant_Garamond, Montserrat } from 'next/font/google'
import { LocaleProvider } from './components/LocaleProvider'

const serif = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-serif',
  display: 'swap',
})

const sans = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata = {
  description: 'WestCoast Hotel - Timeless Luxury',
  title: 'WestCoast Hotel | Experience Refinement',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="tr" className={`${serif.variable} ${sans.variable}`}>
      <body suppressHydrationWarning className="antialiased font-sans">
        <LocaleProvider>
          {children}
        </LocaleProvider>
      </body>
    </html>
  )
}
