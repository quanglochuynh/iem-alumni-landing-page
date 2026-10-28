'use client';

import { useEffect } from 'react';
import { authStore } from '@/components/providers/auth-provider/auth.store';
import { useRouter } from '@/i18n/navigation';
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

  return <section className="z-10">{children}</section>;
}
