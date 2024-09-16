import {unstable_setRequestLocale} from 'next-intl/server';
import {EntryEnumeratorComponent} from '../_Components/EntryEnumerator';
import {getAllPosts} from '@/src/lib/api';

export default async function BlogLayout({
  children,
  params: {locale},
}: Readonly<{
  children: React.ReactNode;
  params: {locale: string};
}>) {
  unstable_setRequestLocale(locale);
  const allPosts = await getAllPosts();
  return (
    <div className="md:flex">
      <div className="flex md:h-full">
        <EntryEnumeratorComponent
          prefix={'/Others/Blog/'}
          element={allPosts.map(e => ({title: e.title, src: e.slug}))}
        />
      </div>
      {children}
    </div>
  );
}
