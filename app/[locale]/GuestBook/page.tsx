import {getMessages, setRequestLocale} from 'next-intl/server';
import {GuestFunctionMain} from './components/PostComponent';
import {NextIntlClientProvider} from 'next-intl';
import {pick} from 'lodash';

export async function generateStaticParams() {
  return ['en', 'es'].map(locale => ({locale}));
}

// @ts-expect-error -- TypeScript will validate that only known `params`
// are used in combination with a given `pathname`. Since the two will
// always match for the current route, we can skip runtime checks.
export default async function GuestBook({params: {locale}}) {
  setRequestLocale(locale);
  const messages = await getMessages(locale);
  return (
    <NextIntlClientProvider
      messages={
        // … and provide the relevant messages
        pick(messages, ['Guestbook'])
      }
    >
      <GuestFunctionMain />;
    </NextIntlClientProvider>
  );
}
