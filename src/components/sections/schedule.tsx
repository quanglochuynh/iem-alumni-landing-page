import { FocusCards } from '@/components/ui/focus-cards';
import { useInfoTranslation } from '@/hooks';

export function Schedule() {
  const infoTrans = useInfoTranslation();
  const items = [0, 1, 2, 3].map((index) => ({
    time: infoTrans(`SCHEDULE.items.${index}.time`),
    title: infoTrans(`SCHEDULE.items.${index}.title`),
    activity: infoTrans(`SCHEDULE.items.${index}.activity`)
      .split('|')
      .map((line, idx) => <li key={idx}>- {line}</li>),
  }));
  return (
    <div className='container'>
      <section id='schedule' className='mt-8'>
        <h2 className='mb-12 text-center text-3xl font-bold'>
          {infoTrans('SCHEDULE.heading')}
        </h2>
        <div className='grid gap-10 md:grid-cols-2'></div>
        <FocusCards
          cards={items.map((item, idx) => ({
            children: (
              <ScheduleItem
                key={idx}
                time={item.time}
                title={item.title}
                activities={item.activity}
              />
            ),
          }))}
        />
      </section>
    </div>
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
    <div className='space-y-2 p-4'>
      <h5 className='text-primary text-sm font-semibold'>{time}</h5>
      <h3 className='text-xl font-semibold'>{title}</h3>
      {activities && <ul className='text-primary/80 text-sm'>{activities}</ul>}
    </div>
  );
}
