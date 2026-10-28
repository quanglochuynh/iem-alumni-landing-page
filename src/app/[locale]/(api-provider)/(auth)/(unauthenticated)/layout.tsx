'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { authStore } from '@/components/providers/auth-provider/auth.store';
import { AppRoute } from '@/interfaces';

export default function UnAuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userSession = authStore((state) => state.userSession);
  const router = useRouter();

  useEffect(() => {
    if (userSession) {
      router.replace(AppRoute.HOME);
    }
  }, [userSession, router]);

  return <section>{children}</section>;
}
