/* app/robots.txt/route.ts
   Robots básico: permite indexación y declara tu sitemap.
   Cambia la URL del sitemap cuando pongas dominio propio.
*/
const SITE_URL = 'https://www.pidelocal.es'

export function GET() {
  const body = `User-agent: *
Allow: /
Sitemap: ${SITE_URL}/sitemap.xml`
  return new Response(body, { headers: { 'Content-Type': 'text/plain' } })
}
