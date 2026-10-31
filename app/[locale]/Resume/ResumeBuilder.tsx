'use client';
import {useTranslations} from 'next-intl';
import {JobTypeEnum, ResumeType} from '@/src/data/Resume';
import {ReactNode, useState} from 'react';
import {QuestionModal} from './components/QuestionModalComponent';
import {Button} from 'flowbite-react';
import {MainResumeBody} from './MainBody';
import {getResumeFileName} from '@/src/utils/resumeUtils';

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
    JobEnum === undefined ? true : false,
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
        {t('CurrentView') +
          ' ' +
          Object.entries(JobTypeEnum)[JobEnum].toString().split(',')[1]}
        <div className="flex gap-2">
          <Button
            onClick={() => {
              setOpenSelectorModal(true);
            }}
          >
            {t('ChangeProfile')}
          </Button>
          <Button
            onClick={() => {
              open(
                //'https://gabuscuv.dev' +
                '/cv/' + getResumeFileName(props.locale, JobEnum),
              );
            }}
          >
            {t('Download')}
          </Button>
        </div>
        <MainResumeBody
          locale={props.locale}
          resume={props.resume}
          JobEnum={JobEnum}
        />
      </main>
    </>
  );
}
