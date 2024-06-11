'use client';
import {useTranslations} from 'next-intl';
import {EducationType} from '@/src/data/Resume';
import {ReactNode} from 'react';
import {getYearLapse} from '../ResumeBuilder';
import {ResumeSection} from './layout/ResumeSection';

export function Education(props: {
  locale: string;
  Education: Array<EducationType>;
}): ReactNode {
  const t = useTranslations('CommonWords');

  return (
    <ResumeSection title={t('Education')}>
      {props.Education.map(e => (
        <>
          <div className={'m-3 '} key={e.Title}>
            <div className="md:flex">
              <h3 className="text-xl">{`${e.EFramework} - ${e.Title}`}</h3>
              &nbsp;-&nbsp;
              <h4 className="text-lg">{e.IssuerOrg}</h4>
              <h5 className="">&nbsp;({e.Location})</h5>
            </div>
            <h4 className="text-mg">
              {new Date(e.StartDate).getFullYear() +
                ' - ' +
                new Date(e.EndDate).getFullYear()}{' '}
              ({' ' + getYearLapse(e.StartDate, e.EndDate)} {t('years') + ' '})
            </h4>
            {props.locale !== 'es' ? (
              <h5 className="text-xs">{`Original Name (Spanish): ${e.originalTitle}`}</h5>
            ) : (
              ''
            )}
          </div>
        </>
      ))}
    </ResumeSection>
  );
}
