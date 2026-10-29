'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useParams, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';
import Button from '@/components/common/overridden/button';
import InputForm from '@/components/forms/input-form';
import { apiClient } from '@/components/providers/api-provider/api-client';
import { useFetchMe } from '@/components/providers/auth-provider/me.hook';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { STORAGE_KEY } from '@/constants';
import type { LoginResponse } from '@/types/user.types';

const optSchema = z.object({
  otp: z
    .string()
    .length(6, 'Mã OTP phải có 6 chữ số')
    .refine((val) => /^\d{6}$/.test(val), {
      message: 'Mã OTP phải là 6 chữ số',
    }),
});

type OptFormValues = z.infer<typeof optSchema>;

export default function ActivateAccountPage() {
  const { userId } = useParams<{ userId: string }>();
  const location = useSearchParams();
  const email = location.get('email');
  const { fetchMe, isLoading } = useFetchMe();

  const methods = useForm<OptFormValues>({
    resolver: zodResolver(optSchema),
    defaultValues: {
      otp: '',
    },
  });

  const activateMutation = useMutation({
    mutationFn: async (data: OptFormValues) => {
      const response = await apiClient.post<LoginResponse>(
        `/api/activate-account`,
        {
          ...data,
          email,
          userId,
        },
      );
      return response.data;
    },
    onSuccess: (data) => {
      toast.success('Kích hoạt tài khoản thành công');
      if (data.refreshToken) {
        localStorage.setItem(STORAGE_KEY.REFRESH_TOKEN, data.refreshToken);
      } else {
        localStorage.removeItem(STORAGE_KEY.REFRESH_TOKEN);
      }
      fetchMe();
    },
  });

  const handleSubmit = (data: OptFormValues) => {
    activateMutation.mutate(data);
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Kích hoạt tài khoản của bạn</CardTitle>
          <CardDescription>
            Chúng tôi đã gửi một email chứa mã OTP (6 chữ số) từ địa chỉ{' '}
            <strong>iem.alumni@hcmiu.edu.vn</strong> đến{' '}
            <strong>{email}</strong>. Vui lòng kiểm tra email của bạn.
          </CardDescription>
        </CardHeader>
        <form onSubmit={methods.handleSubmit(handleSubmit)}>
          <CardContent>
            <InputForm
              control={methods.control}
              name="otp"
              label="Mã OTP"
              type="number"
              autoComplete="one-time-code"
              required
              placeholder="xxxxxx"
            />
          </CardContent>
          <CardFooter className="mt-4">
            <Button
              type="submit"
              loading={activateMutation.isPending || isLoading}
            >
              Kích hoạt
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
