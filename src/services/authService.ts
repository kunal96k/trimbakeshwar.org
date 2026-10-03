import { AdminUser } from '../admin/types';

const API_BASE_URL =
  (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_API_BASE_URL) ||
  '/api';

export const ADMIN_AUTH_STORAGE_KEY = 'trimbak_admin_auth_user';
export const ADMIN_SESSION_EVENT = 'trimbak_admin_session_changed';
export const ADMIN_PROFILE_EVENT = 'trimbak_admin_profile_updated';

export const DEFAULT_ADMIN_USER: AdminUser = {
  id: 1,
  name: 'Pt. Pravin Shambhu Deshmukh (Desai)',
  fullName: 'Pt. Pravin Shambhu Deshmukh (Desai)',
  designation: 'Hereditary Vatandar Purohit (25th Generation)',
  lineage: '25th Generation Hereditary Purohit',
  email: 'trimbak.tirthapurohit@gmail.com',
  phone: '+91 96899 73967',
  avatarUrl: '/assets/guruji.png',
  role: 'SUPER_ADMIN',
  isOnline: true,
  active: true,
  twoFactorEnabled: true,
};

export interface AuthResponseData {
  success: boolean;
  message: string;
  step?: 'OTP_REQUIRED' | 'AUTHENTICATED' | 'LOGGED_OUT' | 'PASSWORD_RESET';
  maskedEmail?: string;
  expiresInSeconds?: number;
  sessionId?: string;
  user?: any;
}

export function maskEmail(email: string): string {
  if (!email || !email.includes('@')) return email || '';
  const [local, domain] = email.split('@');
  const prefix = local.length >= 3 ? local.slice(0, 3) : local;
  return `${prefix}*****@${domain}`;
}

export function getStoredAdminUser(): AdminUser | null {
  try {
    const raw = localStorage.getItem(ADMIN_AUTH_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        ...DEFAULT_ADMIN_USER,
        ...parsed,
        name: parsed.fullName || parsed.name || DEFAULT_ADMIN_USER.name,
      };
    }
  } catch {}
  return null;
}

export function saveStoredAdminUser(user: AdminUser | null) {
  try {
    if (user) {
      localStorage.setItem(ADMIN_AUTH_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(ADMIN_AUTH_STORAGE_KEY);
    }
  } catch {}
}

/**
 * Step 1: Request Login (Email + Password -> 2FA OTP sent to registered email)
 */
export async function loginRequest(email: string, password: string): Promise<AuthResponseData> {
  const normEmail = (email || '').trim().toLowerCase();
  const cleanPassword = (password || '').trim();

  if (!normEmail || !cleanPassword) {
    throw new Error('कृपया ईमेल आणि संकेतशब्द प्रविष्ट करा. | Please provide email and password.');
  }

  try {
    const res = await fetch(`${API_BASE_URL}/auth/login-request`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ email: normEmail, password: cleanPassword }),
    });

    const data = await res.json().catch(() => null);

    if (!res.ok || !data || !data.success) {
      const errMsg = (data && data.message) || 'अवैध ईमेल किंवा संकेतशब्द. | Invalid administrator credentials.';
      throw new Error(errMsg);
    }

    return data;
  } catch (netErr: any) {
    if (netErr && netErr.message && !netErr.message.includes('Failed to fetch') && !netErr.message.includes('NetworkError')) {
      throw netErr;
    }
    throw new Error('सर्व्हरशी संपर्क होऊ शकला नाही. कृपया इंटरनेट कनेक्शन किंवा सर्व्हर स्थिती तपासा. | Unable to connect to authentication server. Please try again.');
  }
}

/**
 * Step 2: Verify Login OTP & Establish HTTP Session
 */
