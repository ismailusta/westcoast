# Vercel'e Deploy Rehberi

## 🚀 Adım Adım Deploy

### 1. GitHub'a Push Et

```bash
# Git repository'yi kontrol et
git status

# Değişiklikleri ekle
git add .

# Commit yap
git commit -m "Production ready"

# GitHub'a push et
git push origin main
```

### 2. Vercel'e Bağla

1. **Vercel.com**'a git ve hesap oluştur/giriş yap
2. **"Add New Project"** butonuna tıkla
3. GitHub repository'ni seç
4. **Import** butonuna tıkla

### 3. Build Ayarları

Vercel otomatik olarak Next.js projesini algılar, ama şunları kontrol et:

- **Framework Preset**: Next.js
- **Root Directory**: `./` (kök dizin)
- **Build Command**: `pnpm build` (veya `npm run build`)
- **Output Directory**: `.next` (otomatik)
- **Install Command**: `pnpm install` (veya `npm install`)

### 4. Environment Variables Ekle

Vercel dashboard'da **Settings > Environment Variables** bölümüne git ve şunları ekle:

#### Zorunlu Değişkenler:

```
PAYLOAD_SECRET=buraya-güvenli-bir-secret-key-yaz
```

Secret key oluşturmak için:
```bash
# Windows PowerShell:
[Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes([System.Guid]::NewGuid().ToString() + [System.Guid]::NewGuid().ToString()))

# Linux/Mac:
openssl rand -base64 32
```

#### Veritabanı (PostgreSQL):

**Seçenek 1: Vercel Postgres (Önerilen)**
- Vercel dashboard'da **Storage > Create Database > Postgres** seç
- Otomatik olarak `POSTGRES_URL` environment variable'ı eklenir
- `DATABASE_URI` olarak kullan:
```
DATABASE_URI=postgresql://user:password@host:5432/database
```

**Seçenek 2: External PostgreSQL (Supabase, Neon, vb.)**
- Supabase, Neon, Railway gibi servislerden PostgreSQL al
- Connection string'i `DATABASE_URI` olarak ekle

#### MinIO / S3 Storage:

**Seçenek 1: AWS S3 (Önerilen)**
```
MINIO_ENDPOINT=s3.amazonaws.com
MINIO_ACCESS_KEY=your-aws-access-key
MINIO_SECRET_KEY=your-aws-secret-key
MINIO_BUCKET=your-bucket-name
MINIO_REGION=us-east-1
```

**Seçenek 2: Cloudflare R2**
```
MINIO_ENDPOINT=https://your-account-id.r2.cloudflarestorage.com
MINIO_ACCESS_KEY=your-r2-access-key
MINIO_SECRET_KEY=your-r2-secret-key
MINIO_BUCKET=your-bucket-name
MINIO_REGION=auto
```

**Seçenek 3: DigitalOcean Spaces**
```
MINIO_ENDPOINT=your-region.digitaloceanspaces.com
MINIO_ACCESS_KEY=your-spaces-key
MINIO_SECRET_KEY=your-spaces-secret
MINIO_BUCKET=your-bucket-name
MINIO_REGION=your-region
```

### 5. Deploy Et

1. **Deploy** butonuna tıkla
2. Build işlemi başlar (5-10 dakika sürebilir)
3. Deploy tamamlandığında URL'yi al

### 6. İlk Admin Kullanıcısını Oluştur

1. `https://your-project.vercel.app/admin` adresine git
2. İlk admin kullanıcısını oluştur

## ⚠️ Önemli Notlar

### PostgreSQL için:
- Vercel Postgres kullanıyorsan, connection pooling için `?pgbouncer=true` ekle:
```
DATABASE_URI=postgresql://user:password@host:5432/database?pgbouncer=true
```

### MinIO/S3 için:
- Production'da HTTPS endpoint kullan
- CORS ayarlarını yapılandır
- Bucket policy'lerini ayarla

### Build Timeout:
- Vercel'in build timeout'u 60 saniye (Hobby plan)
- Eğer build uzun sürüyorsa, Vercel Pro plan'a geç veya build'i optimize et

### Node.js Version:
- Vercel otomatik algılar, ama `package.json`'da `engines` belirtilmiş:
```json
"engines": {
  "node": "^18.20.2 || >=20.9.0"
}
```

## 🔧 Troubleshooting

### Build Hatası:
- `NODE_OPTIONS` environment variable ekle:
```
NODE_OPTIONS=--max-old-space-size=4096
```

### Database Connection Hatası:
- Connection string'i kontrol et
- SSL gerekiyorsa `?sslmode=require` ekle

### Image Upload Hatası:
- S3/MinIO credentials'ları kontrol et
- Bucket permissions'ları kontrol et
- CORS ayarlarını kontrol et

## 📝 Örnek Environment Variables

```
PAYLOAD_SECRET=your-secret-key-here
DATABASE_URI=postgresql://user:pass@host:5432/db?pgbouncer=true
MINIO_ENDPOINT=s3.amazonaws.com
MINIO_ACCESS_KEY=your-access-key
MINIO_SECRET_KEY=your-secret-key
MINIO_BUCKET=your-bucket-name
MINIO_REGION=us-east-1
NODE_OPTIONS=--max-old-space-size=4096
```

## 🎯 Sonraki Adımlar

1. Custom domain ekle (Vercel dashboard'dan)
2. SSL otomatik olarak eklenir
3. Analytics ekle (opsiyonel)
4. Monitoring ekle (opsiyonel)

