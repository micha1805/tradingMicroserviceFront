'use client';

import { useEffect } from 'react';
import { useUserStore } from '@/store/user';
import Navigation from '@/components/navigation/Navigation';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const fetchProfile = useUserStore((state) => state.fetchProfile);
  const fetchBalance = useUserStore((state) => state.fetchBalance);

  useEffect(() => {
    fetchProfile();
    fetchBalance();
  }, [fetchProfile, fetchBalance]);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          {children}
        </main>
      </div>
    </ProtectedRoute>
  );
} 