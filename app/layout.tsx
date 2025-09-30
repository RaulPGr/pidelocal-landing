/* app/layout.tsx */
import type { Metadata } from 'next'
import './globals.css'
import { Inter } from 'next/font/google'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PideLocal — Tu restaurante online en minutos',
  description: 'Crea la web de tu restaurante y recibe pedidos online sin comisiones por pedido.',
  openGraph: { title: 'PideLocal — Tu restaurante online en minutos', description: 'Pedidos online, pagos sencillos y diseño a tu medida.', type: 'website', images: ['/brand/hero-mock.png'] },
  icons: { icon: '/brand/icono-pidelocal.png' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        {/* Google Analytics (tu ID) */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-EH2DBM9Y3" strategy="afterInteractive" />
        <Script id="ga4" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){ dataLayer.push(arguments); }
            gtag('js', new Date());
            // Debug activado para ver eventos en DebugView
            gtag('config', 'G-EH2DBM9Y3', { debug_mode: true });
          `}
        </Script>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
