import {getTranslations} from 'next-intl/server';
import {ReactNode} from 'react';

export async function Sinopsis(): Promise<Awaited<ReactNode>> {
  const t = await getTranslations('AboutMe.Paragraphs');
  // const t = useTranslations('AboutMe.Paragraphs');

  return (
    <>
      <div className="space-y-2">
        <p>{t('Paragraph1')}</p>
        <p>{t('Paragraph2')}</p>
        <p>{t('Paragraph3')}</p>
        <p>{t('Paragraph4')}</p>
        <p>{t('Paragraph5')}</p>
        <p>{t('Paragraph6')}</p>
      </div>
    </>
  );
}
