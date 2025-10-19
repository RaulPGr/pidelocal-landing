/* app/layout.tsx
   Layout raíz con:
   - Metadatos SEO (título, descripción, OG, Twitter)
   - Canonical (metadataBase) -> cámbiala cuando tengas dominio propio
   - Favicon
   - Cookie banner + GA4 con consentimiento
   - JSON-LD Organization
   - Fondo beige claro de sitio completo
*/
import type { Metadata } from 'next'
import './globals.css'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import CookieConsent from '../components/CookieConsent'
import Analytics from '../components/Analytics'

const inter = Inter({ subsets: ['latin'] })

// Dominio del sitio (ajustado a tu dominio final)
const SITE_URL = 'https://www.pidelocal.es'

// Metadatos (ajusta libremente)
export const metadata: Metadata = {
  title: 'Crea la web de tu restaurante y recibe pedidos directos | PideLocal',
  description:
    'Muestra tu carta, acepta pedidos y cobra online con tu marca. Sin comisiones por pedido. Implantación rápida y soporte. Pide una demo gratis.',
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    title: 'Crea la web de tu restaurante y recibe pedidos directos | PideLocal',
    description: 'Muestra tu carta, acepta pedidos y cobra online con tu marca. Sin comisiones por pedido. Implantación rápida y soporte. Pide una demo gratis.',
    images: ['/brand/hero-mock.png'], // asegúrate de tener esta imagen
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Crea la web de tu restaurante y recibe pedidos directos | PideLocal',
    description: 'Muestra tu carta, acepta pedidos y cobra online con tu marca. Sin comisiones por pedido. Implantación rápida y soporte. Pide una demo gratis.',
    images: ['/brand/hero-mock.png'],
  },
  icons: { icon: '/brand/icono-pidelocal.png' }, // favicon
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="h-full">
      <head>
        {/* JSON-LD Organization */}
        <Script id="org-jsonld" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'PideLocal',
            url: SITE_URL,
            logo: `${SITE_URL}/brand/icono-pidelocal.png`,
            sameAs: [
              'https://www.instagram.com/pidelocalweb/',
            ],
            contactPoint: [{
              '@type': 'ContactPoint',
              email: 'pidelocal.contacto@gmail.com',
              contactType: 'sales',
              areaServed: 'ES',
              availableLanguage: ['es']
            }]
          })}
        </Script>
        {/* JSON-LD FAQPage (mejora de rich results sin cambios visuales) */}
        <Script id="faq-jsonld" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: '¿Hay permanencia?',
                acceptedAnswer: { '@type': 'Answer', text: 'No. Funcionamos mes a mes.' }
              },
              {
                '@type': 'Question',
                name: '¿Cargáis nuestro menú?',
                acceptedAnswer: { '@type': 'Answer', text: 'Sí. Durante la implantación te ayudamos con la carga inicial.' }
              },
              {
                '@type': 'Question',
                name: '¿Puedo usar mi dominio?',
                acceptedAnswer: { '@type': 'Answer', text: 'Sí, conectamos tu dominio (ej. tudominio.com) a tu web.' }
              },
              {
                '@type': 'Question',
                name: '¿Pagos con tarjeta?',
                acceptedAnswer: { '@type': 'Answer', text: 'Sí, en el plan Premium. Las comisiones de Stripe se aplican según su tarifa.' }
              }
            ]
          })}
        </Script>
      </head>

      {/* Fondo beige claro + tipografía */}
      <body className={`${inter.className} min-h-screen bg-[#fdfaf6] text-gray-900 antialiased`}>
        {/* Banner/Preferencias de cookies */}
        <CookieConsent />
        {/* Analytics solo se carga si hay consentimiento */}
        <Analytics />
        {children}
      </body>
    </html>
  )
}
