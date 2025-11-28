'use client';

import { useAuth } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import {
  SidebarProvider,
  Sidebar,
  SidebarInset,
} from '@/components/ui/sidebar';
import { SidebarNav } from '@/components/layout/sidebar-nav';
import { Loader2 } from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoggedIn, isUserLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // If finished loading and not logged in, redirect.
    if (!isUserLoading && !isLoggedIn) {
      router.push('/join-us');
    }
  }, [isLoggedIn, isUserLoading, router]);

  // Show a loader while checking auth state
  if (isUserLoading || !isLoggedIn) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Render the dashboard layout if logged in
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarNav />
      </Sidebar>
      <SidebarInset>
        <div className="min-h-screen lg:py-4 lg:pl-4 lg:pr-8">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
