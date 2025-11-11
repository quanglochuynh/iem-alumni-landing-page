import { useInfoTranslation } from '@/hooks';

export function Schedule() {
  const infoTrans = useInfoTranslation();
  const items = [0, 1, 2, 3].map((index) => ({
    time: infoTrans(`SCHEDULE.items.${index}.time`),
    title: infoTrans(`SCHEDULE.items.${index}.title`),
    activity: infoTrans.rich(`SCHEDULE.items.${index}.activity`, {
      Fotopop: (chunks) => (
        <a
          href='https://www.facebook.com/fotopopstudiosaigon'
          target='_blank'
          rel='noreferrer'
          className='font-bold text-black'
        >
          {chunks}
        </a>
      ),
    }),
  }));
  return (
    <section
      id='schedule'
      className='bg-secondary/30 container mt-8 rounded-xl py-16 md:py-24'
    >
      <div className='mb-10 max-w-3xl'>
        <h2 className='mb-4 text-3xl font-bold'>
          {infoTrans('SCHEDULE.heading')}
        </h2>
      </div>
      <div className='grid gap-10 md:grid-cols-2'>
        {items.map((item, idx) => (
          <ScheduleItem
            key={idx}
            time={item.time}
            title={item.title}
            activities={item.activity}
          />
        ))}
      </div>
    </section>
  );
}

function ScheduleItem({
  time,
  title,
  activities,
}: {
  time: string;
  title: string;
  activities?: React.ReactNode;
}) {
  return (
    <div className='space-y-1'>
      <h5 className='text-primary/80 text-sm font-semibold'>{time}</h5>
      <h3 className='text-xl font-semibold'>{title}</h3>
      {/* {activities &&
        activities.split('|').map((activity, index) => (
          <h5 key={index} className='text-muted-foreground text-sm'>
            - {activity.trim()}
          </h5>
        ))} */}
      {activities && (
        <div className='text-muted-foreground text-sm'>{activities}</div>
      )}
    </div>
  );
}
