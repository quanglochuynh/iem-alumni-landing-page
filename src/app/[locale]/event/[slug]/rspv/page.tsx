import { getCloudflareContext } from '@opennextjs/cloudflare';
import { remark } from 'remark';
import html from 'remark-html';
import Container from '@/components/common/container';
import SimpleBreadcrumb from '@/components/common/simple-breadcrumb';
import type { TEventDetailPreview } from '@/features/event/event.type';
import RSVPForm from '@/features/event/rsvp-form';
import { getCommonTranslation } from '@/hooks';

async function fetchEventDetail(slug: string) {
  const { env } = getCloudflareContext();
  const event: TEventDetailPreview = await (
    env.ADMIN_SERVICE as any
  ).getEventBySlug(slug);

  const processedContent = await remark().use(html).process(event.content);
  const contentHtml = processedContent.toString();

  return { ...event, contentHtml };
}

export default async function RSVPPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const event = await fetchEventDetail(slug);
  const commonT = await getCommonTranslation(locale);

  return (
    <Container>
      <SimpleBreadcrumb
        paths={[
          { name: commonT('Home'), href: '/' },
          { name: commonT('Events'), href: '/events' },
          { name: event.title, href: `/event/${event.slug}` },
          { name: commonT('RSVP'), href: `/event/${event.slug}/rspv` },
        ]}
        className="mt-4"
      />
      <h1 className="my-4 font-bold text-4xl">{commonT('RSVP')}</h1>
      <p className="mb-6 text-gray-600 text-lg">{event.title}</p>
      <RSVPForm eventId={event.id} />
    </Container>
  );
}
