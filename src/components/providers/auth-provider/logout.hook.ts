import { apiClient } from '@/api-client';
import { authStore } from '@/components/providers/auth-provider/auth.store';
import { AppRoute, STORAGE_KEY } from '@/constants';
import { ApiError } from '@common/types/error.type';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

function logout() {
  return apiClient.get('/api/logout');
}

export function useLogout() {
  const navigate = useNavigate();
  const logoutAuth = authStore((s) => s.logout);
  const { mutate, isPending } = useMutation({
    mutationFn: logout,
    onError: (error: AxiosError<ApiError>) => {
      toast.error(
        error.response?.data.message ||
          'Đăng xuất không thành công. Vui lòng thử lại.',
      );
    },
    onSuccess: () => {
      logoutAuth();
      navigate(AppRoute.LOGIN);
      localStorage.removeItem(STORAGE_KEY.REFRESH_TOKEN);
    },
  });

  return {
    logout: () => mutate(),
    loading: isPending,
  };
}
