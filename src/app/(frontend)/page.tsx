import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { RoomType, Amenity, Media } from '@/payload-types'


export default async function Page() {
  const payload = await getPayload({ config })

  // Hero Resimlerini Çek (tüm hero kategorisindeki resimler)
  const heroImagesResult = await payload.find({
    collection: 'media',
    where: {
      category: {
        equals: 'hero',
      },
    },
    locale: 'tr',
  })
  const heroImages = heroImagesResult.docs as Media[]

  // Odaları Çek  
  const rooms = await payload.find({
    collection: 'room-types',
    depth: 1,
    limit: 6,
    locale: 'tr',
  })

  // Payload'dan gelen veriyi component formatına dönüştür
  const formattedRooms = rooms.docs.map((room: RoomType) => ({
    id: room.id,
    title: room.title,
    description: room.description || '',
    price: room.price,
    coverImage: typeof room.coverImage === 'object' && room.coverImage !== null && 'id' in room.coverImage
      ? room.coverImage as Media
      : undefined,
    features: Array.isArray(room.amenities) 
      ? room.amenities
          .filter((amenity): amenity is Amenity => typeof amenity === 'object' && amenity !== null && 'title' in amenity)
          .map(amenity => amenity.title)
      : [],
  }))

  const navItems = [
    { label: 'Home' },
    { label: 'Rooms' },
    { label: 'About Us' },
    {
      label: 'Pages',
      children: [
        { label: 'Home' },
        { label: 'Rooms' },
        { label: 'Single Rooms' },
        { label: 'About Us' },
        { label: 'Blog' },
        { label: 'Single Blog' },
        { label: 'Contact' },
        {
          label: 'Dropdown',
          children: [
            { label: 'Dropdown Item' },
            { label: 'Dropdown Item' },
            { label: 'Dropdown Item' },
            { label: 'Dropdown Item' },
          ],
        },
      ],
    },
    { label: 'News' },
    { label: 'Contact' },
  ]

  return (
    <div className="min-h-screen bg-white text-slate-800">
      <header className="shadow-sm">
        <div className="bg-slate-900 text-white">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3 text-sm">
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-2">
                <svg
                  className="h-4 w-4 text-teal-400"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.72 11.72 0 003.68.59 1 1 0 011 1v3.7a1 1 0 01-.91 1A19 19 0 015 5.91a1 1 0 011-1h3.7a1 1 0 011 1 11.72 11.72 0 00.59 3.68 1 1 0 01-.24 1.01l-2.43 2.19z" />
                </svg>
                <span className="font-medium">(123) 456-789-1230</span>
              </span>
              <span className="flex items-center gap-2">
                <svg
                  className="h-4 w-4 text-teal-400"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 2v.01L12 13 4 6.01V6h16zM4 18V8.24l7.4 6.17a1 1 0 001.2 0L20 8.24V18H4z" />
                </svg>
                <span className="font-medium">info.colorlib@gmail.com</span>
              </span>
            </div>

            <div className="flex items-center gap-4">
              {['f', 't', '👁️', 'ig'].map((icon) => (
                <button
                  key={icon}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-white/30 text-xs font-semibold hover:bg-white/10"
                  type="button"
                  aria-label={icon}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-4 px-6 py-4 lg:gap-8">
            <div className="flex items-center gap-2 text-2xl font-semibold">
              <span className="text-3xl font-black text-teal-500">R</span>
              <span className="tracking-tight">oberto</span>
            </div>

            <nav className="hidden items-center gap-6 text-sm font-medium text-slate-700 lg:flex">
              {navItems.map((item) =>
                item.children ? (
                  <div key={item.label} className="relative group">
                    <button
                      className="flex items-center gap-1 hover:text-teal-500"
                      type="button"
                    >
                      {item.label}
                      <svg
                        className="h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </button>

                    <div className="pointer-events-none absolute left-0 top-full z-20 mt-3 w-56 rounded-md bg-white py-2 shadow-xl ring-1 ring-black/5 opacity-0 transition duration-150 group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100">
                      {item.children.map((child) =>
                        child.children ? (
                          <div key={child.label} className="relative group/item">
                            <button className="flex w-full items-center justify-between px-5 py-2 text-left text-slate-700 hover:bg-slate-50">
                              <span>- {child.label}</span>
                              <svg
                                className="h-4 w-4 text-slate-400"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <polyline points="9 18 15 12 9 6" />
                              </svg>
                            </button>
                            <div className="pointer-events-none absolute left-full top-1/2 z-30 ml-1 w-56 -translate-y-1/2 rounded-md bg-white py-2 shadow-xl ring-1 ring-black/5 opacity-0 transition duration-150 group-hover/item:pointer-events-auto group-hover/item:opacity-100">
                              {child.children.map((deep) => (
                                <a
                                  key={deep.label}
                                  className="block px-5 py-2 text-slate-700 hover:bg-slate-50"
                                  href="#"
                                >
                                  - {deep.label}
                                </a>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <a
                            key={child.label}
                            className="block px-5 py-2 text-slate-700 hover:bg-slate-50"
                            href="#"
                          >
                            - {child.label}
                          </a>
                        ),
                      )}
                    </div>
                  </div>
                ) : (
                  <a
                    key={item.label}
                    className="hover:text-teal-500"
                    href="#"
                  >
                    {item.label}
                  </a>
                ),
              )}
              <button
                className="ml-2 text-slate-700 hover:text-teal-500"
                type="button"
                aria-label="Search"
              >
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="7" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </button>
            </nav>

            <div className="ml-auto hidden lg:block">
              <button
                className="rounded-md bg-gradient-to-r from-teal-500 to-emerald-500 px-4 py-2 text-sm font-semibold text-white shadow hover:shadow-md"
                type="button"
              >
                Book Now
              </button>
            </div>

            {/* Mobile menu */}
            <div className="ml-auto lg:hidden">
              <details className="group relative">
                <summary className="flex h-11 w-11 items-center justify-center rounded-md border border-slate-200 bg-white shadow-sm cursor-pointer">
                  <span className="sr-only">Menü</span>
                  <div className="space-y-1.5">
                    <span className="block h-0.5 w-6 bg-slate-800" />
                    <span className="block h-0.5 w-6 bg-slate-800" />
                    <span className="block h-0.5 w-6 bg-slate-800" />
                  </div>
                </summary>

                <div className="absolute right-0 mt-3 w-64 rounded-md border border-slate-200 bg-white shadow-xl ring-1 ring-black/5">
                  {navItems.map((item) => (
                    <div key={item.label} className="border-b border-slate-100 last:border-none">
                      <button className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium text-slate-700">
                        <span>{item.label}</span>
                        {item.children && <span className="text-slate-400">›</span>}
                      </button>
                      {item.children && (
                        <div className="space-y-1 bg-slate-50 px-4 pb-3">
                          {item.children.map((child) =>
                            child.children ? (
                              <details key={child.label} className="group/item">
                                <summary className="flex items-center justify-between px-2 py-2 text-sm text-slate-700 cursor-pointer">
                                  - {child.label}
                                  <span className="text-slate-400 transition group-open/item:rotate-90">›</span>
                                </summary>
                                <div className="mt-1 space-y-1 rounded-md bg-white px-3 py-2">
                                  {child.children.map((deep) => (
                                    <a
                                      key={deep.label}
                                      className="block px-2 py-2 text-sm text-slate-700 hover:bg-slate-50"
                                      href="#"
                                    >
                                      - {deep.label}
                                    </a>
                                  ))}
                                </div>
                              </details>
                            ) : (
                              <a
                                key={child.label}
                                className="block px-2 py-2 text-sm text-slate-700 hover:bg-white"
                                href="#"
                              >
                                - {child.label}
                              </a>
                            ),
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                  <div className="px-4 pb-4 pt-3">
                    <button
                      className="w-full rounded-md bg-gradient-to-r from-teal-500 to-emerald-500 px-4 py-2 text-sm font-semibold text-white shadow hover:shadow-md"
                      type="button"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </details>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-12">
        <h1 className="text-3xl font-semibold">Sayfa İçeriği</h1>
        <p className="mt-3 text-slate-600">
          Buraya hero, oda listesi ve diğer bölümleri ekleyebilirsiniz.
        </p>
      </main>
    </div>
  )
}