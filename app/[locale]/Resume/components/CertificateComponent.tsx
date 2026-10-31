'use client';
import {useTranslations} from 'next-intl';
import {JobTypeEnum} from '@/src/data/resume/types';
import {ReactNode} from 'react';
import {ResumeSection} from './layout/ResumeSection';

export function Certificate(props: {
  locale: string;
  JobTypeEnum: JobTypeEnum;
  certificate: Array<{
    Title: string;
    type: string;
    IssuerOrg: string;
    date: number;
  }>;
}): ReactNode {
  const t = useTranslations('CommonWords');

  const certificates = props.certificate.slice(
    0,
    props.JobTypeEnum !== JobTypeEnum.All ? 3 : undefined,
  );

  return (
    <ResumeSection title={t('Certificates')}>
      {certificates.map(cert => (
        <article
          className="m-3"
          key={`${cert.Title}-${cert.IssuerOrg}`}
        >
          <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between">
            <h3 className="text-xl font-semibold">
              {cert.Title}
            </h3>

            <p className="text-sm text-gray-500 dark:text-gray-400 md:text-right">
              {cert.IssuerOrg}
            </p>
          </div>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            {new Date(cert.date).getFullYear()}
          </p>
        </article>
      ))}
    </ResumeSection>
  );
}
