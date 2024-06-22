'use client';
import {useTranslations} from 'next-intl';
import {JobTypeEnum, ResumeType} from '@/src/data/Resume';
import {ReactNode, useState} from 'react';
import {QuestionModal} from './components/QuestionModalComponent';
import {Button} from 'flowbite-react';
import {Education} from './components/EducationComponent';
import {Certificate} from './components/CertificateComponent';
import {Talks} from './components/TalksComponent';
import {WorkExperience} from './components/WorkExperienceComponent';
import {ResumeSection} from './components/layout/ResumeSection';
import {getYearLapse} from '@/src/utils/dates';

let JobEnum: JobTypeEnum;

export interface projectType {
  activated: boolean;
}

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
          JobTypeEnum={JobEnum}
          workExperience={props.resume.Jobs}
        />
        <Education Education={props.resume.Education} locale={props.locale} />
        <Certificate
          locale={props.locale}
          certificate={props.resume.Certificate}
          JobTypeEnum={JobEnum}
        />
        <Talks JobTypeEnum={JobEnum} talks={props.resume.Talks} />
      </main>
    </>
  );
}
