import { Card, CardContent } from '@/components/ui/card';
import { AppRoute } from '@/interfaces';
import { DateFormat, getDateFormatted } from '@/lib/date.util';
import Link from 'next/link';

type Props = {
  slug: string;
  title: string;
  description: string;
  imageUrl: string;
  location: string;
  jobType: string;
  experienceLevel: string;
  salary: string | null;
  createdAt: Date;
  salaryLabel: string;
};

export default function CareerCard({
  slug,
  title,
  description,
  imageUrl,
  location,
  jobType,
  experienceLevel,
  salary,
  createdAt,
  salaryLabel,
}: Props) {
  console.log(imageUrl);

  return (
    <Card className='pt-0'>
      <Link href={`${AppRoute.CAREER}/${slug}`}>
        <img className='rounded-t-xl' src={imageUrl} alt='' />
        <CardContent className='p-5'>
          <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
            {title}
          </h5>
          <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>
            {description}
          </p>
          <p className='mb-1 text-sm text-gray-500 dark:text-gray-400'>
            {location}
          </p>
          <p className='mb-1 text-sm text-gray-500 dark:text-gray-400'>
            {jobType} | {experienceLevel}
          </p>
          {salary ? (
            <p className='mb-1 text-sm text-gray-500 dark:text-gray-400'>
              {salaryLabel}: {salary}
            </p>
          ) : null}
          <p className='text-sm text-gray-500 dark:text-gray-400'>
            {getDateFormatted(createdAt, DateFormat.DATETIME)}
          </p>
        </CardContent>
      </Link>
    </Card>
  );
}
