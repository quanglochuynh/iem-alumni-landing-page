'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { authStore } from '@/components/providers/auth-provider/auth.store';
import { AppRoute } from '@/interfaces';

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userSession = authStore((state) => state.userSession);

  console.log({ userSession });

  const router = useRouter();

  useEffect(() => {
    if (!userSession) {
      router.replace(AppRoute.LOGIN);
    }
  }, [userSession, router]);

  return <section>{children}</section>;
}
