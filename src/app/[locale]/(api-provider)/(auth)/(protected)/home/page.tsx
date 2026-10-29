'use client';

import { LogOut, QrCode } from 'lucide-react';
import DynamicAvatar from '@/components/common/overridden/avatar';
import Button from '@/components/common/overridden/button';
import { authStore } from '@/components/providers/auth-provider/auth.store';
import { useLogout } from '@/components/providers/auth-provider/logout.hook';
import { useEnrolledEvents, useEvents } from '@/features/event/event.hook';
import EventGrid from '@/features/home/event-grid';
import QrModal from '@/features/home/qr-modal';
import { useDisclosure } from '@/hooks';
import { getR2ImageUrl } from '@/lib/cloudflare.helper';

export default function HomePage() {
  const { logout } = useLogout();
  const user = authStore((s) => s.userSession);
  const events = useEvents();
  const enrolled = useEnrolledEvents(!!user);
  const qrDisclosure = useDisclosure<{ href: string }>();

  return (
    <>
      <QrModal disclosure={qrDisclosure} />
      <div className="mx-auto max-w-7xl space-y-10 p-4">
        <header className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <DynamicAvatar
              size="xl"
              name={user?.name}
              src={user?.avatar ? getR2ImageUrl(user.avatar.path) : null}
            />
            <h1 className="font-bold text-2xl">Hello, {user?.name}</h1>
          </div>
          <div className="flex gap-2">
            <Button
              icon={QrCode}
              size={'icon-lg'}
              onClick={() =>
                qrDisclosure.open({ href: user?.clientCode || '' })
              }
            />
            <Button
              icon={LogOut}
              onClick={logout}
              size={'lg'}
              variant={'outline'}
            >
              Logout
            </Button>
          </div>
        </header>

        <section>
          <h2 className="mb-4 font-bold text-2xl">Your enrolled events</h2>
          <EventGrid
            events={enrolled.data}
            isLoading={enrolled.isLoading}
            isError={enrolled.isError}
          />
        </section>

        <section>
          <h2 className="mb-4 font-bold text-2xl">Events</h2>
          <EventGrid
            events={events.data}
            isLoading={events.isLoading}
            isError={events.isError}
          />
        </section>
      </div>
    </>
  );
}
