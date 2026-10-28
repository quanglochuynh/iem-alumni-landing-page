'use client';

import axios from 'axios';
import { useTranslations } from 'next-intl';
import { type FormEvent, useState } from 'react';
import { apiClient } from '@/components/providers/api-provider/api-client';
import { useFetchMe } from '@/components/providers/auth-provider/me.hook';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { STORAGE_KEY } from '@/constants';
import { Link } from '@/i18n/navigation';
import { AppRoute } from '@/interfaces';
import type { LoginResponse } from '@/types/user.types';

type LoginError =
  | 'invalidStudentId'
  | 'invalidCredentials'
  | 'inactiveAccount'
  | 'loginError';

export default function LoginPage() {
  const t = useTranslations('Form');
  const { fetchMe } = useFetchMe();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<LoginError | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting) return;

    const formData = new FormData(event.currentTarget);
    const studentId = String(formData.get('studentId') ?? '').trim();
    if (studentId.length < 3) {
      setError('invalidStudentId');
      return;
    }

    setIsSubmitting(true);
    setError(null);
    let loginCompleted = false;
    try {
      const { data } = await apiClient.post<LoginResponse>('/api/login', {
        studentId,
        password: String(formData.get('password') ?? ''),
        keepMeLoggedIn: true,
      });
      loginCompleted = true;

      if (data.refreshToken) {
        localStorage.setItem(STORAGE_KEY.REFRESH_TOKEN, data.refreshToken);
      } else {
        localStorage.removeItem(STORAGE_KEY.REFRESH_TOKEN);
      }

      await fetchMe();
    } catch (caught: unknown) {
      const status = axios.isAxiosError(caught)
        ? caught.response?.status
        : null;
      setError(
        !loginCompleted && status === 401
          ? 'invalidCredentials'
          : !loginCompleted && status === 403
            ? 'inactiveAccount'
            : 'loginError',
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
      <div className="w-full max-w-md rounded-xl border bg-background p-6 shadow-sm sm:p-8">
        <h1 className="text-center font-bold text-3xl">{t('loginTitle')}</h1>
        <p className="mt-2 text-center text-muted-foreground text-sm">
          {t('loginDescription')}
        </p>
        <form
          className="mt-8 space-y-5"
          onSubmit={handleSubmit}
          aria-busy={isSubmitting}
        >
          <div className="space-y-2">
            <label
              className="block font-medium text-sm"
              htmlFor="login-student-id"
            >
              {t('studentId')}
            </label>
            <Input
              autoComplete="username"
              disabled={isSubmitting}
              id="login-student-id"
              minLength={3}
              name="studentId"
              required
            />
          </div>
          <div className="space-y-2">
            <label
              className="block font-medium text-sm"
              htmlFor="login-password"
            >
              {t('password')}
            </label>
            <Input
              autoComplete="current-password"
              disabled={isSubmitting}
              id="login-password"
              minLength={6}
              name="password"
              required
              type="password"
            />
          </div>
          {error && (
            <p className="text-destructive text-sm" role="alert">
              {t(error)}
            </p>
          )}
          <Button className="mt-4 w-full" disabled={isSubmitting} type="submit">
            {t(isSubmitting ? 'signingIn' : 'signIn')}
          </Button>
        </form>
        <Link
          className="mt-4 block w-full text-center text-sm underline"
          href={AppRoute.REGISTER}
        >
          <Button
            className="mt-4 w-full"
            variant={'ghost'}
            disabled={isSubmitting}
          >
            Tạo tài khoản
          </Button>
        </Link>
        <Link
          className="mt-6 block text-center text-sm underline"
          href={AppRoute.ROOT}
        >
          {t('backToHome')}
        </Link>
      </div>
    </div>
  );
}
