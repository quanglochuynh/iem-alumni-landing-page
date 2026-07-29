import Container from '@/components/common/container';
import SimpleBreadcrumb from '@/components/common/simple-breadcrumb';
import { TEventDetailPreview } from '@/features/event/event.type';
import { getCommonTranslation } from '@/hooks';
import { getR2ImageUrl } from '@/lib/cloudflare.helper';
import { DateFormat, getDateFormatted } from '@/lib/date.util';
import { getCloudflareContext } from '@opennextjs/cloudflare';
import Image from 'next/image';
import { remark } from 'remark';
import html from 'remark-html';

async function fetchEventDetail(slug: string) {
  const { env } = getCloudflareContext();
  const event: TEventDetailPreview = await (
    env.ADMIN_SERVICE as any
  ).getEventBySlug(slug);

  const processedContent = await remark().use(html).process(event.content);
  const contentHtml = processedContent.toString();

  return { ...event, contentHtml };
}

type Props = {
  locale: string;
  slug: string;
};

export default async function EventDetailPage({ locale, slug }: Props) {
  const commonT = await getCommonTranslation(locale);
  const event = await fetchEventDetail(slug);

  return (
    <Container>
      <SimpleBreadcrumb
        paths={[
          { name: commonT('Home'), href: '/' },
          { name: commonT('Events'), href: '/events' },
          { name: event.title, href: `/event/${event.slug}` },
        ]}
        className='mt-4'
      />
      <a href={`/event/${event.slug}`} className='no-underline'>
        <h1 className='my-4 text-4xl font-bold'>{event.title}</h1>
      </a>
      <div className='my-4 space-y-2 text-gray-500'>
        <p>{event.location}</p>
        <p>
          {getDateFormatted(event.startDate, DateFormat.DATETIME)}
          {event.endDate
            ? ` - ${getDateFormatted(event.endDate, DateFormat.DATETIME)}`
            : ''}
        </p>
      </div>
      <p className='text-lg text-gray-600'>{event.description}</p>
      {event.thumbnail?.path ? (
        <Image
          className='my-4 rounded-lg'
          src={getR2ImageUrl(event.thumbnail.path)}
          alt=''
          width={800}
          height={400}
        />
      ) : null}
      <div
        className='md-content mb-16'
        dangerouslySetInnerHTML={{ __html: event.contentHtml }}
      />
    </Container>
  );
}
