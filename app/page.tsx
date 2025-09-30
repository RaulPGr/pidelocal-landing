/* app/page.tsx
   Landing de PideLocal — Next.js App Router + Tailwind.
   TODO: coloca tus imágenes en /public/brand/ y ajusta las rutas de <img>.
*/

'use client';

import { useMemo, useState } from 'react';

type Feature = { title: string; desc: string };
type Step = { num: string; title: string; desc: string };
type FAQ = { q: string; a: string };

export default function Page() {
  /* =========================
     🔧 CONTENIDO EDITABLE
     Cambia aquí textos, precios, enlaces y contacto.
     ========================= */
  const SITE = {
    name: 'PideLocal',
    tagline: 'Tu restaurante online en minutos',
    sub: 'Pedidos online rápidos, sin comisiones por pedido y con tu propia marca.',
    ctaPrimary: { label: 'Solicita demo gratis', href: '#contacto' },
    ctaSecondary: { label: 'Ver ejemplos', href: '#ejemplos' },
    pricing: {
      setup: 149,
      monthly: 25,
      currency: '€',
      bullets: [
        'Página web propia con tu marca',
        'Menú digital y gestión de pedidos',
        'Pagos en efectivo y tarjeta',
        'Soporte básico incluido',
      ],
    },
    contact: {
      email: 'pidelocal.contacto@gmail.com',
      whatsapp: '',
    },
    assets: {
      logo: '/brand/logo-pidelocal.png',
      icon: '/brand/icono-pidelocal.png',
      heroMock: '/brand/hero-mock.png',
      demo1: '/brand/demo-home.png',
      demo2: '/brand/demo-menu.png',
      demo3: '/brand/demo-checkout.png',
    },
  };

  const FEATURES: Feature[] = [
    { title: 'Más pedidos, sin intermediarios', desc: 'Recibe pedidos directos desde tu web, sin pagar comisiones por pedido.' },
    { title: 'Listo en 24–48 h', desc: 'Plantillas adaptadas a tu marca. Nosotros lo montamos y tú empiezas a vender.' },
    { title: 'Diseño responsive', desc: 'Perfecto en móvil: donde hoy se hace la mayoría de pedidos.' },
    { title: 'Pagos y gestión sencillos', desc: 'Efectivo y tarjeta. Panel claro para confirmar pedidos.' },
  ];

  const STEPS: Step[] = [
    { num: '1', title: 'Cuéntanos sobre tu negocio', desc: 'Nombre, logo, horarios, ubicación y tu menú.' },
    { num: '2', title: 'Configuramos tu web', desc: 'Activamos tu estilo (urbano, vibrante o minimal) y dejamos todo listo.' },
    { num: '3', title: 'Empiezas a recibir pedidos', desc: 'Comparte tu enlace y recibe pedidos directo al panel.' },
  ];

  const FAQS: FAQ[] = [
    { q: '¿Hay permanencia?', a: 'No. Puedes darte de baja cuando quieras. Solo pagas el mes en curso.' },
    { q: '¿Podéis cargar nuestro menú?', a: 'Sí. Durante la implantación te ayudamos a cargar productos y precios.' },
    { q: '¿Puedo usar mi propio dominio?', a: 'Sí. Podemos conectar tu dominio (ej. tudominio.com) a tu web de PideLocal.' },
    { q: '¿Incluye pagos con tarjeta?', a: 'Sí, integramos pagos por tarjeta. También puedes aceptar efectivo a la recogida.' },
  ];

  const year = useMemo(() => new Date().getFullYear(), []);
  const [sending, setSending] = useState(false);
  const [form, setForm] = useState({ nombre: '', email: '', negocio: '', mensaje: '' });

  const handleContact = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    const subject = encodeURIComponent(`Demo ${SITE.name} - ${form.negocio || form.nombre}`);
    const body = encodeURIComponent(
      `Hola, soy ${form.nombre} (${form.email}).\n\nNegocio: ${form.negocio}\n\nMensaje:\n${form.mensaje}\n\n— Enviado desde la landing de ${SITE.name}`
    );
    window.location.href = `mailto:${SITE.contact.email}?subject=${subject}&body=${body}`;
    setTimeout(() => setSending(false), 800);
  };

  return (
    <main className="min-h-screen bg-brand-light text-brand-dark">
      {/* ====== NAVBAR ====== */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-black/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-3 flex items-center justify-between">
          {/* LOGO: ajusta la ruta en SITE.assets.logo */}
          <a href="#" className="flex items-center gap-3">
            <img src={SITE.assets.logo} alt={SITE.name} className="h-8 w-auto" />
            <span className="font-semibold">{SITE.name}</span>
          </a>

          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#features" className="hover:text-brand-green">Beneficios</a>
            <a href="#como-funciona" className="hover:text-brand-green">Cómo funciona</a>
            <a href="#ejemplos" className="hover:text-brand-green">Ejemplos</a>
            <a href="#precios" className="hover:text-brand-green">Precios</a>
            <a href="#faq" className="hover:text-brand-green">FAQ</a>
          </nav>

          <a href={SITE.ctaPrimary.href} className="hidden md:inline-block rounded-xl px-4 py-2 text-white font-medium"
             style={{ background: 'linear-gradient(135deg, var(--orange), var(--green))' }}>
            {SITE.ctaPrimary.label}
          </a>
        </div>
      </header>

      <style>{`:root{--orange:#D4572A;--green:#2FA24D}`}</style>

      {/* ====== HERO ====== */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
  {/* Degradado de marca */}
  <div
    className="absolute inset-0"
    style={{ background: 'linear-gradient(135deg, #C14F25 0%, #238E41 100%)' }} // un pelín más oscuro
  />
  {/* Scrim para mejorar contraste del texto en la parte izquierda */}
  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,_rgba(0,0,0,0.45),_transparent_60%)]" />
</div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-20 md:py-28 text-white">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
  <div className="max-w-2xl bg-black/30 backdrop-blur-sm rounded-2xl p-6 ring-1 ring-white/10">
    <h1 className="text-4xl md:text-5xl font-extrabold leading-tight drop-shadow-sm">
      {SITE.tagline}
    </h1>
    <p className="mt-5 text-lg/relaxed text-white/95">
      {SITE.sub}
    </p>
    <div className="mt-8 flex items-center gap-3">
      <a
        href={SITE.ctaPrimary.href}
        className="rounded-xl bg-white text-brand-dark px-5 py-3 font-semibold hover:opacity-95"
      >
        {SITE.ctaPrimary.label}
      </a>
      <a
        href={SITE.ctaSecondary.href}
        className="rounded-xl border border-white/70 px-5 py-3 font-semibold hover:bg-white/10 text-white"
      >
        {SITE.ctaSecondary.label}
      </a>
    </div>
    <div className="mt-8 flex items-center gap-4 opacity-90">
      <img src={SITE.assets.icon} alt="Icono PideLocal" className="h-8 w-8" />
      <span className="text-sm text-white/90">Sin comisiones por pedido • 100% tu marca</span>
    </div>
  </div>
</div>


            <div className="hidden md:block">
              <div className="bg-white/95 rounded-2xl p-3 shadow-xl">
                <img src={SITE.assets.heroMock} alt="Ejemplo de web PideLocal" className="w-full h-auto rounded-xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== BENEFICIOS ====== */}
      <section id="features" className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center">Beneficios para tu negocio</h2>
        <p className="text-center mt-3 text-brand-dark/80">Lo importante: vender más y simplificar tu día a día.</p>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((f, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition">
              <div className="text-3xl mb-3 select-none">{['🛒','⚡','📱','💳'][i] || '✨'}</div>
              <h3 className="font-semibold">{f.title}</h3>
              <p className="text-sm mt-2 text-brand-dark/80">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ====== CÓMO FUNCIONA ====== */}
      <section id="como-funciona" className="bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center">Cómo funciona</h2>
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            {STEPS.map((s, i) => (
              <div key={i} className="rounded-2xl p-6 bg-brand-light">
                <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white"
                     style={{ background: 'linear-gradient(135deg, #D4572A, #2FA24D)' }}>
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
        <h2 className="text-3xl md:text-4xl font-bold text-center">Ejemplos reales</h2>
        <p className="text-center mt-3 text-brand-dark/80">Así verían tus clientes la carta y el pedido.</p>

        <div className="mt-10 grid md:grid-cols-3 gap-6">
          <img src={SITE.assets.demo1} alt="Demo - Inicio" className="rounded-xl shadow-sm" />
          <img src={SITE.assets.demo2} alt="Demo - Menú" className="rounded-xl shadow-sm" />
          <img src={SITE.assets.demo3} alt="Demo - Pago" className="rounded-xl shadow-sm" />
        </div>
      </section>

      {/* ====== PRECIOS ====== */}
      <section id="precios" className="bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center">Planes y precios</h2>
          <p className="text-center mt-3 text-brand-dark/80">Transparente y sin sorpresas.</p>

          <div className="mt-10 grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl p-6 bg-brand-light shadow-sm">
              <h3 className="font-semibold text-lg">Implantación única</h3>
              <p className="mt-2 text-4xl font-extrabold">
                {SITE.pricing.setup}{SITE.pricing.currency}
                <span className="text-base font-medium text-brand-dark/70"> pago único</span>
              </p>
              <ul className="mt-4 text-sm space-y-2">
                <li>✓ Puesta en marcha en 24–48 h</li>
                <li>✓ Carga inicial de tu menú</li>
                <li>✓ Personalización a tu imagen</li>
                <li>✓ Dominio y SEO básico</li>
              </ul>
            </div>

            <div className="rounded-2xl p-6 bg-white border shadow-sm">
              <h3 className="font-semibold text-lg">Suscripción mensual</h3>
              <p className="mt-2 text-4xl font-extrabold">
                {SITE.pricing.monthly}{SITE.pricing.currency}
                <span className="text-base font-medium text-brand-dark/70"> /mes</span>
              </p>
              <ul className="mt-4 text-sm space-y-2">
                {SITE.pricing.bullets.map((b, i) => <li key={i}>✓ {b}</li>)}
              </ul>
              <a href="#contacto"
                 className="mt-6 inline-block rounded-xl px-5 py-3 font-semibold text-white"
                 style={{ background: 'linear-gradient(135deg, #D4572A, #2FA24D)' }}>
                Empezar ahora
              </a>
            </div>
          </div>

          <p className="text-xs text-center mt-6 text-brand-dark/60">
            *Precios orientativos sin IVA. Podemos adaptar un plan a medida si lo necesitas.
          </p>
        </div>
      </section>

      {/* ====== FAQ ====== */}
      <section id="faq" className="mx-auto max-w-5xl px-4 sm:px-6 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center">Preguntas frecuentes</h2>
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
            <h2 className="text-3xl font-bold">Solicita tu demo</h2>
            <p className="mt-2 text-brand-dark/80">
              Déjanos tus datos y te contactamos para enseñarte PideLocal funcionando con tu marca.
            </p>

            <form onSubmit={handleContact} className="mt-6 grid md:grid-cols-2 gap-4">
              <div className="col-span-2 md:col-span-1">
                <label className="text-sm">Nombre</label>
                <input required value={form.nombre}
                       onChange={e=>setForm(s=>({...s, nombre:e.target.value}))}
                       className="w-full mt-1 rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-green" />
              </div>
              <div className="col-span-2 md:col-span-1">
                <label className="text-sm">Email</label>
                <input required type="email" value={form.email}
                       onChange={e=>setForm(s=>({...s, email:e.target.value}))}
                       className="w-full mt-1 rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-green" />
              </div>
              <div className="col-span-2">
                <label className="text-sm">Nombre del negocio</label>
                <input value={form.negocio}
                       onChange={e=>setForm(s=>({...s, negocio:e.target.value}))}
                       className="w-full mt-1 rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-green" />
              </div>
              <div className="col-span-2">
                <label className="text-sm">Mensaje</label>
                <textarea rows={4} value={form.mensaje}
                          onChange={e=>setForm(s=>({...s, mensaje:e.target.value}))}
                          className="w-full mt-1 rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-green" />
              </div>

              <div className="col-span-2 flex flex-wrap gap-3 items-center">
                <button disabled={sending}
                        className="rounded-xl px-5 py-3 font-semibold text-white disabled:opacity-60"
                        style={{ background: 'linear-gradient(135deg, #D4572A, #2FA24D)' }}>
                  {sending ? 'Abriendo tu email…' : 'Enviar solicitud'}
                </button>

                {/* Enlace rápido a WhatsApp (opcional) */}
                  {SITE.contact.whatsapp && (
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href={SITE.contact.whatsapp}
                    className="rounded-xl border px-5 py-3 font-semibold hover:bg-brand-light"
                  >
                  Hablar por WhatsApp
                  </a>
)}

              </div>
            </form>

            <p className="text-xs mt-4 text-brand-dark/60">
              Al enviar este formulario, nos pondremos en contacto contigo por email o WhatsApp.
            </p>
          </div>
        </div>
      </section>

      {/* ====== FOOTER ====== */}
      <footer className="border-t bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src={SITE.assets.icon} alt="icon" className="h-6 w-6" />
            <span className="text-sm">&copy; {year} {SITE.name}. Todos los derechos reservados.</span>
          </div>
          <div className="text-sm">
            <a href={`mailto:${SITE.contact.email}`} className="hover:text-brand-green">Contacto</a>
            <span className="mx-2">·</span>
            <a href="#precios" className="hover:text-brand-green">Precios</a>
            <span className="mx-2">·</span>
            <a href="#faq" className="hover:text-brand-green">FAQ</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
