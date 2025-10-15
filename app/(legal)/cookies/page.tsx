import Link from "next/link";

/*
  app/(legal)/cookies/page.tsx

  Política de Cookies adaptada al stack actual del sitio:
  - GA4 presente en app/layout.tsx (gtag). No hay banner de consentimiento aún.

  TODOs marcados donde debes completar o ajustar:
  - Implementación de banner/gestor de consentimiento y enlazar "Configurar cookies".
  - Completar lista de cookies si añades Stripe, mapas u otros terceros.
  - Fecha de última actualización.
*/

export default function Cookies() {
  return (
    <main className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-bold">Política de Cookies</h1>

      {/* ¿Qué son las cookies? */}
      <section className="mt-6 space-y-3 text-sm leading-7">
        <h2 className="text-xl font-semibold">¿Qué son las cookies?</h2>
        <p>
          Archivos que se almacenan en tu dispositivo y permiten recordar ciertas
          informaciones (preferencias, sesión, analítica, etc.).
        </p>
      </section>

      {/* Tipos que usamos (adaptado) */}
      <section className="mt-8 space-y-3 text-sm leading-7">
        <h2 className="text-xl font-semibold">Tipos que usamos</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <strong>Técnicas (necesarias):</strong> para que la web funcione. Solo se usan si son
            imprescindibles para la prestación del servicio.
          </li>
          <li>
            <strong>Analíticas (opcionales):</strong> Google Analytics 4 para medir uso y rendimiento
            del sitio. {/* Importante: actualmente GA4 se carga sin consentimiento explícito. */}
          </li>
          <li>
            <strong>Preferencias / terceros:</strong> actualmente no utilizamos cookies de preferencias
            ni de terceros como mapas o pasarelas de pago. {/* TODO: Si añades Stripe, Maps u otros, descríbelos aquí. */}
          </li>
        </ul>
      </section>

      {/* Gestión del consentimiento */}
      <section className="mt-8 space-y-3 text-sm leading-7">
        <h2 className="text-xl font-semibold">Gestión del consentimiento</h2>
        <p>
          En tu primera visita deberíamos mostrar un banner para aceptar, rechazar o configurar
          cookies no necesarias (analíticas). {/* TODO: Implementar banner/gestor de consentimiento
          y bloquear GA4 hasta obtener consentimiento (RGPD). */}
        </p>
        <p>
          Puedes cambiar tu elección en cualquier momento desde {" "}
          {/* TODO: Enlaza este botón con tu gestor de consentimiento real */}
          <a href="#configurar-cookies" className="text-emerald-600 underline">
            Configurar cookies
          </a>.
        </p>
      </section>

      {/* Cómo desactivar cookies en el navegador */}
      <section className="mt-8 space-y-3 text-sm leading-7">
        <h2 className="text-xl font-semibold">Cómo desactivar cookies en el navegador</h2>
        <p>Puedes consultar cómo gestionar cookies en los siguientes enlaces oficiales:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <a className="text-emerald-600 underline" href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer">Chrome</a>
          </li>
          <li>
            <a className="text-emerald-600 underline" href="https://support.mozilla.org/kb/enable-and-disable-cookies-website-preferences" target="_blank" rel="noopener noreferrer">Firefox</a>
          </li>
          <li>
            <a className="text-emerald-600 underline" href="https://support.microsoft.com/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer">Edge</a>
          </li>
          <li>
            <a className="text-emerald-600 underline" href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" target="_blank" rel="noopener noreferrer">Safari</a>
          </li>
        </ul>
      </section>

      {/* Lista de cookies (adaptada al stack actual) */}
      <section className="mt-8 space-y-3 text-sm leading-7">
        <h2 className="text-xl font-semibold">Lista de cookies</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <code>_ga</code>, <code>_ga_*</code> (Google Analytics 4, analítica). Finalidad: estadísticas de uso.
            Persistencia: variable según configuración de GA4. {/* No cargar sin consentimiento. */}
          </li>
          {/* TODO: Añade aquí cookies adicionales si incorporas proveedores como Stripe (__stripe_mid, __stripe_sid), mapas, reproductores, etc. */}
        </ul>
      </section>

      {/* Fecha de última actualización */}
      <p className="mt-8 text-sm text-neutral-700">
        {/* TODO: Sustituye por la fecha real de tu última actualización */}
        Fecha de última actualización: DD/MM/AAAA
      </p>

      {/* Enlace para volver */}
      <div className="mt-10">
        <Link href="/" className="text-sm text-emerald-700 underline">
          Volver
        </Link>
      </div>
    </main>
  );
}
