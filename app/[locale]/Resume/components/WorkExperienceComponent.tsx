'use client';
import {useTranslations} from 'next-intl';
import {ReactNode} from 'react';

import {ResumeSection} from './layout/ResumeSection';

import {type} from '@/src/data/type';
import {CompanyType, JobTypeEnum, JobsType} from '@/src/data/Resume';
import {clamp} from '@/src/utils/maths';
import {points, totalPoints} from '@/src/utils/points';
import {getYearLapse, getYearsMonthRange} from '@/src/utils/dates';

export function WorkExperience(props: {
  locale: string;
  JobTypeEnum: JobTypeEnum;
  workExperience: Array<CompanyType>;
}): ReactNode {
  const t = useTranslations('CommonWords');
  const workSorted = props.workExperience
    .toSorted(
      (e, z) =>
        totalPoints(props.JobTypeEnum, z) - totalPoints(props.JobTypeEnum, e),
    )
    .slice(0, props.JobTypeEnum !== JobTypeEnum.All ? 2 : undefined);
  return (
    <ResumeSection
      title={`
        ${t('WorkExperience')} 
        (${props.JobTypeEnum !== JobTypeEnum.All ? workSorted.length : props.workExperience.length}
        ${t('of')}
        ${props.workExperience.length} ${t('Companies')} - 
        ${workSorted.map(e => (props.JobTypeEnum !== JobTypeEnum.All ? clamp(e.Jobs.length, 0, 2) : e.Jobs.length)).reduce((a, z) => a + z)} ${t('of')} 
        ${props.workExperience.map(e => e.Jobs.length).reduce((a, z) => a + z)} ${t('JobPositions')})`}
    >
      {/* eslint-disable-next-line @typescript-eslint/no-unused-vars*/}
      {props.workExperience
        .toSorted(
          (e, z) =>
            totalPoints(props.JobTypeEnum, z) -
            totalPoints(props.JobTypeEnum, e),
        )
        .slice(0, props.JobTypeEnum !== JobTypeEnum.All ? 2 : undefined)
        .map(job => (
          <div className={'m-3 '} key={job.Title}>
            <div className="md:flex">
              <a href={job.Url}>
                {' '}
                <h3 className="text-xl">{job.Title}</h3>
              </a>
              <h5 className="text-right">&nbsp;({job.Location})</h5>
            </div>
            <p>
              {new Date(job.StartDate).getFullYear() +
                ' - ' +
                (job.EndDate !== 0
                  ? new Date(job.EndDate).getFullYear()
                  : t('OnGoing'))}{' '}
              (
              {' ' +
                getYearLapse(
                  job.StartDate,
                  job.EndDate !== 0 ? job.EndDate : Date.now(),
                )}{' '}
              {t('years') + ' '})
            </p>
            {JobsItems(props.locale, props.JobTypeEnum, job.Jobs)}
          </div>
        ))}
    </ResumeSection>
  );
}
function JobsItems(
  locale: string,
  jobTypeEnum: JobTypeEnum,
  Jobs: Array<JobsType>,
): ReactNode {
  const t = useTranslations('CommonWords');

  return (
    <ul className="list-disc ">
      {Jobs.toSorted((a, b) => points(jobTypeEnum, b) - points(jobTypeEnum, a))
        .slice(0, jobTypeEnum !== JobTypeEnum.All ? 2 : undefined)
        .toSorted((e, z) => z.EndDate - e.EndDate)
        .map(e => (
          <li key={e.Title} className="m-2">
            <h4 className="text-lg inline">
              {e.Title}&nbsp;&nbsp;
              <p className="text-base">
                &nbsp;
                {getYearsMonthRange(
                  locale,
                  e.StartDate,
                  e.EndDate,
                  t('OnGoing'),
                )}
              </p>
            </h4>
            <p>{e.Description}</p>
            <ul className="list-disc mt-1 list-inside">
              {e.BulletPoints.map((bulletpoint, index) => (
                <li key={e.Title + 'bulletpoint' + index}>{bulletpoint}</li>
              ))}
            </ul>
            <ul className=" mt-1 text-xs flex-wrap flex">
              {e.techStack.map((techstack, index) => (
                <li key={e.Title + 'bulletpoint' + index}>
                  &nbsp;{`${type[techstack]?.FullName}`}&nbsp;{}
                </li>
              ))}
            </ul>
          </li>
        ))}
    </ul>
  );
}
