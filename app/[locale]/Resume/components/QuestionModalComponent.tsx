'use client';
import {JobTypeEnum} from '@/src/data/Resume';
import {Button, Modal} from 'flowbite-react';
import {useTranslations} from 'next-intl';
import {ReactNode, useState} from 'react';

export function QuestionModal(props: {
  openModalStatus: boolean;
  closeModalCallback: (jobeNum: JobTypeEnum) => void;
}): ReactNode {
  const [jobeNum, setJobEnum] = useState<JobTypeEnum | undefined>();
  const t = useTranslations('Resume.QuestionModal');
  return (
    <Modal
      show={props.openModalStatus}
      onClose={() => props.closeModalCallback}
    >
      <Modal.Header theme={{close: {base: 'hidden'}}}>
        {t('Title')}
      </Modal.Header>
      <Modal.Body>
        <div className="space-y-6 p-6">
          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            {t('Description')}
          </p>
          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            <Button.Group>
              <Button
                color="gray"
                onClick={() => {
                  setJobEnum(JobTypeEnum.All);
                }}
              >
                {t('all')}
              </Button>
              <Button
                color="gray"
                onClick={() => {
                  setJobEnum(JobTypeEnum.GameDev);
                }}
              >
                Game Developer/Interative App/Virtual Production
              </Button>
              <Button
                color="gray"
                onClick={() => {
                  setJobEnum(JobTypeEnum.WebDev);
                }}
              >
                {t('web')}
              </Button>
              <Button
                color="gray"
                onClick={() => {
                  setJobEnum(JobTypeEnum.Backend);
                }}
              >
                {t('backend')}
              </Button>
            </Button.Group>
          </p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => {
            if (jobeNum !== undefined) props.closeModalCallback(jobeNum);
          }}
          disabled={jobeNum === undefined}
        >
          {t('Choose')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
