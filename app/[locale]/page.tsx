import {hasLocale} from 'next-intl';
import {ReferencesCarouselComponent} from './components/ratings';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import Image from 'next/image';
import {routing} from '@/i18n/routing';

// @ts-expect-error -- TypeScript will validate that only known `params`
// are used in combination with a given `pathname`. Since the two will
// always match for the current route, we can skip runtime checks.
export async function generateMetadata({params}) {
  let {locale} = await params;
  if (typeof locale !== 'string' || !hasLocale(routing.locales, locale)) {
    locale = 'en';
  }

  const t = await getTranslations({locale, namespace: 'Metadata'});

  return {
    title: t('Title'),
  };
}

// @ts-expect-error -- TypeScript will validate that only known `params`
// are used in combination with a given `pathname`. Since the two will
// always match for the current route, we can skip runtime checks.
export default async function Home({params}): Promise<ReactNode> {
  let {locale} = await params;
  if (typeof locale !== 'string' || !hasLocale(routing.locales, locale)) {
    locale = 'en';
  }

  setRequestLocale(locale);
  const t = await getTranslations('HomePage');
  return (
    <main className=" m-5 ">
      <div className="w-full justify-center grid gap-4 grid-cols-2 grid-flow-row">
        <h1 className=" col-span-2 text-3xl">{t('Greetings')}</h1>
        <div className="rounded-md border-slate-700 mr-10 shadow-lg p-5">
          <div>{t('Description')}.</div>
        </div>
        <div className="rounded-md shadow p-5">
          <div>
            <Image
              src="/img/avatar-2.png"
              width={200}
              height={200}
              alt="A Picture of me (Gaby)"
            />
          </div>
        </div>
        <div className="xl:mx-80 h-full col-span-2">
          <ReferencesCarouselComponent />
        </div>
      </div>
    </main>
  );
}
