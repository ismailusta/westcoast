'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useLocale } from '../LocaleProvider'
import { getTranslation } from '@/lib/translations'

export const ReviewForm = () => {
  const { locale } = useLocale()
  const t = getTranslation(locale)
  const [formData, setFormData] = useState({
    guestName: '',
    email: '',
    rating: 0,
    comment: '',
    images: [] as File[],
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      const formDataToSend = new FormData()
      formDataToSend.append('guestName', formData.guestName)
      if (formData.email) {
        formDataToSend.append('email', formData.email)
      }
      formDataToSend.append('rating', formData.rating.toString())
      formDataToSend.append('comment', formData.comment)
      
      formData.images.forEach((image) => {
        formDataToSend.append('images', image)
      })

      const response = await fetch('/api/reviews', {
        method: 'POST',
        body: formDataToSend,
      })

      const data = await response.json()

      if (response.ok) {
        setSubmitSuccess(true)
        setFormData({ guestName: '', email: '', rating: 0, comment: '', images: [] })
        setTimeout(() => setSubmitSuccess(false), 5000)
      } else {
        setError(data.error || 'Bir hata oluştu')
      }
    } catch (error) {
      console.error('Error submitting review:', error)
      setError('Bir hata oluştu, lütfen tekrar deneyin')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="reviews" className="py-32 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif text-secondary mb-12"
          >
            {t.reviews?.title || 'Değerlendirmenizi Paylaşın'}
          </motion.h2>

          {submitSuccess ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-primary/10 border border-primary p-8 text-center"
            >
              <p className="text-secondary font-serif text-lg">
                {t.reviews?.success || 'Değerlendirmeniz için teşekkürler! Onaylandıktan sonra yayınlanacaktır.'}
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm uppercase tracking-wider text-secondary mb-2 font-medium">
                  {t.reviews?.name || 'Adınız'} *
                </label>
                <input
                  type="text"
                  required
                  value={formData.guestName}
                  onChange={(e) => setFormData({ ...formData, guestName: e.target.value })}
                  className="w-full px-4 py-3 border border-secondary/20 focus:border-primary focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm uppercase tracking-wider text-secondary mb-2 font-medium">
                  {t.reviews?.email || 'E-posta (Opsiyonel)'}
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-secondary/20 focus:border-primary focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm uppercase tracking-wider text-secondary mb-4 font-medium">
                  {t.reviews?.rating || 'Puanınız'} *
                </label>
                <div className="flex gap-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFormData({ ...formData, rating: star })}
                      className={`text-4xl transition-all hover:scale-110 ${
                        star <= formData.rating ? 'text-primary' : 'text-secondary/20'
                      }`}
                    >
                      ★
                    </button>
                  ))}
                </div>
                {formData.rating > 0 && (
                  <p className="text-sm text-secondary/60 mt-2">
                    {formData.rating} / 5
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm uppercase tracking-wider text-secondary mb-2 font-medium">
                  {t.reviews?.comment || 'Yorumunuz'} *
                </label>
                <textarea
                  required
                  rows={6}
                  value={formData.comment}
                  onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                  className="w-full px-4 py-3 border border-secondary/20 focus:border-primary focus:outline-none resize-none transition-colors"
                  placeholder={t.reviews?.comment || 'Yorumunuzu buraya yazın...'}
                />
              </div>

              <div>
                <label className="block text-sm uppercase tracking-wider text-secondary mb-2 font-medium">
                  {t.reviews?.images || 'Görseller (Opsiyonel, Max 4)'}
                </label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => {
                    const files = Array.from(e.target.files || [])
                    setFormData({ ...formData, images: files.slice(0, 4) })
                  }}
                  className="w-full px-4 py-3 border border-secondary/20 focus:border-primary focus:outline-none transition-colors"
                />
                {formData.images.length > 0 && (
                  <p className="text-sm text-secondary/60 mt-2">
                    {formData.images.length} görsel seçildi
                  </p>
                )}
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 p-4 text-red-600 text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting || formData.rating === 0}
                className="w-full bg-secondary text-white py-4 text-sm uppercase tracking-wider font-bold hover:bg-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (t.reviews?.submitting || 'Gönderiliyor...') : (t.reviews?.submit || 'Gönder')}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

