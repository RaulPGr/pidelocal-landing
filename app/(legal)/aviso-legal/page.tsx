import Link from "next/link";

/*
  app/(legal)/aviso-legal/page.tsx

  Esta página muestra el Aviso Legal. Se han dejado comentarios (TODO) en todos
  los lugares donde deberás introducir datos ahora o en futuras versiones:
  - NOMBRE COMERCIAL (cómo te identificas públicamente).
  - RESPONSABLE (nombre y apellidos o razón social).
  - NIF/CIF.
  - DOMICILIO.
  - EMAIL de contacto.
  - TELÉFONO de contacto.
  - DOMINIO del sitio.
  - CIUDAD/PROVINCIA para jurisdicción.
  - FECHA de última actualización.

  Nota: El enlace "Volver" al final apunta a "/" (inicio). Si prefieres que
  vuelva a la página anterior del navegador, puedes convertir este archivo
  en componente de cliente (añadiendo 'use client' al principio) y usar
  router.back().
*/

export default function AvisoLegal() {
  return (
    <main className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-bold">Aviso Legal</h1>

      {/* Identificación del titular y datos de contacto */}
      <section className="mt-6 space-y-2 text-sm leading-6">
        <p>
          <strong>Titular del sitio:</strong>{" "}
          {/* TODO: Sustituye NOMBRE COMERCIAL por tu nombre comercial oficial */}
          <span>
            NOMBRE COMERCIAL (en adelante, "PideLocal")
          </span>
        </p>
        <p>
          <strong>Responsable:</strong>{" "}
          {/* TODO: Sustituye por nombre y apellidos o razón social */}
          <span>NOMBRE Y APELLIDOS / RAZÓN SOCIAL</span>
        </p>
        <p>
          <strong>NIF/CIF:</strong>{" "}
          {/* TODO: Sustituye por tu NIF/CIF. Si no corresponde, elimina esta línea */}
          <span>NÚMERO</span>
        </p>
        <p>
          <strong>Domicilio:</strong>{" "}
          {/* TODO: Dirección completa (calle, número, CP, ciudad, país) */}
          <span>DIRECCIÓN COMPLETA, CIUDAD, PAÍS</span>
        </p>
        <p>
          <strong>Email:</strong>{" "}
          {/* TODO: Sustituye el email y el mailto por tu correo */}
          <a
            href="mailto:CORREO@DOMINIO"
            className="text-emerald-600 underline"
          >
            CORREO@DOMINIO
          </a>
        </p>
        <p>
          <strong>Teléfono:</strong>{" "}
          {/* TODO: Sustituye por tu número de teléfono. Si no aplica, elimina esta línea */}
          <span>NÚMERO</span>
        </p>
        <p>
          <strong>Dominio:</strong>{" "}
          {/* TODO: Sustituye por tu dominio real (incluye https://) */}
          <a
            href="https://TU-DOMINIO"
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-600 underline"
          >
            https://TU-DOMINIO
          </a>
        </p>
      </section>

      {/* Objeto */}
      <section className="mt-8 space-y-3 text-sm leading-7">
        <h2 className="text-xl font-semibold">Objeto</h2>
        <p>
          El presente Aviso Legal regula el acceso y uso del sitio web. El
          acceso implica la aceptación de estas condiciones.
        </p>
      </section>

      {/* Propiedad intelectual e industrial */}
      <section className="mt-8 space-y-3 text-sm leading-7">
        <h2 className="text-xl font-semibold">Propiedad intelectual e industrial</h2>
        <p>
          Todos los contenidos (textos, logotipos, imágenes, código, diseño) son
          titularidad de PideLocal o de terceros que han autorizado su uso.
          Queda prohibida su reproducción, distribución o transformación salvo
          autorización.
        </p>
      </section>

      {/* Condiciones de uso */}
      <section className="mt-8 space-y-3 text-sm leading-7">
        <h2 className="text-xl font-semibold">Condiciones de uso</h2>
        <p>
          El usuario se compromete a utilizar el sitio de forma lícita, sin
          dañar derechos o intereses de PideLocal o de terceros, y sin
          introducir malware o realizar actividades que sobrecarguen o
          inutilicen la web.
        </p>
      </section>

      {/* Enlaces externos */}
      <section className="mt-8 space-y-3 text-sm leading-7">
        <h2 className="text-xl font-semibold">Enlaces externos</h2>
        <p>
          Este sitio puede contener enlaces a terceros. PideLocal no es
          responsable de los contenidos o políticas de dichos sitios.
        </p>
      </section>

      {/* Responsabilidad */}
      <section className="mt-8 space-y-3 text-sm leading-7">
        <h2 className="text-xl font-semibold">Responsabilidad</h2>
        <p>
          PideLocal no garantiza la disponibilidad ininterrumpida del sitio ni
          se responsabiliza de daños derivados del uso o imposibilidad de uso
          del mismo, dentro de los límites legales.
        </p>
      </section>

      {/* Ley aplicable y jurisdicción */}
      <section className="mt-8 space-y-3 text-sm leading-7">
        <h2 className="text-xl font-semibold">Ley aplicable y jurisdicción</h2>
        <p>
          {/* TODO: Sustituye CIUDAD/PROVINCIA por tu jurisdicción competente */}
          Este Aviso Legal se rige por la legislación española. Salvo normativa
          imperativa, las partes se someten a los juzgados de CIUDAD/PROVINCIA.
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

