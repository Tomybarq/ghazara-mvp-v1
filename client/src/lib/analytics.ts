/**
 * Ghazara Analytics & CRO Event Tracker
 * 
 * Privacy-First & Zero-PII (Personally Identifiable Information)
 * Tracks conversion funnels and user actions without ever transmitting personal names,
 * phone numbers, email addresses, or arbitrary request notes.
 */

type ConversionEvent =
  | { name: "view_service"; properties: { serviceId: string; locale: string } }
  | { name: "view_product"; properties: { productId: string; locale: string } }
  | { name: "click_whatsapp"; properties: { source: string; locale: string } }
  | { name: "start_rfq"; properties: { sector?: string; service?: string; locale: string } }
  | { name: "submit_rfq"; properties: { sector: string; service: string; region: string; locale: string } }
  | { name: "submit_contact"; properties: { category?: string; locale: string } };

export function trackConversion(event: ConversionEvent): void {
  try {
    if (typeof window === "undefined") return;

    // Dispatch to Vercel Analytics / Custom Event Bus if available
    const win = window as unknown as {
      va?: (action: string, eventName: string, data?: Record<string, unknown>) => void;
      dataLayer?: Array<Record<string, unknown>>;
    };

    if (typeof win.va === "function") {
      win.va("event", event.name, event.properties);
    }

    if (Array.isArray(win.dataLayer)) {
      win.dataLayer.push({
        event: event.name,
        ...event.properties,
        timestamp: new Date().toISOString(),
      });
    }

    // Dev logging
    if (process.env.NODE_ENV === "development") {
      console.log(`[Analytics:CRO] ${event.name}`, event.properties);
    }
  } catch (err) {
    // Fail silently so tracking never disrupts UX
    console.debug("[Analytics] Track error:", err);
  }
}
