'use client';

import { LogOut, QrCode, ScanQrCode } from 'lucide-react';
import { useLocale } from 'next-intl';
import Container from '@/components/common/container';
import DynamicAvatar from '@/components/common/overridden/avatar';
import Button from '@/components/common/overridden/button';
import SimpleBreadcrumb from '@/components/common/simple-breadcrumb';
import { authStore } from '@/components/providers/auth-provider/auth.store';
import { useLogout } from '@/components/providers/auth-provider/logout.hook';
import { useEvents } from '@/features/event/event.hook';
import EventGrid from '@/features/home/event-grid';
import QrModal from '@/features/home/qr-modal';
import ScanHistory from '@/features/home/scan-history';
import ScanQrModal from '@/features/home/scan-qr-modal';
import UpdateInfoModal from '@/features/home/update-info-modal';
import UserDetailsCard from '@/features/home/user-details-card';
import { useCommonTranslation, useDisclosure } from '@/hooks';
import { useRouter } from '@/i18n/navigation';
import { AppRoute } from '@/interfaces';
import { getR2ImageUrl } from '@/lib/cloudflare.helper';

export default function HomePage() {
  const { logout } = useLogout();
  const router = useRouter();
  const t = useCommonTranslation();
  const locale = useLocale();
  const user = authStore((s) => s.userSession);
  const events = useEvents(false);
  const qrDisclosure = useDisclosure<{ href: string }>();
  const scanDisclosure = useDisclosure();
  const profileDisclosure = useDisclosure();

  const userAvatarURL = user?.avatar
    ? getR2ImageUrl(user.avatar.path)
    : (user?.googleAvatarURL ?? null);

  return (
    <>
      <QrModal disclosure={qrDisclosure} />
      <ScanQrModal
        disclosure={scanDisclosure}
        onScan={(code) => {
          scanDisclosure.close();
          router.push(
            `${AppRoute.MY_CONTACT}?code=${encodeURIComponent(code)}`,
          );
        }}
      />
      <UpdateInfoModal disclosure={profileDisclosure} />
      <Container size="2xl" className="pb-16">
        <SimpleBreadcrumb
          className="my-8"
          paths={[
            { name: 'IEM Alumni Landing page', href: '/' },
            {
              name: t('Home'),
              href: '/home',
            },
          ]}
        />
        <header className="flex items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4">
            <DynamicAvatar size="2xl" name={user?.name} src={userAvatarURL} />
            <div>
              <h1 className="font-bold text-2xl">
                {t('Hello', { name: user?.name ?? '' })}
              </h1>
              <div className="flex flex-wrap gap-2">
                <Button
                  icon={QrCode}
                  className="mt-2"
                  onClick={() =>
                    qrDisclosure.open({
                      href: `${window.location.origin}/${locale}${AppRoute.MY_CONTACT}?code=${user?.clientCode ?? ''}`,
                    })
                  }
                >
                  {t('My QR')}
                </Button>
                <Button
                  icon={ScanQrCode}
                  className="mt-2"
                  variant={'secondary'}
                  onClick={() => scanDisclosure.open()}
                >
                  {t('Scan QR')}
                </Button>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button icon={LogOut} onClick={logout} variant={'outline'}>
              <span className="hidden md:inline">{t('Logout')}</span>
            </Button>
          </div>
        </header>

        <section className="my-8">
          <h2 className="my-4 font-bold text-2xl">{t('My Details')}</h2>
          <UserDetailsCard onEdit={profileDisclosure.open} />
        </section>

        <section className="mb-8">
          <h2 className="my-4 font-bold text-2xl">{t('Scan History')}</h2>
          <ScanHistory />
        </section>

        <section>
          <h2 className="my-4 font-bold text-2xl">{t('Events')}</h2>
          <EventGrid
            events={events.data}
            isLoading={events.isLoading}
            isError={events.isError}
          />
        </section>
      </Container>
    </>
  );
}
