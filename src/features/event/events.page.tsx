import Container from '@/components/common/container';
import Empty from '@/components/common/empty';
import SimpleBreadcrumb from '@/components/common/simple-breadcrumb';
import EventCard from '@/features/event/event-card';
import { TEventPreview } from '@/features/event/event.type';
import { getCommonTranslation, getErrorTranslation } from '@/hooks';
import { getR2ImageUrl } from '@/lib/cloudflare.helper';
import { getCloudflareContext } from '@opennextjs/cloudflare';

async function fetchEvents() {
  const { env } = getCloudflareContext();
  const events: TEventPreview[] = await (env.ADMIN_SERVICE as any).getEvents(
    {}
  );
  return events;
}

function splitEvents(events: TEventPreview[]) {
  const now = Date.now();

  const upcoming = events
    .filter((event) => {
      const pivot = event.endDate
        ? new Date(event.endDate).getTime()
        : new Date(event.startDate).getTime();
      return pivot >= now;
    })
    .sort((a, b) => +new Date(a.startDate) - +new Date(b.startDate));

  const happened = events
    .filter((event) => {
      const pivot = event.endDate
        ? new Date(event.endDate).getTime()
        : new Date(event.startDate).getTime();
      return pivot < now;
    })
    .sort((a, b) => +new Date(b.startDate) - +new Date(a.startDate));

  return { upcoming, happened };
}

export default async function EventsPage(props: { locale: string }) {
  const { locale } = props;
  const commonT = await getCommonTranslation(locale);

  try {
    const events = await fetchEvents();

    const { upcoming, happened } = splitEvents(events);

    return (
      <Container size='max'>
        <SimpleBreadcrumb
          paths={[
            { name: commonT('Home'), href: '/' },
            { name: commonT('Events'), href: '/events' },
          ]}
          className='mt-4'
        />
        <h1 className='my-4 text-4xl font-black'>{commonT('Events')}</h1>

        <section className='mb-10'>
          <h2 className='mb-4 text-2xl font-bold'>
            {commonT('Upcoming events')}
          </h2>
          {upcoming.length === 0 && <Empty />}
          <div className='grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
            {upcoming.map((event) => (
              <EventCard
                key={event.id}
                slug={event.slug}
                title={event.title}
                description={event.description}
                imageUrl={getR2ImageUrl(event.thumbnail?.path || '')}
                location={event.location}
                startDate={event.startDate}
                endDate={event.endDate}
                rsvpPath={'/'}
              />
            ))}
          </div>
        </section>

        <section className='mb-10'>
          <h2 className='mb-4 text-2xl font-bold'>
            {commonT('Happened events')}
          </h2>
          {happened.length === 0 && <Empty />}
          <div className='grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
            {happened.map((event) => (
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
        </section>
      </Container>
    );
  } catch {
    const errorT = await getErrorTranslation(locale);
    return (
      <Container size='max'>
        <SimpleBreadcrumb
          paths={[
            { name: commonT('Home'), href: '/' },
            { name: commonT('Events'), href: '/events' },
          ]}
          className='mt-4'
        />
        <h1 className='my-4 text-4xl font-black'>{commonT('Events')}</h1>
        <p className='text-lg text-gray-600'>
          {errorT('Failed to load events')}
        </p>
      </Container>
    );
  }
}
