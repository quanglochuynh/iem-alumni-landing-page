import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/components/providers/api-provider/api-client';
import { QueryKeys } from '@/constants';
import type { TEventPreview } from '@/features/event/event.type';

export function useEvents() {
  return useQuery({
    queryKey: [QueryKeys.EVENTS],
    queryFn: async () =>
      (await apiClient.get<TEventPreview[]>('/api/events')).data,
  });
}

// Requires the admin worker to expose GET /api/protected/my-events.
export function useEnrolledEvents(enabled = true) {
  return useQuery({
    queryKey: [QueryKeys.ENROLLED_EVENTS],
    queryFn: async () =>
      (await apiClient.get<TEventPreview[]>('/api/protected/my-events')).data,
    enabled,
  });
}
