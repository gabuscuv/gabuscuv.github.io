'use client';
import {_Translator, useTranslations} from 'next-intl';
import {ReactNode} from 'react';

import {ResumeSection} from './layout/ResumeSection';

import {techStack} from '@/src/data/techStack';
import {CompanyType, JobTypeEnum, JobsType} from '@/src/data/resume/types';
import {getYearLapse, getYearsMonthRange, OnGoingValue} from '@/src/utils/dates';
import {getWorkEntriesHeader, selectExperience} from '@/src/utils/resumeUtils';

export function WorkExperience(props: {
  locale: string;
  JobTypeEnum: JobTypeEnum;
  workExperience: Array<CompanyType>;
}): ReactNode {
  const t = useTranslations('CommonWords');
  const experience = selectExperience(props.workExperience, props.JobTypeEnum);

  return (
    <ResumeSection title={getWorkEntriesHeader(t, experience)}>
      {experience.companies.map((company) => (
        <article className="m-3" key={`${company.Title}-${company.Url}`}>
          <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between">
            <h3 className="text-xl font-semibold">
              {company.Url ? (
                <a
                  href={company.Url}
                  className="hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {company.Title}
                </a>
              ) : (
                company.Title
              )}
            </h3>

            <p className="text-sm text-gray-500 dark:text-gray-400 md:text-right">
              {company.Location}
            </p>
          </div>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            {new Date(company.StartDate).getFullYear()} –{' '}
            {company.EndDate !== OnGoingValue
              ? new Date(company.EndDate).getFullYear()
              : t('OnGoing')}{' '}
            (
            {getYearLapse(
              company.StartDate,
              company.EndDate !== OnGoingValue
                ? company.EndDate
                : Date.now(),
            )}{' '}
            {t('years')})
          </p>

          <JobsItems
            locale={props.locale}
            jobTypeEnum={props.JobTypeEnum}
            jobs={company.Jobs}
          />
        </article>
      ))}
    </ResumeSection>
  );
}



function JobsItems(props: {
  locale: string,
  jobTypeEnum: JobTypeEnum,
  jobs: Array<JobsType>,
}): ReactNode {
  const t = useTranslations('CommonWords');

  return (
    <ul className="mt-2 list-disc space-y-3 pl-5">
      {props.jobs.map(job => (
        <li
          key={`${job.Title}-${job.StartDate}-${job.EndDate}`}
          className="pl-1"
        >
          <div className="flex flex-wrap items-baseline gap-x-2">
            <h4 className="text-lg font-medium">
              {job.Title}
            </h4>

            <span className="text-sm text-gray-500 dark:text-gray-400">
              {getYearsMonthRange(
                props.locale,
                job.StartDate,
                job.EndDate,
                t('OnGoing'),
              )}
            </span>
          </div>

          <p className="mt-1">{job.Description}</p>

          {job.BulletPoints.length > 0 && (
            <ul className="mt-2 list-disc space-y-1 pl-5">
              {job.BulletPoints.map((bulletPoint, index) => (
                <li key={`${index}-${bulletPoint}`}>
                  {bulletPoint.translation}
                </li>
              ))}
            </ul>
          )}

          {job.techStack.length > 0 && (
            <ul className="mt-2 flex flex-wrap gap-x-2 gap-y-1 text-xs text-gray-500 dark:text-gray-400">
              {job.techStack.map(tech => (
                <li key={tech}>
                  {techStack[tech]?.fullName ?? tech}
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
}
