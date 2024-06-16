'use client';
import {useTranslations} from 'next-intl';
import {CompanyType, JobTypeEnum, JobsType} from '@/src/data/Resume';
import {ReactNode} from 'react';
import {
  getYearLapse,
  points,
  JobEnum,
  getYearsMonthRange,
} from '../ResumeBuilder';
import {ResumeSection} from './layout/ResumeSection';
import {type} from '@/src/data/type';

export function WorkExperience(props: {
  locale: string;
  workExperience: Array<CompanyType>;
}): ReactNode {
  const t = useTranslations('CommonWords');
  return (
    <ResumeSection title={t('WorkExperience')}>
      {/* eslint-disable-next-line @typescript-eslint/no-unused-vars*/}
      {props.workExperience.map((job, index) => (
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
              new Date(job.EndDate).getFullYear()}{' '}
            ({' ' + getYearLapse(job.StartDate, job.EndDate)} {t('years') + ' '}
            )
          </p>
          {JobsItems(props.locale, job.Jobs)}
        </div>
      ))}
    </ResumeSection>
  );
}
function JobsItems(locale: string, Jobs: Array<JobsType>): ReactNode {
  return (
    <ul className="list-disc ">
      {Jobs.toSorted((a, b) => points(b) - points(a))
        .slice(0, JobEnum !== JobTypeEnum.All ? 2 : undefined)
        .map(e => (
          <li key={e.Title} className="m-2">
            <h4 className="text-lg inline">
              {e.Title}&nbsp;&nbsp;
              <p className="text-base">
                &nbsp;
                {getYearsMonthRange(locale, e.StartDate, e.EndDate)}
              </p>
            </h4>
            <p>{e.Description}</p>
            <ul className="list-disc mt-1 list-inside">
              {e.BulletPoints.map((bulletpoint, index) => (
                <li key={e.Title + 'bulletpoint' + index}>{bulletpoint}</li>
              ))}
            </ul>
            <ul className=" mt-1 text-xs flex">
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
