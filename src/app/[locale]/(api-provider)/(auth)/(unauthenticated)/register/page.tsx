'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import InputForm from '@/components/forms/input-form';
import TextareaForm from '@/components/forms/textarea-form';
import { apiClient } from '@/components/providers/api-provider/api-client';
import { Button } from '@/components/ui/button';
import {
  type RegisterFormData,
  registerFormInitialValues,
  registerFormSchemaWithRefine,
} from '@/features/register/register.schema';
import { Link, useRouter } from '@/i18n/navigation';
import { AppRoute } from '@/interfaces';

export default function RegisterPage() {
  const t = useTranslations('Form');
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const { control, handleSubmit, formState } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchemaWithRefine, {
      error: (issue) =>
        issue.path?.[0] === 'confirmPassword'
          ? t('passwordsNotMatch')
          : t('invalidField'),
    }) as never,
    defaultValues: registerFormInitialValues,
  });
  const isSubmitting = formState.isSubmitting;

  async function onSubmit(values: RegisterFormData) {
    setError(null);
    try {
      const result = await apiClient.post<{
        id: string;
        studentId: string;
        email: string;
      }>('/api/register', {
        ...values,
        bio: values.bio?.trim() || undefined,
      });
      toast.success(t('registerSuccess'));
      router.replace(
        `${AppRoute.ACTIVATE_ACCOUNT}/${result.data.id}?email=${result.data.email}`,
      );
    } catch (caught: unknown) {
      const status = axios.isAxiosError(caught)
        ? caught.response?.status
        : null;
      setError(status === 409 ? 'studentIdTaken' : 'registerError');
    }
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-4">
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
          <InputForm
            control={control}
            name="name"
            label={t('fullName')}
            autoComplete="name"
            disabled={isSubmitting}
            placeholder="Nguyễn Văn A"
          />
          <InputForm
            control={control}
            name="studentId"
            label={t('studentId')}
            autoComplete="username"
            disabled={isSubmitting}
            placeholder="IEIEIU12XXX, IELSIU16XXX"
          />
          <InputForm
            control={control}
            name="email"
            label={t('email')}
            type="email"
            autoComplete="email"
            disabled={isSubmitting}
            placeholder="nguyenvana@gmail.com"
            description="IEM Alumni chỉ sử dụng email của bạn cho mục đích liên lạc và xác thực tài khoản"
          />
          <InputForm
            control={control}
            name="phone"
            label={t('phone')}
            type="tel"
            autoComplete="tel"
            disabled={isSubmitting}
            placeholder="09123..."
            description="IEM Alumni không sử dụng số điện thoại của bạn cho tất cả mục đích nào ngoài xây dựng danh bạ hội sinh viên IEM"
          />
          <InputForm
            control={control}
            name="password"
            label={t('password')}
            type="password"
            autoComplete="new-password"
            disabled={isSubmitting}
          />
          <InputForm
            control={control}
            name="confirmPassword"
            label={t('confirmPassword')}
            type="password"
            autoComplete="new-password"
            disabled={isSubmitting}
          />
          <InputForm
            control={control}
            name="facebookProfile"
            label={t('facebookProfile')}
            type="url"
            optional
            disabled={isSubmitting}
          />
          <InputForm
            control={control}
            name="linkedinProfile"
            label={t('linkedinProfile')}
            type="url"
            optional
            disabled={isSubmitting}
          />
          <TextareaForm
            control={control}
            name="bio"
            label={t('bio')}
            maxLength={500}
            optional
            disabled={isSubmitting}
            description="Giới thiệu ngắn về bản thân bạn"
          />
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
