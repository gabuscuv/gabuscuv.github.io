import {getMessages} from 'next-intl/server';
import {ContactMe} from './Component';
import {pick} from 'lodash';
import {NextIntlClientProvider} from 'next-intl';

//function to generate the routes for all the locales
export async function generateStaticParams() {
  return ['en', 'es'].map(locale => ({locale}));
}

// @ts-expect-error -- TypeScript will validate that only known `params`
// are used in combination with a given `pathname`. Since the two will
// always match for the current route, we can skip runtime checks.
export default async function Contact(props): Awaited<ReactNode> {
  const locale = await props.params;
  const messages = await getMessages(locale);

  return (
    <NextIntlClientProvider
      messages={
        // … and provide the relevant messages
        pick(messages, 'Contact')
      }
    >
      <div className="m-10">
        <ContactMe />
      </div>
    </NextIntlClientProvider>
  );
}
