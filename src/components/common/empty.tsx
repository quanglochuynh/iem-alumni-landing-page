import { PackageOpen } from 'lucide-react';

export default function Empty() {
  return (
    <div className='flex flex-col items-center justify-center py-12'>
      <PackageOpen
        strokeWidth='1.5'
        className='mx-auto mb-4 size-24 text-gray-400'
      />
      <p className='text-center text-sm text-gray-500'>
        No data available at the moment. Please check back later.
      </p>
    </div>
  );
}
