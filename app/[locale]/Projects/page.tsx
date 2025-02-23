import {getMessages, setRequestLocale} from 'next-intl/server';
import ProjectBrowser from './components/ProjectBrowser';
import {NextIntlClientProvider} from 'next-intl';
import {pick} from 'lodash';

import {GetterProjects} from '@/src/middleware/Getter';

// @ts-expect-error -- TypeScript will validate that only known `params`
// are used in combination with a given `pathname`. Since the two will
// always match for the current route, we can skip runtime checks.
export default async function Project(props): Awaited<ReactNode> {
  const locale = await props.params;
  setRequestLocale(locale);
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
