'use client';
import { useTranslations } from 'next-intl';
import { JobTypeEnum } from '@/src/data/Resume';
import { ReactNode } from 'react';
import { JobEnum } from '../ResumeBuilder';
import { ResumeSection } from './layout/ResumeSection';

export function Certificate(props: {
  locale: string; certificate: Array<{
    Title: string;
    type: string;
    IssuerOrg: string;
    date: number;
  }>;
}): ReactNode {
  const t = useTranslations('CommonWords');
  return <ResumeSection title={t("Certificates")}>
    {props.certificate.map(cert => (
      <div className={'m-3 '} key={cert.Title}>
        <div className="flex">
          <h3 className="text-xl">{cert.Title}</h3>&nbsp;-&nbsp;
          <h4 className="text-lg">{cert.IssuerOrg}</h4>
        </div>
        <h4 className="text-mg">{new Date(cert.date).getFullYear()}</h4>
      </div>
    )).slice(0, JobEnum !== JobTypeEnum.All ? 3 : undefined)}
  </ResumeSection>;
}
