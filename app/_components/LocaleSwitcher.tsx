import {useTranslations} from 'next-intl';
import {routing} from '@/i18n/routing';
import LocaleSwitcherSelect from './LocaleSwitcherSelect';

export default function LocaleSwitcher(props: {locale: string}) {
  const t = useTranslations('LocaleSwitcher');
  //const locale = useLocale();

  return (
    <LocaleSwitcherSelect defaultValue={props.locale} label={'Lang'}>
      {routing.locales.map(cur => (
        <option key={cur} value={cur}>
          {t('locale', {locale: cur})}
        </option>
      ))}
    </LocaleSwitcherSelect>
  );
}
