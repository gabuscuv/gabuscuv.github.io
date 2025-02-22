import {getMessages, setRequestLocale} from 'next-intl/server';
import {ResumeBuilder} from './ResumeBuilder';
import {ResumeContent} from '@/src/data/Resume';
import {NextIntlClientProvider} from 'next-intl';
import {pick} from 'lodash';

//function to generate the routes for all the locales
export async function generateStaticParams() {
  return ['en', 'es'].map(locale => ({locale}));
}

// @ts-expect-error -- TypeScript will validate that only known `params`
// are used in combination with a given `pathname`. Since the two will
// always match for the current route, we can skip runtime checks.
export default async function Resume(props): Awaited<ReactNode> {
  const params = await props.params;

  const {locale} = params;

  setRequestLocale(locale);
  const messages = await getMessages(locale);

  const resume = await ResumeContent();

  return (
    <>
      {/* eslint:ignore */}
      <NextIntlClientProvider
        messages={
          // … and provide the relevant messages
          pick(messages, ['Resume', 'CommonWords'])
        }
      >
        <ResumeBuilder locale={locale} resume={resume} />
      </NextIntlClientProvider>
    </>
  );
}
