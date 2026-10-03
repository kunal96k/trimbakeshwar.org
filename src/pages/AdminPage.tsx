import React from 'react';
import { AdminApp } from '../admin/AdminApp';
import { useNavigation } from '../context/NavigationContext';
import { SEO } from '../components/SEO';

interface AdminPageProps {
  initialOpenLogin?: boolean;
}

export function AdminPage({ initialOpenLogin }: AdminPageProps = {}) {
  const { navigate } = useNavigation();

  return (
    <div className="w-full h-screen overflow-hidden bg-[#100705]">
      <SEO
        title="Admin Portal | Secure Purohit Dashboard"
        noIndex={true}
      />
      <AdminApp
        onExitAdmin={() => navigate('/')}
        initialOpenLogin={initialOpenLogin}
      />
    </div>
  );
}

export default AdminPage;
