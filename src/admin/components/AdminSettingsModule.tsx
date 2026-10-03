import React, { useState, useEffect, useRef } from 'react';
import { AdminUser } from '../types';
import {
  updateAdminProfile,
  changeAdminPassword,
  resendLoginOtp,
  logout,
  DEFAULT_ADMIN_USER,
} from '../../services/authService';
import {
  User,
  ShieldCheck,
  KeyRound,
  Mail,
  Phone,
  Camera,
  CheckCircle2,
  AlertCircle,
  Lock,
  Eye,
  EyeOff,
  Sparkles,
  Save,
  RefreshCw,
  LogOut,
  Clock,
  ShieldAlert,
  Server,
  Layers,
  Flame,
  Check,
  Upload,
  Image as ImageIcon,
  Trash2,
  X,
} from 'lucide-react';

interface AdminSettingsModuleProps {
  currentUser: AdminUser;
  onProfileUpdated?: (updated: AdminUser) => void;
  onLogout?: () => void;
  onShowToast?: (type: 'success' | 'error' | 'info' | 'warning', title: string, message: string) => void;
}

const AVATAR_PRESETS = [
  { id: 'guruji', label: 'Pt. Pravin Deshmukh', url: '/assets/guruji.png' },
  { id: 'shikhara', label: 'Temple Shikhara', url: '/assets/trimbak/trimbakeshwar-shiva-temple.webp' },
  { id: 'kushavarta', label: 'Kushavarta Kund', url: '/assets/trimbak/kushavarta-tirtha.webp' },
  { id: 'jyotirlinga', label: 'Jyotirlinga Crown', url: '/assets/trimbak/jyotirlinga.webp' },
  { id: 'brahmagiri', label: 'Brahmagiri Mountain', url: '/assets/trimbak/brahmagiri-parvat.webp' },
];

