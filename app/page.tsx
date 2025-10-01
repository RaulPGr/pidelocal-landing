/* app/page.tsx
   Landing de PideLocal — Next.js App Router + Tailwind.
   ✅ Sin referencias geográficas (apto para cualquier cliente)
   ✅ 3 planes: Starter / Medium / Premium + Implantación única
   ✅ Eventos GA4 (generate_lead) cableados en CTAs y formulario
   ✅ Código MUY comentado para editar precios, emails, textos e imágenes
*/

'use client';

import { useMemo, useState, useEffect } from 'react';

type Feature = { title: string; desc: string };
type Step = { num: string; title: string; desc: string };
type FAQ = { q: string; a: string };

// ===============================
// 🔧 BLOQUE EDITABLE (marca & negocio)
// Cambia valores aquí y se reflejan en toda la landing.
// ===============================
const BUSINESS = {
  // 📧 Contacto
  email: 'pidelocal.contacto@gmail.com', // ← cambia cuando quieras
  whatsapp: '', // ← déjalo vacío para ocultar el botón de WhatsApp

  // 💶 PRECIOS (recomendados “early stage”)
  // Sube/baja aquí y la tabla de precios se actualiza sola
  pricing: {
    setupOneTime: 129, // Implantación única (pago único)
    // Planes mensuales
    starter: 12,
    medium: 29,
    premium: 49,
    currency: '€',
    // Nota legal/breve visible bajo precios
    legalNote:
      '*Precios sin IVA. El pago con tarjeta en el plan Premium lleva comisiones de Stripe aparte.',
    // Promo de lanzamiento opcional (muestra una banda encima de precios)
    launchPromo:
      'Lanzamiento: -50% los 3 primeros meses en cualquier plan. Sin permanencia.',
  },

  // 🖼️ Activos de marca (sube los archivos a /public/brand/)
  assets: {
    logo: '/brand/logo-pidelocal.png',
    icon: '/brand/icono-pidelocal.png',
    heroMock: '/brand/hero-mock.png',
    demo1: '/brand/demo-home.png',
    demo2: '/brand/demo-menu.png',
    demo3: '/brand/demo-checkout.png',
  },

  // 🧾 Textos “hero” y propuesta de valor (sin mención geográfica)
  hero: {
    title: 'Tu restaurante online en minutos',
    subtitle:
      'Pedidos online rápidos, sin comisiones por pedido. Solo pagarás comisiones si activas el pago con tarjeta (Stripe).',
    ctaPrimary: { label: 'Solicita demo gratis', href: '#contacto' },
    ctaSecondary: { label: 'Ver ejemplos', href: '#ejemplos' },
  },

  // 🟧 Colores de marca (degradado naranja→verde). Cambia HEX si te conviene.
  colors: {
    orange: '#D4572A',
    green: '#2FA24D',
    heroFrom: '#C14F25', // inicio degradado HERO
    heroTo: '#238E41',   // fin degradado HERO
  },
};

// ===============================
// ✅ ENVÍO A GOOGLE SHEETS (Apps Script Web App)
// Pega aquí la URL EXACTA que te dio Apps Script y que termina en /exec
// Ejemplo: 'https://script.google.com/macros/s/AKfycbXXXXXXXX/exec'
const SHEETS_WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbwSGyZ_qwob9Uk2AbZhztDjZINh7zptPPZPU5gJOCZ23VGTPbzQR4V2oNFB5gvi6tp9/exec';

// (Opcional) Token sencillo para “firmar” la petición.
// Si NO lo quieres usar, déjalo como cadena vacía '' y no pasa nada.
const SHEETS_SECRET = '';

// ===============================
// 🔧 BENEFICIOS (lista visible en sección “Beneficios”)
// Edita/añade/quita items libremente
// ===============================
const FEATURES: Feature[] = [
  { title: 'Más pedidos sin comisiones', desc: 'Recibe pedidos directos desde tu web. Sin comisiones por pedido.' },
  { title: 'Lanza en 48 h', desc: 'Web lista en 24–48 horas: nos encargamos de la implantación.' },
  { title: 'Diseño responsive móvil', desc: 'Optimizada para móvil: donde se realiza la mayoría de pedidos.' },
  { title: 'Pagos con tarjeta y efectivo', desc: 'Premium permite cobro con tarjeta online (comisiones Stripe). Efectivo disponible en Medium/Premium.' },
  { title: 'Panel de gestión sencillo', desc: 'Edita tu carta, agota stock, confirma pedidos sin complicaciones.' },
  { title: 'Conecta tu dominio y SEO básico', desc: '100% tu marca y dominio propio. Posicionamiento básico incluido.' },
];

