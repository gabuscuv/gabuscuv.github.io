import {getMessages, unstable_setRequestLocale} from 'next-intl/server';
import ProjectBrowser from './components/ProjectBrowser';
import {NextIntlClientProvider} from 'next-intl';
import {pick} from 'lodash';
import {ReactNode} from 'react';
import {GetterProjects} from '@/src/middleware/Getter';

//function to generate the routes for all the locales
export async function generateStaticParams() {
  return ['en', 'es'].map(locale => ({locale}));
}

// @ts-expect-error -- TypeScript will validate that only known `params`
// are used in combination with a given `pathname`. Since the two will
// always match for the current route, we can skip runtime checks.
export default async function Project({params: locale}): ReactNode {
  unstable_setRequestLocale(locale);
  const messages = await getMessages(locale);

  return (
    <NextIntlClientProvider
      messages={
        // … and provide the relevant messages
        pick(messages, 'Projects')
      }
    >
      <ProjectBrowser locale={locale} projects={await GetterProjects()} />
    </NextIntlClientProvider>
  );
}
