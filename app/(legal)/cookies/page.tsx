/* app/(legal)/cookies/page.tsx
   ⚠️ Plantilla cookies simple. Si más adelante añades banners de consentimiento,
   actualiza esta página con el detalle técnico (cookies, fines, proveedores).
*/
export default function Cookies() {
  return (
    <main className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-bold">Política de cookies</h1>
      <p className="mt-4 text-sm text-brand-dark/80">
        Este sitio utiliza cookies técnicas necesarias y herramientas de análisis (Google Analytics 4).
      </p>

      <section className="mt-8 space-y-4 text-sm leading-7">
        <h2 className="text-xl font-semibold">¿Qué cookies usamos?</h2>
        <ul className="list-disc pl-5">
          <li>Cookies técnicas para el funcionamiento básico del sitio.</li>
          <li>Cookies de analítica (GA4) para medir uso de la web de forma agregada.</li>
        </ul>
        <h2 className="text-xl font-semibold">Cómo gestionar cookies</h2>
        <p>
          Puedes configurar tu navegador para bloquear o eliminar cookies. Ten en cuenta que al hacerlo
          algunas funcionalidades podrían no operar correctamente.
        </p>
      </section>
    </main>
  );
}
