import {unstable_setRequestLocale} from 'next-intl/server';
import {EntryEnumeratorComponent} from '../_Components/EntryEnumerator';
import {getAllPages} from '@/src/lib/api';

export default async function NotesLayout({
  children,
  params: {locale},
}: Readonly<{
  children: React.ReactNode;
  params: {locale: string};
}>) {
  unstable_setRequestLocale(locale);
  const allPosts = await getAllPages();
  return (
    <div className="flex">
      <EntryEnumeratorComponent
        prefix={'/Others/Notes/'}
        element={allPosts.map(e => ({title: e.title, src: e.slug}))}
      />
      {children}
    </div>
  );
}
