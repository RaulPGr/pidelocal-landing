/* app/(legal)/privacidad/page.tsx
   ⚠️ Plantilla básica de privacidad (simplificada). Ajusta a tus flujos reales.
*/
export default function Privacidad() {
  return (
    <main className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-bold">Política de privacidad</h1>

      <p className="mt-4 text-sm text-brand-dark/80">
        En <strong>PideLocal</strong> tratamos tus datos personales con transparencia y seguridad.
        Si tienes dudas, escríbenos a <a href="mailto:pidelocal.contacto@gmail.com" className="text-brand-green underline">pidelocal.contacto@gmail.com</a>.
      </p>

      <section className="mt-8 space-y-4 text-sm leading-7">
        <h2 className="text-xl font-semibold">Responsable del tratamiento</h2>
        <p>
          {/* TODO: Nombre del responsable, NIF, dirección (opcional) */}
          Responsable: <strong>PideLocal</strong>.
        </p>

        <h2 className="text-xl font-semibold">Datos que recopilamos</h2>
        <ul className="list-disc pl-5">
          <li>Datos de contacto del formulario: nombre, email, teléfono, nombre del negocio y mensaje.</li>
          <li>Datos analíticos de navegación (Google Analytics 4) de forma agregada/anónima.</li>
        </ul>

        <h2 className="text-xl font-semibold">Finalidad y base jurídica</h2>
        <ul className="list-disc pl-5">
          <li>Responder a tu solicitud de demo o información (interés legítimo / medidas precontractuales).</li>
          <li>Mejorar la web con estadísticas de uso (interés legítimo).</li>
        </ul>

        <h2 className="text-xl font-semibold">Conservación</h2>
        <p>
          Conservamos tus datos el tiempo necesario para gestionar tu solicitud o relación comercial, y durante los plazos legales aplicables.
        </p>

        <h2 className="text-xl font-semibold">Destinatarios</h2>
        <p>
          Proveedores tecnológicos (alojamiento, analítica). No vendemos tus datos. Las pasarelas de pago (Stripe) aplican sus propias condiciones cuando proceda.
        </p>

        <h2 className="text-xl font-semibold">Derechos</h2>
        <p>
          Puedes ejercer acceso, rectificación, supresión y otros derechos escribiendo a
          <a href="mailto:pidelocal.contacto@gmail.com" className="text-brand-green underline"> pidelocal.contacto@gmail.com</a>.
        </p>
      </section>
    </main>
  );
}
