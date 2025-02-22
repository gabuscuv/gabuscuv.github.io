import {setRequestLocale} from 'next-intl/server';
import {Sections} from './_Components/Sections';

export async function generateStaticParams() {
  return ['en', 'es'].map(locale => ({locale}));
}

export default async function BlogLayout(
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

  return (
    <div>
      <p>
        Warning!, Data Migrated from my old blog, Formatting & review in
        progress
      </p>
      <div className="flex md:h-full">
        <Sections />
        {children}
      </div>
    </div>
  );
}
