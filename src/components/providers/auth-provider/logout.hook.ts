import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { apiClient } from '@/components/providers/api-provider/api-client';
import { authStore } from '@/components/providers/auth-provider/auth.store';
import { STORAGE_KEY } from '@/constants';
import { AppRoute } from '@/interfaces';

function logout() {
  return apiClient.get('/api/logout');
}

export function useLogout() {
  // const navigate = useNavigate();
  const router = useRouter();
  const logoutAuth = authStore((s) => s.logout);
  const { mutate, isPending } = useMutation({
    mutationFn: logout,
    onError: (error: AxiosError<any>) => {
      toast.error(
        error.response?.data.message ||
          'Đăng xuất không thành công. Vui lòng thử lại.',
      );
    },
    onSuccess: () => {
      logoutAuth();
      router.replace(AppRoute.LOGIN);
      localStorage.removeItem(STORAGE_KEY.REFRESH_TOKEN);
    },
  });

  return {
    logout: () => mutate(),
    loading: isPending,
  };
}