// ===============================
// 🔧 PASOS (“Cómo funciona”)
// ===============================
const STEPS: Step[] = [
  { num: '1', title: 'Brief rápido', desc: 'Logo, horarios, ubicación y tu menú.' },
  { num: '2', title: 'Montaje y personalización (24–48 h)', desc: 'Ajustamos diseño y dejamos todo listo con tu marca.' },
  { num: '3', title: 'Empiezas a recibir pedidos', desc: 'Comparte tu enlace, gestiona pedidos y cobra.' },
];

// ===============================
// 🔧 FAQs (preguntas frecuentes) — sin zona
// ===============================
const FAQS: FAQ[] = [
  { q: '¿Hay permanencia?', a: 'No. Funcionamos mes a mes. (Puedes aprovechar descuentos contratando 3 meses al inicio).' },
  { q: '¿Cargáis nuestro menú?', a: 'Sí. Durante la implantación te ayudamos con la carga inicial.' },
  { q: '¿Puedo usar mi dominio?', a: 'Sí, conectamos tu dominio (ej. tudominio.com) a tu web.' },
  { q: '¿Pagos con tarjeta?', a: 'Sí, en el plan Premium. Las comisiones de Stripe se aplican según su tarifa.' },
];

// ===============================
// 📊 GA4: sistema robusto (cola + logs)
// (Funciona aunque gtag tarde en estar disponible)
// ===============================
const pendingGA: Array<{ name: string; params: Record<string, any> }> = [];
const flushGA = () => {
  // @ts-ignore
  if (typeof window !== 'undefined' && window.gtag) {
    while (pendingGA.length) {
      const e = pendingGA.shift()!;
      // @ts-ignore
      window.gtag('event', e.name, e.params);
      console.log('[GA4] enviado (flush):', e.name, e.params);
    }
  }
};
const sendGA = (name: string, params: Record<string, any> = {}) => {
  // @ts-ignore
  if (typeof window !== 'undefined' && window.gtag) {
    // @ts-ignore
    window.gtag('event', name, params);
    console.log('[GA4] enviado:', name, params);
  } else {
    pendingGA.push({ name, params });
    console.log('[GA4] encolado (gtag no listo):', name, params);
  }
};

