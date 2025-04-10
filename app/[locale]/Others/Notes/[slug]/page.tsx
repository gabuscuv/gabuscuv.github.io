import {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {getAllPages, getPageBySlug} from '@/src/lib/api';
import markdownToHtml from '@/src/lib/markdownToHtml';

export default async function Post(props: Params) {
  const params = await props.params;
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
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata(props: Params): Promise<Metadata> {
  const params = await props.params;
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
