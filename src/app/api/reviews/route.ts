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
          const buffer = await image.arrayBuffer()
          const uploaded = await payload.create({
            collection: 'media',
            data: {
              alt: `Review image by ${guestName}`,
            },
            file: new File([buffer], image.name, { type: image.type }),
          })
          uploadedImages.push({ image: uploaded.id })
        } catch (error) {
          console.error('Error uploading image:', error)
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

