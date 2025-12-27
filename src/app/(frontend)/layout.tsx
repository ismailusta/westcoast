import React from 'react'
import './globals.css'

export const metadata = {
  description: 'WestCoast Hotel',
  title: 'WestCoast Hotel',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="tr">
      <body suppressHydrationWarning className="antialiased">
        {children}
      </body>
    </html>
  )
}
