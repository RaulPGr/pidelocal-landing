/* app/(legal)/aviso-legal/page.tsx
   ⚠️ Plantilla básica. Sustituye los TODO con tus datos reales.
*/
export default function AvisoLegal() {
  return (
    <main className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-bold">Aviso legal</h1>
      <p className="mt-4 text-sm text-brand-dark/80">
        Este sitio web es operado por <strong>PideLocal</strong> (en adelante, “la empresa”).  
        {/* TODO: Nombre fiscal y NIF/CIF si procede */}
      </p>

      <section className="mt-8 space-y-3 text-sm leading-6">
        <p><strong>Titular:</strong> {/* TODO: Tu nombre o razón social */}</p>
        <p><strong>NIF/CIF:</strong> {/* TODO */}</p>
        <p><strong>Domicilio:</strong> {/* TODO (opcional) */}</p>
        <p><strong>Contacto:</strong> <a href="mailto:pidelocal.contacto@gmail.com" className="text-brand-green underline">pidelocal.contacto@gmail.com</a></p>
      </section>

      <section className="mt-8 space-y-4 text-sm leading-7">
        <h2 className="text-xl font-semibold">Condiciones de uso</h2>
        <p>
          El acceso y uso de este sitio web implica la aceptación de estas condiciones. El usuario se compromete a hacer un uso adecuado de los contenidos y a no emplearlos para actividades ilícitas.
        </p>

        <h2 className="text-xl font-semibold mt-6">Propiedad intelectual</h2>
        <p>
          Salvo indicación expresa, los contenidos, marcas y logotipos de este sitio son propiedad de la empresa o de sus licenciantes. Queda prohibida su reproducción sin autorización.
        </p>

        <h2 className="text-xl font-semibold mt-6">Responsabilidad</h2>
        <p>
          La empresa no se hace responsable de daños derivados del uso del sitio ni de enlaces a terceros. Haremos lo posible por mantener la web actualizada y disponible.
        </p>
      </section>
    </main>
  );
}
