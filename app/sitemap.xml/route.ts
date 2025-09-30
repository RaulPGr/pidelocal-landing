/* app/sitemap.xml/route.ts
   Sitemap básico para una landing "one-page".
   Añade más rutas si más adelante tienes páginas nuevas.
*/
const SITE_URL = 'https://pidelocal.vercel.app'

export function GET() {
  const now = new Date().toISOString()
  const urls = [
    '/',            // home
    '/#features',
    '/#como-funciona',
    '/#ejemplos',
    '/#precios',
    '/#faq',
    '/#contacto'
  ].map(u => {
    // Quita el hash en el <loc> (Google no usa anchors)
    const loc = `${SITE_URL}${u.replace('#','')}`
    return `<url><loc>${loc}</loc><lastmod>${now}</lastmod></url>`
  }).join('')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls}
  </urlset>`

  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } })
}
