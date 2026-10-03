/**
 * Shri Kshetra Trimbakeshwar Portal – Google Tag (gtag.js) Analytics Integration
 * Tracking Measurement ID: G-GRFEB83FWQ
 */

export const GA_TRACKING_ID = 'G-GRFEB83FWQ';

// Extend window interface for gtag and dataLayer
declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
  }
}

/**
 * Track Page Views dynamically across SPA routes & hash navigation
 * @param pagePath - The URL path or hash route (e.g. '/articles', '/gallery', '/puja/narayan-nagbali')
 * @param pageTitle - Page title
 */
export function trackPageView(pagePath?: string, pageTitle?: string) {
  if (typeof window === 'undefined') return;

  try {
    const path = pagePath || window.location.pathname + window.location.hash;
    const title = pageTitle || document.title;

    if (typeof window.gtag === 'function') {
      window.gtag('config', GA_TRACKING_ID, {
        page_path: path,
        page_title: title,
        page_location: window.location.href,
      });
    }
  } catch (err) {
    // Graceful silent fallback if gtag blocked by client adblocker
  }
}

/**
 * Track Custom User Events (e.g. Booking Clicks, WhatsApp Enquiries, Guruji Calls, Shloka Audio, Gallery Views)
 * @param action - The event action name (e.g. 'click_booking', 'contact_guruji', 'view_article')
 * @param category - The event category (e.g. 'puja_booking', 'guruji_directory', 'engagement')
 * @param label - Optional descriptor label
 * @param value - Optional numeric value
 */
export function trackEvent(
  action: string,
  category: string = 'engagement',
  label?: string,
  value?: number
) {
  if (typeof window === 'undefined') return;

  try {
    if (typeof window.gtag === 'function') {
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
      });
    }
  } catch (err) {
    // Graceful silent fallback
  }
}
