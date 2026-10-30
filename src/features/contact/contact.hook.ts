import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/components/providers/api-provider/api-client';
import { QueryKeys } from '@/constants';
import type { ContactResponse } from '@/types/user.types';

export function useContact(code: string | null) {
  return useQuery({
    queryKey: [QueryKeys.CONTACT, code],
    enabled: Boolean(code),
    retry: false,
    queryFn: async () =>
      (
        await apiClient.get<ContactResponse>(
          `/api/contact/${encodeURIComponent(code ?? '')}`,
        )
      ).data,
  });
}
