import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { AppRoute } from '@/interfaces';
import { DateFormat, getDateFormatted } from '@/lib/date.util';
import { Ticket } from 'lucide-react';
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
    <Card className='pt-0'>
      <Link href={`${AppRoute.EVENT}/${slug}`}>
        <img className='rounded-t-xl' src={imageUrl} alt='' />
        <CardContent className='p-5'>
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
        </CardContent>
      </Link>

        <CardFooter>
          <Link href={`${AppRoute.EVENT}/${slug}/rspv`}>
            <Button>
              <Ticket className='size-4' />
              RSVP
            </Button>
          </Link>
        </CardFooter>

    </Card>
  );
}
