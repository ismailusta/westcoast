# GitHub Repository'yi Public Yapma

## Adımlar:

1. **GitHub'a git:**
   - https://github.com/ismailusta/westcoast adresine git

2. **Settings'e git:**
   - Repository sayfasında **Settings** sekmesine tıkla
   - Sol menüden en alta in → **Danger Zone** bölümüne git

3. **Change visibility:**
   - **Change visibility** butonuna tıkla
   - **Make public** seçeneğini seç
   - Repository adını yazarak onayla

4. **Vercel'de tekrar dene:**
   - Vercel dashboard'a dön
   - Repository'yi tekrar import et

## Alternatif: Private Repository ile Devam Et

Eğer repository'yi private tutmak istiyorsan:

1. **Vercel'de GitHub bağlantısını kontrol et:**
   - Vercel dashboard → **Settings** → **Git**
   - GitHub bağlantısının aktif olduğundan emin ol

2. **GitHub'da Vercel App'e izin ver:**
   - GitHub → **Settings** → **Applications** → **Authorized OAuth Apps**
   - Vercel'i bul ve **Configure** butonuna tıkla
   - Repository erişimlerini kontrol et
   - `westcoast` repository'sine erişim verildiğinden emin ol

3. **Vercel'de repository'yi manuel ekle:**
   - Vercel dashboard → **Add New Project**
   - **Import Git Repository** → GitHub'ı seç
   - Eğer repository görünmüyorsa, **Configure GitHub App** butonuna tıkla
   - Repository'leri seç ve `westcoast`'u ekle

