import React, { useState } from 'react';
import { AdminTab, AdminUser, ErrorStatusCode } from '../types';
import { RoyalSeal } from './RoyalSeal';
import { GurujiAvatar } from './GurujiAvatar';
import { TrimbakBrandLogo } from './TrimbakBrandLogo';
import {
  LayoutDashboard,
  CalendarCheck,
  MessageSquareQuote,
  QrCode,
  ImagePlus,
  BarChart3,
  Settings,
  Bell,
  Menu,
  X,
  Plus,
  ExternalLink,
  ChevronRight,
  LogOut,
  Sparkles,
  KeyRound,
  User,
} from 'lucide-react';

interface AdminLayoutProps {
  activeTab: AdminTab;
  onSelectTab: (tab: AdminTab) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  unreadNotificationsCount: number;
  onOpenNotifications: () => void;
  onOpenNewBooking: () => void;
  onOpenAuthModal: () => void;
  onSignOut: () => void;
  onTriggerStatusPage: (code: ErrorStatusCode) => void;
  pendingQRCount: number;
  newLeadsCount: number;
  user: AdminUser;
  onExitAdmin?: () => void;
  onTriggerNotificationTest?: (type: 'error' | 'warning' | 'success') => void;
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  activeTab,
  onSelectTab,
  searchQuery,
  onSearchChange,
  unreadNotificationsCount,
  onOpenNotifications,
  onOpenNewBooking,
  onOpenAuthModal,
  onSignOut,
  onTriggerStatusPage,
  pendingQRCount,
  newLeadsCount,
  user,
  onExitAdmin,
  onTriggerNotificationTest,
  children,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  // Shortened Navigation Items for clean ergonomics
  const navItems = [
    {
      id: 'dashboard' as AdminTab,
      label: 'Dashboard',
      icon: LayoutDashboard,
      badge: null,
    },
    {
      id: 'bookings' as AdminTab,
      label: 'Bookings',
      icon: CalendarCheck,
      badge: null,
    },
    {
      id: 'inquiries' as AdminTab,
      label: 'Inquiries',
      icon: MessageSquareQuote,
      badge: newLeadsCount > 0 ? `${newLeadsCount}` : null,
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    },
    {
      id: 'payments' as AdminTab,
      label: 'Payments',
      icon: QrCode,
      badge: pendingQRCount > 0 ? `${pendingQRCount}` : null,
      badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
    },
    {
      id: 'gallery' as AdminTab,
      label: 'Gallery',
      icon: ImagePlus,
      badge: null,
    },
    {
      id: 'analytics' as AdminTab,
      label: 'Reports',
      icon: BarChart3,
      badge: null,
    },
    {
      id: 'settings' as AdminTab,
      label: 'Settings',
      icon: Settings,
      badge: null,
    },
  ];

