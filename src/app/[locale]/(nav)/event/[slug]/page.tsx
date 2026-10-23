import EventDetailPage from '@/features/event/event-detail.page';
import './md.scss';

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  return <EventDetailPage locale={locale} slug={slug} />;
}
