import Container from '@/components/common/container';
import SimpleBreadcrumb from '@/components/common/simple-breadcrumb';
import ArticleCard from '@/features/article/article-card';
import { TArticlePreview } from '@/features/article/article.type';
import { getCommonTranslation } from '@/hooks';
import { getR2ImageUrl } from '@/lib/cloudflare.helper';
import { getCloudflareContext } from '@opennextjs/cloudflare';

async function fetchArticles() {
  const { env } = getCloudflareContext();
  const articles: TArticlePreview[] = (env.ADMIN_SERVICE as any).getArticles(
    {}
  );
  return articles;
}

export default async function ArticlesPage(props: { locale: string }) {
  const { locale } = props;
  const commonT = await getCommonTranslation(locale);
  const articles = await fetchArticles();

  return (
    <Container size='max'>
      <SimpleBreadcrumb
        paths={[
          { name: commonT('Home'), href: '/' },
          { name: commonT('Blogs'), href: '/blogs' },
        ]}
        className='mt-4'
      />
      <h1 className='my-4 text-4xl font-black'>{commonT('Blogs')}</h1>
      <div className='grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {articles.map((blog) => (
          <ArticleCard
            key={blog.id}
            slug={blog.slug}
            title={blog.title}
            description={blog.description}
            imageUrl={getR2ImageUrl(blog.thumbnail.path)}
            createdAt={blog.createdAt}
            author={{
              name: blog.author.name,
              avatarUrl: blog.author?.avatar
                ? getR2ImageUrl(blog.author.avatar.path)
                : '',
            }}
          />
        ))}
      </div>
    </Container>
  );
}
