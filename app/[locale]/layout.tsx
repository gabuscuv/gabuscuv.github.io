import type {Metadata} from 'next';
import {NextIntlClientProvider} from 'next-intl';
import {getMessages, setRequestLocale} from 'next-intl/server';
import {NavBar} from '../_components/NavBar';
import {Inter} from 'next/font/google';
import '../globals.css';
import Layout from '../_components/FreezeRouter';
import LocaleSwitcher from '../_components/localeSwitcher';
import {pick} from 'lodash';

const inter = Inter({subsets: ['latin']});

export const metadata: Metadata = {
  title: 'Gabriel Bustillo del Cuvillo page',
  description: 'Software Developer/Jack Of the Trades IT',
};

export default async function RootLayout(
  props: Readonly<{
    children: React.ReactNode;
    // @ts-expect-error -- TypeScript will validate that only known `params`
    // are used in combination with a given `pathname`. Since the two will
    // always match for the current route, we can skip runtime checks.
    params;
  }>
) {
  const params = await props.params;

  const {locale} = params;

  const {children} = props;

  setRequestLocale(locale);
  const messages = await getMessages({
    locale: typeof locale === 'string' ? locale : undefined,
  });
  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider
          messages={pick(messages, ['NavBar', 'Metadata', 'LocaleSwitcher'])}
        >
          <NavBar localeSwitcher={<LocaleSwitcher />} />
          <Layout>{children}</Layout>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
