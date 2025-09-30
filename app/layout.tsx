/* app/layout.tsx
   Layout raíz con:
   - Metadatos SEO (título, descripción, OG, Twitter)
   - Canonical (metadataBase) -> cámbiala cuando tengas dominio propio
   - Favicon
   - Google Analytics (GA4) con tu ID
   - JSON-LD Organization para enriquecer resultados
*/
import type { Metadata } from 'next'
import './globals.css'
import { Inter } from 'next/font/google'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

// ⛳️ Cambia esto cuando conectes dominio propio (ej: https://pidelocal.com)
const SITE_URL = 'https://pidelocal.vercel.app'

export const metadata: Metadata = {
  title: 'PideLocal — Tu restaurante online en minutos',
  description:
    'Crea la web de tu restaurante, muestra tu carta, recibe pedidos y cobra con tu propia marca. Sin comisiones por pedido.',
  metadataBase: new URL(SITE_URL),             // ← actualiza con tu dominio final cuando lo tengas
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    title: 'PideLocal — Tu restaurante online en minutos',
    description: 'Pedidos online sin comisiones por pedido. Diseño responsive, pagos y gestión sencillos.',
    images: ['/brand/hero-mock.png'],          // ← asegúrate de tener esta imagen en /public/brand/
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PideLocal — Tu restaurante online en minutos',
    description: 'Pedidos online sin comisiones por pedido. Diseño responsive, pagos y gestión sencillos.',
    images: ['/brand/hero-mock.png'],
  },
  icons: { icon: '/brand/icono-pidelocal.png' } // ← favicon
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        {/* GA4: script oficial */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-EH2DBM9Y3"
          strategy="afterInteractive"
        />
        {/* GA4: init + debug_mode para facilitar comprobación en DebugView */}
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){ dataLayer.push(arguments); }
            gtag('js', new Date());
            gtag('config', 'G-EH2DBM9Y3', { debug_mode: true });
          `}
        </Script>

        {/* JSON-LD: marca Organization (visibilidad en Google) */}
        <Script id="org-jsonld" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'PideLocal',
            url: SITE_URL,
            logo: `${SITE_URL}/brand/icono-pidelocal.png`,
            sameAs: [] // añade redes si quieres más adelante
          })}
        </Script>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
