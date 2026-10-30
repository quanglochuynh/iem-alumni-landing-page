'use client';

import { useSearchParams } from 'next/navigation';
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
  const redirectTo = useSearchParams().get('redirect');

  useEffect(() => {
    if (userSession) {
      // Only allow same-site relative paths to avoid open redirects
      const isSafe =
        redirectTo?.startsWith('/') &&
        !redirectTo.startsWith('//') &&
        !redirectTo.includes('\\');
      router.replace(isSafe && redirectTo ? redirectTo : AppRoute.HOME);
    }
  }, [userSession, router, redirectTo]);

  return <section className="z-10 size-full">{children}</section>;
}