export const AdminSettingsModule: React.FC<AdminSettingsModuleProps> = ({
  currentUser,
  onProfileUpdated,
  onLogout,
  onShowToast,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'profile' | 'password' | 'security'>('profile');

  // Profile Form State
  const [fullName, setFullName] = useState(currentUser.fullName || currentUser.name || DEFAULT_ADMIN_USER.name);
  const [designation, setDesignation] = useState(currentUser.designation || DEFAULT_ADMIN_USER.designation);
  const [phone, setPhone] = useState(currentUser.phone || DEFAULT_ADMIN_USER.phone);
  const [email] = useState(currentUser.email || DEFAULT_ADMIN_USER.email);
  const [avatarUrl, setAvatarUrl] = useState(currentUser.avatarUrl || DEFAULT_ADMIN_USER.avatarUrl);
  const [customAvatarInput, setCustomAvatarInput] = useState('');
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Password Form State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);
  const [passwordMsg, setPasswordMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // 2FA / Session Test State
  const [testingOtp, setTestingOtp] = useState(false);

  // Sync state when currentUser prop changes
  useEffect(() => {
    if (currentUser) {
      setFullName(currentUser.fullName || currentUser.name || DEFAULT_ADMIN_USER.name);
      setDesignation(currentUser.designation || DEFAULT_ADMIN_USER.designation);
      setPhone(currentUser.phone || DEFAULT_ADMIN_USER.phone);
      setAvatarUrl(currentUser.avatarUrl || DEFAULT_ADMIN_USER.avatarUrl);
    }
  }, [currentUser]);

  // Calculate Password Strength
  const calculatePasswordStrength = (pass: string) => {
    if (!pass) return { score: 0, label: 'None', color: 'bg-stone-700' };
    let score = 0;
    if (pass.length >= 6) score += 1;
    if (pass.length >= 10) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;

    if (score <= 2) return { score: 33, label: 'Weak (कमजोर)', color: 'bg-rose-500' };
    if (score <= 4) return { score: 66, label: 'Moderate (मध्यम)', color: 'bg-amber-500' };
    return { score: 100, label: 'Strong (मजबूत सुरक्षा)', color: 'bg-emerald-500' };
  };

  const strength = calculatePasswordStrength(newPassword);

  // Save Profile Handler
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      onShowToast?.('error', 'Validation Error', 'Full Name cannot be blank.');
      return;
    }

    setSavingProfile(true);
    try {
      const selectedAvatar = customAvatarInput.trim() || avatarUrl;
      const updated = await updateAdminProfile({
        fullName: fullName.trim(),
        designation: designation.trim(),
        phone: phone.trim(),
        avatarUrl: selectedAvatar,
      });

      onProfileUpdated?.(updated);
      onShowToast?.(
        'success',
        'Profile Updated',
        'Your Vatandar Purohit profile has been updated and synchronized.'
      );
      setCustomAvatarInput('');
    } catch (err: any) {
      onShowToast?.('error', 'Update Failed', err.message || 'Could not update profile.');
    } finally {
      setSavingProfile(false);
    }
  };

  // Change Password Handler
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordMsg(null);

    if (!currentPassword) {
      setPasswordMsg({ type: 'error', text: 'Please enter your current administrative password.' });
      return;
    }

    if (newPassword.length < 6) {
      setPasswordMsg({ type: 'error', text: 'New password must be at least 6 characters long.' });
      return;
    }

    if (newPassword !== confirmPassword) {
      const err = 'नवीन संकेतशब्द आणि पुष्टी संकेतशब्द जुळत नाहीत. | New password and confirm password do not match.';
      setPasswordMsg({ type: 'error', text: err });
      onShowToast?.('error', 'Password Mismatch', err);
      return;
    }

    if (currentPassword.trim() === newPassword.trim()) {
      const err = 'नवीन पासवर्ड सध्याच्या पासवर्डसारखा असू शकत नाही. | New password cannot be the same as current password.';
      setPasswordMsg({ type: 'error', text: err });
      onShowToast?.('error', 'Invalid New Password', err);
      return;
    }

    setSavingPassword(true);
    try {
      const res = await changeAdminPassword({
        currentPassword: currentPassword.trim(),
        newPassword: newPassword.trim(),
        confirmPassword: confirmPassword.trim(),
      });

      if (res.success) {
        setPasswordMsg({ type: 'success', text: res.message || 'पासवर्ड यशस्वीरित्या बदलला गेला आहे! Password updated successfully.' });
        onShowToast?.('success', 'Password Changed', 'Your admin password was updated successfully.');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        const err = res.message || 'Could not update password.';
        setPasswordMsg({ type: 'error', text: err });
        onShowToast?.('error', 'Update Failed', err);
      }
    } catch (err: any) {
      const errMsg = err.message || 'सध्याचा पासवर्ड चुकीचा आहे! | Current password is incorrect.';
      setPasswordMsg({ type: 'error', text: errMsg });
      onShowToast?.('error', 'Password Update Blocked', errMsg);
    } finally {
      setSavingPassword(false);
    }
  };

  // Test 2FA OTP Dispatch
  const handleTestOtpDispatch = async () => {
    setTestingOtp(true);
    try {
      const res = await resendLoginOtp(email);
      onShowToast?.(
        'success',
        'OTP Sent to Email',
        res.message || `A verification OTP code was dispatched to ${email}.`
      );
    } catch (err: any) {
      onShowToast?.('error', 'OTP Dispatch Failed', err.message || 'Could not dispatch OTP.');
    } finally {
      setTestingOtp(false);
    }
  };

  // Image File Upload Handler
  const handleImageUpload = (file: File) => {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      onShowToast?.('error', 'अवैध फाइल प्रकार | Invalid File', 'Please select a valid image file (PNG, JPG, WEBP, or SVG).');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      onShowToast?.('error', 'फाइल खूप मोठी आहे | File Too Large', 'Avatar image must be smaller than 5MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        setAvatarUrl(result);
        setCustomAvatarInput('');
        setUploadedFileName(file.name);
        onShowToast?.(
          'success',
          'फोटो यशस्वीरित्या लोड झाला | Photo Loaded',
          `"${file.name}" loaded as your profile avatar. Click "Save Profile Changes" to save.`
        );
      }
    };
    reader.onerror = () => {
      onShowToast?.('error', 'Upload Error', 'Failed to read the selected image file.');
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageUpload(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleResetAvatar = () => {
    setAvatarUrl(DEFAULT_ADMIN_USER.avatarUrl);
    setCustomAvatarInput('');
    setUploadedFileName(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    onShowToast?.('info', 'Avatar Reset', 'Reset to default official Purohit portrait.');
  };

  return (
    <div className="space-y-6 pb-24 animate-in fade-in duration-200">
      {/* ─── Header & Persona Card ─── */}
      <div className="rounded-3xl bg-gradient-to-r from-[#24110C] via-[#1A0A07] to-[#120503] border border-amber-500/30 p-6 sm:p-7 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5 relative z-10">
          <div className="flex items-center gap-4">
            <div className="relative group">
              <img
                src={avatarUrl || DEFAULT_ADMIN_USER.avatarUrl || '/assets/guruji.png'}
                alt={fullName}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-amber-400/60 shadow-lg shadow-amber-950/60 bg-stone-900"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/assets/guruji.png';
                }}
              />
              <div className="absolute -bottom-1 -right-1 p-1 rounded-lg bg-amber-500 text-stone-950 border border-amber-200 shadow">
                <ShieldCheck className="w-3.5 h-3.5" />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-bold text-amber-100 font-sanskrit">
                  {fullName}
                </h1>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-semibold">
                  SUPER ADMIN
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
                  <Check className="w-2.5 h-2.5" /> 2FA Active
                </span>
              </div>
              <p className="text-xs sm:text-sm text-stone-300 font-medium">
                {designation}
              </p>
              <div className="flex items-center gap-3 text-xs text-stone-400 font-mono">
                <span className="flex items-center gap-1">
                  <Mail className="w-3 h-3 text-amber-400" /> {email}
                </span>
                <span className="hidden sm:inline text-stone-600">•</span>
                <span className="flex items-center gap-1">
                  <Phone className="w-3 h-3 text-amber-400" /> {phone}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Sign Out Action */}
          <button
            onClick={async () => {
              if (window.confirm('Are you sure you want to log out of the admin console?')) {
                await logout();
                onLogout?.();
              }
            }}
            className="px-4 py-2 rounded-xl bg-stone-900/80 hover:bg-rose-950/60 text-stone-300 hover:text-rose-300 border border-stone-700 hover:border-rose-500/40 text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer shrink-0"
          >
            <LogOut className="w-4 h-4 text-rose-400" />
            <span>Sign Out</span>
          </button>
        </div>

        {/* Sub-Tab Navigation Bar */}
        <div className="flex items-center gap-2 mt-6 pt-5 border-t border-amber-500/15 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveSubTab('profile')}
            className={`w-fit inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all border cursor-pointer whitespace-nowrap ${
              activeSubTab === 'profile'
                ? 'bg-amber-500 text-stone-950 border-amber-400 shadow-md font-bold'
                : 'bg-black/40 text-stone-300 border-stone-800 hover:border-amber-500/40 hover:text-amber-200'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Profile Persona</span>
          </button>

          <button
            onClick={() => setActiveSubTab('password')}
            className={`w-fit inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all border cursor-pointer whitespace-nowrap ${
              activeSubTab === 'password'
                ? 'bg-amber-500 text-stone-950 border-amber-400 shadow-md font-bold'
                : 'bg-black/40 text-stone-300 border-stone-800 hover:border-amber-500/40 hover:text-amber-200'
            }`}
          >
            <KeyRound className="w-3.5 h-3.5" />
            <span>Reset Password</span>
          </button>

          <button
            onClick={() => setActiveSubTab('security')}
            className={`w-fit inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all border cursor-pointer whitespace-nowrap ${
              activeSubTab === 'security'
                ? 'bg-amber-500 text-stone-950 border-amber-400 shadow-md font-bold'
                : 'bg-black/40 text-stone-300 border-stone-800 hover:border-amber-500/40 hover:text-amber-200'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Session & 2FA Security</span>
          </button>
        </div>
      </div>

      {/* ─── TAB 1: PROFILE PERSONA ─── */}
      {activeSubTab === 'profile' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Avatar Selector & Upload Card */}
          <div className="rounded-3xl bg-[#1A0D0A] border border-amber-500/25 p-5 sm:p-6 shadow-xl space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-amber-100 font-sanskrit flex items-center gap-2">
                  <Camera className="w-4 h-4 text-amber-400" />
                  <span>Profile Avatar</span>
                </h3>
                <p className="text-[11px] text-stone-400 mt-0.5">
                  Official photo upload & avatar management
                </p>
              </div>

              {(uploadedFileName || avatarUrl !== DEFAULT_ADMIN_USER.avatarUrl) && (
                <button
                  type="button"
                  onClick={handleResetAvatar}
                  className="text-[10px] text-stone-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer"
                  title="Reset to default avatar"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              )}
            </div>

            {/* Hidden File Input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png, image/jpeg, image/webp, image/jpg, image/svg+xml"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleImageUpload(e.target.files[0]);
                }
              }}
            />

            {/* Current Large Preview */}
            <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-black/40 border border-amber-500/20 text-center space-y-3 relative group">
              <div
                onClick={() => fileInputRef.current?.click()}
                className="relative cursor-pointer transition-transform hover:scale-105"
                title="Click to choose a photo from your computer/device"
              >
                <img
                  src={customAvatarInput.trim() || avatarUrl || '/assets/guruji.png'}
                  alt={fullName}
                  className="w-24 h-24 rounded-2xl object-cover border-2 border-amber-400 shadow-xl bg-stone-900"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/assets/guruji.png';
                  }}
                />
                <div className="absolute inset-0 bg-black/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-amber-300 gap-1 backdrop-blur-xs">
                  <Camera className="w-5 h-5" />
                  <span className="text-[9px] font-bold">Change Photo</span>
                </div>
                <div className="absolute -bottom-1.5 -right-1.5 p-1.5 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 text-stone-950 font-bold shadow-md">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
              </div>

              <div>
                <div className="text-xs font-bold text-amber-200">{fullName}</div>
                <div className="text-[10px] text-stone-400 mt-0.5">{designation}</div>
                {uploadedFileName && (
                  <div className="inline-flex items-center gap-1 mt-1.5 px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-[10px] text-emerald-300 font-mono">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    <span className="max-w-[140px] truncate">{uploadedFileName}</span>
                  </div>
                )}
              </div>
            </div>

            {/* 📸 Direct File Upload Drop Zone & Button */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-stone-300 flex items-center justify-between">
                <span>Upload Photo from Device</span>
                <span className="text-[10px] text-stone-500">PNG, JPG, WEBP (Max 5MB)</span>
              </label>

              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`p-3.5 rounded-2xl border-2 border-dashed text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-1.5 ${
                  isDragging
                    ? 'border-amber-400 bg-amber-500/20 text-amber-200 scale-[1.02]'
                    : 'border-amber-500/30 bg-black/30 hover:border-amber-400/60 hover:bg-amber-500/5 text-stone-300'
                }`}
              >
                <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Upload className="w-4 h-4" />
                </div>
                <div className="text-xs font-semibold text-amber-200">
                  Choose Photo or Drag & Drop here
                </div>
                <p className="text-[10px] text-stone-400">
                  Click to browse files from your computer or phone
                </p>
              </div>
            </div>

            {/* Preset Selection */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-stone-300">Or Choose Sacred Preset Avatar</label>
              <div className="grid grid-cols-2 gap-2">
                {AVATAR_PRESETS.map((preset) => {
                  const isSelected = avatarUrl === preset.url && !customAvatarInput && !uploadedFileName;
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => {
                        setAvatarUrl(preset.url);
                        setCustomAvatarInput('');
                        setUploadedFileName(null);
                      }}
                      className={`p-2 rounded-xl border flex items-center gap-2 text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-amber-500/20 border-amber-400 text-amber-200 font-bold shadow'
                          : 'bg-black/30 border-stone-800 text-stone-400 hover:border-amber-500/40 hover:text-stone-200'
                      }`}
                    >
                      <img
                        src={preset.url}
                        alt={preset.label}
                        className="w-7 h-7 rounded-lg object-cover border border-amber-500/30 shrink-0 bg-stone-900"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/assets/guruji.png';
                        }}
                      />
                      <span className="text-[11px] truncate">{preset.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Custom URL Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-stone-300">Or Custom Image URL</label>
              <input
                type="text"
                value={customAvatarInput}
                onChange={(e) => {
                  setCustomAvatarInput(e.target.value);
                  if (e.target.value) setUploadedFileName(null);
                }}
                placeholder="https://example.com/photo.webp or /assets/..."
                className="w-full px-3 py-2 rounded-xl bg-black/50 border border-stone-700 text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          {/* Profile Form Details */}
          <div className="lg:col-span-2 rounded-3xl bg-[#1A0D0A] border border-amber-500/25 p-5 sm:p-6 shadow-xl space-y-5">
            <div>
              <h3 className="text-base font-bold text-amber-100 font-sanskrit flex items-center gap-2">
                <User className="w-4 h-4 text-amber-400" />
                <span>Purohit Profile Information</span>
              </h3>
              <p className="text-[11px] text-stone-400 mt-0.5">
                Update hereditary lineage details and contact coordinates
              </p>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-stone-300">
                    Full Name (संपूर्ण नाव) <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Pt. Pravin Shambhu Deshmukh"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-stone-700 focus:border-amber-400 text-sm text-stone-100 placeholder-stone-500 focus:outline-none"
                  />
                </div>

                {/* Hereditary Title */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-stone-300">
                    Hereditary Title / Designation (पदवी)
                  </label>
                  <input
                    type="text"
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                    placeholder="Hereditary Vatandar Purohit (25th Generation)"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-stone-700 focus:border-amber-400 text-sm text-stone-100 placeholder-stone-500 focus:outline-none"
                  />
                </div>

                {/* Primary Phone */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-stone-300">
                    Primary Phone Number (फोन क्रमांक)
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 96899 73967"
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-black/50 border border-stone-700 focus:border-amber-400 text-sm text-stone-100 placeholder-stone-500 focus:outline-none font-mono"
                    />
                  </div>
                </div>

                {/* Primary Email (Read-Only Verified) */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-stone-300 flex items-center justify-between">
                    <span>Admin Email (ईमेल - Primary Login)</span>
                    <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" /> Verified ID
                    </span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-stone-500 absolute left-3 top-3" />
                    <input
                      type="email"
                      disabled
                      value={email}
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-stone-900/60 border border-stone-800 text-sm text-stone-400 font-mono cursor-not-allowed"
                    />
                  </div>
                  <p className="text-[10px] text-stone-500">
                    All administrative 2FA OTPs and password reset links are sent to this address.
                  </p>
                </div>
              </div>

              {/* Hereditary Vatandar Notice */}
              <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200/90 leading-relaxed flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong>Official Sanctified Records:</strong> Profile changes are synchronized with database ledgers, devotee PDF receipts, and official email communication headers.
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={savingProfile}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-stone-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-amber-950/40 transition-all cursor-pointer disabled:opacity-50"
                >
                  {savingProfile ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Saving Profile...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-3.5 h-3.5" />
                      <span>Save Profile Changes</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── TAB 2: RESET PASSWORD ─── */}
      {activeSubTab === 'password' && (
        <div className="max-w-2xl mx-auto rounded-3xl bg-[#1A0D0A] border border-amber-500/25 p-6 sm:p-7 shadow-2xl space-y-6">
          <div>
            <h3 className="text-lg font-bold text-amber-100 font-sanskrit flex items-center gap-2">
              <KeyRound className="w-5 h-5 text-amber-400" />
              <span>Reset Admin Password (संकेतशब्द बदला)</span>
            </h3>
            <p className="text-xs text-stone-400 mt-1">
              Securely update your admin authentication password. Passwords are encrypted with PBKDF2WithHmacSHA256 salted hashing.
            </p>
          </div>

          {passwordMsg && (
            <div
              className={`p-3.5 rounded-2xl border text-xs flex items-start gap-2.5 ${
                passwordMsg.type === 'success'
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                  : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
              }`}
            >
              {passwordMsg.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              )}
              <span>{passwordMsg.text}</span>
            </div>
          )}

          <form onSubmit={handleChangePassword} className="space-y-4">
            {/* Current Password */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-stone-300">
                Current Password (सध्याचा पासवर्ड) <span className="text-rose-400">*</span>
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                <input
                  type={showCurrentPassword ? 'text' : 'password'}
                  required
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password (Default: Purohit@2026)"
                  className="w-full pl-9 pr-10 py-2.5 rounded-xl bg-black/50 border border-stone-700 focus:border-amber-400 text-sm text-stone-100 placeholder-stone-500 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword((prev) => !prev)}
                  className="absolute right-3 top-3 text-stone-400 hover:text-amber-300"
                >
                  {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* New Password */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-stone-300">
                New Password (नवीन पासवर्ड) <span className="text-rose-400">*</span>
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password (min. 6 chars)"
                  className="w-full pl-9 pr-10 py-2.5 rounded-xl bg-black/50 border border-stone-700 focus:border-amber-400 text-sm text-stone-100 placeholder-stone-500 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword((prev) => !prev)}
                  className="absolute right-3 top-3 text-stone-400 hover:text-amber-300"
                >
                  {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Password Strength Gauge */}
              {newPassword && (
                <div className="space-y-1 pt-1">
                  <div className="h-1.5 w-full bg-stone-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${strength.color} transition-all duration-300`}
                      style={{ width: `${strength.score}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-stone-400 font-mono">
                    <span>Strength: {strength.label}</span>
                    <span>{newPassword.length} characters</span>
                  </div>
                </div>
              )}
            </div>

            {/* Confirm New Password */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-stone-300">
                Confirm New Password (पासवर्ड पुष्टी करा) <span className="text-rose-400">*</span>
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter new password"
                  className="w-full pl-9 pr-10 py-2.5 rounded-xl bg-black/50 border border-stone-700 focus:border-amber-400 text-sm text-stone-100 placeholder-stone-500 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute right-3 top-3 text-stone-400 hover:text-amber-300"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-3">
              <button
                type="submit"
                disabled={savingPassword}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-stone-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-950/40 transition-all cursor-pointer disabled:opacity-50"
              >
                {savingPassword ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Updating Password...</span>
                  </>
                ) : (
                  <>
                    <KeyRound className="w-3.5 h-3.5" />
                    <span>Confirm & Reset Password</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ─── TAB 3: SESSION & 2FA SECURITY ─── */}
      {activeSubTab === 'security' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Two-Factor Authentication Status */}
          <div className="rounded-3xl bg-[#1A0D0A] border border-amber-500/25 p-5 sm:p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-amber-100 font-sanskrit">
                    Two-Factor Authentication (2FA)
                  </h3>
                  <span className="text-[10px] font-mono text-emerald-400">ACTIVE & ENFORCED</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-stone-300 leading-relaxed">
              Every login to this portal requires a 6-digit one-time security code (OTP) sent directly to your registered administrator email (<strong>{email}</strong>).
            </p>

            <div className="p-3.5 rounded-2xl bg-black/40 border border-stone-800 space-y-2">
              <div className="flex justify-between text-xs text-stone-300">
                <span className="text-stone-400">Primary 2FA Channel:</span>
                <span className="font-mono text-amber-300">Email OTP</span>
              </div>
              <div className="flex justify-between text-xs text-stone-300">
                <span className="text-stone-400">Target Address:</span>
                <span className="font-mono text-stone-200">{email}</span>
              </div>
              <div className="flex justify-between text-xs text-stone-300">
                <span className="text-stone-400">OTP Validity:</span>
                <span className="font-mono text-stone-200">10 Minutes</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleTestOtpDispatch}
              disabled={testingOtp}
              className="w-full py-2.5 rounded-xl bg-amber-500/15 hover:bg-amber-500 text-amber-300 hover:text-stone-950 border border-amber-400/30 text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
            >
              {testingOtp ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Dispatching Test OTP...</span>
                </>
              ) : (
                <>
                  <Mail className="w-3.5 h-3.5" />
                  <span>Dispatch Test 2FA OTP Email</span>
                </>
              )}
            </button>
          </div>

          {/* Card 2: Active Session & Defaults */}
          <div className="rounded-3xl bg-[#1A0D0A] border border-amber-500/25 p-5 sm:p-6 shadow-xl space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-300">
                <Server className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-amber-100 font-sanskrit">
                  HTTP Session State
                </h3>
                <span className="text-[10px] font-mono text-blue-300">AUTHENTICATED SESSION</span>
              </div>
            </div>

            <p className="text-xs text-stone-300 leading-relaxed">
              Session-based authentication managed by the Spring Boot core with CORS credentials and cookie verification.
            </p>

            <div className="p-3.5 rounded-2xl bg-black/40 border border-stone-800 space-y-2">
              <div className="flex justify-between text-xs text-stone-300">
                <span className="text-stone-400">Session Lifetime:</span>
                <span className="font-mono text-stone-200">8 Hours</span>
              </div>
              <div className="flex justify-between text-xs text-stone-300">
                <span className="text-stone-400">Default Login ID:</span>
                <span className="font-mono text-amber-300">trimbak.tirthapurohit@gmail.com</span>
              </div>
              <div className="flex justify-between text-xs text-stone-300">
                <span className="text-stone-400">Default Password:</span>
                <span className="font-mono text-stone-200">Purohit@2026</span>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-200/90 leading-relaxed flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Sessions are automatically invalidated after 8 hours of inactivity.</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSettingsModule;
