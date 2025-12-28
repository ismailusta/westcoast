'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useLocale } from '../LocaleProvider'
import { getTranslation } from '@/lib/translations'

export const ContactPageContent = () => {
  const { locale } = useLocale()
  const t = getTranslation(locale)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setSubmitSuccess(true)
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
        setTimeout(() => setSubmitSuccess(false), 5000)
      } else {
        setError(data.error || (locale === 'tr' ? 'Bir hata oluştu' : locale === 'en' ? 'An error occurred' : locale === 'ru' ? 'Произошла ошибка' : 'Ein Fehler ist aufgetreten'))
      }
    } catch (error) {
      console.error('Error submitting contact form:', error)
      setError(locale === 'tr' ? 'Bir hata oluştu, lütfen tekrar deneyin' : locale === 'en' ? 'An error occurred, please try again' : locale === 'ru' ? 'Произошла ошибка, попробуйте еще раз' : 'Ein Fehler ist aufgetreten, bitte versuchen Sie es erneut')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="pt-32 pb-24">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mb-20 text-center">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary text-xs uppercase tracking-[0.5em] mb-4 block"
          >
            {t.footer.contact}
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl text-secondary leading-tight mb-6"
          >
            {locale === 'tr' ? 'Bizimle' : locale === 'en' ? 'Get In' : locale === 'ru' ? 'Свяжитесь' : 'Kontaktieren Sie'} <br />
            <span className="serif-italic text-primary">
              {locale === 'tr' ? 'İletişime Geçin' : locale === 'en' ? 'Touch' : locale === 'ru' ? 'с нами' : 'Sie uns'}
            </span>
          </motion.h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div>
              <h3 className="text-2xl font-serif text-secondary mb-6">
                {locale === 'tr' ? 'İletişim Bilgileri' : locale === 'en' ? 'Contact Information' : locale === 'ru' ? 'Контактная информация' : 'Kontaktinformationen'}
              </h3>
              <div className="space-y-6 text-secondary/70">
                <div className="flex items-start gap-4">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary mt-1 flex-shrink-0">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <div>
                    <p className="font-medium mb-1">123 Luxury Ave, Ocean View</p>
                    <p className="text-sm text-secondary/50">Istanbul, Turkey</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary mt-1 flex-shrink-0">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <div>
                    <p className="font-medium">+90 (212) 555 0100</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary mt-1 flex-shrink-0">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  <div>
                    <p className="font-medium">hello@westcoasthotel.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-secondary/10">
              <h3 className="text-2xl font-serif text-secondary mb-6">
                {locale === 'tr' ? 'Çalışma Saatleri' : locale === 'en' ? 'Working Hours' : locale === 'ru' ? 'Часы работы' : 'Öffnungszeiten'}
              </h3>
              <div className="space-y-3 text-secondary/70">
                <div className="flex justify-between">
                  <span>{locale === 'tr' ? 'Pazartesi - Cuma' : locale === 'en' ? 'Monday - Friday' : locale === 'ru' ? 'Понедельник - Пятница' : 'Montag - Freitag'}</span>
                  <span className="font-medium">09:00 - 18:00</span>
                </div>
                <div className="flex justify-between">
                  <span>{locale === 'tr' ? 'Cumartesi' : locale === 'en' ? 'Saturday' : locale === 'ru' ? 'Суббота' : 'Samstag'}</span>
                  <span className="font-medium">10:00 - 16:00</span>
                </div>
                <div className="flex justify-between">
                  <span>{locale === 'tr' ? 'Pazar' : locale === 'en' ? 'Sunday' : locale === 'ru' ? 'Воскресенье' : 'Sonntag'}</span>
                  <span className="font-medium">{locale === 'tr' ? 'Kapalı' : locale === 'en' ? 'Closed' : locale === 'ru' ? 'Закрыто' : 'Geschlossen'}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm uppercase tracking-wider text-secondary mb-2 font-medium">
                  {locale === 'tr' ? 'Adınız' : locale === 'en' ? 'Your Name' : locale === 'ru' ? 'Ваше имя' : 'Ihr Name'} *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-secondary/20 focus:border-primary focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm uppercase tracking-wider text-secondary mb-2 font-medium">
                  {locale === 'tr' ? 'E-posta' : locale === 'en' ? 'Email' : locale === 'ru' ? 'Email' : 'E-Mail'} *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-secondary/20 focus:border-primary focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm uppercase tracking-wider text-secondary mb-2 font-medium">
                  {locale === 'tr' ? 'Telefon' : locale === 'en' ? 'Phone' : locale === 'ru' ? 'Телефон' : 'Telefon'}
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-secondary/20 focus:border-primary focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm uppercase tracking-wider text-secondary mb-2 font-medium">
                  {locale === 'tr' ? 'Konu' : locale === 'en' ? 'Subject' : locale === 'ru' ? 'Тема' : 'Betreff'} *
                </label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 border border-secondary/20 focus:border-primary focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm uppercase tracking-wider text-secondary mb-2 font-medium">
                  {locale === 'tr' ? 'Mesajınız' : locale === 'en' ? 'Your Message' : locale === 'ru' ? 'Ваше сообщение' : 'Ihre Nachricht'} *
                </label>
                <textarea
                  required
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 border border-secondary/20 focus:border-primary focus:outline-none resize-none transition-colors"
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm">
                  {error}
                </div>
              )}
              {submitSuccess && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 text-sm">
                  {locale === 'tr' ? 'Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.' : locale === 'en' ? 'Your message has been sent successfully! We will get back to you soon.' : locale === 'ru' ? 'Ваше сообщение успешно отправлено! Мы свяжемся с вами в ближайшее время.' : 'Ihre Nachricht wurde erfolgreich gesendet! Wir werden uns bald bei Ihnen melden.'}
                </div>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-secondary text-white py-4 text-sm uppercase tracking-wider font-bold hover:bg-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting 
                  ? (locale === 'tr' ? 'Gönderiliyor...' : locale === 'en' ? 'Sending...' : locale === 'ru' ? 'Отправка...' : 'Wird gesendet...')
                  : (locale === 'tr' ? 'Gönder' : locale === 'en' ? 'Send' : locale === 'ru' ? 'Отправить' : 'Senden')
                }
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

