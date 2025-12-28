            import type { CollectionConfig } from 'payload'

export const FAQs: CollectionConfig = {
  slug: 'faqs',
  labels: {
    singular: {
      tr: 'Sıkça Sorulan Soru',
      en: 'FAQ',
      ru: 'Часто задаваемый вопрос',
      de: 'FAQ',
    },
    plural: {
      tr: 'Sıkça Sorulan Sorular',
      en: 'FAQs',
      ru: 'Часто задаваемые вопросы',
      de: 'FAQs',
    },
  },
  admin: {
    useAsTitle: 'question',
    group: {
      tr: 'İçerik',
      en: 'Content',
      ru: 'Контент',
      de: 'Inhalt',
    },
    defaultColumns: ['question', 'category', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'question',
      type: 'text',
      required: true,
      localized: true,
      label: {
        tr: 'Soru',
        en: 'Question',
        ru: 'Вопрос',
        de: 'Frage',
      },
    },
    {
      name: 'answer',
      type: 'richText',
      required: true,
      localized: true,
      label: {
        tr: 'Cevap',
        en: 'Answer',
        ru: 'Ответ',
        de: 'Antwort',
      },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      localized: true,
      options: [
        {
          label: {
            tr: 'Genel',
            en: 'General',
            ru: 'Общие',
            de: 'Allgemein',
          },
          value: 'general',
        },
        {
          label: {
            tr: 'Rezervasyon',
            en: 'Reservation',
            ru: 'Бронирование',
            de: 'Reservierung',
          },
          value: 'reservation',
        },
        {
          label: {
            tr: 'Odalar',
            en: 'Rooms',
            ru: 'Номера',
            de: 'Zimmer',
          },
          value: 'rooms',
        },
        {
          label: {
            tr: 'Hizmetler',
            en: 'Services',
            ru: 'Услуги',
            de: 'Dienstleistungen',
          },
          value: 'services',
        },
        {
          label: {
            tr: 'İletişim',
            en: 'Contact',
            ru: 'Контакты',
            de: 'Kontakt',
          },
          value: 'contact',
        },
      ],
      defaultValue: 'general',
      label: {
        tr: 'Kategori',
        en: 'Category',
        ru: 'Категория',
        de: 'Kategorie',
      },
    },
    {
      name: 'order',
      type: 'number',
      label: {
        tr: 'Sıralama',
        en: 'Order',
        ru: 'Порядок',
        de: 'Reihenfolge',
      },
      admin: {
        description: {
          tr: 'Düşük sayılar önce gösterilir',
          en: 'Lower numbers are shown first',
          ru: 'Меньшие числа отображаются первыми',
          de: 'Niedrigere Zahlen werden zuerst angezeigt',
        },
      },
      defaultValue: 0,
    },
  ],
  timestamps: true,
}

