import type { GlobalConfig } from 'payload'

export const ContactSettings: GlobalConfig = {
  slug: 'contact-settings',
  label: {
    tr: 'İletişim Ayarları',
    en: 'Contact Settings',
    ru: 'Настройки контактов',
    de: 'Kontakteinstellungen',
  },
  access: {
    read: () => true,
    update: () => true, // Admin güncelleyebilir
  },
  fields: [
    {
      name: 'notificationEmails',
      type: 'array',
      label: {
        tr: 'Bildirim E-posta Adresleri',
        en: 'Notification Email Addresses',
        ru: 'Адреса электронной почты для уведомлений',
        de: 'Benachrichtigungs-E-Mail-Adressen',
      },
      admin: {
        description: {
          tr: 'İletişim formu gönderildiğinde bildirim gönderilecek e-posta adresleri',
          en: 'Email addresses to receive notifications when contact form is submitted',
          ru: 'Адреса электронной почты для получения уведомлений при отправке контактной формы',
          de: 'E-Mail-Adressen, die Benachrichtigungen erhalten, wenn das Kontaktformular übermittelt wird',
        },
      },
      minRows: 1,
      fields: [
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
          name: 'name',
          type: 'text',
          label: {
            tr: 'İsim (Opsiyonel)',
            en: 'Name (Optional)',
            ru: 'Имя (необязательно)',
            de: 'Name (Optional)',
          },
        },
      ],
    },
    {
      name: 'smtpHost',
      type: 'text',
      label: {
        tr: 'SMTP Sunucu',
        en: 'SMTP Host',
        ru: 'SMTP Сервер',
        de: 'SMTP-Server',
      },
      admin: {
        description: {
          tr: 'E-posta göndermek için SMTP sunucu adresi (örn: smtp.gmail.com)',
          en: 'SMTP server address for sending emails (e.g., smtp.gmail.com)',
          ru: 'Адрес SMTP-сервера для отправки электронной почты (например, smtp.gmail.com)',
          de: 'SMTP-Serveradresse zum Senden von E-Mails (z. B. smtp.gmail.com)',
        },
      },
    },
    {
      name: 'smtpPort',
      type: 'number',
      label: {
        tr: 'SMTP Port',
        en: 'SMTP Port',
        ru: 'SMTP Порт',
        de: 'SMTP-Port',
      },
      defaultValue: 587,
      admin: {
        description: {
          tr: 'SMTP port numarası (genellikle 587 veya 465)',
          en: 'SMTP port number (usually 587 or 465)',
          ru: 'Номер порта SMTP (обычно 587 или 465)',
          de: 'SMTP-Portnummer (normalerweise 587 oder 465)',
        },
      },
    },
    {
      name: 'smtpUser',
      type: 'text',
      label: {
        tr: 'SMTP Kullanıcı Adı',
        en: 'SMTP Username',
        ru: 'SMTP Имя пользователя',
        de: 'SMTP-Benutzername',
      },
      admin: {
        description: {
          tr: 'SMTP kullanıcı adı (genellikle e-posta adresi)',
          en: 'SMTP username (usually email address)',
          ru: 'Имя пользователя SMTP (обычно адрес электронной почты)',
          de: 'SMTP-Benutzername (normalerweise E-Mail-Adresse)',
        },
      },
    },
    {
      name: 'smtpPassword',
      type: 'text',
      label: {
        tr: 'SMTP Şifre',
        en: 'SMTP Password',
        ru: 'SMTP Пароль',
        de: 'SMTP-Passwort',
      },
      admin: {
        description: {
          tr: 'SMTP şifresi (güvenlik için environment variable kullanılması önerilir)',
          en: 'SMTP password (recommended to use environment variable for security)',
          ru: 'Пароль SMTP (рекомендуется использовать переменную окружения для безопасности)',
          de: 'SMTP-Passwort (empfohlen, Umgebungsvariable für Sicherheit zu verwenden)',
        },
      },
    },
    {
      name: 'smtpSecure',
      type: 'checkbox',
      label: {
        tr: 'Güvenli Bağlantı (TLS)',
        en: 'Secure Connection (TLS)',
        ru: 'Безопасное соединение (TLS)',
        de: 'Sichere Verbindung (TLS)',
      },
      defaultValue: true,
    },
  ],
}

