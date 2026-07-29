import { AppRoute } from '@/interfaces';
import { DateFormat, getDateFormatted } from '@/lib/date.util';
import Link from 'next/link';

type Props = {
  slug: string;
  title: string;
  description: string;
  imageUrl: string;
  location: string;
  startDate: Date;
  endDate: Date | null;
};

export default function EventCard({
  slug,
  title,
  description,
  imageUrl,
  location,
  startDate,
  endDate,
}: Props) {
  return (
    <Link href={`${AppRoute.EVENT}/${slug}`}>
      <div className='flex h-full flex-col rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800'>
        <img className='rounded-t-lg' src={imageUrl} alt='' />
        <div className='p-5'>
          <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
            {title}
          </h5>
          <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>
            {description}
          </p>
          <p className='mb-2 text-sm text-gray-500 dark:text-gray-400'>
            {location}
          </p>
          <p className='text-sm text-gray-500 dark:text-gray-400'>
            {getDateFormatted(startDate, DateFormat.DATETIME)}
            {endDate
              ? ` - ${getDateFormatted(endDate, DateFormat.DATETIME)}`
              : ''}
          </p>
        </div>
      </div>
    </Link>
  );
}
