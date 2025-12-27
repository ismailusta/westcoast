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
  ],
}