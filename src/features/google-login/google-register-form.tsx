'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import type z from 'zod';
import InputForm from '@/components/forms/input-form';
import { Button } from '@/components/ui/button';
import { registerFormSchema } from '@/features/register/register.schema';

const googleRegisterSchema = registerFormSchema.pick({
  studentId: true,
  name: true,
  phone: true,
  company: true,
});

type GoogleRegisterFormData = z.infer<typeof googleRegisterSchema>;

type Props = {
  email: string;
  defaultName: string;
  onSubmit: (values: GoogleRegisterFormData) => Promise<void>;
  onCancel: () => void;
};

export default function GoogleRegisterForm({
  email,
  defaultName,
  onSubmit,
  onCancel,
}: Props) {
  const t = useTranslations('Form');
  const [error, setError] = useState<string | null>(null);
  const { control, handleSubmit, formState } = useForm<GoogleRegisterFormData>({
    resolver: zodResolver(googleRegisterSchema, {
      error: () => t('invalidField'),
    }) as never,
    defaultValues: {
      studentId: '',
      name: defaultName,
      phone: '',
      company: '',
    },
  });
  const isSubmitting = formState.isSubmitting;

  async function submit(values: GoogleRegisterFormData) {
    setError(null);
    try {
      await onSubmit({
        ...values,
        company: values.company?.trim() || undefined,
      });
    } catch (caught: unknown) {
      if (axios.isAxiosError(caught)) {
        const status = caught.response?.status;
        const field = caught.response?.data?.field;
        if (status === 409) {
          setError(
            field === 'Email'
              ? 'emailTaken'
              : field === 'Phone'
                ? 'phoneTaken'
                : 'studentIdTaken',
          );
          return;
        }
        if (status === 401) {
          setError('registrationExpired');
          return;
        }
      }
      setError('registerError');
    }
  }

  return (
    <>
      <h1 className="text-center font-bold text-3xl">
        {t('completeProfileTitle')}
      </h1>
      <p className="mt-2 text-center text-muted-foreground text-sm">
        {t('completeProfileDescription')}
      </p>
      <form
        aria-busy={isSubmitting}
        className="mt-8 space-y-4"
        noValidate
        onSubmit={handleSubmit(submit)}
      >
        <div className="space-y-1">
          <p className="font-medium text-sm">{t('email')}</p>
          <p className="rounded-md border bg-muted px-3 py-2 text-sm">
            {email}
          </p>
        </div>
        <InputForm
          control={control}
          name="studentId"
          label={t('studentId')}
          disabled={isSubmitting}
          placeholder="IEIEIU12XXX, IELSIU16XXX"
        />
        <InputForm
          control={control}
          name="name"
          label={t('fullName')}
          autoComplete="name"
          disabled={isSubmitting}
        />
        <InputForm
          control={control}
          name="phone"
          label={t('phone')}
          type="tel"
          autoComplete="tel"
          disabled={isSubmitting}
          placeholder="09123..."
        />
        <InputForm
          control={control}
          name="company"
          label={t('company')}
          disabled={isSubmitting}
          optional
        />
        {error && (
          <p className="text-destructive text-sm" role="alert">
            {t(error)}
          </p>
        )}
        <Button className="w-full" disabled={isSubmitting} type="submit">
          {t('continue')}
        </Button>
        <Button
          className="w-full"
          disabled={isSubmitting}
          onClick={onCancel}
          type="button"
          variant="ghost"
        >
          {t('retry')}
        </Button>
      </form>
    </>
  );
}
