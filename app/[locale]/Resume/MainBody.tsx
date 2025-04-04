import {getYearLapse} from '@/src/utils/dates';
import {Certificate} from './components/CertificateComponent';
import {Education} from './components/EducationComponent';
import {ResumeSection} from './components/layout/ResumeSection';
import {WorkExperience} from './components/WorkExperienceComponent';
import {JobTypeEnum, ResumeType} from '@/src/data/Resume';
import {ReactNode} from 'react';
import {Talks} from './components/TalksComponent';
import {useTranslations} from 'next-intl';

export function MainResumeBody(props: {
  locale: string;
  resume: ResumeType;
  JobEnum: JobTypeEnum;
}): ReactNode {
  const t = useTranslations('CommonWords');

  return (
    <div>
      <ResumeSection title={t('TechExperience')}>
        <p>
          {t('Work Experience')}:{' '}
          {(
            props.resume.Jobs.map(
              e =>
                ((e.EndDate !== 0 ? e.EndDate : Date.now()) - e.StartDate) /
                1000,
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
            Date.now(),
          ) +
            ' ' +
            t('years')}
        </p>
      </ResumeSection>
      <WorkExperience
        locale={props.locale}
        JobTypeEnum={props.JobEnum}
        workExperience={props.resume.Jobs}
      />
      <Education Education={props.resume.Education} locale={props.locale} />
      <Certificate
        locale={props.locale}
        certificate={props.resume.Certificate}
        JobTypeEnum={props.JobEnum}
      />
      <Talks JobTypeEnum={props.JobEnum} talks={props.resume.Talks} />
    </div>
  );
}
