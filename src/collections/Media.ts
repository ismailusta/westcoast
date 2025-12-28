import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  hooks: {
    beforeDelete: [
      async ({ req, id }) => {
        try {
          // Bu media'yı kullanan tüm review'ları bul
          // Payload CMS'de array içindeki nested field sorguları için tüm review'ları alıp filtrele
          const reviews = await req.payload.find({
            collection: 'reviews',
            limit: 1000, // Tüm review'ları al
            depth: 1, // İlişkili verileri de getir
          })

          // Bu media'yı kullanan review'ları filtrele
          const reviewsUsingThisMedia = reviews.docs.filter((review: any) => {
            if (!review.images || !Array.isArray(review.images)) return false
            return review.images.some((img: any) => {
              const imageId = typeof img.image === 'object' && img.image !== null && 'id' in img.image
                ? img.image.id
                : img.image
              return imageId === id
            })
          })

          // Her review'dan bu media referansını kaldır
          for (const review of reviewsUsingThisMedia) {
            try {
              if (review.images && Array.isArray(review.images)) {
                const updatedImages = review.images.filter((img: any) => {
                  const imageId = typeof img.image === 'object' && img.image !== null && 'id' in img.image
                    ? img.image.id
                    : img.image
                  return imageId !== id
                })

                // Review'ı güncelle
                await req.payload.update({
                  collection: 'reviews',
                  id: review.id,
                  data: {
                    images: updatedImages.length > 0 ? updatedImages : undefined,
                  },
                })
              }
            } catch (error) {
              console.error(`Error updating review ${review.id}:`, error)
              // Devam et, diğer review'ları güncellemeye çalış
            }
          }
        } catch (error) {
          console.error('Error in beforeDelete hook for media:', error)
          // Hook hatası olsa bile silme işlemini durdurma
          // Payload CMS kendi foreign key kontrolünü yapacak
        }
      },
    ],
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
        {
          label: {
            tr: 'Değerlendirme',
            en: 'Review',
            ru: 'Отзыв',
            de: 'Bewertung',
          },
          value: 'review',
        },
      ],
      admin: {
        description: {
          tr: 'Resmin kullanım amacını seçin',
          en: 'Select the purpose of this image',
        },
      },
    },
    {
      name: 'showOnHomePage',
      type: 'checkbox',
      label: {
        tr: 'Ana Sayfada Göster',
        en: 'Show on Home Page',
        ru: 'Показать на главной странице',
        de: 'Auf Startseite anzeigen',
      },
      admin: {
        description: {
          tr: 'Hero resimleri için ana sayfada gösterilsin mi?',
          en: 'Should hero images be shown on the home page?',
          ru: 'Показывать ли главные изображения на главной странице?',
          de: 'Sollen Hero-Bilder auf der Startseite angezeigt werden?',
        },
        condition: (data) => data.category === 'hero',
      },
      defaultValue: false,
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
