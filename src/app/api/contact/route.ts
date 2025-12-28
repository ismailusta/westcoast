import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    const payload = await getPayload({ config })
    const body = await request.json()

    const { name, email, phone, subject, message } = body

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Contact'ı oluştur
    const contact = await payload.create({
      collection: 'contacts',
      data: {
        name,
        email,
        phone: phone || undefined,
        subject,
        message,
        read: false,
      },
    })

    // E-posta ayarlarını al
    const settings = await payload.findGlobal({
      slug: 'contact-settings',
    })

    // E-posta gönder (eğer ayarlar yapılandırılmışsa)
    if (settings?.notificationEmails && settings.notificationEmails.length > 0) {
      try {
        // SMTP ayarları kontrol et
        if (settings.smtpHost && settings.smtpUser && settings.smtpPassword) {
          const port = settings.smtpPort || 587
          const isSecurePort = port === 465
          
          const transporter = nodemailer.createTransport({
            host: settings.smtpHost,
            port: port,
            secure: isSecurePort, // true for 465, false for other ports
            requireTLS: !isSecurePort && (settings.smtpSecure || true), // TLS gerektir (port 587 için)
            auth: {
              user: settings.smtpUser,
              pass: settings.smtpPassword,
            },
            tls: {
              // Gmail için gerekli
              rejectUnauthorized: false,
            },
          })

          // E-posta içeriği
          const emailContent = `
Yeni İletişim Formu Mesajı

Gönderen Bilgileri:
- Ad Soyad: ${name}
- E-posta: ${email}
- Telefon: ${phone || 'Belirtilmemiş'}

Konu: ${subject}

Mesaj:
${message}

---
Bu mesaj ${new Date().toLocaleString('tr-TR')} tarihinde gönderilmiştir.
Gönderen: ${name} (${email})
          `.trim()

          // Tüm bildirim e-postalarına gönder
          const emailPromises = settings.notificationEmails.map(async (recipient: { email: string; name?: string | null }) => {
            const recipientEmail = recipient.email
            if (!recipientEmail) return Promise.resolve()
            
            try {
              await transporter.sendMail({
                from: `"${settings.smtpUser}" <${settings.smtpUser}>`,
                to: recipientEmail,
                subject: `Yeni İletişim Formu: ${subject}`,
                text: emailContent,
                html: `
                  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #C5A059; border-bottom: 2px solid #C5A059; padding-bottom: 10px;">Yeni İletişim Formu Mesajı</h2>
                    
                    <div style="background: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
                      <h3 style="color: #333; margin-top: 0; margin-bottom: 15px;">Gönderen Bilgileri</h3>
                      <p style="margin: 8px 0;"><strong>Ad Soyad:</strong> <span style="color: #C5A059;">${name}</span></p>
                      <p style="margin: 8px 0;"><strong>E-posta:</strong> <a href="mailto:${email}" style="color: #C5A059; text-decoration: none;">${email}</a></p>
                      <p style="margin: 8px 0;"><strong>Telefon:</strong> ${phone || 'Belirtilmemiş'}</p>
                    </div>
                    
                    <div style="background: #fff; padding: 20px; border-left: 4px solid #C5A059; margin: 20px 0;">
                      <p style="margin-top: 0;"><strong style="color: #333;">Konu:</strong> <span style="color: #666;">${subject}</span></p>
                      <hr style="border: none; border-top: 1px solid #eee; margin: 15px 0;">
                      <p style="margin-bottom: 10px;"><strong style="color: #333;">Mesaj:</strong></p>
                      <p style="white-space: pre-wrap; color: #555; line-height: 1.6; margin: 0;">${message}</p>
                    </div>
                    
                    <div style="background: #fafafa; padding: 15px; border-radius: 5px; margin-top: 20px;">
                      <p style="color: #666; font-size: 12px; margin: 0;">
                        <strong>Gönderen:</strong> ${name} (${email})<br>
                        <strong>Tarih:</strong> ${new Date().toLocaleString('tr-TR')}
                      </p>
                    </div>
                  </div>
                `,
              })
            } catch (error: any) {
              // E-posta gönderme hatası olsa bile devam et
              console.error('Error sending email:', error)
            }
          })

          await Promise.allSettled(emailPromises)
        }
      } catch (emailError: any) {
        // E-posta gönderme hatası olsa bile contact kaydı başarılı sayılır
        console.error('Error sending email:', emailError)
      }
    }

    return NextResponse.json({ success: true, id: contact.id })
  } catch (error: any) {
    console.error('Error creating contact:', error)
    return NextResponse.json(
      { error: 'Failed to submit contact form', details: error.message },
      { status: 500 }
    )
  }
}

