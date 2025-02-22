import {setRequestLocale} from 'next-intl/server';
import {EntryEnumeratorComponent} from '../_Components/EntryEnumerator';
import {getAllPages} from '@/src/lib/api';

export default async function NotesLayout(
  props: Readonly<{
    children: React.ReactNode;
    // @ts-expect-error -- TypeScript will validate that only known `params`
    // are used in combination with a given `pathname`. Since the two will
    // always match for the current route, we can skip runtime checks.
    params;
  }>
) {
  const params = await props.params;

  const {locale} = params;

  const {children} = props;

  setRequestLocale(locale);
  const allPosts = await getAllPages();
  return (
    <div className="md:flex">
      <div className="flex md:h-full">
        <EntryEnumeratorComponent
          prefix={'/Others/Notes/'}
          element={allPosts.map(e => ({title: e.title, src: e.slug}))}
        />
      </div>
      {children}
    </div>
  );
}
