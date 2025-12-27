import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const locales = ['tr', 'en', 'ru', 'de']
const defaultLocale = 'tr'

export function middleware(request: NextRequest) {
  // Cookie'den locale'i al
  const locale = request.cookies.get('locale')?.value || defaultLocale
  
  // Geçerli bir locale değilse default'a ayarla
  if (!locales.includes(locale)) {
    const response = NextResponse.next()
    response.cookies.set('locale', defaultLocale)
    return response
  }

  // Cookie'yi response'a ekle
  const response = NextResponse.next()
  if (!request.cookies.get('locale')) {
    response.cookies.set('locale', locale)
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - admin (Payload admin)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|admin).*)',
  ],
}

