import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob' // DEĞİŞTİ: S3 yerine Blob import edildi
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Amenities } from './collections/Amenities'
import { RoomTypes } from './collections/RoomTypes'
import { Reviews } from './collections/Reviews'
import { Contacts } from './collections/Contacts'
import { FAQs } from './collections/FAQs'
import { ContactSettings } from './globals/ContactSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: '- Otel Yönetim Sistemi',
    },
  },
  collections: [Users, Media, Amenities, RoomTypes, Reviews, Contacts, FAQs],
  globals: [ContactSettings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      // Neon DB için Vercel'deki DATABASE_URL'i kullanır
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  sharp,
  plugins: [
    // DEĞİŞTİ: Minio (s3Storage) silindi, yerine Vercel Blob eklendi
    vercelBlobStorage({
      enabled: true, // Her zaman aktif (Vercel ortam değişkeni varsa çalışır)
      token: process.env.BLOB_READ_WRITE_TOKEN, // Vercel'in otomatik atadığı token
      collections: {
        media: true, // 'Media' koleksiyonundaki resimleri Blob'a yükler
      },
    }),
  ],
  localization: {
    locales: [
      {
        label: 'Türkçe',
        code: 'tr',
      },
      {
        label: 'English',
        code: 'en',
      },
      {
        label: 'Русский',
        code: 'ru',
      },
      {
        label: 'Deutsch',
        code: 'de',
      },
    ],
    defaultLocale: 'tr',
    fallback: true,
  },
})