'use client'

import React from 'react'
import * as LucideIcons from 'lucide-react'

interface AmenityIconProps {
  iconName?: string | null
  className?: string
  size?: number
}

// İkon adı mapping (küçük harf, tire ile ayrılmış)
const iconMap: Record<string, keyof typeof LucideIcons> = {
  'wifi': 'Wifi',
  'wind': 'Wind',
  'tv': 'Tv',
  'waves': 'Waves',
  'home': 'Home',
  'eye': 'Eye',
  'chef-hat': 'ChefHat',
  'dishwasher': 'UtensilsCrossed',
  'washing-machine': 'WashingMachine',
  'microwave': 'Microwave',
  'refrigerator': 'Refrigerator',
  'grill': 'Flame',
  'sun': 'Sun',
  'room-service': 'Bell',
  'safe': 'Lock',
  'mini-bar': 'Beer',
  'jacuzzi': 'Droplets',
  'sauna': 'Thermometer',
  'dumbbell': 'Dumbbell',
  'spa': 'Sparkles',
  'pool': 'Waves',
  'balcony': 'Home',
  'terrace': 'Home',
  'sea-view': 'Eye',
  'kitchen': 'ChefHat',
  'air-conditioning': 'Wind',
  'ac': 'Wind',
  'fitness': 'Dumbbell',
  'gym': 'Dumbbell',
}

export const AmenityIcon = ({ iconName, className = '', size = 20 }: AmenityIconProps) => {
  if (!iconName) {
    // Fallback ikon
    const DefaultIcon = LucideIcons.Star
    return <DefaultIcon size={size} className={className} />
  }

  // SVG kodu kontrolü (eğer SVG kodu ise direkt render et)
  if (iconName.trim().startsWith('<svg')) {
    return (
      <div 
        className={className}
        dangerouslySetInnerHTML={{ __html: iconName }}
        style={{ width: size, height: size, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
      />
    )
  }

  // Lucide ikon adını bul
  const normalizedName = iconName.toLowerCase().trim().replace(/\s+/g, '-')
  const iconKey = iconMap[normalizedName] || normalizedName.split('-').map((word) => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join('')

  // İkonu dinamik olarak al
  const IconComponent = (LucideIcons as any)[iconKey] as React.ComponentType<{ size?: number; className?: string }>

  if (IconComponent) {
    return <IconComponent size={size} className={className} />
  }

  // Fallback
  const DefaultIcon = LucideIcons.Star
  return <DefaultIcon size={size} className={className} />
}

