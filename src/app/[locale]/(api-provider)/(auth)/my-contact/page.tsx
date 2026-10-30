'use client';

import { Contact, ExternalLink, LogIn, Mail, Phone } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import Container from '@/components/common/container';
import DynamicAvatar from '@/components/common/overridden/avatar';
import Button from '@/components/common/overridden/button';
import { authStore } from '@/components/providers/auth-provider/auth.store';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';
import { useContact } from '@/features/contact/contact.hook';
import { Link } from '@/i18n/navigation';
import { AppRoute } from '@/interfaces';
import { downloadVCard, getR2ImageUrl } from '@/lib';

const safeUrl = (value?: string) => {
  if (!value) return null;
  try {
    const url = new URL(value.startsWith('http') ? value : `https://${value}`);
    return url.protocol === 'https:' || url.protocol === 'http:'
      ? url.toString()
      : null;
  } catch {
    return null;
  }
};

export default function MyContactPage() {
  const code = useSearchParams().get('code');
  const viewer = authStore((s) => s.userSession);
  const { data, isLoading, isError } = useContact(code);

  if (!code || isError) {
    return (
      <Container size="md" className="py-16 text-center">
        <h1 className="font-bold text-2xl">Contact not found</h1>
        <p className="my-4 text-muted-foreground">
          This QR code is invalid or the account is not available.
        </p>
        <Link href={AppRoute.ROOT}>Back to home</Link>
      </Container>
    );
  }

  if (isLoading || !data) {
    return (
      <div className="flex justify-center py-16">
        <Spinner />
      </div>
    );
  }

  const { details } = data;
  const facebook = safeUrl(details?.facebookProfile);
  const linkedin = safeUrl(details?.linkedinProfile);

  const loginHref = `${AppRoute.LOGIN}?redirect=${encodeURIComponent(
    `${AppRoute.MY_CONTACT}?code=${code}`,
  )}`;

  return (
    <Container size="sm" className="z-10 py-16">
      <Card>
        <CardHeader className="flex flex-col items-center justify-center gap-4 text-center">
          <DynamicAvatar
            size="xl"
            name={data.name}
            src={data.avatar ? getR2ImageUrl(data.avatar.path) : null}
          />
          <CardTitle className="text-2xl">{data.name}</CardTitle>
          {details?.studentId && (
            <CardDescription>Student ID: {details.studentId}</CardDescription>
          )}
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {details ? (
            <>
              {details.bio && <p className="text-center">{details.bio}</p>}
              <Button
                icon={Contact}
                onClick={() =>
                  downloadVCard({
                    name: data.name,
                    phone: details.phone,
                    email: details.email,
                    urls: [facebook, linkedin].filter((u): u is string =>
                      Boolean(u),
                    ),
                    note: details.studentId
                      ? `IEM Alumni - ${details.studentId}`
                      : 'IEM Alumni',
                  })
                }
              >
                Add to contacts
              </Button>
              <Button
                icon={Phone}
                variant="outline"
                onClick={() => {
                  window.location.href = `tel:${details.phone}`;
                }}
              >
                {details.phone}
              </Button>
              <Button
                icon={Mail}
                variant="outline"
                onClick={() => {
                  window.location.href = `mailto:${details.email}`;
                }}
              >
                {details.email}
              </Button>
              {facebook && (
                <Button
                  icon={ExternalLink}
                  variant="outline"
                  onClick={() =>
                    window.open(facebook, '_blank', 'noopener,noreferrer')
                  }
                >
                  Facebook
                </Button>
              )}
              {linkedin && (
                <Button
                  icon={ExternalLink}
                  variant="outline"
                  onClick={() =>
                    window.open(linkedin, '_blank', 'noopener,noreferrer')
                  }
                >
                  LinkedIn
                </Button>
              )}
            </>
          ) : (
            <>
              <p className="text-center text-muted-foreground">
                {viewer
                  ? 'Details are unavailable.'
                  : 'Log in to see contact details and connect with this alumnus.'}
              </p>
              {!viewer && (
                <Link href={loginHref}>
                  <Button icon={LogIn} className="w-full">
                    Log in to view details
                  </Button>
                </Link>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </Container>
  );
}
