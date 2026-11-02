'use client';
import {useTranslations} from 'next-intl';
import {ReactNode} from 'react';
import {ResumeSection} from './layout/ResumeSection';
import {EducationType} from '@/src/data/resume/types';
import {getYearLapse, OnGoingValue} from '@/src/utils/dates';

export function Education(props: {
  locale: string;
  Education: Array<EducationType>;
}): ReactNode {
  const t = useTranslations('CommonWords');

  return (
    <ResumeSection title={t('Education')}>
      {props.Education.map(education => (
        <article
          className="m-3"
          key={`${education.Title}-${education.IssuerOrg}`}
        >
          <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between">
            <h3 className="text-xl font-semibold">
              {education.EFramework} - {education.Title}
            </h3>

            <p className="text-sm text-gray-500 dark:text-gray-400 md:text-right">
              {education.IssuerOrg}
              {education.Location && ` · ${education.Location}`}
            </p>
          </div>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            {new Date(education.StartDate).getFullYear()} –{' '}
            {education.EndDate !== OnGoingValue
              ? new Date(education.EndDate).getFullYear()
              : t('OnGoing')}{' '}
            (
            {getYearLapse(
              education.StartDate,
              education.EndDate !== OnGoingValue
                ? education.EndDate
                : Date.now(),
            )}{' '}
            {t('years')})
          </p>

          {props.locale !== 'es' && education.originalTitle && (
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Original Name (Spanish): {education.originalTitle}
            </p>
          )}
        </article>
      ))}
    </ResumeSection>
  );
}
