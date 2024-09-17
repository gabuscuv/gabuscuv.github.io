import {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {getAllPages, getPageBySlug} from '@/src/lib/api';
import markdownToHtml from '@/src/lib/markdownToHtml';

export default async function Post({params}: Params) {
  const post = await getPageBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  const content = await markdownToHtml(post.content || '');

  return (
    <main className="max-h-screen m-5 overflow-x-scroll">
      <article dangerouslySetInnerHTML={{__html: content}} />
    </main>
  );
}

type Params = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({params}: Params): Promise<Metadata> {
  const post = await getPageBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  const title = `${post.title}`;

  return {
    title,
  };
}

export async function generateStaticParams() {
  const posts = await getAllPages();

  return posts.map(post => ({
    slug: post.slug,
  }));
}
