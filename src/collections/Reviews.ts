import type { CollectionConfig } from 'payload'

export const Reviews: CollectionConfig = {
  slug: 'reviews',
  labels: {
    singular: {
      tr: 'Değerlendirme',
      en: 'Review',
      ru: 'Отзыв',
      de: 'Bewertung',
    },
    plural: {
      tr: 'Değerlendirmeler',
      en: 'Reviews',
      ru: 'Отзывы',
      de: 'Bewertungen',
    },
  },
  admin: {
    useAsTitle: 'guestName',
    group: {
      tr: 'Otel Yönetimi',
      en: 'Hotel Management',
      ru: 'Управление отелем',
      de: 'Hotelverwaltung',
    },
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'guestName',
      type: 'text',
      required: true,
      label: {
        tr: 'Misafir Adı',
        en: 'Guest Name',
        ru: 'Имя гостя',
        de: 'Gastname',
      },
    },
    {
      name: 'email',
      type: 'email',
      label: {
        tr: 'E-posta (Opsiyonel)',
        en: 'Email (Optional)',
        ru: 'Email (необязательно)',
        de: 'E-Mail (Optional)',
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
      required: true,
      label: {
        tr: 'Yorum',
        en: 'Comment',
        ru: 'Комментарий',
        de: 'Kommentar',
      },
    },
    {
      name: 'images',
      type: 'array',
      label: {
        tr: 'Görseller',
        en: 'Images',
        ru: 'Изображения',
        de: 'Bilder',
      },
      minRows: 0,
      maxRows: 4,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: {
            tr: 'Görsel',
            en: 'Image',
            ru: 'Изображение',
            de: 'Bild',
          },
        },
      ],
    },
    {
      name: 'roomType',
      type: 'relationship',
      relationTo: 'room-types',
      label: {
        tr: 'Oda Tipi (Opsiyonel)',
        en: 'Room Type (Optional)',
        ru: 'Тип номера (необязательно)',
        de: 'Zimmertyp (Optional)',
      },
      admin: {
        description: {
          tr: 'Eğer belirli bir oda hakkında yorum yapıyorsa seçin',
          en: 'Select if reviewing a specific room',
          ru: 'Выберите, если отзыв о конкретном номере',
          de: 'Auswählen, wenn Bewertung für ein bestimmtes Zimmer',
        },
      },
    },
    {
      name: 'showOnPage',
      type: 'checkbox',
      defaultValue: false,
      label: {
        tr: 'Sayfada Göster',
        en: 'Show on Page',
        ru: 'Показать на странице',
        de: 'Auf Seite anzeigen',
      },
      admin: {
        description: {
          tr: 'Bu yorumun frontend\'de gösterilmesini istiyorsanız işaretleyin',
          en: 'Check to display this review on the frontend',
          ru: 'Отметьте, чтобы отобразить этот отзыв на фронтенде',
          de: 'Aktivieren, um diese Bewertung im Frontend anzuzeigen',
        },
      },
    },
    {
      name: 'isVerified',
      type: 'checkbox',
      defaultValue: false,
      label: {
        tr: 'Doğrulanmış Misafir',
        en: 'Verified Guest',
        ru: 'Подтвержденный гость',
        de: 'Verifizierter Gast',
      },
      admin: {
        description: {
          tr: 'Bu misafir gerçekten konakladıysa işaretleyin',
          en: 'Check if this guest actually stayed',
          ru: 'Отметьте, если этот гость действительно останавливался',
          de: 'Aktivieren, wenn dieser Gast tatsächlich übernachtet hat',
        },
      },
    },
  ],
  timestamps: true,
}

