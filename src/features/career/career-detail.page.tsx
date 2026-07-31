import Container from '@/components/common/container';
import SimpleBreadcrumb from '@/components/common/simple-breadcrumb';
import { TCareerDetailPreview } from '@/features/career/career.type';
import { getCommonTranslation } from '@/hooks';
import { getR2ImageUrl } from '@/lib/cloudflare.helper';
import { getVND } from '@/lib/currency.helper';
import { DateFormat, getDateFormatted } from '@/lib/date.util';
import { getCloudflareContext } from '@opennextjs/cloudflare';
import Image from 'next/image';
import { remark } from 'remark';
import html from 'remark-html';

async function fetchCareerDetail(slug: string) {
  const { env } = getCloudflareContext();
  const career: TCareerDetailPreview = await (
    env.ADMIN_SERVICE as any
  ).getCareerBySlug(slug);

  const processedContent = await remark().use(html).process(career.content);
  const contentHtml = processedContent.toString();

  return { ...career, contentHtml };
}

type Props = {
  locale: string;
  slug: string;
};

export default async function CareerDetailPage({ locale, slug }: Props) {
  const commonT = await getCommonTranslation(locale);
  const career = await fetchCareerDetail(slug);

  return (
    <Container>
      <SimpleBreadcrumb
        paths={[
          { name: commonT('Home'), href: '/' },
          { name: commonT('Careers'), href: '/careers' },
          { name: career.title, href: `/career/${career.slug}` },
        ]}
        className='mt-4'
      />
      <a href={`/career/${career.slug}`} className='no-underline'>
        <h1 className='my-4 text-4xl font-bold'>{career.title}</h1>
      </a>
      <div className='my-4 space-y-2 text-gray-500'>
        <p>{career.location}</p>
        <p>
          {commonT('Job type')}: {career.jobType}
        </p>
        <p>
          {commonT('Experience level')}: {career.experienceLevel}
        </p>
        {career.salary ? (
          <p>
            {commonT('Salary')}: {getVND(career.salary)}
          </p>
        ) : null}
        <p>{getDateFormatted(career.createdAt, DateFormat.DATETIME)}</p>
      </div>
      <p className='text-lg text-gray-600'>{career.description}</p>
      {career.thumbnail?.path ? (
        <Image
          className='my-4 rounded-lg'
          src={getR2ImageUrl(career.thumbnail.path)}
          alt=''
          width={800}
          height={400}
          priority
        />
      ) : null}
      <div
        className='md-content mb-16'
        dangerouslySetInnerHTML={{ __html: career.contentHtml }}
      />
    </Container>
  );
}
