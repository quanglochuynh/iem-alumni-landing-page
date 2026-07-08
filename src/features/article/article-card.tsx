import { DateFormat, getDateFormatted } from '@/lib/date.util';

type Props = {
  title: string;
  description: string;
  imageUrl: string;
  createdAt: Date;
  author: {
    name: string;
    avatarUrl: string;
  };
};

export default function ArticleCard({
  author,
  title,
  description,
  imageUrl,
  createdAt,
}: Props) {
  return (
    <div className='flex flex-col rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800'>
      <img className='rounded-t-lg' src={imageUrl} alt='' />
      <div className='p-5'>
        <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
          {title}
        </h5>
        <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>
          {description}
        </p>
        <div className='flex items-center space-x-4'>
          <img
            className='h-10 w-10 rounded-full'
            src={author.avatarUrl}
            alt=''
          />
          <div className='space-y-1 font-medium dark:text-white'>
            <p>{author.name}</p>
            <p className='text-sm text-gray-500 dark:text-gray-400'>
              {getDateFormatted(createdAt, DateFormat.DATETIME)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
