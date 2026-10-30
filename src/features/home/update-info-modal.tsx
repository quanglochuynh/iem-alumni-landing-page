'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Save } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import Modal from '@/components/common/modal';
import Button from '@/components/common/overridden/button';
import InputForm from '@/components/forms/input-form';
import MediaPickerForm from '@/components/forms/media-picker-form';
import {
  convert2TMediaItem,
  syncMediaArray,
} from '@/components/media-picker/media.helper';
import { apiClient } from '@/components/providers/api-provider/api-client';
import { authStore } from '@/components/providers/auth-provider/auth.store';
import { useFetchMe } from '@/components/providers/auth-provider/me.hook';
import {
  type UpdateProfileFormDataClient,
  type UpdateProfileFormDataServer,
  updateProfileFormSchemaClientWithRefine,
} from '@/features/register/register.schema';
import type { IDisclosureControls } from '@/hooks';

type Props = {
  disclosure: IDisclosureControls;
};

export default function UpdateInfoModal({ disclosure }: Props) {
  const { fetchMe } = useFetchMe();
  const user = authStore((s) => s.userSession);
  const t = useTranslations('Form');
  const { control, handleSubmit, reset, formState } =
    useForm<UpdateProfileFormDataClient>({
      resolver: zodResolver(updateProfileFormSchemaClientWithRefine, {
        error: (issue) =>
          issue.path?.[0] === 'confirmPassword'
            ? t('passwordsNotMatch')
            : t('invalidField'),
      }) as never,
      defaultValues: {
        id: user?.id || '',
        name: user?.name || '',
        password: '',
        confirmPassword: '',
        avatar: convert2TMediaItem(user?.avatar),
        facebookProfile: user?.facebookProfile || '',
        linkedinProfile: user?.linkedinProfile || '',
      },
    });
  const isSubmitting = formState.isSubmitting;

  useEffect(() => {
    reset({
      id: user?.id || '',
      name: user?.name || '',
      password: '',
      confirmPassword: '',
      avatar: convert2TMediaItem(user?.avatar),
      facebookProfile: user?.facebookProfile || '',
      linkedinProfile: user?.linkedinProfile || '',
    });
  }, [reset, user]);

  async function onProfileSubmit(values: UpdateProfileFormDataClient) {
    const avatarItem = await syncMediaArray({
      array: values.avatar || [],
      folderPath: '/avatars',
      onItemUploadedCallback: () => undefined,
    });

    const payload: UpdateProfileFormDataServer = {
      id: values.id,
      name: values.name,
      password: values.password || '',
      avatar: avatarItem[0] || null,
      facebookProfile: values.facebookProfile || '',
      linkedinProfile: values.linkedinProfile || '',
    };

    try {
      await apiClient.patch('/api/protected/me', payload);
      await fetchMe();
      disclosure.close();
      toast.success('Your info has been updated');
    } catch (error) {
      const message =
        error && typeof error === 'object' && 'message' in error
          ? String((error as { message?: string }).message)
          : 'Something went wrong';
      toast.error('Failed to update your info', { description: message });
    }
  }

  return (
    <Modal
      title="Edit my info"
      description="Update your profile information"
      open={disclosure.isOpen}
      onOpenChange={disclosure.updateOpen}
    >
      <form onSubmit={handleSubmit(onProfileSubmit)} className="space-y-4">
        <InputForm
          control={control}
          name="name"
          label={t('fullName')}
          autoComplete="name"
          disabled={isSubmitting}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <InputForm
            control={control}
            name="facebookProfile"
            label={t('facebookProfile')}
            type="url"
            optional
            disabled={isSubmitting}
            placeholder="https://facebook.com/..."
          />
          <InputForm
            control={control}
            name="linkedinProfile"
            label={t('linkedinProfile')}
            type="url"
            optional
            disabled={isSubmitting}
            placeholder="https://linkedin.com/in/..."
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <InputForm
            control={control}
            name="password"
            label={t('password')}
            type="password"
            optional
            autoComplete="new-password"
            disabled={isSubmitting}
            placeholder="Leave blank to keep current"
          />
          <InputForm
            control={control}
            name="confirmPassword"
            label={t('confirmPassword')}
            type="password"
            optional
            autoComplete="new-password"
            disabled={isSubmitting}
          />
        </div>
        <MediaPickerForm
          control={control}
          name="avatar"
          label="Avatar"
          pickerProps={{ numImage: 1 }}
        />
        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant={'outline'}
            onClick={disclosure.close}
          >
            Cancel
          </Button>
          <Button type="submit" icon={Save} loading={isSubmitting}>
            Save changes
          </Button>
        </div>
      </form>
    </Modal>
  );
}
