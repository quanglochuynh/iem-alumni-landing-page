'use client';

import DynamicAvatar from '@/components/common/overridden/avatar';
import { authStore } from '@/components/providers/auth-provider/auth.store';
import { useLogout } from '@/components/providers/auth-provider/logout.hook';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { useEnrolledEvents, useEvents } from '@/features/event/event.hook';
import type { TEventPreview } from '@/features/event/event.type';
import EventCard from '@/features/event/event-card';
import { getR2ImageUrl } from '@/lib/cloudflare.helper';

function EventGrid({
  events,
  isLoading,
  isError,
}: {
  events?: TEventPreview[];
  isLoading: boolean;
  isError: boolean;
}) {
  if (isLoading) return <Spinner />;
  if (isError)
    return <p className="text-muted-foreground">Failed to load events.</p>;
  if (!events?.length)
    return <p className="text-muted-foreground">No events.</p>;
  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {events.map((event) => (
        <EventCard
          key={event.id}
          slug={event.slug}
          title={event.title}
          description={event.description}
          imageUrl={getR2ImageUrl(event.thumbnail?.path || '')}
          location={event.location}
          startDate={event.startDate}
          endDate={event.endDate}
        />
      ))}
    </div>
  );
}

export default function HomePage() {
  const { logout } = useLogout();
  const user = authStore((s) => s.userSession);
  const events = useEvents();
  const enrolled = useEnrolledEvents(!!user);

  return (
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
        <Button onClick={logout}>Logout</Button>
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
  );
}
