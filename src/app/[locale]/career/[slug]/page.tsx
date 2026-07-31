import CareerDetailPage from '@/features/career/career-detail.page';
import './md.scss';

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  return <CareerDetailPage locale={locale} slug={slug} />;
}
