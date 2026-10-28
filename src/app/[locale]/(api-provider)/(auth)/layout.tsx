'use client';

import { useEffect, useState } from 'react';
import LoadingScreen from '@/components/loading-screen';
import { useFetchMe } from '@/components/providers/auth-provider/me.hook';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { fetchMe, isLoading } = useFetchMe();

  const [checked, setChecked] = useState(false);

  useEffect(() => {
    fetchMe()
      .catch(() => {})
      .finally(() => setChecked(true));
  }, [fetchMe]);

  if (!checked || isLoading) {
    return <LoadingScreen />;
  }

  return <section>{children}</section>;
}
