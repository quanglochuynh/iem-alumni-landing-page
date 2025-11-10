import { SCHEDULE, SCHEDULE_INTRO } from "@/constants/content";

export function Schedule() {
  return (
    <section
      id="schedule"
      className="container py-16 md:py-24 bg-secondary/30 rounded-xl mt-8"
    >
      <div className="max-w-3xl mb-10">
        <h2 className="text-3xl font-bold mb-4">{SCHEDULE_INTRO.heading}</h2>
        <p className="text-muted-foreground leading-relaxed">
          {SCHEDULE_INTRO.description}
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-10">
        <div className="space-y-8">
          {SCHEDULE.slice(0, 4).map((item) => (
            <ScheduleItem key={item.time} {...item} />
          ))}
        </div>
        <div className="space-y-8">
          {SCHEDULE.slice(4).map((item) => (
            <ScheduleItem key={item.time} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ScheduleItem({
  time,
  title,
  speaker,
}: {
  time: string;
  title: string;
  speaker?: string;
}) {
  return (
    <div className="space-y-1">
      <h5 className="text-sm font-semibold text-primary/80">{time}</h5>
      <h3 className="text-xl font-semibold">{title}</h3>
      {speaker && (
        <h5 className="text-sm text-muted-foreground">Speaker: {speaker}</h5>
      )}
    </div>
  );
}
