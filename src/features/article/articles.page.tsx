import Container from '@/components/common/container';
import { TArticlePreview } from '@/features/article/article.type';
import { getCloudflareContext } from '@opennextjs/cloudflare';

async function fetchArticles() {
  const { env } = getCloudflareContext();
  const articles: TArticlePreview[] = (env.ADMIN_SERVICE as any).getArticles(
    {}
  );
  return articles;
}

export default async function ArticlesPage() {
  const Articles = await fetchArticles();
  return (
    <Container>
      {Articles.map((blog) => (
        <div key={blog.id}>
          <h2>{blog.title}</h2>
          <p>{blog.description}</p>
        </div>
      ))}
    </Container>
  );
}
