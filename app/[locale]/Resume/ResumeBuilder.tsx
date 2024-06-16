'use client';
import {useTranslations} from 'next-intl';
import {JobTypeEnum, JobsType, ResumeType} from '@/src/data/Resume';
import {ReactNode, useState} from 'react';
import {QuestionModal} from './components/QuestionModalComponent';
import {Button} from 'flowbite-react';
import {Education} from './components/EducationComponent';
import {Certificate} from './components/CertificateComponent';
import {Talks} from './components/TalksComponent';
import {WorkExperience} from './components/WorkExperienceComponent';
import {ResumeSection} from './components/layout/ResumeSection';

export interface projectType {
  activated: boolean;
}

export let JobEnum: JobTypeEnum;

const jobTypeFilter: {
  [id: number]: {[id: string]: number};
} = {
  [JobTypeEnum.All]: {},
  [JobTypeEnum.Web]: {
    react: 3,
    typescript: 3,
    csharp: 1,
    css: 1,
    bootstrap: 1,
    wordpress: 2,
  },
  [JobTypeEnum.GameDev]: {
    unreal: 10,
    cpp: 6,
    csharp: 4,
    wordpress: -5,
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
  const [openSelectorModal, setOpenSelectorModal] = useState<boolean>(
    JobEnum === undefined ? true : false
  );
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
        {t('CurrentView') + Object.entries(JobTypeEnum)[JobEnum]}
        <Button
          onClick={() => {
            setOpenSelectorModal(true);
          }}
        >
          Change Tech Profile
        </Button>
        <ResumeSection title={t('TechExperience')}>
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
        <WorkExperience
          locale={props.locale}
          workExperience={props.resume.Jobs}
        />
        <Education Education={props.resume.Education} locale={props.locale} />
        <Certificate
          locale={props.locale}
          certificate={props.resume.Certificate}
        />
        <Talks talks={props.resume.Talks} />
      </main>
    </>
  );
}

export function getYearLapse(startDate: number, endDate: number): string {
  return ((endDate - startDate) / 1000 / 31536000).toFixed(2);
}

export function points(b: JobsType): number {
  let points = 0;
  if (JobEnum === undefined || JobEnum === JobTypeEnum.All) {
    return points;
  }
  b.techStack.forEach(az => {
    return (points += jobTypeFilter[JobEnum][az]
      ? jobTypeFilter[JobEnum][az]
      : 0);
  });
  return points;
}

function getYearsMonth(locale: string, date: number): string {
  const _startDateType = new Date(date);
  return `${_startDateType.toLocaleString(locale, {
    month: 'long',
  })} ${_startDateType.getFullYear()}`;
}

export function getYearsMonthRange(
  locale: string,
  startDate: number,
  endDate: number
): string {
  return `( ${getYearsMonth(locale, startDate)} - ${getYearsMonth(
    locale,
    endDate
  )} )`;
}
