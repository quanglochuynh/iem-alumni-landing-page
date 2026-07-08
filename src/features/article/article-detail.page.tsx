import Container from '@/components/common/container';
import SimpleBreadcrumb from '@/components/common/simple-breadcrumb';
import { TArticleDetailPreview } from '@/features/article/article.type';
import { getCommonTranslation } from '@/hooks';
import { getR2ImageUrl } from '@/lib/cloudflare.helper';
import { DateFormat, getDateFormatted } from '@/lib/date.util';
import { getCloudflareContext } from '@opennextjs/cloudflare';
import { remark } from 'remark';
import html from 'remark-html';

async function fetchArticleDetail(slug: string) {
  const { env } = getCloudflareContext();
  const article: TArticleDetailPreview = (
    env.ADMIN_SERVICE as any
  ).getArticleBySlug(slug);

  const processedContent = await remark().use(html).process(article.content);
  const contentHtml = processedContent.toString();

  return { ...article, contentHtml };
}

type Props = {
  locale: string;
  slug: string;
};

export default async function ArticleDetailPage({ locale, slug }: Props) {
  const commonT = await getCommonTranslation(locale);
  const article = await fetchArticleDetail(slug);

  return (
    <Container>
      <SimpleBreadcrumb
        paths={[
          { name: commonT('Home'), href: '/' },
          { name: commonT('Blogs'), href: '/articles' },
          { name: article.title, href: `/article/${article.slug}` },
        ]}
        className='mt-4'
      />
      <a href={`/article/${article.slug}`} className='no-underline'>
        <h1 className='my-4 text-4xl font-bold'>{article.title}</h1>
      </a>
      <div className='my-4 flex items-center space-x-4 text-gray-500'>
        <span>{getDateFormatted(article.createdAt, DateFormat.DATETIME)}</span>
        <div className='ms-auto flex items-center space-x-2'>
          <img
            className='h-10 w-10 rounded-full'
            src={getR2ImageUrl(article.author.avatar?.path || '')}
            alt={article.author.name}
          />
          <span>{article.author.name}</span>
        </div>
      </div>
      <p className='text-lg text-gray-600'>{article.description}</p>
      <img
        className='my-4 rounded-lg'
        src={getR2ImageUrl(article.thumbnail.path)}
        alt=''
      />
      <div
        className='md-content mb-16'
        dangerouslySetInnerHTML={{ __html: article.contentHtml }}
      />
    </Container>
  );
}