export async function verifyLoginOtp(email: string, otp: string): Promise<AuthResponseData> {
  const normEmail = (email || '').trim().toLowerCase();
  const cleanOtp = (otp || '').trim();

  if (!cleanOtp || cleanOtp.length !== 6) {
    throw new Error('कृपया ६ अंकी OTP प्रविष्ट करा. | Please enter the complete 6-digit OTP.');
  }

  try {
    const res = await fetch(`${API_BASE_URL}/auth/verify-login-otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ email: normEmail, otp: cleanOtp }),
    });

    const data = await res.json().catch(() => null);

    if (!res.ok || !data || !data.success) {
      const errMsg = (data && data.message) || 'अवैध किंवा कालबाह्य OTP कोड. | Incorrect or expired OTP.';
      throw new Error(errMsg);
    }

    if (data.user) {
      const u: AdminUser = {
        id: data.user.id,
        name: data.user.fullName || DEFAULT_ADMIN_USER.name,
        fullName: data.user.fullName || DEFAULT_ADMIN_USER.name,
        designation: data.user.designation || DEFAULT_ADMIN_USER.designation,
        email: data.user.email,
        phone: data.user.phone || DEFAULT_ADMIN_USER.phone,
        avatarUrl: data.user.avatarUrl || DEFAULT_ADMIN_USER.avatarUrl,
        role: data.user.role || 'ADMIN',
        isOnline: true,
        active: true,
        twoFactorEnabled: true,
        lastLoginAt: data.user.lastLoginAt,
      };
      saveStoredAdminUser(u);
      window.dispatchEvent(new CustomEvent(ADMIN_SESSION_EVENT, { detail: u }));
    }
    return data;
  } catch (err: any) {
    if (err && err.message && !err.message.includes('Failed to fetch') && !err.message.includes('NetworkError')) {
      throw err;
    }
    throw new Error('सर्व्हरशी संपर्क होऊ शकला नाही. | Unable to connect to authentication server. Please check your network.');
  }
}

/**
 * Resend 2FA Login OTP
 */
export async function resendLoginOtp(email: string): Promise<AuthResponseData> {
  const normEmail = (email || '').trim().toLowerCase();
  try {
    const res = await fetch(`${API_BASE_URL}/auth/resend-login-otp?email=${encodeURIComponent(normEmail)}`, {
      method: 'POST',
      headers: { Accept: 'application/json' },
      credentials: 'include',
    });
    const data = await res.json().catch(() => null);
    if (!res.ok || !data || !data.success) {
      throw new Error((data && data.message) || 'OTP पुन्हा पाठवण्यात त्रुटी. Failed to resend OTP.');
    }
    return data;
  } catch (err: any) {
    if (err && err.message && !err.message.includes('Failed to fetch') && !err.message.includes('NetworkError')) {
      throw err;
    }
    throw new Error('OTP पुन्हा पाठवता आला नाही. सर्व्हरशी संपर्क साधता येत नाही. | Unable to resend OTP. Server unreachable.');
  }
}

export async function fetchSession(): Promise<AdminUser | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/session`, {
      headers: { Accept: 'application/json' },
      credentials: 'include',
    });
    if (res.ok) {
      const data = await res.json();
      if (data && data.email) {
        const u: AdminUser = {
          id: data.id,
          name: data.fullName || DEFAULT_ADMIN_USER.name,
          fullName: data.fullName || DEFAULT_ADMIN_USER.name,
          designation: data.designation || DEFAULT_ADMIN_USER.designation,
          email: data.email,
          phone: data.phone || DEFAULT_ADMIN_USER.phone,
          avatarUrl: data.avatarUrl || DEFAULT_ADMIN_USER.avatarUrl,
          role: data.role || 'ADMIN',
          isOnline: true,
          active: true,
          twoFactorEnabled: true,
          lastLoginAt: data.lastLoginAt,
        };
        saveStoredAdminUser(u);
        return u;
      }
    } else {
      saveStoredAdminUser(null);
      return null;
    }
  } catch (e) {
    // Backend unreachable
  }
  return null;
}

/**
 * Update Admin Profile
 */
export async function updateAdminProfile(payload: {
  fullName: string;
  designation?: string;
  phone?: string;
  avatarUrl?: string;
}): Promise<AdminUser> {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      const data = await res.json();
      const updated: AdminUser = {
        ...DEFAULT_ADMIN_USER,
        id: data.id,
        name: data.fullName,
        fullName: data.fullName,
        designation: data.designation,
        email: data.email,
        phone: data.phone,
        avatarUrl: data.avatarUrl,
        role: data.role,
        isOnline: true,
      };
      saveStoredAdminUser(updated);
      window.dispatchEvent(new CustomEvent(ADMIN_PROFILE_EVENT, { detail: updated }));
      return updated;
    }
  } catch (e) {
    console.warn('Backend profile update failed, saving locally:', e);
  }

  // Local fallback
  const current = getStoredAdminUser() || DEFAULT_ADMIN_USER;
  const updated: AdminUser = {
    ...current,
    name: payload.fullName,
    fullName: payload.fullName,
    designation: payload.designation || current.designation,
    phone: payload.phone || current.phone,
    avatarUrl: payload.avatarUrl || current.avatarUrl,
  };
  saveStoredAdminUser(updated);
  window.dispatchEvent(new CustomEvent(ADMIN_PROFILE_EVENT, { detail: updated }));
  return updated;
}

/**
 * Change / Reset Admin Password
 */
