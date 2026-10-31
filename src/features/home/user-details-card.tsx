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
import type { UserSession } from '@/types/user.types';

type Props = {
  onEdit: () => void;
};

export default function UserDetailsCard({ onEdit }: Props) {
  const user = authStore((s) => s.userSession);

  return (
    <Card>
      <CardHeader>
        <CardTitle>User details</CardTitle>
        <CardDescription>
          Update and review your account information.
        </CardDescription>
        <CardAction>
          <Button
            type="button"
            variant={'ghost'}
            icon={Edit}
            onClick={() => onEdit()}
          >
            Edit my info
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <dl className="grid gap-4 sm:grid-cols-2">
          {userDetailsFields.map(({ key, label }) => (
            <div key={key}>
              <dt className="font-medium text-muted-foreground capitalize">
                {label}
              </dt>
              <dd>
                {String(user?.[key] ?? '') || (
                  <i className="text-muted-foreground">Not provided</i>
                )}
              </dd>
            </div>
          ))}
        </dl>
      </CardContent>
    </Card>
  );
}

const userDetailsFields: { key: keyof UserSession; label: string }[] = [
  {
    key: 'name',
    label: 'Name',
  },
  {
    key: 'email',
    label: 'Email',
  },
  {
    key: 'facebookProfile',
    label: 'Facebook Profile',
  },
  {
    key: 'linkedinProfile',
    label: 'LinkedIn Profile',
  },
  {
    key: 'phone',
    label: 'Phone',
  },
  {
    key: 'studentId',
    label: 'Student ID',
  },
];
