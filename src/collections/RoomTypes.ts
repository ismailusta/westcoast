import type { CollectionConfig } from 'payload'

export const RoomTypes: CollectionConfig = {
  slug: 'room-types',
  labels: {
    singular: {
      tr: 'Oda Tipi',
      en: 'Room Type',
      ru: 'Тип номера',
      de: 'Zimmertyp',
    },
    plural: {
      tr: 'Oda Tipleri',
      en: 'Room Types',
      ru: 'Типы номеров',
      de: 'Zimmertypen',
    },
  },
  admin: {
    useAsTitle: 'title',
    group: {
      tr: 'Otel Yönetimi',
      en: 'Hotel Management',
      ru: 'Управление отелем',
      de: 'Hotelverwaltung',
    },
  },
  access: {
    read: () => true, // Müşteriler odaları görebilsin
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      label: {
        tr: 'Oda Adı',
        en: 'Room Name',
        ru: 'Название номера',
        de: 'Zimmername',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: {
          tr: 'URL adresi (örn: deniz-manzarali-deluxe). Türkçe karakter ve boşluk kullanma.',
          en: 'URL address (e.g., sea-view-deluxe). Do not use Turkish characters or spaces.',
          ru: 'URL адрес (например: sea-view-deluxe). Не используйте турецкие символы или пробелы.',
          de: 'URL-Adresse (z.B. sea-view-deluxe). Verwenden Sie keine türkischen Zeichen oder Leerzeichen.',
        },
      },
    },
    {
      name: 'price',
      type: 'number',
      required: true,
      label: {
        tr: 'Gecelik Fiyat (TL)',
        en: 'Nightly Price (TL)',
        ru: 'Цена за ночь (TL)',
        de: 'Preis pro Nacht (TL)',
      },
    },
    {
      // Yan yana dursunlar diye "row" kullanıyoruz
      type: 'row',
      fields: [
        {
          name: 'capacity_adults',
          type: 'number',
          required: true,
          defaultValue: 2,
          label: {
            tr: 'Yetişkin Kapasitesi',
            en: 'Adult Capacity',
            ru: 'Вместимость взрослых',
            de: 'Erwachsenenkapazität',
          },
        },
        {
          name: 'capacity_children',
          type: 'number',
          defaultValue: 0,
          label: {
            tr: 'Çocuk Kapasitesi',
            en: 'Children Capacity',
            ru: 'Вместимость детей',
            de: 'Kinderkapazität',
          },
        },
      ],
    },
    {
      name: 'location',
      type: 'text',
      localized: true,
      label: {
        tr: 'Konum',
        en: 'Location',
        ru: 'Местоположение',
        de: 'Standort',
      },
      admin: {
        description: {
          tr: 'Odanın konumu (örn: Kalkan eski şehir merkezi)',
          en: 'Room location (e.g., Kalkan old town center)',
          ru: 'Местоположение номера (например, центр старого города Калкан)',
          de: 'Zimmerstandort (z.B. Kalkan Altstadt)',
        },
      },
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: {
        tr: 'Kapak Resmi',
        en: 'Cover Image',
        ru: 'Обложка',
        de: 'Titelbild',
      },
    },
    {
      name: 'gallery',
      type: 'array',
      label: {
        tr: 'Galeri',
        en: 'Gallery',
        ru: 'Галерея',
        de: 'Galerie',
      },
      minRows: 0,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: {
            tr: 'Resim',
            en: 'Image',
            ru: 'Изображение',
            de: 'Bild',
          },
        },
      ],
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
      label: {
        tr: 'Oda Açıklaması',
        en: 'Room Description',
        ru: 'Описание номера',
        de: 'Zimmerbeschreibung',
      },
    },
    {
      name: 'floorPlan',
      type: 'richText',
      localized: true,
      label: {
        tr: 'Kat Planı',
        en: 'Floor Plan',
        ru: 'План этажа',
        de: 'Grundriss',
      },
      admin: {
        description: {
          tr: 'Odanın kat planı ve detaylı düzen bilgileri',
          en: 'Detailed floor plan and layout information',
          ru: 'Подробная информация о плане этажа и планировке',
          de: 'Detaillierte Grundriss- und Layoutinformationen',
        },
      },
    },
    {
      name: 'specialNotes',
      type: 'richText',
      localized: true,
      label: {
        tr: 'Özel Notlar ve Koşullar',
        en: 'Special Notes & Conditions',
        ru: 'Особые примечания и условия',
        de: 'Besondere Hinweise & Bedingungen',
      },
      admin: {
        description: {
          tr: 'Havuz sezonu, temizlik, hoş geldin paketi gibi özel bilgiler',
          en: 'Special information like pool season, cleaning, welcome pack, etc.',
          ru: 'Особая информация, такая как сезон бассейна, уборка, приветственный пакет и т.д.',
          de: 'Besondere Informationen wie Poolsaison, Reinigung, Willkommenspaket usw.',
        },
      },
    },
    {
      name: 'amenities',
      type: 'relationship',
      relationTo: 'amenities',
      hasMany: true,
      label: {
        tr: 'Oda Özellikleri',
        en: 'Room Amenities',
        ru: 'Удобства номера',
        de: 'Zimmerausstattung',
      },
    },
    {
      name: 'reviews',
      type: 'array',
      label: {
        tr: 'Yorumlar',
        en: 'Reviews',
        ru: 'Отзывы',
        de: 'Bewertungen',
      },
      minRows: 0,
      fields: [
        {
          name: 'guestName',
          type: 'text',
          label: {
            tr: 'Misafir Adı',
            en: 'Guest Name',
            ru: 'Имя гостя',
            de: 'Gastname',
          },
        },
        {
          name: 'rating',
          type: 'number',
          required: true,
          min: 1,
          max: 5,
          label: {
            tr: 'Puan (1-5)',
            en: 'Rating (1-5)',
            ru: 'Рейтинг (1-5)',
            de: 'Bewertung (1-5)',
          },
        },
        {
          name: 'comment',
          type: 'textarea',
          label: {
            tr: 'Yorum',
            en: 'Comment',
            ru: 'Комментарий',
            de: 'Kommentar',
          },
        },
        {
          name: 'date',
          type: 'date',
          label: {
            tr: 'Tarih',
            en: 'Date',
            ru: 'Дата',
            de: 'Datum',
          },
        },
      ],
    },
  ],
}