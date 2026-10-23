import ArticleDetailPage from '@/features/article/article-detail.page';
import './md.scss';

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  return <ArticleDetailPage locale={locale} slug={slug} />;
}
