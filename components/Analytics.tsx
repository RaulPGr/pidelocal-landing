"use client";
import Script from "next/script";
import { useEffect, useState } from "react";

const GA_MEASUREMENT_ID = "G-EH2DBM9Y3"; // TODO: Sustituye por tu ID si cambia
const STORAGE_KEY = "cookie-consent-v1";

function analyticsAllowed(): boolean {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    const c = JSON.parse(raw);
    return !!c?.analytics;
  } catch {}
  return false;
}

export default function Analytics() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(analyticsAllowed());
    const onChange = () => setEnabled(analyticsAllowed());
    window.addEventListener("cookie-consent-changed", onChange as any);
    return () => window.removeEventListener("cookie-consent-changed", onChange as any);
  }, []);

  if (!enabled) return null;

  return (
    <>
      {/* Consent Mode default (por seguridad dejamos denied por defecto y luego GA actualizará con el update de CookieConsent) */}
      <Script id="consent-default" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('consent', 'default', {
            'analytics_storage': 'denied',
            'ad_storage': 'denied',
            'ad_user_data': 'denied',
            'ad_personalization': 'denied'
          });
        `}
      </Script>

      {/* Carga de GA4 y configuración */}
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);} 
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', { debug_mode: true });
        `}
      </Script>
    </>
  );
}

