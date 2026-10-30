import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { logout } from '@/components/providers/auth-provider/auth.api';
import { authStore } from '@/components/providers/auth-provider/auth.store';
import { STORAGE_KEY } from '@/constants';
import { AppRoute } from '@/interfaces';

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
      router.replace(AppRoute.ROOT);
      localStorage.removeItem(STORAGE_KEY.REFRESH_TOKEN);
    },
  });

  return {
    logout: () => mutate(),
    loading: isPending,
  };
}
