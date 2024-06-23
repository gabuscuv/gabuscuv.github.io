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

  return (
    <ResumeSection title={t('Talks')}>
      {props.talks
        .map(cert => (
          <div className={'m-3 '} key={cert.Title}>
            <div className="flex">
              <h3 className="text-xl">{cert.Title}</h3>&nbsp;-&nbsp;
              <h4 className="text-lg">{cert.location}</h4>
            </div>
            <h4 className="text-mg">{new Date(cert.date).getFullYear()}</h4>
          </div>
        ))
        .slice(0, props.JobTypeEnum !== JobTypeEnum.All ? 3 : undefined)}
    </ResumeSection>
  );
}
