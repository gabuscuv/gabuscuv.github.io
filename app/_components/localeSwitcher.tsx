'use client';
import {useTranslations} from 'next-intl';

import {useRouter, usePathname, locales} from './navigation';

export default function LocaleSwitcher(props: {locale: string}) {
  const t = useTranslations('LocaleSwitcher');
  const router = useRouter();
  const pathname = usePathname();

  const onLocaleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value as 'en' | 'es' | undefined;

    router.replace(pathname, {locale: newLocale});
  };

  return (
    <select defaultValue={props.locale} onChange={onLocaleChange}>
      {locales.map(lang => (
        <option key={lang} value={lang}>
          {t('locale', {locale: lang})}
        </option>
      ))}
    </select>
  );
}
