# PideLocal — Landing

Landing construida con Next.js (App Router) + Tailwind. Desplegada en Vercel.

## 🧩 Estructura editable rápida
- **Precios, emails, colores, imágenes:** `app/page.tsx` → bloque `BUSINESS`.
- **Eventos GA4:** `app/layout.tsx` (ID: G-EH2DBM9Y3) y `app/page.tsx` (función `sendGA` + CTAs).
- **SEO (OG/Twitter, canonical):** `app/layout.tsx` → cambia `SITE_URL` cuando tengas dominio propio.
- **Legales:** `app/(legal)/*` (Aviso legal, Privacidad, Cookies).
- **Robots y Sitemap:** `app/robots.txt/route.ts`, `app/sitemap.xml/route.ts` → usa tu dominio.

## 🖼 Imágenes
Coloca assets en `/public/brand/`:
- `logo-pidelocal.png`  (header)
- `icono-pidelocal.png` (favicon)
- `hero-mock.png`       (OG image 1200×630 recomendado)
- `demo-home.png`, `demo-menu.png`, `demo-checkout.png`

## 💶 Precios (ejemplo actual)
- Implantación única: 129 €
- Starter: 12 €/mes
- Medium: 29 €/mes
- Premium: 49 €/mes (Stripe con comisiones aparte)

Cambia en `BUSINESS.pricing`.

## 📈 Analytics (GA4)
- ID actual: `G-EH2DBM9Y3`.
- Verifica en GA4 → Informes → Tiempo real.  
- Evento de conversión recomendado: `generate_lead` (marcar como conversión en *Administrar → Eventos*).

## 🌐 Publicación
1. `git add -A && git commit -m "Update"`  
2. `git push` → Vercel despliega.
3. Comprueba `/robots.txt` y `/sitemap.xml`.

## 🔌 Próximos pasos (opcionales)
- n8n + Google Sheets para guardar leads del formulario.
- Conexión dominio propio en Vercel y actualizar `SITE_URL`.
