/* app/layout.tsx
   Layout raíz de la landing. Define metadatos, tipografías y estilos globales.
*/
import type { Metadata } from 'next'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PideLocal — Tu restaurante online en minutos',
  description: 'Crea la web de tu restaurante y recibe pedidos online sin comisiones por pedido.',
  openGraph: {
    title: 'PideLocal — Tu restaurante online en minutos',
    description: 'Pedidos online, pagos sencillos y diseño a tu medida.',
    type: 'website',
    images: ['/brand/hero-mock.png']
  },
  icons: {
    icon: '/brand/icono-pidelocal.png'
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
