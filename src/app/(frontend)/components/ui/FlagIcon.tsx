'use client'

import React from 'react'
import { TR, GB, RU, DE } from 'country-flag-icons/react/3x2'

interface FlagIconProps {
  code: 'tr' | 'en' | 'ru' | 'de'
  className?: string
  size?: number
}

const flags = {
  tr: TR,
  en: GB,
  ru: RU,
  de: DE,
}

export const FlagIcon = ({ code, className = '', size = 20 }: FlagIconProps) => {
  const FlagComponent = flags[code]
  
  return (
    <div 
      className={`inline-flex items-center justify-center flex-shrink-0 overflow-hidden rounded-sm ${className}`}
      style={{ width: size, height: size * 0.75 }}
    >
      <FlagComponent className="w-full h-full object-cover" />
    </div>
  )
}

