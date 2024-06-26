import {getMessages, unstable_setRequestLocale} from 'next-intl/server';
import ProjectBrowser from './components/ProjectBrowser';
import {NextIntlClientProvider} from 'next-intl';
import {pick} from 'lodash';
import {ReactNode} from 'react';

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
      <ProjectBrowser locale={locale} />
      <div className="my-10 justify-center text-center">
        <p>
          Some Logos are made by{' '}
          <a href="https://github.com/SAWARATSUKI">SAWARATSUKI</a>
        </p>
        <p>
          Unreal and its logo are Epic’s trademarks or registered trademarks of
          Epic Games, Inc in the US and elsewhere
        </p>
        <p>
          MonoGame and its logo are MonoGame Foundation’s trademarks or
          registered trademarks of MonoGame Foundation in the US and elsewhere
        </p>
        <p>
          Unity, the Unity logo, and all related names, logos, product and
          service names, designs, and slogans are trademarks of Unity
          Technologies or its subsidiaries.
        </p>
      </div>
    </NextIntlClientProvider>
  );
}
