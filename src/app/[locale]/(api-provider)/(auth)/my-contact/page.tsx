'use client';

import { Contact, Facebook, Linkedin, LogIn, Mail, Phone } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import Container from '@/components/common/container';
import DynamicAvatar from '@/components/common/overridden/avatar';
import Button from '@/components/common/overridden/button';
import SimpleBreadcrumb from '@/components/common/simple-breadcrumb';
import { authStore } from '@/components/providers/auth-provider/auth.store';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';
import {
  useContact,
  useRecordConnection,
} from '@/features/contact/contact.hook';
import { useCommonTranslation } from '@/hooks';
import { Link } from '@/i18n/navigation';
import { AppRoute } from '@/interfaces';
import { downloadVCard, getR2ImageUrl } from '@/lib';

function safeUrl(value?: string): { url: string; username: string } | null {
  if (!value) return null;
  try {
    const url = new URL(value.startsWith('http') ? value : `https://${value}`);
    if (url.protocol === 'https:' || url.protocol === 'http:') {
      return {
        url: url.toString(),
        username: url.pathname.split('/').filter(Boolean).pop() || '',
      };
    }
    return null;
  } catch {
    return null;
  }
}

export default function MyContactPage() {
  const t = useCommonTranslation();
  const code = useSearchParams().get('code');
  const viewer = authStore((s) => s.userSession);
  const { data, isLoading, isError } = useContact(code);
  const { mutate: recordConnection } = useRecordConnection();

  useEffect(() => {
    if (viewer && code && data) recordConnection(code);
  }, [viewer, code, data, recordConnection]);

  if (!code || isError) {
    return (
      <Container size="md" className="py-16 text-center">
        <h1 className="font-bold text-2xl">{t('Contact not found')}</h1>
        <p className="my-4 text-muted-foreground">{t('Invalid QR')}</p>
        <Link href={AppRoute.ROOT}>{t('Back to home')}</Link>
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
      <SimpleBreadcrumb
        paths={[
          { name: t('Home'), href: viewer ? AppRoute.HOME : AppRoute.ROOT },
          {
            name: t('My Contact'),
            href: `${AppRoute.MY_CONTACT}?code=${code}`,
          },
        ]}
      />
      <Card className="mt-4">
        <CardHeader className="flex flex-col items-center justify-center gap-4 text-center">
          <DynamicAvatar
            size="xl"
            name={data.name}
            src={data.avatar ? getR2ImageUrl(data.avatar.path) : null}
          />
          <CardTitle className="text-2xl">{data.name}</CardTitle>
          {details?.studentId && (
            <CardDescription>
              {t('Student ID', { id: details.studentId })}
            </CardDescription>
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
                    urls: [facebook, linkedin]
                      .filter((u): u is { url: string; username: string } =>
                        Boolean(u),
                      )
                      .map((u) => u.url),
                    note: details.studentId
                      ? `IEM Alumni - ${details.studentId}`
                      : 'IEM Alumni',
                  })
                }
              >
                {t('Add to contacts')}
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
                  icon={Facebook}
                  variant="outline"
                  onClick={() =>
                    window.open(facebook.url, '_blank', 'noopener,noreferrer')
                  }
                >
                  {facebook.username}
                </Button>
              )}
              {linkedin && (
                <Button
                  icon={Linkedin}
                  variant="outline"
                  onClick={() =>
                    window.open(linkedin.url, '_blank', 'noopener,noreferrer')
                  }
                >
                  {linkedin.username}
                </Button>
              )}
            </>
          ) : (
            <>
              <p className="text-center text-muted-foreground">
                {viewer ? t('Details unavailable') : t('Login to view contact')}
              </p>
              {!viewer && (
                <Link href={loginHref}>
                  <Button icon={LogIn} className="w-full">
                    {t('Log in to view details')}
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
