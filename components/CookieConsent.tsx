"use client";
import { useEffect, useMemo, useState } from "react";

type Consent = {
  necessary: boolean;
  analytics: boolean;
  ts: number;
};

const STORAGE_KEY = "cookie-consent-v1";

function readConsent(): Consent | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (
      typeof parsed === "object" &&
      parsed &&
      typeof parsed.necessary === "boolean" &&
      typeof parsed.analytics === "boolean"
    ) {
      return parsed as Consent;
    }
  } catch {}
  return null;
}

function writeConsent(c: Consent) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(c));
  // Notifica a listeners (Analytics, etc.)
  window.dispatchEvent(new CustomEvent("cookie-consent-changed", { detail: c }));
  // Consent Mode v2 (solo analytics aquí)
  // @ts-ignore
  window.dataLayer = window.dataLayer || [];
    // Usa la gtag global si existe, si no, encola en dataLayer
  // @ts-ignore
  window.dataLayer = window.dataLayer || [];
  // @ts-ignore
  const gtag = (...args: any[]) => {
    // Si ya existe window.gtag (cargado por GA), la usamos
    if (typeof (window as any).gtag === "function") {
      (window as any).gtag(...args);
    } else {
      // Si aún no está cargado, encolamos en dataLayer como hace el snippet oficial
      (window as any).dataLayer.push(args);
    }
  };

  gtag("consent", "update", {
    analytics_storage: c.analytics ? "granted" : "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    ad_storage: "denied",
  });

}

export default function CookieConsent() {
  const [consent, setConsent] = useState<Consent | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [showPrefs, setShowPrefs] = useState(false);
  const [prefAnalytics, setPrefAnalytics] = useState(false);

  // Inicializa desde storage
  useEffect(() => {
    const saved = readConsent();
    if (saved) {
      setConsent(saved);
      setPrefAnalytics(saved.analytics);
      setShowBanner(false);
      // Importante: reenviar el estado de consentimiento a GA en cada carga
      // para levantar el modo consent a "granted" si procede.
      writeConsent(saved);
    } else {
      setShowBanner(true);
    }
  }, []);

  // Abre preferencias si se navega a #configurar-cookies
  useEffect(() => {
    const openIfAnchor = () => {
      if (typeof window !== "undefined" && window.location.hash === "#configurar-cookies") {
        setShowPrefs(true);
      }
    };
    openIfAnchor();
    window.addEventListener("hashchange", openIfAnchor);
    return () => window.removeEventListener("hashchange", openIfAnchor);
  }, []);

  const acceptAll = () => {
    const c: Consent = { necessary: true, analytics: true, ts: Date.now() };
    setConsent(c);
    setPrefAnalytics(true);
    setShowBanner(false);
    setShowPrefs(false);
    writeConsent(c);
  };

  const rejectAll = () => {
    const c: Consent = { necessary: true, analytics: false, ts: Date.now() };
    setConsent(c);
    setPrefAnalytics(false);
    setShowBanner(false);
    setShowPrefs(false);
    writeConsent(c);
  };

  const savePrefs = () => {
    const c: Consent = { necessary: true, analytics: !!prefAnalytics, ts: Date.now() };
    setConsent(c);
    setShowBanner(false);
    setShowPrefs(false);
    writeConsent(c);
  };

  // Exponer apertura de preferencias desde consola o enlaces custom
  useEffect(() => {
    (window as any).openCookiePreferences = () => setShowPrefs(true);
  }, []);

  // UI
  return (
    <>
      {showBanner && (
        <div className="fixed inset-x-0 bottom-0 z-[60] border-t bg-white/95 backdrop-blur px-4 py-4 shadow">
          <div className="mx-auto max-w-5xl flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
            <p className="text-sm text-gray-800">
              Usamos cookies técnicas necesarias y, opcionalmente, analíticas (GA4) para mejorar el sitio.
              Puedes aceptarlas, rechazarlas o configurarlas.
            </p>
            <div className="ml-auto flex items-center gap-2">
              <button onClick={rejectAll} className="rounded-lg border px-3 py-2 text-sm hover:bg-gray-50">
                Rechazar
              </button>
              <button onClick={() => setShowPrefs(true)} id="configurar-cookies" className="rounded-lg border px-3 py-2 text-sm hover:bg-gray-50">
                Configurar
              </button>
              <button onClick={acceptAll} className="rounded-lg px-4 py-2 text-sm text-white bg-emerald-600 hover:bg-emerald-700 shadow">
                Aceptar
              </button>
            </div>
          </div>
        </div>
      )}

      {showPrefs && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowPrefs(false)} />
          <div className="relative mx-4 w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="text-lg font-semibold">Preferencias de cookies</h2>
            <p className="mt-2 text-sm text-gray-600">
              Las cookies técnicas son necesarias y siempre activas. Puedes elegir si permites cookies analíticas (GA4).
            </p>

            <div className="mt-5 flex items-start gap-3">
              <input id="consent-analytics" type="checkbox" className="mt-1 h-4 w-4" checked={prefAnalytics} onChange={(e) => setPrefAnalytics(e.target.checked)} />
              <label htmlFor="consent-analytics" className="text-sm">
                Permitir cookies analíticas (Google Analytics 4)
              </label>
            </div>

            <div className="mt-6 flex items-center justify-end gap-2">
              <button onClick={rejectAll} className="rounded-lg border px-3 py-2 text-sm hover:bg-gray-50">Rechazar todo</button>
              <button onClick={savePrefs} className="rounded-lg px-4 py-2 text-sm text-white bg-emerald-600 hover:bg-emerald-700 shadow">Guardar</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
