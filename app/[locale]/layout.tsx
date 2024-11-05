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

export default async function RootLayout({
  children,
  params: {locale},
}: Readonly<{
  children: React.ReactNode;
  params: {locale: string};
}>) {
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
