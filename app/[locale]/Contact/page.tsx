import {getMessages} from 'next-intl/server';
import {AwaitedReactNode} from 'react';
import {ContactMe} from './Component';
import {pick} from 'lodash';
import {NextIntlClientProvider} from 'next-intl';

//function to generate the routes for all the locales
export async function generateStaticParams() {
  return ['en', 'es'].map(locale => ({locale}));
}

export default async function Contact({
  // @ts-expect-error -- TypeScript will validate that only known `params`
  // are used in combination with a given `pathname`. Since the two will
  // always match for the current route, we can skip runtime checks.
  params: locale,
}): Promise<AwaitedReactNode> {
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
