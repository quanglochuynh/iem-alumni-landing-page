import BlogsPage from '@/features/article/articles.page';

export default async function BlogPage(props: {
  params: Promise<{ locale: string }>;
}) {
  const params = await props.params;
  const { locale } = params;
  return <BlogsPage locale={locale} />;
}
