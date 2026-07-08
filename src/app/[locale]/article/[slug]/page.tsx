import ArticleDetailPage from '@/features/article/article-detail.page';
import { ILocaleParams } from '@/interfaces';
import './md.scss';

export default async function Page({
  params,
}: ILocaleParams<{ slug: string }>) {
  const { locale, slug } = await params;
  return <ArticleDetailPage locale={locale} slug={slug} />;
}
