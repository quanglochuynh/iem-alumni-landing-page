import Container from '@/components/common/container';
import Empty from '@/components/common/empty';
import SimpleBreadcrumb from '@/components/common/simple-breadcrumb';
import CareerCard from '@/features/career/career-card';
import { TCareerPreview } from '@/features/career/career.type';
import { getCommonTranslation, getErrorTranslation } from '@/hooks';
import { getR2ImageUrl } from '@/lib/cloudflare.helper';
import { getCloudflareContext } from '@opennextjs/cloudflare';

async function fetchCareers() {
  const { env } = getCloudflareContext();
  const careers: TCareerPreview[] = await (env.ADMIN_SERVICE as any).getCareers(
    {}
  );
  return careers;
}

export default async function CareersPage(props: { locale: string }) {
  const { locale } = props;
  const commonT = await getCommonTranslation(locale);

  try {
    const careers = await fetchCareers();

    return (
      <Container size='max'>
        <SimpleBreadcrumb
          paths={[
            { name: commonT('Home'), href: '/' },
            { name: commonT('Careers'), href: '/careers' },
          ]}
          className='mt-4'
        />
        <h1 className='my-4 text-4xl font-black'>{commonT('Careers')}</h1>

        {careers.length === 0 && <Empty />}
        <div className='grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
          {careers.map((career) => (
            <CareerCard
              key={career.id}
              slug={career.slug}
              title={career.title}
              description={career.description}
              imageUrl={getR2ImageUrl(career.thumbnail?.path || '')}
              location={career.location}
              jobType={career.jobType}
              experienceLevel={career.experienceLevel}
              salary={career.salary}
              createdAt={career.createdAt}
              salaryLabel={commonT('Salary')}
            />
          ))}
        </div>
      </Container>
    );
  } catch {
    const errorT = await getErrorTranslation(locale);
    return (
      <Container size='max'>
        <SimpleBreadcrumb
          paths={[
            { name: commonT('Home'), href: '/' },
            { name: commonT('Careers'), href: '/careers' },
          ]}
          className='mt-4'
        />
        <h1 className='my-4 text-4xl font-black'>{commonT('Careers')}</h1>
        <p className='text-lg text-gray-600'>
          {errorT('Failed to load careers')}
        </p>
      </Container>
    );
  }
}
