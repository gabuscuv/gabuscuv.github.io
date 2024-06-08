import {unstable_setRequestLocale} from 'next-intl/server';
import ProjectBrowser from './components/ProjectBrowser';

//function to generate the routes for all the locales
export async function generateStaticParams() {
  return ['en', 'es'].map(locale => ({locale}));
}

//@ts-expect-error
export default function Project({params: locale}) {
  unstable_setRequestLocale(locale);

  return (
    <>
      <ProjectBrowser locale={locale} />
    </>
  );
}
