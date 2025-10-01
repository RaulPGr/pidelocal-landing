/* app/layout.tsx
   Layout raíz con:
   - Metadatos SEO (título, descripción, OG, Twitter)
   - Canonical (metadataBase) -> cámbiala cuando tengas dominio propio
   - Favicon
   - Google Analytics (GA4)
   - JSON-LD Organization
   - Fondo beige claro de sitio completo
*/
import type { Metadata } from 'next'
import './globals.css'
import { Inter } from 'next/font/google'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

// ⛳️ Cambia esto cuando conectes dominio propio (ej: https://pidelocal.com)
const SITE_URL = 'https://pidelocal.vercel.app'

// ✅ Metadatos (ajusta libremente)
export const metadata: Metadata = {
  title: 'PideLocal — Tu restaurante online en minutos',
  description:
    'Crea la web de tu restaurante, muestra tu carta, recibe pedidos y cobra con tu propia marca. Sin comisiones por pedido.',
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    title: 'PideLocal — Tu restaurante online en minutos',
    description: 'Pedidos online sin comisiones por pedido. Diseño responsive, pagos y gestión sencillos.',
    images: ['/brand/hero-mock.png'], // asegúrate de tener esta imagen
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PideLocal — Tu restaurante online en minutos',
    description: 'Pedidos online sin comisiones por pedido. Diseño responsive, pagos y gestión sencillos.',
    images: ['/brand/hero-mock.png'],
  },
  icons: { icon: '/brand/icono-pidelocal.png' }, // favicon
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        {/* GA4 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-EH2DBM9Y3"
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){ dataLayer.push(arguments); }
            gtag('js', new Date());
            gtag('config', 'G-EH2DBM9Y3', { debug_mode: true });
          `}
        </Script>

        {/* JSON-LD Organization */}
        <Script id="org-jsonld" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'PideLocal',
            url: SITE_URL,
            logo: `${SITE_URL}/brand/icono-pidelocal.png`,
            sameAs: [
              // añade tus redes cuando las tengas
            'https://www.instagram.com/pidelocalweb/',
              // 'https://www.facebook.com/tuusuario',
              // 'https://www.linkedin.com/company/tuusuario',
              // 'https://www.tiktok.com/@tuusuario',
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
      </head>

      {/* 🎨 Fondo beige claro + tipografía */}
      <body className={`${inter.className} bg-[#fdfaf6] text-gray-900 antialiased`}>
        {children}
      </body>

    </html>
  )
}
