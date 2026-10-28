import { apiClient } from '@/components/providers/api-provider/api-client';
import { authStore } from '@/components/providers/auth-provider/auth.store';
import { QueryKeys } from '@/constants';
import type { MeResponse } from '@/types/user.types';
import { useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';

async function me() {
  return apiClient.get<MeResponse>('/api/protected/me');
}

export function useFetchMe() {
  const setUserSession = authStore((s) => s.setUserSession);

  const { refetch, isLoading } = useQuery({
    queryKey: [QueryKeys.USER_SESSION],
    queryFn: me,
    enabled: false,
    retry: false,
  });

  const fetchMe = useCallback(async () => {
    await refetch()
      .then((data) => {
        if (!data.data) return;
        setUserSession(data.data?.data);
      })
      .catch();
  }, [refetch, setUserSession]);

  return { fetchMe, isLoading };
}
