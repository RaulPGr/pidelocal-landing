import Link from "next/link";

/*
  app/(legal)/privacidad/page.tsx

  Página de Política de Privacidad basada en tu texto.
  Se han añadido comentarios (TODO) donde debes introducir datos ahora o más adelante:
  - RESPONSABLE: nombre y apellidos o razón social.
  - NIF/CIF.
  - DOMICILIO: dirección completa.
  - EMAIL de contacto (y su mailto).
  - (Opcional) proveedores concretos en Destinatarios.
  - FECHA de última actualización.

  Nota: El enlace "Volver" al final apunta a "/" (inicio). Para volver al historial del navegador,
  convierte este archivo en componente de cliente (añade 'use client' arriba) y usa router.back().
*/

export default function Privacidad() {
  return (
    <main className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-bold">Política de Privacidad</h1>

      {/* Responsable e identificación */}
      <section className="mt-6 space-y-2 text-sm leading-6">
        <p>
          <strong>Responsable:</strong>{" "}
          {/* TODO: Sustituye por tu nombre y apellidos o razón social */}
          <span>NOMBRE Y APELLIDOS / RAZÓN SOCIAL (PideLocal)</span>
        </p>
        <p>
          <strong>NIF/CIF:</strong>{" "}
          {/* TODO: Sustituye por tu NIF/CIF */}
          <span>NÚMERO</span>
        </p>
        <p>
          <strong>Domicilio:</strong>{" "}
          {/* TODO: Dirección completa */}
          <span>DIRECCIÓN COMPLETA</span>
        </p>
        <p>
          <strong>Email:</strong>{" "}
          {/* TODO: Sustituye el email y el mailto por tu correo */}
          <a href="mailto:CORREO@DOMINIO" className="text-emerald-600 underline">CORREO@DOMINIO</a>
        </p>
      </section>

      {/* 1. Datos que tratamos */}
      <section className="mt-8 space-y-3 text-sm leading-7">
        <h2 className="text-xl font-semibold">1. Datos que tratamos</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            Identificativos y de contacto: nombre, email, teléfono (p. ej., formularios de contacto o demo).
          </li>
          <li>
            Datos de navegación: IP, identificadores de dispositivo, páginas visitadas (si activas analítica).
          </li>
          <li>
            Soporte: mensajes/incidencias que nos envías.
          </li>
        </ul>
      </section>

      {/* 2. Finalidades */}
      <section className="mt-8 space-y-3 text-sm leading-7">
        <h2 className="text-xl font-semibold">2. Finalidades</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>Atender solicitudes de información, demos y soporte.</li>
          <li>Enviar comunicaciones relacionadas con el servicio (administrativas/operativas).</li>
          <li>Mejorar el sitio y la seguridad (logs, prevención de abuso).</li>
          <li>(Opcional) Analítica con consentimiento.</li>
        </ul>
      </section>

      {/* 3. Base jurídica */}
      <section className="mt-8 space-y-3 text-sm leading-7">
        <h2 className="text-xl font-semibold">3. Base jurídica</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>Ejecución de contrato o precontrato (responder solicitudes).</li>
          <li>Interés legítimo (seguridad, mejora del servicio, antifraude, siempre ponderado).</li>
          <li>Consentimiento (analítica/cookies no técnicas, comunicaciones comerciales).</li>
        </ul>
      </section>

      {/* 4. Plazos de conservación */}
      <section className="mt-8 space-y-3 text-sm leading-7">
        <h2 className="text-xl font-semibold">4. Plazos de conservación</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            Datos de contacto/soporte: mientras exista relación y el tiempo necesario para atender
            responsabilidades legales.
          </li>
          <li>Analítica/cookies: según lo indicado en la Política de Cookies.</li>
        </ul>
      </section>

      {/* 5. Destinatarios y encargados */}
      <section className="mt-8 space-y-3 text-sm leading-7">
        <h2 className="text-xl font-semibold">5. Destinatarios y encargados</h2>
        <p>
          Proveedores que nos dan soporte (alojamiento, BBDD, pago, emails):
          {/* TODO: Ajusta la lista a tus proveedores reales si corresponde */}
          Vercel, Supabase, Stripe, etc. Todos actúan como encargados conforme a RGPD, con sus
          contratos de encargo.
        </p>
      </section>

      {/* 6. Transferencias internacionales */}
      <section className="mt-8 space-y-3 text-sm leading-7">
        <h2 className="text-xl font-semibold">6. Transferencias internacionales</h2>
        <p>
          Puede haber transferencias fuera del EEE si el proveedor está en terceros países. En tal
          caso, exigimos garantías adecuadas (cláusulas contractuales tipo u otras).
        </p>
      </section>

      {/* 7. Derechos de las personas */}
      <section className="mt-8 space-y-3 text-sm leading-7">
        <h2 className="text-xl font-semibold">7. Derechos de las personas</h2>
        <p>
          Puedes ejercer acceso, rectificación, supresión, oposición, limitación, portabilidad y retirar
          consentimientos en cualquier momento escribiendo a {" "}
          {/* TODO: Sustituye el email y el mailto por tu correo */}
          <a href="mailto:CORREO@DOMINIO" className="text-emerald-600 underline">CORREO@DOMINIO</a>.
        </p>
        <p>
          Si no quedas conforme, puedes reclamar ante la {" "}
          <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer" className="text-emerald-600 underline">
            AEPD (www.aepd.es)
          </a>.
        </p>
      </section>

      {/* 8. Seguridad */}
      <section className="mt-8 space-y-3 text-sm leading-7">
        <h2 className="text-xl font-semibold">8. Seguridad</h2>
        <p>
          Aplicamos medidas técnicas y organizativas para proteger tus datos (control de acceso,
          cifrado en tránsito, backups, etc.).
        </p>
      </section>

      {/* 9. Menores */}
      <section className="mt-8 space-y-3 text-sm leading-7">
        <h2 className="text-xl font-semibold">9. Menores</h2>
        <p>
          No dirigimos el servicio a menores. Si detectamos datos de menores sin consentimiento
          válido, los eliminaremos.
        </p>
      </section>

      {/* Fecha de última actualización */}
      <p className="mt-8 text-sm text-neutral-700">
        {/* TODO: Sustituye por la fecha real de tu última actualización */}
        Fecha de última actualización: DD/MM/AAAA
      </p>

      {/* Enlace para volver */}
      <div className="mt-10">
        {/*
          Si prefieres volver a la página anterior del navegador:
          - Añade 'use client' al inicio del archivo
          - Usa el hook useRouter() y un botón con router.back()
        */}
        <Link href="/" className="text-sm text-emerald-700 underline">
          Volver
        </Link>
      </div>
    </main>
  );
}

