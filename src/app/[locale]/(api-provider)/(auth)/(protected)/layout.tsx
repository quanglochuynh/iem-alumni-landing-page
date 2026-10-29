'use client';

import { useEffect } from 'react';
import { authStore } from '@/components/providers/auth-provider/auth.store';
import { useRouter } from '@/i18n/navigation';
import { AppRoute } from '@/interfaces';

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userSession = authStore((state) => state.userSession);

  const router = useRouter();

  useEffect(() => {
    if (!userSession) {
      router.replace(AppRoute.LOGIN);
    }
  }, [userSession, router]);

  return <section className="z-10 size-full">{children}</section>;
}
