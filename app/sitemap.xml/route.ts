/* app/sitemap.xml/route.ts
   Sitemap válido con rutas reales (sin anchors).
   Añade más rutas si más adelante tienes páginas nuevas.
*/
const SITE_URL = 'https://www.pidelocal.es'

export function GET() {
  const now = new Date().toISOString()

  // Incluye solo rutas que responden 200 en producción
  const paths = [
    '/',             // Home
    '/aviso-legal',  // Legales
    '/privacidad',
    '/cookies'
  ]

  const urls = paths
    .map(u => `<url><loc>${SITE_URL}${u}</loc><lastmod>${now}</lastmod></url>`)
    .join('')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls}
  </urlset>`

  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } })
}
