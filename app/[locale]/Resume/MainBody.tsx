import {Certificate} from './components/CertificateComponent';
import {Education} from './components/EducationComponent';
import {ResumeSection} from './components/layout/ResumeSection';
import {WorkExperience} from './components/WorkExperienceComponent';
import {JobTypeEnum, ResumeType} from '@/src/data/Resume';
import {ReactNode} from 'react';
import {Talks} from './components/TalksComponent';
import {useTranslations} from 'next-intl';
import {getCodingTimeSinceFirstJob, getCurrentWorkTime} from '@/src/utils/resumeUtils';

export function MainResumeBody(props: {
  locale: string;
  resume: ResumeType;
  JobEnum: JobTypeEnum;
}): ReactNode {
  const t = useTranslations('CommonWords');

  return (
    <div>
      <ResumeSection title={t('TechExperience')}>
        <p>{t('Work Experience')}:{' '}{getCurrentWorkTime(props.resume.Jobs) + ' ' +t('years')}</p>
        <p>{t('Coding Experience')}{': '}{getCodingTimeSinceFirstJob() + ' ' +t('years')}</p>
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
