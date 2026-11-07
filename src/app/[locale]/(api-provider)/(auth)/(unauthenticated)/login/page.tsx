'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { IconBrandGoogle } from '@tabler/icons-react';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '@/components/common/overridden/button';
import InputForm from '@/components/forms/input-form';
import { apiClient } from '@/components/providers/api-provider/api-client';
import { useFetchMe } from '@/components/providers/auth-provider/me.hook';
import { STORAGE_KEY } from '@/constants';
import GoogleRegisterForm from '@/features/google-login/google-register-form';
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
  | 'loginError'
  | 'googleSignInError';

type GoogleResultResponse =
  | { status: 'logged_in'; refreshToken: string }
  | { status: 'needs_registration'; email: string; name: string };

type PendingGoogleRegistration = Extract<
  GoogleResultResponse,
  { status: 'needs_registration' }
>;

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
  const [pendingGoogle, setPendingGoogle] =
    useState<PendingGoogleRegistration | null>(null);

  async function completeLogin(data: { refreshToken?: string | null }) {
    if (data.refreshToken) {
      localStorage.setItem(STORAGE_KEY.REFRESH_TOKEN, data.refreshToken);
    } else {
      localStorage.removeItem(STORAGE_KEY.REFRESH_TOKEN);
    }
    await fetchMe();
  }

  const searchParams = useSearchParams();
  const googleHandled = useRef(false);

  // Runs once on return from Google, guarded by googleHandled
  // biome-ignore lint/correctness/useExhaustiveDependencies: one-shot effect
  useEffect(() => {
    if (googleHandled.current) {
      return;
    }
    googleHandled.current = true;
    if (searchParams.get('error') === 'google') {
      setError('googleSignInError');
      return;
    }
    if (searchParams.get('google') !== 'done') {
      return;
    }
    apiClient
      .get<GoogleResultResponse>('/api/login/google/result')
      .then(async ({ data }) => {
        if (data.status === 'needs_registration') {
          setPendingGoogle(data);
          return;
        }
        await completeLogin(data);
      })
      .catch(() => setError('googleSignInError'));
  }, [searchParams]);

  async function handleGoogleRegister(values: {
    studentId: string;
    name: string;
    phone: string;
    company?: string;
  }) {
    if (!pendingGoogle) {
      return;
    }
    const { data } = await apiClient.post<LoginResponse>(
      '/api/register/google',
      values,
    );
    await completeLogin(data);
  }

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
        {pendingGoogle ? (
          <GoogleRegisterForm
            defaultName={pendingGoogle.name}
            email={pendingGoogle.email}
            onCancel={() => setPendingGoogle(null)}
            onSubmit={handleGoogleRegister}
          />
        ) : (
          <>
            <Link className="mb-4 block underline" href={AppRoute.ROOT}>
              {t('backToHome')}
            </Link>
            <h1 className="text-center font-bold text-3xl">
              {t('loginTitle')}
            </h1>
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
              {error && (
                <p className="text-destructive text-sm" role="alert">
                  {t(error)}
                </p>
              )}
              <Button
                className="mt-4 w-full"
                disabled={isSubmitting}
                type="submit"
              >
                {t(isSubmitting ? 'signingIn' : 'signIn')}
              </Button>
            </form>
            <div className="my-4 flex items-center gap-3 text-muted-foreground text-xs">
              <div className="h-px flex-1 bg-border" />
              {t('orContinueWith')}
              <div className="h-px flex-1 bg-border" />
            </div>

            <a href="/api/login/google/start">
              <Button
                className="w-full"
                disabled={isSubmitting}
                variant="outline"
                icon={IconBrandGoogle}
              >
                {t('loginWithGoogle')}
              </Button>
            </a>

            <Link
              className="mt-4 block w-full text-center text-sm underline"
              href={AppRoute.REGISTER}
            >
              <Button
                className="mt-4 w-full"
                variant={'ghost'}
                disabled={isSubmitting}
              >
                {t('register')}
              </Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
