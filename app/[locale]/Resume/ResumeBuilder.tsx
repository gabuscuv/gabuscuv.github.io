'use client';
import {useTranslations} from 'next-intl';
import {JobTypeEnum, ResumeType} from '@/src/data/Resume';
import {ReactNode, useState} from 'react';
import {QuestionModal} from './components/QuestionModalComponent';
import {Button} from 'flowbite-react';
import {MainResumeBody} from './MainBody';
import {getResumeFileName} from '@/src/utils/resumeUtils';

export interface ProjectType {
  activated: boolean;
}

export function ResumeBuilder(props: {
  locale: string;
  resume: ResumeType;
}): ReactNode {
  const t = useTranslations('CommonWords');

  const [jobEnum, setJobEnum] = useState<JobTypeEnum | null>(null);
  const [openSelectorModal, setOpenSelectorModal] = useState(true);

  const currentProfile = jobEnum !== null
    ? Object.entries(JobTypeEnum).find(
        ([, value]) => value === jobEnum,
      )?.[0] ?? String(jobEnum)
    : '';

  const handleProfileSelect = (selectedJob: JobTypeEnum): void => {
    setJobEnum(selectedJob);
    setOpenSelectorModal(false);
  };

  const handleDownload = (): void => {
    if (jobEnum === null) return;

    window.open(
      `/cv/${getResumeFileName(props.locale, jobEnum)}`,
      '_blank',
      'noopener,noreferrer',
    );
  };

  if (openSelectorModal || jobEnum === null) {
    return (
      <QuestionModal
        openModalStatus={openSelectorModal}
        closeModalCallback={handleProfileSelect}
      />
    );
  }

  return (
    <main className="m-5">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {t('CurrentView')} {currentProfile}
        </p>

        <div className="flex gap-2">
          <Button
            color="light"
            onClick={() => setOpenSelectorModal(true)}
          >
            {t('ChangeProfile')}
          </Button>

          <Button onClick={handleDownload}>
            {t('Download')}
          </Button>
        </div>
      </div>

      <MainResumeBody
        locale={props.locale}
        resume={props.resume}
        JobEnum={jobEnum}
      />
    </main>
  );
}
