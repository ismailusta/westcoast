import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function POST(request: NextRequest) {
  try {
    const payload = await getPayload({ config })
    const formData = await request.formData()

    const guestName = formData.get('guestName') as string
    const email = formData.get('email') as string | null
    const rating = parseInt(formData.get('rating') as string)
    const comment = formData.get('comment') as string
    const images = formData.getAll('images') as File[]

    if (!guestName || !rating || !comment) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Görselleri önce Media collection'ına yükle
    const uploadedImages = []
    for (const image of images) {
      if (image.size > 0) {
        try {
          // FormData'dan gelen File objesini Buffer'a çevir
          const arrayBuffer = await image.arrayBuffer()
          const buffer = Buffer.from(arrayBuffer)
          
          // Payload CMS'in beklediği formatta dosya objesi oluştur
          // Payload CMS'in generateFileData fonksiyonu data, name, mimetype, size bekliyor
          const fileData = {
            data: buffer,
            name: image.name || `review-${Date.now()}.jpg`,
            mimetype: image.type || 'image/jpeg',
            size: image.size,
          }
          
          const uploaded = await payload.create({
            collection: 'media',
            data: {
              alt: `Review image by ${guestName}`,
              category: 'review', // Değerlendirme kategorisi
            },
            file: fileData as any, // Payload CMS'in beklediği formatta
          })
          uploadedImages.push({ image: uploaded.id })
        } catch (error: any) {
          console.error('Error uploading image:', error)
          console.error('Error details:', {
            message: error.message,
            status: error.status,
            data: error.data,
            cause: error.cause,
            stack: error.stack,
          })
          // Görsel yükleme hatası olsa bile devam et
        }
      }
    }

    // Review'ı oluştur
    const review = await payload.create({
      collection: 'reviews',
      data: {
        guestName,
        email: email || undefined,
        rating,
        comment,
        images: uploadedImages.length > 0 ? uploadedImages : undefined,
        showOnPage: false, // Varsayılan olarak false, admin onaylayacak
        isVerified: false,
      },
    })

    return NextResponse.json({ success: true, id: review.id })
  } catch (error: any) {
    console.error('Error creating review:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create review' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const payload = await getPayload({ config })
    const { searchParams } = new URL(request.url)
    
    // Payload CMS'in where clause formatını parse et
    // where[and][0][id][in][0]=1 formatı
    let id: string | null = null
    
    // Önce direkt id parametresini kontrol et
    id = searchParams.get('id')
    
    // Eğer yoksa, where clause'dan parse et
    if (!id) {
      // URL encoded format: where%5Band%5D%5B0%5D%5Bid%5D%5Bin%5D%5B0%5D=1
      id = searchParams.get('where%5Band%5D%5B0%5D%5Bid%5D%5Bin%5D%5B0%5D')
    }
    
    // Eğer hala yoksa, decoded formatı dene
    if (!id) {
      id = searchParams.get('where[and][0][id][in][0]')
    }
    
    // Tüm searchParams'ı kontrol et, where ile başlayan parametreleri bul
    if (!id) {
      for (const [key, value] of searchParams.entries()) {
        if (key.includes('id') && key.includes('in')) {
          id = value
          break
        }
      }
    }
    
    if (!id) {
      return NextResponse.json(
        { error: 'Review ID is required' },
        { status: 400 }
      )
    }

    // Review'ı sil
    await payload.delete({
      collection: 'reviews',
      id: parseInt(id),
    })

    return NextResponse.json({ success: true, message: 'Review deleted successfully' })
  } catch (error: any) {
    console.error('Error deleting review:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to delete review' },
      { status: 500 }
    )
  }
}

  