export async function changeAdminPassword(payload: {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}): Promise<AuthResponseData> {
  const currentPass = (payload.currentPassword || '').trim();
  const newPass = (payload.newPassword || '').trim();
  const confirmPass = (payload.confirmPassword || '').trim();

  if (!currentPass) {
    throw new Error('कृपया सध्याचा संकेतशब्द प्रविष्ट करा. | Please enter your current administrator password.');
  }
  if (!newPass || newPass.length < 6) {
    throw new Error('नवीन संकेतशब्द किमान ६ अक्षरांचा असावा. | New password must be at least 6 characters.');
  }
  if (newPass !== confirmPass) {
    throw new Error('नवीन संकेतशब्द आणि पुष्टी संकेतशब्द जुळत नाहीत. | New password and confirm password do not match.');
  }
  if (currentPass === newPass) {
    throw new Error('नवीन पासवर्ड सध्याच्या पासवर्डसारखा असू शकत नाही. | New password cannot be the same as current password.');
  }

  try {
    const res = await fetch(`${API_BASE_URL}/auth/change-password`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        currentPassword: currentPass,
        newPassword: newPass,
        confirmPassword: confirmPass,
      }),
    });

    const data = await res.json().catch(() => null);
    if (!res.ok || !data || !data.success) {
      const errMsg = (data && data.message) || 'सध्याचा पासवर्ड चुकीचा आहे! | Current password is incorrect.';
      throw new Error(errMsg);
    }
    return data;
  } catch (err: any) {
    if (err && err.message && !err.message.includes('Failed to fetch') && !err.message.includes('NetworkError')) {
      throw err;
    }
    throw new Error('पासवर्ड बदलता आला नाही. सर्व्हरशी संपर्क होत नाही. | Server unreachable. Unable to change password.');
  }
}

/**
 * Forgot Password Step 1: Send Reset OTP
 */
export async function forgotPasswordRequest(email: string): Promise<AuthResponseData> {
  const normEmail = (email || '').trim().toLowerCase();
  try {
    const res = await fetch(`${API_BASE_URL}/auth/forgot-password/request`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ email: normEmail }),
    });
    const data = await res.json().catch(() => null);
    if (!res.ok || !data || !data.success) {
      throw new Error((data && data.message) || 'पासवर्ड रीसेट OTP पाठवण्यात त्रुटी. | Failed to initiate password reset');
    }
    return data;
  } catch (err: any) {
    if (err && err.message && !err.message.includes('Failed to fetch') && !err.message.includes('NetworkError')) {
      throw err;
    }
    throw new Error('सर्व्हरशी संपर्क होऊ शकला नाही. | Unable to connect to authentication server.');
  }
}

/**
 * Forgot Password Step 2: Verify OTP and Reset
 */
export async function forgotPasswordReset(payload: {
  email: string;
  otp: string;
  newPassword: string;
  confirmPassword: string;
}): Promise<AuthResponseData> {
  const normEmail = (payload.email || '').trim().toLowerCase();
  const cleanOtp = (payload.otp || '').trim();
  const newPass = (payload.newPassword || '').trim();
  const confirmPass = (payload.confirmPassword || '').trim();

  if (!normEmail) {
    throw new Error('कृपया प्रशासक ईमेल पत्ता प्रविष्ट करा.');
  }
  if (!cleanOtp || cleanOtp.length !== 6) {
    throw new Error('कृपया वैध ६ अंकी OTP प्रविष्ट करा. | Please enter a valid 6-digit OTP.');
  }
  if (newPass.length < 6) {
    throw new Error('नवीन संकेतशब्द किमान ६ अक्षरांचा असावा. | New password must be at least 6 characters.');
  }
  if (newPass !== confirmPass) {
    throw new Error('नवीन संकेतशब्द आणि पुष्टी संकेतशब्द जुळत नाहीत. | New password and confirm password do not match.');
  }

  try {
    const res = await fetch(`${API_BASE_URL}/auth/forgot-password/reset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        email: normEmail,
        otp: cleanOtp,
        newPassword: newPass,
        confirmPassword: confirmPass,
      }),
    });
    const data = await res.json().catch(() => null);
    if (!res.ok || !data || !data.success) {
      throw new Error((data && data.message) || 'अवैध किंवा कालबाह्य OTP कोड. | Invalid or expired OTP.');
    }
    return data;
  } catch (err: any) {
    if (err && err.message && !err.message.includes('Failed to fetch') && !err.message.includes('NetworkError')) {
      throw err;
    }
    throw new Error('सर्व्हरशी संपर्क होऊ शकला नाही. | Unable to connect to authentication server.');
  }
}

/**
 * Logout & Invalidate Session
 */
export async function logout(): Promise<void> {
  try {
    await fetch(`${API_BASE_URL}/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    });
  } catch {}
  saveStoredAdminUser(null);
  window.dispatchEvent(new CustomEvent(ADMIN_SESSION_EVENT, { detail: null }));
}
