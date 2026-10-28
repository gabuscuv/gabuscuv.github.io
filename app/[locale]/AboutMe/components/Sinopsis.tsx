import {getTranslations} from 'next-intl/server';
import {ReactNode} from 'react';

export async function Sinopsis(): Promise<Awaited<ReactNode>> {

  const t = await getTranslations('AboutMe');
  const paragraphs = t.raw('Paragraphs') as string[];  // const t = await getTranslations('AboutMe.Paragraphs');
  // const t = useTranslations('AboutMe.Paragraphs');

  return (
    <div>
      {paragraphs.map((paragraph, index) => (
        <p key={index}>
          {paragraph}
        </p>
      ))}
    </div>
  )
}
