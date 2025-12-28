import type { CollectionConfig } from 'payload'

export const Contacts: CollectionConfig = {
  slug: 'contacts',
  labels: {
    singular: {
      tr: 'İletişim',
      en: 'Contact',
      ru: 'Контакт',
      de: 'Kontakt',
    },
    plural: {
      tr: 'İletişimler',
      en: 'Contacts',
      ru: 'Контакты',
      de: 'Kontakte',
    },
  },
  admin: {
    useAsTitle: 'name',
    group: {
      tr: 'İletişim',
      en: 'Contact',
      ru: 'Контакт',
      de: 'Kontakt',
    },
  },
  access: {
    read: () => true,
    create: () => true, // Herkes form gönderebilir
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: {
        tr: 'Ad Soyad',
        en: 'Name',
        ru: 'Имя',
        de: 'Name',
      },
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      label: {
        tr: 'E-posta',
        en: 'Email',
        ru: 'Email',
        de: 'E-Mail',
      },
    },
    {
      name: 'phone',
      type: 'text',
      label: {
        tr: 'Telefon',
        en: 'Phone',
        ru: 'Телефон',
        de: 'Telefon',
      },
    },
    {
      name: 'subject',
      type: 'text',
      required: true,
      label: {
        tr: 'Konu',
        en: 'Subject',
        ru: 'Тема',
        de: 'Betreff',
      },
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
      label: {
        tr: 'Mesaj',
        en: 'Message',
        ru: 'Сообщение',
        de: 'Nachricht',
      },
    },
    {
      name: 'read',
      type: 'checkbox',
      defaultValue: false,
      label: {
        tr: 'Okundu',
        en: 'Read',
        ru: 'Прочитано',
        de: 'Gelesen',
      },
    },
  ],
  timestamps: true,
}

