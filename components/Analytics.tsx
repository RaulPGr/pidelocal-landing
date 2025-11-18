"use client";
import Script from "next/script";

// ID de medición de GA4 desde las variables de entorno públicas
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function Analytics() {
  // Si no hay ID, no cargamos nada
  if (!GA_MEASUREMENT_ID) return null;

  return (
    <>
      {/* Carga del script de Google Analytics 4 */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />

      {/* Inicialización básica de GA4 */}
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            anonymize_ip: true,
            debug_mode: true
          });
        `}
      </Script>
    </>
  );
}
