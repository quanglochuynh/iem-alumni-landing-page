import EventsPage from '@/features/event/events.page';

export default async function Page(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  return <EventsPage locale={locale} />;
}
