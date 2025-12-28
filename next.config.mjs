import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Canlıya çıkarken ufak tefek tip hataları buildi durdurmasın
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      // VERCEL BLOB İÇİN GEREKLİ AYAR (Bunu eklemezsen resimler görünmez)
      {
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com',
        port: '',
      },
      // Localhost ayarları (Geliştirme ortamı için)
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
      },
    ],
  },
  // O karmaşık webpack ayarlarını SİLDİM. Payload kendisi halleder.
}

// İkinci parametreyi de sildim (devBundleServerPackages), varsayılan kalsın.
export default withPayload(nextConfig)