import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/components/providers/api-provider/api-client';
import { QueryKeys } from '@/constants';
import type { TEventPreview } from '@/features/event/event.type';

export function useEvents(usePublicEndpoint = true) {
  return useQuery({
    queryKey: [QueryKeys.EVENTS],
    queryFn: async () =>
      (
        await apiClient.get<TEventPreview[]>(
          usePublicEndpoint ? '/api/events' : '/api/protected/events',
        )
      ).data,
  });
}
