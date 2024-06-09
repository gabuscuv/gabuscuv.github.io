'use client';
import {useTranslations} from 'next-intl';
import {
  EducationType,
  JobTypeEnum,
  JobsType,
  ResumeType,
} from '@/src/data/Resume';
import {ReactNode, useState} from 'react';
import {QuestionModal} from './QuestionModal';
import {Button} from 'flowbite-react';

export interface projectType {
  activated: boolean;
}

const jobTypeFilter: {
  [id: number]: {[id: string]: number};
} = {
  [JobTypeEnum.None]: {},
  [JobTypeEnum.Web]: {
    react: 3,
    typescript: 3,
    csharp: 1,
    css: 1,
    bootstrap: 1,
    wordpress: 2,
  },
  [JobTypeEnum.GameDev]: {
    unreal: 3,
    csharp: 2,
  },
  [JobTypeEnum.Backend]: {
    csharp: 3,
    unreal: -3,
    typescript: 2,
    javascript: 1,
  },
};

export function ResumeBuilder(props: {
  locale: string;
  resume: ResumeType;
}): ReactNode {
  const t = useTranslations('CommonWords');
  const [openSelectorModal, setOpenSelectorModal] = useState<boolean>(true);
  //const [openSelectorModal, setOpenSelectorModal] = useState<JobTypeEnum>(JobTypeEnum.None);

  if (openSelectorModal) {
    return (
      <>
        <QuestionModal
          openModalStatus={openSelectorModal}
          closeModalCallback={function (jobeNum: JobTypeEnum): void {
            JobEnum = jobeNum;
            setOpenSelectorModal(false);
          }}
        />
      </>
    );
  }

  return (
    <>
      <main className="m-5">
        <Button
          onClick={() => {
            setOpenSelectorModal(true);
          }}
        >
          Change Tech Profile
        </Button>
        <ResumeSection title="Long Live experience">
          <p>
            {t('Work Experience')}:{' '}
            {(
              props.resume.Jobs.map(
                e => (e.EndDate - e.StartDate) / 1000
              ).reduce((a, b) => a + b) / 31536000
            ).toFixed(2) +
              ' ' +
              t('years')}
          </p>
          <p>
            {t('Coding Experience')}
            {': '}
            {getYearLapse(
              props.resume.Jobs[props.resume.Jobs.length - 1].StartDate,
              Date.now()
            ) +
              ' ' +
              t('years')}
          </p>
        </ResumeSection>
        <ResumeSection title={t('WorkExperience')}>
          {/* eslint-disable-next-line @typescript-eslint/no-unused-vars*/}
          {props.resume.Jobs.map((job, index) => (
            <div className={'m-3 '} key={job.Title}>
              <div className="flex">
                <a href={job.Url}>
                  {' '}
                  <h3 className="text-xl">{job.Title}</h3>
                </a>
                <h5 className="">&nbsp;({job.Location})</h5>
              </div>
              <p>
                {new Date(job.StartDate).getFullYear() +
                  ' - ' +
                  new Date(job.EndDate).getFullYear()}{' '}
                ({' ' + getYearLapse(job.StartDate, job.EndDate)}{' '}
                {t('years') + ' '})
              </p>
              {JobsItems(props.locale, job.Jobs)}
            </div>
          ))}
        </ResumeSection>
        <Education Education={props.resume.Education} />
        <ResumeSection title="Certificates">
          {props.resume.Certificate.map(cert => (
            <div className={'m-3 '} key={cert.title}>
              <div className="flex">
                <h3 className="text-xl">{cert.title}</h3>&nbsp;-&nbsp;
                <h4 className="text-lg">{cert.IssuerOrg}</h4>
              </div>
              <h4 className="text-mg">{new Date(cert.date).getFullYear()}</h4>
            </div>
          )).slice(0, JobEnum !== JobTypeEnum.None ? 3 : undefined)}
        </ResumeSection>
      </main>
    </>
  );
}
function ResumeSection(props: {title: string; children: ReactNode}) {
  return (
    <section className="m-5 p-5 rounded shadow">
      <h1 className="text-2xl">{props.title}</h1>

      {props.children}
    </section>
  );
}

function getYearLapse(startDate: number, endDate: number): string {
  return ((endDate - startDate) / 1000 / 31536000).toFixed(2);
}

function Education(props: {Education: Array<EducationType>}): ReactNode {
  const t = useTranslations('CommonWords');

  return (
    <ResumeSection title={t('Education')}>
      {props.Education.map(e => (
        <>
          <div className="flex">
            <h3 className="text-xl">{e.Title}</h3>
            <h4 className="text-lg">&nbsp;-&nbsp;{e.IssuerOrg}</h4>
            <h5 className="">&nbsp;({e.Location})</h5>
          </div>
          <p>
            {new Date(e.StartDate).getFullYear() +
              ' - ' +
              new Date(e.EndDate).getFullYear()}{' '}
            ({' ' + getYearLapse(e.StartDate, e.EndDate)} {t('years') + ' '})
          </p>
        </>
      ))}
    </ResumeSection>
  );
}

function JobsItems(locale: string, Jobs: Array<JobsType>): ReactNode {
  return (
    <ul className="list-disc ">
      {Jobs.toSorted((a, b) => points(b) - points(a))
        .slice(0, JobEnum !== JobTypeEnum.None ? 2 : undefined)
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
          </li>
        ))}
    </ul>
  );
}

function points(b: JobsType): number {
  let points = 0;
  if (JobEnum === JobTypeEnum.None) {
    return points;
  }
  b.techStack.forEach(az => {
    return (points += jobTypeFilter[JobEnum][az]
      ? jobTypeFilter[JobEnum][az]
      : -5);
  });
  return points;
}

let JobEnum: JobTypeEnum;
function getYearsMonth(locale: string, date: number): string {
  const _startDateType = new Date(date);
  return `${_startDateType.toLocaleString(locale, {
    month: 'long',
  })} ${_startDateType.getFullYear()}`;
}

function getYearsMonthRange(
  locale: string,
  startDate: number,
  endDate: number
): string {
  return `( ${getYearsMonth(locale, startDate)} - ${getYearsMonth(
    locale,
    endDate
  )} )`;
}
