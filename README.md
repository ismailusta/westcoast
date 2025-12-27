# Westcoast Otel Yönetim Sistemi

Payload CMS ve Next.js ile geliştirilmiş modern otel yönetim sistemi.

## 🚀 Başka Bir Bilgisayardan Kullanım

### Gereksinimler

- **Node.js** (v18.20.2 veya üzeri, v20.9.0+ önerilir)
- **pnpm** (v9 veya v10)
- **Docker** ve **Docker Compose** (veritabanı ve dosya depolama için)

### Kurulum Adımları

1. **Projeyi GitHub'dan klonlayın:**
   ```bash
   git clone https://github.com/ismailusta/westcoast.git
   cd westcoast
   ```

2. **Bağımlılıkları yükleyin:**
   ```bash
   pnpm install
   ```

3. **Environment değişkenlerini ayarlayın:**
   ```bash
   cp .env.example .env
   ```
   
   `.env` dosyasını açın ve `PAYLOAD_SECRET` değerini değiştirin. Güvenli bir secret key oluşturmak için:
   ```bash
   # Windows PowerShell için:
   [Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes([System.Guid]::NewGuid().ToString() + [System.Guid]::NewGuid().ToString()))
   
   # Linux/Mac için:
   openssl rand -base64 32
   ```

4. **Docker servislerini başlatın (PostgreSQL ve MinIO):**
   ```bash
   docker-compose up -d
   ```
   
   Bu komut şunları başlatır:
   - PostgreSQL veritabanı (port 5432)
   - MinIO dosya depolama (port 9000 ve 9001)

5. **Geliştirme sunucusunu başlatın:**
   ```bash
   pnpm dev
   ```

6. **Tarayıcıda açın:**
   - Frontend: http://localhost:3000
   - Admin Panel: http://localhost:3000/admin
   - MinIO Console: http://localhost:9001 (kullanıcı: minioadmin, şifre: minioadmin)

7. **İlk admin kullanıcısını oluşturun:**
   - Admin paneline gidin (http://localhost:3000/admin)
   - Ekrandaki talimatları takip ederek ilk admin kullanıcısını oluşturun

### Docker Servislerini Durdurma

```bash
docker-compose down
```

Verileri de silmek isterseniz:
```bash
docker-compose down -v
```

### Önemli Notlar

- `db_data` ve `minio_data` klasörleri `.gitignore`'da olduğu için GitHub'a yüklenmez
- Her yeni bilgisayarda bu klasörler Docker tarafından otomatik oluşturulur
- Production ortamında `PAYLOAD_SECRET` değerini mutlaka değiştirin

## 📋 Proje Yapısı

### Collections (Veri Modelleri)

- **Users**: Admin panel erişimi olan kullanıcılar
- **Media**: Resim ve dosya yükleme koleksiyonu (otomatik boyutlandırma özellikli)
- **Amenities**: Otel olanakları (WiFi, Havuz, vb.)
- **RoomTypes**: Oda tipleri (Standart, Deluxe, Suite, vb.)

### Teknolojiler

- **Next.js 15**: React framework
- **Payload CMS 3.0**: Headless CMS
- **PostgreSQL**: Veritabanı
- **MinIO**: S3 uyumlu dosya depolama
- **TypeScript**: Tip güvenliği
- **Tailwind CSS**: Stil framework'ü

## 🛠️ Geliştirme

### Scripts

```bash
# Geliştirme sunucusunu başlat
pnpm dev

# Production build
pnpm build

# Production sunucusunu başlat
pnpm start

# TypeScript tiplerini oluştur
pnpm generate:types

# Lint kontrolü
pnpm lint

# Testler
pnpm test
```

## 📝 Environment Değişkenleri

`.env` dosyasında aşağıdaki değişkenler bulunur:

- `PAYLOAD_SECRET`: Payload CMS için güvenlik anahtarı (zorunlu)
- `DATABASE_URI`: PostgreSQL bağlantı string'i
- `MINIO_ENDPOINT`: MinIO sunucu adresi
- `MINIO_ACCESS_KEY`: MinIO erişim anahtarı
- `MINIO_SECRET_KEY`: MinIO gizli anahtar
- `MINIO_BUCKET`: MinIO bucket adı
- `MINIO_REGION`: MinIO bölge

## ❓ Sorular ve Destek

Sorularınız için:
- [Payload CMS Discord](https://discord.com/invite/payload)
- [GitHub Discussions](https://github.com/payloadcms/payload/discussions)
