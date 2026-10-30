import { apiClient } from '@/components/providers/api-provider/api-client';
import type { MeResponse } from '@/types/user.types';

export async function me() {
  return apiClient.get<MeResponse>('/api/protected/me');
}

export function logout() {
  return apiClient.get('/api/logout');
}
