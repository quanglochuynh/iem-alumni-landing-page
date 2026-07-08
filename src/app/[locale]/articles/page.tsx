import BlogsPage from '@/features/article/articles.page';
import { ILocaleParams } from '@/interfaces';

export default async function BlogPage(props: ILocaleParams) {
  const params = await props.params;
  const { locale } = params;
  return <BlogsPage locale={locale} />;
}
