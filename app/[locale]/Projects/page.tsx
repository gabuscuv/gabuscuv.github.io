import {unstable_setRequestLocale} from 'next-intl/server';
import ProjectBrowser from './components/ProjectBrowser';

//function to generate the routes for all the locales
export async function generateStaticParams() {
  return ['en', 'es'].map(locale => ({locale}));
}

// @ts-expect-error -- TypeScript will validate that only known `params`
// are used in combination with a given `pathname`. Since the two will
// always match for the current route, we can skip runtime checks.
export default function Project({params: locale}) {
  unstable_setRequestLocale(locale);

  return (
    <>
      <ProjectBrowser locale={locale} />
    </>
  );
}
