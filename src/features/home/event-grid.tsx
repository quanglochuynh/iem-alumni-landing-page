import { Spinner } from '@/components/ui/spinner';
import type { TEventPreview } from '@/features/event/event.type';
import EventCard from '@/features/event/event-card';
import { getR2ImageUrl } from '@/lib/cloudflare.helper';

export default function EventGrid({
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
          href={`/home/event/${event.slug}`}
          rspvHref={`/home/event/${event.slug}`}
          registered={Boolean(event?.registrations)}
        />
      ))}
    </div>
  );
}
