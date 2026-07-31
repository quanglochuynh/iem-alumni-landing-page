import CareersPage from '@/features/career/careers.page';

export default async function Page(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  return <CareersPage locale={locale} />;
}
