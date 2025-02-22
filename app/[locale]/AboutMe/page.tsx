import {getMessages, setRequestLocale} from 'next-intl/server';
import {ReactNode} from 'react';
import {AboutMeComponent} from './AboutMeComponent';
import {NextIntlClientProvider} from 'next-intl';
import {pick} from 'lodash';

//function to generate the routes for all the locales
export async function generateStaticParams() {
  return ['en', 'es'].map(locale => ({locale}));
}
// @ts-expect-error -- TypeScript will validate that only known `params`
// are used in combination with a given `pathname`. Since the two will
// always match for the current route, we can skip runtime checks.
export default async function AboutMe(props): Promise<ReactNode> {
  const locale = await props.params;
  setRequestLocale(locale);
  const messages = await getMessages(locale);

  return (
    <NextIntlClientProvider
      messages={
        // … and provide the relevant messages
        pick(messages, 'AboutMe.Shorts')
      }
    >
      <div className="m-5">
        <AboutMeComponent />
      </div>
    </NextIntlClientProvider>
  );
}