  return (
    <div className="h-screen w-full bg-[#100705] text-stone-100 flex flex-col overflow-hidden antialiased selection:bg-amber-500/30 selection:text-amber-200">
      
      {/* 1. TOP HEADER BAR */}
      <header className="h-16 shrink-0 z-30 bg-[#180B08]/95 backdrop-blur-md border-b border-amber-500/20 px-3.5 sm:px-6 flex items-center justify-between shadow-lg">
        
        {/* Left Section: Mobile Menu Trigger + Trimbak Brand Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 rounded-xl bg-amber-500/10 border border-amber-400/25 text-amber-300 hover:bg-amber-500/20 active:scale-95 transition-all cursor-pointer"
            aria-label="Toggle navigation drawer"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <TrimbakBrandLogo
            onClick={() => onSelectTab('dashboard')}
            size="sm"
            isDarkTheme={true}
          />
        </div>

        {/* Right Section: Compact Action Buttons + Bell + Profile */}
        <div className="flex items-center gap-2 sm:gap-3">

          {/* Quick Action "+" Button (Shortened for optimal sizing) */}
          <button
            onClick={onOpenNewBooking}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-stone-950 font-bold text-xs shadow-md active:scale-95 transition-all"
            title="Create New Booking"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>New Booking</span>
          </button>

          {/* Notification Bell with animated unread badge */}
          <button
            onClick={onOpenNotifications}
            className="relative p-2 rounded-xl bg-amber-500/10 border border-amber-400/25 text-amber-300 hover:bg-amber-500/20 active:scale-95 transition-all"
            aria-label="View recent notifications"
          >
            <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
            {unreadNotificationsCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white rounded-full text-[9px] font-bold flex items-center justify-center border-2 border-[#180B08] animate-bounce">
                {unreadNotificationsCount}
              </span>
            )}
          </button>

          {/* Admin Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="flex items-center gap-2 p-1 pl-1.5 pr-2.5 rounded-full bg-black/40 border border-amber-500/25 hover:border-amber-400/50 transition-all"
              aria-label="Open profile options"
            >
              <GurujiAvatar size="sm" showOnlineStatus={true} />
              <div className="hidden lg:block text-left">
                <div className="text-xs font-bold text-amber-200 leading-none">
                  {user.name}
                </div>
                <div className="text-[9px] text-stone-400 font-medium leading-tight mt-0.5">
                  Vatandar Purohit
                </div>
              </div>
            </button>

            {/* Profile Dropdown Menu */}
            {profileDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setProfileDropdownOpen(false)}
                />
                <div className="absolute right-0 top-12 z-50 w-60 bg-[#1A0D0A] border border-amber-500/30 rounded-2xl shadow-2xl p-2.5 animate-in fade-in zoom-in-95 duration-100 text-xs">
                  <div className="p-2 border-b border-stone-800">
                    <div className="font-bold text-amber-100 font-sanskrit text-sm">
                      {user.name}
                    </div>
                    <div className="text-[11px] text-amber-300/80">
                      {user.role}
                    </div>
                    <div className="text-[10px] text-stone-400 mt-0.5 font-mono">
                      {user.email}
                    </div>
                  </div>

                  <div className="py-1 space-y-0.5">
                    <button
                      onClick={() => {
                        onSelectTab('settings');
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-stone-200 hover:bg-amber-500/15 hover:text-amber-200 flex items-center gap-2"
                    >
                      <Settings className="w-4 h-4 text-amber-400" />
                      <span>Settings & Bank QR</span>
                    </button>

                    <button
                      onClick={() => {
                        onOpenAuthModal();
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-stone-200 hover:bg-amber-500/15 hover:text-amber-200 flex items-center gap-2"
                    >
                      <KeyRound className="w-4 h-4 text-amber-400" />
                      <span>Password & Security</span>
                    </button>

                    <button
                      onClick={() => {
                        onSelectTab('analytics');
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-stone-200 hover:bg-amber-500/15 hover:text-amber-200 flex items-center gap-2"
                    >
                      <BarChart3 className="w-4 h-4 text-amber-400" />
                      <span>Seva Reports</span>
                    </button>
                  </div>

                  <div className="pt-1 border-t border-stone-800">
                    <button
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        onSignOut();
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-rose-300 hover:bg-rose-500/15 flex items-center gap-2"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

      </header>

      {/* 2. BODY LAYOUT (RESPONSIVE SIDEBAR + MAIN CONTENT AREA) */}
      <div className="flex-1 flex overflow-hidden relative min-h-0">
        
        {/* DESKTOP SIDEBAR / MOBILE SLIDING DRAWER */}
        <aside
          className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#160B08] border-r border-amber-500/20 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:z-0 flex flex-col justify-between h-full shrink-0 min-h-0 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          {/* Mobile Drawer Top Header (Shown on mobile only to close drawer) */}
          <div className="lg:hidden p-3.5 border-b border-amber-500/20 bg-black/30 flex items-center justify-between">
            <span className="text-xs font-bold text-amber-200 font-sanskrit tracking-wider">
              NAVIGATION MENU
            </span>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-1.5 rounded-lg text-stone-400 hover:text-white bg-white/5 cursor-pointer"
              aria-label="Close menu"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-3.5 sm:p-4 space-y-4 overflow-y-auto flex-1 min-h-0">
            {/* Navigation Menu Links */}
            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onSelectTab(item.id);
                      setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-stone-950 font-bold shadow-md shadow-amber-950/60'
                        : 'text-stone-300 hover:bg-amber-500/10 hover:text-amber-200'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <Icon
                        className={`w-4 h-4 shrink-0 ${
                          isActive ? 'text-stone-950' : 'text-amber-400'
                        }`}
                      />
                      <span className="truncate">{item.label}</span>
                    </div>

                    {item.badge && (
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-mono shrink-0 ${
                          isActive
                            ? 'bg-black/30 text-amber-100'
                            : item.badgeColor || 'bg-amber-500/20 text-amber-300 border border-amber-400/30'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Sidebar Footer Link: View Live Public Website */}
          <div className="p-4 border-t border-amber-500/20">
            <button
              onClick={() => (onExitAdmin ? onExitAdmin() : (window.location.href = '/'))}
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-black/40 border border-amber-400/20 text-xs text-amber-200 hover:bg-amber-500/20 transition-colors cursor-pointer text-left"
            >
              <span className="flex items-center gap-2">
                <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
                <span>View Live Public Website</span>
              </span>
              <ChevronRight className="w-4 h-4 text-stone-500" />
            </button>
          </div>
        </aside>

        {/* Backdrop for Mobile Drawer */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 z-30 bg-black/70 backdrop-blur-sm lg:hidden animate-in fade-in"
          />
        )}

        {/* 3. MAIN DASHBOARD CONTENT AREA */}
        <main className="flex-1 h-full overflow-y-auto min-h-0 p-3.5 sm:p-6 lg:p-8 space-y-6 pb-28 lg:pb-8 flex flex-col justify-between custom-scrollbar">
          {/* Children renders active tab */}
          <div className="flex-1">
            {children}
          </div>
        </main>
      </div>

      {/* 4. MOBILE NATIVE BOTTOM APP BAR (Mobile-Only Navigation) */}
      <nav className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-[#160B08]/95 backdrop-blur-xl border-t border-amber-500/25 px-2 py-1.5 flex items-center justify-around shadow-2xl pb-safe">
        {/* Tab 1: Home Dashboard */}
        <button
          onClick={() => onSelectTab('dashboard')}
          className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] py-1 px-2 rounded-xl transition-all ${
            activeTab === 'dashboard'
              ? 'text-amber-300 font-bold'
              : 'text-stone-400 hover:text-stone-200'
          }`}
        >
          <LayoutDashboard className={`w-5 h-5 ${activeTab === 'dashboard' ? 'text-amber-300' : ''}`} />
          <span className="text-[10px] mt-0.5">Home</span>
        </button>

        {/* Tab 2: Bookings with red/amber badge */}
        <button
          onClick={() => onSelectTab('bookings')}
          className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] py-1 px-2 rounded-xl transition-all relative ${
            activeTab === 'bookings'
              ? 'text-amber-300 font-bold'
              : 'text-stone-400 hover:text-stone-200'
          }`}
        >
          <CalendarCheck className={`w-5 h-5 ${activeTab === 'bookings' ? 'text-amber-300' : ''}`} />
          <span className="text-[10px] mt-0.5">Bookings</span>
          <span className="absolute top-1.5 right-3 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-[#160B08]" />
        </button>

        {/* Tab 3: Quick Add (Center floating circular gold button) */}
        <button
          onClick={onOpenNewBooking}
          className="w-12 h-12 -mt-5 rounded-full bg-gradient-to-tr from-amber-500 via-amber-400 to-amber-600 text-stone-950 flex items-center justify-center font-bold shadow-xl shadow-amber-950/80 border-4 border-[#100705] active:scale-90 transition-transform"
          aria-label="New Booking"
        >
          <Plus className="w-5 h-5 stroke-[3]" />
        </button>

        {/* Tab 4: QR Payments with pending verification count */}
        <button
          onClick={() => onSelectTab('payments')}
          className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] py-1 px-2 rounded-xl transition-all relative ${
            activeTab === 'payments'
              ? 'text-amber-300 font-bold'
              : 'text-stone-400 hover:text-stone-200'
          }`}
        >
          <QrCode className={`w-5 h-5 ${activeTab === 'payments' ? 'text-amber-300' : ''}`} />
          <span className="text-[10px] mt-0.5">Payments</span>
          {pendingQRCount > 0 && (
            <span className="absolute top-1.5 right-3 w-2 h-2 rounded-full bg-amber-400 ring-2 ring-[#160B08]" />
          )}
        </button>

        {/* Tab 5: Profile / Settings */}
        <button
          onClick={() => onSelectTab('settings')}
          className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] py-1 px-2 rounded-xl transition-all relative ${
            activeTab === 'settings'
              ? 'text-amber-300 font-bold'
              : 'text-stone-400 hover:text-stone-200'
          }`}
        >
          <Settings className={`w-5 h-5 ${activeTab === 'settings' ? 'text-amber-300' : ''}`} />
          <span className="text-[10px] mt-0.5">Profile</span>
        </button>
      </nav>

    </div>
  );
};
