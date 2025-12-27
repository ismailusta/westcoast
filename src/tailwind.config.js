/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,ts,jsx,tsx,mdx}", // Tüm src klasörü
      "./src/app/**/*.{js,ts,jsx,tsx,mdx}", // Frontend sayfaları
      "./src/app/(frontend)/**/*.{js,ts,jsx,tsx,mdx}", // Frontend components
      "./src/components/**/*.{js,ts,jsx,tsx,mdx}", // Bileşenler
      "./src/payload/**/*.{js,ts,jsx,tsx,mdx}", // Payload admin tarafı
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  }