'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import CheckboxForm from '@/components/forms/checkbox-form';
import InputForm from '@/components/forms/input-form';
import { apiClient } from '@/components/providers/api-provider/api-client';
import { useFetchMe } from '@/components/providers/auth-provider/me.hook';
import { Button } from '@/components/ui/button';
import { STORAGE_KEY } from '@/constants';
import { Link } from '@/i18n/navigation';
import { AppRoute } from '@/interfaces';
import {
  createLoginFormSchema,
  type LoginFormData,
  loginFormInitialValues,
} from '@/schemas/login-form.schema';
import type { LoginResponse } from '@/types/user.types';

type LoginError =
  | 'invalidStudentId'
  | 'invalidCredentials'
  | 'inactiveAccount'
  | 'loginError';

export default function LoginPage() {
  const t = useTranslations('Form');
  const { fetchMe } = useFetchMe();
  const [error, setError] = useState<LoginError | null>(null);
  const schema = useMemo(
    () =>
      createLoginFormSchema({
        invalidStudentId: t('invalidStudentId'),
        invalidPassword: t('invalidPassword'),
      }),
    [t],
  );
  const { control, handleSubmit, formState } = useForm<LoginFormData>({
    resolver: zodResolver(schema),
    defaultValues: loginFormInitialValues,
  });
  const isSubmitting = formState.isSubmitting;

  async function onSubmit(values: LoginFormData) {
    setError(null);
    let loginCompleted = false;
    try {
      const { data } = await apiClient.post<LoginResponse>(
        '/api/login',
        values,
      );
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
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="mx-2 w-full max-w-full rounded-xl border bg-background p-6 shadow-sm sm:p-8 md:w-100">
        <h1 className="text-center font-bold text-3xl">{t('loginTitle')}</h1>
        <p className="mt-2 text-center text-muted-foreground text-sm">
          {t('loginDescription')}
        </p>
        <form
          className="mt-8 space-y-5"
          onSubmit={handleSubmit(onSubmit)}
          aria-busy={isSubmitting}
        >
          <InputForm
            control={control}
            name="studentId"
            label={t('studentId')}
            autoComplete="username"
            disabled={isSubmitting}
          />
          <InputForm
            control={control}
            name="password"
            label={t('password')}
            type="password"
            autoComplete="current-password"
            disabled={isSubmitting}
          />
          <CheckboxForm
            control={control}
            name="keepMeLoggedIn"
            label={t('keepMeLoggedIn')}
            disabled={isSubmitting}
          />
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
