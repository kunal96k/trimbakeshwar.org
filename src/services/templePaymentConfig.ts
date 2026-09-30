/**
 * Temple UPI & QR Configuration Management Service
 * 
 * Allows Purohit admins to dynamically update:
 *  - Official Temple UPI ID (e.g. atharvadeshmukh525-1@oksbi)
 *  - Hereditary Payee Name
 *  - Official UPI QR Code Image (uploaded base64 or URL)
 *  - Bank & Branch details
 * 
 * Falls back to default hereditary credentials if not customized.
 * Automatically synchronizes across public booking modal & admin tabs.
 */

export interface TempleUpiConfig {
  upiId: string;
  payeeName: string;
  qrImageUrl: string;
  bankName: string;
  branch: string;
  notes?: string;
  updatedAt?: string;
}

export const DEFAULT_TEMPLE_UPI_CONFIG: TempleUpiConfig = {
  upiId: 'atharvadeshmukh525-1@oksbi',
  payeeName: 'Pt. Atharva Deshmukh / Pt. Pravin Shambhu Deshmukh (Desai)',
  qrImageUrl: '/assets/UPI.jpeg',
  bankName: 'State Bank of India',
  branch: 'Kushavarta Kund Branch, Trimbakeshwar',
  notes: 'Direct hereditary Vatandar Tirth Purohit UPI account',
};

const STORAGE_KEY = 'trimbak_temple_upi_config';
export const UPI_CONFIG_UPDATED_EVENT = 'trimbak_upi_config_updated';

export function getTempleUpiConfig(): TempleUpiConfig {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        upiId: parsed.upiId || DEFAULT_TEMPLE_UPI_CONFIG.upiId,
        payeeName: parsed.payeeName || DEFAULT_TEMPLE_UPI_CONFIG.payeeName,
        qrImageUrl: parsed.qrImageUrl || DEFAULT_TEMPLE_UPI_CONFIG.qrImageUrl,
        bankName: parsed.bankName || DEFAULT_TEMPLE_UPI_CONFIG.bankName,
        branch: parsed.branch || DEFAULT_TEMPLE_UPI_CONFIG.branch,
        notes: parsed.notes || DEFAULT_TEMPLE_UPI_CONFIG.notes,
        updatedAt: parsed.updatedAt,
      };
    }
  } catch (e) {
    console.debug('Error reading temple UPI config from localStorage:', e);
  }
  return { ...DEFAULT_TEMPLE_UPI_CONFIG };
}

export function saveTempleUpiConfig(config: Partial<TempleUpiConfig>): TempleUpiConfig {
  const current = getTempleUpiConfig();
  const updated: TempleUpiConfig = {
    ...current,
    ...config,
    updatedAt: new Date().toISOString(),
  };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent(UPI_CONFIG_UPDATED_EVENT, { detail: updated }));
  } catch (e) {
    console.warn('Failed to save temple UPI config to localStorage:', e);
  }
  return updated;
}

export function resetTempleUpiConfig(): TempleUpiConfig {
  try {
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new CustomEvent(UPI_CONFIG_UPDATED_EVENT, { detail: DEFAULT_TEMPLE_UPI_CONFIG }));
  } catch (e) {
    console.warn('Failed to reset temple UPI config in localStorage:', e);
  }
  return { ...DEFAULT_TEMPLE_UPI_CONFIG };
}