export default function Page() {
  const year = useMemo(() => new Date().getFullYear(), []);
  const [sending, setSending] = useState(false);
  const [form, setForm] = useState({ nombre: '', email: '', telefono: '', negocio: '', mensaje: '' });

  // Vacía la cola GA periódicamente + evento de test debug
  useEffect(() => {
    const t = setInterval(flushGA, 300);
    sendGA('debug_test', { ts: Date.now(), page: 'landing' });
    return () => clearInterval(t);
  }, []);

  // ✉️ Envío sin backend: guarda en Sheets y abre el cliente de correo (mailto)
  const handleContact = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    // GA: registra intento de envío
    sendGA('generate_lead', { location: 'contact_form', label: 'Enviar solicitud' });

    // 1) Guardar en Google Sheets (no bloquea el mailto si falla)
    try {
      await fetch(SHEETS_WEBHOOK_URL, {
        method: 'POST',
        // ✅ Simple request (evita preflight CORS). No añadas más cabeceras.
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          nombre: form.nombre,
          email: form.email,
          telefono: form.telefono,
          negocio: form.negocio,
          mensaje: form.mensaje,
          fuente: 'landing',
          userAgent: typeof window !== 'undefined' ? navigator.userAgent : '',
          page: typeof window !== 'undefined' ? window.location.href : '',
          // opcional: si usas token, Apps Script debe verificarlo
          secret: SHEETS_SECRET || undefined,
        }),
        keepalive: true,
      });
      sendGA('lead_saved', { method: 'sheets_webhook' });
    } catch (err) {
      console.warn('No se pudo guardar en Sheets:', err);
      sendGA('lead_saved_error', { reason: String(err) });
    }

    // 2) Mailto como confirmación/backup
    const subject = encodeURIComponent(`Demo PideLocal - ${form.negocio || form.nombre}`);
    const body = encodeURIComponent(
  `Hola, soy ${form.nombre} (${form.email}).\n` +
  `Teléfono: ${form.telefono}\n\n` +            // <- NUEVO
  `Negocio: ${form.negocio}\n\nMensaje:\n${form.mensaje}\n\n— Enviado desde la landing de PideLocal`
);

    window.location.href = `mailto:${BUSINESS.email}?subject=${subject}&body=${body}`;

    setTimeout(() => setSending(false), 800);
  };

  return (
    <main className="min-h-screen bg-brand-light text-brand-dark">
      {/* ====== NAVBAR ====== */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-black/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-3 flex items-center justify-between">
          {/* LOGO + claim opcional */}
          <a href="#" className="flex items-center gap-3" aria-label="Inicio">
            <img src={BUSINESS.assets.logo} alt="PideLocal" className="h-8 w-auto" />
            <span className="font-semibold">PideLocal</span>
          </a>

          <nav className="hidden md:flex items-center gap-6 text-sm" aria-label="Principal">
            <a href="#features" className="hover:text-brand-green">Beneficios</a>
            <a href="#como-funciona" className="hover:text-brand-green">Cómo funciona</a>
            <a href="#ejemplos" className="hover:text-brand-green">Ejemplos</a>
            <a href="#precios" className="hover:text-brand-green">Precios</a>
            <a href="#faq" className="hover:text-brand-green">FAQ</a>
          </nav>

          {/* CTA principal (Navbar) — evento GA4 */}
          <a
            href={BUSINESS.hero.ctaPrimary.href}
            onClick={() => sendGA('generate_lead', { location: 'navbar', label: BUSINESS.hero.ctaPrimary.label })}
            className="hidden md:inline-block rounded-xl px-4 py-2 text-white font-medium shadow"
            style={{ background: 'linear-gradient(135deg, var(--orange), var(--green))' }}
          >
            {BUSINESS.hero.ctaPrimary.label}
          </a>
        </div>
      </header>

      {/* CSS vars para el degradado sin tocar tailwind config */}
      <style>{`:root{--orange:${BUSINESS.colors.orange};--green:${BUSINESS.colors.green}}`}</style>

      {/* ====== HERO ====== */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          {/* Degradado de marca */}
          <div
            className="absolute inset-0"
            style={{ background: `linear-gradient(135deg, ${BUSINESS.colors.heroFrom} 0%, ${BUSINESS.colors.heroTo} 100%)` }}
          />
          {/* Scrim para mejorar contraste lado izquierdo */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,_rgba(0,0,0,0.5),_transparent_60%)]" />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-20 md:py-28 text-white">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            {/* Texto hero */}
            <div>
              <div className="max-w-2xl bg-black/15 backdrop-blur-sm rounded-2xl p-6 ring-1 ring-white/20 shadow-lg">
                <h1 className="text-4xl md:text-5xl font-extrabold leading-tight drop-shadow tracking-tight [text-wrap:balance]">
                  {BUSINESS.hero.title}
                </h1>
                <p className="mt-5 text-lg/relaxed text-white/90">
                  {BUSINESS.hero.subtitle}
                </p>

                <div className="mt-8 flex items-center gap-3">
                  {/* CTA hero — evento GA4 */}
                  <a
                    href={BUSINESS.hero.ctaPrimary.href}
                    onClick={() => sendGA('generate_lead', { location: 'hero', label: BUSINESS.hero.ctaPrimary.label })}
                    className="rounded-xl bg-white text-brand-dark px-5 py-3 font-semibold hover:opacity-95 shadow"
                  >
                    {BUSINESS.hero.ctaPrimary.label}
                  </a>
                  <a
                    href={BUSINESS.hero.ctaSecondary.href}
                    className="rounded-xl border border-white/70 px-5 py-3 font-semibold hover:bg-white/10 text-white"
                  >
                    {BUSINESS.hero.ctaSecondary.label}
                  </a>
                </div>

                <div className="mt-8 flex items-center gap-4 opacity-90">
                  <img src={BUSINESS.assets.icon} alt="Icono PideLocal" className="h-8 w-8" />
                  <span className="text-sm text-white/90">Sin comisiones por pedido • 100% tu marca</span>
                </div>
              </div>
            </div>

            {/* Mockup */}
            <div className="hidden md:block">
              <div className="bg-white/95 rounded-2xl p-3 shadow-xl">
                <img src={BUSINESS.assets.heroMock} alt="Ejemplo de web PideLocal" className="w-full h-auto rounded-xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== BENEFICIOS ====== */}
      <section id="features" className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center [text-wrap:balance]">Beneficios para tu negocio</h2>
        <p className="text-center mt-3 text-brand-dark/80">
          Lo importante: vender más, simplificar tu operativa y mantener tus márgenes.
        </p>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((f, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition">
              <div className="text-3xl mb-3 select-none">{['🛒','⚡','📱','💳','🧩','🔗'][i] || '✨'}</div>
              <h3 className="font-semibold">{f.title}</h3>
              <p className="text-sm mt-2 text-brand-dark/80">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ====== CÓMO FUNCIONA ====== */}
      <section id="como-funciona" className="bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center [text-wrap:balance]">Cómo funciona</h2>
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            {STEPS.map((s, i) => (
              <div key={i} className="rounded-2xl p-6 bg-brand-light">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white"
                  style={{ background: `linear-gradient(135deg, ${BUSINESS.colors.orange}, ${BUSINESS.colors.green})` }}
                >
                  {s.num}
                </div>
                <h3 className="mt-4 font-semibold">{s.title}</h3>
                <p className="text-sm mt-2 text-brand-dark/80">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== EJEMPLOS ====== */}
      <section id="ejemplos" className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center [text-wrap:balance]">Ejemplos reales</h2>
        <p className="text-center mt-3 text-brand-dark/80">Así verá tu clientela la carta y el proceso de pedido.</p>
        <div className="mt-10 grid md:grid-cols-3 gap-6">
          <img src={BUSINESS.assets.demo1} alt="Demo - Inicio" className="rounded-xl shadow-sm" />
          <img src={BUSINESS.assets.demo2} alt="Demo - Menú" className="rounded-xl shadow-sm" />
          <img src={BUSINESS.assets.demo3} alt="Demo - Pago" className="rounded-xl shadow-sm" />
        </div>
      </section>

      {/* ====== PRECIOS ====== */}
      <section id="precios" className="bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center [text-wrap:balance]">Planes y precios</h2>
          <p className="text-center mt-3 text-brand-dark/80">
            Transparente y sin sorpresas. Sin permanencia. Implantación rápida.
          </p>

          {/* Banda promo (opcional) */}
          {BUSINESS.pricing.launchPromo && (
            <div className="mt-6 text-center">
              <span className="inline-block rounded-full px-4 py-2 text-white text-sm shadow"
                style={{ background: `linear-gradient(135deg, ${BUSINESS.colors.orange}, ${BUSINESS.colors.green})` }}>
                {BUSINESS.pricing.launchPromo}
              </span>
            </div>
          )}

          <div className="mt-10 grid lg:grid-cols-4 gap-6">
            {/* Implantación única */}
            <div className="rounded-2xl p-6 bg-brand-light shadow-sm">
              <h3 className="font-semibold text-lg">Implantación única</h3>
              <p className="mt-2 text-4xl font-extrabold tracking-tight">
                {BUSINESS.pricing.setupOneTime}{BUSINESS.pricing.currency}
                <span className="text-base font-medium text-brand-dark/70"> pago único</span>
              </p>
              <ul className="mt-4 text-sm space-y-2">
                <li>✓ Montaje 24–48 h</li>
                <li>✓ Carga inicial del menú</li>
                <li>✓ Personalización a tu marca</li>
                <li>✓ Dominio y SEO básico</li>
              </ul>
              <a
                href="#contacto"
                onClick={() => sendGA('generate_lead', { location: 'pricing', label: 'Implantación' })}
                className="mt-6 inline-block rounded-xl px-5 py-3 font-semibold text-white shadow"
                style={{ background: `linear-gradient(135deg, ${BUSINESS.colors.orange}, ${BUSINESS.colors.green})` }}
              >
                Empezar ahora
              </a>
            </div>

            {/* Starter */}
            <div className="rounded-2xl p-6 bg-white border shadow-sm">
              <h3 className="font-semibold text-lg">Starter</h3>
              <p className="mt-2 text-4xl font-extrabold tracking-tight">
                {BUSINESS.pricing.starter}{BUSINESS.pricing.currency}
                <span className="text-base font-medium text-brand-dark/70"> /mes</span>
              </p>
              <ul className="mt-4 text-sm space-y-2">
                <li>✓ Página de inicio + datos del restaurante</li>
                <li>✓ Carta/menú visible (sin pedidos)</li>
                <li>✓ Diseño responsive y SEO básico</li>
              </ul>
              <a
                href="#contacto"
                onClick={() => sendGA('generate_lead', { location: 'pricing', label: 'Starter' })}
                className="mt-6 inline-block rounded-xl px-5 py-3 font-semibold text-white shadow"
                style={{ background: `linear-gradient(135deg, ${BUSINESS.colors.orange}, ${BUSINESS.colors.green})` }}
              >
                Empezar ahora
              </a>
            </div>

            {/* Medium */}
            <div className="rounded-2xl p-6 bg-white border shadow-sm">
              <h3 className="font-semibold text-lg">Medium</h3>
              <p className="mt-2 text-4xl font-extrabold tracking-tight">
                {BUSINESS.pricing.medium}{BUSINESS.pricing.currency}
                <span className="text-base font-medium text-brand-dark/70"> /mes</span>
              </p>
              <ul className="mt-4 text-sm space-y-2">
                <li>✓ Todo Starter</li>
                <li>✓ Gestión de productos (añadir/editar/agotar)</li>
                <li>✓ Recibir pedidos online (efectivo / pago en tienda)</li>
              </ul>
              <a
                href="#contacto"
                onClick={() => sendGA('generate_lead', { location: 'pricing', label: 'Medium' })}
                className="mt-6 inline-block rounded-xl px-5 py-3 font-semibold text-white shadow"
                style={{ background: `linear-gradient(135deg, ${BUSINESS.colors.orange}, ${BUSINESS.colors.green})` }}
              >
                Empezar ahora
              </a>
            </div>

            {/* Premium */}
            <div className="rounded-2xl p-6 bg-white border shadow-sm">
              <h3 className="font-semibold text-lg">Premium</h3>
              <p className="mt-2 text-4xl font-extrabold tracking-tight">
                {BUSINESS.pricing.premium}{BUSINESS.pricing.currency}
                <span className="text-base font-medium text-brand-dark/70"> /mes</span>
              </p>
              <ul className="mt-4 text-sm space-y-2">
                <li>✓ Todo Medium</li>
                <li>✓ Pago con tarjeta en la web (Stripe)</li>
                <li>✓ Estadísticas de ventas</li>
              </ul>
              <a
                href="#contacto"
                onClick={() => sendGA('generate_lead', { location: 'pricing', label: 'Premium' })}
                className="mt-6 inline-block rounded-xl px-5 py-3 font-semibold text-white shadow"
                style={{ background: `linear-gradient(135deg, ${BUSINESS.colors.orange}, ${BUSINESS.colors.green})` }}
              >
                Empezar ahora
              </a>

              <p className="text-xs mt-3 text-brand-dark/60">
                La pasarela Stripe aplica su propia comisión por transacción.
              </p>
            </div>
          </div>

          <p className="text-xs text-center mt-6 text-brand-dark/60">{BUSINESS.pricing.legalNote}</p>
        </div>
      </section>

      {/* ====== GARANTÍAS ====== */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="rounded-2xl p-6 bg-brand-light">
            <h3 className="font-semibold">Sin permanencia</h3>
            <p className="text-sm mt-2 text-brand-dark/80">Cancela cuando quieras. (Puedes contratar 3 meses al inicio con mejor precio.)</p>
          </div>
          <div className="rounded-2xl p-6 bg-brand-light">
            <h3 className="font-semibold">14 días de satisfacción</h3>
            <p className="text-sm mt-2 text-brand-dark/80">Si no encaja contigo, te ayudamos a salir sin dolores de cabeza.</p>
          </div>
          <div className="rounded-2xl p-6 bg-brand-light">
            <h3 className="font-semibold">En marcha en 48 h</h3>
            <p className="text-sm mt-2 text-brand-dark/80">Compromiso de implantación exprés. Si no llegamos, te compensamos.</p>
          </div>
        </div>
      </section>

      {/* ====== FAQ ====== */}
      <section id="faq" className="mx-auto max-w-5xl px-4 sm:px-6 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center [text-wrap:balance]">Preguntas frecuentes</h2>
        <div className="mt-8 space-y-4">
          {FAQS.map((f, i) => (
            <details key={i} className="group bg-white rounded-xl p-4 shadow-sm open:shadow-md">
              <summary className="cursor-pointer font-medium group-open:text-brand-green">
                {f.q}
              </summary>
              <p className="mt-2 text-sm text-brand-dark/80">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ====== CONTACTO ====== */}
      <section id="contacto" className="bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-16">
          <div className="rounded-2xl p-6 md:p-8 shadow-lg border">
            <h2 className="text-3xl font-bold [text-wrap:balance]">Solicita tu demo</h2>
            <p className="mt-2 text-brand-dark/80">
              Déjanos tus datos y te contactamos para enseñarte PideLocal funcionando con tu marca.
            </p>

            <form onSubmit={handleContact} className="mt-6 grid md:grid-cols-2 gap-4">
              <div className="col-span-2 md:col-span-1">
                <label className="text-sm">Nombre</label>
                <input
                  required
                  value={form.nombre}
                  onChange={e=>setForm(s=>({...s, nombre:e.target.value}))}
                  className="w-full mt-1 rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-green"
                />
              </div>
              <div className="col-span-2 md:col-span-1">
                <label className="text-sm">Email</label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={e=>setForm(s=>({...s, email:e.target.value}))}
                  className="w-full mt-1 rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-green"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Teléfono</label>
                <input
                  type="tel"
                  inputMode="tel"
                  name="telefono"
                  value={form.telefono}
                  onChange={(e) => setForm((f) => ({ ...f, telefono: e.target.value }))}
                  placeholder="+34 600 000 000"
                  className="w-full rounded-xl border px-4 py-3 mb-4"
                />

              </div>
              <div className="col-span-2">
                <label className="text-sm">Nombre del negocio</label>
                <input
                  value={form.negocio}
                  onChange={e=>setForm(s=>({...s, negocio:e.target.value}))}
                  className="w-full mt-1 rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-green"
                />
              </div>
              <div className="col-span-2">
                <label className="text-sm">Mensaje</label>
                <textarea
                  rows={4}
                  value={form.mensaje}
                  onChange={e=>setForm(s=>({...s, mensaje:e.target.value}))}
                  className="w-full mt-1 rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-green"
                />
              </div>

              <div className="col-span-2 flex flex-wrap gap-3 items-center">
                <button
                  disabled={sending}
                  className="rounded-xl px-5 py-3 font-semibold text-white disabled:opacity-60 shadow"
                  style={{ background: `linear-gradient(135deg, ${BUSINESS.colors.orange}, ${BUSINESS.colors.green})` }}
                >
                  {sending ? 'Abriendo tu email…' : 'Enviar solicitud'}
                </button>

                {/* WhatsApp opcional — solo se muestra si BUSINESS.whatsapp tiene valor */}
                {BUSINESS.whatsapp && (
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href={BUSINESS.whatsapp}
                    className="rounded-xl border px-5 py-3 font-semibold hover:bg-brand-light"
                  >
                    Hablar por WhatsApp
                  </a>
                )}
              </div>
            </form>

            <p className="text-xs mt-4 text-brand-dark/60">
              Al enviar este formulario, nos pondremos en contacto contigo por email o teléfono si nos lo facilitas.
            </p>
          </div>
        </div>
      </section>

      {/* ====== FOOTER ====== */}
      <footer className="border-t bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src={BUSINESS.assets.icon} alt="icon" className="h-6 w-6" />
            <span className="text-sm">&copy; {year} PideLocal. Todos los derechos reservados.</span>
          </div>
          <div className="text-sm flex flex-wrap items-center gap-x-3 gap-y-2">
            <a href={`mailto:${BUSINESS.email}`} className="hover:text-brand-green">Contacto</a>
            <span className="opacity-50">·</span>
            <a href="#precios" className="hover:text-brand-green">Precios</a>
            <span className="opacity-50">·</span>
            {/* 👇 enlaces legales correctos (sin el grupo) */}
            <a href="/aviso-legal" className="hover:text-brand-green">Aviso legal</a>
            <span className="opacity-50">·</span>
            <a href="/privacidad" className="hover:text-brand-green">Privacidad</a>
            <span className="opacity-50">·</span>
            <a href="/cookies" className="hover:text-brand-green">Cookies</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
