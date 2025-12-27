import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'category',
      type: 'select',
      required: false,
      options: [
        {
          label: {
            tr: 'Hero Resmi',
            en: 'Hero Image',
            ru: 'Главное изображение',
            de: 'Hero-Bild',
          },
          value: 'hero',
        },
        {
          label: {
            tr: 'Oda Resmi',
            en: 'Room Image',
            ru: 'Изображение номера',
            de: 'Zimmerbild',
          },
          value: 'room',
        },
        {
          label: {
            tr: 'Galeri',
            en: 'Gallery',
            ru: 'Галерея',
            de: 'Galerie',
          },
          value: 'gallery',
        },
        {
          label: {
            tr: 'Restoran',
            en: 'Restaurant',
            ru: 'Ресторан',
            de: 'Restaurant',
          },
          value: 'restaurant',
        },
        {
          label: {
            tr: 'Hakkımızda',
            en: 'About',
            ru: 'О нас',
            de: 'Über uns',
          },
          value: 'about',
        },
        {
          label: {
            tr: 'Genel',
            en: 'General',
            ru: 'Общее',
            de: 'Allgemein',
          },
          value: 'general',
        },
      ],
      admin: {
        description: {
          tr: 'Resmin kullanım amacını seçin',
          en: 'Select the purpose of this image',
        },
      },
    },
  ],
  upload: {
    imageSizes: [
    {
      name: 'banner',
      width: 1920,
      height: 1080,
      crop: 'center',
      position: 'centre',
    },
    {
      name: 'banner-mobile',
      width: 1280,
      height: 720,
      crop: 'center',
      position: 'centre',
    },
    {
      name: 'card',
      width: 800,
      height: 600,
      crop: 'center',
      position: 'centre',
    },
    {
      name: 'card-mobile',
      width: 600,
      height: 450,
      crop: 'center',
      position: 'centre',
    },
    {
      name: 'thumbnail',
      width: 200,
      height: 200,
      crop: 'center',
      position: 'centre',
    },
    {
      name: 'thumbnail-mobile',
      width: 150,
      height: 150,
      crop: 'center',
      position: 'centre',
    },
    {
      name: 'icon',
      width: 64,
      height: 64,
      crop: 'center',
      position: 'centre',
    },
    {
      name: 'icon-mobile',
      width: 32,
      height: 32,
      crop: 'center',
      position: 'centre',
    },
    {
      name: 'mobile',
      width: 640,
      height: undefined, // Aspect ratio korunur
      crop: 'center',
      position: 'centre',
    },
    ],
  },
}
