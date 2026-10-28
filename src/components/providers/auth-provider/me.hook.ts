import { useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';
import { apiClient } from '@/components/providers/api-provider/api-client';
import { authStore } from '@/components/providers/auth-provider/auth.store';
import { QueryKeys } from '@/constants';
import type { MeResponse } from '@/types/user.types';

async function me() {
  return apiClient.get<MeResponse>('/api/protected/me');
}

export function useFetchMe() {
  const setUserSession = authStore((s) => s.setUserSession);

  const { refetch, isFetching } = useQuery({
    queryKey: [QueryKeys.USER_SESSION],
    queryFn: me,
    enabled: false,
    retry: false,
  });

  const fetchMe = useCallback(async () => {
    try {
      const result = await refetch({ throwOnError: true });
      if (!result.data) {
        throw new Error('Session response is missing');
      }
      setUserSession(result.data.data);
    } catch {
      console.log('here');
    }
  }, [refetch, setUserSession]);

  return { fetchMe, isLoading: isFetching };
}
