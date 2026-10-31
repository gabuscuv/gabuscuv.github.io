'use client';
import {useTranslations} from 'next-intl';
import {JobTypeEnum} from '@/src/data/Resume';
import {ReactNode} from 'react';
import {ResumeSection} from './layout/ResumeSection';

export function Talks(props: {
  JobTypeEnum: JobTypeEnum;
  talks: Array<{Title: string; location: string; date: number}>;
}): ReactNode {
  const t = useTranslations('CommonWords');

  const talks = props.talks.slice(
    0,
    props.JobTypeEnum !== JobTypeEnum.All ? 3 : undefined,
  );

  return (
    <ResumeSection title={t('Talks')}>
      {talks.map(talk => (
        <article
          className="m-3"
          key={`${talk.Title}-${talk.location}`}
        >
          <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between">
            <h3 className="text-xl font-semibold">
              {talk.Title}
            </h3>

            <p className="text-sm text-gray-500 dark:text-gray-400 md:text-right">
              {talk.location}
            </p>
          </div>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            {new Date(talk.date).getFullYear()}
          </p>
        </article>
      ))}
    </ResumeSection>
  );
}
