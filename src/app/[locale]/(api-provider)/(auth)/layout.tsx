'use client';

import { useEffect } from 'react';
import LoadingScreen from '@/components/loading-screen';
import { useFetchMe } from '@/components/providers/auth-provider/me.hook';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { fetchMe, isLoading } = useFetchMe();

  useEffect(() => {
    fetchMe();
  }, [fetchMe]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return <section>{children}</section>;
}
