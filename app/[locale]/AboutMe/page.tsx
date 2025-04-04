import {getMessages, setRequestLocale} from 'next-intl/server';
import {ReactNode} from 'react';
import {AboutMeComponent} from './AboutMeComponent';
import {hasLocale, NextIntlClientProvider} from 'next-intl';
import {pick} from 'lodash';
import {routing} from '@/i18n/routing';

// @ts-expect-error -- TypeScript will validate that only known `params`
// are used in combination with a given `pathname`. Since the two will
// always match for the current route, we can skip runtime checks.
export default async function AboutMe({params}): Promise<ReactNode> {
  let {locale} = await params;
  if (typeof locale !== 'string' || !hasLocale(routing.locales, locale)) {
    locale = 'en';
  }

  setRequestLocale(locale);
  const messages = await getMessages({locale});

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
