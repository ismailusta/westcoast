import type { CollectionConfig } from 'payload'

export const Amenities: CollectionConfig = {
  slug: 'amenities',
  labels: {
    singular: {
      tr: 'Özellik',
      en: 'Amenity',
      ru: 'Удобство',
      de: 'Ausstattung',
    },
    plural: {
      tr: 'Özellikler',
      en: 'Amenities',
      ru: 'Удобства',
      de: 'Ausstattungen',
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
    read: () => true, // Herkes okuyabilsin (Site tarafı için)
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      label: {
        tr: 'Özellik Adı',
        en: 'Amenity Name',
        ru: 'Название удобства',
        de: 'Ausstattungsname',
      },
    },
    {
      name: 'icon',
      type: 'text',
      label: {
        tr: 'İkon Kodu',
        en: 'Icon Code',
        ru: 'Код иконки',
        de: 'Symbolcode',
      },
      admin: {
        description: {
          tr: 'Lucide veya FontAwesome ikon adı (örn: wifi, wind, tv).',
          en: 'Lucide or FontAwesome icon name (e.g., wifi, wind, tv).',
          ru: 'Название иконки Lucide или FontAwesome (например: wifi, wind, tv).',
          de: 'Lucide- oder FontAwesome-Symbolname (z.B. wifi, wind, tv).',
        },
      },
    },
  ],
}