'use client';

import { Edit } from 'lucide-react';
import Button from '@/components/common/overridden/button';
import { authStore } from '@/components/providers/auth-provider/auth.store';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useCommonTranslation } from '@/hooks';
import type { UserSession } from '@/types/user.types';

type Props = {
  onEdit: () => void;
};

export default function UserDetailsCard({ onEdit }: Props) {
  const user = authStore((s) => s.userSession);
  const t = useCommonTranslation();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('User details')}</CardTitle>
        <CardDescription>{t('User details description')}</CardDescription>
        <CardAction>
          <Button
            type="button"
            variant={'ghost'}
            icon={Edit}
            onClick={() => onEdit()}
          >
            <span className="hidden md:inline">{t('Edit my info')}</span>
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {userDetailsFields.map(({ key, label, type }) => (
            <div key={key} className="min-w-0">
              <dt className="font-medium text-muted-foreground capitalize">
                {t(label)}
              </dt>
              <dd className="min-w-0 truncate">
                {type === 'url' && user?.[key] ? (
                  <a
                    href={String(user?.[key])}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block max-w-full truncate text-primary underline"
                  >
                    {String(user?.[key])}
                  </a>
                ) : (
                  String(user?.[key] ?? '') || (
                    <i className="text-muted-foreground">{t('Not provided')}</i>
                  )
                )}
              </dd>
            </div>
          ))}
        </dl>
      </CardContent>
    </Card>
  );
}

type LabelKey =
  | 'Name'
  | 'Email'
  | 'Facebook Profile'
  | 'LinkedIn Profile'
  | 'Phone'
  | 'Student ID label'
  | 'Company'
  | 'Bio';

const userDetailsFields: {
  key: keyof UserSession;
  label: LabelKey;
  type: 'text' | 'url';
}[] = [
  {
    key: 'name',
    label: 'Name',
    type: 'text',
  },
  {
    key: 'studentId',
    label: 'Student ID label',
    type: 'text',
  },
  {
    key: 'email',
    label: 'Email',
    type: 'text',
  },
  {
    key: 'facebookProfile',
    label: 'Facebook Profile',
    type: 'url',
  },
  {
    key: 'linkedinProfile',
    label: 'LinkedIn Profile',
    type: 'url',
  },
  {
    key: 'phone',
    label: 'Phone',
    type: 'text',
  },
  {
    key: 'company',
    label: 'Company',
    type: 'text',
  },
  {
    key: 'bio',
    label: 'Bio',
    type: 'text',
  },
];
