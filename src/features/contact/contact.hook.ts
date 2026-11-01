import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/components/providers/api-provider/api-client';
import { QueryKeys } from '@/constants';
import type { ConnectionsResponse, ContactResponse } from '@/types/user.types';

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

export function useRecordConnection() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (code: string) =>
      apiClient.post(`/api/protected/connections/${encodeURIComponent(code)}`),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [QueryKeys.CONNECTIONS] }),
  });
}

export function useConnections() {
  return useQuery({
    queryKey: [QueryKeys.CONNECTIONS],
    queryFn: async () =>
      (await apiClient.get<ConnectionsResponse>('/api/protected/connections'))
        .data,
  });
}
