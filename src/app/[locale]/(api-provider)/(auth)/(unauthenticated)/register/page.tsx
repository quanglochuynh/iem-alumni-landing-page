'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { apiClient } from '@/components/providers/api-provider/api-client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  type RegisterFormData,
  registerFormInitialValues,
  registerFormSchemaWithRefine,
} from '@/features/register/register.schema';
import { Link, useRouter } from '@/i18n/navigation';
import { AppRoute } from '@/interfaces';

type Field = {
  name: keyof RegisterFormData;
  label: string;
  type?: string;
  autoComplete?: string;
};

export default function RegisterPage() {
  const t = useTranslations('Form');
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchemaWithRefine) as never,
    defaultValues: registerFormInitialValues,
  });

  const fields: Field[] = [
    { name: 'name', label: t('fullName'), autoComplete: 'name' },
    { name: 'studentId', label: t('studentId'), autoComplete: 'username' },
    { name: 'email', label: t('email'), type: 'email', autoComplete: 'email' },
    { name: 'phone', label: t('phone'), type: 'tel', autoComplete: 'tel' },
    { name: 'academicYear', label: t('academicYear'), type: 'number' },
    { name: 'major', label: t('major') },
    {
      name: 'password',
      label: t('password'),
      type: 'password',
      autoComplete: 'new-password',
    },
    {
      name: 'confirmPassword',
      label: t('confirmPassword'),
      type: 'password',
      autoComplete: 'new-password',
    },
  ];

  async function onSubmit(values: RegisterFormData) {
    setError(null);
    try {
      await apiClient.post('/api/register', {
        ...values,
        bio: values.bio?.trim() || undefined,
      });
      toast.success(t('registerSuccess'));
      router.replace(AppRoute.LOGIN);
    } catch (caught: unknown) {
      const status = axios.isAxiosError(caught)
        ? caught.response?.status
        : null;
      setError(status === 409 ? 'studentIdTaken' : 'registerError');
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
      <div className="w-full max-w-md rounded-xl border bg-background p-6 shadow-sm sm:p-8">
        <h1 className="text-center font-bold text-3xl">{t('registerTitle')}</h1>
        <p className="mt-2 text-center text-muted-foreground text-sm">
          {t('registerDescription')}
        </p>
        <form
          aria-busy={isSubmitting}
          className="mt-8 space-y-4"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          {fields.map(({ name, label, type, autoComplete }) => (
            <div className="space-y-2" key={name}>
              <label
                className="block font-medium text-sm"
                htmlFor={`register-${name}`}
              >
                {label}
              </label>
              <Input
                autoComplete={autoComplete}
                disabled={isSubmitting}
                id={`register-${name}`}
                type={type}
                {...register(name)}
              />
              {errors[name] && (
                <p className="text-destructive text-sm" role="alert">
                  {name === 'confirmPassword'
                    ? t('passwordsNotMatch')
                    : t('invalidField')}
                </p>
              )}
            </div>
          ))}
          <div className="space-y-2">
            <label className="block font-medium text-sm" htmlFor="register-bio">
              {t('bio')}
            </label>
            <textarea
              className="min-h-20 w-full rounded-md border bg-transparent px-3 py-2 text-sm"
              disabled={isSubmitting}
              id="register-bio"
              maxLength={500}
              {...register('bio')}
            />
          </div>
          {error && (
            <p className="text-destructive text-sm" role="alert">
              {t(error)}
            </p>
          )}
          <Button className="mt-4 w-full" disabled={isSubmitting} type="submit">
            {t(isSubmitting ? 'registering' : 'register')}
          </Button>
        </form>
        <Link
          className="mt-6 block text-center text-sm underline"
          href={AppRoute.LOGIN}
        >
          {t('haveAccount')}
        </Link>
      </div>
    </div>
  );
}
